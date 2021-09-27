import json 
from flask import Flask,request,render_template
from bs4 import BeautifulSoup
import requests
from song import song
from search import search
app = Flask(__name__)
app.config['DEBUG'] = True
# app.config['SEND_FILE_MAX_AGE_DEFAULT'] = timedelta(seconds=1)
@app.route("/file1",methods=['GET','POST'])
def file1():
    file11 =request.form.get("file")
    with open("./templates/file.json",'w',encoding='UTF-8') as jsonfile: #儲存檔案
        a = json.dump(file11, jsonfile,ensure_ascii=False,indent=4)
        print(a)
    return {"ok":"ok"}
@app.route("/file",methods=['GET','POST'])
def file():

    return render_template("file.json")
@app.after_request
def apply_caching(response):
    response.headers["X-Frame-Options"] = "SAMEORIGIN"
    return response
@app.route("/",methods=['GET','POST'])
def index():
    return render_template("index.html")
@app.route("/search",methods=['GET','POST'])
def xsearch():
    aaa =request.form.get("search")
    ss = search(aaa)
    print(ss)
    return json.dumps(ss)
@app.route("/listen",methods=['GET','POST'])
def listen():
    return render_template("listen.html")
@app.route("/song",methods=['GET','POST'])
def xsong():
    url = request.form.get("search")
    count = request.form.get("count")
    return(song(url,count))

@app.route("/my_love",methods=['GET','POST'])
def my_love():
    return render_template("my_love.html")

if __name__ == "__main__":
    # app.run()
    app.run(host='0.0.0.0',port=5000,debug=True)