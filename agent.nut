url <- "http://tessellatecore-env.hfeqqqyqqv.us-east-1.elasticbeanstalk.com/io/tessellate"
name <- "";

function postTile (mac) {
  if (name.len() == 0)
    name = mac.slice(0, 2) + ":" + mac.slice(2, 4) + ":" + mac.slice(4, 6) + ":" + mac.slice(6, 8) + ":" + mac.slice(8, 10) + ":" + mac.slice(10, 12);
  local message = "Electric Imp Prealpha"
  local payload = http.jsonencode({"name": name, "message": message})
  local headers = { "Content-Type": "application/json",
    "Accept": "application/json",
    "Content-Length": payload.len().tostring()
  };
  local request = http.post(url, headers, payload);
  local response = request.sendsync();
  server.log("SERVER RESPONSE " + http.jsonencode(response));
}

device.on("post", postTile);
