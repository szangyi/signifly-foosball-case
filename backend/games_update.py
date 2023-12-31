from bottle import post, request, response
import sqlite3
import json
import database_helper_functions

# Update a multiple teams' data
@post("/api/games_update")
def _():
    try:
        db = sqlite3.connect("./database/signifly-foosball.db", check_same_thread=False)

        # Get the updated data from the request JSON
        updated_data_list = request.json
        print("######## updated data: ")
        print(updated_data_list)

        for updated_data in updated_data_list:
            game_id = updated_data.get("game_id")
            team_id_1 = updated_data.get("team_id_1")
            team_id_2 = updated_data.get("team_id_2")
            team_score_1 = updated_data.get("team_score_1")
            team_score_2 = updated_data.get("team_score_2")

            print(team_score_1)
            print(team_score_2)

            if team_score_1 != '' and team_score_2 != '':
                team_score_1 = int(team_score_1)
                team_score_2 = int(team_score_2)
                if team_score_1 > team_score_2:
                    team_winner_id = team_id_1
                    team_loser_id = team_id_2
                elif team_score_1 < team_score_2:
                    team_winner_id = team_id_2
                    team_loser_id = team_id_1
            else:
                team_winner_id = ''

            print("## team winner id")
            print(team_winner_id)
            cursor = db.cursor()

            # Update the database with the new data
            sql = """
                UPDATE games 
                SET team_id_1 = ?, 
                    team_id_2 = ?, 
                    team_score_1 = ?, 
                    team_score_2 = ?,
                    team_winner_id = ?,
                    team_loser_id = ?
                WHERE game_id = ?
                """

            
            var = (
                team_id_1,
                team_id_2,
                team_score_1,
                team_score_2,
                team_winner_id,
                team_loser_id,
                game_id
            )

            cursor.execute(sql, var)

            database_helper_functions.calculate_all_teams_games_won_lost(db)

            db.commit()

        # If the loop completes successfully, return success message
        return {"message": "Teams updated successfully"}
    
    except Exception as ex:
        # Handle exceptions and return an error response if needed
        response.status = 500
        return {"error": str(ex)}
    finally:
        db.close()



