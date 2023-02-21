import React from "react";
import { Card, Alert, Table, Button } from "flowbite-react"
import { API } from "../config/api"
import { useParams, useNavigate } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useContext } from 'react';
import qr from "../assets/qr.png";
import alert from "../assets/error 1.png";
import Moment from "react-moment";
import jwt from "jwt-decode";


export default function Payment() {
    let history = useNavigate();
    let navigate = useNavigate();
    // const [state, _] = useContext()
    const { id } = useParams();
    const getToken = localStorage.getItem("token");
    const decode = jwt(getToken);
    console.log(getToken)

    const { data: user } = useQuery('user', async () => {
        const response = await API.get('/user/' + decode.id);
        return response.data.data;
    });
    console.log("ini user", user)
    const dateTime = new Date()
    const { data: ticket } = useQuery('ticketCache', async () => {
        const response = await API.get('/ticket/' + id);
        return response.data.data;
    });
    console.log("tiket", ticket)



    const handleTransaction = useMutation(async () => {
        try {
            const response = await API.post("/transaction", {
                start_time: ticket.start_time,
                arrival_time: ticket.arrival_time,
                ticket_id: ticket.id,
                user_id: user.id,
                total: ticket.total,
                qty: ticket.qty,
                status: "Pending",

            });

            const tokenBaru = response.data.data.token;
            console.log(
                "habis add transaction tokennnnnn : ",
                response.data.data.token
            );

            window.snap.pay(tokenBaru, {
                onSuccess: function (result) {
                    /* You may add your own implementation here */
                    console.log(result);
                    history("/myticket");
                },
                onPending: function (result) {
                    /* You may add your own implementation here */
                    console.log(result);
                    history("/myticket");
                },
                onError: function (result) {
                    /* You may add your own implementation here */
                    console.log(result);
                    history("/myticket");
                },
                onClose: function () {
                    /* You may add your own implementation here */
                    alert("you closed the popup without finishing the payment");
                },
            });
        } catch (error) {
            console.log(error);
        }
    });

    // useEffect(() => {
    //     //change this to the script source you want to load, for example this is snap.js sandbox env
    //     const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //     //change this according to your client-key
    //     const myMidtransClientKey = "SB-Mid-client-cSoG5C-yKiBSkgTj";

    //     let scriptTag = document.createElement("script");
    //     scriptTag.src = midtransScriptUrl;
    //     // optional if you want to set script attribute
    //     // for example snap.js have data-client-key attribute
    //     scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    //     document.body.appendChild(scriptTag);
    //     return () => {
    //         document.body.removeChild(scriptTag);
    //     };
    // }, []);


    return (
        <>
            <div className="container mx-auto mt-4">
                <h2 className="font-bold text-3xl mb-4">Invoice</h2>
                <Card>
                    <div className="flex">
                        <div className="flex-[70%]">
                            <Card className="mb-5 bg-gray-400 flex">
                                <img className="w-10 h-10" src={alert} alt="" />
                                <h3 className="text-md font-medium text-black">
                                    PAY YOUR BILL
                                </h3>
                            </Card>
                            <div className="mb-5">
                                <Table>
                                    <Table.Head>
                                        <Table.HeadCell>No. Tanda Pengenal</Table.HeadCell>
                                        <Table.HeadCell>Nama Pemesanan</Table.HeadCell>
                                        <Table.HeadCell>No. Handphone</Table.HeadCell>
                                        <Table.HeadCell>EMail</Table.HeadCell>
                                    </Table.Head>
                                    <Table.Row>
                                        <Table.Cell>32984141157854</Table.Cell>
                                        <Table.Cell>{user?.fullname}</Table.Cell>
                                        <Table.Cell>{user?.phone}</Table.Cell>
                                        <Table.Cell>{user?.email}</Table.Cell>
                                    </Table.Row>
                                </Table>
                            </div>
                            <div>
                                <Card>
                                    <div className="flex justify-between">
                                        <h5 className="font-bold">{ticket?.name_train} (Dewasa) x1</h5>
                                        <span className="font-bold">Rp. {ticket?.price}</span>
                                    </div>
                                    <div className="flex justify-between bg-slate-200 p-2 rounded-md">
                                        <h5 className="font-semibold text-lg">Total</h5>
                                        <h5 className="font-extrabold">Rp. {ticket?.price}</h5>
                                    </div>
                                </Card>
                            </div>
                            <Button gradientDuoTone="pinkToOrange" className="w-full mt-3" onClick={() => handleTransaction.mutate()} >Pay Now</Button>
                            {/* onClick={() => handleTransaction.mutate()} */}
                        </div>
                        <div className="flex-[30%] ml-6">
                            <Card>
                                <div className="flex justify-between">
                                    <div>
                                        <h2 className="font-bold text-2xl">Kereta Api</h2>
                                        <h5 className="text-sm font-semibold">
                                            <Moment format="dddd" className="fw-bold">
                                                {dateTime}
                                            </Moment>
                                            , <Moment format="D MMM YYYY">{dateTime}</Moment>
                                        </h5>
                                    </div>
                                    <img src={qr} alt="" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{ticket?.name_train}</h3>
                                    <h6 className="text-sm">{ticket?.type_train}</h6>
                                </div>
                                <div className="flex justify-between">
                                    <div>
                                        <div className="mb-5">
                                            <h6 className="font-bold text-lg">{ticket?.start_time}</h6>
                                            <h6 className="text-sm">{ticket?.start_date}</h6>
                                        </div>
                                        <div>
                                            <h6 className="font-bold text-lg">{ticket?.arrival_time}</h6>
                                            <h6 className="text-sm">{ticket?.arrival_date}</h6>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mb-5">
                                            <h6 className="font-bold text-lg">Jakarta(GMR)</h6>
                                            <h6 className="text-sm">{ticket?.start_station.name}</h6>
                                        </div>
                                        <div>
                                            <h6 className="font-bold text-lg">Surabaya(SBY)</h6>
                                            <h6 className="text-sm">{ticket?.destination_station.name}</h6>
                                        </div>
                                    </div>

                                </div>
                            </Card>

                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
}