# Generated by Django 2.2 on 2019-04-26 15:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posterApp', '0006_auto_20190421_1855'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='passHash',
            field=models.CharField(default='', max_length=50),
        ),
    ]
