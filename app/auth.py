from flask import Blueprint, render_template, request, redirect, url_for, session
from supabase import create_client
import os
from dotenv import load_dotenv
from .extensions import limiter
import re

load_dotenv()

supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_API_KEY"))

auth = Blueprint("auth", __name__)


@auth.route("/register", methods=["GET", "POST"])
@limiter.limit("3 per hour")
def register():
    if "user_id" in session:
        return redirect(url_for("views.tracker"))

    if request.method == "POST":
        register_data = request.form
        if register_data.get("website"):
            return redirect(url_for("auth.confirmemail"))

        email = register_data.get("email")
        if not email or not re.match(r"^[^@\s]+@[^@\s]+\.[^@\s]+$", email):
            error_message = "البريد الإلكتروني غير صالح."
            return render_template("register.html", error_message=error_message)

        try:
            supabase.auth.sign_in_with_otp({"email": email})
        except Exception as e:
            print(e)
            return render_template("register.html", )

        return redirect(url_for("auth.confirmemail"))
    return render_template("register.html")


@auth.route("/confirmemail")
def confirmemail():
    return render_template("confirmemail.html")


@auth.route("/callback")
def callback():
    return render_template("callback.html")


@auth.route("/session", methods=["POST"])
def create_session():
    data = request.get_json()
    access_token = data.get("access_token")
    refresh_token = data.get("refresh_token")
    try:
        supabase_session = supabase.auth.get_user(access_token)
        user = supabase_session.user
        user_id = user.id
        session.permanent = True
        session["user_id"] = user_id
        session["access_token"] = access_token
        session["refresh_token"] = refresh_token
        return {"status": "success"}
    except Exception as e:
        print(e)
        return {"status": "error"}


@auth.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("views.home"))
