from flask import Flask, make_response, jsonify, request, session
from sqlalchemy import func
from sqlalchemy.exc import IntegrityError
from config import app, db, CORS, os
import ipdb;

CORS(app)


from models import db, Dog, User, Favorite, Message

app.config.from_object('config')

@app.route('/dogs', methods=['GET', 'POST'])

def dogs():
    if request.method == 'GET':
        dogs = Dog.query.all()

        dogs_dict = [dog.to_dict(rules=()) for dog in dogs]

        return dogs_dict, 200
    
    elif request.method == 'POST':
        form_data = request.get_json()

        try:
            dog = Dog(
                breeder_id=form_data.get('breeder_id'),
                dog_name=form_data.get('dog_name'),
                dog_image=form_data.get('dog_image'),
                dog_breed=form_data.get('dog_breed'),
                dog_age=form_data.get('dog_age'),
                dog_gender=form_data.get('dog_gender'),
                dog_weight=form_data.get('dog_weight'),
                dog_color=form_data.get('dog_color'),
                dog_price=form_data.get('dog_price'),
                dog_description=form_data.get('dog_description'),
                up_for_adoption=form_data.get('up_for_adoption'),
                mother_name=form_data.get('mother_name'),
                mother_breed=form_data.get('mother_breed'),
                mother_weight=form_data.get('mother_weight'),
                mother_age=form_data.get('mother_age'),
                father_name=form_data.get('father_name'),
                father_breed=form_data.get('father_breed'),
                father_weight=form_data.get('father_weight'),
                father_age=form_data.get('father_age'))
            
            db.session.add(dog)
            db.session.commit()
            return dog.to_dict(rules=()), 201
        
        except ValueError as err:
            return {'error': '400: Validation Error'}, 400
        
@app.route('/dogs/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def dogs_by_id(id):

    if request.method == 'GET':
        dog = Dog.query.filter(Dog.id == id).first()

        if dog:
            dog_dict = dog.to_dict(rules=())

            response = make_response(dog_dict, 200)
            return response
        
        else:
            return {'error': 'Dog not found'}, 404
        
    elif request.method == 'PATCH':
        dog = Dog.query.filter(Dog.id == id).first()
        if dog:
            try:
                form_data = request.get_json()
                for attr in form_data:
                    setattr(dog, attr, form_data.get(attr))

                db.session.add(dog)
                db.session.commit()

                dog_dict = dog.to_dict(rules=())

                response = make_response(
                    dog_dict,
                    202
                )
                return response
            except:
                return {'error': '400: Validation error'}, 400
        return {'error': 'Dog not found'}, 400
        
    elif request.method == 'DELETE':

        dog = Dog.query.filter(Dog.id == id).first()

        if dog:
            db.session.delete(dog)
            db.session.commit()
            return {}, 204
        return {"error": 'Dog not found'}, 404
    
    
@app.route('/users', methods=['GET', 'POST'])
def users():
    if request.method == 'GET':
        users = User.query.all()

        users_dict = [user.to_dict(rules=()) for user in users]

        return users_dict, 200
    elif request.method == 'POST':
        form_data = request.get_json()

        try:
            user = User(
                user_name=form_data.get('user_name'),
                user_image=form_data.get('user_image'),
                user_email=form_data.get('user_email'),
                _password_hash=form_data.get('_password_hash'),
                user_phone_number=form_data.get('user_phone_number'),
                user_address=form_data.get('user_address'),
                user_city=form_data.get('user_city'),
                user_state=form_data.get('user_state'),
                user_zip_code=form_data.get('user_zip_code'))
            
            db.session.add(user)
            db.session.commit()
            return user.to_dict(rules=()), 201
        
        except ValueError as err:
            return {'error': '400: Validation Error'}, 400
        
# Login
@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        formData = request.get_json()
        user = User.query.filter(User.user_email == formData['user_email']).first()
        if user and user.authenticate(formData['password']):
            #Add session cookie when logged in
            session['user_id'] = user.id
            response = make_response(user.to_dict(), 200)
            return response
        else:
            return {'error': 'Could not authorize login credentials'}, 401
        
# Logout
@app.route('/logout', methods=['DELETE'])
def logout():
    if session.get('user_id'):
        session['user_id'] = None
        return {}, 204
    return {'error': '401 Unauthorized'}, 401

# Signup      
@app.route('/signup', methods=['POST'])
def signup():
    if request.method == 'POST':
        formData = request.get_json()

        try:
            new_user = User(
                user_name=formData['user_name'],
                user_image=formData['user_image'],
                user_email=formData['user_email'],
                password_hash=formData['_password_hash'],
                user_phone_number=formData['user_phone_number'],
                user_address=formData['user_address'],
                user_city=formData['user_city'],
                user_state=formData['user_state'],
                user_zip_code=formData['user_zip_code']
            )
            db.session.add(new_user)
            db.session.commit()
            # ipdb.set_trace()
            # Create a cookie for the current user
            session['user_id'] = new_user.id
            response = make_response(new_user.to_dict(), 201)
            return response
        except ValueError:
            return {'error': 'Validation Error'}, 400

# Check Session
@app.route('/check_session', methods=['GET'])
def check_session():
    if session.get('user_id'):
        user = User.query.filter(User.id == session['user_id']).first()
        return user.to_dict(), 200
    return {'error': '401 Unauthorized'}, 401




    
@app.route('/users/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def users_by_id(id):

    if request.method == 'GET':
        user = User.query.filter(User.id == id).first()

        if user:
            user_dict = user.to_dict(rules=())

            response = make_response(user_dict, 200)
            return response
        
        else:
            return {'error': 'User not found'}, 404
        
    elif request.method == 'PATCH':
        user = User.query.filter(User.id == id).first()
        if user:
            try:
                form_data = request.get_json()
                for attr in form_data:
                    setattr(user, attr, form_data.get(attr))

                db.session.add(user)
                db.session.commit()

                user_dict = user.to_dict(rules=())

                response = make_response(
                    user_dict,
                    202
                )
                return response
            except:
                return {'error': '400: Validation error'}, 400
        return {'error': 'User not found'}, 400
            
    elif request.method == 'DELETE':

        user = User.query.filter(User.id == id).first()

        if user:
            db.session.delete(user)
            db.session.commit()
            return {}, 204
        return {"error": 'User not found'}, 404
    
@app.route('/messages', methods=['GET', 'POST'])
def messages():
    if request.method == 'GET':
        messages = Message.query.all()

        messages_dict = [message.to_dict(rules=()) for message in messages]

        return messages_dict, 200
    
    elif request.method == 'POST':
        form_data = request.get_json()

        try:
            message = Message(
                message_sender_id = form_data.get('message_sender_id'),
                message_receiver_id = form_data.get('message_receiver_id'),
                message_body = form_data.get('message_body'),
                dog_id = form_data.get('dog_id')
                )
            
            db.session.add(message)
            db.session.commit()
            return message.to_dict(rules=()), 201
        
        except ValueError as err:
            return {'error': '400: Validation Error'}, 400
        
@app.route('/messages/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def messages_by_id(id):

    if request.method == 'GET':
        message = Message.query.filter(Message.id == id).first()

        if message:
            message_dict = message.to_dict(rules=())

            response = make_response(message_dict, 200)
            return response
        
        else:
            return {'error': 'User not found'}, 404

        
@app.route('/favorites', methods=['GET', 'POST'])
def favorites():
    if request.method == 'GET':
        favorites = Favorite.query.all()

        favorites_dict = [favorite.to_dict(rules=()) for favorite in favorites]

        return favorites_dict, 200
        
    elif request.method == 'POST':
        form_data = request.get_json()

        try:
            favorite = Favorite(
                user_id=form_data.get('user_id'),
                dog_id=form_data.get('dog_id'))
            
            db.session.add(favorite)
            db.session.commit()
            return favorite.to_dict(rules=()), 201
        
        except ValueError as err:
            return {'error': '400: Validation Error'}, 400
    
@app.route('/favorites/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def get_favorites_by_id(id):
    if request.method == 'GET':
        favorite = Favorite.query.filter(Favorite.id == id).first()

        if favorite:
            favorite_dict = favorite.to_dict(rules=())

            response = make_response(favorite_dict, 200)
            return response
        
        else:
            return {'error': 'User not found'}, 404
        
    elif request.method == 'PATCH':
        favorite = Favorite.query.filter(Favorite.id == id).first()
        if favorite:
            try:
                form_data = request.get_json()
                for attr in form_data:
                    setattr(favorite, attr, form_data.get(attr))

                db.session.add(favorite)
                db.session.commit()

                favorite_dict = favorite.to_dict(rules=())

                response = make_response(
                    favorite_dict,
                    202
                )
                return response
            except:
                return {'error': '400: Validation error'}, 400
        return {'error': 'Favorite not found'}, 400
        
    elif request.method == 'DELETE':    
        favorite = Favorite.query.filter(Favorite.id == id).first()

        if favorite:
            db.session.delete(favorite)
            db.session.commit()
            return {}, 204
        return {"error": 'User not found'}, 404

if __name__ == '__main__':
    # app.run(port=5555, debug=True)
    app.run()

