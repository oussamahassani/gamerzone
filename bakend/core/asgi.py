import os
import django
from channels.routing import get_default_application
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from channels.auth import AuthMiddlewareStack
from .wsgi import *
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from .token_auth import TokenAuthMiddlewareStack
from notifications.consumers import *
from chats.consumers import *
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()
#application = get_default_application()
application = ProtocolTypeRouter({
    'http':get_asgi_application(),
    'websocket':TokenAuthMiddlewareStack(
        URLRouter([
            path('ws/noticount/',NotiConsumer.as_asgi()),
            path('ws/chat/<str:chat_id>/',ChatConsumer.as_asgi()),
            path('ws/recent/',ChatRecentConsumer.as_asgi()),
        ]))
})