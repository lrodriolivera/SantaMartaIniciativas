import { read, utils } from 'xlsx';

export function readExcelFile(filePath) {
  const workbook = read(filePath, { type: 'file' });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = utils.sheet_to_json(worksheet);
  return data;
}

// Example usage
const filePath = '../public/iniciativas.xlsx';
const data = readExcelFile(filePath);
console.log(data);
