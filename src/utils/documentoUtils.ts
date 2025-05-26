// Função para validar CPF
export function validarCPF(cpf: string): boolean {
  // Remover caracteres não numéricos
  cpf = cpf.replace(/[^\d]/g, '');
  
  // Verificar se tem 11 dígitos
  if (cpf.length !== 11) return false;
  
  // Verificar se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(cpf)) return false;
  
  // Validar primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  
  let resto = soma % 11;
  const digitoVerificador1 = resto < 2 ? 0 : 11 - resto;
  
  if (parseInt(cpf.charAt(9)) !== digitoVerificador1) return false;
  
  // Validar segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  
  resto = soma % 11;
  const digitoVerificador2 = resto < 2 ? 0 : 11 - resto;
  
  if (parseInt(cpf.charAt(10)) !== digitoVerificador2) return false;
  
  return true;
}

// Função para validar CNPJ
export function validarCNPJ(cnpj: string): boolean {
  // Remover caracteres não numéricos
  cnpj = cnpj.replace(/[^\d]/g, '');
  
  // Verificar se tem 14 dígitos
  if (cnpj.length !== 14) return false;
  
  // Verificar se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(cnpj)) return false;
  
  // Cálculo do primeiro dígito verificador
  let soma = 0;
  let multiplicador = 5;
  
  for (let i = 0; i < 12; i++) {
    soma += parseInt(cnpj.charAt(i)) * multiplicador;
    multiplicador = multiplicador === 2 ? 9 : multiplicador - 1;
  }
  
  let resto = soma % 11;
  const digitoVerificador1 = resto < 2 ? 0 : 11 - resto;
  
  if (parseInt(cnpj.charAt(12)) !== digitoVerificador1) return false;
  
  // Cálculo do segundo dígito verificador
  soma = 0;
  multiplicador = 6;
  
  for (let i = 0; i < 13; i++) {
    soma += parseInt(cnpj.charAt(i)) * multiplicador;
    multiplicador = multiplicador === 2 ? 9 : multiplicador - 1;
  }
  
  resto = soma % 11;
  const digitoVerificador2 = resto < 2 ? 0 : 11 - resto;
  
  if (parseInt(cnpj.charAt(13)) !== digitoVerificador2) return false;
  
  return true;
}

// Função para formatar CPF ou CNPJ
export function formatarDocumento(documento: string, tipo: 'CPF' | 'CNPJ'): string {
  // Remover caracteres não numéricos
  const apenasNumeros = documento.replace(/[^\d]/g, '');
  
  if (tipo === 'CPF') {
    // Limitar a 11 dígitos
    const cpf = apenasNumeros.slice(0, 11);
    
    // Formatar CPF: 000.000.000-00
    if (cpf.length <= 3) {
      return cpf;
    } else if (cpf.length <= 6) {
      return `${cpf.slice(0, 3)}.${cpf.slice(3)}`;
    } else if (cpf.length <= 9) {
      return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6)}`;
    } else {
      return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9)}`;
    }
  } else {
    // Limitar a 14 dígitos
    const cnpj = apenasNumeros.slice(0, 14);
    
    // Formatar CNPJ: 00.000.000/0000-00
    if (cnpj.length <= 2) {
      return cnpj;
    } else if (cnpj.length <= 5) {
      return `${cnpj.slice(0, 2)}.${cnpj.slice(2)}`;
    } else if (cnpj.length <= 8) {
      return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5)}`;
    } else if (cnpj.length <= 12) {
      return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8)}`;
    } else {
      return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8, 12)}-${cnpj.slice(12)}`;
    }
  }
}

// Função para gerar um CPF válido (para fins de teste)
export function gerarCPFValido(): string {
  let cpf = '';
  // Gera os 9 primeiros dígitos aleatoriamente
  for (let i = 0; i < 9; i++) {
    cpf += Math.floor(Math.random() * 10);
  }
  
  // Cálculo do primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = soma % 11;
  const dv1 = resto < 2 ? 0 : 11 - resto;
  cpf += dv1;
  
  // Cálculo do segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = soma % 11;
  const dv2 = resto < 2 ? 0 : 11 - resto;
  cpf += dv2;
  
  // Formata e retorna o CPF
  return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
}

// Função para gerar um CNPJ válido (para fins de teste)
export function gerarCNPJValido(): string {
  let cnpj = '';
  // Gera os 12 primeiros dígitos aleatoriamente
  for (let i = 0; i < 12; i++) {
    cnpj += Math.floor(Math.random() * 10);
  }
  
  // Cálculo do primeiro dígito verificador
  let soma = 0;
  let multiplicador = 5;
  for (let i = 0; i < 12; i++) {
    soma += parseInt(cnpj.charAt(i)) * multiplicador;
    multiplicador = multiplicador === 2 ? 9 : multiplicador - 1;
  }
  let resto = soma % 11;
  const dv1 = resto < 2 ? 0 : 11 - resto;
  cnpj += dv1;
  
  // Cálculo do segundo dígito verificador
  soma = 0;
  multiplicador = 6;
  for (let i = 0; i < 13; i++) {
    soma += parseInt(cnpj.charAt(i)) * multiplicador;
    multiplicador = multiplicador === 2 ? 9 : multiplicador - 1;
  }
  resto = soma % 11;
  const dv2 = resto < 2 ? 0 : 11 - resto;
  cnpj += dv2;
  
  // Formata e retorna o CNPJ
  return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
} 