package main

import (
	"Server/data"
	"Server/ws"
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net"
	"time"
)

func main() {
	server := ws.StartServer(func(remoteAddr net.Addr, message []byte) {
		fmt.Printf("Message from %s: %s\n", remoteAddr.String(), message)
	})

	for {
		var messageData interface{}
		switch rand.Intn(3) {
		case 0:
			messageData = data.GetNextGraph()
		case 1:
			messageData = data.GetNextTask()
		case 2:
			messageData = data.GetNextData()
		}

		message, err := json.Marshal(messageData)
		if err != nil {
			log.Fatalf("can't serialize ws message: %v", err)
		}

		server.WriteMessage(message)
		time.Sleep(time.Second * 1)
	}
}
