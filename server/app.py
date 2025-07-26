"""
app.py

Main Flask application file that defines all API routes and handles
incoming HTTP requests for user authentication, dog listings, messaging, and favorites.
Connects to the database using SQLAlchemy and serves as the entry point for the backend server.
"""

# Import necessary Flask modules for web routing and session handling
from flask import Flask, make_response, jsonify, request, session

# Import SQLAlchemy functions and error classes
from sqlalchemy import func
from sqlalchemy.exc import IntegrityError

# Load app, db, CORS, and OS-related config
from config import app, db, CORS, os

# Enable Cross-Origin Resource Sharing for frontend-backend interaction
CORS(app)

# Import all models used in route logic
from models import db, Dog, User, Favorite, Message

# Apply additional configuration to the Flask app from config.py
app.config.from_object('config')


# -------------------- DOGS ROUTES --------------------
@app.route('/dogs', methods=['GET', 'POST'])
def dogs():
    if request.method == 'GET':
        # Retrieve all dogs from the database
        dogs = Dog.query.all()

        # Convert each dog object to dictionary form
        dogs_dict = [dog.to_dict(rules=()) for dog in dogs]

        return dogs_dict, 200

    elif request.method == 'POST':
        # Parse JSON payload from request
        form_data = request.get_json()

        try:
            # Create new Dog object from form data
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
                father_age=form_data.get('father_age')
            )
            
            # Add and commit new dog to database
            db.session.add(dog)
            db.session.commit()

            return dog.to_dict(rules=()), 201
        
        except ValueError as err:
            # Handle form data validation error
            return {'error': '400: Validation Error'}, 400

@app.route('/dogs/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def dogs_by_id(id):

    if request.method == 'GET':
        # Retrieve dog by its ID
        dog = Dog.query.filter(Dog.id == id).first()

        if dog:
            # Return dog data as JSON if found
            dog_dict = dog.to_dict(rules=())
            response = make_response(dog_dict, 200)
            return response
        else:
            return {'error': 'Dog not found'}, 404
        
    elif request.method == 'PATCH':
        # Find the dog to update
        dog = Dog.query.filter(Dog.id == id).first()
        if dog:
            try:
                # Apply partial updates from form data
                form_data = request.get_json()
                for attr in form_data:
                    setattr(dog, attr, form_data.get(attr))

                db.session.add(dog)
                db.session.commit()

                # Return updated dog data
                dog_dict = dog.to_dict(rules=())
                response = make_response(dog_dict, 202)
                return response
            except:
                return {'error': '400: Validation error'}, 400
        return {'error': 'Dog not found'}, 400
        
    elif request.method == 'DELETE':
        # Retrieve dog to delete
        dog = Dog.query.filter(Dog.id == id).first()

        if dog:
            db.session.delete(dog)
            db.session.commit()
            return {}, 204
        return {"error": 'Dog not found'}, 404


# -------------------- USERS ROUTES --------------------
@app.route('/users', methods=['GET', 'POST'])
def users():
    if request.method == 'GET':
        # Fetch all users
        users = User.query.all()
        users_dict = [user.to_dict(rules=()) for user in users]
        return users_dict, 200

    elif request.method == 'POST':
        # Parse request data for new user
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
                user_zip_code=form_data.get('user_zip_code')
            )
            db.session.add(user)
            db.session.commit()
            return user.to_dict(rules=()), 201
        except ValueError as err:
            return {'error': '400: Validation Error'}, 400
        
# Route for handling GET, PATCH, and DELETE requests for a specific user by ID
@app.route('/users/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def users_by_id(id):

    if request.method == 'GET':
        # Find user in the database by ID
        user = User.query.filter(User.id == id).first()

        if user:
            # If user exists, convert to dictionary and return with 200 OK
            user_dict = user.to_dict(rules=())
            response = make_response(user_dict, 200)
            return response
        else:
            # If user not found, return 404 error
            return {'error': 'User not found'}, 404

    elif request.method == 'PATCH':
        # Find the user by ID
        user = User.query.filter(User.id == id).first()
        if user:
            try:
                # Get updated data from the request
                form_data = request.get_json()

                # Update each attribute of the user with the new values
                for attr in form_data:
                    setattr(user, attr, form_data.get(attr))

                # Save changes to the database
                db.session.add(user)
                db.session.commit()

                # Return the updated user with 202 Accepted
                user_dict = user.to_dict(rules=())
                response = make_response(user_dict, 202)
                return response
            except:
                # If any error occurs (e.g., invalid data), return validation error
                return {'error': '400: Validation error'}, 400

        # If user not found, return error
        return {'error': 'User not found'}, 400

    elif request.method == 'DELETE':
        # Find the user by ID
        user = User.query.filter(User.id == id).first()

        if user:
            # Delete user from the database
            db.session.delete(user)
            db.session.commit()
            return {}, 204  # No content on success
        else:
            # If user not found, return error
            return {"error": 'User not found'}, 404

        
# -------------------- LOGIN ROUTE --------------------
@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        # Get login credentials from the request body
        formData = request.get_json()

        # Find the user by email
        user = User.query.filter(User.user_email == formData['user_email']).first()

        # Authenticate user with provided password
        if user and user.authenticate(formData['password']):
            # Store user ID in session (cookie-based login)
            session['user_id'] = user.id

            # Return user data on successful login
            response = make_response(user.to_dict(), 200)
            return response
        else:
            # Invalid credentials
            return {'error': 'Could not authorize login credentials'}, 401


# -------------------- LOGOUT ROUTE --------------------
@app.route('/logout', methods=['DELETE'])
def logout():
    # Clear the session if the user is logged in
    if session.get('user_id'):
        session['user_id'] = None
        return {}, 204

    # If no user is logged in
    return {'error': '401 Unauthorized'}, 401


# -------------------- SIGNUP ROUTE --------------------
@app.route('/signup', methods=['POST'])
def signup():
    if request.method == 'POST':
        # Get signup data from request
        formData = request.get_json()

        try:
            # Create a new user record
            new_user = User(
                user_name=formData['user_name'],
                user_image=formData['user_image'],
                user_email=formData['user_email'],
                password_hash=formData['_password_hash'],  # Uses setter to hash password
                user_phone_number=formData['user_phone_number'],
                user_address=formData['user_address'],
                user_city=formData['user_city'],
                user_state=formData['user_state'],
                user_zip_code=formData['user_zip_code']
            )

            # Add new user to the database
            db.session.add(new_user)
            db.session.commit()

            # Log in the newly created user automatically
            session['user_id'] = new_user.id

            # Return user data
            response = make_response(new_user.to_dict(), 201)
            return response
        except ValueError:
            return {'error': 'Validation Error'}, 400


# -------------------- CHECK SESSION ROUTE --------------------
@app.route('/check_session', methods=['GET'])
def check_session():
    # Check if user is logged in (via session cookie)
    if session.get('user_id'):
        user = User.query.filter(User.id == session['user_id']).first()
        return user.to_dict(), 200

    # User not logged in
    return {'error': '401 Unauthorized'}, 401

    
# -------------------- MESSAGES ROUTE --------------------
@app.route('/messages', methods=['GET', 'POST'])
def messages():
    if request.method == 'GET':
        # Fetch all messages from the database
        messages = Message.query.all()

        # Convert each message to a dictionary format
        messages_dict = [message.to_dict(rules=()) for message in messages]

        # Return list of all messages
        return messages_dict, 200

    elif request.method == 'POST':
        # Get form data from client
        form_data = request.get_json()

        try:
            # Create new message instance
            message = Message(
                message_sender_id=form_data.get('message_sender_id'),
                message_receiver_id=form_data.get('message_receiver_id'),
                message_body=form_data.get('message_body'),
                dog_id=form_data.get('dog_id')
            )

            # Add and commit the new message to the database
            db.session.add(message)
            db.session.commit()

            # Return the created message as JSON
            return message.to_dict(rules=()), 201

        except ValueError as err:
            return {'error': '400: Validation Error'}, 400

@app.route('/messages/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def messages_by_id(id):
    if request.method == 'GET':
        # Get a message by its ID
        message = Message.query.filter(Message.id == id).first()

        if message:
            # Return message details
            message_dict = message.to_dict(rules=())
            response = make_response(message_dict, 200)
            return response
        else:
            return {'error': 'User not found'}, 404
        
# -------------------- FAVORITES ROUTE --------------------
@app.route('/favorites', methods=['GET', 'POST'])
def favorites():
    if request.method == 'GET':
        # Retrieve all favorites from the database
        favorites = Favorite.query.all()

        # Convert to dictionaries
        favorites_dict = [favorite.to_dict(rules=()) for favorite in favorites]

        return favorites_dict, 200

    elif request.method == 'POST':
        # Get form data from the request
        form_data = request.get_json()

        try:
            # Create a new Favorite instance
            favorite = Favorite(
                user_id=form_data.get('user_id'),
                dog_id=form_data.get('dog_id')
            )

            # Save to database
            db.session.add(favorite)
            db.session.commit()
            return favorite.to_dict(rules=()), 201

        except ValueError as err:
            return {'error': '400: Validation Error'}, 400

@app.route('/favorites/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def get_favorites_by_id(id):
    if request.method == 'GET':
        # Find a favorite by ID
        favorite = Favorite.query.filter(Favorite.id == id).first()

        if favorite:
            # Return favorite details
            favorite_dict = favorite.to_dict(rules=())
            response = make_response(favorite_dict, 200)
            return response
        else:
            return {'error': 'User not found'}, 404

    elif request.method == 'PATCH':
        # Find favorite by ID
        favorite = Favorite.query.filter(Favorite.id == id).first()

        if favorite:
            try:
                # Update favorite attributes with request data
                form_data = request.get_json()
                for attr in form_data:
                    setattr(favorite, attr, form_data.get(attr))

                db.session.add(favorite)
                db.session.commit()

                # Return updated favorite
                favorite_dict = favorite.to_dict(rules=())
                response = make_response(favorite_dict, 202)
                return response
            except:
                return {'error': '400: Validation error'}, 400
        return {'error': 'Favorite not found'}, 400

    elif request.method == 'DELETE':
        # Find favorite by ID
        favorite = Favorite.query.filter(Favorite.id == id).first()

        if favorite:
            # Delete from database
            db.session.delete(favorite)
            db.session.commit()
            return {}, 204
        return {"error": 'User not found'}, 404

if __name__ == '__main__':
    app.run(port=5555, debug=True)
    # app.run()

