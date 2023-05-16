from flask import Flask, make_response, jsonify, request, session
from config import app, db
# from models import db, Influencer, Campaign, Brand, BrandCampaign, BrandRegion, InfluencerRegion, Region, InfluencerCampaign


# @app.route('/movies', methods=['GET'])
# def movies():
#     response_dict = {
#         "text": "Movies will go here"
#     }

#     return make_response(jsonify(response_dict), 200)

if __name__ == '__main__':
    app.run(port=5555)

