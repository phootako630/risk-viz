const { google } = require("googleapis");

const fetchSheetData = async (spreadsheetId, sheetName, apiKey) => {
    const sheets = google.sheets({ version: "v4", auth: apiKey });

    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: sheetName,
        });

        const [header, ...rows] = response.data.values;

        const data = rows.map((row) => {
            const obj = {};
            header.forEach((key, i) => {
                obj[key] = row[i];
            });
            return obj;
        });

        return data;
    } catch (error) {
        console.error("Error fetching data from Google Sheets:", error);
        return [];
    }
};

module.exports = fetchSheetData;