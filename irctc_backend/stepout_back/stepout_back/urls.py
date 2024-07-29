from django.contrib import admin
from django.urls import path, include
from auth_app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', views.user_details, name='user-details'),
    path('add_train/', views.add_train, name='add_train'),
    path('api/', include('auth_app.urls')),
    path('trains/', views.list_trains, name='list_trains'),
    path('trains/add/', views.add_train, name='add_train'),
    path('trains/search/', views.search_trains, name='search_trains'),
    path('stations/', views.get_stations, name='get_stations'),
    path('search/', views.search_trains, name='search_trains'),
    path('book_ticket/', views.book_ticket, name='book_ticket'),
    path('booking_history/', views.booking_history, name='booking-history'),
    path('set-csrf/', views.set_csrf_token, name='set-csrf'),
]