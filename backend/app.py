# from typing import Union
# from fastapi import FastAPI

# app = FastAPI()


# @app.get("/")
# def read_root():
#     return {"Hello": "World"}


# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: Union[str, None] = None):
#     return {"item_id": item_id, "q": q}



# import sqlite3
# db = sqlite3.connect("./database/signifly-foosball.db")

# # get the data from the db
# teams = db.execute("SELECT * FROM teams").fetchall()
# # print(teams)

# team_name= "saaaaaadan"
# team_member_1= "envagyok"
# team_member_2= "megint"

# try:
#     # db = sqlite3.connect("./database/signifly-foosball.db")
#     db.execute("INSERT INTO teams VALUES(?,?,?)",(team_name, team_member_1, team_member_2))
#     db.commit()
# except Exception as ex:
#     print(type(ex))
# finally:
#     db.close()


from bottle import Bottle, run, default_app, static_file, get, route


############### Features #####################
import teams_get_all
import teams_update
import team_create

import games_get_all
import game_create
import games_update



@route('/<:re:.*>', method='GET')
def react_app():
    return static_file('index.html', root='../frontend/public')


############### Run #####################
try:
  import production
  application = default_app()
except Exception as ex:
  print(ex)
  run(host="127.0.0.1", port=7878, debug=True, reloader=True, server="paste")