package main

import (
	"Server/ws"
	"fmt"
	"time"
)

func main() {
	server := ws.StartServer(func(message []byte) {
		fmt.Println(string(message))
	})

	for {
		server.WriteMessage([]byte("{\"type\":\"message\",\"data\":\"Hello\"}"))
		time.Sleep(time.Second * 10)
	}
}
