# Generated by Django 3.2.4 on 2021-08-04 06:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('notifications', '0005_auto_20210804_1151'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='notification',
            name='time_ago',
        ),
    ]
