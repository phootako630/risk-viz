import { google } from "googleapis";

const fetchSheetData = async (
    spreadsheetId: string,
    sheetName: string,
    apiKey: string
) => {
    const sheets = google.sheets({ version: "v4", auth: apiKey });

    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: sheetName,
        });

        const [header, ...rows] = response.data.values;

        const data = rows.map((row) => {
            const obj: { [key: string]: any } = {};
            header.forEach((key, i) => {
                if (key === "Risk Factors" && row[i]) {
                    try {
                        obj[key] = JSON.parse(row[i]);
                    } catch (error) {
                        console.error("Error parsing Risk Factors JSON:", error);
                        obj[key] = {};
                    }
                } else {
                    obj[key] = row[i];
                }
            });
            return obj;
        });

        return data;
    } catch (error) {
        console.error("Error fetching data from Google Sheets:", error);
        return [];
    }
};

export default fetchSheetData;
