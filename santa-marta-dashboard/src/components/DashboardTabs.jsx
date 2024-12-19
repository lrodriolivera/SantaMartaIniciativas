import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import KPICard from './kpi-card';
import GraphicsExplanation from './graphics-explanation';
import SolutionsSection from './solutions-section';
import { formatCurrency, formatNumber } from '../lib/utils';

const DashboardTabs = ({ data, inversionPorLinea, inversionPorAno, inversionAcumulada }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLinea, setSelectedLinea] = useState("todas");

  const totalInversion = data ? data.reduce((sum, item) => sum + (item['RECURSOS_TOTALES'] || 0), 0) : 0;
  const totalProyectos = data ? data.length : 0;
  const promedioProyecto = totalProyectos > 0 ? totalInversion / totalProyectos : 0;
  const maxInversion = data ? data.reduce((max, item) => 
    (item['RECURSOS_TOTALES'] > max['RECURSOS_TOTALES'] ? item : max), data[0]) : null;

  const lineasEstrategicas = data ? [...new Set(data.map(item => item['Linea Estrategica']))]
    .filter(linea => linea && linea !== 'undefined')
    .sort() : [];

  const filteredProyectos = data.filter(proyecto => {
    const matchesSearch = searchTerm === "" || 
      proyecto['Personalización de Indicador de Producto']?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proyecto['Linea Estrategica']?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLinea = selectedLinea === "todas" || 
      proyecto['Linea Estrategica'] === selectedLinea;

    return matchesSearch && matchesLinea;
  });

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <Tabs defaultValue="dashboard" className="w-full">
        <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto">
            <TabsList className="flex justify-center gap-2 p-2">
              <TabsTrigger 
                value="dashboard"
                className="px-8 py-3 rounded-lg text-sm font-medium transition-all data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md"
              >
                Dashboard Principal
              </TabsTrigger>
              <TabsTrigger 
                value="analytics"
                className="px-8 py-3 rounded-lg text-sm font-medium transition-all data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md"
              >
                Análisis Gráfico
              </TabsTrigger>
              <TabsTrigger 
                value="solutions"
                className="px-8 py-3 rounded-lg text-sm font-medium transition-all data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md"
              >
                Soluciones Estratégicas
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          {/* Dashboard Principal */}
          <TabsContent value="dashboard" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPICard 
                title="Inversión Total" 
                value={formatCurrency(totalInversion)}
                subtitle="Presupuesto total asignado"
                icon="💰"
              />
              <KPICard 
                title="Total Proyectos" 
                value={formatNumber(totalProyectos)}
                subtitle="Iniciativas en ejecución"
                icon="📊"
              />
              <KPICard 
                title="Promedio por Proyecto" 
                value={formatCurrency(promedioProyecto)}
                subtitle="Inversión media por iniciativa"
                icon="📈"
              />
              <KPICard 
                title="Mayor Inversión" 
                value={formatCurrency(maxInversion?.['RECURSOS_TOTALES'] || 0)}
                subtitle="Proyecto más grande"
                icon="🏆"
              />
            </div>

            {/* Buscador */}
            <Card className="shadow-sm border-none bg-white/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  Buscador de Iniciativas
                </CardTitle>
                <p className="text-gray-600">
                  Busca y filtra los proyectos del Plan Indicativo
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <Input
                    placeholder="Buscar iniciativas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 bg-white"
                  />
                  <select
                    className="border rounded-lg px-4 py-2 bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={selectedLinea}
                    onChange={(e) => setSelectedLinea(e.target.value)}
                  >
                    <option value="todas">Todas las líneas estratégicas</option>
                    {lineasEstrategicas.map(linea => (
                      <option key={linea} value={linea}>{linea}</option>
                    ))}
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Tabla */}
            <Card className="overflow-hidden border-none shadow-sm bg-white/50 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50/80 backdrop-blur-sm sticky top-0">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                          Línea Estratégica
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                          Iniciativa
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                          Meta
                        </th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                          Inversión Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredProyectos.map((proyecto, index) => (
                        <tr 
                          key={index} 
                          className="hover:bg-blue-50/50 transition-colors"
                        >
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {proyecto['Linea Estrategica']}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {proyecto['Personalización de Indicador de Producto']}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {proyecto['meta cuatrienio']}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 text-right font-medium">
                            {formatCurrency(proyecto['RECURSOS_TOTALES'])}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Análisis Gráfico */}
          <TabsContent value="analytics" className="mt-6">
            <GraphicsExplanation />
          </TabsContent>

          {/* Soluciones Estratégicas */}
          <TabsContent value="solutions" className="mt-6">
            <SolutionsSection />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default DashboardTabs;
