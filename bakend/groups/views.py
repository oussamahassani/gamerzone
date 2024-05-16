from django.forms import ValidationError
from django.http import JsonResponse
from django.shortcuts import render
from notifications.models import Notification
from groups.serializers import GroupSerializer
from django.shortcuts import get_object_or_404
from rest_framework import  status 
from rest_framework.response import Response
from users.serializers import CustomUserSerializer
from .serializers import MyGroupSerializer_Get, MyGroupSerializer, AdminIdSerializer, GroupPostSerializer, GroupPostSerializer_GET,  GroupSerializer ,GroupSerializer_Get
from .models import Group, GroupPost,User ,MyGroup
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class GroupCreateAPIView(APIView):
    serializer_class = GroupSerializer
    permission_classes = [IsAuthenticated]


    def post(self, request, *args, **kwargs):
        creator_id = request.user.id
        request.data._mutable = True
        request.data['creator'] = creator_id
        request.data['super_admin'] = creator_id
        
        serializer = GroupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            new_group_id = serializer.instance.id
            try:
                mygroup = MyGroup.objects.get(user=request.user)
                mygroup.group.add(new_group_id)
                mygroup.save()
                mygroup_ser = MyGroupSerializer(mygroup)
            except MyGroup.DoesNotExist:
                mygroup = MyGroup.objects.create(user=request.user)
                mygroup.group.add(new_group_id)
                mygroup.save()
                mygroup_ser = MyGroupSerializer(mygroup)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



    def get(self, request, *args, **kwargs):
        groups = Group.objects.all()
        serializer = GroupSerializer_Get(groups, many=True)
        return Response(serializer.data)
  
    def delete(self, request, pk, *args, **kwargs):
        try:
            group = Group.objects.get(pk=pk)
            group.delete()
            return Response({"message": "Group deleted"}, status=status.HTTP_204_NO_CONTENT)
        except Group.DoesNotExist: 
            return Response({"error": "Group not found"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk, *args, **kwargs):
        group = get_object_or_404(Group, pk=pk)
        request.data._mutable = True
        request.data['creator'] = group.creator_id 
        request.data['super_admin'] = request.user.id
        serializer = GroupSerializer(group, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class GroupMembersView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk, *args, **kwargs):
        group = get_object_or_404(Group, pk=pk)
        group.members.add(request.user)


        
        try : 
            mygroup = MyGroup.objects.get(user=request.user)
            mygroup.group.add(pk)
            mygroup.save()
           
            mygroup_ser = MyGroupSerializer(mygroup )
        except MyGroup.DoesNotExist :
            mygroup = MyGroup.objects.create(user=request.user)
            group = Group.objects.get(pk=pk) 
            mygroup.group.add(group)
            mygroup.save()
            mygroup_ser = MyGroupSerializer(mygroup )
        #Notification.objects.create(user=request.user, notf=f"You have been invited to join the {group.name} group.")
        Notification.objects.create(user=request.user,notification_type=4, title=f"You have been invited to join the {group.name} group.")



        return JsonResponse(mygroup_ser.data )



    
class MyGroupRetrieveAPIView(APIView):
    def get(self, request, pk, *args, **kwargs):
        try:
            mygroup = MyGroup.objects.get(pk=pk)
            serializer = MyGroupSerializer(mygroup)
            return Response(serializer.data)
        except MyGroup.DoesNotExist:
            return Response({"message": "MyGroup does not exist"}, status=status.HTTP_404_NOT_FOUND)
        
    def delete(self, request, pk, *args, **kwargs):
        group = get_object_or_404(Group, pk=pk)
        group.members.remove(request.user)
        return Response({'message': 'Left group successfully'})

    def get(self, request, pk, *args, **kwargs):
        group = get_object_or_404(Group, pk=pk)
        members = group.members.all()
        serializer = CustomUserSerializer(members, many=True)
        return Response({'members': serializer.data})


class AddGroupAdminView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk, *args, **kwargs):
        group = get_object_or_404(Group, pk=pk)

        if request.user != group.creator:
            return Response({"error": "Only the group creator can add group admins."}, status=status.HTTP_403_FORBIDDEN)

        serializer = AdminIdSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        admin_id = serializer.validated_data.get('admin_id')

        if not admin_id:
            return Response({"error": "Admin ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        if not group.members.filter(pk=admin_id).exists():
            return Response({"error": "The chosen admin must be among the members of the group."}, status=status.HTTP_400_BAD_REQUEST)

        group.admin.add(admin_id)
        admin_user = User.objects.get(pk=admin_id)
        Notification.objects.create(user=admin_user, notf=f"{request.user.name} has invited you to be the {group.name} group admin.")

        return Response({"message": "Admin added successfully."}, status=status.HTTP_200_OK)

class GroupPostView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk, *args, **kwargs):
        user_id = request.user.id
        try:
            user_instance = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        request.data._mutable = True
        request.data['creator'] = user_instance.id
        request.data['group'] = pk
        request.data['status'] = "pending"

        serializer = GroupPostSerializer(data=request.data)
        
        group = Group.objects.filter(pk=pk).first()
        if not group:
            return Response({"error": "Group does not exist"}, status=status.HTTP_404_NOT_FOUND)

        if not group.members.filter(pk=request.user.pk).exists():
            return Response({"error": "You are not a member of this group"}, status=status.HTTP_403_FORBIDDEN)
    
        if serializer.is_valid():
            created_post = serializer.save()
            response_data = serializer.data
            response_data['post_id'] = created_post.id

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    def get(self, request, pk, *args, **kwargs):
        group = get_object_or_404(Group, pk=pk)
        if group.admin.filter(pk=request.user.pk).exists(): 
            posts = GroupPost.objects.filter(group=group, status='pending')
        else:
            posts = GroupPost.objects.filter(group=group, status='approved') 
        serializer = GroupPostSerializer(posts, many=True)
        return Response(serializer.data)
     

    def delete(self, request, post_id, pk, *args, **kwargs):

        try:
            post = GroupPost.objects.get(id=post_id)

        except GroupPost.DoesNotExist:
            return Response({"error": "Post does not exist"}, status=status.HTTP_404_NOT_FOUND)

        post.delete()
        return Response({"message": "Post deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    
class GroupPostApprovedView(APIView):
    permission_classes = [IsAuthenticated]

    def get_approved_posts(self, pk):
        return GroupPost.objects.filter(group=pk, status='approved')

    def get(self, request, pk, *args, **kwargs):
        approved_posts = self.get_approved_posts(pk)
        if not approved_posts.exists():
            return Response({"message": "There are no approved posts for this group."}, status=status.HTTP_404_NOT_FOUND)
        serializer = GroupPostSerializer_GET(approved_posts, many=True)
        return Response(serializer.data)



class AdminPostAction(APIView):
    permission_classes = [IsAuthenticated]

    def approve_post(self, post_id):
        post = get_object_or_404(GroupPost, id=post_id)
        post.status = 'approved'
        post.save()

    def reject_post(self, post_id):
        post = get_object_or_404(GroupPost, id=post_id)
        post.delete()

    def put(self, request, post_id, *args, **kwargs):
        self.approve_post(post_id)
        return Response({"message": "Post approved successfully"}, status=status.HTTP_200_OK)

    def delete(self, request, post_id, *args, **kwargs):
        self.reject_post(post_id)
        return Response({"message": "Post rejected successfully"}, status=status.HTTP_200_OK)
    
