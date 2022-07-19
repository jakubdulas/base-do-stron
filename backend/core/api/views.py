from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer, RegistrationSerializer
from rest_framework import status


# widok customowego JWT
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# Register
@api_view(['POST'])
def registration_view(request):
    serializer = RegistrationSerializer(data=request.data)
    data = {}
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def home(request):
    data = ['todo 1', 'todo 2']

    return Response(data)
