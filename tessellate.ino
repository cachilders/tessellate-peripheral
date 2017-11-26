#include <HttpClient.h>
#include "application.h"

String message = "Photon Particle Prealpha";
String name;
String payload;

void setup() {
    byte mac[6];
    WiFi.macAddress(mac);
    name = String(mac[5], HEX) + ":" + 
           String(mac[4], HEX) + ":" + 
           String(mac[3], HEX) + ":" +
           String(mac[2], HEX) + ":" +
           String(mac[1], HEX) + ":" +
           String(mac[0], HEX);
              
    payload = "{\"name\":\"" + name + "\", \"message\":\"" + message + "\"}";
}

void loop() {
    delay(60000);
    
    HttpClient http;
    http_request_t request;
    http_response_t response;
    http_header_t headers[] = {
        { "Content-Type", "application/json" },
        { NULL, NULL }
    };
    
    request.hostname = "tessellate.cc";
    request.path = "/io/tessellate";
    request.port = 80;
    request.body = payload;

    http.post(request, response, headers);
    Spark.publish("log", response.body);
}
