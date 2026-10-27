export type UserRole =
  | 'admin-sistema'
  | 'assessor-tecnico'
  | 'gestor'
  | 'auditor'
  | 'secretario'
  | 'coordenador-pedagogico'
  | 'pedagogo'
  | 'professor-aee'
  | 'professor'
  | 'tecnico-administrativo'
  | 'inspetor'
  | 'bibliotecario'
  | 'funcionario'
  | 'estagiario'
  | 'responsavel'
  | 'aluno'
  | 'consulta';

export interface UserProfile {
  name: string;
  cpf: string;
  role: UserRole;
  roleTitle: string;
  school: string;
  ddz: string; // Divisão Distrital Zonal da SEMED
  email: string;
}

export interface Student {
  id: string;
  matricula: string;
  nome: string;
  turma: string;
  turno: 'Matutino' | 'Vespertino' | 'Integral';
  frequencia: number;
  situacao: 'Matriculado' | 'Transferido' | 'Em análise';
  responsavel: string;
  bairro: string;
}

export interface Teacher {
  id: string;
  nome: string;
  disciplina: string;
  matricula: string;
  turmas: string[];
  cargaHoraria: number;
  status: 'Em atividade' | 'Licença capacitação' | 'Atestado' | 'Removido';
  cargo?: string;
  vinculo?: 'Efetivo Concursado' | 'PSS / Temporário' | 'Comissionado';
  frequencia?: number;
  turno?: 'Matutino' | 'Vespertino' | 'Integral';
  lotacao?: string;
  bairro?: string;
  cpf?: string;
  telefone?: string;
  email?: string;
}

export interface SchoolClass {
  id: string;
  codigo: string;
  nome: string;
  ano: string;
  sala: string;
  totalAlunos: number;
  capacidade: number;
  professorRegente: string;
  turno: string;
}

export interface NavigationSubItem {
  id: string;
  label: string;
  badge?: string | number;
  allowedRoles?: UserRole[];
}

export interface NavigationItem {
  id: string;
  label: string;
  iconName: string;
  badge?: string | number;
  subItems?: NavigationSubItem[];
  allowedRoles?: UserRole[];
}

export interface NavigationGroup {
  id: string;
  groupTitle: string;
  items: NavigationItem[];
}
