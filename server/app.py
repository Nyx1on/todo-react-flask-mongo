from flask import Flask, request, jsonify
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
from flask_cors import CORS
import os

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


@app.route('/createTodo',methods=['POST'])
def create_todo():
    todo_text = request.json.get('todo');
    if not todo_text:
        return jsonify({'error': "Error creating todo"}),400
    
    todo = {'text': todo_text}
    result = todo_collection.insert_one(todo);
    inserted_id = str(result.inserted_id);
    return jsonify({'_id':inserted_id, 'text': todo['text']}), 200

if __name__ == '__main__':
    app.run(debug=True)