from rest_framework import serializers
from users.serializers import CustomUserSerializer
from users.models import User
from .models import Story

class StorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Story
        fields = '__all__'


class StorySerializer_GET(serializers.ModelSerializer):
    user =  CustomUserSerializer()
    class Meta:
        model = Story
        fields = '__all__'