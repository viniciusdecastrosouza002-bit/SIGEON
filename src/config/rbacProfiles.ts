export type CanonicalRoleId =
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

export type AccessLevel = 'TOTAL' | 'PARCIAL' | 'LEITURA' | 'VEDADO';

export interface ModuleCeiling {
  moduleId: string;
  moduleName: string;
  level: AccessLevel;
  matrixCode: string; // V, C, E, A, —, †, V (t), V (a), V (f), V (p), etc.
  details?: string;
}

export interface ProfileDefinition {
  id: CanonicalRoleId;
  name: string;
  category: 'Administração & Rede' | 'Gestão & Secretaria' | 'Corpo Pedagógico' | 'Apoio & Operacional' | 'Comunidade Escolar';
  scopeCategory: string;
  scopeAndLimits: string;
  canEdit: boolean;
  canApprove: boolean;
  canSign: boolean;
  canManageUsers: boolean;
  canExportCenso: boolean;
  allowedModules: string[];
  moduleCeilings: Record<string, { level: AccessLevel; matrixCode: string; details?: string }>;
  sampleUser: {
    name: string;
    cpf: string;
    password: string;
    email: string;
    roleTitle: string;
    school: string;
    ddz: string;
  };
}

export const ALL_CANONICAL_MODULES = [
  { id: 'visao-geral', name: 'Visão Geral', code: 'M0' },
  { id: 'gestao-alunos', name: 'Gestão de Alunos', code: 'M1' },
  { id: 'notas-frequencia', name: 'Notas e Frequência', code: 'M2' },
  { id: 'gestao-pedagogica', name: 'Gestão Pedagógica', code: 'M3' },
  { id: 'equipe-escolar', name: 'Equipe Escolar', code: 'M4' },
  { id: 'organizacao-escolar', name: 'Organização Escolar', code: 'M5' },
  { id: 'comunicacao-escolar', name: 'Comunicação Escolar', code: 'M6' },
  { id: 'atendimento-estudante', name: 'Atendimento ao Estudante', code: 'M7' },
  { id: 'biblioteca', name: 'Biblioteca', code: 'M8' },
  { id: 'patrimonio-manutencao', name: 'Patrimônio e Manutenção', code: 'M9' },
  { id: 'materiais-logistica', name: 'Materiais e Logística', code: 'M10' },
  { id: 'portaria-visitantes', name: 'Portaria e Visitantes', code: 'M11' },
  { id: 'administracao-sistema', name: 'Administração do Sistema', code: 'M12' },
  { id: 'paineis-relatorios', name: 'Painéis e Relatórios', code: 'M13' },
  { id: 'documentos-suporte', name: 'Documentos e Suporte', code: 'M14' },
  { id: 'financeiro-integracoes', name: 'Financeiro e Integrações', code: 'M15' },
];

export const RBAC_PROFILES: ProfileDefinition[] = [
  {
    id: 'admin-sistema',
    name: 'Administrador do Sistema',
    category: 'Administração & Rede',
    scopeCategory: 'Parâmetros globais e infraestrutura técnica',
    scopeAndLimits: 'Foco técnico: parâmetros globais, autenticação, segurança, integrações, versões, backup e restauração técnica, logs técnicos, resposta na Central de Ajuda. Não altera registro escolar administrativo ou pedagógico por iniciativa própria; só com necessidade técnica, autorização e registro em auditoria. Não cria escola nem Gestor(a), nem abre ano letivo (isso é do Assessor Técnico, salvo acúmulo de vínculos). Assina documentos técnicos quando habilitado.',
    canEdit: true,
    canApprove: false,
    canSign: true,
    canManageUsers: true,
    canExportCenso: false,
    allowedModules: ['visao-geral', 'administracao-sistema', 'documentos-suporte', 'financeiro-integracoes'],
    moduleCeilings: {
      'visao-geral': { level: 'TOTAL', matrixCode: 'VCE', details: 'Status técnico do servidor, infraestrutura e banco' },
      'gestao-alunos': { level: 'VEDADO', matrixCode: '—', details: 'Sem acesso a registro escolar administrativo' },
      'notas-frequencia': { level: 'VEDADO', matrixCode: '—', details: 'Sem acesso a diário pedagógico' },
      'gestao-pedagogica': { level: 'VEDADO', matrixCode: '—', details: 'Sem acesso pedagógico' },
      'equipe-escolar': { level: 'VEDADO', matrixCode: '—', details: 'Sem gestão de vínculos escolares' },
      'organizacao-escolar': { level: 'VEDADO', matrixCode: '—', details: 'Sem gestão acadêmica' },
      'comunicacao-escolar': { level: 'VEDADO', matrixCode: '—', details: 'Vedado' },
      'atendimento-estudante': { level: 'VEDADO', matrixCode: '—', details: 'Vedado' },
      'biblioteca': { level: 'VEDADO', matrixCode: '—', details: 'Vedado' },
      'patrimonio-manutencao': { level: 'VEDADO', matrixCode: '—', details: 'Vedado' },
      'materiais-logistica': { level: 'VEDADO', matrixCode: '—', details: 'Vedado' },
      'portaria-visitantes': { level: 'VEDADO', matrixCode: '—', details: 'Vedado' },
      'administracao-sistema': { level: 'TOTAL', matrixCode: 'VCE', details: 'M12: Parâmetros globais, segurança, logs técnicos e backups' },
      'paineis-relatorios': { level: 'VEDADO', matrixCode: '—', details: 'Vedado' },
      'documentos-suporte': { level: 'TOTAL', matrixCode: 'VCE', details: 'M14: Central de Ajuda, arquivos e suporte técnico' },
      'financeiro-integracoes': { level: 'PARCIAL', matrixCode: 'VE', details: 'M15: Integrações técnicas de rede e APIs governamentais' },
    },
    sampleUser: {
      name: 'Eng. Roberto Albuquerque',
      cpf: '000.111.222-33',
      password: 'Sigeon@Local2026',
      email: 'roberto.albuquerque@semed.manaus.am.gov.br',
      roleTitle: 'Administrador do Sistema (DTI SEMED)',
      school: 'E.M. Antonina Borges de Sá',
      ddz: 'Nível Central - DTI SEMED',
    },
  },
  {
    id: 'assessor-tecnico',
    name: 'Assessor Técnico',
    category: 'Administração & Rede',
    scopeCategory: 'Rede inteira SEMED Manaus',
    scopeAndLimits: 'Rede inteira. Exclusivo: criar e excluir escola, criar Gestor(a) e outro Assessor Técnico, consultar logs, executar e restaurar backup, exportar Educacenso/GOV.BR, abrir e fechar o ano letivo da rede, relatórios da rede, responder à Central de Ajuda, validar qualquer documento. Exceção: operações exclusivamente técnicas do Administrador do Sistema.',
    canEdit: true,
    canApprove: true,
    canSign: true,
    canManageUsers: true,
    canExportCenso: true,
    allowedModules: ['visao-geral', 'gestao-alunos', 'notas-frequencia', 'gestao-pedagogica', 'equipe-escolar', 'organizacao-escolar', 'comunicacao-escolar', 'atendimento-estudante', 'biblioteca', 'patrimonio-manutencao', 'materiais-logistica', 'portaria-visitantes', 'administracao-sistema', 'paineis-relatorios', 'documentos-suporte', 'financeiro-integracoes'],
    moduleCeilings: {
      'visao-geral': { level: 'TOTAL', matrixCode: 'VCEA', details: 'Visão consolidada de todas as unidades da rede municipal' },
      'gestao-alunos': { level: 'TOTAL', matrixCode: 'VCEA', details: 'M1: Acesso pleno em todas as unidades' },
      'notas-frequencia': { level: 'TOTAL', matrixCode: 'VCEA', details: 'M2: Validação de rendimento da rede' },
      'gestao-pedagogica': { level: 'TOTAL', matrixCode: 'VCEA', details: 'M3: Abertura e fechamento de ano letivo da rede' },
      'equipe-escolar': { level: 'TOTAL', matrixCode: 'VCEA', details: 'M4: Criação de Gestores e Assessores da rede' },
      'organizacao-escolar': { level: 'TOTAL', matrixCode: 'VCEA', details: 'M5: Criação e exclusão de escolas da rede' },
      'comunicacao-escolar': { level: 'TOTAL', matrixCode: 'VCEA', details: 'M6: Circulares e comunicados da rede' },
      'atendimento-estudante': { level: 'TOTAL', matrixCode: 'VCEA', details: 'M7: Supervisão de programas especiais' },
      'biblioteca': { level: 'TOTAL', matrixCode: 'VCEA', details: 'M8: Acervo global e estatísticas da rede' },
      'patrimonio-manutencao': { level: 'TOTAL', matrixCode: 'VCEA', details: 'M9: Inventário global da rede' },
      'materiais-logistica': { level: 'TOTAL', matrixCode: 'VCEA', details: 'M10: Logística de suprimentos e transporte escolar' },
      'portaria-visitantes': { level: 'TOTAL', matrixCode: 'VCEA', details: 'M11: Diretrizes de segurança escolar' },
      'administracao-sistema': { level: 'TOTAL', matrixCode: 'VCEA', details: 'M12: Exportação Educacenso/GOV.BR, logs e backups' },
      'paineis-relatorios': { level: 'TOTAL', matrixCode: 'VCEA', details: 'M13: Relatórios consolidados da rede inteira' },
      'documentos-suporte': { level: 'TOTAL', matrixCode: 'VCEA', details: 'M14: Validação de qualquer documento oficial' },
      'financeiro-integracoes': { level: 'TOTAL', matrixCode: 'VCEA', details: 'M15: Execução PDDE e convênios MEC' },
    },
    sampleUser: {
      name: 'Dr. Valter Silveira Lima',
      cpf: '111.444.777-35',
      password: 'Sigeon@Local2026',
      email: 'valter.lima@semed.manaus.am.gov.br',
      roleTitle: 'Assessor Técnico de Gestão da Rede',
      school: 'Todas as Unidades (Rede SEMED)',
      ddz: 'Gabinete SEMED Manaus',
    },
  },
  {
    id: 'gestor',
    name: 'Gestor(a)',
    category: 'Gestão & Secretaria',
    scopeCategory: 'Escola própria (E.M. Antonina Borges de Sá)',
    scopeAndLimits: 'Escola própria. Cadastra a equipe (Secretário(a), Téc. Administrativo(a), Pedagogo(a), Coordenador(a), Bibliotecário(a), Professor(a), Professor(a) de AEE, Funcionário(a), Estagiário(a)), turmas, grade e calendário; aprova e assina; desbloqueia usuários da escola; consulta o log da unidade. Não pode: excluir a própria escola, acessar outra escola, criar ou gerenciar Assessor Técnico, ver os logs completos da plataforma, executar backup global, exportar dados da rede, abrir ou fechar o ano letivo da rede.',
    canEdit: true,
    canApprove: true,
    canSign: true,
    canManageUsers: true,
    canExportCenso: false,
    allowedModules: ['visao-geral', 'gestao-alunos', 'notas-frequencia', 'gestao-pedagogica', 'equipe-escolar', 'organizacao-escolar', 'comunicacao-escolar', 'atendimento-estudante', 'biblioteca', 'patrimonio-manutencao', 'materiais-logistica', 'portaria-visitantes', 'administracao-sistema', 'paineis-relatorios', 'documentos-suporte', 'financeiro-integracoes'],
    moduleCeilings: {
      'visao-geral': { level: 'TOTAL', matrixCode: 'VCEA', details: 'Painel da escola própria com métricas e alertas' },
      'gestao-alunos': { level: 'TOTAL', matrixCode: 'VCEA', details: 'M1: Supervisão de matrículas e turmas' },
      'notas-frequencia': { level: 'TOTAL', matrixCode: 'VCEA', details: 'M2: Homologação de diários e fechamento' },
      'gestao-pedagogica': { level: 'TOTAL', matrixCode: 'VCEA', details: 'M3: Grade, calendário e conselho de classe' },
      'equipe-escolar': { level: 'PARCIAL', matrixCode: 'VCE', details: 'M4: Cadastra e desbloqueia equipe da escola' },
      'organizacao-escolar': { level: 'TOTAL', matrixCode: 'VCEA', details: 'M5: Organização de turmas e salas' },
      'comunicacao-escolar': { level: 'TOTAL', matrixCode: 'VCEA', details: 'M6: Comunicados e eventos da escola' },
      'atendimento-estudante': { level: 'TOTAL', matrixCode: 'VCEA', details: 'M7: Supervisão de AEE e Bolsa Família' },
      'biblioteca': { level: 'TOTAL', matrixCode: 'VCEA', details: 'M8: Acervo e projetos da escola' },
      'patrimonio-manutencao': { level: 'TOTAL', matrixCode: 'VCEA', details: 'M9: Bens e chamados de manutenção' },
      'materiais-logistica': { level: 'TOTAL', matrixCode: 'VCEA', details: 'M10: Suprimentos, merenda e transporte' },
      'portaria-visitantes': { level: 'TOTAL', matrixCode: 'VCEA', details: 'M11: Controle de acesso e visitantes' },
      'administracao-sistema': { level: 'PARCIAL', matrixCode: 'VCE', details: 'M12: Parâmetros e logs da própria escola' },
      'paineis-relatorios': { level: 'TOTAL', matrixCode: 'VCA', details: 'M13: 38 relatórios e indicadores da unidade' },
      'documentos-suporte': { level: 'TOTAL', matrixCode: 'VCEA', details: 'M14: Assinatura e chancela de documentos oficiais' },
      'financeiro-integracoes': { level: 'TOTAL', matrixCode: 'VCEA', details: 'M15: Gestão PDDE da escola' },
    },
    sampleUser: {
      name: 'Profa. Dra. Francisca Ribeiro',
      cpf: '529.982.247-25',
      password: 'Sigeon@Local2026',
      email: 'francisca.ribeiro@semed.manaus.am.gov.br',
      roleTitle: 'Gestora Escolar / Diretora',
      school: 'E.M. Antonina Borges de Sá',
      ddz: 'DDZ Leste II - SEMED Manaus',
    },
  },
  {
    id: 'auditor',
    name: 'Auditor(a)',
    category: 'Administração & Rede',
    scopeCategory: 'Somente leitura de toda a rede e apontamentos',
    scopeAndLimits: 'Somente leitura de registros, históricos, logs, movimentações e documentos; gera relatórios e apontamentos de auditoria e os assina. Não altera dado operacional, exclui, matricula, gerencia usuários nem administra financeiro.',
    canEdit: false,
    canApprove: false,
    canSign: true,
    canManageUsers: false,
    canExportCenso: false,
    allowedModules: ['visao-geral', 'gestao-alunos', 'notas-frequencia', 'gestao-pedagogica', 'equipe-escolar', 'organizacao-escolar', 'comunicacao-escolar', 'atendimento-estudante', 'biblioteca', 'patrimonio-manutencao', 'materiais-logistica', 'portaria-visitantes', 'administracao-sistema', 'paineis-relatorios', 'documentos-suporte', 'financeiro-integracoes'],
    moduleCeilings: {
      'visao-geral': { level: 'LEITURA', matrixCode: 'V', details: 'Inspeção de métricas de conformidade' },
      'gestao-alunos': { level: 'LEITURA', matrixCode: 'V', details: 'M1: Auditoria de matrículas e movimentações' },
      'notas-frequencia': { level: 'LEITURA', matrixCode: 'V', details: 'M2: Auditoria de diários e fechamentos' },
      'gestao-pedagogica': { level: 'LEITURA', matrixCode: 'V', details: 'M3: Verificação de cumprimento do calendário' },
      'equipe-escolar': { level: 'LEITURA', matrixCode: 'V', details: 'M4: Auditoria de lotação e folha de ponto' },
      'organizacao-escolar': { level: 'LEITURA', matrixCode: 'V', details: 'M5: Vistoria física de salas e turmas' },
      'comunicacao-escolar': { level: 'LEITURA', matrixCode: 'V', details: 'M6: Inspeção de comunicados e atas' },
      'atendimento-estudante': { level: 'LEITURA', matrixCode: 'V', details: 'M7: Auditoria de Bolsa Família e AEE' },
      'biblioteca': { level: 'LEITURA', matrixCode: 'V', details: 'M8: Auditoria de acervo e patrimônio' },
      'patrimonio-manutencao': { level: 'LEITURA', matrixCode: 'V', details: 'M9: Auditoria de bens e tombamentos' },
      'materiais-logistica': { level: 'LEITURA', matrixCode: 'V', details: 'M10: Auditoria de estoque e transporte escolar' },
      'portaria-visitantes': { level: 'LEITURA', matrixCode: 'V', details: 'M11: Auditoria de registros de portaria' },
      'administracao-sistema': { level: 'LEITURA', matrixCode: 'V', details: 'M12: Consulta aos logs de auditoria' },
      'paineis-relatorios': { level: 'PARCIAL', matrixCode: 'VC', details: 'M13: Geração e assinatura de relatórios de auditoria' },
      'documentos-suporte': { level: 'LEITURA', matrixCode: 'V', details: 'M14: Validação de autenticidade documental' },
      'financeiro-integracoes': { level: 'LEITURA', matrixCode: 'V', details: 'M15: Prestação de contas PDDE' },
    },
    sampleUser: {
      name: 'Auditor Marcos Brandão',
      cpf: '222.333.444-55',
      password: 'Sigeon@Local2026',
      email: 'marcos.brandao@controladoria.manaus.am.gov.br',
      roleTitle: 'Auditor Fiscal Educacional',
      school: 'Todas as Unidades (Auditoria)',
      ddz: 'Controladoria Geral do Município',
    },
  },
  {
    id: 'secretario',
    name: 'Secretário(a) Escolar',
    category: 'Gestão & Secretaria',
    scopeCategory: 'Escola própria (Vida escolar & documentação)',
    scopeAndLimits: 'Escola própria. Cadastra e movimenta aluno, responsável, matrícula e transferência; defere matrícula; gera comprovante, declarações, histórico e certificados. Em frequência edita (com justificativa); em notas é somente leitura ("alterar notas sem autorização específica" é vedado). Não aprova plano de aula, gerencia usuários e permissões globais, ano letivo, PDDE/financeiro, logs, backup nem Educacenso, e não exclui Gestor(a) ou Assessor Técnico. Células de M9, M10 e M11 seguem o Anexo B (parcial) — pendência 8.',
    canEdit: true,
    canApprove: true,
    canSign: true,
    canManageUsers: false,
    canExportCenso: false,
    allowedModules: ['visao-geral', 'gestao-alunos', 'notas-frequencia', 'equipe-escolar', 'organizacao-escolar', 'comunicacao-escolar', 'atendimento-estudante', 'biblioteca', 'patrimonio-manutencao', 'materiais-logistica', 'portaria-visitantes', 'paineis-relatorios', 'documentos-suporte'],
    moduleCeilings: {
      'visao-geral': { level: 'LEITURA', matrixCode: 'V', details: 'Visão de matrículas e fluxo da secretaria' },
      'gestao-alunos': { level: 'TOTAL', matrixCode: 'VCEA', details: 'M1: Cadastra, movimenta, defere, transfere e emite certificados' },
      'notas-frequencia': { level: 'PARCIAL', matrixCode: 'VE', details: 'M2: Frequência edita (c/ justificativa); notas somente leitura' },
      'gestao-pedagogica': { level: 'VEDADO', matrixCode: '—', details: 'M3: Sem aprovação de planos de aula' },
      'equipe-escolar': { level: 'PARCIAL', matrixCode: 'VE', details: 'M4: Apoio cadastral da equipe' },
      'organizacao-escolar': { level: 'PARCIAL', matrixCode: 'VE', details: 'M5: Apoio na organização de salas e turmas' },
      'comunicacao-escolar': { level: 'PARCIAL', matrixCode: 'VE', details: 'M6: Avisos oficiais da secretaria' },
      'atendimento-estudante': { level: 'TOTAL', matrixCode: 'VCEA', details: 'M7: Atestados médicos e declarações' },
      'biblioteca': { level: 'PARCIAL', matrixCode: 'VE', details: 'M8: Apoio cadastral' },
      'patrimonio-manutencao': { level: 'PARCIAL', matrixCode: 'VE', details: 'M9: Abertura e registro de chamados' },
      'materiais-logistica': { level: 'PARCIAL', matrixCode: 'VE', details: 'M10: Declarações para transporte escolar' },
      'portaria-visitantes': { level: 'PARCIAL', matrixCode: 'VCE', details: 'M11: Triagem na secretaria e portaria' },
      'administracao-sistema': { level: 'VEDADO', matrixCode: '—', details: 'M12: Vedado' },
      'paineis-relatorios': { level: 'PARCIAL', matrixCode: 'VC', details: 'M13: Relatórios de evasão e matrícula' },
      'documentos-suporte': { level: 'TOTAL', matrixCode: 'VCE', details: 'M14: Emissão e assinatura de declarações e certidões' },
      'financeiro-integracoes': { level: 'VEDADO', matrixCode: '—', details: 'M15: Vedado' },
    },
    sampleUser: {
      name: 'Ana Cláudia Vasconcelos',
      cpf: '390.533.447-05',
      password: 'Sigeon@Local2026',
      email: 'ana.vasconcelos@semed.manaus.am.gov.br',
      roleTitle: 'Secretária Escolar',
      school: 'E.M. Antonina Borges de Sá',
      ddz: 'DDZ Leste II - SEMED Manaus',
    },
  },
  {
    id: 'coordenador-pedagogico',
    name: 'Coordenador(a) Pedagógico(a)',
    category: 'Corpo Pedagógico',
    scopeCategory: 'Escola e turmas sob sua coordenação',
    scopeAndLimits: 'Escola e turmas sob sua coordenação. Valida planejamento docente, frequência e rendimento; registra acompanhamento, orientações, reuniões e atividades. Não cadastra ou exclui usuário, aluno, financeiro/PDDE, estoque, patrimônio, transporte, nem gerencia ano letivo, backup ou logs.',
    canEdit: true,
    canApprove: true,
    canSign: false,
    canManageUsers: false,
    canExportCenso: false,
    allowedModules: ['visao-geral', 'gestao-alunos', 'notas-frequencia', 'gestao-pedagogica', 'equipe-escolar', 'organizacao-escolar', 'comunicacao-escolar', 'atendimento-estudante', 'paineis-relatorios', 'documentos-suporte'],
    moduleCeilings: {
      'visao-geral': { level: 'LEITURA', matrixCode: 'V', details: 'Indicadores pedagógicos das turmas coordenadas' },
      'gestao-alunos': { level: 'LEITURA', matrixCode: 'V', details: 'M1: Consulta a dados pedagógicos dos discentes' },
      'notas-frequencia': { level: 'PARCIAL', matrixCode: 'VA', details: 'M2: Validação de planejamento e rendimento' },
      'gestao-pedagogica': { level: 'TOTAL', matrixCode: 'VCEA', details: 'M3: Planejamento, reuniões e acompanhamento docente' },
      'equipe-escolar': { level: 'LEITURA', matrixCode: 'V', details: 'M4: Docentes das turmas coordenadas' },
      'organizacao-escolar': { level: 'LEITURA', matrixCode: 'V', details: 'M5: Quadro de horários e salas' },
      'comunicacao-escolar': { level: 'PARCIAL', matrixCode: 'VCE', details: 'M6: Orientações pedagógicas e reuniões' },
      'atendimento-estudante': { level: 'PARCIAL', matrixCode: 'VCE', details: 'M7: Reforço e acompanhamento psicopedagógico' },
      'biblioteca': { level: 'VEDADO', matrixCode: '—', details: 'M8: Vedado' },
      'patrimonio-manutencao': { level: 'VEDADO', matrixCode: '—', details: 'M9: Vedado' },
      'materiais-logistica': { level: 'VEDADO', matrixCode: '—', details: 'M10: Vedado' },
      'portaria-visitantes': { level: 'VEDADO', matrixCode: '—', details: 'M11: Vedado' },
      'administracao-sistema': { level: 'VEDADO', matrixCode: '—', details: 'M12: Vedado' },
      'paineis-relatorios': { level: 'PARCIAL', matrixCode: 'VC', details: 'M13: Rendimento por turma e IDEB' },
      'documentos-suporte': { level: 'PARCIAL', matrixCode: 'VCA', details: 'M14: Pareceres pedagógicos e atas' },
      'financeiro-integracoes': { level: 'VEDADO', matrixCode: '—', details: 'M15: Vedado' },
    },
    sampleUser: {
      name: 'Profa. Márcia Helena Sampaio',
      cpf: '333.444.555-66',
      password: 'Sigeon@Local2026',
      email: 'marcia.sampaio@semed.manaus.am.gov.br',
      roleTitle: 'Coordenadora Pedagógica (Anos Iniciais)',
      school: 'E.M. Antonina Borges de Sá',
      ddz: 'DDZ Leste II - SEMED Manaus',
    },
  },
  {
    id: 'pedagogo',
    name: 'Pedagogo(a)',
    category: 'Corpo Pedagógico',
    scopeCategory: 'Escola própria (Regência & Mediação)',
    scopeAndLimits: 'Escola própria. Aprova e reprova plano de aula e conteúdo; corrige nota e frequência quando o Professor(a) erra (com justificativa); libera lançamento fora do bimestre aberto; gerencia ocorrências, conselho de classe, reuniões, atividades extracurriculares, conselho escolar/APM, comunicados e calendário. Não cadastra aluno ou usuário, nem acessa financeiro, estoque, patrimônio, transporte, ano letivo, logs ou backup.',
    canEdit: true,
    canApprove: true,
    canSign: true,
    canManageUsers: false,
    canExportCenso: false,
    allowedModules: ['visao-geral', 'gestao-alunos', 'notas-frequencia', 'gestao-pedagogica', 'equipe-escolar', 'organizacao-escolar', 'comunicacao-escolar', 'atendimento-estudante', 'paineis-relatorios', 'documentos-suporte'],
    moduleCeilings: {
      'visao-geral': { level: 'LEITURA', matrixCode: 'V', details: 'Indicadores pedagógicos da unidade' },
      'gestao-alunos': { level: 'PARCIAL', matrixCode: 'VCE', details: 'M1: Intervenções pedagógicas e ocorrências' },
      'notas-frequencia': { level: 'TOTAL', matrixCode: 'VEA', details: 'M2: Correção de notas com justificativa e liberação de bimestre' },
      'gestao-pedagogica': { level: 'TOTAL', matrixCode: 'VCEA', details: 'M3: Aprova/reprova planos, conselho de classe e calendário' },
      'equipe-escolar': { level: 'LEITURA', matrixCode: 'V', details: 'M4: Docentes regentes da escola' },
      'organizacao-escolar': { level: 'PARCIAL', matrixCode: 'VCE', details: 'M5: Grade horária e matriz de turmas' },
      'comunicacao-escolar': { level: 'PARCIAL', matrixCode: 'VCE', details: 'M6: Gestão de ocorrências, reuniões e APM' },
      'atendimento-estudante': { level: 'PARCIAL', matrixCode: 'VCE', details: 'M7: Articulação com AEE e busca ativa' },
      'biblioteca': { level: 'VEDADO', matrixCode: '—', details: 'M8: Vedado' },
      'patrimonio-manutencao': { level: 'VEDADO', matrixCode: '—', details: 'M9: Vedado' },
      'materiais-logistica': { level: 'VEDADO', matrixCode: '—', details: 'M10: Vedado' },
      'portaria-visitantes': { level: 'VEDADO', matrixCode: '—', details: 'M11: Vedado' },
      'administracao-sistema': { level: 'VEDADO', matrixCode: '—', details: 'M12: Vedado' },
      'paineis-relatorios': { level: 'PARCIAL', matrixCode: 'VCA', details: 'M13: Diagnóstico de alfabetização e IDEB' },
      'documentos-suporte': { level: 'PARCIAL', matrixCode: 'VCA', details: 'M14: Atas de conselho de classe' },
      'financeiro-integracoes': { level: 'VEDADO', matrixCode: '—', details: 'M15: Vedado' },
    },
    sampleUser: {
      name: 'Pedagoga Luciana Matos',
      cpf: '123.456.789-09',
      password: 'Sigeon@Local2026',
      email: 'luciana.matos@semed.manaus.am.gov.br',
      roleTitle: 'Pedagoga Escolar',
      school: 'E.M. Antonina Borges de Sá',
      ddz: 'DDZ Leste II - SEMED Manaus',
    },
  },
  {
    id: 'professor-aee',
    name: 'Professor(a) de AEE',
    category: 'Corpo Pedagógico',
    scopeCategory: 'Somente alunos atendidos (Educação Especial)',
    scopeAndLimits: 'Somente alunos atendidos. Registra atendimento, acompanhamento, estratégias e relatórios do AEE. Não altera nota ou frequência de outro profissional, nem matrícula, usuários, financeiro ou configurações.',
    canEdit: true,
    canApprove: false,
    canSign: false,
    canManageUsers: false,
    canExportCenso: false,
    allowedModules: ['visao-geral', 'gestao-alunos', 'notas-frequencia', 'gestao-pedagogica', 'organizacao-escolar', 'atendimento-estudante', 'paineis-relatorios', 'documentos-suporte'],
    moduleCeilings: {
      'visao-geral': { level: 'LEITURA', matrixCode: 'V', details: 'Resumo da sala de recursos multifuncionais' },
      'gestao-alunos': { level: 'LEITURA', matrixCode: 'V (a)', details: 'M1: Somente alunos atendidos pelo AEE' },
      'notas-frequencia': { level: 'LEITURA', matrixCode: 'V (a)', details: 'M2: Consulta de rendimento dos atendidos' },
      'gestao-pedagogica': { level: 'LEITURA', matrixCode: 'V (a)', details: 'M3: Planos de Desenvolvimento Individual' },
      'equipe-escolar': { level: 'VEDADO', matrixCode: '—', details: 'M4: Vedado' },
      'organizacao-escolar': { level: 'LEITURA', matrixCode: 'V', details: 'M5: Horários e salas de recursos' },
      'comunicacao-escolar': { level: 'VEDADO', matrixCode: '—', details: 'M6: Vedado' },
      'atendimento-estudante': { level: 'TOTAL', matrixCode: 'VCE (a)', details: 'M7: Registra atendimento, estratégias e relatórios de AEE' },
      'biblioteca': { level: 'VEDADO', matrixCode: '—', details: 'M8: Vedado' },
      'patrimonio-manutencao': { level: 'VEDADO', matrixCode: '—', details: 'M9: Vedado' },
      'materiais-logistica': { level: 'VEDADO', matrixCode: '—', details: 'M10: Vedado' },
      'portaria-visitantes': { level: 'VEDADO', matrixCode: '—', details: 'M11: Vedado' },
      'administracao-sistema': { level: 'VEDADO', matrixCode: '—', details: 'M12: Vedado' },
      'paineis-relatorios': { level: 'PARCIAL', matrixCode: 'VC (a)', details: 'M13: Relatórios individuais de desenvolvimento' },
      'documentos-suporte': { level: 'PARCIAL', matrixCode: 'VCA (a)', details: 'M14: Pareceres de atendimento especializado' },
      'financeiro-integracoes': { level: 'VEDADO', matrixCode: '—', details: 'M15: Vedado' },
    },
    sampleUser: {
      name: 'Profa. Danielle Peixoto',
      cpf: '555.666.777-88',
      password: 'Sigeon@Local2026',
      email: 'danielle.peixoto@semed.manaus.am.gov.br',
      roleTitle: 'Professora de AEE (Sala de Recursos)',
      school: 'E.M. Antonina Borges de Sá',
      ddz: 'DDZ Leste II - SEMED Manaus',
    },
  },
  {
    id: 'professor',
    name: 'Professor(a)',
    category: 'Corpo Pedagógico',
    scopeCategory: 'Somente suas turmas e disciplinas',
    scopeAndLimits: 'Somente suas turmas e disciplinas. Lança plano, conteúdo, nota, frequência, prova e ocorrência da própria turma; comunicados da turma. Não aprova o próprio plano (competência do Pedagogo(a)); não edita dados cadastrais do aluno, matrícula, transferência, histórico, financeiro nem configurações. Alterar nota ou frequência após o fechamento depende do Pedagogo(a).',
    canEdit: true,
    canApprove: false,
    canSign: false,
    canManageUsers: false,
    canExportCenso: false,
    allowedModules: ['visao-geral', 'gestao-alunos', 'notas-frequencia', 'gestao-pedagogica', 'organizacao-escolar', 'comunicacao-escolar', 'paineis-relatorios', 'documentos-suporte'],
    moduleCeilings: {
      'visao-geral': { level: 'LEITURA', matrixCode: 'V (t)', details: 'Resumo das turmas atribuídas' },
      'gestao-alunos': { level: 'PARCIAL', matrixCode: 'VCE (t)', details: 'M1: Visualização e ocorrências de sua turma' },
      'notas-frequencia': { level: 'PARCIAL', matrixCode: 'VCE (t)', details: 'M2: Notas bimestrais e chamada diária de suas turmas' },
      'gestao-pedagogica': { level: 'PARCIAL', matrixCode: 'VCE (t)', details: 'M3: Submissão de planos de aula e conteúdo ministrado' },
      'equipe-escolar': { level: 'VEDADO', matrixCode: '—', details: 'M4: Vedado' },
      'organizacao-escolar': { level: 'LEITURA', matrixCode: 'V (t)', details: 'M5: Horários de aula de suas turmas' },
      'comunicacao-escolar': { level: 'PARCIAL', matrixCode: 'VCE (t)', details: 'M6: Comunicados para suas turmas' },
      'atendimento-estudante': { level: 'VEDADO', matrixCode: '—', details: 'M7: Vedado' },
      'biblioteca': { level: 'VEDADO', matrixCode: '—', details: 'M8: Vedado' },
      'patrimonio-manutencao': { level: 'VEDADO', matrixCode: '—', details: 'M9: Vedado' },
      'materiais-logistica': { level: 'VEDADO', matrixCode: '—', details: 'M10: Vedado' },
      'portaria-visitantes': { level: 'VEDADO', matrixCode: '—', details: 'M11: Vedado' },
      'administracao-sistema': { level: 'VEDADO', matrixCode: '—', details: 'M12: Vedado' },
      'paineis-relatorios': { level: 'PARCIAL', matrixCode: 'VC (t)', details: 'M13: Rendimento de suas turmas' },
      'documentos-suporte': { level: 'PARCIAL', matrixCode: 'VCA (t)', details: 'M14: Diário de classe assinado pelo professor' },
      'financeiro-integracoes': { level: 'VEDADO', matrixCode: '—', details: 'M15: Vedado' },
    },
    sampleUser: {
      name: 'Prof. Carlos Eduardo Siqueira',
      cpf: '168.995.350-09',
      password: 'Sigeon@Local2026',
      email: 'carlos.siqueira@semed.manaus.am.gov.br',
      roleTitle: 'Professor Regente (5º Ano A)',
      school: 'E.M. Antonina Borges de Sá',
      ddz: 'DDZ Leste II - SEMED Manaus',
    },
  },
  {
    id: 'tecnico-administrativo',
    name: 'Técnico(a) Administrativo(a)',
    category: 'Apoio & Operacional',
    scopeCategory: 'Escola própria, sob supervisão',
    scopeAndLimits: 'Escola própria, sob supervisão. Atendimento ao público, organização documental, registros administrativos e protocolos liberados pela secretaria. Não lança nota, aprova plano, gerencia usuários, ano letivo, financeiro/PDDE, logs ou backup, nem altera registro pedagógico restrito. Deferir, transferir e assinar ficam com o Secretário(a) ou o Gestor(a); assina registro operacional só quando autorizado.',
    canEdit: true,
    canApprove: false,
    canSign: false,
    canManageUsers: false,
    canExportCenso: false,
    allowedModules: ['visao-geral', 'gestao-alunos', 'documentos-suporte'],
    moduleCeilings: {
      'visao-geral': { level: 'LEITURA', matrixCode: 'V', details: 'Atendimento e fluxo da secretaria' },
      'gestao-alunos': { level: 'PARCIAL', matrixCode: 'VCE', details: 'M1: Triagem, protocolo e organização de fichas' },
      'notas-frequencia': { level: 'VEDADO', matrixCode: '—', details: 'M2: Vedado lançar notas ou alterar avaliações' },
      'gestao-pedagogica': { level: 'VEDADO', matrixCode: '—', details: 'M3: Vedado' },
      'equipe-escolar': { level: 'VEDADO', matrixCode: '—', details: 'M4: Vedado' },
      'organizacao-escolar': { level: 'VEDADO', matrixCode: '—', details: 'M5: Vedado' },
      'comunicacao-escolar': { level: 'VEDADO', matrixCode: '—', details: 'M6: Vedado' },
      'atendimento-estudante': { level: 'VEDADO', matrixCode: '—', details: 'M7: Vedado' },
      'biblioteca': { level: 'VEDADO', matrixCode: '—', details: 'M8: Vedado' },
      'patrimonio-manutencao': { level: 'VEDADO', matrixCode: '—', details: 'M9: Vedado' },
      'materiais-logistica': { level: 'VEDADO', matrixCode: '—', details: 'M10: Vedado' },
      'portaria-visitantes': { level: 'VEDADO', matrixCode: '—', details: 'M11: Vedado' },
      'administracao-sistema': { level: 'VEDADO', matrixCode: '—', details: 'M12: Vedado' },
      'paineis-relatorios': { level: 'VEDADO', matrixCode: '—', details: 'M13: Vedado' },
      'documentos-suporte': { level: 'PARCIAL', matrixCode: 'VCE', details: 'M14: Protocolos e certidões autorizadas' },
      'financeiro-integracoes': { level: 'VEDADO', matrixCode: '—', details: 'M15: Vedado' },
    },
    sampleUser: {
      name: 'Fabiana Castelo Branco',
      cpf: '666.777.888-99',
      password: 'Sigeon@Local2026',
      email: 'fabiana.branco@semed.manaus.am.gov.br',
      roleTitle: 'Técnica Administrativa de Secretaria',
      school: 'E.M. Antonina Borges de Sá',
      ddz: 'DDZ Leste II - SEMED Manaus',
    },
  },
  {
    id: 'inspetor',
    name: 'Inspetor(a) Escolar',
    category: 'Apoio & Operacional',
    scopeCategory: 'Escola própria (ou escolas designadas)',
    scopeAndLimits: 'Escola própria (ou escolas designadas). Registra ocorrência, entrada e saída, circulação e comunica a gestão. Não lança nota, altera frequência acadêmica, aprova plano, matricula, altera histórico, acessa financeiro, gerencia usuários nem exclui registro.',
    canEdit: true,
    canApprove: false,
    canSign: false,
    canManageUsers: false,
    canExportCenso: false,
    allowedModules: ['visao-geral', 'gestao-alunos', 'organizacao-escolar', 'comunicacao-escolar', 'portaria-visitantes', 'paineis-relatorios', 'documentos-suporte'],
    moduleCeilings: {
      'visao-geral': { level: 'LEITURA', matrixCode: 'V', details: 'Fluxo e movimentação de pátio' },
      'gestao-alunos': { level: 'PARCIAL', matrixCode: 'VCE', details: 'M1: Consulta nominal e ocorrências de disciplina' },
      'notas-frequencia': { level: 'VEDADO', matrixCode: '—', details: 'M2: Vedado' },
      'gestao-pedagogica': { level: 'VEDADO', matrixCode: '—', details: 'M3: Vedado' },
      'equipe-escolar': { level: 'VEDADO', matrixCode: '—', details: 'M4: Vedado' },
      'organizacao-escolar': { level: 'LEITURA', matrixCode: 'V', details: 'M5: Localização de salas e turmas' },
      'comunicacao-escolar': { level: 'LEITURA', matrixCode: 'V', details: 'M6: Avisos e comunicados da escola' },
      'atendimento-estudante': { level: 'VEDADO', matrixCode: '—', details: 'M7: Vedado' },
      'biblioteca': { level: 'VEDADO', matrixCode: '—', details: 'M8: Vedado' },
      'patrimonio-manutencao': { level: 'VEDADO', matrixCode: '—', details: 'M9: Vedado' },
      'materiais-logistica': { level: 'VEDADO', matrixCode: '—', details: 'M10: Vedado' },
      'portaria-visitantes': { level: 'TOTAL', matrixCode: 'VCE', details: 'M11: Entrada e saída de visitantes, documentos e crachás' },
      'administracao-sistema': { level: 'VEDADO', matrixCode: '—', details: 'M12: Vedado' },
      'paineis-relatorios': { level: 'LEITURA', matrixCode: 'V', details: 'M13: Relatórios de ocorrências' },
      'documentos-suporte': { level: 'PARCIAL', matrixCode: 'VC', details: 'M14: Registros de circulação' },
      'financeiro-integracoes': { level: 'VEDADO', matrixCode: '—', details: 'M15: Vedado' },
    },
    sampleUser: {
      name: 'Raimundo Nonato Farias',
      cpf: '777.888.999-00',
      password: 'Sigeon@Local2026',
      email: 'raimundo.farias@semed.manaus.am.gov.br',
      roleTitle: 'Inspetor Escolar de Alunos',
      school: 'E.M. Antonina Borges de Sá',
      ddz: 'DDZ Leste II - SEMED Manaus',
    },
  },
  {
    id: 'bibliotecario',
    name: 'Bibliotecário(a)',
    category: 'Apoio & Operacional',
    scopeCategory: 'Somente o módulo Biblioteca (M8)',
    scopeAndLimits: 'Somente o módulo M8. Em alunos, professores e turmas vê apenas nome e turma, só para vincular empréstimo. Todo o resto do sistema é vedado.',
    canEdit: true,
    canApprove: false,
    canSign: false,
    canManageUsers: false,
    canExportCenso: false,
    allowedModules: ['visao-geral', 'gestao-alunos', 'biblioteca', 'paineis-relatorios', 'documentos-suporte'],
    moduleCeilings: {
      'visao-geral': { level: 'LEITURA', matrixCode: 'V', details: 'Métricas da biblioteca e empréstimos' },
      'gestao-alunos': { level: 'LEITURA', matrixCode: 'V', details: 'M1: Vê apenas nome e turma para vincular empréstimo' },
      'notas-frequencia': { level: 'VEDADO', matrixCode: '—', details: 'M2: Vedado' },
      'gestao-pedagogica': { level: 'VEDADO', matrixCode: '—', details: 'M3: Vedado' },
      'equipe-escolar': { level: 'VEDADO', matrixCode: '—', details: 'M4: Vedado' },
      'organizacao-escolar': { level: 'VEDADO', matrixCode: '—', details: 'M5: Vedado' },
      'comunicacao-escolar': { level: 'VEDADO', matrixCode: '—', details: 'M6: Vedado' },
      'atendimento-estudante': { level: 'VEDADO', matrixCode: '—', details: 'M7: Vedado' },
      'biblioteca': { level: 'TOTAL', matrixCode: 'VCE', details: 'M8: Acervo, empréstimo, devolução, reserva e multas' },
      'patrimonio-manutencao': { level: 'VEDADO', matrixCode: '—', details: 'M9: Vedado' },
      'materiais-logistica': { level: 'VEDADO', matrixCode: '—', details: 'M10: Vedado' },
      'portaria-visitantes': { level: 'VEDADO', matrixCode: '—', details: 'M11: Vedado' },
      'administracao-sistema': { level: 'VEDADO', matrixCode: '—', details: 'M12: Vedado' },
      'paineis-relatorios': { level: 'PARCIAL', matrixCode: 'VC', details: 'M13: Relatórios de circulação do acervo' },
      'documentos-suporte': { level: 'PARCIAL', matrixCode: 'VCA', details: 'M14: Recibos e comprovantes de devolução' },
      'financeiro-integracoes': { level: 'VEDADO', matrixCode: '—', details: 'M15: Vedado' },
    },
    sampleUser: {
      name: 'Clarice Lispector Maciel',
      cpf: '246.813.579-28',
      password: 'Sigeon@Local2026',
      email: 'clarice.maciel@semed.manaus.am.gov.br',
      roleTitle: 'Bibliotecária Escolar',
      school: 'E.M. Antonina Borges de Sá',
      ddz: 'DDZ Leste II - SEMED Manaus',
    },
  },
  {
    id: 'funcionario',
    name: 'Funcionário(a)',
    category: 'Apoio & Operacional',
    scopeCategory: 'Depende da função operacional designada',
    scopeAndLimits: 'Depende da função. Agente de portaria: cadastra e gerencia visitantes e vê comunicados. Auxiliar de serviços gerais, merendeiro(a), banheirista e apoio escolar: cardápio, calendário, comunicados, eventos e o próprio cadastro. Apoio administrativo: vê alunos e turmas, auxilia no lançamento de frequência quando autorizado, gerencia visitantes e abre chamado de manutenção. Vedado ao perfil: lançar ou alterar nota, consultar boletim (salvo autorização expressa), financeiro, usuários, permissões e excluir.',
    canEdit: true,
    canApprove: false,
    canSign: false,
    canManageUsers: false,
    canExportCenso: false,
    allowedModules: ['visao-geral', 'gestao-alunos', 'notas-frequencia', 'equipe-escolar', 'organizacao-escolar', 'comunicacao-escolar', 'patrimonio-manutencao', 'materiais-logistica', 'portaria-visitantes'],
    moduleCeilings: {
      'visao-geral': { level: 'LEITURA', matrixCode: 'V', details: 'Rotinas do dia' },
      'gestao-alunos': { level: 'LEITURA', matrixCode: 'V', details: 'M1: Consulta de alunos se apoio administrativo' },
      'notas-frequencia': { level: 'PARCIAL', matrixCode: 'VC', details: 'M2: Auxilia no lançamento de frequência se autorizado' },
      'gestao-pedagogica': { level: 'VEDADO', matrixCode: '—', details: 'M3: Vedado' },
      'equipe-escolar': { level: 'LEITURA', matrixCode: 'V (p)', details: 'M4: Consulta do próprio cadastro' },
      'organizacao-escolar': { level: 'LEITURA', matrixCode: 'V', details: 'M5: Calendário e eventos da escola' },
      'comunicacao-escolar': { level: 'LEITURA', matrixCode: 'V', details: 'M6: Leitura de comunicados internos' },
      'atendimento-estudante': { level: 'VEDADO', matrixCode: '—', details: 'M7: Vedado' },
      'biblioteca': { level: 'VEDADO', matrixCode: '—', details: 'M8: Vedado' },
      'patrimonio-manutencao': { level: 'PARCIAL', matrixCode: 'VC', details: 'M9: Abertura de chamados de manutenção' },
      'materiais-logistica': { level: 'LEITURA', matrixCode: 'V', details: 'M10: Cardápio e estoque de merenda' },
      'portaria-visitantes': { level: 'PARCIAL', matrixCode: 'VCE', details: 'M11: Cadastro de visitantes se portaria' },
      'administracao-sistema': { level: 'VEDADO', matrixCode: '—', details: 'M12: Vedado' },
      'paineis-relatorios': { level: 'VEDADO', matrixCode: '—', details: 'M13: Vedado' },
      'documentos-suporte': { level: 'VEDADO', matrixCode: '—', details: 'M14: Vedado' },
      'financeiro-integracoes': { level: 'VEDADO', matrixCode: '—', details: 'M15: Vedado' },
    },
    sampleUser: {
      name: 'Maria das Graças Carvalho',
      cpf: '999.000.111-22',
      password: 'Sigeon@Local2026',
      email: 'gracas.carvalho@semed.manaus.am.gov.br',
      roleTitle: 'Funcionária de Apoio / Merendeira',
      school: 'E.M. Antonina Borges de Sá',
      ddz: 'DDZ Leste II - SEMED Manaus',
    },
  },
  {
    id: 'estagiario',
    name: 'Estagiário(a)',
    category: 'Apoio & Operacional',
    scopeCategory: 'Somente módulos definidos sob supervisão',
    scopeAndLimits: 'Somente módulos e funções definidos pelo Gestor(a) ou pelo supervisor, dentro do escopo de supervisão. Não administra usuários, altera permissões, lança nota, aprova documento, altera matrícula, executa transferência, acessa financeiro, logs completos nem operações críticas; sem assinatura.',
    canEdit: false,
    canApprove: false,
    canSign: false,
    canManageUsers: false,
    canExportCenso: false,
    allowedModules: ['visao-geral', 'gestao-alunos', 'notas-frequencia', 'gestao-pedagogica', 'equipe-escolar', 'organizacao-escolar', 'comunicacao-escolar', 'atendimento-estudante', 'biblioteca', 'patrimonio-manutencao', 'materiais-logistica', 'portaria-visitantes', 'paineis-relatorios', 'documentos-suporte'],
    moduleCeilings: {
      'visao-geral': { level: 'LEITURA', matrixCode: '†', details: 'Acesso variável sob supervisão' },
      'gestao-alunos': { level: 'LEITURA', matrixCode: '†', details: 'M1: Auxílio cadastral sob supervisão' },
      'notas-frequencia': { level: 'VEDADO', matrixCode: '†', details: 'M2: Vedado lançar notas' },
      'gestao-pedagogica': { level: 'VEDADO', matrixCode: '†', details: 'M3: Vedado' },
      'equipe-escolar': { level: 'VEDADO', matrixCode: '†', details: 'M4: Vedado' },
      'organizacao-escolar': { level: 'LEITURA', matrixCode: '†', details: 'M5: Consulta de horários' },
      'comunicacao-escolar': { level: 'LEITURA', matrixCode: '†', details: 'M6: Leitura de comunicados' },
      'atendimento-estudante': { level: 'VEDADO', matrixCode: '†', details: 'M7: Vedado' },
      'biblioteca': { level: 'LEITURA', matrixCode: '†', details: 'M8: Apoio à biblioteca se designado' },
      'patrimonio-manutencao': { level: 'LEITURA', matrixCode: '†', details: 'M9: Apoio sob supervisão' },
      'materiais-logistica': { level: 'LEITURA', matrixCode: '†', details: 'M10: Apoio sob supervisão' },
      'portaria-visitantes': { level: 'LEITURA', matrixCode: '†', details: 'M11: Apoio sob supervisão' },
      'administracao-sistema': { level: 'VEDADO', matrixCode: '—', details: 'M12: Vedado' },
      'paineis-relatorios': { level: 'VEDADO', matrixCode: '†', details: 'M13: Vedado' },
      'documentos-suporte': { level: 'LEITURA', matrixCode: '†', details: 'M14: Sem assinatura' },
      'financeiro-integracoes': { level: 'VEDADO', matrixCode: '—', details: 'M15: Vedado' },
    },
    sampleUser: {
      name: 'Lucas Gabriel Pinheiro',
      cpf: '012.345.678-90',
      password: 'Sigeon@Local2026',
      email: 'lucas.pinheiro@estagio.manaus.am.gov.br',
      roleTitle: 'Estagiário de Pedagogia (Sob Supervisão)',
      school: 'E.M. Antonina Borges de Sá',
      ddz: 'DDZ Leste II - SEMED Manaus',
    },
  },
  {
    id: 'responsavel',
    name: 'Responsável',
    category: 'Comunidade Escolar',
    scopeCategory: 'Filhos vinculados (Acompanhamento Familiar)',
    scopeAndLimits: 'Vê tudo o que o Aluno vê dos filhos vinculados, mais ocorrências, atestados, matrículas, transferências e convocações. Confirma leitura de comunicado e presença em reunião/evento (E em M6), envia atestado (C em M7). Não altera dado escolar.',
    canEdit: true,
    canApprove: false,
    canSign: false,
    canManageUsers: false,
    canExportCenso: false,
    allowedModules: ['visao-geral', 'gestao-alunos', 'notas-frequencia', 'gestao-pedagogica', 'organizacao-escolar', 'comunicacao-escolar', 'atendimento-estudante', 'materiais-logistica', 'documentos-suporte'],
    moduleCeilings: {
      'visao-geral': { level: 'LEITURA', matrixCode: 'V (f)', details: 'Resumo bimestral dos filhos vinculados' },
      'gestao-alunos': { level: 'LEITURA', matrixCode: 'V (f)', details: 'M1: Ficha cadastral e matrícula dos filhos' },
      'notas-frequencia': { level: 'LEITURA', matrixCode: 'V (f)', details: 'M2: Boletim e faltas dos filhos vinculados' },
      'gestao-pedagogica': { level: 'LEITURA', matrixCode: 'V (f)', details: 'M3: Conteúdo ministrado na turma do filho' },
      'equipe-escolar': { level: 'VEDADO', matrixCode: '—', details: 'M4: Vedado' },
      'organizacao-escolar': { level: 'LEITURA', matrixCode: 'V (f)', details: 'M5: Horários e calendário escolar' },
      'comunicacao-escolar': { level: 'PARCIAL', matrixCode: 'VE (f)', details: 'M6: Confirmação de leitura e presença em reunião' },
      'atendimento-estudante': { level: 'PARCIAL', matrixCode: 'VC (f)', details: 'M7: Envio de atestado médico' },
      'biblioteca': { level: 'VEDADO', matrixCode: '—', details: 'M8: Vedado' },
      'patrimonio-manutencao': { level: 'VEDADO', matrixCode: '—', details: 'M9: Vedado' },
      'materiais-logistica': { level: 'LEITURA', matrixCode: 'V (f)', details: 'M10: Cardápio da merenda e rota do transporte' },
      'portaria-visitantes': { level: 'VEDADO', matrixCode: '—', details: 'M11: Vedado' },
      'administracao-sistema': { level: 'VEDADO', matrixCode: '—', details: 'M12: Vedado' },
      'paineis-relatorios': { level: 'VEDADO', matrixCode: '—', details: 'M13: Vedado' },
      'documentos-suporte': { level: 'LEITURA', matrixCode: 'V (f)', details: 'M14: Consulta de boletim e declaração com QR Code' },
      'financeiro-integracoes': { level: 'VEDADO', matrixCode: '—', details: 'M15: Vedado' },
    },
    sampleUser: {
      name: 'Renata Albuquerque dos Santos',
      cpf: '135.792.468-28',
      password: 'Sigeon@Local2026',
      email: 'renata.albuquerque@gmail.com',
      roleTitle: 'Responsável (Mãe de Cauã Henrique)',
      school: 'E.M. Antonina Borges de Sá',
      ddz: 'DDZ Leste II - SEMED Manaus',
    },
  },
  {
    id: 'aluno',
    name: 'Aluno',
    category: 'Comunidade Escolar',
    scopeCategory: 'Somente leitura dos próprios dados',
    scopeAndLimits: 'Somente leitura dos próprios dados.',
    canEdit: false,
    canApprove: false,
    canSign: false,
    canManageUsers: false,
    canExportCenso: false,
    allowedModules: ['visao-geral', 'gestao-alunos', 'notas-frequencia', 'gestao-pedagogica', 'organizacao-escolar', 'comunicacao-escolar', 'materiais-logistica', 'documentos-suporte'],
    moduleCeilings: {
      'visao-geral': { level: 'LEITURA', matrixCode: 'V (p)', details: 'Meu boletim, faltas e avisos' },
      'gestao-alunos': { level: 'LEITURA', matrixCode: 'V (p)', details: 'M1: Meus dados cadastrais' },
      'notas-frequencia': { level: 'LEITURA', matrixCode: 'V (p)', details: 'M2: Minhas notas bimestrais e presenças' },
      'gestao-pedagogica': { level: 'LEITURA', matrixCode: 'V (p)', details: 'M3: Conteúdo das minhas aulas' },
      'equipe-escolar': { level: 'VEDADO', matrixCode: '—', details: 'M4: Vedado' },
      'organizacao-escolar': { level: 'LEITURA', matrixCode: 'V (p)', details: 'M5: Horários das minhas aulas' },
      'comunicacao-escolar': { level: 'LEITURA', matrixCode: 'V (p)', details: 'M6: Avisos da minha turma' },
      'atendimento-estudante': { level: 'VEDADO', matrixCode: '—', details: 'M7: Vedado' },
      'biblioteca': { level: 'VEDADO', matrixCode: '—', details: 'M8: Vedado' },
      'patrimonio-manutencao': { level: 'VEDADO', matrixCode: '—', details: 'M9: Vedado' },
      'materiais-logistica': { level: 'LEITURA', matrixCode: 'V (p)', details: 'M10: Cardápio da merenda e rota do transporte' },
      'portaria-visitantes': { level: 'VEDADO', matrixCode: '—', details: 'M11: Vedado' },
      'administracao-sistema': { level: 'VEDADO', matrixCode: '—', details: 'M12: Vedado' },
      'paineis-relatorios': { level: 'VEDADO', matrixCode: '—', details: 'M13: Vedado' },
      'documentos-suporte': { level: 'LEITURA', matrixCode: 'V (p)', details: 'M14: Meu boletim e declaração com QR Code' },
      'financeiro-integracoes': { level: 'VEDADO', matrixCode: '—', details: 'M15: Vedado' },
    },
    sampleUser: {
      name: 'Cauã Henrique da Silva Mendes',
      cpf: '987.654.321-00',
      password: 'Sigeon@Local2026',
      email: 'caua.mendes@aluno.semed.manaus.am.gov.br',
      roleTitle: 'Estudante (4º Ano B)',
      school: 'E.M. Antonina Borges de Sá',
      ddz: 'DDZ Leste II - SEMED Manaus',
    },
  },
  {
    id: 'consulta',
    name: 'Consulta / Visualização',
    category: 'Comunidade Escolar',
    scopeCategory: 'Somente os módulos autorizados expressamente',
    scopeAndLimits: 'Somente os módulos, relatórios e dados expressamente autorizados; nunca cadastra, edita, exclui, aprova nem assina.',
    canEdit: false,
    canApprove: false,
    canSign: false,
    canManageUsers: false,
    canExportCenso: false,
    allowedModules: ['visao-geral', 'paineis-relatorios'],
    moduleCeilings: {
      'visao-geral': { level: 'LEITURA', matrixCode: '†', details: 'Somente leitura de painéis autorizados' },
      'gestao-alunos': { level: 'VEDADO', matrixCode: '†', details: 'M1: Acesso sob autorização expressa' },
      'notas-frequencia': { level: 'VEDADO', matrixCode: '†', details: 'M2: Acesso sob autorização expressa' },
      'gestao-pedagogica': { level: 'VEDADO', matrixCode: '†', details: 'M3: Acesso sob autorização expressa' },
      'equipe-escolar': { level: 'VEDADO', matrixCode: '†', details: 'M4: Acesso sob autorização expressa' },
      'organizacao-escolar': { level: 'VEDADO', matrixCode: '†', details: 'M5: Acesso sob autorização expressa' },
      'comunicacao-escolar': { level: 'VEDADO', matrixCode: '†', details: 'M6: Acesso sob autorização expressa' },
      'atendimento-estudante': { level: 'VEDADO', matrixCode: '†', details: 'M7: Acesso sob autorização expressa' },
      'biblioteca': { level: 'VEDADO', matrixCode: '†', details: 'M8: Acesso sob autorização expressa' },
      'patrimonio-manutencao': { level: 'VEDADO', matrixCode: '†', details: 'M9: Acesso sob autorização expressa' },
      'materiais-logistica': { level: 'VEDADO', matrixCode: '†', details: 'M10: Acesso sob autorização expressa' },
      'portaria-visitantes': { level: 'VEDADO', matrixCode: '†', details: 'M11: Acesso sob autorização expressa' },
      'administracao-sistema': { level: 'VEDADO', matrixCode: '†', details: 'M12: Acesso sob autorização expressa' },
      'paineis-relatorios': { level: 'LEITURA', matrixCode: '†', details: 'M13: Somente leitura de relatórios autorizados' },
      'documentos-suporte': { level: 'VEDADO', matrixCode: '†', details: 'M14: Acesso sob autorização expressa' },
      'financeiro-integracoes': { level: 'VEDADO', matrixCode: '†', details: 'M15: Acesso sob autorização expressa' },
    },
    sampleUser: {
      name: 'Observador Externo / Conselho Municipal',
      cpf: '456.789.012-34',
      password: 'Sigeon@Local2026',
      email: 'observador@cme.manaus.am.gov.br',
      roleTitle: 'Perfil Consulta / Visualização',
      school: 'E.M. Antonina Borges de Sá',
      ddz: 'Conselho Municipal de Educação',
    },
  },
];

export function getProfileById(roleId: string): ProfileDefinition {
  const found = RBAC_PROFILES.find(p => p.id === roleId);
  if (found) return found;
  // Fallbacks for legacy ids
  if (roleId === 'professor') return RBAC_PROFILES.find(p => p.id === 'professor')!;
  if (roleId === 'secretario') return RBAC_PROFILES.find(p => p.id === 'secretario')!;
  if (roleId === 'aluno') return RBAC_PROFILES.find(p => p.id === 'aluno')!;
  return RBAC_PROFILES.find(p => p.id === 'gestor')!;
}

export function hasModuleAccess(roleId: string, moduleId: string): boolean {
  const profile = getProfileById(roleId);
  if (!profile) return false;

  let canonId = moduleId;
  if (moduleId === 'alunos') canonId = 'gestao-alunos';
  if (moduleId === 'servidores') canonId = 'equipe-escolar';
  if (moduleId === 'gestao') canonId = 'organizacao-escolar';
  if (moduleId === 'relatorios') canonId = 'paineis-relatorios';

  if (!profile.allowedModules.includes(canonId)) {
    return false;
  }

  const ceiling = profile.moduleCeilings[canonId];
  if (!ceiling) {
    return false;
  }

  if (ceiling.level === 'VEDADO' || ceiling.matrixCode === '—') {
    return false;
  }

  return true;
}

export function canEditInModule(roleId: string, moduleId: string): boolean {
  if (!hasModuleAccess(roleId, moduleId)) return false;
  const profile = getProfileById(roleId);
  if (!profile || !profile.canEdit) return false;

  let canonId = moduleId;
  if (moduleId === 'alunos') canonId = 'gestao-alunos';
  if (moduleId === 'servidores') canonId = 'equipe-escolar';
  if (moduleId === 'gestao') canonId = 'organizacao-escolar';
  if (moduleId === 'relatorios') canonId = 'paineis-relatorios';

  const ceiling = profile.moduleCeilings[canonId];
  if (!ceiling || ceiling.level === 'LEITURA') return false;

  return true;
}

export interface ValidationResult {
  success: boolean;
  profile?: ProfileDefinition;
  error?: 'CPF_NOT_FOUND' | 'INVALID_PASSWORD' | 'EMPTY_FIELDS' | 'INVALID_CPF_FORMAT';
}

export function validateCredentials(inputCpf: string, inputPassword: string): ValidationResult {
  const cleanCpf = (inputCpf || '').replace(/\D/g, '');
  if (!cleanCpf || !inputPassword) {
    return { success: false, error: 'EMPTY_FIELDS' };
  }

  if (cleanCpf.length < 11 && cleanCpf !== '00000000000') {
    return { success: false, error: 'INVALID_CPF_FORMAT' };
  }

  const profile = RBAC_PROFILES.find(
    (p) => p.sampleUser.cpf.replace(/\D/g, '') === cleanCpf
  );

  if (!profile) {
    return { success: false, error: 'CPF_NOT_FOUND' };
  }

  const normalizedInputPassword = inputPassword.trim();
  const validPasswords = [
    profile.sampleUser.password,
    'Sigeon@Local2026',
    'Sigeon@2026',
  ];

  if (!validPasswords.includes(normalizedInputPassword)) {
    return { success: false, error: 'INVALID_PASSWORD' };
  }

  return { success: true, profile };
}

export function getAllTestCredentials() {
  return RBAC_PROFILES.map((p) => ({
    roleId: p.id,
    roleName: p.name,
    category: p.category,
    roleTitle: p.sampleUser.roleTitle,
    userName: p.sampleUser.name,
    cpf: p.sampleUser.cpf,
    password: p.sampleUser.password,
    allowedModulesCount: p.allowedModules.length,
    school: p.sampleUser.school,
  }));
}
