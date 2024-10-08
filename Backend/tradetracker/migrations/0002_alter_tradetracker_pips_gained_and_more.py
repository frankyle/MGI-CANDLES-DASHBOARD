# Generated by Django 5.1 on 2024-09-07 05:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tradetracker', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tradetracker',
            name='pips_gained',
            field=models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=10, null=True),
        ),
        migrations.AlterField(
            model_name='tradetracker',
            name='pips_lost',
            field=models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=10, null=True),
        ),
    ]
