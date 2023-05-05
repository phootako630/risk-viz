import { readExcelFile } from '@/utils/fileReader';

export type RiskRating = number;

export type SheetData = {
    riskFactors: Record<string, RiskRating>;
    year: number;
    assetName: string;
    businessCategory: string;
    lat: number;
    lng: number;
    riskRating: RiskRating;
};

export const fetchSheetData = async (): Promise<SheetData[]> => {
    const rows = await readExcelFile('./public/datasets/data.csv');

    if (rows.length) {

        const data = rows.slice(1).map((row) => {
            let riskFactors = {};
            if (row[5]) {
                try {
                    riskFactors = JSON.parse(row[5] as string);
                } catch (err) {
                    console.error('Error parsing risk factors JSON: ', err);
                }
            }

            return {
                riskFactors,
                year: parseInt(row[6] as string, 10), // Parse the year correctly
                assetName: row[0] as string,
                businessCategory: row[3] as string,
                lat: parseFloat(row[1] as string),
                lng: parseFloat(row[2] as string),
                riskRating: parseFloat(row[4] as string),
            };
        });
        console.log('Fetched data:', rows[0]);
        return data;
    } else {
        console.log('No data found in the sheet.');
        return [];
    }
};
