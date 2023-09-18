from bottle import get, request, response, post
import sqlite3
import json

# Getting all games #
@get("/api/games_get_all")
def _():
    try:
        db = sqlite3.connect("./database/signifly-foosball.db", check_same_thread=False)
        cursor = db.cursor()

        cursor.execute("""
            SELECT games.game_id, games.team_id_1, games.team_id_2, games.team_score_1, games.team_score_2,
                   teams.team_name AS team_name_1,
                   (SELECT team_name FROM teams WHERE teams.id = games.team_id_2) AS team_name_2
            FROM games
            LEFT JOIN teams ON games.team_id_1 = teams.id
        """)

        games = cursor.fetchall()

        # Convert the games to a list of dictionaries
        games_list = []
        for game in games:
            game_dict = {
                "game_id": game[0],
                "team_id_1": game[1],
                "team_id_2": game[2],
                "team_score_1": game[3],
                "team_score_2": game[4],
                "team_name_1": game[5],  # Extracted from JOIN
                "team_name_2": game[6],  # Extracted using a subquery
            }
            games_list.append(game_dict)
            print("######games list: ")
            print(games_list)

        return json.dumps(games_list)

    except Exception as ex:
        print(ex)
    finally:
        db.close()
