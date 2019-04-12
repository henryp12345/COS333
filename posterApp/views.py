from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import User, Event
import json

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
		# formData = json.loads(request.body)
		# e1 = Event(title = formData.title, desc = formData.desc, location = formData.location, startTime = None, endTime = None,
		# 			date = None, capacity = formData.capacity, numberJoined = 0, tags = "", host = "")
		# e1.save()
		return HttpResponse("OK")

def eventId(request):
	return HttpResponse("nothing here yet")

def hosted(request):
	return HttpResponse("nothing here yet")

def joined(request):
	return HttpResponse("nothing here yet")

def clearAll(request):
	User.objects.all().delete()
	Event.objects.all().delete()
	return HttpResponse('Tables cleared')
