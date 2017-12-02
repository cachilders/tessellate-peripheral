local payload = {
  ['name'] = wifi.sta.getmac(),
  ['message'] = 'NodeMCU Lua Prealpha'
}

print('Broadcasting', sjson.encode(payload))

if not timer then
  timer=tmr.create()

  timer:register(60000, tmr.ALARM_AUTO, function()
    http.post(
      'http://tessellate.cc/io/tessellate',
      'accept: application/json\r\n'..'content-type: application/json\r\n',
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
end
