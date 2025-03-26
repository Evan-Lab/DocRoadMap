FROM python:3.9.16-slim

WORKDIR /app

COPY . /app

RUN pip install --no-cache-dir requests beautifulsoup4

CMD ["python", "main.py"]
