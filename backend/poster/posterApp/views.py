from django.shortcuts import render
from django.core import serializers
from django.forms.models import model_to_dict
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q
from django.db.models import F
from pusher_chatkit import PusherChatKit
from pusher_chatkit.backends import RequestsBackend
from django.shortcuts import render_to_response
from .models import User, Event
import json
import datetime
import dateutil.parser
import pytz
import hashlib

# Create your views here.
# retest
def default(request):
    return render_to_response('./privacy_policy.html')

@csrf_exempt
def event(request, username):
    if request.method == 'GET':
        username = username.lower()
        user = User.objects.get(username = username)
        EventList = user.joined.split(",")
        for i in user.hosted.split(","):
            EventList.append(i)
        values = Event.objects.filter(endDate__gt = datetime.datetime.now())
        for thing in EventList:
            if len(thing) > 0:
                values = values.exclude(id = thing)
        values = values.values()
        values_list = list(values)
        return JsonResponse(values_list, safe=False)
    elif request.method == 'POST':
        formData = json.loads(request.body)
        e1 = Event(title = formData["title"], desc = formData["desc"], location = formData["location"], startDate = dateutil.parser.parse(formData["startdate"]), endDate = dateutil.parser.parse(formData["enddate"]), capacity = formData["capacity"], numberJoined = 0, tags = formData["tags"], host = formData["host"], chatroom = formData["chatId"])
        e1.save()
        e1.startDate = e1.startDate - datetime.timedelta(hours = 4)
        e1.endDate = e1.endDate - datetime.timedelta(hours = 4)
        e1.save()
        return addHosted(request, formData["host"], str(e1.id))

def eventId(request, eventString):
    idList = eventString.split(",")
    event_list = []
    for eventId in idList:
        if len(eventId) > 0 and Event.objects.filter(id = eventId).count() > 0:
            currentEvent = Event.objects.get(id = eventId)
            est = pytz.timezone('US/Eastern')
            startDate = currentEvent.startDate.replace(tzinfo = est)
            # startDate = utc.localize(startDate)
            if startDate > datetime.datetime.now(startDate.tzinfo):
                eventDict = model_to_dict(currentEvent)
                event_list.append(eventDict)
    return JsonResponse(event_list, safe=False)

def hosted(request, username):
    username = username.lower()
    user = User.objects.get(username = username)
    eventsHosted = user.hosted
    return eventId(request, eventsHosted)

def addHosted(request, username, idString):
    idList = idString.split(",")
    username = username.lower()
    user = User.objects.get(username = username)
    currentHosted = user.hosted
    if currentHosted == "":
        currentHosted = "," + idString + ","
    else:
        currentHosted = currentHosted + idString + ","
    user.hosted = currentHosted
    user.save()
    return HttpResponse("OK")

def joined(request, username):
    username = username.lower()
    user = User.objects.get(username = username)
    eventsJoined = user.joined
    return eventId(request, eventsJoined)

def addJoined(request, username, idString):
    username = username.lower()
    idList = idString.split(",")
    user = User.objects.get(username = username)
    for item in idList:
        if item in user.joined or item in user.hosted:
            return HttpResponse("Already joined")
    # Updates numberJoined for the events
    for item in idList:
        if len(item) > 0 and Event.objects.filter(id = item).count() > 0:
            currentEvent = Event.objects.get(id = item)
            if currentEvent.numberJoined < currentEvent.capacity:
                currentJoined = currentEvent.numberJoined
                currentJoined = currentJoined + 1
                currentEvent.numberJoined = currentJoined
                currentEvent.save()
                currentUser = User.objects.get(username = currentEvent.host)
                currentNotifications = currentUser.notifications
                currentNotifications = currentNotifications + "," + item
                currentUser.notifications = currentNotifications
                currentUser.save()
            else:
                return HttpResponse("Event is full")
    currentJoined = user.joined
    if currentJoined == "":
        currentJoined = "," + idString + ","
    else:
        currentJoined = currentJoined + idString + ","
    user.joined = currentJoined
    user.save()
    return HttpResponse(currentJoined)

def addUser(request, username, passHash, first, last):
    username = username.lower()
    passHash = hashlib.sha256(passHash.encode('utf8')).hexdigest()
    if (User.objects.filter(username = username).count() == 0):
        newUser = User(username = username, hosted = "", joined = "", notifications = "", newMessages = "", passHash = passHash, firstName = first, lastName = last)
        newUser.save()
        chatkit = PusherChatKit(instance_locator = 'v1:us1:d8ae0067-3c87-4ca0-b2a0-5af6e602488e', api_key = '2ff7c102-14e2-4dd6-9414-bfa3f5c66e41:ZiwVYEh7mWf5zmxuZHKq1jyQ7bO5Z5iGSHyg4SDBDUQ=')
        chatkit.create_user(user_id = username, name = first)
        return HttpResponse("OK")
    else:
        return HttpResponse("User taken")

def notifications(request, username):
    username = username.lower()
    user = User.objects.get(username = username)
    returnValue = eventId(request, user.notifications)
    user.notifications = ""
    user.save()
    return returnValue

def newMessages(request, username):
    username = username.lower()
    user = User.objects.get(username = username)
    messageString = user.newMessages
    returnValue = eventId(request, messageString)
    user.newMessages = ""
    user.save()
    return returnValue

def addMessage(request, username, roomId):
    username = username.lower()
    user = User.objects.get(username = username)
    if roomId not in user.newMessages:
        user.newMessages = user.newMessages + roomId + ","
        user.save()
    return HttpResponse("OK")

def leave(request, username, idString):
    username = username.lower()
    # Delete from users events string
    user = User.objects.get(username = username)
    x = user.joined.replace(idString, '')
    user.joined = x;
    user.save()
    idList = idString.split(",")
    for item in idList:
        if len(item) > 0 and Event.objects.filter(id = item).count() > 0:
            currentEvent = Event.objects.get(id = item)
            if currentEvent.numberJoined > 0:
                currentEvent.numberJoined = currentEvent.numberJoined - 1
            currentEvent.save()
    return HttpResponse(x)

def delete(request, username, idString):
    username = username.lower()
    # Remove from users' joined string
    users = User.objects.all().filter(joined__contains = idString)
    for user in users:
        x = user.joined.replace(idString, '')
        user.joined = x
        user.save()
    # Remove from events database
    event = Event.objects.get(id = idString)
    event.delete()
    return HttpResponse("OK")

def recommendations(request, username):
    username = username.lower()
    user = User.objects.get(username = username)
    EventList = user.joined.split(",")
    Tags = {}
    for item in EventList:
        if len(item) > 0 and Event.objects.filter(id = item).count() > 0:
            currentEvent = Event.objects.get(id = item)
            Event_tags = currentEvent.tags.split(",")
            for tag in Event_tags:
                if len(tag) == 0:
                    continue
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
                if len(tag) == 0:
                    continue
                if tag in Tags:
                    Tags[tag] = Tags[tag] + 1
                else:
                    Tags[tag] = 1
    top = ""
    sec = ""
    count = 0
    for tag in Tags:
        if count == 0:
            count = 1
            top = tag
            continue
        if count == 1:
            count = 2
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
    values = Event.objects.filter(Q(tags__contains = top) | Q(tags__contains = sec))
    values = values.filter(startDate__gt =  datetime.datetime.now() - datetime.timedelta(hours = 4))
    for item in EventList:
        if len(item) > 0:
            values = values.exclude(id = item)
    for item in HostedList:
        if len(item) > 0:
            values = values.exclude(id = item)
    values = values.exclude(numberJoined = F('capacity')).values()
    values_list = list(values)
    return JsonResponse(values_list, safe=False)

def today(request, username):
    username = username.lower()
    values = Event.objects.filter(endDate__gte = datetime.datetime.now() - datetime.timedelta(hours = 4)).filter(startDate__lt = datetime.date.today() + datetime.timedelta(days = 1)).exclude(numberJoined = F('capacity')).values()
    values_list = list(values)
    return JsonResponse(values_list, safe = False)

def tomorrow(request, username):
    username = username.lower()
    values = Event.objects.filter(startDate__gte = datetime.date.today() + datetime.timedelta(days = 1)).filter(startDate__lt = datetime.date.today() + datetime.timedelta(days = 2)).exclude(numberJoined = F('capacity')).values()
    values_list = list(values)
    return JsonResponse(values_list, safe=False)

def getUser(request, username):
    username = username.lower()
    user = User.objects.get(username = username)
    userDict = model_to_dict(user)
    return JsonResponse(userDict, safe=False)

def authUser(request, username, passHash):
    username = username.lower()
    passHash = hashlib.sha256(passHash.encode('utf-8')).hexdigest()
    if (User.objects.filter(username = username, passHash = passHash).count() == 0):
        return HttpResponse("Incorrect username/password")
    else:
        return HttpResponse("OK")
