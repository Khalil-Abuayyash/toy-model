from django.shortcuts import render
from django.db import connection
from django.http import JsonResponse

def dictfetchall(cursor):
    "Return all rows from a cursor as a dict"
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]


def my_custom_sql(request):
    with connection.cursor() as cursor:
        cursor.execute("select * from t1")
        results = dictfetchall(cursor)
    return JsonResponse(results, safe=False)

