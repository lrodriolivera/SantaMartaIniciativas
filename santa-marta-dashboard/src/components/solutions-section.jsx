import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const SolutionsSection = () => {
  const solutions = [
    {
      title: 'Gestión Eficiente del Agua Potable y Saneamiento Básico',
      indicator: 'Proyectos de acueducto, alcantarillado y aseo implementados.',
      meta: 'Aumentar la cobertura de agua potable y saneamiento básico.',
      solution: 'Gestor de Proyectos con IA',
      details: [
        'Monitoreo del estado de proyectos de acueducto y redes de alcantarillado.',
        'Predicción de riesgos de retraso o sobrecostos en la ejecución.',
        'Generación de alertas automáticas y visualización de cronogramas.',
      ],
      benefit: 'Cumplimiento oportuno de las metas de cobertura con alta eficiencia.',
      icon: '💧',
    },
    {
      title: 'Distribución y Ejecución de Recursos Financieros',
      indicator: 'Ejecución del presupuesto destinado a educación, salud, cultura y deporte.',
      meta: 'Asignación eficiente de recursos financieros por sector y año (2024-2027).',
      solution: 'Sistema de Gestión de Recursos Públicos con IA',
      details: [
        'Análisis automatizado de ejecución presupuestaria para cada año y sector.',
        'Simulación de escenarios para optimizar la distribución de recursos.',
        'Transparencia con blockchain para garantizar el seguimiento del gasto.',
      ],
      benefit: 'Mejora en la ejecución y eficiencia del gasto, alineado con las metas del plan.',
      icon: '💰',
    },
    {
      title: 'Mejora en Cobertura y Calidad Educativa',
      indicator: 'Niños y niñas atendidos en servicios integrales educativos.',
      meta: 'Ampliar la cobertura escolar con infraestructura adecuada.',
      solution: 'Plataforma de Análisis de Datos Educativos',
      details: [
        'Análisis de asistencia y brechas educativas en zonas críticas.',
        'Identificación de infraestructura deficiente y necesidades de inversión.',
        'Reportes automáticos para tomar decisiones informadas.',
      ],
      benefit: 'Mejora de la cobertura educativa y priorización de inversiones.',
      icon: '📚',
    },
    {
      title: 'Salud Pública y Servicios Comunitarios',
      indicator: 'Cobertura de servicios de salud básica y especializados.',
      meta: 'Garantizar acceso a salud en comunidades vulnerables.',
      solution: 'Plataforma de Telemedicina y Monitoreo de Cobertura',
      details: [
        'Implementación de sistemas de telemedicina para zonas alejadas.',
        'Análisis predictivo para identificar necesidades futuras de servicios de salud.',
        'Monitoreo del acceso a servicios en tiempo real.',
      ],
      benefit: 'Reducción de brechas en salud y aumento en cobertura de servicios.',
      icon: '🏥',
    },
    {
      title: 'Infraestructura Vial y Movilidad Urbana',
      indicator: 'Kilómetros de vías urbanas intervenidas y rutas optimizadas.',
      meta: 'Optimizar el transporte público y mejorar la infraestructura vial.',
      solution: 'Sistema Inteligente de Rutas y Movilidad',
      details: [
        'Optimización de rutas de transporte público mediante análisis de datos.',
        'Predicción de demanda en picos horarios para ajustar frecuencias.',
        'Reducción de tiempos de traslado y congestión vehicular.',
      ],
      benefit: 'Movilidad más eficiente y sostenible en la ciudad.',
      icon: '🚌',
    },
    {
      title: 'Monitoreo Ambiental y Turismo Sostenible',
      indicator: 'Control de la contaminación en cuerpos de agua y zonas turísticas.',
      meta: 'Garantizar la sostenibilidad ambiental en áreas clave.',
      solution: 'Sistema IoT + IA para Monitoreo Ambiental',
      details: [
        'Monitoreo de la calidad del agua, aire y suelo en tiempo real.',
        'Alertas predictivas para prevenir contaminación en zonas críticas.',
        'Visualización en mapas interactivos (GIS).',
      ],
      benefit: 'Sostenibilidad ambiental y protección de recursos turísticos.',
      icon: '🌿',
    },
    {
      title: 'Participación y Transparencia Ciudadana',
      indicator: 'Número de ciudadanos participantes en procesos de planeación.',
      meta: 'Fomentar la participación activa y el control ciudadano.',
      solution: 'Portal de Participación Ciudadana con Chatbot',
      details: [
        'Portal interactivo que informa sobre el avance del plan en tiempo real.',
        'Chatbot basado en IA: Responde consultas y recolecta sugerencias.',
        'Encuestas para priorizar proyectos y medir la satisfacción.',
      ],
      benefit: 'Aumentar la participación ciudadana y fortalecer la transparencia.',
      icon: '👥',
    },
  ];

  return (
    <div className="p-8 bg-gradient-to-b from-gray-50 to-white">
      <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
        Soluciones Estratégicas por{' '}
        <span className="font-extrabold">RYP CLOUD</span>
      </h2>
      <div className="grid grid-cols-1 gap-8">
        {solutions.map((solution, index) => (
          <Card 
            key={index} 
            className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-blue-600"
          >
            <CardHeader className="flex flex-row items-center gap-4">
              <span className="text-4xl">{solution.icon}</span>
              <div>
                <CardTitle className="text-xl font-bold group-hover:text-blue-600 transition-colors">
                  {solution.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <p className="font-medium text-gray-700">
                    <span className="text-blue-600">Indicador:</span> {solution.indicator}
                  </p>
                  <p className="font-medium text-gray-700">
                    <span className="text-blue-600">Meta:</span> {solution.meta}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-700 mb-2">
                    <span className="text-blue-600">Solución Propuesta:</span> {solution.solution}
                  </p>
                  <ul className="list-none space-y-2">
                    {solution.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span className="text-gray-600">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <p className="font-medium text-gray-700">
                  <span className="text-blue-600">Beneficio:</span>{' '}
                  <span className="text-gray-600">{solution.benefit}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SolutionsSection;
