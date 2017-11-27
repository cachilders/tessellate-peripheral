#include <AZ3166WiFi.h>
#include <OledDisplay.h>
#include "credentials.h"

int GREEN_PWM_PIN_PB3 = 19; 

char ssid[] = SSID;
char pass[] = PASSWORD;

int status = WL_IDLE_STATUS;

char host[] = "tessellate.cc";
 
void setup() {
  analogWrite(GREEN_PWM_PIN_PB3, 0);

  Serial.begin(115200);

  // check for the presence of the shield
  if (WiFi.status() == WL_NO_SHIELD) {
    // this should be impossible; most likely boilerplate
    Screen.print("WiFi shield not present");
    while (true);
  }

  // attempt to connect to WiFi network
  while ( status != WL_CONNECTED) {
    Screen.print(ssid);
    status = WiFi.begin(ssid, pass);
    delay(10000);
  }
}
 
void loop() {
  delay(60000);

  WiFiClient client;

  const int httpPort = 80;

  if (!client.connect(host, httpPort)) {
    Screen.print("something\nwent wrong");
    return;
  }

  Screen.print(host);
  
  byte mac[6];
  WiFi.macAddress(mac);
  String name = String(mac[5], HEX) + ":" + 
                String(mac[4], HEX) + ":" + 
                String(mac[3], HEX) + ":" +
                String(mac[2], HEX) + ":" +
                String(mac[1], HEX) + ":" +
                String(mac[0], HEX);
  String message = "MXChip AZ3166 Arduino Prealpha";
  String url = "/io/tessellate";
  String payload = "{\"name\":\" " + name + "\", \"message\":\" " + message + "\"}";
  
  analogWrite(GREEN_PWM_PIN_PB3, 20);
  client.print(String("POST ") + url + " HTTP/1.1\r\n" +
    "Host: " + host + "\r\n" + 
    "Content-Type: application/json\r\n"
    "Accept: application/json\r\n"
    "Content-Length: " + payload.length() + "\r\n"
    "Connection: close\r\n\r\n" + 
    payload);
    analogWrite(GREEN_PWM_PIN_PB3, 0);
  delay(500);
}
