from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from datetime import date
from collections import defaultdict
from posts.models import Post
from .models import User
from users.models import Follow
from users.serializers import CustomUserSerializer,CustomFollowSerializer

from rest_framework.permissions import IsAuthenticated
from datetime import timedelta
from story.models import Story
import calendar
from datetime import datetime
from django.db import models
from django.db.models import Count

def calculate_age_group(age):
    if age < 12:
        return '0-11'
    elif age < 18:
        return '12-17'
    elif age < 30:
        return '18-29'
    elif age < 40:
        return '30-39'
    elif age < 50:
        return '40-49'
    elif age < 60:
        return '50-59'
    elif age < 70:
        return '60-69'
    else:
        return '70+'

@api_view(['GET'])
@permission_classes([IsAuthenticated])

def dashboard(request):
    today = date.today()
    one_week_ago = today - timedelta(days=7)
    age_groups = defaultdict(int)
    traffic_by_location = defaultdict(int)
    traffic_by_gender = defaultdict(int)
    new_followers_count = 0  
    week_posts_performance = []
    week_story_count = [] 


    tunisia_cities = [
        'Tunis', 'Sfax', 'Sousse', 'Kairouan', 'Bizerte', 'Gabès', 'Ariana', 'Gafsa',
        'La Marsa', 'Hammamet', 'Monastir', 'Nabeul', 'Tataouine', 'Mahdia', 'Jendouba',
        'Beja', 'Kasserine', 'Tozeur', 'Medenine', 'Siliana', 'Zaghouan', 'Kebili', 
        'Grombalia', 'Djerba' , 'Sidi Bouzid'
    ]
    
    userconnected = request.user

    followers_obj=Follow.objects.filter(following=userconnected)
    data=[]
    for i in followers_obj:
        data.append(CustomUserSerializer( i.follower).data)

    for user in followers_obj:
        location = user.follower.location
        if location in tunisia_cities:
            # Increment traffic count for the corresponding location
            traffic_by_location[location] = traffic_by_location.get(location, 0) + 1

        # Gender
        gender = user.follower.gender
        if gender:
            # Increment traffic count for the corresponding gender
            traffic_by_gender[gender] = traffic_by_gender.get(gender, 0) + 1




 


# Retrieve top 5 posts of the week based on likes
        top_posts = Post.objects.filter(posted__date__gte=one_week_ago).order_by('-likes')[:5]
# Calculate average likes and comments for each top post
        week_posts_performance = []
        for post in top_posts:
            total_likes = post.likes
           
            avg_likes = total_likes 
       
            # Get the day name of the post
            day_name = calendar.day_name[post.posted.weekday()]

#week posts performance
            week_posts_performance.append({
                'post_id': post.id,
                'created_at': post.posted,
                'avg_likes': avg_likes,
                'day_name': day_name,

            })


# Week stories performance
       # week_story_count = Story.objects.filter(user=request.user, created_at__gte=one_week_ago).count()


    # Retrieve counts of users created each month and year

    user_counts = User.objects.filter(
        follower__in=followers_obj
    ).annotate(
        year=models.functions.ExtractYear('created'),
        month=models.functions.ExtractMonth('created')
    ).values('year', 'month').annotate(count=Count('id')).order_by('year', 'month')


    post_count = Post.objects.filter(user=userconnected.id).count()
    user_count = Follow.objects.filter(following=userconnected).count()
# Count all rows in the User model
    
    data = {
        #'traffic_by_age': dict(age_groups),
        'traffic_by_location': dict(traffic_by_location),
        'traffic_by_gender': dict(traffic_by_gender),
        'week_posts_performance':week_posts_performance,
        #'week_story_count': week_story_count,
        'user_counts':user_counts,
		'post_count':post_count,
		'user_count':user_count,
 
    }

    return Response(data)
