/*
WiFi connection code derived from https://github.com/bportaluri/WiFiEsp/blob/master/examples/WebClient/WebClient.ino
*/

#include <WiFiEsp.h>
#include "credentials.h"

#ifndef HAVE_HWSERIAL1
#include "SoftwareSerial.h"
SoftwareSerial Serial1(6, 7); // RX, TX
#endif
 
const char ssid[] = SSID;
const char pass[] = PASSWORD;

int status = WL_IDLE_STATUS;

const char* server = "tessellate.cc";

WiFiEspClient client;
 
void setup() {
  // initialize serial for debugging
  Serial.begin(115200);
  // initialize serial for ESP module
  Serial1.begin(9600);
  // initialize ESP module
  WiFi.init(&Serial1);

  // check for the presence of the shield
  if (WiFi.status() == WL_NO_SHIELD) {
    Serial.println("WiFi shield not present");
    // don't continue
    while (true);
  }

  // attempt to connect to WiFi network
  while ( status != WL_CONNECTED) {
    Serial.print("Attempting to connect.");
    status = WiFi.begin(ssid, pass);
  }
}
 
void loop() {
  delay(60000);

  Serial.println(server);

  if (!client.connect(server, 80)) {
    Serial.println("connection failed");
    return;
  }
  
  byte mac[6];
  WiFi.macAddress(mac);
  String name = String(mac[5], HEX) + ":" + 
                String(mac[4], HEX) + ":" + 
                String(mac[3], HEX) + ":" +
                String(mac[2], HEX) + ":" +
                String(mac[1], HEX) + ":" +
                String(mac[0], HEX);
  String message = "ESP8266 Arduino Prealpha";
  String url = "/io/tessellate";
  String payload = "{\"name\":\" " + name + "\", \"message\":\" " + message + "\"}";
  
  // This will send the request to the server
  client.print(String("POST ") + url + " HTTP/1.1\r\n" +
    "Host: " + server + "\r\n" + 
    "Content-Type: application/json\r\n"
    "Accept: application/json\r\n"
    "Content-Length: " + payload.length() + "\r\n"
    "Connection: close\r\n\r\n" + 
    payload);
  delay(500);
}
