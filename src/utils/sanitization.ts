/**
 * Utilitários para sanitização e validação de dados
 */

/**
 * Remove caracteres potencialmente perigosos de strings
 */
export function sanitizeString(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
    .replace(/javascript:/gi, '') // Remove javascript: URLs
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .replace(/[<>]/g, (match) => match === '<' ? '&lt;' : '&gt;'); // Escape HTML
}

/**
 * Valida e sanitiza números
 */
export function sanitizeNumber(input: unknown): number | null {
  if (typeof input === 'number' && !isNaN(input) && isFinite(input)) {
    return input;
  }
  
  if (typeof input === 'string') {
    const parsed = parseFloat(input.replace(/[^\d.-]/g, ''));
    return !isNaN(parsed) && isFinite(parsed) ? parsed : null;
  }
  
  return null;
}

/**
 * Valida email com regex mais robusta
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
}

/**
 * Sanitiza inputs de formulário
 */
export function sanitizeFormData<T extends Record<string, unknown>>(data: T): T {
  const sanitized = {} as T;
  
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      sanitized[key as keyof T] = sanitizeString(value) as T[keyof T];
    } else if (typeof value === 'number') {
      const sanitizedNumber = sanitizeNumber(value);
      sanitized[key as keyof T] = sanitizedNumber as T[keyof T];
    } else {
      sanitized[key as keyof T] = value as T[keyof T];
    }
  }
  
  return sanitized;
}

/**
 * Rate limiting para prevenir spam
 */
export class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private readonly maxAttempts: number;
  private readonly windowMs: number;

  constructor(maxAttempts = 5, windowMs = 60000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const userAttempts = this.attempts.get(identifier) || [];
    
    // Remove tentativas antigas
    const recentAttempts = userAttempts.filter(time => now - time < this.windowMs);
    
    if (recentAttempts.length >= this.maxAttempts) {
      return false;
    }
    
    recentAttempts.push(now);
    this.attempts.set(identifier, recentAttempts);
    return true;
  }
} 