FROM python:3.11

WORKDIR /app

COPY . .

RUN pip install flask pymongo gunicorn

CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]

