import React from 'react';
import { Card, CardContent } from './ui/card';

const KPICard = ({ title, value, subtitle, icon }) => {
  return (
    <Card className="kpi-card group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-1">
            <h3 className="kpi-title uppercase tracking-wider text-gray-500 group-hover:text-blue-600 transition-colors">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-gray-400 group-hover:text-gray-600 transition-colors">
                {subtitle}
              </p>
            )}
          </div>
          {icon && (
            <span className="text-2xl opacity-70 group-hover:opacity-100 transition-opacity">
              {icon}
            </span>
          )}
        </div>
        <div className="space-y-3">
          <p className="kpi-value bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent text-3xl font-bold">
            {value}
          </p>
          <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KPICard;
