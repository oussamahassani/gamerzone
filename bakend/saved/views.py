from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from posts.models import Post
from .models import SavedPost
from .serializers import SavedPostSerializer
from rest_framework.permissions import IsAuthenticated

class SavePostView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id):
        user = request.user
        try:
            post = Post.objects.get(pk=post_id)
            saved_post, created = SavedPost.objects.get_or_create(user=user, post=post)
            if not created:
                return Response({"message": "Post already saved"}, status=status.HTTP_400_BAD_REQUEST)
            serializer = SavedPostSerializer(saved_post)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Post.DoesNotExist:
            return Response({"message": "Post not found"}, status=status.HTTP_404_NOT_FOUND)

    def get(self, request):
        user = request.user
        saved_posts = SavedPost.objects.filter(user=user)
        serializer = SavedPostSerializer(saved_posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, post_id):
        user = request.user
        try:
            saved_post = SavedPost.objects.get(user=user, post_id=post_id)
            saved_post.delete()
            return Response({"message": "Post unsaved successfully"}, status=status.HTTP_204_NO_CONTENT)
        except SavedPost.DoesNotExist:
            return Response({"message": "Saved post not found"}, status=status.HTTP_404_NOT_FOUND)
        