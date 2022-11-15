package data

import (
	"math/rand"
	"time"
)

type message struct {
	Type string `json:"type"`
	Id   int    `json:"id"`
}

type Task struct {
	message
	Name        string    `json:"name"`
	Description string    `json:"description"`
	DueDate     time.Time `json:"dueDate"`
	Performer   string    `json:"performer"`
}

type Graph struct {
	message
	X     int `json:"x"`
	Y     int `json:"y"`
	Value int `json:"value"`
}

type Data struct {
	message
	Name  string `json:"name"`
	Value int    `json:"value"`
}

var taskNames = []string{
	"Task 1",
	"Another task",
	"Different task",
	"Do something",
	"Do something else",
	"Do something different",
	"Do something else different",
	"Get a job",
	"Get a life",
	"Get a haircut",
	"Get a new haircut",
	"Get a new job",
	"Get a new life",
	"Get a new car",
	"Get a new house",
}

var performers = []string{
	"Alice",
	"Bob",
	"Charlie",
	"Dave",
	"Eve",
	"Frank",
	"Grace",
	"Heidi",
	"Ivan",
	"Judy",
	"Karl",
	"Linda",
	"Mike",
	"Nancy",
}

var descriptions = []string{
	"Random description 1",
	"Another random description 2",
	"Some random description 3",
	"Yet another random description 4",
	"Random description 5",
	"Description about something random 6",
	"A long description about something random 7",
	"A short description about something random 8",
	"A very long description about something random 9",
	"A very short description about something random 10",
}

var cities = []string{
	"New York",
	"Los Angeles",
	"Chicago",
	"Houston",
	"Philadelphia",
	"Phoenix",
	"San Antonio",
	"San Diego",
	"Dallas",
	"San Jose",
	"Austin",
	"Jacksonville",
	"San Francisco",
}

func GetNextTask() Task {
	return Task{message{"task", rand.Int()},
		taskNames[rand.Intn(len(taskNames))],
		descriptions[rand.Intn(len(descriptions))],
		time.Now(),
		performers[rand.Intn(len(performers))]}
}

func GetNextGraph() Graph {
	return Graph{message{"graph", rand.Int()},
		rand.Int(),
		rand.Int(),
		rand.Int()}
}

func GetNextData() Data {
	return Data{message{"table", rand.Int()},
		cities[rand.Intn(len(cities))],
		rand.Int()}
}
