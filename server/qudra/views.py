from unittest import result
from django.db import connection
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import DirectQuerySerializer



def dictfetchall(cursor):
    "Return all rows from a cursor as a dict"
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]


def my_custom_sql(query):
    with connection.cursor() as cursor:
        cursor.execute(query)
        results = dictfetchall(cursor)
    return results


class DirectQuery(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        returned = my_custom_sql("select * from user")
        # results = DirectQuerySerializer(returned, many=True).data
        return Response(returned)

    def post(self, request, format=None):
        query = request.data['query']
        returned = my_custom_sql(query)
        # results = DirectQuerySerializer(returned, many=True).data
        return Response(returned)