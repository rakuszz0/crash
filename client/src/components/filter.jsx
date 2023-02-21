import { joinPaths } from "@remix-run/router";
import React from "react";

export default function filter(props) {
    const [result, setResult] = useState()
    // let navigate = useNavigate()

    let now = new Date();
    let liveDateTime = now.toLocaleDateString();
    let date = liveDateTime.split("/");
    let today = date[2] + "-" + date[0] + "-" + date[1];
    let weektomorrow = parseInt(date[0]) + 7;
    // let maxToday = date[2] + "-" + date[0] + "-" + weektomorrow;

    console.log("week =>", weektomorrow);

    const handleDisabled = (event) => {
        if (event.target.checked) {
            setShow(true);
        } else {
            setShow(false);
        }
    };
    const handleChange = (e) => {
        setFormSearch({
            ...formSearch,
            [e.target.name]: e.target.value,
        });

        if (e.target.type === "date") {
            let newDate = new Date(e.target.value).format("yyyy-dd-mm");
            setFormSearch({ jadwal: newDate });
        }
    };
    return (
        <div className="relative top-[-2rem] flex mx-20 rounded-md shadow-xl">
            <div className="bg-slate-300 flex-[20%] rounded-l-md">
                <div className="flex items-center bg-white mt-6">
                    <img src={train} alt="train" />
                    <div className="font-bold">
                        <h6>Train ticket</h6>
                    </div>
                </div>
            </div>
            <div className="flex-[80%] bg-white p-3 rounded-r-md">
                <form>
                    <h4 className="font-semibold">Train ticket</h4>
                    <div className="flex">
                        <div className="flex-[50%]">
                            <div>
                                <label
                                    htmlFor="start"
                                    className="block mb-2 text-sm font-bold text-gray-900"
                                >
                                    Start
                                </label>
                                <select
                                    name="start_station_id"
                                    onChange={handleChange}
                                    className="block w-full text-sm focus:ring-red-300 focus:border-red-500 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                                >
                                    <option hidden>Start Station</option>
                                    {station?.map((item, index) => (
                                        <option key={index} value={item?.id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex">
                                <div className="mt-3">
                                    <label htmlFor="tanggal" className="block mb-2 text-sm font-bold text-gray-900">Tanggal Berangkat</label>
                                    <input type="date" id="tanggal" name="tanggal" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-300 focus:border-red-500 block w-full p-2.5" />
                                </div>
                                <div className="flex-[50%] w-auto">
                                    <div className="flex items-center justify-center mt-3.5">
                                        <Checkbox id="pp" name="checkbox" />
                                        <label className="ml-2 block text-sm font-bold text-gray-900">
                                            Pulang - Pergi
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-start mt-7 mx-10">
                            <img className="w-12 h-10" src={panah} alt="" />
                        </div>
                        <div className="flex-[50%]">
                            <div>
                                <label
                                    htmlFor="destination"
                                    className="block mb-2 text-sm font-bold text-gray-900"
                                >
                                    Destination
                                </label>
                                <select
                                    name="destination_station_id"
                                    onChange={handleChange}
                                    className="block w-full text-sm focus:ring-red-300 focus:border-red-500 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                                >
                                    <option hidden>Destination Station</option>
                                    {station?.map((item, index) => (
                                        <option key={index} value={item?.id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-center">
                                <div className="mr-2">
                                    <label
                                        htmlFor="dewasa"
                                        className="block my-1 text-sm text-center font-bold text-gray-900"
                                    >
                                        Adults
                                    </label>
                                    <input
                                        type="text"
                                        name="dewasa"
                                        id="dewasa"
                                        className="border text-center border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-300 focus:border-red-500 block w-full p-2.5"
                                    // onChange={(e)=> setLogin({ ...login, [e.target.name]: e.target.value})}
                                    />
                                </div>
                                <div className="mr-2">
                                    <label
                                        htmlFor="anak"
                                        className="block my-1 text-center text-sm font-bold text-gray-900"
                                    >
                                        Childs
                                    </label>
                                    <input
                                        type="text"
                                        name="anak"
                                        id="anak"
                                        className="border text-center border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-300 focus:border-red-500 block w-full p-2.5"
                                    // onChange={(e)=> setLogin({ ...login, [e.target.name]: e.target.value})}
                                    />
                                </div>
                                <Button
                                    gradientDuoTone="pinkToOrange"
                                    type="submit"
                                    onClick={() => handleSearch(formSearch)}
                                    className="w-full text-white mt-6 focus:ring-4 focus:outline-none focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-1 text-center"
                                >Search Ticket
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}


<div className="relative top-[-2rem] flex mx-20 rounded-md shadow-xl">
    <div className="bg-slate-300 flex-[20%] rounded-l-md">
        <div className="flex items-center bg-white mt-6">
            <img src={train} alt="train" />
            <div className="font-bold">
                <h6>Train ticket</h6>
            </div>
        </div>
    </div>
    <div className="flex-[80%] bg-white p-3 rounded-r-md">
        <form>
            <h4 className="font-semibold">Train ticket</h4>
            <div className="flex">
                <div className="flex-[50%]">
                    <div>
                        <label
                            htmlFor="start"
                            className="block mb-2 text-sm font-bold text-gray-900"
                        >
                            Start
                        </label>
                        <select
                            name="start_station_id"
                            onChange={handleChange}
                            className="block w-full text-sm focus:ring-red-300 focus:border-red-500 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                        >
                            <option hidden>Start Station</option>
                            {station?.map((item, index) => (
                                <option key={index} value={item?.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex">
                        <div className="mt-3">
                            <label htmlFor="tanggal" className="block mb-2 text-sm font-bold text-gray-900">Tanggal Berangkat</label>
                            <input type="date" id="tanggal" name="tanggal" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-300 focus:border-red-500 block w-full p-2.5" />
                        </div>
                        <div className="flex-[50%] w-auto">
                            <div className="flex items-center justify-center mt-3.5">
                                <Checkbox id="pp" name="checkbox" />
                                <label className="ml-2 block text-sm font-bold text-gray-900">
                                    Pulang - Pergi
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-start mt-7 mx-10">
                    <img className="w-12 h-10" src={panah} alt="" />
                </div>
                <div className="flex-[50%]">
                    <div>
                        <label
                            htmlFor="destination"
                            className="block mb-2 text-sm font-bold text-gray-900"
                        >
                            Destination
                        </label>
                        <select
                            name="destination_station_id"
                            onChange={handleChange}
                            className="block w-full text-sm focus:ring-red-300 focus:border-red-500 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                        >
                            <option hidden>Destination Station</option>
                            {station?.map((item, index) => (
                                <option key={index} value={item?.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center">
                        <div className="mr-2">
                            <label
                                htmlFor="dewasa"
                                className="block my-1 text-sm text-center font-bold text-gray-900"
                            >
                                Adults
                            </label>
                            <input
                                type="text"
                                name="dewasa"
                                id="dewasa"
                                className="border text-center border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-300 focus:border-red-500 block w-full p-2.5"
                            // onChange={(e)=> setLogin({ ...login, [e.target.name]: e.target.value})}
                            />
                        </div>
                        <div className="mr-2">
                            <label
                                htmlFor="anak"
                                className="block my-1 text-center text-sm font-bold text-gray-900"
                            >
                                Childs
                            </label>
                            <input
                                type="text"
                                name="anak"
                                id="anak"
                                className="border text-center border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-300 focus:border-red-500 block w-full p-2.5"
                            // onChange={(e)=> setLogin({ ...login, [e.target.name]: e.target.value})}
                            />
                        </div>
                        <Button
                            gradientDuoTone="pinkToOrange"
                            type="submit"
                            onClick={() => handleSearch(formSearch)}
                            className="w-full text-white mt-6 focus:ring-4 focus:outline-none focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-1 text-center"
                        >Search Ticket
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>