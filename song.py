from bs4 import BeautifulSoup
import requests,json 

def song(url,count):

    count = int(count)
    print("count",count)
    url = url.replace("+","%20")
    url = url.replace(" ","%20")
    data = requests.get('https://mojim.com/'+url+'.html?t4')
    soup = BeautifulSoup(data.text,"html.parser")
    song = []
    try:
        text = "https://mojim.com"+soup.find_all('span', class_="mxsh_ss3")[count].select("a")[0]["href"]
    

        print(text)
        data1 = requests.get(text)
        soup1 = BeautifulSoup(data1.text,"html.parser")
        result = soup1.find(class_='fsZx3')
        result = str(result)
        result = result.replace('<a href="http://mojim.com">※ Mojim.com　魔鏡歌詞網 </a>','')
    except IndexError:
        result = "無資料</br>"
    result ={"id":count,
                "song":result
                }
    return(json.dumps(result))