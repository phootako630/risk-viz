import { NextApiRequest, NextApiResponse } from 'next';
import { fetchSheetData } from '@/utils/sheetsFetcher';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const data = await fetchSheetData();
    res.status(200).json(data);
}
