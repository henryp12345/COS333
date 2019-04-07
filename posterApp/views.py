from django.shortcuts import render
from django.http import HttpResponse
from .models import User, Event

# Create your views here.
def default(request):
	return HttpResponse("default page")

def event(request):
	e1 = User(username='test', hosted = '1', joined='2,3', notifications='1', invitations='2')
	e2 = User(username='test2', hosted = '3', joined='4,5', notifications='2', invitations='4')
	e1.save()
	e2.save()
	q = User.objects.all()
	value = ''
	for item in q:
		value = value + " " + item.username + '\n'
	return HttpResponse(q)

def eventId(request):
	return HttpResponse("nothing here yet")

def hosted(request):
	return HttpResponse("nothing here yet")

def joined(request):
	return HttpResponse("nothing here yet")

def clearAll(request):
	return HttpResponse('Tables cleared')
