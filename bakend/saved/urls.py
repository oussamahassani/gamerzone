from django.urls import path
from .views import SavePostView

urlpatterns = [
    path('save/<int:post_id>', SavePostView.as_view(), name='save_post'),
    path('saved-posts', SavePostView.as_view(), name='saved_posts_list'),
    path('unsave/<int:post_id>', SavePostView.as_view(), name='unsave_post'),

]