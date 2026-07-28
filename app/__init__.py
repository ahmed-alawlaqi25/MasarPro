from flask import Flask, session
from .extensions import limiter

import os
from dotenv import load_dotenv
from datetime import timedelta

load_dotenv()


def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
    app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(days=30)

    limiter.init_app(app)

    from .views import views
    from .auth import auth

    app.register_blueprint(views, url_prefix="/")
    app.register_blueprint(auth, url_prefix="/")

    return app
