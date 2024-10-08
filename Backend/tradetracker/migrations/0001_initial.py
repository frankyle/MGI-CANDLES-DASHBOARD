# Generated by Django 5.1 on 2024-09-07 05:05

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='TradeTracker',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('currency_pair', models.CharField(blank=True, max_length=6, null=True)),
                ('signal_image', models.ImageField(blank=True, null=True, upload_to='signals/')),
                ('monday_image', models.ImageField(blank=True, null=True, upload_to='signals/monday/')),
                ('tuesday_image', models.ImageField(blank=True, null=True, upload_to='signals/tuesday/')),
                ('wednesday_image', models.ImageField(blank=True, null=True, upload_to='signals/wednesday/')),
                ('thursday_image', models.ImageField(blank=True, null=True, upload_to='signals/thursday/')),
                ('friday_image', models.ImageField(blank=True, null=True, upload_to='signals/friday/')),
                ('pips_gained', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('pips_lost', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
    ]
