from .views import IndexView

from django.conf.urls import url


urlpatterns = [
    url(r'^$', IndexView.as_view(), name='index'),
]
