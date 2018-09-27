from flask import current_app
import requests


def get_currencies(filters=None, fmt='json'):
    if filters is None:
        filters = dict()
    filters[fmt] = True
    t = requests.get(current_app.config['EXCHANGE_API'], params=filters)
    return t.json()
