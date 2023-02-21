package models

type Station struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type StationResponse struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

func (Station) TableName() string {
	return "station"
}

func (StationResponse) TableName() string {
	return "station"
}
