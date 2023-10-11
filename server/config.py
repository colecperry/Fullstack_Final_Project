from flask import Flask
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_cors import CORS
import os
from flask_restful import Api
from dotenv import load_dotenv

load_dotenv()

import secrets


app = Flask(__name__)
app.secret_key = b'Y\xf1Xz\x00\xad|eQ\x80t \xca\x1a\x10K'
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.secret_key = secrets.token_hex(32)

db = SQLAlchemy()

migrate = Migrate(app, db)
db.init_app(app)

bcrypt = Bcrypt(app)

api = Api(app)

CORS(app)