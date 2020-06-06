from django.urls import path
from .views import PostListView, PostDetailView

#* mini router to be hooked up to main router in projects

urlpatterns = [
    path('', PostListView.as_view()),
    #* same as /:id
    path('<int:pk>/', PostDetailView.as_view())
]