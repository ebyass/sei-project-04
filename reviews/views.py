# pylint: disable=no-member, no-self-use
#! AKA CONTROLLER

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.exceptions import NotFound, PermissionDenied


from .models import Review
from .serializers import ReviewSerializer, PopulatedReviewSerializer

class ReviewListView(APIView): 

    permission_classes = (IsAuthenticatedOrReadOnly, )

    #! GET ALL REVIEWS
    def get(self, _request):
        reviews = Review.objects.all()
    #* now that we have all reviews -> serialize
    #* get data from database and then pass through serializer
    #* serializer by default only handle one song at a time. This way we ask the serializer to hangle an array at once. We say this by saying many=True. If it's just one you do it without saying many=True.
        serialized_reviews = ReviewSerializer(reviews, many=True)
        return Response(serialized_reviews.data, status=status.HTTP_200_OK)

#! PERMISSION DENIED
#* if they are not the same person return permission denied
#* add to put methods, delete and update
#* if they are not the same permission denied
    def is_review_owner(self, review, user):
        if review.owner.id != user.id:
            raise PermissionDenied()


#* handling single instances - show, delete
    #* pk = primary key
class ReviewDetailView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly, )

#* now we can reuse the try and except for al the requests, instead of repeating in each request. Makes code leaner.
    def get_review(self, pk):
        try:
            return Review.objects.get(pk=pk)
        except Review.DoesNotExist:
            #* equivalent to Throw in js
            raise NotFound()


    def is_review_owner(self, review, user):
        if review.owner.id != user.id:
            raise PermissionDenied()

#! CREATE
    def post(self, request, pk): 
        #* to add the owner
        request.data['owner'] = request.user.id
        #* to convert it from json passing a valid object to fit serializer
        #* request.data = body
        new_review = ReviewSerializer(data=request.data)
        #* if it's True its ok to go ahead and create a review in the database - using iS_valid() method
        #* returns true or false did this data meet the rules set
        if new_review.is_valid():
            new_review.save()
            return Response(new_review.data, status=status.HTTP_201_CREATED)
        #* if it's not valid
        return Response(new_review.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

#! GET ONE REVIEW
    def get(self, _request, pk):
        review = self.get_review(pk) 
        #* once the review is selected -> serialize
        serialized_review = ReviewSerializer(review)
        return Response(serialized_review.data)
        #* DoesNotExist is the acutal error name you can see on insomnia for exampl

    #! UPDATE
    def put(self, request, pk):
        review_to_update = self.get_review(pk)
        #* ARE THEY ALLOWED
        self.is_review_owner(review_to_update, request.user)
        request.data['owner'] = request.user.id
        #* merging data coming from database and data coming from serializer
        #* data=request.data - incoming request data
        updated_review = ReviewSerializer(review_to_update, data=request.data)
        #* If it's valid
        if updated_review.is_valid():
            updated_review.save()
            #* send back with changes
            return Response(updated_review.data, status=status.HTTP_202_ACCEPTED)
        #* If invalid
        return Response(updated_review.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

#! DELETE A REVIEW
    def delete(self, request, pk):
        review_to_delete = self.get_review(pk)
        #* ARE THEY ALLOWED
        print('this is review to delete', review_to_delete)
        self.is_review_owner(review_to_delete, request.user)
        # request.data['owner'] = request.user.id
        #* if the review has been found then 
        review_to_delete.delete()
        #* nothing to send back because we deleted the review
        return Response(status=status.HTTP_204_NO_CONTENT)