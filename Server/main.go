package main

import (
	"Server/data"
	"Server/ws"
	"encoding/json"
	"fmt"
	"math/rand"
	"time"
)

func main() {
	server := ws.StartServer(func(message []byte) {
		fmt.Println(string(message))
	})

	for {
		var message []byte
		switch rand.Intn(3) {
		case 0:
			message, _ = json.Marshal(data.GetNextGraph())
		case 1:
			message, _ = json.Marshal(data.GetNextTask())
		case 2:
			message, _ = json.Marshal(data.GetNextData())
		}
		server.WriteMessage(message)
		time.Sleep(time.Second * 1)
	}
}
