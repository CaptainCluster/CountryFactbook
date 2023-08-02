#CaptainCluster https://github.com/CaptainCluster

#This file writes all the necessary data to the capitals.json file.
#If the user, for instance, accidentally deletes everything in the file
#or wants to update the data, this program will write the most recent
#information. 

#Also reduces traffic and improves re-usability

from bs4 import BeautifulSoup #For web scraping
import requests #For sending a request to the site
import json #Writing the data on capital.json file

def mainFunction():
    dataList = fetchData()
    writeJson(dataList)

#Fetches the data from the url. In this case, from the tr-tags.
#Each tr-tag contains the necessary info for one country.
def fetchData():
    url = "https://www.worlddata.info/capital-cities.php"

    dataList = [] #Stores all the capitalInfo lists (declared below)
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    
    listObjects = soup.find_all("tr")
    for object in listObjects:
        capitalInfo = [] #Country, capital, the population of the capital
        for child in object:
            capitalInfo.append(child.get_text())
        dataList.append(capitalInfo)
    return dataList

#Writes the data to JSON in this format per country:
#{"country:" country name, "capital": capital name, "population": the population of the capital}
def writeJson(dataList):
    jsonList = [] #Creating an empty list that we will fill and dump to the json file
    jsonFile = "src/data/capitals.json"
    with open(jsonFile, "w") as file:
        for data in dataList:
            dataDump = {"country": data[0],
                        "capital": data[1],
                        "population": data[2]
                        }
            jsonList.append(dataDump)
            jsonContent = {"content": jsonList}
        json.dump(jsonContent, file)

mainFunction()