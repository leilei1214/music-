from bs4 import BeautifulSoup
import requests,json 
def search(search):
    print(search)
    # search =request.form.get("search")
    ss = {}
    search = search.replace(" ","+")
    song = search.split("+")
    try:
        ss["singer"]=song[0]
        ss["song"] = song[1]
    except:
        ss["singer"]=""
        ss["song"] =song[0]
    # print(search)
    url = "https://www.youtube.com/results?search_query="+str(search)
    res = requests.get(url)
    soup = BeautifulSoup(res.text,"html.parser") #轉成整理後的格式
    soup = soup.find_all("script")
    soup = str(soup[32])
    content = soup.split("var ytInitialData = ")[1]
    content = content.rsplit(";",1)
    content = content[0]
    s = json.loads(content)
    js = []
    for song in s["contents"]["twoColumnSearchResultsRenderer"]["primaryContents"]["sectionListRenderer"]["contents"][0]["itemSectionRenderer"]["contents"]:
        if (list(list(song)[0])[0])=='v':
            #360*202 jpg
            small_pic = song["videoRenderer"]["thumbnail"]["thumbnails"][0]["url"]
            web = "https://www.youtube.com/embed/"+ song["videoRenderer"]["navigationEndpoint"]["commandMetadata"]["webCommandMetadata"]["url"]
            web = web.replace("/watch?v=","")
            song_name = song["videoRenderer"]["title"]["runs"][0]["text"]
            end = {"small_pic":small_pic,
                "song_name":song_name,
                "web":web
                }
            js.append(end)
        
    # for i in js:
    #     print(i)
    ss["song_name"] = js[0]["song_name"]
    ss["web"] = js[0]["web"]
    print(ss)
    return ss