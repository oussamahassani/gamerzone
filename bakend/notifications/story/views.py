from datetime import timedelta
from django.utils import timezone
from django.shortcuts import get_object_or_404, render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Story , User
from .serializers import StorySerializer, StorySerializer_GET
from rest_framework.permissions import IsAuthenticated
# Create your views here.

class StoryView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user_id = request.user.id 
        request.data._mutable = True
        request.data['user'] = user_id

        serializer = StorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
    def get(self, request):
        twenty_four_hours_ago = timezone.now() - timedelta(hours=24)
        stories = Story.objects.filter(user=request.user ,  created__gte=twenty_four_hours_ago)
        serializer = StorySerializer_GET(stories, many=True)
        return Response(serializer.data)
    
    def delete(self, request, story_id):
        story = get_object_or_404(Story, id=story_id)
        if story.user != request.user:
            return Response({"error": "You are not allowed to delete this story"}, status=status.HTTP_403_FORBIDDEN)

        story.delete()
        return Response({"message": "Story deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    
def delete_expired_stories():
    twenty_four_hours_ago = timezone.now() - timedelta(hours=24)
    expired_stories = Story.objects.filter(created_at__lt=twenty_four_hours_ago)
    expired_stories.delete()