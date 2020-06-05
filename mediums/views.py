# pylint: disable=no-member, no-self-use
#! AKA CONTROLLER

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Medium
from .serializers import MediumSerializer, PopulatedMediumSerializer #* imports serializer for model

#* inherits from django rest 
class MediumListView(APIView):

    #* attached permission to list view
    #* now you will need to be authenticated and need a token to create
    #* doesn't affect get requests
    #* for one item tuple you need to do (blob, )
    #! permission_classes = (IsAuthenticatedOrReadOnly, )

#* to tell user that it's an argument I had to use request but there's no functionality. _request supressing linter error.
    #! GET ALL MEDIUMS
    def get(self, _request):
        mediums = Medium.objects.all()
    #* now that I have all mediums - serialize
    #* get data from database and then pass through serializer
    #* serializer by default only handle one medium at a time. This way we ask the serializer to handle an array at once. We say this by saying many=True. If it's just one you do it without saying many=True.

        serailized_mediums = PopulatedMediumSerializer(mediums, many=True)
        return Response(serailized_mediums.data, status=status.HTTP_200_OK)