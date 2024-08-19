from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('api/mgi/', include('mgicandles.urls')),
    # path('api/newidea/', include('trading_ideas.urls')),

]
