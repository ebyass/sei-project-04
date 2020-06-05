
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/mediums/', include('mediums.urls')),
    path('api/', include('jwt_auth.urls'))

]
