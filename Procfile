daphne: daphne coinpricemonitor.asgi:channel_layer --port 8000 --bind 0.0.0.0 -v2
coin_worker: python manage.py runworker --settings=coinpricemonitor.settings -v2
celery_worker: celery -A coinpricemonitor.celeryconfig worker -l info
celery_beat: celery -A coinpricemonitor.celeryconfig beat -l info
