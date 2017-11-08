import json
from uuid import getnode as get_mac
import threading
import requests

def set_interval(func, secs):
  def enclose():
    set_interval(func, secs)
    func()
  t = threading.Timer(secs, enclose)
  t.start()
  return t

MAC = hex(get_mac())
NAME = ':'.join([MAC[i:i+2] for i in range(0, len(MAC), 2)][1:7])
URL = 'http://tessellatecore-env.hfeqqqyqqv.us-east-1.elasticbeanstalk.com/io/tessellate'
PAYLOAD = json.dumps({'name': NAME, 'message': 'Python Prealpha'})
HEADERS = {'content-type': 'application/json; charset=utf-8', 'content-length': str(len(PAYLOAD))}

def broadcast():
  req = requests.post(url=URL, headers=HEADERS, data = PAYLOAD)
  res = req.text
  print(res)

interval = set_interval(broadcast, 60)
