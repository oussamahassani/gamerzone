from django.db import models
from users.models import User
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
# Create your models here.
class Group(models.Model):
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

class GroupPost(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    file = models.FileField(upload_to='media/groupposts/',blank=False) 
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=20)
    approval_date = models.DateTimeField(default=timezone.now) 
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
