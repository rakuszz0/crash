package ticketdto

import (
	"time"
)

type TicketResponse struct {
	NameTrain            string    `json:"name_train" gorm:"type: varchar(255)"`
	TypeTrain            string    `json:"type_train" gorm:"type: varchat(255)"`
	StartDate            string    `json:"start_date" gorm:"type: varchar(255)"`
	StartStationID       int       `json:"start_station_id" form:"start_station_id"`
	StartTime            string    `json:"start_time" gorm:"type: varchar(255)"`
	DestinationStationID int       `json:"destination_station_id" form:"destination_station_id"`
	ArrivalTime          string    `json:"arrival_time" gorm:"type: varchar(255)"`
	ArrivalDate          string    `json:"arrival_Date" gorm:"type: varchar(255)"`
	Price                int       `json:"price" form:"price"`
	Qty                  int       `json:"qty" form:"qty"`
	CreatedAt            time.Time `json:"created_at"`
	UpdatedAt            time.Time `json:"updated_at"`
}
