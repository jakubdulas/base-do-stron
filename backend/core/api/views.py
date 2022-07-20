from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def home(request):
    data = ['todo 1', 'todo 2']

    return Response(data)
