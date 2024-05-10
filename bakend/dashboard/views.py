from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from datetime import date
from collections import defaultdict
from follow.models import Follow
from posts.models import Post
from .models import User
from rest_framework.permissions import IsAuthenticated
from datetime import timedelta
from story.models import Story
import calendar


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
        'Grombalia', 'Djerba'
    ]
    
    for user in User.objects.all():
#age
        age = (today - user.birthday).days // 365 if user.birthday else None 
        if age is not None:
            age_group = calculate_age_group(age)          
            age_groups[age_group] += 1

#location        
        location = user.location
        if location in tunisia_cities:
            traffic_by_location[location] += 1
            
#gender
        gender = user.gender
        if gender:
            traffic_by_gender[gender] += 1

#new followers count
        new_followers_count = Follow.objects.filter(created_at__date__gte=one_week_ago).count()

#total number of followers
        total_followers_count = Follow.objects.values('followed_user').distinct().count()
 


# Retrieve top 5 posts of the week based on likes
        top_posts = Post.objects.filter(created_at__date__gte=one_week_ago).order_by('-nb_likes')[:5]
# Calculate average likes and comments for each top post
        week_posts_performance = []
        for post in top_posts:
            total_likes = post.nb_likes
            total_comments = post.nb_comments
            
            avg_likes = total_likes / (total_comments or 1)
            avg_comments = total_comments / (total_likes or 1)
       
            # Get the day name of the post
            day_name = calendar.day_name[post.created_at.weekday()]

#week posts performance
            week_posts_performance.append({
                'post_id': post.id,
                'created_at': post.created_at,
                'avg_likes': avg_likes,
                'day_name': day_name,
                'avg_comments': avg_comments
            })


# Week stories performance
        week_story_count = Story.objects.filter(user=request.user, created_at__gte=one_week_ago).count()




    data = {
        'traffic_by_age': dict(age_groups),
        'traffic_by_location': dict(traffic_by_location),
        'traffic_by_gender': dict(traffic_by_gender),
        'new_followers_count': new_followers_count,
        'total_followers_count': total_followers_count,
        'week_posts_performance':week_posts_performance,
        'week_story_count': week_story_count
 
    }

    return Response(data)
