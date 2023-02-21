package transactiondto

type ResponseTransaction struct {
	ID          int    `json:"id"`
	StartTime   string `json:"start_time" gorm:"type: varchar(255)"`
	ArrivalTime string `json:"arrival_time" gorm:"type: varchar(255)"`
	TicketID    int    `json:"ticket_id" gorm:"type: int"`
	UserID      int    `json:"user_id" gorm:"type: int"`
	Total       int    `json:"total" gorm:"type: int"`
	Qty         int    `json:"qty" form:"qty"`
	Status      string `json:"status" gorm:"type: varchar(255)"`
	Attachment  string `json:"attachment" gorm:"type: varchar(255)"`
}
