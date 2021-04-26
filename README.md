# Django-Rest React Blog
Blog with DRF and React:
authentications with social network, 
reply to comment,
subscriptions, 
mail delivery,
star rating,
likes/dislikes

### Stack:
#### Backend: 
- Django 
- Django Rest Framework
- Authorization - Oauth2 (social authentication)
- Task Queue - Celery
- Broker - Redis
#### Frontend: 
- React (React Hooks)
- Redux
- Material UI https://material-ui.com
#### Deployment:
- Docker / Docker-Compose 
- Nginx

Development setup uses django-sslserver. Production setup uses gunicorn and nginx.

# Usage

***docker*** and ***docker-compose*** must be installed on your computer.

## Configurations
- Create ***.env*** for Django in dir programsonline_backend/programsonline_backend/.env. For an example look at the file programsonline_backend/programsonline_backend/.env.example
- Create ***.env*** for React in dir programsonline_frontend/.env. For an example look at the file programsonline_frontend/.env.example
- Create ***.env.db*** for Database in dir db-env/.env.db. For an example look at the file db-env/.env.example
- Create ***nginx.conf*** for Nginx server in dir conf.d/nginx.conf. For an example look at the file db-conf.d/nginx.conf.example

## Run Project

### Run project for development environment 

```
docker-compose up
```

### Run project for production environment with Certbot

You can get your SSL certificates from Let's Encrypt by running *init-letsencrypt.sh* script. 

First make the script executable by command below,

```
chmod u+x init-letsencrypt.sh 
```

Replace Then run the script,

```
./init-letsencrypt.sh
```

This script will also start your containers. In case you down your containers, you can restart them by following command,

```
docker-compose -f docker-compose.prod.yml up
```