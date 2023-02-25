package handlers

import (
	"encoding/json"
	"net/http"
	dto "server/dto/result"
	ticketdto "server/dto/ticket"
	"server/models"
	"server/repositories"
	"strconv"
	"time"

	"github.com/go-playground/validator"
	"github.com/golang-jwt/jwt/v4"
	"github.com/gorilla/mux"
)

type handlerTicket struct {
	TicketRepository repositories.TicketRepository
}

func HandlerTicket(ticketRepository repositories.TicketRepository) *handlerTicket {
	return &handlerTicket{ticketRepository}
}

func (h *handlerTicket) FindTicket(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	tickets, err := h.TicketRepository.FindTicket()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: tickets}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerTicket) GetTicket(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	ticket, err := h.TicketRepository.GetTicket(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: ticket}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerTicket) AddTicket(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	userId := int(userInfo["id"].(float64))

	// request := new(ticketdto.TicketRequest)
	// err := json.NewDecoder(r.Body).Decode(request)
	// if err != nil {
	// 	w.WriteHeader(http.StatusBadRequest)
	// 	response := dto.ErrorResult{Code: http.StatusNotFound, Message: err.Error()}
	// 	json.NewEncoder(w).Encode(response)
	// 	return
	// }
	start_station_id, _ := strconv.Atoi(r.FormValue("start_station_id"))
	destination_station_id, _ := strconv.Atoi(r.FormValue("destination_station_id"))
	price, _ := strconv.Atoi(r.FormValue("price"))
	qty, _ := strconv.Atoi(r.FormValue("qty"))
	request := ticketdto.TicketRequest{
		NameTrain:            r.FormValue("name_train"),
		TypeTrain:            r.FormValue("type_train"),
		StartDate:            r.FormValue("start_date"),
		StartTime:            r.FormValue("start_time"),
		StartCity:            r.FormValue("start_city"),
		DestinationCity:      r.FormValue("destination_city"),
		ArrivalTime:          r.FormValue("arrival_time"),
		ArrivalDate:          r.FormValue("arrival_date"),
		StartStationID:       start_station_id,
		DestinationStationID: destination_station_id,
		Price:                price,
		Qty:                  qty,
	}

	Field := models.Ticket{
		ID:                   userId,
		NameTrain:            request.NameTrain,
		TypeTrain:            request.TypeTrain,
		StartStationID:       request.StartStationID,
		StartStation:         models.StationResponse{},
		StartDate:            request.StartDate,
		StartCity:            request.StartCity,
		StartTime:            request.StartTime,
		ArrivalTime:          request.ArrivalTime,
		ArrivalDate:          request.ArrivalDate,
		DestinationCity:      request.DestinationCity,
		DestinationStation:   models.StationResponse{},
		DestinationStationID: request.DestinationStationID,
		Price:                request.Price,
		Qty:                  request.Qty,
		UserID:               userId,
		CreatedAt:            time.Time{},
		UpdatedAt:            time.Time{},
	}

	newTicket, err := h.TicketRepository.AddTicket(Field)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	TicketResponse := models.TicketResponse{
		ID:                   userId,
		NameTrain:            newTicket.NameTrain,
		TypeTrain:            newTicket.TypeTrain,
		StartStation:         newTicket.StartStation,
		StartStationID:       newTicket.StartStationID,
		StartDate:            newTicket.StartDate,
		StartTime:            newTicket.StartTime,
		ArrivalTime:          newTicket.ArrivalTime,
		ArrivalDate:          newTicket.ArrivalDate,
		StartCity:            newTicket.StartCity,
		DestinationCity:      newTicket.DestinationCity,
		DestinationStation:   newTicket.DestinationStation,
		DestinationStationID: newTicket.DestinationStationID,
		Price:                newTicket.Price,
		Qty:                  newTicket.Qty,
		UserID:               newTicket.UserID,
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: TicketResponse}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerTicket) FindFilter(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	request := new(ticketdto.FilterRequest)
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: "Cek Dto Request"}
		json.NewEncoder(w).Encode(response)
		return
	}

	start, err := h.TicketRepository.FilterStation(request.StartStationID)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: "Cek Kota Asal"}
		json.NewEncoder(w).Encode(response)
		return
	}

	destination, err := h.TicketRepository.FilterStation(request.DestinationStationID)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: "Cek Kota Asal"}
		json.NewEncoder(w).Encode(response)
		return
	}

	ticket, err := h.TicketRepository.FilterTicket(start.ID, destination.ID, request.StartDate)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: "Cek Data Tiket"}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: ticket}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerTicket) CreateTransactionQtyTicket(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	request := new(ticketdto.TransTicket)
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: "Cek Dto Request"}
		json.NewEncoder(w).Encode(response)
		return
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	tiket, err := h.TicketRepository.GetTicket(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	AllTotal := tiket.Price * request.Qty

	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	userId := int(userInfo["id"].(float64))

	transID := int(time.Now().Unix())

	requestTransactionTicket := models.Transaction{
		ID:       transID,
		TicketID: tiket.ID,
		UserID:   userId,
		Total:    AllTotal,
		Qty:      request.Qty,
		Status:   "pending",
	}

	MyTicketQty, err := h.TicketRepository.CreateTransactionQty(requestTransactionTicket)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: "Cannot add Qty"}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: MyTicketQty}
	json.NewEncoder(w).Encode(response)
}
