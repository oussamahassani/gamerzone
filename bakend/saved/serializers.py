from rest_framework import serializers

from posts.serializers import PostSerializer
from users.serializers import CustomUserSerializer
from .models import SavedPost

class SavedPostSerializer(serializers.ModelSerializer):
    post = PostSerializer()
    user =  CustomUserSerializer()

    class Meta:
        model = SavedPost
        fields = '__all__'