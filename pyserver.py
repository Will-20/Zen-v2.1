import pandas as pd
from flask import Flask, request
import json 
app = Flask(__name__) 

train=pd.read_csv('genres_v2.csv')
train.sort_values(by=['tempo','instrumentalness'])
filter = ((train["tempo"] > 30) & (train["tempo"] < 120))
heartrate = 74
pd.set_option('display.max_colwidth', None)


@app.route('/uri', methods = ['POST']) 
def sum_of_array(): 
    df_sort = train.iloc[(train['tempo']-heartrate).abs().argsort()[:1]]
    data = str(df_sort["uri"])[5:45].lstrip()
    print(data)
    return json.dumps({"uri": data })
   
if __name__ == "__main__": 
    app.run(port=5000)