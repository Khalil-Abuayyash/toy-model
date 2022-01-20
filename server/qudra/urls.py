from django.urls import path
from . import views

app_name = 'qudra'

urlpatterns = [
    path('', views.DirectQuery.as_view())
]