from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import User, Event
import json
import datetime

# Create your views here.
def default(request):
	return HttpResponse("default page")

@csrf_exempt
def event(request):
	if request.method == 'GET':
		values = Event.objects.all().values()
		values_list = list(values)
		return JsonResponse(values_list, safe=False)
	elif request.method == 'POST':
		formData = json.loads(request.body)
		e1 = Event(title = formData["title"], desc = formData["desc"], location = formData["location"], startTime = datetime.datetime.now().time(), endTime = datetime.datetime.now().time(),
					date = datetime.date.today(), capacity = formData["capacity"], numberJoined = 0, tags = "", host = "")
		e1.save()
		return HttpResponse("OK")

def eventId(request, eventId):
	event = Event.objects.get(id = eventId)
	event_list = list(event)
	return JsonResponse(event_list, safe=False)

@csrf_exempt
def hosted(request, username):
	if request.method == 'GET':
		u1 = User(username="asd", hosted="1,2,3", joined="4,5,6", notifications="1,2,3", invitations="")
		u1.save()
		user = User.objects.get(username = username)
		eventsHosted = user.hosted
		hostedList = eventsHosted.split(",")
		return JsonResponse(hostedList, safe=False)
	elif request.method == 'POST':
		return HttpResponse("not implemented")

def joined(request, username):
	return HttpResponse("nothing here yet")

def clearAll(request):
	User.objects.all().delete()
	Event.objects.all().delete()
	return HttpResponse('Tables cleared')
