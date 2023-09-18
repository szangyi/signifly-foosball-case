from bottle import get, request, response, post
import sqlite3
import json


# Getting all games # 
@get("/api/games_get_all")
def _():
    try:
        db = sqlite3.connect("./database/signifly-foosball.db", check_same_thread=False)
        cursor = db.cursor()

        cursor.execute("SELECT * FROM games")
        games = cursor.fetchall()

        # Convert the teams to a list of dictionaries
        games_list = []
        for game in games:
            game_dict = {
                "game_id": game[0],
                "team_name_1": game[1],
                "team_name_2": game[2],
                "team_score_1": game[3],
                "team_score_2": game[4],
                # "games_lost": game[5],
                # "games_points": game[6],
                # Add other fields as needed
            }
            games_list.append(game_dict)

        return json.dumps(games_list)

    except Exception as ex:
        print(ex)
    finally:
        db.close()
