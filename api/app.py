from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from pymongo.server_api import ServerApi
import json
from bson import json_util

app = Flask(__name__)
CORS(app)

uri = "mongodb+srv://node_connection:wxcqjexeYQgshxjF@animals.fbfy7o7.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri, server_api=ServerApi('1'))

db = client['animals']

animals = db['animals']
water = db['water']

@app.route('/api/animals/', methods=['GET'])
def get_animals():
    lat = float(request.args.get('lat'))
    lng = float(request.args.get('lng'))

    aggregation = [
    {
        '$geoNear': {
            'near': {
                'type': 'Point', 
                'coordinates': [
                    lng, lat
                ]
            }, 
            'distanceField': 'distance', 
            'maxDistance': 50000, 
            'query': {}, 
            'spherical': False
        }
    }, {
        '$group': {
            '_id': {
                'name': '$name'
            }, 
            'unique': {
                '$first': '$$ROOT'
            }
        }
    }, {
        '$replaceRoot': {
            'newRoot': '$unique'
        }
    }, {
        '$sort': {
            'kingdom': 1
        }
    }, {
        '$limit': 100
    }, {
        '$project': {
            'location': {
                '$ifNull': [
                    '$location', '$$REMOVE'
                ]
            }, 
            'name': {
                '$ifNull': [
                    '$name', '$$REMOVE'
                ]
            }, 
            'kingdom': {
                '$ifNull': [
                    '$kingdom', '$$REMOVE'
                ]
            }, 
            'phylum': {
                '$ifNull': [
                    '$phylum', '$$REMOVE'
                ]
            }, 
            'class': {
                '$ifNull': [
                    '$class', '$$REMOVE'
                ]
            }, 
            'country_full': {
                '$ifNull': [
                    '$country_full', '$$REMOVE'
                ]
            }, 
            'state_province': {
                '$ifNull': [
                    '$state_province', '$$REMOVE'
                ]
            }, 
            'county': {
                '$ifNull': [
                    '$county', '$$REMOVE'
                ]
            }, 
            'locality': {
                '$ifNull': [
                    '$locality', '$$REMOVE'
                ]
            }, 
            'how_to_cite_source': {
                '$ifNull': [
                    '$how_to_cite_source', '$$REMOVE'
                ]
            }, 
            'consult_year': {
                '$ifNull': [
                    '$consult_year', '$$REMOVE'
                ]
            }, 
            'state': {
                '$cond': [
                    {
                        '$eq': [
                            '$state', None
                        ]
                    }, 'Not in danger', '$state'
                ]
            }
        }
    }
]
    
    result = animals.aggregate(aggregation)
    print(result)

    json_result = []
    for document in result:
        json_result.append(json.loads(json_util.dumps(document)))

    return jsonify(json_result), 200


@app.route('/api/water/', methods=['GET'])
def get_water_bodies():
    lat = float(request.args.get('lat'))
    lng = float(request.args.get('lng'))

    print(f"lat: {lat}, lng: {lng}")

    aggregation = [
    {
        '$geoNear': {
            'near': {
                'type': 'Point', 
                'coordinates': [lng, lat]
            }, 
            'distanceField': 'distance', 
            'maxDistance': 50000, 
            'query': {}, 
            'spherical': False
        }
    }, {
        '$sort': {'distance': 1}
    }, {
        '$limit': 1
        }
    ]

    result = water.aggregate(aggregation)

    json_result = []
    for document in result:
        json_result.append(json.loads(json_util.dumps(document)))

    return jsonify(json_result), 200
    

if __name__ == '__main__':
    app.run(debug=False)
