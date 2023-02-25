import React, { useEffect } from "react";
import { Button, Card, Table } from "flowbite-react";
import { API } from "../config/api";
import { useMutation, useQuery } from "react-query";
import icon from "../assets/Vector 1.png";
import text from "../assets/white.png";
import train from "../assets/tacing.png"
import { Link } from 'react-router-dom';
import jwt from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Moment from "react-moment";
import { useParams } from "react-router-dom";

export default function MyTicket() {
    let history = useNavigate()
    const getToken = localStorage.getItem("token");
    const decode = jwt(getToken);
    // let { data: Invoice } = useQuery("invoice", async () => {
    //     const response = await API.get("/transaction-qty/" + id);
    // });
    const { id } = useParams();
    const dateTime = new Date()
    console.log(dateTime)
    const { data: ticket } = useQuery('ticketCache', async () => {
        const response = await API.get('/ticket/' + id);
        return response.data.data;
    });
    console.log("tiket", ticket)



    const { data: user } = useQuery('user', async () => {
        const response = await API.get('/user/' + decode.id);
        return response.data.data;
    });
    console.log("ini user", user)

    const handleTransaction = useMutation(async () => {
        try {
            const response = await API.post("/transaction", {
                start_time: ticket.start_time,
                arrival_time: ticket.arrival_time,
                ticket_id: ticket.id,
                user_id: user.id,
                total: ticket.price,
                qty: ticket.qty,
                status: "pending",

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
    useEffect(() => {
        //change this to the script source you want to load, for example this is snap.js sandbox env
        const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        //change this according to your client-key
        const myMidtransClientKey = "SB-Mid-client-cSoG5C-yKiBSkgTj";

        let scriptTag = document.createElement("script");
        scriptTag.src = midtransScriptUrl;
        // optional if you want to set script attribute
        // for example snap.js have data-client-key attribute
        scriptTag.setAttribute("data-client-key", myMidtransClientKey);

        document.body.appendChild(scriptTag);
        return () => {
            document.body.removeChild(scriptTag);
        };
    }, []);
    return (
        <>
            <div className="container mx-auto mt-10">
                <h3 className="font-bold text-xl mx-10 pl-12">My-Ticket</h3>
                <div className="mx-[90px] mt-7">
                    <Card>
                        <div className="flex">
                            <div className="flex-[80%]">
                                <div>
                                    <img src={icon} alt="" className="h-15" />
                                    <div className="flex relative top-[-2rem] ml-5 mt-1">
                                        <img className="h-5" src={text} alt="" />
                                        <img className="h-7" src={train} alt="" />
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div>
                                        <h3 className="font-bold text-lg">{ticket?.name_train}</h3>
                                        <h6 className="text-sm">{ticket?.type_train}</h6>
                                        <h6 className="bg-yellow-100 px-2 py-1 mt-2 text-center rounded-sm">Pending</h6>
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-lg">{ticket?.start_time}</h5>
                                        <h6 className="text-sm mb-3">{ticket?.start_date}</h6>
                                        <h5 className="font-bold text-lg">{ticket?.arrival_time}</h5>
                                        <h6 className="text-sm">{ticket?.arrival_date}</h6>
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-lg">{ticket?.start_city}</h5>
                                        <h6 className="text-sm mb-3">{ticket?.start_station.name}</h6>
                                        <h5 className="font-bold text-lg">{ticket?.destination_city}</h5>
                                        <h6 className="text-sm">{ticket?.destination_station.name}</h6>
                                    </div>
                                </div>
                                <Table className="mt-3">
                                    <Table.Head>
                                        <Table.HeadCell>No. Tanda Pengenal</Table.HeadCell>
                                        <Table.HeadCell>Nama Pemesan</Table.HeadCell>
                                        <Table.HeadCell>No. Handphone</Table.HeadCell>
                                        <Table.HeadCell>Email</Table.HeadCell>
                                    </Table.Head>
                                    <Table.Row>
                                        <Table.Cell>32984141157854</Table.Cell>
                                        <Table.Cell>{user?.fullname}</Table.Cell>
                                        <Table.Cell>{user?.phone}</Table.Cell>
                                        <Table.Cell>{user?.email}</Table.Cell>
                                    </Table.Row>
                                </Table>
                            </div>
                            <div className="flex-[20%] text-center">
                                <h3 className="font-bold text-lg">Kereta API</h3>
                                <h6 className="text-md font-semibold">
                                    <Moment format="dddd" className="fw-bold">
                                        {dateTime}
                                    </Moment>
                                    , <Moment format="D MMM YYYY">{dateTime}</Moment>
                                </h6>
                                <Link onClick={() => handleTransaction.mutate()}>
                                    <Button
                                        className="px-10 mt-36 mx-auto"
                                        outline={false}
                                        gradientDuoTone="pinkToOrange">
                                        Pay Now
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    )
}