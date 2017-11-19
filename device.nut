function setInterval () {
    local name = imp.net.info().interface[0].macaddress;
    // Sensor data, etc.
    agent.send("post", name);
    imp.wakeup(60, setInterval); 
}

setInterval();
