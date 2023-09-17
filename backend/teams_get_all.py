from bottle import get, request, response, post
import sqlite3
import json

print("helllooooo")



# GETTING ALL TEAMS # 
@get("/api/teams_get_all")
def _():
    try:
        print("something")
        db = sqlite3.connect("./database/signifly-foosball.db", check_same_thread=False)
        teams = db.execute("SELECT * FROM teams").fetchall()
        print("#####TEAAAAAMS:")
        print(teams)
        db.commit()
        
        return json.dumps(teams)
    
    except Exception as ex:
        print(ex)
    finally:
        db.close()
