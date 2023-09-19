from bottle import post, request, response
import sqlite3
import json


# Update a multiple games' data
@post("/api/games_update")
def _():
    try:
        db = sqlite3.connect("./database/signifly-foosball.db", check_same_thread=False)

        # Get the updated data from the request JSON
        updated_data_list = request.json
        print("######## updated data: ")
        print(updated_data_list)

        for updated_data in updated_data_list:
            print(updated_data)
            game_id = updated_data.get("game_id")
            cursor = db.cursor()

            # Initialize the SQL and parameters lists
            sql = ["UPDATE games SET"]
            var = []

            # Check if each column exists in updated_data and add it to the SQL statement
            if "team_id_1" in updated_data:
                sql.append("team_id_1 = ?,")
                var.append(updated_data.get("team_id_1"))
            
            if "team_id_2" in updated_data:
                sql.append("team_id_2 = ?,")
                var.append(updated_data.get("team_id_2"))
            
            if "team_score_1" in updated_data:
                sql.append("team_score_1 = ?,")
                var.append(updated_data.get("team_score_1"))
            
            if "team_score_2" in updated_data:
                sql.append("team_score_2 = ?,")
                var.append(updated_data.get("team_score_2"))

            # Remove the trailing comma from the last field assignment
            sql[-1] = sql[-1].rstrip(",")

            # Add the WHERE clause
            sql.append("WHERE game_id = ?")
            var.append(game_id)

            # Join the SQL parts into a single string
            sql_query = " ".join(sql)

            # Execute the SQL query
            cursor.execute(sql_query, tuple(var))
            db.commit()

        # If the loop completes successfully, return success message
        return {"message": "Teams updated successfully"}
    
    except Exception as ex:
        # Handle exceptions and return an error response if needed
        response.status = 500
        return {"error": str(ex)}
    finally:
        db.close()
