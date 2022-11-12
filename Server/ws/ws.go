package ws

import (
	"github.com/gorilla/websocket"
	spaserver "github.com/roberthodgen/spa-server"
	"net/http"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type Server struct {
	clients       map[*websocket.Conn]bool
	handleMessage func(message []byte)
}

func StartServer(handleMessage func(message []byte)) *Server {
	server := Server{
		make(map[*websocket.Conn]bool),
		handleMessage,
	}

	http.HandleFunc("/ws", server.echo)
	http.Handle("/", spaserver.SpaHandler("../Client/public/", "index.html"))
	go http.ListenAndServe(":8080", nil)

	return &server
}

func (server *Server) echo(w http.ResponseWriter, r *http.Request) {
	connection, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		w.Write([]byte("The client is not using the websocket protocol: 'upgrade' token not found in 'Connection' header"))
		return
	}
	defer connection.Close()

	server.clients[connection] = true
	defer delete(server.clients, connection)

	for {
		mt, message, err := connection.ReadMessage()

		if err != nil || mt == websocket.CloseMessage {
			break
		}

		go server.handleMessage(message)
	}
}

func (server *Server) WriteMessage(message []byte) {
	for conn := range server.clients {
		conn.WriteMessage(websocket.TextMessage, message)
	}
}
