# coinpricemonitor

## Project Setup

Run the following commands in the shell:
```
pip install -r requirements.txt
python manage.py migrate
make run-redis
make run (Separated tab)
celery -A coinpricemonitor.celeryconfig beat -l info (Separated tab)
celery -A coinpricemonitor.celeryconfig worker -l info (Separated tab)
```
