package models

import "time"

type Transaction struct {
	ID          int            `json:"id" gorm:"primary_key:auto_increment"`
	UserID      int            `json:"user_id" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	ArrivalTime string         `json:"arrival_time" gorm:"type: varchar(255)"`
	StartTime   string         `json:"start_time"  form:"start_time" gorm:"type: varchar(255)"`
	User        UserResponse   `json:"user"`
	TicketID    int            `json:"ticket_id" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Ticket      TicketResponse `json:"ticket"`
	Total       int            `json:"total" form:"total" gorm:"type: varchar(255)"`
	Qty         int            `json:"qty" form:"qty" gorm:"type: varchar(255)"`
	Status      string         `json:"status" gorm:"type: varchar(255)"`
	CreatedAt   time.Time      `json:"-"`
	UpdatedAt   time.Time      `json:"-"`
}
