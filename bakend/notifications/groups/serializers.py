from rest_framework import serializers
from groups.models import Group, GroupPost
from users.serializers import UserSerializer
from users.models import User
class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'

class GroupSerializer_Get(serializers.ModelSerializer):
    super_admin = UserSerializer(many=True)
    admin = UserSerializer(many=True)
    members = UserSerializer(many=True)
    class Meta:
        model = Group
        fields = '__all__'


class AdminIdSerializer(serializers.Serializer):
    admin_id = serializers.IntegerField()


class GroupPostSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = GroupPost
        fields = '__all__'

class GroupPostSerializer_GET(serializers.ModelSerializer):
    creator =  UserSerializer()

    class Meta:
        model = GroupPost
        fields = '__all__'