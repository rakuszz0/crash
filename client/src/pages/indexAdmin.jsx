import React, { useState } from "react";
import { Table } from "flowbite-react"
import action from "../assets/search 1.png";
import { API } from "../config/api";
import { useQuery } from "react-query";
import edit from "../assets/action.png";
import del from "../assets/trash 1.png";
import ModalDetailTicket from "./detail";
import EditModal from "../components/editModal";
import FooterBar from "../components/footer";

export default function ListTransaction() {
    const [modal, setModal] = useState(false)
    const [editMod, setEditMod] = useState(false)

    let { data: ticktrans } = useQuery('ticktransCache', async () => {
        const response = await API.get('/transactions');
        return response.data.data;
    });
    console.log("ticketrans =>", ticktrans);


    return (
        <div>
            <div className="container mx-auto mt-10">
                <div>
                    <h3 className="font-bold text-2xl mb-5">List Transaction</h3>
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>No</Table.HeadCell>
                            <Table.HeadCell>Users</Table.HeadCell>
                            <Table.HeadCell>Tiket</Table.HeadCell>
                            <Table.HeadCell>Status Payment</Table.HeadCell>
                            <Table.HeadCell>Action</Table.HeadCell>
                        </Table.Head>
                        {ticktrans?.map((itemt, index) => (
                            <Table.Row>
                                <Table.Cell>{itemt.id}</Table.Cell>
                                <Table.Cell>{itemt.user.fullname}</Table.Cell>
                                <Table.Cell>{itemt.ticket.destination_station.name} - {itemt.ticket.start_station.name}</Table.Cell>
                                <Table.Cell>{itemt.status}</Table.Cell>
                                <Table.Cell>
                                    <div className="flex justify-between">
                                        <img className="cursor-pointer" onClick={() => setModal(true)} src={action} alt="" />
                                        {/* <img className="cursor-pointer" onClick={() => setEditMod(true)} src={edit} alt="" /> */}
                                        <img className="cursor-pointer" src={del} alt="" />
                                    </div>
                                </Table.Cell>

                            </Table.Row>
                        ))}
                    </Table>
                    {modal && (
                        <ModalDetailTicket
                            show={modal}
                            setShow={setModal}
                        />
                    )}
                    {/* {editMod && (
                        <EditModal
                            show={editMod}
                            setShow={setEditMod}
                        />
                    )} */}
                </div>
            </div>
            <FooterBar />
        </div>
    )
}