from random import randint, choice as rc
from faker import Faker
from app import app
from models import db, Dog, User, Message
# from regions import regions

fake = Faker()

female_dog_names = [
    "Luna", "Bella", "Lucy", "Daisy", "Lola", "Sadie", "Molly", "Maggie", "Bailey", "Sophie",
    "Chloe", "Stella", "Penny", "Zoe", "Coco", "Roxy", "Rosie", "Ruby", "Gracie", "Willow",
    "Harper", "Lily", "Abby", "Mia", "Sasha", "Hazel", "Ginger", "Ellie", "Luna", "Zara",
    "Maddie", "Millie", "Nova", "Piper", "Scout", "Lilly", "Winnie", "Cali", "Dixie", "Emma",
    "Honey", "Izzy", "Jasmine", "Kona", "Lady", "Leia", "Marley", "Nala", "Olive", "Peaches",
    "Quinn", "Riley", "Sage", "Trixie", "Violet", "Xena", "Yara", "Zelda", "Annie", "Athena",
    "Belle", "Callie", "Dakota", "Ella", "Fiona", "Georgia", "Holly", "Ivy", "Josie", "Katie",
    "Lexi", "Minnie", "Nina", "Oreo", "Poppy", "Queenie", "Rosie", "Sadie", "Tasha", "Wendy",
    "Xena", "Yara", "Zara", "April", "Bonnie", "Darcy", "Effie", "Freya", "Gigi", "Hazel"
]

male_dog_names = [
    "Max", "Charlie", "Cooper", "Buddy", "Rocky", "Duke", "Bear", "Tucker", "Oliver", "Jack",
    "Teddy", "Milo", "Leo", "Zeus", "Winston", "Oscar", "Bentley", "Murphy", "Henry", "Lucky",
    "Gus", "Apollo", "Sam", "Sammy", "George", "Finn", "Hank", "Riley", "Jax", "Toby",
    "Jake", "Zeke", "Champ", "Harley", "Rusty", "Scout", "Bruno", "Cody", "Louie", "Maximus",
    "Maverick", "Archie", "Benji", "Simba", "Bear", "Dexter", "Frankie", "Gizmo", "Jasper", "Kobe",
    "Marley", "Ollie", "Peanut", "Rocco", "Rudy", "Scooter", "Thor", "Bailey", "Beau", "Boomer",
    "Brody", "Cash", "Chance", "Chase", "Copper", "Dash", "Felix", "Finnegan", "Gunner", "Hunter",
    "Joey", "Koda", "Loki", "Monty", "Murphy", "Nash", "Percy", "Ranger", "Remy", "Ryder",
    "Spike", "Tank", "Toby", "Walter", "Watson", "Willy", "Winston", "Yogi", "Ziggy", "Zorro"
]

dog_hair_colors = [
    "Black", "Brown", "White", "Tan", "Fawn", "Brindle", "Gray", "Red", "Sable", "Blonde"
]

popular_dog_breeds = [
    "Akita", "Alaskan Malamute", "American Bulldog", "American Bully", "American Eskimo Dog", "American Pit Bull Terrier", "Auggie", "Aussiedoodle", "Australian Shepherd", "Basset Hound", "Beagle", "Bernedoodle", "Bernese Mountain Dog", "Border Collie", "Boston Terrier", "Boxer", "Cavalier King Charles Spaniel", "Cavapoo", "Chihuahua", "Cocker Spaniel"
]

breed_sub_breeds = {
    "Akita": [],
    "Alaskan Malamute": [],
    "American Bulldog": [],
    "American Bully": [],
    "American Eskimo Dog": [],
    "American Pit Bull Terrier": [],
    "Auggie": ["Australian Shepherd", "Corgi, Pembroke Welsh"],
    "Aussiedoodle": ["Australian Shepherd", "Poodle"],
    "Australian Shepherd": [],
    "Basset Hound": [],
    "Beagle": [],
    "Bernedoodle": ["Bernese Mountain Dog", "Poodle"],
    "Bernese Mountain Dog": [],
    "Border Collie": [],
    "Boston Terrier": [],
    "Boxer": [],
    "Cavalier King Charles Spaniel": [],
    "Cavapoo": ["Cavalier King Charles Spaniel", "Poodle"],
    "Chihuahua": [],
    "Cocker Spaniel": []
}

breed_descriptions = {
    "Akita": "The Akita is a powerful and loyal breed that originated in Japan. They are known for their strong protective instincts and dignified presence.",
    "Alaskan Malamute": "The Alaskan Malamute is a large and friendly breed that is bred for strength and endurance. They are often used as sled dogs in cold climates.",
    "American Bulldog": "The American Bulldog is a muscular and athletic breed with a confident and friendly temperament. They are known for their loyalty and protective nature.",
    "American Bully": "The American Bully is a strong and muscular breed with a gentle and friendly disposition. They make great family pets and are known for their loyalty.",
    "American Eskimo Dog": "The American Eskimo Dog is an intelligent and energetic breed that is known for its striking white coat and playful personality.",
    "American Pit Bull Terrier": "The American Pit Bull Terrier is a strong and agile breed, recognized for its loyalty and protective nature. They are known for their strong bonds with their families.",
    "Auggie": "The Auggie is a crossbreed between an Australian Shepherd and a Corgi. They are intelligent and lively companions, often inheriting the herding instincts of their parent breeds.",
    "Aussiedoodle": "The Aussiedoodle is a crossbreed between an Australian Shepherd and a Poodle. They are known for their intelligence, friendly nature, and hypoallergenic coat.",
    "Australian Shepherd": "The Australian Shepherd is a highly intelligent and energetic breed. They are commonly used for herding and agility work and make loyal and devoted companions.",
    "Basset Hound": "The Basset Hound is a scent hound breed known for its long ears, short legs, and excellent sense of smell. They have a friendly and laid-back temperament.",
    "Beagle": "The Beagle is a friendly and curious breed, recognized for its exceptional tracking abilities and charming personality. They are great family pets and get along well with children.",
    "Bernedoodle": "The Bernedoodle is a crossbreed between a Bernese Mountain Dog and a Poodle. They are known for their loyal and affectionate nature, as well as their low-shedding coat.",
    "Bernese Mountain Dog": "The Bernese Mountain Dog is a large and gentle breed originating from Switzerland. They are known for their calm and loving temperament, making them excellent family pets.",
    "Border Collie": "The Border Collie is an intelligent and agile breed, widely regarded as one of the most intelligent dog breeds. They are often used for herding livestock and excel in various dog sports.",
    "Boston Terrier": "The Boston Terrier is a small and friendly breed with a charming and lively personality. They are often referred to as the 'American Gentleman' due to their tuxedo-like coat markings.",
    "Boxer": "The Boxer is a medium-sized and muscular breed known for its playful and energetic nature. They are loyal and protective, making them great companions and family pets.",
    "Cavalier King Charles Spaniel": "The Cavalier King Charles Spaniel is a small and affectionate breed with a regal and elegant appearance. They are known for their friendly and gentle temperament.",
    "Cavapoo": "The Cavapoo is a crossbreed between a Cavalier King Charles Spaniel and a Poodle. They are intelligent, friendly, and often inherit the hypoallergenic coat of their Poodle parent.",
    "Chihuahua": "The Chihuahua is a small and spirited breed known for its big personality. They are loyal and devoted to their owners and make excellent companions.",
    "Cocker Spaniel": "The Cocker Spaniel is a medium-sized breed known for its beautiful silky coat and friendly nature. They are versatile dogs, excelling in various roles from companionship to hunting."
}


def seed_dogs():
    random_price = randint(20, 100) * 50
    for i in range(1000):
        dog_breed = rc(popular_dog_breeds)
        sub_breeds = breed_sub_breeds.get(dog_breed, [])
        father_breed = dog_breed if not sub_breeds else rc(sub_breeds)
        mother_breed = dog_breed if not sub_breeds else rc(sub_breeds)
        
        dog_gender = rc(['M', 'F'])  # Define dog_gender variable
        
        if dog_gender == 'M':
            dog_name = rc(male_dog_names)
        else:
            dog_name = rc(female_dog_names)

        dog_description = breed_descriptions.get(dog_breed, "")

        new_dog = Dog(
            seller_id=randint(1, 100),
            buyer_id=None,
            dog_name=dog_name,
            dog_image="",
            dog_breed=dog_breed,
            dog_age=str(randint(1, 15)) + ' weeks',
            dog_gender=dog_gender,  # Assign dog_gender
            dog_weight=str(randint(1, 10)) + ' lbs',
            dog_color=rc(dog_hair_colors),
            dog_price=round(random_price / 50) * 50,
            dog_description=dog_description,
            up_for_adoption=rc([True, False]),
            mother_name=rc(female_dog_names),
            mother_breed=mother_breed,
            mother_weight=str(randint(8, 100)) + ' lbs',
            mother_age=str(randint(1, 7)) + ' years',
            father_name=rc(male_dog_names),
            father_breed=father_breed,
            father_weight=str(randint(8, 100)) + ' lbs',
            father_age=str(randint(1, 12)) + ' years'
        )
        db.session.add(new_dog)
    db.session.commit()



def seed_users():
    for i in range(100):
        new_user = User(
            user_name=fake.name(),
            user_image='https://cdn-icons-png.flaticon.com/512/1946/1946429.png',
            user_email=fake.email(),
            _password_hash='testpassword',
            user_phone_number=fake.phone_number(),
            user_address=fake.street_address(),
            user_city=fake.city(),
            user_state=fake.state(),
            user_zip_code=fake.postcode()
        )
        db.session.add(new_user)
    db.session.commit()

def seed_messages():
        new_message1 = Message(
            message_sender = 1,
            message_recipient = 2,
            message_body = "Hey, I'm interested in your dog! ",
            dog_id = 1
        )
        new_message2 = Message(
            message_sender = 2,
            message_recipient = 1,
            message_body = "Hi, thanks for reaching out! I'd be happy to assist",
            dog_id = 1
        )
        new_message3 = Message(
            message_sender = 1,
            message_recipient = 2,
            message_body= "Perfect, do you mind sending over some additional information?",
            dog_id = 1
        )
        db.session.add(new_message1)
        db.session.add(new_message2)
        db.session.add(new_message3)
        db.session.commit()


