from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import User, Event

# Create your views here.
def default(request):
	return HttpResponse("default page")

def event(request):
	e1 = User(username='test', hosted = '1', joined='2,3', notifications='1', invitations='2')
	e1.save()
	q = User.objects.all()
	values = User.objects.all().values()
	values_list = list(values)
	return JsonResponse(values_list, safe=False)

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
