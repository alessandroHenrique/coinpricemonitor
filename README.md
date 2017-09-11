# bitcoinmonitor

## Project Setup

Run the following commands:
```
pip install -r requirements.txt
python manage.py migrate
make run (Separated tab)
celery -A bitcoinmonitor.celeryconfig beat -l info (Separated tab)
celery -A bitcoinmonitor.celeryconfig worker -l info (Separated tab)
```
