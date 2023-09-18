from bottle import get, request, response, post
import sqlite3
import json


# GETTING ALL TEAMS # 
# GETTING ALL TEAMS
@get("/api/teams_get_all")
def _():
    try:
        db = sqlite3.connect("./database/signifly-foosball.db", check_same_thread=False)
        cursor = db.cursor()

        cursor.execute("SELECT * FROM teams")
        teams = cursor.fetchall()

        # Convert the teams to a list of dictionaries
        teams_list = []
        for team in teams:
            team_dict = {
                "id": team[0],
                "team_name": team[1],
                "team_member_1": team[2],
                "team_member_2": team[3],
                # Add other fields as needed
            }
            teams_list.append(team_dict)

        return json.dumps(teams_list)

    except Exception as ex:
        print(ex)
    finally:
        db.close()
