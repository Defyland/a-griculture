import { produtoresAPI, propriedadesAPI, safrasAPI, culturasAPI, dashboardAPI } from '../../services/api';

describe('API Services', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('produtoresAPI', () => {
    it('deve ter método getAll', () => {
      expect(typeof produtoresAPI.getAll).toBe('function');
    });

    it('deve ter método getById', () => {
      expect(typeof produtoresAPI.getById).toBe('function');
    });

    it('deve ter método create', () => {
      expect(typeof produtoresAPI.create).toBe('function');
    });

    it('deve ter método update', () => {
      expect(typeof produtoresAPI.update).toBe('function');
    });

    it('deve ter método delete', () => {
      expect(typeof produtoresAPI.delete).toBe('function');
    });
  });

  describe('propriedadesAPI', () => {
    it('deve ter método getAll', () => {
      expect(typeof propriedadesAPI.getAll).toBe('function');
    });

    it('deve ter método getById', () => {
      expect(typeof propriedadesAPI.getById).toBe('function');
    });

    it('deve ter método create', () => {
      expect(typeof propriedadesAPI.create).toBe('function');
    });
  });

  describe('safrasAPI', () => {
    it('deve ter método getAll', () => {
      expect(typeof safrasAPI.getAll).toBe('function');
    });

    it('deve ter método getById', () => {
      expect(typeof safrasAPI.getById).toBe('function');
    });
  });

  describe('culturasAPI', () => {
    it('deve ter método getBySafra', () => {
      expect(typeof culturasAPI.getBySafra).toBe('function');
    });

    it('deve ter método getById', () => {
      expect(typeof culturasAPI.getById).toBe('function');
    });
  });

  describe('dashboardAPI', () => {
    it('deve ter método getData', () => {
      expect(typeof dashboardAPI.getData).toBe('function');
    });
  });
}); 