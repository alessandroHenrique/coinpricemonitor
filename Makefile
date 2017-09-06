run:
	@python manage.py runserver

run-daphne:
	@daphne asgi:channel_layer --port 8000

run-worker:
	@python manage.py runworker

run-redis:
	redis-server --daemonize yes

test: run-redis
	@python manage.py test
