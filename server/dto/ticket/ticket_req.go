package ticketdto

import "server/models"

type TicketRequest struct {
	NameTrain            string         `json:"name_train" form:"name_train" gorm:"type: varchar(255)"`
	TypeTrain            string         `json:"type_train" form:"type_train" gorm:"type: varchat(255)"`
	StartDate            string         `json:"start_date" form:"start_date" gorm:"type: varchar(255)"`
	StartCity            string         `json:"start_city" form:"start_city" gorm:"type: varchar(255)"`
	StartStationID       int            `json:"start_station_id" form:"start_station_id"`
	StartStation         models.Station `json:"start_station"`
	StartTime            string         `json:"start_time" form:"start_time" gorm:"type: varchar(255)"`
	DestinationCity      string         `json:"destination_city" form:"destination_city" gorm:"type: varchar(255)"`
	DestinationStationID int            `json:"destination_station_id" form:"destination_station_id"`
	ArrivalTime          string         `json:"arrival_time" form:"arrival_time" gorm:"type: varchar(255)"`
	ArrivalDate          string         `json:"arrival_date" form:"arrival_date" gorm:"type: varchar(255)"`
	Price                int            `json:"price" form:"price"`
	Qty                  int            `json:"qty" form:"qty"`
}

type FilterRequest struct {
	StartDate            string `json:"start_date" form:"start_date"`
	StartStationID       int    `json:"start_station_id" form:"start_station_id"`
	DestinationStationID int    `json:"destination_station_id" form:"destination_station_id"`
}

type TransTicket struct {
	Qty int `json:"qty" form:"qty"`
}
