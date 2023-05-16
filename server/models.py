from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property

from config import app, db, bcrypt

class Dog(db.Model, SerializerMixin):
    __tablename__ = 'dogs'
    serialize_rules = ('-users.dogs', '-messages.dog')

    id = db.Column(db.Integer, primary_key=True)
    seller_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    buyer_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    dog_name = db.Column(db.String)
    dog_image = db.Column(db.String)
    dog_breed = db.Column(db.String)
    dog_age = db.Column(db.String)
    dog_gender = db.Column(db.String)
    dog_weight = db.Column(db.String)
    dog_color = db.Column(db.String)
    dog_price = db.Column(db.Integer)
    dog_description = db.Column(db.String)
    up_for_adoption = db.Column(db.Boolean)
    mother_name = db.Column(db.String)
    mother_breed = db.Column(db.String)
    mother_weight = db.Column(db.String)
    mother_age = db.Column(db.Integer)
    father_name = db.Column(db.String)
    father_breed = db.Column(db.String)
    father_weight = db.Column(db.Integer)
    father_age = db.Column(db.Integer)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    users = db.relationship('User', back_populates='dogs')

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    serialize_rules = ('-dogs.users', '-messages.user')

    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String)
    user_image = db.Column(db.String)
    user_email = db.Column(db.String)
    _password_hash = db.Column(db.String)
    user_phone_number = db.Column(db.Integer)
    user_address = db.Column(db.String)
    user_city = db.Column(db.String)
    user_state = db.Column(db.String)
    user_zip_code = db.Column(db.Integer)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    dogs = db.relationship('Dog', back_populates='users')

class Message(db.Model, SerializerMixin):
    __tablename__ = 'messages'
    serialize_rules = ('-user.messages', '-dog.messages')

    message_sender = db.Column(db.Integer, db.ForeignKey('users.id'))
    message_recipient = db.Column(db.Integer, db.ForeignKey('users.id'))
    message_body = db.Column(db.String)
    dog_id = db.Column(db.Integer, db.ForeignKey('dogs.id'))

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())





