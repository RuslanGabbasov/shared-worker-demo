package ws

import (
	"github.com/gorilla/websocket"
	spaserver "github.com/roberthodgen/spa-server"
	"log"
	"net"
	"net/http"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type Server struct {
	connections   *connectionStore
	handleMessage func(from net.Addr, message []byte)
}

func StartServer(handleMessage func(from net.Addr, message []byte)) *Server {
	server := Server{
		newConnectionStore(),
		handleMessage,
	}

	http.HandleFunc("/ws", server.echo)
	http.Handle("/", spaserver.SpaHandler("../Client/public/", "index.html"))
	go func() {
		err := http.ListenAndServe(":3000", nil)
		if err != nil {
			log.Fatalf("can't start server: %v", err)
		}
	}()

	return &server
}

func (server *Server) echo(w http.ResponseWriter, r *http.Request) {
	connection, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		_, _ = w.Write([]byte("The client is not using the websocket protocol: 'upgrade' token not found in 'Connection' header"))
		return
	}

	go func() {
		defer connection.Close()

		server.connections.Add(connection)
		defer server.connections.Remove(connection)

		for {
			mt, message, err := connection.ReadMessage()

			if err != nil || mt == websocket.CloseMessage {
				break
			}

			go server.handleMessage(connection.RemoteAddr(), message)
		}
	}()
}

func (server *Server) WriteMessage(message []byte) {
	server.connections.ForEach(func(conn *websocket.Conn) {
		err := conn.WriteMessage(websocket.TextMessage, message)
		if err != nil {
			log.Printf("ERROR can't write message to a client %s: %v", conn.RemoteAddr().String(), err)
		}
	})
}
