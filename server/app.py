from flask import Flask, request, jsonify
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
from flask_cors import CORS
import os
from bson import ObjectId

load_dotenv()

app = Flask(__name__)
uri = os.environ.get('MONGO_URI')
client = MongoClient(uri, server_api=ServerApi('1'))

CORS(app)

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

db = client.todo_app;
todo_collection = db.todo_app;


# API to create a new to-do item
@app.route('/todo/create',methods=['POST'])
def create_todo():
    todo_text = request.json.get('text');
    todo_type = request.json.get('type');

    if not todo_text and not todo_type:
        return jsonify({'error': "Error creating todo"}),400
    
    todo = {'text': todo_text, 'type': todo_type}
    result = todo_collection.insert_one(todo);
    inserted_id = str(result.inserted_id);
    return jsonify({'id':inserted_id, 'text': todo['text'], 'type': todo['type']}), 201


# API to list all to-do items
@app.route('/todo/fetch',methods=['GET'])
def get_todo():
    todos = todo_collection.find();
    result = [];
    for todo in todos:
        result.append({'id': str(todo['_id']), 'text': todo['text'], 'type': todo['type']})
    return jsonify(result),200

# API to edit a to-do item
@app.route('/todo/update',methods=['POST'])
def update_todo():
    todo_id = request.json.get("id")
    updated_text = request.json.get("text")

    result = todo_collection.update_one({'_id': ObjectId(todo_id)}, {'$set': {'text': updated_text}})
    return jsonify({'message': 'Todo updated successfully'}), 200



# API to delete a to-do item
@app.route('/todo/delete',methods=['POST'])
def delete_todo():
    todo_id = request.json.get('id');
    if not todo_id:
        return jsonify({'error': 'Invalid todo id'}),400
    
    result = todo_collection.delete_one({'_id': ObjectId(todo_id)});

    if result.deleted_count == 1:
        return jsonify({'message': "Todo deleted successfully"}), 200
    else:
        return jsonify({'error': "Todo not found"}), 404


if __name__ == '__main__':
    app.run(debug=True)