# -*- coding: utf-8 -*-
"""
Created on Mon Sep 23 15:45:51 2019

@author: lucia
"""


import pandas as pd 

inputCSV = pd.read_csv("./IdiomasCSV.csv")
outputCSV = pd.DataFrame()

def obtainFirst(string): 
    return string.split(",")[0]

outputCSV["lemma"] = inputCSV["Nombre de idioma"].apply(obtainFirst)
outputCSV["poscode"] = 3

newColumns = inputCSV["Nombre de idioma"].str.split(",", n= 5, expand=True)
print(newColumns)
outputCSV["surface"] = newColumns[0]
outputCSV.insert(3, "", newColumns[1])
outputCSV.insert(4, " ", newColumns[2])
outputCSV.insert(5, "  ", newColumns[3])
outputCSV.insert(6, "   ", newColumns[4])
print(outputCSV)
outputCSV.to_csv('outputLanguages.csv', index=False)
#outputCSV["surface"] = inputCSV["Nombre de idioma"]
#print(outputCSV)