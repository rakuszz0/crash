package models

import "time"

type Ticket struct {
	ID                   int             `json:"id"`
	NameTrain            string          `json:"name_train" gorm:"type: varchar(255)"`
	TypeTrain            string          `json:"type_train" gorm:"type: varchar(255)"`
	StartStationID       int             `json:"start_station_id" form:"start_station_id" gorm:"start_station_id"`
	StartStation         StationResponse `json:"start_station"`
	StartDate            string          `json:"start_date" gorm:"type: varchar(255)"`
	StartCity            string          `json:"start_city" gorm:"type: varchar(255)"`
	StartTime            string          `json:"start_time" gorm:"type: varchar(255)"`
	ArrivalTime          string          `json:"arrival_time" gorm:"type: varchar(255)"`
	ArrivalDate          string          `json:"arrival_date" gorm:"type: varchar(255)"`
	DestinationCity      string          `json:"destination_city" gorm:"type: varchar(255)"`
	DestinationStation   StationResponse `json:"destination_station" `
	DestinationStationID int             `json:"destination_station_id" form:"destination_station_id" gorm:"destination_station_id"`
	Price                int             `json:"price" form:"price"`
	Qty                  int             `json:"qty" form:"qty"`
	UserID               int             `json:"user_id"`
	// User                 UserResponse    `json:"user"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}

type TicketResponse struct {
	ID                   int             `json:"id"`
	NameTrain            string          `json:"name_train"`
	TypeTrain            string          `json:"type_train"`
	StartStation         StationResponse `json:"start_station"`
	StartStationID       int             `json:"start_station_id"`
	StartDate            string          `json:"start_date"`
	StartTime            string          `json:"start_time"`
	ArrivalTime          string          `json:"arrival_time"`
	ArrivalDate          string          `json:"arrival_date"`
	StartCity            string          `json:"start_city"`
	DestinationCity      string          `json:"destination_city"`
	DestinationStation   StationResponse `json:"destination_station"`
	DestinationStationID int             `json:"destination_station_id"`
	Price                int             `json:"price"`
	Qty                  int             `json:"qty"`
	UserID               int             `json:"user_id"`
	// User                 UserResponse    `json:"user"`
}

type TicketUserResponse struct {
	ID        int    `json:"id"`
	Fullname  string `json:"fullname"`
	StationID int    `json:"station_id"`
	Price     int    `json:"price"`
	Qty       int    `json:"qty"`
}

func (Ticket) TableName() string {
	return "ticket"
}

func (TicketResponse) TableName() string {
	return "ticket"
}

func (TicketUserResponse) TableName() string {
	return "ticket"
}
