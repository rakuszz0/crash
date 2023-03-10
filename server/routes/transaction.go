package routes

import (
	"server/handlers"
	"server/pkg/middleware"
	"server/pkg/mysql"
	"server/repositories"

	"github.com/gorilla/mux"
)

func TransactionRoutes(r *mux.Router) {
	transactionRepository := repositories.RepositoryTransaction(mysql.DB)
	h := handlers.HandlerTransaction(transactionRepository)

	r.HandleFunc("/transactions", h.FindTransactions).Methods("GET")
	r.HandleFunc("/transaction/{id}", middleware.Auth(h.GetTransaction)).Methods("GET")
	r.HandleFunc("/transaction", h.CreateTransaction).Methods("POST")
	r.HandleFunc("/transaction/{id}", middleware.Auth(h.DeleteTransaction)).Methods("DELETE")
	r.HandleFunc("/notification", h.Notification).Methods("POST")

}
