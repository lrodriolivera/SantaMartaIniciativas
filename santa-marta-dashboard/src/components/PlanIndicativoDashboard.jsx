import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import _ from 'lodash';
import Header from './ui/Header';
import DashboardTabs from './DashboardTabs';

const PlanIndicativoDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inversionPorLinea, setInversionPorLinea] = useState([]);
  const [inversionPorAno, setInversionPorAno] = useState([]);
  const [inversionAcumulada, setInversionAcumulada] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Leer el archivo Excel
        const response = await fetch('/iniciativas.xlsx');
        if (!response.ok) throw new Error('Error al cargar el archivo Excel');

        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });

        console.log('Datos cargados desde Excel:', jsonData); // Para depuración

        // Calcular el total de inversión sumando años
        const dataWithTotal = jsonData.map((row) => ({
          ...row,
          RECURSOS_TOTALES:
            (row['Total 2024'] || 0) +
            (row['Total 2025'] || 0) +
            (row['Total 2026'] || 0) +
            (row['Total 2027'] || 0),
        }));

        // Agrupar por "Linea Estrategica"
        const groupedByLinea = _.groupBy(dataWithTotal, 'Linea Estrategica');
        const inversionLinea = Object.entries(groupedByLinea).map(([linea, items]) => ({
          name: linea,
          value: _.sumBy(items, 'RECURSOS_TOTALES'),
        }));

        // Calcular inversión por año
        const years = ['Total 2024', 'Total 2025', 'Total 2026', 'Total 2027'];
        const inversionAnual = years.map((year) => ({
          name: year.replace('Total ', ''),
          value: _.sumBy(dataWithTotal, year),
        }));

        // Calcular inversión acumulada
        let acumulado = 0;
        const inversionAcum = inversionAnual.map(({ name, value }) => {
          acumulado += value;
          return { name, value: acumulado };
        });

        setData(dataWithTotal);
        setInversionPorLinea(inversionLinea);
        setInversionPorAno(inversionAnual);
        setInversionAcumulada(inversionAcum);
      } catch (err) {
        console.error('Error al procesar el archivo:', err);
        setError('Error al procesar los datos del archivo Excel');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <div>Cargando datos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Usar el Header del componente Header.jsx */}
        <Header />

        {/* Contenido principal con las Tabs */}
        <main className="p-6">
          <DashboardTabs
            data={data}
            inversionPorLinea={inversionPorLinea}
            inversionPorAno={inversionPorAno}
            inversionAcumulada={inversionAcumulada}
          />
        </main>
      </div>
    </div>
  );
};

export default PlanIndicativoDashboard;
