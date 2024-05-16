from django.db import models
from users.models import User
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
# Create your models here.
class Group(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=100)
    description = models.TextField()
    members = models.ManyToManyField(User, related_name='group_memberships', blank=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_groups')
    admin = models.ManyToManyField(User, related_name='admin_groups', blank=True)
    super_admin = models.ManyToManyField(User, related_name='super_admin_groups', blank=False)
    photo_grp=models.FileField(blank=False)
    photo_couv=models.FileField(upload_to='media/group/', blank=False)
    class Meta:
        db_table = 'groups'


class MyGroup(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user')
    group = models.ManyToManyField(Group, related_name='myGroup')
    class Meta:
        db_table = 'MyGroup'

class GroupPost(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    title = models.CharField(max_length=100)
    content = models.TextField()
    file = models.FileField(upload_to='media/groupposts/',blank=False) 
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=20)
    approval_date = models.DateTimeField(default=timezone.now) 
    group = models.ForeignKey(Group, on_delete=models.CASCADE , null=True, blank=True , default=None)