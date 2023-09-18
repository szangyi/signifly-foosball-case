from bottle import post, request, response
import sqlite3
import json

# Update a multiple teams' data
@post("/api/teams_update")
def _():
    try:
        db = sqlite3.connect("./database/signifly-foosball.db", check_same_thread=False)

        # Get the updated data from the request JSON
        updated_data_list = request.json
        print("######## updated data: ")
        print(updated_data_list)

        for updated_data in updated_data_list:
            print(updated_data)
            id = updated_data.get("id")
            team_name = updated_data.get("team_name")
            team_member_1 = updated_data.get("team_member_1")
            team_member_2 = updated_data.get("team_member_2")
            cursor = db.cursor()

            # Update the database with the new data
            sql = """
                UPDATE teams 
                SET team_name = ?, 
                    team_member_1 = ?, 
                    team_member_2 = ? 
                WHERE id = ?
                """
            
            var = (
                team_name,
                team_member_1,
                team_member_2,
                id
            )

            cursor.execute(sql, var)
            db.commit()

        # If the loop completes successfully, return success message
        return {"message": "Teams updated successfully"}
    
    except Exception as ex:
        # Handle exceptions and return an error response if needed
        response.status = 500
        return {"error": str(ex)}
    finally:
        db.close()
