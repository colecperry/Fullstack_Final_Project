from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property

from config import app, db, bcrypt

popular_dog_breeds = [
    "Akita", "Affenpinscher", "Afghan Hound", "Airedale", "Australian Shepherd",
    "Beagle", "Boxer", "Chihuahua", "Cockapoo", "Dalmatian", "Doberman",
    "German Shepherd", "Husky", "Labradoodle", "Labrador", "Maltese", "Pitbull",
    "Pomeranian", "Pug", "Rottweiler", "Shiba", "Shihtzu", "Spanish Waterdog"
]

class Dog(db.Model, SerializerMixin):
    __tablename__ = 'dogs'
    serialize_rules = ('-created_at', '-updated_at', '-user.dogs', '-messages.dog', '-favorite.dog')

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
    mother_weight = db.Column(db.Integer)
    mother_age = db.Column(db.Integer)
    father_name = db.Column(db.String)
    father_breed = db.Column(db.String)
    father_weight = db.Column(db.Integer)
    father_age = db.Column(db.Integer)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    user = db.relationship('User', back_populates='dogs')
    favorite = db.relationship('Favorite', back_populates='dog')
    messages = db.relationship('Message', back_populates='dog')

    @validates("dog_breed")
    def validate_dog_breed(self, key, dog_breed):
        if dog_breed in popular_dog_breeds:
            return dog_breed
        raise ValueError("Invalid dog breed")
    
    @validates("dog_gender")
    def validate_dog_gender(self, key, dog_gender):
        if dog_gender in ['M', 'F']:
            return dog_gender
        raise ValueError("Invalid dog gender. Must be 'M' or 'F'.")
    

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    serialize_rules = ('-created_at', '-updated_at', '-dogs.user', '-dogs.messages', '-dogs.favorite', '-messages.', '-favorites',)

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

    dogs = db.relationship('Dog', back_populates='user')
    messages = db.relationship('Message', back_populates='user')
    favorites = db.relationship('Favorite', back_populates='user')

    @validates("user_name")
    def validates_user_name(self, key, user_name):
        if len(user_name) <= 6:
            raise ValueError("Username must be longer than 6 characters")
        return user_name
    
    # @validates("user_phone_number")
    # def validates_user_phone_number(self, key, user_phone_number):
    #     if user_phone_number:
    #         user_phone_number_str = str(user_phone_number)
    #         if len(user_phone_number_str) == 10:
    #             return user_phone_number
    #         else:
    #             raise ValueError("Phone number must be 10 characters")
    #     raise ValueError("Phone number cannot be blank")
    
    @validates("user_zip_code")
    def validates_user_zip_code(self, key, user_zip_code):
        if user_zip_code:
            user_zip_code_str = str(user_zip_code)
            if len(user_zip_code_str) == 5:
                return user_zip_code
            else:
                raise ValueError("Zip code must be 5 characters")
        raise ValueError("Zip code cannot be blank")
    
    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))


    

class Message(db.Model, SerializerMixin):
    __tablename__ = 'messages'
    serialize_rules = ('-created_at', '-updated_at', '-user.messages', '-dog.messages')

    id = db.Column(db.Integer, primary_key=True)
    message_sender_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    message_body = db.Column(db.String)
    dog_id = db.Column(db.Integer, db.ForeignKey('dogs.id'))

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    user = db.relationship('User', back_populates='messages')
    dog = db.relationship('Dog', back_populates='messages')

    @validates("message_body")
    def validates_message_body(self, key, message_body):
        if message_body:
            return message_body
        raise ValueError("Message can not be blank")
        

class Favorite(db.Model, SerializerMixin):
    __tablename__ = 'favorites'
    serialize_rules = ('-created_at', '-updated_at', '-user.favorites', '-dog.favorite')

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    dog_id = db.Column(db.Integer, db.ForeignKey('dogs.id'))

    user = db.relationship('User', back_populates='favorites')
    dog = db.relationship('Dog', back_populates='favorite')

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())







