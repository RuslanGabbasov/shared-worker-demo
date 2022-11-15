package ws

import (
	"github.com/gorilla/websocket"
	"sync"
)

type connectionStore struct {
	connections map[*websocket.Conn]interface{}
	mux         sync.RWMutex
}

func newConnectionStore() *connectionStore {
	return &connectionStore{
		connections: make(map[*websocket.Conn]interface{}),
	}
}

func (s *connectionStore) Add(c *websocket.Conn) {
	s.mux.Lock()
	defer s.mux.Unlock()

	s.connections[c] = nil
}

func (s *connectionStore) Remove(c *websocket.Conn) {
	s.mux.Lock()
	defer s.mux.Unlock()

	delete(s.connections, c)
}

func (s *connectionStore) ForEach(h func(*websocket.Conn)) {
	s.mux.RLock()
	defer s.mux.RUnlock()

	for c := range s.connections {
		go h(c)
	}
}
