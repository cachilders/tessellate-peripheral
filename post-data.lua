local payload = {
  ['name'] = wifi.sta.getmac(),
  ['message'] = 'NodeMCU Lua Prealpha'
}

print('Sending', sjson.encode(payload))

timer=tmr.create()

timer:register(60000, tmr.ALARM_AUTO, function()
  http.post(
    'http://tessellatecore-env.hfeqqqyqqv.us-east-1.elasticbeanstalk.com/io/tessellate',
    'content-type: application/json\r\n',
    sjson.encode(payload),
    function(code, data)
      if (code < 0) then
        print('HTTP request failed')
      else
        print(code, data)
      end
    end
  )
end)

timer:start()
