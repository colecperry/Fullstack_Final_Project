"""
models.py

Defines SQLAlchemy ORM models for the application, including User, Dog, Message, and Favorite.
Includes schema definitions, serialization rules, field validations,
password hashing, and model relationships.
"""

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property

from config import app, db, bcrypt

# List of accepted dog breeds for validation
popular_dog_breeds = [
    "Akita", "Affenpinscher", "Afghan Hound", "Airedale", "Australian Shepherd",
    "Beagle", "Boxer", "Chihuahua", "Cockapoo", "Dalmatian", "Doberman",
    "German Shepherd", "Husky", "Labradoodle", "Labrador", "Maltese", "Pitbull",
    "Pomeranian", "Pug", "Rottweiler", "Shiba", "Shihtzu", "Spanish Waterdog"
]

# Dog model
class Dog(db.Model, SerializerMixin):
    __tablename__ = 'dogs'

    # Exclude certain fields or related objects from serialization
    serialize_rules = ('-created_at', 
                    '-updated_at', 
                    '-user.dogs',
                    '-user.messages',
                    '-user.favorites',
                    '-favorite.user',
                    '-favorite.dog',
                    '-messages.user', 
                    '-messages.dog', 
                    )

    # Dog table columns
    id = db.Column(db.Integer, primary_key=True)
    breeder_id = db.Column(db.Integer, db.ForeignKey('users.id'))
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
    mother_age = db.Column(db.String)
    father_name = db.Column(db.String)
    father_breed = db.Column(db.String)
    father_weight = db.Column(db.String)
    father_age = db.Column(db.String)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    # Relationships
    user = db.relationship('User', back_populates='dogs')
    favorite = db.relationship('Favorite', back_populates='dog', uselist=False)
    messages = db.relationship('Message', back_populates='dog')

    # Validate that dog breed is in the list of known breeds
    @validates("dog_breed")
    def validate_dog_breed(self, key, dog_breed):
        if dog_breed in popular_dog_breeds:
            return dog_breed
        raise ValueError("Invalid dog breed")

    # Validate that gender is either 'M' or 'F'
    @validates("dog_gender")
    def validate_dog_gender(self, key, dog_gender):
        if dog_gender in ['M', 'F']:
            return dog_gender
        raise ValueError("Invalid dog gender. Must be 'M' or 'F'.")

# User model
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    # Serialization rules
    serialize_rules = ('-created_at', 
                    '-updated_at', 
                    '-dogs.user', 
                    '-dogs.messages', 
                    '-dogs.favorite', 
                    '-sent_message.sending_user',
                    '-sent_message.receiving_user',
                    '-sent_message.dog',
                    '-received_message.sending_user',
                    '-received_message.receiving_user',
                    '-received_message.dog',
                    '-favorites.user',
                    '-favorites.dog')

    # User table columns
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String)
    user_image = db.Column(db.String)
    user_email = db.Column(db.String)
    _password_hash = db.Column(db.String)
    user_phone_number = db.Column(db.String)
    user_address = db.Column(db.String)
    user_city = db.Column(db.String)
    user_state = db.Column(db.String)
    user_zip_code = db.Column(db.Integer)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    # Relationships
    dogs = db.relationship('Dog', back_populates='user')
    sent_message = db.relationship("Message", foreign_keys="Message.message_sender_id", back_populates='sending_user')
    received_message = db.relationship("Message", foreign_keys="Message.message_receiver_id", back_populates='receiving_user')
    favorites = db.relationship('Favorite', back_populates='user')

    # Validate that username has at least 6 characters
    @validates("user_name")
    def validates_user_name(self, key, user_name):
        if len(user_name) <= 6:
            raise ValueError("Username must be longer than 6 characters")
        return user_name

    # Validate zip code is exactly 5 characters
    @validates("user_zip_code")
    def validates_user_zip_code(self, key, user_zip_code):
        if user_zip_code:
            user_zip_code_str = str(user_zip_code)
            if len(user_zip_code_str) == 5:
                return user_zip_code
            else:
                raise ValueError("Zip code must be 5 characters")
        raise ValueError("Zip code cannot be blank")

    # Create hybrid property for password hash
    @hybrid_property
    def password_hash(self):
        return self._password_hash

    # Use bcrypt to hash password when setting it
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    # Compare input password to stored hash
    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

# Message model
class Message(db.Model, SerializerMixin):
    __tablename__ = 'messages'

    serialize_rules = ('-created_at',
                    '-updated_at',
                    '-sending_user.dogs',
                    '-sending_user.sent_message',
                    '-sending_user.received_message',
                    '-sending_user.favorites',
                    '-receiving_user.dogs',
                    '-receiving_user.sent_message',
                    '-receiving_user.received_message',
                    '-receiving_user.favorites',
                    '-dog.user',
                    '-dog.favorite',
                    '-dog.messages')

    id = db.Column(db.Integer, primary_key=True)
    message_sender_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    message_receiver_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    message_body = db.Column(db.String)
    dog_id = db.Column(db.Integer, db.ForeignKey('dogs.id'))

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    # Relationships
    sending_user = db.relationship("User", foreign_keys=[message_sender_id], back_populates='sent_message')
    receiving_user = db.relationship("User", foreign_keys=[message_receiver_id], back_populates='received_message')
    dog = db.relationship('Dog', back_populates='messages')

    # Validate message is not blank
    @validates("message_body")
    def validates_message_body(self, key, message_body):
        if message_body:
            return message_body
        raise ValueError("Message can not be blank")

# Favorite model
class Favorite(db.Model, SerializerMixin):
    __tablename__ = 'favorites'

    serialize_rules = ('-created_at',
                    '-updated_at', 
                    '-user.favorites',
                    '-user.messages',
                    '-user.dogs',
                    '-dog.favorite',
                    '-dog.user',
                    '-dog.messages'
                    )

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    dog_id = db.Column(db.Integer, db.ForeignKey('dogs.id'))

    # Relationships
    user = db.relationship('User', back_populates='favorites')
    dog = db.relationship('Dog', back_populates='favorite')

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
