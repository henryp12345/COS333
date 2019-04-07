from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def default(request):
	return HttpResponse("default page")
def test(request):
	return HttpResponse("this is a test")
