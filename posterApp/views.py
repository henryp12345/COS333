from django.shortcuts import render
from django.core import serializers
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import User, Event
import json
import datetime

# Create your views here.
def default(request):
    return HttpResponse("")

@csrf_exempt
def event(request):
    if request.method == 'GET':
        values = Event.objects.all().values()
        values_list = list(values)
        return JsonResponse(values_list, safe=False)
    elif request.method == 'POST':
        formData = json.loads(request.body)
        e1 = Event(title = formData["title"], desc = formData["desc"], location = formData["location"], startDate = datetime.datetime.now(), endDate = datetime.datetime.now(), capacity = formData["capacity"], numberJoined = 0, tags = "", host = "")
        e1.save()
        return HttpResponse("OK")

def eventId(request, eventString):
    idList = eventString.split(",")
    event_list = []
    for eventId in idList:
        currentEvent = Event.objects.filter(id = eventId)
        event_list.append(currentEvent)
    return JsonResponse(event_list, safe=False)

def hosted(request, username):
    user = User.objects.get(username = username)
    eventsHosted = user.hosted
    return HttpResponse(eventsHosted)

def addHosted(request, username, idString):
    idList = idString.split(",")
    user = User.objects.get(username = username)
    currentHosted = user.hosted
    currentHosted = currentHosted + "," + idString
    user.hosted = currentHosted
    user.save()
    return HttpResponse("OK")

def joined(request, username):
    user = User.objects.get(username = username)
    eventsJoined = user.joined
    return HttpResponse(eventsJoined)

def addJoined(request, username, idString):
    idList = idSrting.split(",")
    user = User.objects.get(username = username)
    currentJoined = user.joined
    currentJoined = currentJoined + "," + idString
    user.joined = currentJoined
    return HttpResponse("OK")

def clearAll(request):
    User.objects.all().delete()
    Event.objects.all().delete()
    return HttpResponse('Tables cleared')
