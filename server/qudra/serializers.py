from rest_framework import serializers

class DirectQuerySerializer(serializers.Serializer):
    created_at = serializers.DateTimeField(required=False)
    power = serializers.DecimalField(6,2,required=False)

