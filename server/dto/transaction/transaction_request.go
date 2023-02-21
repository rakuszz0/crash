package transactiondto

type RequestTransaction struct {
	StartTime   string `json:"start_time" gorm:"type: varchar(255)" validate:"required"`
	ArrivalTime string `json:"arrival_time" gorm:"type: varchar(255)" validate:"required"`
	TicketID    int    `json:"ticket_id" gorm:"type: int" validate:"required"`
	UserID      int    `json:"user_id" gorm:"type: int" validate:"required"`
	Total       int    `json:"total" gorm:"type: int" validate:"required"`
	Status      string `json:"status" gorm:"type: varchar(255)" validate:"required"`
	Qty         int    `json:"qty" form:"qty"`
	Attachment  string `json:"attachment" gorm:"type: varchar(255)"`
}
