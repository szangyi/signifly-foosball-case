from bottle import post, request, response
import sqlite3
import json

# Create a new team
@post("/api/team_create")
def _():
    try:
        # Get the new team data from the request JSON
        new_team_data = request.json
        print("##### new teaaaaam")
        print(new_team_data)  # Log the input data

        db = sqlite3.connect("./database/signifly-foosball.db", check_same_thread=False)
        print("##### connection succcesssful")


        # Insert the new team data into the database
        db.execute(
            """
            INSERT INTO teams (team_name, team_member_1, team_member_2)
            VALUES (?, ?, ?)
            """,
            (new_team_data["team_name"], new_team_data["team_member_1"], new_team_data["team_member_2"])
        )

        db.commit()

        # Return a success response
        return {"message": "Team created successfully"}

    except Exception as ex:
        # Handle exceptions and return an error response if needed
        response.status = 500
        return {"error": str(ex)}
    finally:
        db.close()
