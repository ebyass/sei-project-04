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
        serialized_mediums = PopulatedMediumSerializer(mediums, many=True)
        return Response(serialized_mediums.data, status=status.HTTP_200_OK)

# #! PERMISSION DENIED
# #* if they are not the same person return permission denied
# #* add to put methods, delete and update
# #* if they are not the same permission denied
#     def is_song_owner(self, song, user):
#         if song.owner.id != user.id:
#             raise PermissionDenied()

#* handling single instances - show, delete
    #* pk = primary key
class MediumDetailView(APIView):

    #! add back in
    #* permission_classes = (IsAuthenticatedOrReadOnly, )

#* now we can reuse the try and except for al the requests, instead of repeating in each request. Makes code leaner.
    def get_medium(self, pk):
        try:
            return Medium.objects.get(pk=pk)
        except Medium.DoesNotExist:
            #* equivalent to Throw
            raise NotFound()

    #! GET ONE MEDIUM
    def get(self, _request, pk):
            medium = self.get_medium(pk) 
            #* once the medium is selected - serialize
            serialized_medium = PopulatedMediumSerializer(medium)
            return Response(serialized_medium.data)
            #* DoesNotExist is the acutal error name you can see on insomnia for example