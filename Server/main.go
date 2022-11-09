package main

import (
	"Server/ws"
	"fmt"
)

func main() {
	server := ws.StartServer(func(message []byte) {
		fmt.Println(string(message))
	})

	for {
		server.WriteMessage([]byte("Hello, world!"))
	}
}
