# pull official base image
FROM python:3.9.1-alpine
RUN apk --update add bash
SHELL ["/bin/bash", "-c"]
# set work directory
WORKDIR /usr/src/app
# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
# install dependencies
RUN pip install --upgrade pip
COPY requirements.txt .
RUN apk add --no-cache postgresql-libs  && \
    apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev git libffi-dev openssl-dev python3-dev jpeg-dev zlib-dev
RUN pip install -r requirements.txt
# copy project
COPY . .
