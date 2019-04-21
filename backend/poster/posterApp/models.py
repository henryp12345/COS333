from django.db import models
from django.utils import timezone

# Create your models here.
class Event(models.Model):
    title = models.CharField(max_length=15)
    desc = models.CharField(max_length=300)
    location = models.CharField(max_length=25)
    startDate = models.DateTimeField(default=timezone.now)
    endDate = models.DateTimeField(default=timezone.now)
    capacity = models.IntegerField()
    numberJoined = models.IntegerField()
    tags = models.CharField(max_length=200)
    host = models.CharField(max_length=30)
    chatroom = models.CharField(max_length=50, default = '')

class User(models.Model):
    username = models.CharField(max_length=30)
    hosted = models.CharField(max_length=200)
    joined = models.CharField(max_length=200)
    notifications = models.CharField(max_length=200)
    newMessages = models.CharField(max_length=200)
