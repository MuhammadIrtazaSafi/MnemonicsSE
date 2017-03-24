import psycopg2
import csv
import sys
try:
    conn = psycopg2.connect(dbname="mnemonics",user="postgres",host="localhost",password="")
    conn.autocommit = True
    cur = conn.cursor()

    counter = 1
    with open('words.csv','rb') as file:
        reader = csv.reader(file)
        for row in reader: 
           s1 = row[0]
           s2 = row[1]
           sql = "INSERT INTO words (word, def) VALUES (%s, %s)"
           sql = sql
           print counter
           counter+=1
           cur.execute(sql,(s1, s2))
    
    print "done" 
    out = cur.execute('SELECT * from words') 
    print(out)
 
except:
    print "I am unable to connect to the database."
    e = sys.exc_info()[0]
    print e

