from bottle import post, request, response
import sqlite3
import json

# Update a single team's data
@post("/api/team_update")
def _():
    try:
      
        db = sqlite3.connect("./database/signifly-foosball.db", check_same_thread=False)

        # Get the updated data from the request JSON
        updated_data_list = request.json
        print(updated_data_list)

        for updated_data in updated_data_list:
            cursor = db.cursor()

            team_name = updated_data.get("1")
            team_member_1 = updated_data.get("2")
            team_member_2 = updated_data.get("3")
            id = updated_data.get("0")
            print("######print team name:")
            print(team_name)
            print(team_member_1)
            print(team_member_2)
            print(id)
            
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
            return {"message": "Team updated successfully"}
    
    except Exception as ex:
        # Handle exceptions and return an error response if needed
        response.status = 500
        return {"error": str(ex)}
    finally:
        db.close()
