FROM python:3.11

WORKDIR /app

COPY requirements.txt .

# COPY models/ .
COPY . .

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8083

CMD ["python", "-u", "api_ia.py"]
