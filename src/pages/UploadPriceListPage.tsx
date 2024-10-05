import React, { useState } from 'react';
import { Upload, Download } from 'lucide-react';
import { priceLists, PriceList } from '../data/priceLists';
import { Product } from '../types';
import * as XLSX from 'xlsx';

const UploadPriceListPage: React.FC = () => {
  const [company, setCompany] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!company) {
      setError('Будь ласка, введіть назву компанії');
      return;
    }

    if (!file) {
      setError('Будь ласка, виберіть файл для завантаження');
      return;
    }

    const allowedExtensions = ['csv', 'xlsx', 'xls'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      setError('Недопустимий формат файлу. Дозволені формати: CSV, XLSX, XLS');
      return;
    }

    try {
      const fileContent = await readFileContent(file);
      const parsedProducts = parseFileContent(fileContent, company, fileExtension);

      if (parsedProducts.length === 0) {
        setError('Файл не містить дійсних даних про продукти. Будь ласка, перевірте формат файлу.');
        return;
      }

      const newPriceList: PriceList = {
        id: priceLists.length + 1,
        company: company,
        products: parsedProducts
      };

      priceLists.push(newPriceList);

      console.log('Завантаження прайс-листа для компанії:', company);
      console.log('Файл:', file.name);
      setSuccess(`Прайс-лист успішно завантажено та збережено. Додано ${parsedProducts.length} продуктів.`);
      setCompany('');
      setFile(null);
    } catch (err) {
      setError(`Помилка при завантаженні файлу: ${(err as Error).message}`);
      console.error('Помилка завантаження:', err);
    }
  };

  const readFileContent = (file: File): Promise<string | ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target?.result as string | ArrayBuffer);
      reader.onerror = (error) => reject(new Error('Помилка читання файлу'));
      if (file.name.endsWith('.csv')) {
        reader.readAsText(file);
      } else {
        reader.readAsArrayBuffer(file);
      }
    });
  };

  const parseFileContent = (content: string | ArrayBuffer, company: string, fileExtension: string): Product[] => {
    let data: any[];
    if (fileExtension === 'csv') {
      data = parseCSV(content as string);
    } else {
      data = parseXLSX(content as ArrayBuffer);
    }

    if (data.length < 2) {
      throw new Error('Файл не містить даних або має неправильний формат');
    }

    const products: Product[] = [];
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (row.length >= 6) {
        const [brand, articleNumber, analogues, name, price, quantity, image] = row;
        if (brand && articleNumber && name && !isNaN(parseFloat(price))) {
          products.push({
            id: Date.now() + i,
            name,
            price: parseFloat(price),
            articleNumber,
            analogue: analogues ? analogues.split(',').map((a: string) => a.trim()).join(', ') : '',
            company: company,
            brand: brand,
            quantity: parseInt(quantity) || 0,
            image: image || `https://source.unsplash.com/featured/?auto,part&${i}`
          });
        }
      }
    }
    return products;
  };

  const parseCSV = (content: string): string[][] => {
    const lines = content.trim().split('\n');
    return lines.map(line => line.split('\t'));
  };

  const parseXLSX = (content: ArrayBuffer): any[][] => {
    const workbook = XLSX.read(content, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  };

  const downloadExampleFile = () => {
    const exampleData = [
      ['Бренд', 'Артикул', 'Аналоги', 'Назва', 'Ціна', 'Кількість', 'Зображення'],
      ['Bosch', 'BP001', 'BP001A, BP001B', 'Гальмівні колодки', '1199.99', '10', 'https://example.com/image1.jpg'],
      ['Mann-Filter', 'OF002', 'OF002A', 'Масляний фільтр', '299.99', '15', 'https://example.com/image2.jpg'],
      ['NGK', 'SP003', 'SP003A, SP003B', 'Свічки запалювання', '450.00', '20', 'https://example.com/image3.jpg']
    ];

    const ws = XLSX.utils.aoa_to_sheet(exampleData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Приклад прайс-листа');
    XLSX.writeFile(wb, 'приклад_прайс_листа.xlsx');
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Завантажити прайс-лист</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="company" className="block mb-2">Назва компанії:</label>
          <input
            type="text"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="file" className="block mb-2">Файл прайс-листа:</label>
          <input
            type="file"
            id="file"
            accept=".csv,.xlsx,.xls"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full"
            required
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300 flex items-center justify-center"
        >
          <Upload className="mr-2" />
          Завантажити прайс-лист
        </button>
      </form>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Приклад файлу прайс-листа</h2>
        <p className="mb-4">
          Завантажте приклад файлу прайс-листа, щоб побачити правильний формат для завантаження:
        </p>
        <button
          onClick={downloadExampleFile}
          className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition duration-300 flex items-center justify-center"
        >
          <Download className="mr-2" />
          Завантажити приклад
        </button>
      </div>
    </div>
  );
};

export default UploadPriceListPage;