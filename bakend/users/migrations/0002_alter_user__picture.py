# Generated by Django 3.2.4 on 2021-08-18 13:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='_picture',
            field=models.ImageField(blank=True, null=True, upload_to='maps', verbose_name='Picture'),
        ),
    ]
