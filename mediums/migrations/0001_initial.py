# Generated by Django 3.0.7 on 2020-06-10 21:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('categories', '0001_initial'),
        ('genres', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Medium',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('creator', models.CharField(max_length=50)),
                ('title', models.CharField(max_length=100, unique=True)),
                ('duration', models.FloatField(blank=True, null=True)),
                ('year', models.IntegerField()),
                ('image', models.CharField(max_length=400)),
                ('video', models.CharField(blank=True, max_length=400, null=True)),
                ('info', models.TextField(max_length=1000)),
                ('price', models.CharField(blank=True, max_length=20, null=True)),
                ('start_date', models.DateField(blank=True, null=True)),
                ('end_date', models.DateField(blank=True, null=True)),
                ('art_gallery', models.CharField(blank=True, max_length=50, null=True)),
                ('art_gallery_location', models.CharField(blank=True, max_length=50, null=True)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='mediums', to='categories.Category')),
                ('genres', models.ManyToManyField(related_name='mediums', to='genres.Genre')),
            ],
        ),
    ]
