from django.db import models
from users.models import User
# Create your models here.


class LocationStatistic(models.Model):
    location = models.CharField(max_length=255)
    count = models.IntegerField(default=0)

class GenderStatistic(models.Model):
    gender = models.CharField(max_length=10)
    count = models.IntegerField(default=0)

# class ViewCountStatistic(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     count = models.IntegerField(default=0)