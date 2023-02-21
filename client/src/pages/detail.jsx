import React from "react";
import { Button, Card, Modal, Table } from "flowbite-react"
import { Dialog } from "@headlessui/react";
import { API } from "../config/api";
import { useQuery } from "react-query";
import icon from "../assets/Vector 1.png";
import text from "../assets/white.png";
import train from "../assets/tacing.png"
import qr from "../assets/woyy.png";

export default function ModalDetailTicket({ show, setShow }) {
    // const { id } = useParams();
    const dateTime = new Date()
    console.log(dateTime)
    let { data: ticktrans } = useQuery('ticktransCache', async () => {
        const response = await API.get('/transactions');
        return response.data.data;
    });
    console.log("ticketrans =>", ticktrans);
    return (
        <>{ticktrans?.map((itemt, index) => (
            <Dialog
                open={show}
                as="div"
                className="fixed inset-0 flex items-end md:items-center justify-center px-3 backdrop-blur"
                onClose={() => setShow(false)}
            >

                <Dialog.Panel
                    id="authentication-modal"
                    tabIndex="-1"
                    className="relative z-10"
                >
                    <div className="w-[700px]">

                        <Card>
                            <div>
                                <img src={icon} alt="" className="h-15" />
                                <div className="flex relative top-[-2rem] ml-5 mt-1">
                                    <img className="h-5" src={text} alt="" />
                                    <img className="h-7" src={train} alt="" />
                                </div>
                                <h2 className="font-bold text-lg mb-3">INVOICE</h2>
                                <div className="mb-4">
                                    <h2 className="font-bold">Kereta Api</h2>
                                    <h2 className="text-sm">Saturday, 21 February 2020</h2>
                                </div>
                                <div className="mb-3">
                                    <h2 className="font-bold">{itemt.ticket.name_train}</h2>
                                    <h2 className="text-sm">{itemt.ticket.type_train_name}</h2>
                                </div>
                                <div className="flex justify-between">
                                    <div className="flex flex-[70%] justify-between">
                                        <div className="flex-[50%]">
                                            <h6 className="font-bold">{itemt.ticket.start_date}</h6>
                                            <h6 className="text-sm mb-4">{itemt.ticket.start_time}</h6>
                                            <h6 className="font-bold">{itemt.ticket.arrival_time}</h6>
                                            <h6 className="text-sm">{itemt.ticket.arrival_date}</h6>
                                        </div>
                                        <div className="flex-[50%]">
                                            <h6 className="font-bold">Jakarta (GMR)</h6>
                                            <h6 className="text-sm mb-4">{itemt.ticket.start_station.name}</h6>
                                            <h6 className="font-bold">Semarang (SMR)</h6>
                                            <h6 className="text-sm">{itemt.ticket.destination_station.name}</h6>
                                        </div>
                                    </div>
                                    <div className="flex-[30%]">
                                        <img className="w-28" src={qr} alt="" />
                                    </div>
                                </div>
                                <Table className="mt-2">
                                    <Table.Head>
                                        <Table.HeadCell>No. Tanda Pengenal</Table.HeadCell>
                                        <Table.HeadCell>Nama Pemesanan</Table.HeadCell>
                                        <Table.HeadCell>No. Handphone</Table.HeadCell>
                                        <Table.HeadCell>Email</Table.HeadCell>
                                    </Table.Head>
                                    <Table.Row>
                                        <Table.Cell>{itemt.id}</Table.Cell>
                                        <Table.Cell>{itemt.user.fullname}</Table.Cell>
                                        <Table.Cell>{itemt.user.phone}</Table.Cell>
                                        <Table.Cell>{itemt.user.email}</Table.Cell>
                                    </Table.Row>
                                </Table>
                                <div className="flex justify-between bg-slate-300 rounded-md p-3 mt-3">
                                    <h2 className="font-semibold text-lg">Total</h2>
                                    <h2 className="font-extrabold">Rp. {itemt.total}</h2>
                                </div>

                            </div>
                        </Card>

                    </div>
                </Dialog.Panel>

            </Dialog>
        ))}
        </>
    )
}