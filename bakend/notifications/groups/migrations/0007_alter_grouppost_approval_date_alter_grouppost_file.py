# Generated by Django 5.0.2 on 2024-04-23 17:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('groups', '0006_alter_group_photo_couv_alter_group_photo_grp'),
    ]

    operations = [
        migrations.AlterField(
            model_name='grouppost',
            name='approval_date',
            field=models.DateTimeField(blank=True, default='2022-01-01'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='grouppost',
            name='file',
            field=models.FileField(default='a.png', upload_to='media/groupposts/'),
            preserve_default=False,
        ),
    ]
