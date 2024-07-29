from django.contrib import admin
from .models import Train, Booking, Passenger

# Register your models here.
class TrainAdmin(admin.ModelAdmin):
    list_display = ('train_number', 'name', 'departure_station', 'arrival_station', 'departure_time', 'arrival_time', 'date')
    search_fields = ('train_number', 'name', 'departure_station', 'arrival_station')
    list_filter = ('date',)

admin.site.register(Train, TrainAdmin)
admin.site.register(Booking)
admin.site.register(Passenger)