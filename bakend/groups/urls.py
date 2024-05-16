from django.contrib import admin
from django.urls import path 
from groups.views import AddGroupAdminView,GroupByIdAPIView,AdminPostAction,GroupPostPandingView, GroupCreateAPIView, GroupMembersView, GroupPostApprovedView, GroupPostView, MyGroupRetrieveAPIView 


urlpatterns = [    
    path('groups/members/<int:pk>', GroupMembersView.as_view(), name='group-members'),
    path('groups/members/<int:pk>/<int:user_id>', GroupMembersView.as_view(), name='group-members'),
    path('groups/mygroups/<int:pk>/', MyGroupRetrieveAPIView.as_view(), name='mygroups'),

    path('groups', GroupCreateAPIView.as_view(), name='group-detail'),
    path('groups/<int:pk>', GroupCreateAPIView.as_view(), name='group-detail'),
 path('GroupByIdAPIView/<int:pk>', GroupByIdAPIView.as_view(), name='group-detail'),
    
    path('group/posts/<int:pk>', GroupPostView.as_view(), name='groupposts_create'),

    path('approved-posts/<int:pk>', GroupPostApprovedView.as_view(), name='approved-posts'),
    path('panding-posts/<int:pk>', GroupPostPandingView.as_view(), name='approved-posts'),

    path('admin/approve/<int:post_id>', AdminPostAction.as_view(), name='admin_approve_post'),
    path('admin/reject/<int:post_id>', AdminPostAction.as_view(), name='admin_reject_post'),

    path('groups/<int:pk>/add-admin', AddGroupAdminView.as_view(), name='add_group_admin'),


]