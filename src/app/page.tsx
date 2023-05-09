"use client";
import React, { Suspense, useEffect, useState, useRef, RefObject } from "react";
import {DataItem} from "@/app/api/types";
import Head from "./head";
import {fetchDataFromStorage} from "@/app/utils/fetchDataStorage";
import Navbar from "@/components/Navbar";
import RiskMap from "@/components/RiskMap";

interface RiskFactor {
    [key: string]: number;
}
interface SelectedDataPoint {
    id: number;
    riskRating: number;
    assetName: string;
    riskFactors: RiskFactor;
    year: number;
}

export default function Home() {
    const [data, setData] = useState<DataItem[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const [selectedDataPoint, setSelectedDataPoint] = useState<SelectedDataPoint | null>(null);

    const mapRef: RefObject<HTMLHeadingElement> = useRef(null);
    const dataRef: RefObject<HTMLHeadingElement> = useRef(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const file_path = "gs://react-blog-b07c9.appspot.com/UI_UX_Developer_Work_Sample_Data_sample_data.json";
                const downloadURL = await fetchDataFromStorage(file_path);
                const response = await fetch(downloadURL);
                const rawData: DataItem[] = await response.json();

                const processedData = rawData.map((item: any, index: number) => {
                    const riskFactors = JSON.parse(item["Risk Factors"]);
                    const roundedRiskFactors: RiskFactor = {};

                    Object.keys(riskFactors).forEach((key: string) => {
                        roundedRiskFactors[key] = roundToDecimalPlaces(riskFactors[key], 2);
                    });
                    return {
                        id: index + 1,
                        assetName: item["Asset Name"],
                        lat: item.Lat,
                        long: item.Long,
                        businessCategory: item["Business Category"],
                        riskRating: item["Risk Rating"],
                        riskFactors: roundedRiskFactors,
                        year: item.Year
                    };
                });
                setData(processedData);
            } catch(error: any) {
                console.error('Error fetching data: ', error);
            }

            }
        fetchData();

        }, []);

    function roundToDecimalPlaces(num: number, decimalPlaces: number) {
        const factor = Math.pow(10, decimalPlaces);
        return Math.round(num * factor) / factor;
    }

    return (
        <>
            <main>
                <Head/>
                <div className="bg-black bg-opacity-60 min-h-screen flex item-center py-16">
                    <div className="absolute top-0 left-0 w-full">
                        <Navbar />
                    </div>
                    <div className="container mx-auto px-6 flex flex-col justify-center items-center relative">
                        <h1 className="text-4xl font-bold mb-2 text-white">
                            Climate Risk Dashboard
                        </h1>
                        <p className="text-white text-center">
                            This dashboard shows the risk of climate change on various assets.
                        </p>
                    </div>
                </div>
            </main>
            <Suspense fallback={<div>Loading...</div>}>
                <div className="w-full h-full p-4 md:p-8 bg-background">
                    <h2
                        className="text-2xl font-semibold text-primary-600 mb-4"
                        ref={mapRef}
                    >
                        Climate Risk Map
                    </h2>
                    <p className="text-xl mb-4">
                        Visualize the geographical distribution of climate risks in
                        Canada. Hover over regions to view risk ratings.
                    </p>
                    <RiskMap data={data} selectedDataPoint={selectedDataPoint} />
                </div>
                </Suspense>
        </>
    );
}
