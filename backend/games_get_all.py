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
                   teams1.team_name AS team_name_1, teams1.team_member_1 AS team_member_1_1, teams1.team_member_2 AS team_member_2_1,
                   teams2.team_name AS team_name_2, teams2.team_member_1 AS team_member_1_2, teams2.team_member_2 AS team_member_2_2
            FROM games
            LEFT JOIN teams AS teams1 ON games.team_id_1 = teams1.id
            LEFT JOIN teams AS teams2 ON games.team_id_2 = teams2.id
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
                "team_1_member_1": game[6],  # Extracted from JOIN
                "team_1_member_2": game[7],  # Extracted from JOIN
                "team_name_2": game[8],  # Extracted from JOIN
                "team_2_member_1": game[9],  # Extracted from JOIN
                "team_2_member_2": game[10],  # Extracted from JOIN
            }
            games_list.append(game_dict)
            print("######games list: ")
            print(games_list)

        return json.dumps(games_list)

    except Exception as ex:
        print(ex)
    finally:
        db.close()
