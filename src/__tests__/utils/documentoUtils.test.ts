import { 
  validarCPF, 
  validarCNPJ, 
  formatarDocumento, 
  gerarCPFValido, 
  gerarCNPJValido 
} from '../../utils/documentoUtils';

describe('Validação de CPF', () => {
  test('deve validar um CPF correto', () => {
    expect(validarCPF('529.982.247-25')).toBe(true);
    expect(validarCPF('52998224725')).toBe(true);
  });

  test('deve rejeitar um CPF com formato inválido', () => {
    expect(validarCPF('529.982.247-2')).toBe(false); // faltando um dígito
    expect(validarCPF('529.982.247-255')).toBe(false); // dígito extra
    expect(validarCPF('abc.def.ghi-jk')).toBe(false); // caracteres não numéricos
  });

  test('deve rejeitar CPFs com dígitos repetidos', () => {
    expect(validarCPF('111.111.111-11')).toBe(false);
    expect(validarCPF('222.222.222-22')).toBe(false);
    expect(validarCPF('000.000.000-00')).toBe(false);
  });

  test('deve rejeitar CPFs com dígitos verificadores incorretos', () => {
    expect(validarCPF('529.982.247-26')).toBe(false); // último dígito errado
    expect(validarCPF('529.982.247-35')).toBe(false); // penúltimo dígito errado
    expect(validarCPF('529.982.247-36')).toBe(false); // ambos dígitos errados
  });
});

describe('Validação de CNPJ', () => {
  test('deve validar um CNPJ correto', () => {
    expect(validarCNPJ('11.222.333/0001-81')).toBe(true);
    expect(validarCNPJ('11222333000181')).toBe(true);
  });

  test('deve rejeitar um CNPJ com formato inválido', () => {
    expect(validarCNPJ('11.222.333/0001-8')).toBe(false); // faltando um dígito
    expect(validarCNPJ('11.222.333/0001-811')).toBe(false); // dígito extra
    expect(validarCNPJ('aa.bbb.ccc/dddd-ee')).toBe(false); // caracteres não numéricos
  });

  test('deve rejeitar CNPJs com dígitos repetidos', () => {
    expect(validarCNPJ('11.111.111/1111-11')).toBe(false);
    expect(validarCNPJ('22.222.222/2222-22')).toBe(false);
    expect(validarCNPJ('00.000.000/0000-00')).toBe(false);
  });

  test('deve rejeitar CNPJs com dígitos verificadores incorretos', () => {
    expect(validarCNPJ('11.222.333/0001-82')).toBe(false); // último dígito errado
    expect(validarCNPJ('11.222.333/0001-71')).toBe(false); // penúltimo dígito errado
    expect(validarCNPJ('11.222.333/0001-72')).toBe(false); // ambos dígitos errados
  });
});

describe('Formatação de documentos', () => {
  test('deve formatar CPF corretamente', () => {
    expect(formatarDocumento('52998224725', 'CPF')).toBe('529.982.247-25');
    expect(formatarDocumento('123', 'CPF')).toBe('123');
    expect(formatarDocumento('123456', 'CPF')).toBe('123.456');
    expect(formatarDocumento('123456789', 'CPF')).toBe('123.456.789');
    expect(formatarDocumento('12345678901', 'CPF')).toBe('123.456.789-01');
  });

  test('deve formatar CNPJ corretamente', () => {
    expect(formatarDocumento('11222333000181', 'CNPJ')).toBe('11.222.333/0001-81');
    expect(formatarDocumento('11', 'CNPJ')).toBe('11');
    expect(formatarDocumento('11222', 'CNPJ')).toBe('11.222');
    expect(formatarDocumento('11222333', 'CNPJ')).toBe('11.222.333');
    expect(formatarDocumento('11222333000', 'CNPJ')).toBe('11.222.333/000');
    expect(formatarDocumento('11222333000181', 'CNPJ')).toBe('11.222.333/0001-81');
  });

  test('deve truncar documentos com mais dígitos que o esperado', () => {
    expect(formatarDocumento('5299822472599', 'CPF')).toBe('529.982.247-25');
    expect(formatarDocumento('1122233300018199', 'CNPJ')).toBe('11.222.333/0001-81');
  });
});

describe('Geração de documentos', () => {
  test('deve gerar um CPF válido', () => {
    const cpf = gerarCPFValido();
    expect(validarCPF(cpf)).toBe(true);
    expect(cpf).toMatch(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/);
  });

  test('deve gerar um CNPJ válido', () => {
    const cnpj = gerarCNPJValido();
    expect(validarCNPJ(cnpj)).toBe(true);
    expect(cnpj).toMatch(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/);
  });

  test('deve gerar CPFs diferentes em chamadas consecutivas', () => {
    const cpf1 = gerarCPFValido();
    const cpf2 = gerarCPFValido();
    expect(cpf1).not.toBe(cpf2);
  });

  test('deve gerar CNPJs diferentes em chamadas consecutivas', () => {
    const cnpj1 = gerarCNPJValido();
    const cnpj2 = gerarCNPJValido();
    expect(cnpj1).not.toBe(cnpj2);
  });
}); 