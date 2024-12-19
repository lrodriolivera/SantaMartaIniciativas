import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value) {
  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  // Para valores grandes, agregar sufijos K, M, B
  if (value >= 1e12) {
    return formatter.format(value / 1e12).replace('$', '$') + ' B';
  }
  if (value >= 1e9) {
    return formatter.format(value / 1e9).replace('$', '$') + ' MM';
  }
  if (value >= 1e6) {
    return formatter.format(value / 1e6).replace('$', '$') + ' M';
  }
  if (value >= 1e3) {
    return formatter.format(value / 1e3).replace('$', '$') + ' K';
  }
  return formatter.format(value);
}

export function formatNumber(value) {
  if (value >= 1e9) {
    return (value / 1e9).toFixed(1) + ' B';
  }
  if (value >= 1e6) {
    return (value / 1e6).toFixed(1) + ' M';
  }
  if (value >= 1e3) {
    return (value / 1e3).toFixed(1) + ' K';
  }
  return value.toString();
}
