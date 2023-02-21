package stationdto

type StationRequest struct {
	Name string `json:"name" form:"name" gorm:"type: varchar(255)"`
}
