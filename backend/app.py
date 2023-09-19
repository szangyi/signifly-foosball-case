

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
    # Development:
    # return static_file('index.html', root='../frontend/public')
    # Production:
    return static_file('index.html', root='/home/szangyi/signifly-foosball/signifly-foosball-case/frontend/build')


############### Run #####################
try:
  import production
  application = default_app()
except Exception as ex:
  print(ex)
  run(host="127.0.0.1", port=7878, debug=True, reloader=True, server="paste")