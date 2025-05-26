import type { StatusType } from '../components/atoms/StatusDisplay';

/**
 * Normaliza os valores de status para um padrão interno
 * @param status Status original que pode vir em diferentes formatos
 * @returns Status normalizado no formato interno
 */
export const normalizeStatus = (status: string | undefined): StatusType => {
  if (!status) return 'ativa';
  
  // Mapeamento de status para valores internos
  const statusMap: Record<string, StatusType> = {
    'ATIVA': 'ativa',
    'CONCLUIDA': 'concluida',
    'PLANEJADA': 'planejada',
    'ativa': 'ativa',
    'concluida': 'concluida',
    'planejada': 'planejada'
  };
  
  return statusMap[status] || 'ativa'; // Fallback seguro
};

/**
 * Obtém o texto de exibição para um determinado status
 * @param status Status normalizado
 * @returns Texto com ícone para exibição
 */
export const getStatusDisplayText = (status: StatusType): string => {
  switch (status) {
    case 'ativa':
      return '● Em andamento';
    case 'concluida':
      return '✓ Concluída';
    case 'planejada':
      return '◐ Planejada';
    default:
      return 'Desconhecido';
  }
}; 