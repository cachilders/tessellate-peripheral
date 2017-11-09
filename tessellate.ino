#include <ESP8266WiFi.h>
#include "credentials.h"
 
const char* ssid     = SSID;
const char* password = PASSWORD;
 
const char* host = "tessellatecore-env.hfeqqqyqqv.us-east-1.elasticbeanstalk.com";
 
void setup() {
  Serial.begin(115200);
  delay(100);
  
  WiFi.begin(ssid, password);
}
 
void loop() {
  delay(60000);

  Serial.println(host);
  
  // Use WiFiClient class to create TCP connections
  WiFiClient client;
  const int httpPort = 80;
  if (!client.connect(host, httpPort)) {
    Serial.println("connection failed");
    return;
  }
  
  byte mac[6];
  WiFi.macAddress(mac);
  String name = String(mac[5],HEX) + ":" + 
    String(mac[4],HEX) + ":" + 
    String(mac[3],HEX) + ":" +
    String(mac[2],HEX) + ":" +
    String(mac[1],HEX) + ":" +
    String(mac[0],HEX);
  String message = "NodeMCU Arduino Prealpha";
  String url = "/io/tessellate";
  String payload = "{\"name\":\" " + name + "\", \"message\":\" " + message + "\"}";
  
  // This will send the request to the server
  client.print(String("POST ") + url + " HTTP/1.1\r\n" +
    "Host: " + host + "\r\n" + 
    "Content-Type: application/json\r\n"
    "Accept: application/json\r\n"
    "Content-Length: " + payload.length() + "\r\n"
    "Connection: close\r\n\r\n" + 
    payload);
  delay(500);
}
