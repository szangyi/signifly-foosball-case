from bottle import post, request, response
import sqlite3
import json

# Create a new team
@post("/api/game_create")
def _():
    try:
        # Get the new team data from the request JSON
        new_game_data = request.json
        print("##### new game")
        print(new_game_data)  # Log the input data

        db = sqlite3.connect("./database/signifly-foosball.db", check_same_thread=False)
        print("##### connection succcesssful")


        # Insert the new team data into the database
        db.execute(
            """
            INSERT INTO games (team_id_1, team_id_2)
            VALUES (?, ?)
            """,
            (new_game_data["team_id_1"], new_game_data["team_id_2"])
        )

        db.commit()

        # Return a success response
        return {"message": "Game created successfully"}

    except Exception as ex:
        # Handle exceptions and return an error response if needed
        response.status = 500
        return {"error": str(ex)}
    finally:
        db.close()
