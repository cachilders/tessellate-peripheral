package main

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"net"
	"net/http"
	"time"
)

var message = "Golang Prealpha"

func getMacAddr() (addr string) {
	// Via: https://gist.github.com/rucuriousyet/ab2ab3dc1a339de612e162512be39283
	interfaces, err := net.Interfaces()
	if err == nil {
		for _, i := range interfaces {
			if i.Flags&net.FlagUp != 0 && bytes.Compare(i.HardwareAddr, nil) != 0 {
				addr = i.HardwareAddr.String()
				break
			}
		}
	}
	return
}

func postData() {
	url := "http://tessellate.cc/io/tessellate"
	var name = getMacAddr()
	var payload = []byte("{\"name\": \"" + name + "\", \"message\": \"" + message + "\"}")
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(payload))
	req.Header.Set("Content-Type", "application/json")
	client := &http.Client{}

	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)
	fmt.Println(string(body))
}

func main() {
	ticker := time.NewTicker(time.Second * 60)
	for {
		postData()
		<-ticker.C
	}
}
