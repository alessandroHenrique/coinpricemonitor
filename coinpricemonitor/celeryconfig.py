from celery import Celery
from celery.decorators import periodic_task
from celery.utils.log import get_task_logger
from celery.task.schedules import crontab
from django.conf import settings
import os


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'coinpricemonitor.settings')

app = Celery('coinpricemonitor', broker='redis://localhost:6379')

app.conf.timezone = 'UTC'

logger = get_task_logger(__name__)

app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)

app.conf.broker_url = 'redis://localhost:6379'
app.conf.result_backend = 'redis://localhost:6379'
