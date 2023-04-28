import { NextApiRequest, NextApiResponse } from "next";
import dataProcessor from "../../utils/dataProcessor";

const apiKey = process.env.GOOGLE_SHEETS_API_KEY;
const spreadsheetId = "1Y_yiT-_7IimioBvcqiCPwLzTLazfdRyzZ4k3cpQXiAw";
const sheetName = "sample_data";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const data = await dataProcessor(spreadsheetId, sheetName, apiKey);
    res.status(200).json(data);
}