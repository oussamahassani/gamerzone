from django.urls import path
from .views import GroupReportsAPIView

urlpatterns = [
    path('reports', GroupReportsAPIView.as_view(), name='group_reports'),
    path('reports/groups/<int:group_id>/posts/<int:post_id>/', GroupReportsAPIView.as_view(), name='group_reports'),
]