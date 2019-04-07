from django.db import models

# Create your models here.
class Event(models.Model):
    title = models.CharField(max_length=15)
    desc = models.CharField(max_length=300)
    location = models.CharField(max_length=25)
    startTime = models.TimeField()
    endTime = models.TimeField()
    date = models.DateField()
    capacity = models.IntegerField()
    numberJoined = models.IntegerField()
    tags = models.CharField(max_length=200)
    host = models.CharField(max_length=30)

class User(models.Model):
    username = models.CharField(max_length=30)
    hosted = models.CharField(max_length=200)
    joined = models.CharField(max_length=200)
    notifications = models.CharField(max_length=200)
    invitations = models.CharField(max_length=200)
