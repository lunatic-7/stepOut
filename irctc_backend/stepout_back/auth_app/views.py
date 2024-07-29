from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.permissions import IsAdminUser
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Train, Booking, Passenger
from .serializers import TrainSerializer, BookingSerializer
from datetime import datetime
import random
import string
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth.models import User

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_details(request):
    user = request.user
    return Response({
        'id': user.id,
        'username': user.username,
        'email': user.email,
    })

@ensure_csrf_cookie
def set_csrf_token(request):
    return JsonResponse({'message': 'CSRF cookie set'})


############# AUTHENTICATION ####################
@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    if 'username' not in request.data or 'password' not in request.data:
        return Response({'error': 'Please provide both username and password'},
                        status=status.HTTP_400_BAD_REQUEST)
    
    username = request.data['username']
    password = request.data['password']
    
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'},
                        status=status.HTTP_400_BAD_REQUEST)
    
    user = User.objects.create_user(username=username, password=password)
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    user = authenticate(username=username, password=password)
    if user:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid credentials'},
                        status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    request.user.auth_token.delete()
    return Response({'success': 'User logged out successfully'},
                    status=status.HTTP_200_OK)
    
    
#################### TRAINS #########################

@api_view(['GET'])
@permission_classes([AllowAny])
def get_stations(request):
    stations = Train.objects.values_list('departure_station', flat=True).distinct()
    return Response(stations)

@api_view(['GET'])
@permission_classes([AllowAny])
def list_trains(request):
    trains = Train.objects.all()
    serializer = TrainSerializer(trains, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
def search_trains(request):
    from_station = request.query_params.get('from')
    to_station = request.query_params.get('to')
    date = request.query_params.get('date')

    if not from_station or not to_station or not date:
        return Response({'error': 'Please provide from, to, and date parameters'}, status=400)

    try:
        date_obj = datetime.strptime(date, '%Y-%m-%d').date()
    except ValueError:
        return Response({'error': 'Invalid date format. Use YYYY-MM-DD.'}, status=400)

    trains = Train.objects.filter(departure_station=from_station, arrival_station=to_station, date=date_obj)
    serializer = TrainSerializer(trains, many=True)
    return Response(serializer.data)

def generate_train_number():
    return ''.join(random.choices(string.digits, k=5))

@api_view(['POST'])
@permission_classes([IsAdminUser])  # Restrict access to admin users
def add_train(request):
    if request.method == 'POST':
        data = request.data.copy()
        data['train_number'] = generate_train_number()  # Generate a random train number
        print(data)
        serializer = TrainSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Train added successfully",
                "train_id": data['train_number']
            }, status=status.HTTP_201_CREATED)
        print(serializer.errors)  # Print errors to debug
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def book_ticket(request):
    data = request.data.copy()
    train_id = data.get('train_id')
    user_id = data.get('user_id')
    no_of_seats = data.get('no_of_seats')
    passengers_data = data.get('passengers')
    
    print("Received data:", data)
    print("Train ID:", train_id)
    print("User ID:", user_id)
    print("Number of seats:", no_of_seats)
    print("Passengers data:", passengers_data)

    try:
        train = Train.objects.get(train_number=train_id)
    except Train.DoesNotExist:
        return Response({'error': 'Train not found'}, status=status.HTTP_404_NOT_FOUND)

    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    if not isinstance(passengers_data, list) or len(passengers_data) != no_of_seats:
        return Response({'error': 'Invalid passengers data'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        passengers = []
        for passenger_data in passengers_data:
            passenger = Passenger.objects.create(**passenger_data)
            passengers.append(passenger)
        
        seat_numbers = list(range(1, no_of_seats + 1))  # Dummy seat allocation logic
        booking = Booking.objects.create(user=user, train=train, seat_numbers=seat_numbers)
        booking.passengers.set(passengers)
        
        # Serialize the booking details
        booking_details = BookingSerializer(booking).data
        
        return Response({
            "message": "Seat booked successfully",
            "booking_details": booking_details
        }, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def booking_history(request):
    user = request.user
    bookings = Booking.objects.filter(user=user).prefetch_related('train').prefetch_related('passengers')
    serializer = BookingSerializer(bookings, many=True)
    return Response(serializer.data)