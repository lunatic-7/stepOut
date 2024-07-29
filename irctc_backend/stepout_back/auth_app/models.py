# models.py

from django.db import models
from django.contrib.auth.models import User
import datetime

class Train(models.Model):
    train_number = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100)
    departure_station = models.CharField(max_length=100)
    arrival_station = models.CharField(max_length=100)
    departure_time = models.TimeField()
    arrival_time = models.TimeField()
    date = models.DateField()
    seat_availability = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.name} ({self.train_number})"

class Passenger(models.Model):
    name = models.CharField(max_length=100)
    age = models.CharField(max_length=20)
    gender = models.CharField(max_length=10)

class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    train = models.ForeignKey(Train, on_delete=models.CASCADE)
    passengers = models.ManyToManyField(Passenger)
    seat_numbers = models.JSONField()
    date = models.DateField(default=datetime.date.today)

    def __str__(self):
        return f"Booking {self.id} by {self.user.username}"
