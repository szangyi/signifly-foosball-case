import sqlite3

# Helper function to calculate games won and lost for all teams
def calculate_all_teams_games_won_lost(db):
    try:
        cursor = db.cursor()
        print("###we get to the helper functino maaan")

        # Get all teams from the database
        cursor.execute("SELECT * FROM teams")
        teams = cursor.fetchall()

        for team in teams:
            print("#teamid:")
            team_id = team[0]
            print(team)
            print(team_id)

            cursor.execute("""
                SELECT COUNT(*) 
                FROM games 
                WHERE team_winner_id = ?
            """, (team_id,))
            games_won = cursor.fetchone()[0]
            games_points = int(games_won) * 3

            cursor.execute("""
                SELECT COUNT(*) 
                FROM games 
                WHERE team_loser_id = ?
            """, (team_id,))
            games_lost = cursor.fetchone()[0]


            # Update the teams table with games won and lost
            cursor.execute("""
                UPDATE teams 
                SET games_won = ?, 
                    games_lost = ?,
                    games_points = ? 
                WHERE id = ?
            """, (games_won, games_lost, games_points, team_id))
            db.commit()

    except Exception as ex:
        print(ex)

