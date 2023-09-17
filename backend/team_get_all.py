from bottle import get, request, response, post
import sqlite3

db = sqlite3.connect("./database/signifly-foosball.db")


# GETTING ALL TEAMS # 
@get("/api/team_get_all")
def _():
    try:
        teams = db.execute("SELECT * FROM teams").fetchall()
        db.commit()
        return teams
    except Exception as ex:
        print(ex)
    finally:
        db.close()
