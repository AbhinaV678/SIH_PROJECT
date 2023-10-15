from flask import Flask, jsonify, request
import pickle
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import AdaBoostClassifier


# Setup flask server
app = Flask(__name__)

@app.route('/getData', methods = ['POST'])
def getPlantCategory():
	nodeData = request.get_json()
	
	nodeData_as_floats = [float(value) for value in nodeData]
	nodeData = nodeData_as_floats
	print(nodeData)
	# Convert each element in nodeData to a float and create a new list
    
	loaded_model = pickle.load(open('ada_boost_model.pkl', 'rb'))

	nodeData = np.asarray(nodeData)
	nodeData = nodeData.reshape(1, -1)
	predictions = loaded_model.predict(nodeData)

	return jsonify({"resultant": predictions[0]  })

if __name__ == "__main__":
	app.run(port=5000)