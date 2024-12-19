import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LabelList,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { formatCurrency } from '../lib/utils';

const CHART_COLORS = {
  primary: '#2563eb',
  secondary: '#0891b2',
  tertiary: '#059669',
  quaternary: '#7c3aed',
  accent: '#c026d3',
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 shadow-lg rounded-lg border border-gray-100">
        <p className="font-medium text-gray-900 mb-1">{label}</p>
        <p className="text-blue-600 font-bold">
          {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

const GraphicsExplanation = () => {
  const [lineaEstrategica, setLineaEstrategica] = useState([]);
  const [sectorMGA, setSectorMGA] = useState([]);
  const [programaMGA, setProgramaMGA] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/iniciativas.xlsx');
        const data = await response.arrayBuffer();
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets['Plan indicativo - Productos'];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        const lineas = {};
        const sectores = {};
        const programas = {};

        jsonData.forEach((row) => {
          if (row['Linea Estrategica']) {
            lineas[row['Linea Estrategica']] =
              (lineas[row['Linea Estrategica']] || 0) + (row['Total 2027'] || 0);
          }
          if (row['Sector (MGA)']) {
            sectores[row['Sector (MGA)']] =
              (sectores[row['Sector (MGA)']] || 0) + (row['Total 2027'] || 0);
          }
          if (row['Programa (MGA)']) {
            programas[row['Programa (MGA)']] =
              (programas[row['Programa (MGA)']] || 0) + (row['Total 2027'] || 0);
          }
        });

        setLineaEstrategica(
          Object.entries(lineas)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
        );
        setSectorMGA(
          Object.entries(sectores)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 8) // Limitar a los 8 sectores principales
        );
        setProgramaMGA(
          Object.entries(programas)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 10) // Limitar a los 10 programas principales
        );
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    fetchData();
  }, []);

  const CustomLabel = ({ x, y, width, value }) => (
    <text
      x={x + width + 5}
      y={y + 15}
      fill="#6b7280"
      fontSize={12}
      textAnchor="start"
    >
      {formatCurrency(value)}
    </text>
  );

  return (
    <div className="space-y-8 p-8 bg-gradient-to-b from-gray-50 to-white">
      {/* Gráfico por Línea Estratégica */}
      <Card className="chart-container">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Inversión por Línea Estratégica
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[600px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={lineaEstrategica} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                type="number"
                tickFormatter={formatCurrency}
                fontSize={12}
                tickMargin={8}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={250}
                fontSize={12}
                tickMargin={8}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="value"
                fill={CHART_COLORS.primary}
                name="Inversión"
                radius={[0, 4, 4, 0]}
              >
                <LabelList content={<CustomLabel />} position="right" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gráfico por Sector - Radial */}
      <Card className="chart-container">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Inversión por Sector (MGA)
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={sectorMGA}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis
                dataKey="name"
                fontSize={12}
                tickMargin={8}
                stroke="#6b7280"
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 'auto']}
                tickFormatter={formatCurrency}
              />
              <Radar
                name="Inversión"
                dataKey="value"
                stroke={CHART_COLORS.secondary}
                fill={CHART_COLORS.secondary}
                fillOpacity={0.6}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gráfico por Programa */}
      <Card className="chart-container">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Top 10 Programas por Inversión (MGA)
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={programaMGA} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={100}
                fontSize={12}
                tickMargin={8}
                interval={0}
              />
              <YAxis
                tickFormatter={formatCurrency}
                fontSize={12}
                tickMargin={8}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="value"
                fill={CHART_COLORS.tertiary}
                name="Inversión"
                radius={[4, 4, 0, 0]}
              >
                <LabelList
                  dataKey="value"
                  position="top"
                  formatter={formatCurrency}
                  style={{ fontSize: '12px', fill: '#6b7280' }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default GraphicsExplanation;
