from django.utils import timezone
from django.db import models
from users.models import User

# Create your models here.
class Story(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text_content = models.TextField(blank=True)
    media_file = models.ImageField(upload_to='media/story/',blank=False)
    created_at = models.DateTimeField(default=timezone.now)
    class Meta:
        db_table = 'story'

