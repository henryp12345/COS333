from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def default(request):
	return HttpResponse("default page")

def event(request):
	e1 = User(username='test', hosted = '1', joined='2,3', notifications='1', invitations='2')
	e1.save()
	q = User.objects.all()
	return HttpResponse(str(q))

def clearAll(request):
	return HttpResponse('Tables cleared')
