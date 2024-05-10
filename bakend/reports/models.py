from django.db import models
from groups.models import Group , GroupPost

# Create your models here.
class Report(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    report_type = models.CharField(max_length=10)  # post or person
    object_id = models.IntegerField() #id of user or post
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    #reported_post= models.ForeignKey(GroupPost, on_delete=models.CASCADE , null=True, blank=True)
