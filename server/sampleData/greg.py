import psycopg2

import csv

import sys

try:

    conn = psycopg2.connect(dbname="mnemonics",user="postgres",host="localhost",password="")

    conn.autocommit = True

    cur = conn.cursor()




    for x in range(1,1163): 

      sql = "INSERT INTO mnemonics (word_id, user_id, mnemonic, lat, long, rating) VALUES (%s, %s, %s,%s,%s, %s)"

      temp = 'Mnemonic here'

      cur.execute(sql,(x,str(6),temp, str(28.538336),str(-81.379234),str(0)))

    #     for row in reader: 

    #        s1 = row[0]

    #        s2 = row[1].strip()

    print "done"

except psycopg2.Error as e:

    print "I am unable to connect to the database."

    print e

    e = sys.exc_info()[0]

    print e

