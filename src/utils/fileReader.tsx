import { promises as fs } from 'fs';
import { SheetData } from './sheetsFetcher';

export const readExcelFile = async (path: string): Promise<SheetData[]> => {
    try {
        const fileContents = await fs.readFile(path, 'utf-8');
        const lines = fileContents.split('\n').filter(line => line.trim().length > 0);
        const header = lines[0].split(',');

        const rows = lines.slice(1).map((line) => {
            const cells = line.split(',');

            const row: any = {};
            header.forEach((key, index) => {
                if (cells[index]) {
                    row[key.trim()] = cells[index].trim();
                }
            });

            return row;
        });

        return rows;
    } catch (error) {
        console.error('Error reading CSV file:', error);
        return [];
    }
};
