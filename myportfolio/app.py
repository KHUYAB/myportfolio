from flask import Flask, render_template, redirect, url_for, flash
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user

app = Flask(__name__)
app.config['SECRET_KEY'] = '188a4ba320e79190bdf7'  # Required for CSRF protection

# Flask-Login Setup
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'  # Redirect to login page if not authenticated

# Dummy User Class
class User(UserMixin):
    def __init__(self, id):
        self.id = id

# Dummy User Database
users = {'admin': {'password': 'password'}}

@login_manager.user_loader
def load_user(user_id):
    return User(user_id)

# Login Form
class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Login')

# Home Page Route
@app.route('/')
@login_required  # Requires login to access
def home():
    return render_template('index.html')

# About Page Route
@app.route('/about')
@login_required  # Requires login to access
def about():
    return render_template('about.html')

# Projects Page Route
@app.route('/projects')
@login_required  # Requires login to access
def projects():
    return render_template('projects.html')

# Contact Page Route
@app.route('/contact')
@login_required  # Requires login to access
def contact():
    return render_template('contact.html')

# Login Page Route
@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        if username in users and users[username]['password'] == password:
            user = User(username)
            login_user(user)
            flash('Login successful!', 'success')
            return redirect(url_for('home'))
        else:
            flash('Invalid username or password', 'danger')
    return render_template('login.html', form=form)

# Logout Route
@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('You have been logged out.', 'info')
    return redirect(url_for('login'))

# Run the Flask Application
if __name__ == '__main__':
    app.run(debug=True)