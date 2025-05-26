import { sanitizeString, sanitizeNumber, validateEmail, sanitizeFormData, RateLimiter } from '../../utils/sanitization';

describe('sanitization', () => {
  describe('sanitizeString', () => {
    it('deve remover scripts maliciosos', () => {
      const input = '<script>alert("xss")</script>Conteúdo';
      const result = sanitizeString(input);
      
      expect(result).not.toContain('<script>');
      expect(result).toContain('Conteúdo');
    });

    it('deve escapar tags HTML', () => {
      const input = '<div>Conteúdo</div>';
      const result = sanitizeString(input);
      
      expect(result).toContain('&lt;div&gt;');
    });

    it('deve manter texto normal', () => {
      const input = 'Texto normal sem caracteres especiais';
      const result = sanitizeString(input);
      
      expect(result).toBe(input);
    });

    it('deve lidar com strings vazias', () => {
      const result = sanitizeString('');
      
      expect(result).toBe('');
    });
  });

  describe('sanitizeNumber', () => {
    it('deve retornar número válido', () => {
      const result = sanitizeNumber(123.45);
      
      expect(result).toBe(123.45);
    });

    it('deve converter string numérica', () => {
      const result = sanitizeNumber('123.45');
      
      expect(result).toBe(123.45);
    });

    it('deve retornar null para valor inválido', () => {
      const result = sanitizeNumber('abc');
      
      expect(result).toBeNull();
    });
  });

  describe('validateEmail', () => {
    it('deve validar email correto', () => {
      const result = validateEmail('user@example.com');
      
      expect(result).toBe(true);
    });

    it('deve rejeitar email inválido', () => {
      const result = validateEmail('invalid-email');
      
      expect(result).toBe(false);
    });
  });

  describe('sanitizeFormData', () => {
    it('deve sanitizar dados do formulário', () => {
      const input = { name: '<script>alert("xss")</script>João', age: '25' };
      const result = sanitizeFormData(input);
      
      expect(result.name).not.toContain('<script>');
      expect(result.name).toContain('João');
    });
  });

  describe('RateLimiter', () => {
    it('deve permitir tentativas dentro do limite', () => {
      const limiter = new RateLimiter(3, 60000);
      
      expect(limiter.isAllowed('user1')).toBe(true);
      expect(limiter.isAllowed('user1')).toBe(true);
      expect(limiter.isAllowed('user1')).toBe(true);
    });

    it('deve bloquear tentativas acima do limite', () => {
      const limiter = new RateLimiter(2, 60000);
      
      expect(limiter.isAllowed('user2')).toBe(true);
      expect(limiter.isAllowed('user2')).toBe(true);
      expect(limiter.isAllowed('user2')).toBe(false);
    });
  });
}); 