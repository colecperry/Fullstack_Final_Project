"""
config.py

Application configuration file. Sets up environment variables,
initializes core Flask extensions including SQLAlchemy, Bcrypt, CORS,
Flask-Migrate, and Flask-RESTful. Also loads environment settings from .env.
"""

from flask import Flask  # Core Flask framework
from flask_bcrypt import Bcrypt  # For password hashing
from flask_migrate import Migrate  # For handling database migrations
from flask_sqlalchemy import SQLAlchemy  # SQLAlchemy ORM
from sqlalchemy import MetaData  # Optional: for custom naming conventions
from flask_cors import CORS  # Cross-Origin Resource Sharing
import os  # For environment variables
from flask_restful import Api  # RESTful API support
from dotenv import load_dotenv  # To load variables from a .env file

# Load environment variables from a .env file into the environment
load_dotenv()

# -------------------- APP CONFIGURATION --------------------

# Create the Flask app
app = Flask(__name__)

# Set the secret key for session management
# This key is used to sign session cookies
app.secret_key = os.getenv("SECRET_KEY")

# Configure the SQLAlchemy database URI using an environment variable
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')

# Turn off the event system (saves resources)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Disable Flask’s compact JSON responses (makes JSON output more readable)
app.json.compact = False

# Optionally re-generate a secure secret key at runtime (overwrites the earlier one)
app.secret_key = secrets.token_hex(32)

# -------------------- DATABASE AND EXTENSIONS --------------------

# Initialize the SQLAlchemy database instance
db = SQLAlchemy()

# Set up Flask-Migrate for database schema migrations
migrate = Migrate(app, db)

# Associate the app with the db
db.init_app(app)

# Set up Bcrypt for hashing passwords
bcrypt = Bcrypt(app)

# Initialize Flask-RESTful API extension
api = Api(app)

# Enable CORS for all routes and origins (useful for frontend-backend integration)
CORS(app)
