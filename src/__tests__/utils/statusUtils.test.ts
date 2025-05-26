import { normalizeStatus, getStatusDisplayText } from '../../utils/statusUtils';
import type { StatusType } from '../../components/atoms/StatusDisplay';

describe('Utilitários de Status', () => {
  describe('normalizeStatus', () => {
    test('deve normalizar status em maiúsculas', () => {
      expect(normalizeStatus('ATIVA')).toBe('ativa');
      expect(normalizeStatus('CONCLUIDA')).toBe('concluida');
      expect(normalizeStatus('PLANEJADA')).toBe('planejada');
    });

    test('deve manter status já normalizados', () => {
      expect(normalizeStatus('ativa')).toBe('ativa');
      expect(normalizeStatus('concluida')).toBe('concluida');
      expect(normalizeStatus('planejada')).toBe('planejada');
    });

    test('deve retornar "ativa" como valor padrão para status não reconhecidos', () => {
      expect(normalizeStatus('em_andamento')).toBe('ativa');
      expect(normalizeStatus('finalizada')).toBe('ativa');
      expect(normalizeStatus('agendada')).toBe('ativa');
    });

    test('deve retornar "ativa" como valor padrão quando o status é undefined', () => {
      expect(normalizeStatus(undefined)).toBe('ativa');
    });
  });

  describe('getStatusDisplayText', () => {
    test('deve retornar o texto de exibição para o status "ativa"', () => {
      expect(getStatusDisplayText('ativa')).toBe('● Em andamento');
    });

    test('deve retornar o texto de exibição para o status "concluida"', () => {
      expect(getStatusDisplayText('concluida')).toBe('✓ Concluída');
    });

    test('deve retornar o texto de exibição para o status "planejada"', () => {
      expect(getStatusDisplayText('planejada')).toBe('◐ Planejada');
    });

    test('deve retornar texto "Desconhecido" para status não reconhecido', () => {
      // Coerção de tipo para fins de teste
      expect(getStatusDisplayText('desconhecido' as StatusType)).toBe('Desconhecido');
    });
  });

  describe('Fluxo completo', () => {
    test('deve normalizar e retornar o texto de exibição correto', () => {
      expect(getStatusDisplayText(normalizeStatus('ATIVA'))).toBe('● Em andamento');
      expect(getStatusDisplayText(normalizeStatus('CONCLUIDA'))).toBe('✓ Concluída');
      expect(getStatusDisplayText(normalizeStatus('PLANEJADA'))).toBe('◐ Planejada');
    });

    test('deve lidar com status não reconhecidos no fluxo completo', () => {
      expect(getStatusDisplayText(normalizeStatus('status_inválido'))).toBe('● Em andamento');
      expect(getStatusDisplayText(normalizeStatus(undefined))).toBe('● Em andamento');
    });
  });
}); 