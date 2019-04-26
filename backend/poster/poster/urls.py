"""poster URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from posterApp import views

urlpatterns = [
    path('', views.default),
    path('event/', views.event),
    path('event/<str:eventString>/', views.eventId),
    path('hosted/<str:username>/', views.hosted),
    path('addHosted/<str:username>/<str:idString>/', views.addHosted),
    path('joined/<str:username>/', views.joined),
    path('addJoined/<str:username>/<str:idString>/', views.addJoined),
    path('clear/', views.clearAll),
    path('addUser/<str:username>/<str:passHash>/', views.addUser),
    path('notifications/<str:username>/', views.notifications),
    path('newMessages/<str:username>/', views.newMessages),
    path('leave/<str:username>/<str:idString>/', views.leave),
    path('delete/<str:username>/<str:idString>/', views.delete),
    path('recs/<str:username>/', views.recommendations),
    path('addMessage/<str:username>/<str:roomId>/', views.addMessage),
    path('getUser/<str:username>/', views.getUser),
    path('authUser/<str:username>/<str:passHash>/', views.authUser),
    path('admin/', admin.site.urls),
]
