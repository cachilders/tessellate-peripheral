"""Let's broadcast to AWS"""
import requests
import json
from uuid import getnode as get_mac

MA = hex(get_mac())
MAC = ':'.join([MA[i:i+2] for i in range(0, len(MA), 2)][1:])
URL = 'http://tessellatecore-env.hfeqqqyqqv.us-east-1.elasticbeanstalk.com/io/tessellate'
PAYLOAD = json.dumps({'name': MAC, 'message': 'Python Prealpha'})
HEADERS = {'content-type': 'application/json; charset=utf-8', 'content-length': len(PAYLOAD)}

req = requests.post(url=URL, headers=HEADERS, data = PAYLOAD)
res = req.text

print(res)
