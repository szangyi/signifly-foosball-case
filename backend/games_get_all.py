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
            SELECT *
            FROM games
            LEFT JOIN teams AS teams1 ON games.team_id_1 = teams1.id
            LEFT JOIN teams AS teams2 ON games.team_id_2 = teams2.id
        """)

        games = cursor.fetchall()
        print("## all games")
        print(games)

        # Convert the games to a list of dictionaries
        games_list = []
        for game in games:
            game_dict = {
                "game_id": game[0],
                "team_id_1": game[1],
                "team_id_2": game[2],
                "team_score_1": game[3],
                "team_score_2": game[4],
                "team_winner_id": game[5],  # Extracted from JOIN
                "team_loser_id": game[6],  # Extracted from JOIN
                "team_name_1": game[8],  # Extracted from JOIN
                "team_1_member_1": game[9],  # Extracted from JOIN
                "team_1_member_2": game[10],  # Extracted from JOIN
                "team_1_games_won": game[11],
                "team_1_games_lost": game[12],
                "team_1_games_points": game[13],
                "team_name_2": game[15], # Extracted from JOIN
                "team_2_member_1": game[16],  # Extracted from JOIN
                "team_2_member_2": game[17],  # Extracted from JOIN
                "team_2_games_won": game[18],
                "team_2_games_lost": game[19],
                "team_2_games_points": game[20],
            }

            games_list.append(game_dict)
            print("######games list: ")
            print(games_list)

        return json.dumps(games_list)

    except Exception as ex:
        print(ex)
    finally:
        db.close()
