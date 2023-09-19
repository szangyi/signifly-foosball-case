from bottle import post, request, response
import sqlite3
import json

# Helper function to calculate games won and lost
def calculate_games_won_lost(cursor, team_id):
    # Calculate games won
    cursor.execute("""
        SELECT COUNT(*) 
        FROM games 
        WHERE team_winner_id = ?
    """, (team_id,))
    games_won = cursor.fetchone()[0]
    print("#games won id:")
    print(team_id)
    print("#games won:")
    print(games_won)

    # Calculate games lost
    cursor.execute("""
        SELECT COUNT(*) 
        FROM games 
        WHERE team_loser_id = ?
    """, (team_id,))
    games_lost = cursor.fetchone()[0]
    print("#games lost id:")
    print(team_id)
    print("#games lost:")
    print(games_lost)

    return games_won, games_lost

# Update a multiple teams' data
@post("/api/games_update")
def _():
    try:
        db = sqlite3.connect("./database/signifly-foosball.db", check_same_thread=False)
        cursor = db.cursor()

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

            print("## team_id_1:")
            print(team_id_1)
            print("## team_id_2:")
            print(team_id_2)

            if team_score_1 != '':
                team_score_1 = int(team_score_1)

            if team_score_2 != '':
                team_score_2 = int(team_score_2)

            if team_score_1 != '' and team_score_2 != '':
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
            db.commit()

            if team_id_1:
                games_won, games_lost = calculate_games_won_lost(cursor, team_id_1)
                cursor.execute("""
                    UPDATE teams 
                    SET games_won = ?, 
                        games_lost = ? 
                    WHERE team_id = ?
                """, (games_won, games_lost, team_id_1))

            if team_id_2:
                games_won, games_lost = calculate_games_won_lost(cursor, team_id_2)
                cursor.execute("""
                    UPDATE teams 
                    SET games_won = ?, 
                        games_lost = ? 
                    WHERE team_id = ?
                """, (games_won, games_lost, team_id_2))
                
            db.commit()

        # If the loop completes successfully, return success message
        return {"message": "Teams and games updated successfully"}
    
    except Exception as ex:
        # Handle exceptions and return an error response if needed
        response.status = 500
        return {"error": str(ex)}
    finally:
        db.close()
