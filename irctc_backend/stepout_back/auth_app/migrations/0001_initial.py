# Generated by Django 5.0.7 on 2024-07-28 07:58

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Train",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("train_number", models.CharField(max_length=10, unique=True)),
                ("name", models.CharField(max_length=100)),
                ("departure_station", models.CharField(max_length=100)),
                ("arrival_station", models.CharField(max_length=100)),
                ("departure_time", models.TimeField()),
                ("arrival_time", models.TimeField()),
                ("date", models.DateField()),
            ],
        ),
    ]
