# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from .models import Favourite
from .serializers import FavouriteSerializer, PopulatedFavouriteSerializer
# from jwt_auth.models import User
# from django.contrib.auth import get_user_model
# User = get_user_model()

class FavouriteListView(APIView):
    #! GET ALL FAVOURITES
    permission_classes = (IsAuthenticated, )
    def get(self, _request):
        favourite_mediums = Favourite.objects.all()
        serialized_favourites = FavouriteSerializer(favourite_mediums, many=True)
        print('HERE', serialized_favourites)
        return Response(serialized_favourites.data, status=status.HTTP_200_OK)

    # def get_favourites(self, user_favourites):
    #     try:
    #         return User.objects.get(user_favourites=user_favourites)
    #     except User.DoesNotExist:
    #         raise PermissionDenied()

        # print('this is request.user', request.user)
        # print('this is request.data', request.data['owner'])
        # print('this is the favourites', request.user['user_favourites'])
        # print('this is request.user', request.user)
        # print('this is request.data', request.data['owner'])
        # print('this is the favourites', request.user['user_favourites'])

    #! CREATE FAVOURITES
    # def post(self, request):
    #     request.data['owner'] = request.user.id
    #     new_fave = PopulatedFavouriteSerializer(data=request.data)
    #     if new_fave.is_valid():
    #         new_fave.save()
    #         return Response(new_fave.data, status=status.HTTP_201_CREATED)
    #     return Response(new_fave.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)    

class FavouriteDetailView(APIView):
    
    permission_classes = (IsAuthenticated,)

    def get_favourite(self, pk):
        try:
            return Favourite.objects.get(pk=pk)
        except Favourite.DoesNotExist:
            raise NotFound()

    def is_favourite_owner(self, favourite, user):
        print('this is it', favourite.owner.id)
        if favourite.owner.id != user.id:
            raise PermissionDenied()

    #! UPDATE FAVOURITES

    def put(self, request, pk):
        favourite_to_add = self.get_favourite(pk)
        #* ARE THEY ALLOWED

        # self.is_favourite_owner(favourite_to_add, request.user)

        #* merging data coming from database and coming from serializer
        added_favourite = FavouriteSerializer(favourite_to_add, data=request.data)
        #* if it's valid
        if added_favourite.is_valid():
            added_favourite.save()
            #* send back with changes
            return Response(added_favourite.data, status=status.HTTP_202_ACCEPTED)
        #* if invalid
        return Response(added_favourite.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    #! DELETE A FAVOURITE
    def delete(self, request, pk):
        favourite_to_delete = self.get_favourite(pk)
        print('this is favaourite to delete', favourite_to_delete)
        self.is_favourite_owner(favourite_to_delete, request.user)
        print('request.user', request.user)
        # request.data['owner'] = request.user.id
        favourite_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)