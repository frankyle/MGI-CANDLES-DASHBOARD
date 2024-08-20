from rest_framework import serializers
from .models import TraderIdea

class TraderIdeaSerializer(serializers.ModelSerializer):
    class Meta:
        model = TraderIdea
        fields = [
            'user', 'trade_signal', 'currency_pair', 'trader_idea',
            'post_date_time', 'publisher_trader', 'trader_platform', 'created_at'
        ]
        read_only_fields = ['created_at']
