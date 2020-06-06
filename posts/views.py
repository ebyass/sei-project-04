# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Post
from .serializers import PostSerializer, PopulatedPostSerializer #* imports serializer for model

# Create your views here.


class PostListView(APIView):
#! Get all posts
    def get(self, _request):
        posts = Post.objects.all() 
        serialized_posts = PopulatedPostSerializer(posts, many=True)
        return Response(serialized_posts.data, status=status.HTTP_200_OK)

class PostDetailView(APIView):
#* now we can reuse the try and except for al the requests, instead of repeating in each request. Makes code leaner.

    def get_post(self, pk):
        try:
            return Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            #* equivalent to Throw
            raise NotFound()

    #! GET ONE POST
    def get(self, _request, pk):
            post = self.get_post(pk) 
            #* once the post is selected - serialize
            serialized_post = PopulatedPostSerializer(post)
            return Response(serialized_post.data)
            #* DoesNotExist is the acutal error name you can see on insomnia for example