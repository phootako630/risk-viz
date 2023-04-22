import { FC, useEffect } from "react";
import dynamic from "next/dynamic";
import { LatLngTuple } from "leaflet";
import L from "leaflet";

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });

interface MapComponentProps {
    data: Array<{
        assetName: string;
        lat: number;
        lng: number;
        businessCategory: string;
        riskRating: number;
        riskFactors: Record<string, number>;
    }>;
}

const MapComponent: FC<MapComponentProps> = ({ data }) => {
    const defaultCenter: LatLngTuple = [20, 0];
    const defaultZoom = 2;

    useEffect(() => {
        if (typeof window !== "undefined") {
            import("leaflet");
        }
    }, []);

    const customMarkerIcon = L.icon({
        iconUrl: "/images/leaflet/marker-icon.png",
        iconRetinaUrl: "/images/leaflet/marker-icon-2x.png",
        shadowUrl: "/images/leaflet/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });

    return (
        <MapContainer center={defaultCenter} zoom={defaultZoom} style={{ height: "100%", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {data.map((item, index) => (
                <Marker key={index} position={[item.lat, item.lng]} icon={customMarkerIcon} />
            ))}
        </MapContainer>
    );
};

export default MapComponent;
