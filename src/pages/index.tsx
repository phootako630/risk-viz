import { useEffect, useState } from "react";
import MapComponent from "../components/MapComponent";



const Home = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/data");
            const json = await response.json();
            const formattedData = json.map((item: any) => ({
                ...item,
                lat: parseFloat(item.Lat),
                lng: parseFloat(item.Long),
            }));
            setData(formattedData);
        };

        fetchData();
    }, []);
    console.log(data);

    return (
        <div>
            <MapComponent data={data} />
        </div>
    );
};

export default Home;