# pylint: disable=no-member, no-self-use
#! AKA CONTROLLER

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.exceptions import NotFound, PermissionDenied


from .models import Favourite
from .serializers import FavouriteSerializer

class FavouriteListView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly, )

    #! GET ALL FAVOURITES
    def get(self, _request):
        favourites = Favourite.objects.all()
    #* now that we have all reviews -> serialize
    #* get data from database and then pass through serializer
    #* serializer by default only handle one song at a time. This way we ask the serializer to hangle an array at once. We say this by saying many=True. If it's just one you do it without saying many=True.
        serialized_favourites = FavouriteSerializer(favourites, many=True)
        return Response(serialized_favourites.data, status=status.HTTP_200_OK)

#! PERMISSION DENIED
#* if they are not the same person return permission denied
#* add to put methods, delete and update
#* if they are not the same permission denied
    def is_review_owner(self, review, user):
        if review.owner.id != user.id:
            raise PermissionDenied()


#! CREATE FAVOURITE
    def post(self, request):
        #* to add the owner
        request.data['owner'] = request.user.id
        #* to convert it from json passing a valid object to fit serializer
        #* request.data = body
        new_favourite = FavouriteSerializer(data=request.data)
        #* if it's True its ok to go ahead and create a song in the database - using iS_valid() method
        #* returns true or false did this data meet the rules set
        if new_favourite.is_valid():
            new_favourite.save()
            return Response(new_favourite.data, status=status.HTTP_201_CREATED)
        #* if it's not valid
        return Response(new_favourite.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

#* handling single instances - show, delete
    #* pk = primary key
class FavouriteDetailView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly, )

#* now we can reuse the try and except for al the requests, instead of repeating in each request. Makes code leaner.
    def get_favourite(self, pk):
        try:
            return Favourite.objects.get(pk=pk)
        except Favourite.DoesNotExist:
            #* equivalent to Throw in js
            raise NotFound()


    def is_favourite_owner(self, favourite, user):
        if favourite.owner.id != user.id:
            raise PermissionDenied()


#! DELETE A FAVOURITE
    def delete(self, request, pk):
        favourite_to_delete = self.get_favourite(pk)
        #* ARE THEY ALLOWED
        self.is_favourite_owner(favourite_to_delete, request.user)
        request.data['owner'] = request.user.id
        #* if the review has been found then
        favourite_to_delete.delete()
        #* nothing to send back because we deleted the review
        return Response(status=status.HTTP_204_NO_CONTENT)