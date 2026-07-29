from flask import Blueprint, render_template, request, redirect, url_for, session
from supabase import create_client
import os
from dotenv import load_dotenv

load_dotenv()

supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_API_KEY"))

auth = Blueprint("auth", __name__)


@auth.route("/register", methods=["GET", "POST"])
def register():
    if "user_id" in session:
        return redirect(url_for("views.tracker"))

    if request.method == "POST":
        register_data = request.form
        email = register_data.get("email")
        try:
            supabase.auth.sign_in_with_otp({
                "email": email
            })
        except Exception as e:
            print(e)
            error_message = "حدث خطأ ما، يرجى المحاولة مرة أخرى."
            return render_template("register.html", error_message=error_message)

        return redirect(url_for("auth.confirmemail"))
    else:
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
