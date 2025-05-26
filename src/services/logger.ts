/**
 * Sistema de logging estruturado para aplicação
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
  userId?: string;
  sessionId?: string;
  correlationId?: string;
}

class Logger {
  private static instance: Logger;
  private logs: LogEntry[] = [];
  private maxLogs = 1000;
  private currentLogLevel = LogLevel.INFO;

  private constructor() {
    // Configurar nível de log baseado no ambiente
    if (process.env.NODE_ENV === 'development') {
      this.currentLogLevel = LogLevel.DEBUG;
    }
  }

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private createLogEntry(
    level: LogLevel,
    message: string,
    context?: Record<string, unknown>
  ): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      sessionId: this.getSessionId(),
      correlationId: this.generateCorrelationId(),
    };
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.currentLogLevel;
  }

  private addLog(entry: LogEntry): void {
    this.logs.push(entry);
    
    // Manter apenas os últimos logs
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // Console output em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      const levelName = LogLevel[entry.level];
      console.log(`[${levelName}] ${entry.timestamp}: ${entry.message}`, entry.context);
    }
  }

  debug(message: string, context?: Record<string, unknown>): void {
    if (!this.shouldLog(LogLevel.DEBUG)) return;
    this.addLog(this.createLogEntry(LogLevel.DEBUG, message, context));
  }

  info(message: string, context?: Record<string, unknown>): void {
    if (!this.shouldLog(LogLevel.INFO)) return;
    this.addLog(this.createLogEntry(LogLevel.INFO, message, context));
  }

  warn(message: string, context?: Record<string, unknown>): void {
    if (!this.shouldLog(LogLevel.WARN)) return;
    this.addLog(this.createLogEntry(LogLevel.WARN, message, context));
  }

  error(message: string, error?: Error, context?: Record<string, unknown>): void {
    if (!this.shouldLog(LogLevel.ERROR)) return;
    
    const errorContext = {
      ...context,
      error: error ? {
        name: error.name,
        message: error.message,
        stack: error.stack,
      } : undefined,
    };

    this.addLog(this.createLogEntry(LogLevel.ERROR, message, errorContext));
  }

  // Logs específicos para ações do usuário
  userAction(action: string, details?: Record<string, unknown>): void {
    this.info(`User action: ${action}`, { 
      type: 'user_action', 
      action, 
      ...details 
    });
  }

  // Logs de performance
  performance(operation: string, duration: number, details?: Record<string, unknown>): void {
    this.info(`Performance: ${operation}`, {
      type: 'performance',
      operation,
      duration,
      ...details,
    });
  }

  // Logs de API
  apiCall(method: string, url: string, status: number, duration: number): void {
    this.info(`API call: ${method} ${url}`, {
      type: 'api_call',
      method,
      url,
      status,
      duration,
    });
  }

  private getSessionId(): string {
    // Implementar lógica de sessão
    return 'session-' + Date.now();
  }

  private generateCorrelationId(): string {
    return 'corr-' + Math.random().toString(36).substr(2, 9);
  }

  // Exportar logs para análise
  exportLogs(): LogEntry[] {
    return [...this.logs];
  }

  // Limpar logs
  clearLogs(): void {
    this.logs = [];
  }
}

// Hook para usar o logger em componentes React
export function useLogger() {
  return Logger.getInstance();
}

export default Logger.getInstance(); 