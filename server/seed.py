from random import randint, choice as rc
from faker import Faker
from app import app
from models import db, Dog, User, Message, Favorite

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
    "Akita", "Affenpinscher", "Afghan Hound", "Airedale", "Australian Shepherd", "Beagle", "Boxer", "Chihuahua", "Cockapoo", "Dalmatian", "Doberman", "German Shepherd", "Husky", "Labradoodle", "Labrador", "Maltese", "Pitbull", "Pomeranian", "Pug", "Rottweiler", "Shiba", "Shihtzu", "Spanish Waterdog"
]

breed_sub_breeds = {
    "Akita": [],
    "Affenpinscher": [],
    "Afghan Hound": [],
    "Airdale": [],
    "Australian Shepherd": [],
    "Beagle": [],
    "Boxer": [],
    "Chihuahua": [],
    "Cockapoo": [],
    "Dalmatian": [],
    "Doberman": [],
    "German Shepherd": [],
    "Husky": [],
    "Labradoodle": ["Labrador", "Poodle"],
    "Labrador": [],
    "Maltese": [],
    "Pitbull": [],
    "Pomeranian": [],
    "Pug": [],
    "Rottweiler": [],
    "Shiba": [],
    "Shihtzu": [],
    "Spanish Waterdog": []
}

breed_descriptions = {
    "Akita": "The Akita is a powerful and dignified breed known for its loyalty and courage. With a strong, muscular build and a thick double coat, they are well-suited for colder climates. Akitas are independent and make devoted companions and guardians.",
    "Affenpinscher": "The Affenpinscher is a small but confident breed with a mischievous and comical personality. They have a distinctive wiry coat and a monkey-like expression that adds to their charm. Affenpinschers are spirited and intelligent, making them excellent watchdogs and delightful family pets.",
    "Afghan Hound": "The Afghan Hound is a regal and elegant breed known for its graceful appearance and flowing coat. With a noble bearing and keen eyesight, they were originally bred for hunting in rugged terrains. Afghan Hounds are independent and affectionate, forming strong bonds with their families.",
    "Airedale": "The Airedale Terrier, often called the King of Terriers, is a versatile and intelligent breed. They have a wiry coat and a distinctive beard, giving them a handsome and rugged look. Airedales are energetic and courageous, excelling in various activities such as obedience, agility, and even water sports.",
    "Australian Shepherd": "The Australian Shepherd is a highly energetic and intelligent breed known for its herding abilities. With a medium-sized build and a striking coat of various colors, they are both beautiful and athletic. Australian Shepherds are loyal and trainable, making them excellent working dogs and active companions.",
    "Beagle": "The Beagle is a friendly and merry breed famous for its keen sense of smell. With a compact build and expressive eyes, they possess an irresistible charm. Beagles are sociable and enjoy the company of humans and other dogs, making them popular family pets and great companions for outdoor adventures.",
    "Boxer": "The Boxer is a medium-sized and muscular breed with a distinctive square-shaped head and strong jaw. They are known for their boundless energy and playful nature. Boxers are affectionate and protective, forming strong bonds with their families while also being patient and gentle with children.",
    "Chihuahua": "The Chihuahua is a tiny and spirited breed that exudes personality. With a compact size and large, expressive eyes, they are irresistibly adorable. Chihuahuas are loyal and devoted to their owners, often forming strong bonds. Despite their small stature, they possess a courageous and confident spirit.",
    "Cockapoo": "The Cockapoo is a delightful crossbreed between a Cocker Spaniel and a Poodle. They inherit the intelligence and low-shedding coat from their Poodle parent, combined with the friendly and affectionate nature of the Cocker Spaniel. Cockapoos are adaptable and make excellent companions for families of all sizes.",
    "Dalmatian": "The Dalmatian is a unique and eye-catching breed known for its distinctive coat pattern of spots. They have a medium-sized, muscular build and an energetic and outgoing personality. Dalmatians are active and require regular exercise, making them well-suited for active individuals or families.",
    "Doberman": "The Doberman is a sleek and powerful breed known for its loyalty and protective nature. With a well-muscled body and a confident stride, they make excellent guard dogs and family companions. Dobermans are intelligent and trainable, excelling in various activities such as obedience, agility, and even search and rescue.", 
    "German Shepherd": "The German Shepherd is a versatile and highly trainable breed with a strong work ethic. They have a noble and dignified appearance, coupled with a loyal and protective nature. German Shepherds are often used as police and military dogs due to their intelligence, versatility, and ability to excel in various tasks.",
    "Husky": "The Husky is a striking and energetic breed renowned for its endurance and beautiful coat. With a thick double coat, erect ears, and expressive eyes, they possess an alluring and captivating presence. Huskies are friendly and sociable, often forming strong bonds with their families while retaining a sense of independence.",
    "Labradoodle": "The Labradoodle is a popular crossbreed between a Labrador Retriever and a Poodle. They combine the intelligence and trainability of the Poodle with the friendly and outgoing nature of the Labrador. Labradoodles are often low-shedding and make excellent companions for individuals with allergies or those seeking a family-friendly dog.", 
    "Labrador": "The Labrador Retriever is a friendly and versatile breed known for its gentle nature and intelligence. With a sturdy build and an expressive face, they are both athletic and lovable. Labradors are renowned for their loyalty and adaptability, excelling as guide dogs, search and rescue dogs, and family pets.",
    "Maltese": "The Maltese is a small and elegant breed known for its silky white coat and charming personality. With a compact size and round, dark eyes, they have an irresistible appeal. Maltese dogs are affectionate and thrive on companionship, making them ideal lap dogs and well-suited for apartment living.",
    "Pitbull": "The Pitbull is a strong and muscular breed that is often misunderstood. With a powerful physique and a determined expression, they are loyal and protective of their families. Properly socialized and trained, Pitbulls can be loving and gentle companions, showing great loyalty and affection.",
    "Pomeranian": "The Pomeranian is a small and fluffy breed full of personality and energy. With a luxurious double coat and a plumed tail, they are both adorable and regal. Pomeranians are lively and confident, often forming strong bonds with their owners and delighting them with their playful antics.",
    "Pug": "The Pug is a charming and comical breed known for its wrinkled face and expressive eyes. With a compact and muscular body, they are both sturdy and affectionate. Pugs have a friendly and easygoing temperament, making them excellent companions for individuals of all ages.",
    "Rottweiler": "The Rottweiler is a robust and confident breed with a noble and powerful presence. With a well-muscled body and a distinct black and tan coat, they are both imposing and loyal. Rottweilers are intelligent and versatile, excelling in tasks such as herding, search and rescue, and even therapy work.",
    "Shiba": "The Shiba Inu is a spirited and independent breed hailing from Japan. With a compact and agile build, they possess a fox-like appearance and a confident demeanor. Shiba Inus are known for their intelligence and bold personality, making them a popular choice for experienced dog owners seeking a loyal companion.",
    "Shih Tzu": "The Shih Tzu is a small and affectionate breed known for its long, flowing coat and friendly nature. With a sweet and expressive face, they capture the hearts of many. Shih Tzus are devoted and social, thriving on human companionship and making them wonderful family pets.",
    "Spanish Waterdog": "The Spanish Waterdog is a versatile and intelligent breed originally bred for herding and retrieving in the Spanish countryside. With a curly and wooly coat, they are both hypoallergenic and distinctive in appearance. Spanish Waterdogs are active and trainable, excelling in various dog sports and forming strong bonds with their families."
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
            breeder_id=randint(1, 100),
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
            user_phone_number=fake.phone_number(),
            user_address=fake.street_address(),
            user_city=fake.city(),
            user_state=fake.state(),
            user_zip_code=fake.postcode()
        )
        new_user.password_hash = new_user.user_email + 'passwordSalt'
        db.session.add(new_user)
    db.session.commit()

def seed_messages():
    new_message1 = Message(
        message_sender_id = 1,
        message_body = "Hey, I'm interested in your dog! ",
        dog_id = 1
    )
    db.session.add(new_message1)
    db.session.commit()

def seed_favorites():
    for i in range(500):
        new_favorite = Favorite(
            user_id = randint(1,100),
            dog_id = randint(1,1000)
        )
        db.session.add(new_favorite)
    db.session.commit()

if __name__ == '__main__':

    with app.app_context():
        print('Clearing old data...')
        Dog.query.delete()
        User.query.delete()
        Message.query.delete()
        Favorite.query.delete()
        db.session.commit()
        print('Seeding...')
        seed_dogs()
        print('Seeded dogs')
        seed_users()
        print('Seeded users')
        seed_messages()
        print('Seeded messages')
        seed_favorites()
        print('Seeded favorites')
        print('Done!')



