from rest_framework import serializers
from users.serializers import UserSerializer
from users.models import User
from .models import Story

class StorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Story
        fields = '__all__'


class StorySerializer_GET(serializers.ModelSerializer):
    user =  UserSerializer()
    class Meta:
        model = Story
        fields = '__all__'