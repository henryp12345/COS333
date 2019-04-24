from django.shortcuts import render
from django.core import serializers
from django.forms.models import model_to_dict
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q
from django.db.models import F
from .models import User, Event
import json
import datetime
import dateutil.parser

# Create your views here.
def default(request):
    return HttpResponse("")

@csrf_exempt
def event(request):
    if request.method == 'GET':
        values = Event.objects.all().filter(endDate__gt = datetime.datetime.now()).values()
        values_list = list(values)
        return JsonResponse(values_list, safe=False)
    elif request.method == 'POST':
        formData = json.loads(request.body)
        e1 = Event(title = formData["title"], desc = formData["desc"], location = formData["location"], startDate = dateutil.parser.parse(formData["startdate"]), endDate = dateutil.parser.parse(formData["enddate"]), capacity = formData["capacity"], numberJoined = 0, tags = formData["tags"], host = formData["host"], chatroom = formData["chatId"])
        e1.save()
        addHosted(request, formData["host"], str(e1.id))
        return HttpResponse(e1.id)

def eventId(request, eventString):
    idList = eventString.split(",")
    event_list = []
    for eventId in idList:
        if len(eventId) > 0 and Event.objects.filter(id = eventId).count() > 0:
            currentEvent = Event.objects.get(id = eventId)
            if currentEvent.endDate > datetime.datetime.now():
                eventDict = model_to_dict(currentEvent)
                event_list.append(eventDict)
    return JsonResponse(event_list, safe=False)

def hosted(request, username):
    user = User.objects.get(username = username)
    eventsHosted = user.hosted
    return eventId(request, eventsHosted)

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
    return eventId(request, eventsJoined)

def addJoined(request, username, idString):
    idList = idString.split(",")
    user = User.objects.get(username = username)
    currentJoined = user.joined
    currentJoined = currentJoined + "," + idString
    user.joined = currentJoined
    user.save()
    # Updates numberJoined for the events
    for item in idList:
        if len(item) > 0 and Event.objects.filter(id = item).count() > 0:
            currentEvent = Event.objects.get(id = item)
            currentJoined = currentEvent.numberJoined
            currentJoined = currentJoined + 1
            currentEvent.numberJoined = currentJoined
            currentEvent.save()
            currentUser = User.objects.get(username = currentEvent.host)
            if item in currentUser.joined or item in currentUser.hosted:
                return HttpResponse("Already joined")
            currentNotifications = currentUser.notifications
            currentNotifications = currentNotifications + "," + item
            currentUser.notifications = currentNotifications
            currentUser.save()
    return HttpResponse(idString)

def addUser(request, username):
    newUser = User(username = username, hosted = "", joined = "", notifications = "", newMessages = "")
    newUser.save()
    return HttpResponse("OK")

def notifications(request, username):
    user = User.objects.get(username = username)
    notificationString = user.notifications
    return eventId(request, notificationString)

def newMessages(request, username):
    user = User.objects.get(username = username)
    messageString = user.newMessages
    return eventId(request, messageString)

def leave(request, username, idString):
    # Delete from users events string

    return HttpResponse("OK")

def delete(request, username, idString):
    # Remove from users joined string
    # Remove from events database
    return HttpResponse("OK")

def recommendations(request, username):
    user = User.objects.get(username = username)
    EventList = user.joined.split(",")
    Tags = {}
    for item in EventList:
        if len(item) > 0 and Event.objects.filter(id = item).count() > 0:
            currentEvent = Event.objects.get(id = item)
            Event_tags = currentEvent.tags.split(",")
            for tag in Event_tags:
                if tag in Tags:
                    Tags[tag] = Tags[tag] + 1
                else:
                    Tags[tag] = 1
    HostedList = user.hosted.split(",")
    for item in HostedList:
        if len(item) > 0 and Event.objects.filter(id = item).count() > 0:
            currentEvent = Event.objects.get(id = item)
            Event_tags = currentEvent.tags.split(",")
            for tag in Event_tags:
                if tag in Tags:
                    Tags[tag] = Tags[tag] + 1
                else:
                    Tags[tag] = 1
    top = ""
    sec = ""
    count = 0
    # return JsonResponse(Tags, safe=False)
    for tag in Tags:
        if count == 0:
            count = 1
            top = tag
            continue
        if count == 1:
            count == 2
            if Tags[top] < Tags[tag]:
                sec = top
                top = tag
            else:
                sec = tag
            continue
        if Tags[tag] > Tags[top]:
            sec = top
            top = tag
        elif Tags[tag] > Tags[sec]:
            sec = tag
    if len(top) == 0 or len(sec) == 0:
        return HttpResponse("not enough events joined")
    values = Event.objects.filter(Q(tags = top) | Q(tags = sec))
    values = values.exclude(numberJoined = F('capacity'))
    values = values.filter(startDate__gt =  datetime.datetime.now()).values()
    values_list = list(values)
    return JsonResponse(values_list, safe=False)

def clearAll(request):
    User.objects.all().delete()
    Event.objects.all().delete()
    return HttpResponse('Tables cleared')
