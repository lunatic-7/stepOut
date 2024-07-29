import random
from faker import Faker
from datetime import datetime, timedelta
from django.core.management.base import BaseCommand
from auth_app.models import Train

fake = Faker()

# List of popular Indian train stations
stations = [
    'Mumbai Central', 'Chhatrapati Shivaji Terminus', 'Howrah Junction', 'New Delhi',
    'Chennai Central', 'Kolkata', 'Bangalore City', 'Secunderabad', 'Ahmedabad', 'Pune',
    'Lucknow', 'Jaipur', 'Bhopal', 'Coimbatore', 'Madurai', 'Ernakulam', 'Patna', 'Guwahati'
]

def generate_train_name():
    adjectives = ["Rajdhani", "Shatabdi", "Duronto", "Garib Rath", "Jan Shatabdi", "Express"]
    return f"{random.choice(adjectives)} Express"

def generate_train_number():
    return f"{random.randint(1, 99999)}"

def generate_trains():
    for _ in range(50):
        departure_station, arrival_station = random.sample(stations, 2)
        date = datetime.today() + timedelta(days=random.randint(1, 30))
        departure_time = fake.time(pattern='%H:%M', end_datetime=None)
        arrival_time = fake.time(pattern='%H:%M', end_datetime=None)
        for _ in range(random.randint(1, 5)):  # Generate multiple trains for the same route and date
            train = Train(
                train_number=generate_train_number(),
                name=generate_train_name(),
                departure_station=departure_station,
                arrival_station=arrival_station,
                departure_time=departure_time,
                arrival_time=arrival_time,
                date=date.strftime('%Y-%m-%d'),
                seat_availability=random.randint(50, 300)  # Randomly generate seat availability between 50 and 300
            )
            train.save()

class Command(BaseCommand):
    help = 'Generate random trains data for the database'

    def handle(self, *args, **kwargs):
        self.stdout.write('Adding train data...')
        generate_trains()
        self.stdout.write(self.style.SUCCESS('Train data added successfully!'))
