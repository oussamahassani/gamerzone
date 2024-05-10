from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from groups.models import GroupPost
from users.models import User
from .models import Report
from .serializers import ReportSerializer
from rest_framework.permissions import IsAuthenticated
from notifications.models import Notifications
# Create your views here.


class GroupReportsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, group_id, post_id, format=None, *args, **kwargs):
        user = request.user
        
        data = request.data
        reported_item_id = post_id
        reported_item_type = 'post'
        reason = request.data.get('reason')

        try:
            post = GroupPost.objects.get(id=reported_item_id)
        except GroupPost.DoesNotExist:
            return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)

        report_data = {
            'reported_by': user.id,
            'reported_item_id': reported_item_id,
            'reported_item_type': reported_item_type,
            'reason': reason
        }
        serializer = ReportSerializer(data=report_data)
        if serializer.is_valid():
            serializer.save()

            # Determine where to send the report based on reported item type
            if post.is_on_homepage():
                super_admin = User.objects.get(is_superuser=True)
                Notifications.objects.create(recipient=super_admin, content="New report on homepage post")
            else:
                group_admin = post.group.admin
                Notifications.objects.create(recipient=group_admin, content="New report on group post")

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def get(self, request, format=None, *args, **kwargs):
        user = request.user
        if not user.is_superuser:
            return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

        reports = Report.objects.all()
        serializer = ReportSerializer(reports, many=True)
        return Response(serializer.data)