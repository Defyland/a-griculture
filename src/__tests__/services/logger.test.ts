import logger from '../../services/logger';

describe('Logger Service', () => {
  afterEach(() => {
    logger.clearLogs();
  });

  it('deve existir como objeto', () => {
    expect(logger).toBeDefined();
    expect(typeof logger).toBe('object');
  });

  it('deve ter método info', () => {
    expect(logger.info).toBeDefined();
    expect(typeof logger.info).toBe('function');
  });

  it('deve ter método error', () => {
    expect(logger.error).toBeDefined();
    expect(typeof logger.error).toBe('function');
  });

  it('deve ter método de exportar logs', () => {
    logger.info('Test log');
    const logs = logger.exportLogs();
    
    expect(Array.isArray(logs)).toBe(true);
    expect(logs.length).toBeGreaterThan(0);
  });

  it('deve ter método userAction', () => {
    expect(logger.userAction).toBeDefined();
    expect(typeof logger.userAction).toBe('function');
  });

  it('deve ter método performance', () => {
    expect(logger.performance).toBeDefined();
    expect(typeof logger.performance).toBe('function');
  });

  it('deve ter método debug', () => {
    expect(logger.debug).toBeDefined();
    expect(typeof logger.debug).toBe('function');
  });

  it('deve ter método warn', () => {
    expect(logger.warn).toBeDefined();
    expect(typeof logger.warn).toBe('function');
  });

  it('deve funcionar com métodos diferentes', () => {
    logger.info('Test info');
    logger.error('Test error');
    logger.warn('Test warn');
    
    const logs = logger.exportLogs();
    expect(logs.length).toBeGreaterThan(0);
  });
}); 