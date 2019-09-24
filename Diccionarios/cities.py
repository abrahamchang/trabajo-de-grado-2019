# -*- coding: utf-8 -*-
"""
Created on Tue Sep 24 00:28:53 2019

@author: lucia
"""


import pandas as pd 

inputCSV = pd.read_csv("./ciudadesCSV.csv")
outputCSV = pd.DataFrame()

outputCSV['lemma'] = inputCSV['Ciudad']
outputCSV['poscode'] = 3
outputCSV['surface'] = inputCSV['Ciudad']

print(outputCSV)

outputCSV.to_csv('outputCities.csv', index=False)