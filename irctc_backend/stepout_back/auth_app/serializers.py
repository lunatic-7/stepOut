# serializers.py
from rest_framework import serializers
from .models import Train, Booking, Passenger

class TrainSerializer(serializers.ModelSerializer):
    class Meta:
        model = Train
        fields = '__all__'
        
class PassengerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Passenger
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    train = TrainSerializer()
    passengers = PassengerSerializer(many=True)

    class Meta:
        model = Booking
        fields = '__all__'