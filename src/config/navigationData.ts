import { 
  LayoutGrid, 
  GraduationCap, 
  ClipboardCheck, 
  School, 
  BookOpen, 
  HeartHandshake, 
  Users, 
  MessagesSquare, 
  Library, 
  Building2, 
  Package, 
  ShieldCheck, 
  Settings, 
  TrendingUp, 
  Files, 
  Landmark,
  LucideIcon
} from 'lucide-react';

export interface ModuleSubdivision {
  id: string;
  label: string;
  description?: string;
}

export interface InstitutionalModule {
  id: string;
  canonicalCode: string; // M0 to M15 (internal technical reference only)
  name: string;
  shortName: string;
  icon: LucideIcon;
  description: string;
  subdivisions: ModuleSubdivision[];
}

export interface InstitutionalGroup {
  id: string;
  groupTitle: string;
  description?: string;
  modules: InstitutionalModule[];
}

export const INSTITUTIONAL_NAVIGATION: InstitutionalGroup[] = [
  {
    id: 'inicio',
    groupTitle: 'INÍCIO',
    description: 'Acesso rápido e painel executivo',
    modules: [
      {
        id: 'visao-geral',
        canonicalCode: 'M0',
        name: 'Painel Inicial',
        shortName: 'Painel Inicial',
        icon: LayoutGrid,
        description: 'Visão executiva integrada com indicadores da rede, atalhos rápidos e status operacional.',
        subdivisions: [
          { id: 'painel-central', label: 'Painel Central', description: 'Indicadores operacionais e atalhos rápidos' },
          { id: 'metas-unidade', label: 'Metas da Unidade', description: 'Metas educacionais do ano letivo 2026' },
          { id: 'avisos-semed', label: 'Comunicados SEMED', description: 'Orientações oficiais do nível central' },
        ],
      },
    ],
  },
  {
    id: 'gestao-academica',
    groupTitle: 'GESTÃO ACADÊMICA',
    description: 'Trajetória escolar, notas, frequência e estrutura de ensino',
    modules: [
      {
        id: 'gestao-alunos',
        canonicalCode: 'M1',
        name: 'Vida Escolar',
        shortName: 'Vida Escolar',
        icon: GraduationCap,
        description: 'Gestão integral da vida escolar dos estudantes, matrículas, histórico e enturmação.',
        subdivisions: [
          { id: 'cadastro-alunos', label: 'Cadastro de Alunos', description: 'Dados cadastrais, documentação e foto' },
          { id: 'cadastro-responsaveis', label: 'Cadastro de Responsáveis', description: 'Filiação, contatos e autorizações' },
          { id: 'matriculas', label: 'Matrículas', description: 'Novas matrículas e confirmação de vagas' },
          { id: 'enturmacao', label: 'Enturmação', description: 'Distribuição dos alunos por turmas e turnos' },
          { id: 'transferencias', label: 'Transferências', description: 'Transferências internas, externas e recebimento' },
          { id: 'remanejamento-alunos', label: 'Remanejamento de Alunos', description: 'Mudança de turma ou turno com parecer' },
          { id: 'historico-escolar', label: 'Histórico Escolar', description: 'Emissão e registro de histórico escolar oficial' },
          { id: 'certificados', label: 'Certificados', description: 'Declarações de conclusão e certificados' },
          { id: 'ocorrencias-disciplinares', label: 'Ocorrências Disciplinares', description: 'Registros de conduta e mediações' },
        ],
      },
      {
        id: 'notas-frequencia',
        canonicalCode: 'M2',
        name: 'Diário Escolar',
        shortName: 'Diário Escolar',
        icon: ClipboardCheck,
        description: 'Lançamento de diário de frequência, avaliações, recuperação e fechamento de médias.',
        subdivisions: [
          { id: 'diario-frequencia', label: 'Diário de Frequência', description: 'Chamada diária e controle de assiduidade' },
          { id: 'lancamento-notas', label: 'Lançamento de Notas', description: 'Notas bimestrais por componente curricular' },
          { id: 'avaliacoes', label: 'Avaliações', description: 'Registro de instrumentos avaliativos e provas' },
          { id: 'recuperacao', label: 'Recuperação', description: 'Recuperação paralela e final' },
          { id: 'boletins', label: 'Boletins', description: 'Emissão de boletim escolar individual e por turma' },
          { id: 'fechamento-bimestre', label: 'Fechamento de Bimestre', description: 'Consolidação de médias e atas' },
          { id: 'indicadores-rendimento', label: 'Indicadores de Frequência e Rendimento', description: 'Métricas de aprovação e busca ativa' },
        ],
      },
      {
        id: 'organizacao-escolar',
        canonicalCode: 'M5',
        name: 'Organização Escolar',
        shortName: 'Organização Escolar',
        icon: School,
        description: 'Estrutura institucional de turmas, salas, matriz curricular, turnos e calendário.',
        subdivisions: [
          { id: 'escolas', label: 'Escolas', description: 'Unidades escolares e polos educacionais' },
          { id: 'cursos-modalidades', label: 'Cursos e Modalidades', description: 'Ensino Regular, Fundamental, Infantil e EJA' },
          { id: 'series-etapas', label: 'Séries, Anos e Etapas', description: 'Ciclos de alfabetização e anos escolares' },
          { id: 'turnos', label: 'Turnos', description: 'Matutino, Vespertino, Noturno e Integral' },
          { id: 'salas-ambientes', label: 'Salas e Ambientes', description: 'Capacidade, climatização e infraestrutura' },
          { id: 'turmas', label: 'Turmas', description: 'Composição de turmas ativas' },
          { id: 'disciplinas-componentes', label: 'Disciplinas e Componentes Curriculares', description: 'Base Nacional Comum e Parte Diversificada' },
          { id: 'matriz-curricular', label: 'Matriz Curricular', description: 'Carga horária e grade curricular oficial' },
          { id: 'grade-horarios', label: 'Grade de Horários', description: 'Horários semanais das aulas' },
          { id: 'ano-letivo', label: 'Ano Letivo', description: 'Abertura, períodos e encerramento letivo' },
          { id: 'calendario-escolar', label: 'Calendário Escolar', description: 'Dias letivos, feriados, recessos e conselhos' },
        ],
      },
    ],
  },
  {
    id: 'gestao-pedagogica',
    groupTitle: 'GESTÃO PEDAGÓGICA',
    description: 'Planejamento de ensino, apoio ao estudante e inclusão (AEE)',
    modules: [
      {
        id: 'gestao-pedagogica',
        canonicalCode: 'M3',
        name: 'Gestão Pedagógica',
        shortName: 'Gestão Pedagógica',
        icon: BookOpen,
        description: 'Coordenação pedagógica, planos de aula, projetos de ensino e conselho de classe.',
        subdivisions: [
          { id: 'planos-aula', label: 'Planos de Aula', description: 'Planejamento semanal e bimestral dos docentes' },
          { id: 'projetos-pedagogicos', label: 'Projetos Pedagógicos', description: 'Projetos integradores e interdisciplinares' },
          { id: 'acompanhamento-curricular', label: 'Acompanhamento Curricular', description: 'Progresso da BNCC e conteúdos ministrados' },
          { id: 'conselho-classe', label: 'Conselho de Classe', description: 'Atas deliberativas e pareceres colegiados' },
          { id: 'banco-atividades', label: 'Banco de Atividades', description: 'Repositório de recursos didáticos compartilhados' },
          { id: 'formacao-continuada', label: 'Formação Continuada', description: 'Cursos, oficinas e certificações SEMED' },
        ],
      },
      {
        id: 'atendimento-estudante',
        canonicalCode: 'M7',
        name: 'Atendimento ao Estudante e AEE',
        shortName: 'Atendimento e AEE',
        icon: HeartHandshake,
        description: 'Educação Especial Inclusiva, Atendimento Educacional Especializado (AEE) e apoio biopsicossocial.',
        subdivisions: [
          { id: 'triagem-encaminhamentos', label: 'Triagem e Encaminhamentos', description: 'Identificação inicial e acolhimento' },
          { id: 'pdi-plano-individual', label: 'Planos de Desenvolvimento Individual (PDI)', description: 'Metas e adaptações pedagógicas personalizadas' },
          { id: 'salas-recursos', label: 'Sala de Recursos Multifuncionais', description: 'Equipamentos e horários de contraturno' },
          { id: 'acompanhamento-psicossocial', label: 'Acompanhamento Psicossocial', description: 'Atendimentos de psicólogos e assistentes sociais' },
          { id: 'saude-vacinacao', label: 'Saúde e Vacinação', description: 'Cartão de vacinas, triagem visual e saúde escolar' },
          { id: 'laudos-adaptacoes', label: 'Registro de Laudos e Adaptações', description: 'Laudos médicos e tecnologia assistiva' },
        ],
      },
    ],
  },
  {
    id: 'gestao-administrativa',
    groupTitle: 'GESTÃO ADMINISTRATIVA',
    description: 'Recursos humanos escolares, comunicação institucional e acervo bibliográfico',
    modules: [
      {
        id: 'equipe-escolar',
        canonicalCode: 'M4',
        name: 'Gestão de Pessoas',
        shortName: 'Gestão de Pessoas',
        icon: Users,
        description: 'Lotação de servidores, cargos, funções, vínculos funcionais e registro de assiduidade.',
        subdivisions: [
          { id: 'servidores', label: 'Servidores', description: 'Quadro funcional e cadastro de servidores' },
          { id: 'cargos-funcoes', label: 'Cargos e Funções', description: 'Professores, pedagogos, técnicos e operacionais' },
          { id: 'lotacoes', label: 'Lotações', description: 'Lotação por unidade e carga horária docente' },
          { id: 'remanejamentos', label: 'Remanejamentos', description: 'Transferência de lotação entre escolas da rede' },
          { id: 'vinculos-funcionais', label: 'Vínculos Funcionais', description: 'Efetivos concursados, PSS e comissionados' },
          { id: 'substituicoes-delegacoes', label: 'Substituições e Delegações', description: 'Substituição de regência e licenças' },
        ],
      },
      {
        id: 'comunicacao-escolar',
        canonicalCode: 'M6',
        name: 'Comunicação e Participação Escolar',
        shortName: 'Comunicação Escolar',
        icon: MessagesSquare,
        description: 'Canais oficiais de diálogo com a comunidade escolar, conselho, mural e reuniões.',
        subdivisions: [
          { id: 'circulares-avisos', label: 'Circulares e Avisos', description: 'Comunicados oficiais para a comunidade' },
          { id: 'mural-escola', label: 'Mural da Escola', description: 'Mural digital de recados e eventos' },
          { id: 'mensagens-diretas', label: 'Mensagens Diretas', description: 'Contato seguro com responsáveis' },
          { id: 'conselho-escolar-apmc', label: 'Conselho Escolar e APMC', description: 'Eleições, atas e deliberações colegiadas' },
          { id: 'reunioes-pais', label: 'Reuniões de Pais', description: 'Convocatórias, pautas e atas de frequência' },
          { id: 'ouvidoria-interna', label: 'Ouvidoria Interna', description: 'Sugestões, elogios e manifestações da comunidade' },
        ],
      },
      {
        id: 'biblioteca',
        canonicalCode: 'M8',
        name: 'Biblioteca Escolar',
        shortName: 'Biblioteca Escolar',
        icon: Library,
        description: 'Gestão do acervo literário, empréstimos, devoluções e incentivo à leitura.',
        subdivisions: [
          { id: 'acervo-catalogacao', label: 'Acervo e Catalogação', description: 'Títulos, autores, ISBN e exemplares' },
          { id: 'emprestimos-devolucoes', label: 'Empréstimos e Devoluções', description: 'Controle de circulação e prazos' },
          { id: 'leitores-cadastrados', label: 'Leitores Cadastrados', description: 'Alunos, professores e servidores' },
          { id: 'reservas-renovacao', label: 'Reservas e Renovação', description: 'Fila de espera e prorrogações' },
          { id: 'inventario-baixas', label: 'Inventário e Baixas', description: 'Auditoria periódica e descarte formal' },
          { id: 'projetos-leitura', label: 'Projetos de Leitura', description: 'Clubes do livro e saraus pedagógicos' },
        ],
      },
    ],
  },
  {
    id: 'infraestrutura-servicos',
    groupTitle: 'INFRAESTRUTURA E SERVIÇOS',
    description: 'Patrimônio físico, suprimentos, merenda, transporte e portaria',
    modules: [
      {
        id: 'patrimonio-manutencao',
        canonicalCode: 'M9',
        name: 'Patrimônio e Infraestrutura',
        shortName: 'Patrimônio',
        icon: Building2,
        description: 'Tombamento de bens, vistorias prediais, chamados de manutenção e climatização.',
        subdivisions: [
          { id: 'bens-tombados', label: 'Bens Tombados', description: 'Inventário de bens patrimoniais e placas' },
          { id: 'salas-ambientes-fisicos', label: 'Salas e Ambientes Físicos', description: 'Inspeção de laboratórios, quadras e banheiros' },
          { id: 'vistorias-manutencao', label: 'Vistorias e Manutenção', description: 'Inspeções preventivas da SEMED' },
          { id: 'chamados-reparo', label: 'Chamados de Reparo', description: 'Ordens de serviço hidráulico, elétrico e TI' },
          { id: 'laudos-seguranca', label: 'Laudos de Segurança', description: 'Alvarás, extintores e vigilância sanitária' },
          { id: 'inventario-anual', label: 'Inventário Anual', description: 'Relatório patrimonial para prestação de contas' },
        ],
      },
      {
        id: 'materiais-logistica',
        canonicalCode: 'M10',
        name: 'Recursos e Logística Escolar',
        shortName: 'Recursos e Logística',
        icon: Package,
        description: 'Alimentação escolar (PNAE), materiais didáticos, kits de fardamento e transporte escolar.',
        subdivisions: [
          { id: 'merenda-escolar', label: 'Alimentação Escolar (Merenda)', description: 'Cardápios regionalizados, estoque e fiscalização' },
          { id: 'materiais-pedagogicos', label: 'Materiais Pedagógicos', description: 'Papelaria, livros didáticos (PNLD) e insumos' },
          { id: 'fardamento-kit', label: 'Fardamento e Kit Escolar', description: 'Distribuição anual aos alunos matriculados' },
          { id: 'transporte-escolar', label: 'Transporte Escolar', description: 'Rotas rodoviárias e lanchas escolares fluviais' },
          { id: 'pedidos-almoxarifado', label: 'Pedidos e Almoxarifado', description: 'Requisições para a Central da SEMED' },
          { id: 'guia-distribuicao', label: 'Guia de Distribuição', description: 'Rastreabilidade de entrega nas unidades' },
        ],
      },
      {
        id: 'portaria-visitantes',
        canonicalCode: 'M11',
        name: 'Portaria e Controle de Acesso',
        shortName: 'Controle de Acesso',
        icon: ShieldCheck,
        description: 'Segurança predial, cadastro de visitantes, controle de fluxo e liberação de estudantes.',
        subdivisions: [
          { id: 'registro-portaria', label: 'Registro de Portaria', description: 'Entradas e saídas de pedestres e veículos' },
          { id: 'visitantes-crachas', label: 'Controle de Visitantes e Crachás', description: 'Identificação por documento oficial e crachá' },
          { id: 'saida-antecipada', label: 'Saída Antecipada de Alunos', description: 'Autorização por responsável com assinatura' },
          { id: 'ocorrencias-acesso', label: 'Ocorrências de Acesso', description: 'Incidentes de segurança e rondas' },
          { id: 'plantao-inspetores', label: 'Plantão de Inspetores', description: 'Escala de postos e vigilância escolar' },
          { id: 'protocolos-seguranca', label: 'Protocolos de Entrada e Saída', description: 'Diretrizes preventivas e emergência' },
        ],
      },
    ],
  },
  {
    id: 'administracao-controle',
    groupTitle: 'ADMINISTRAÇÃO E CONTROLE',
    description: 'Governança do sistema, auditoria, estatísticas, suporte e finanças públicas',
    modules: [
      {
        id: 'administracao-sistema',
        canonicalCode: 'M12',
        name: 'Governança e Administração do Sistema',
        shortName: 'Governança e Administração',
        icon: Settings,
        description: 'Parâmetros globais do SIGEON, gestão de usuários, matriz de 17 perfis, segurança e auditoria.',
        subdivisions: [
          { id: 'parametros-globais', label: 'Parâmetros Globais', description: 'Configurações centrais da rede SEMED' },
          { id: 'gestao-perfis', label: 'Gestão de Perfis e Autorizações', description: 'Matriz oficial de 17 perfis de acesso' },
          { id: 'auditoria-logs', label: 'Auditoria e Trilha de Logs', description: 'Rastreamento de ações administrativas e escolares' },
          { id: 'backups-seguranca', label: 'Backups e Segurança', description: 'Rotinas de cópia e criptografia em repouso' },
          { id: 'censo-educacenso', label: 'Censo Escolar / Educacenso', description: 'Exportação e migração INEP / MEC' },
          { id: 'integracoes-rede', label: 'Integrações da Rede', description: 'Conectores governamentais e APIs' },
        ],
      },
      {
        id: 'paineis-relatorios',
        canonicalCode: 'M13',
        name: 'Relatórios e Indicadores',
        shortName: 'Relatórios e Indicadores',
        icon: TrendingUp,
        description: 'Painéis analíticos municipais, IDEB, metas educacionais, taxa de abandono e censo da rede.',
        subdivisions: [
          { id: 'paineis-ideb', label: 'Painéis do IDEB e Metas', description: 'Desempenho histórico e projeções municipais' },
          { id: 'rendimento-aprovacao', label: 'Rendimento e Aprovação', description: 'Taxas consolidadas por zona e etapa' },
          { id: 'frequencia-evasao', label: 'Frequência e Evasão Escolar', description: 'Monitoramento preventivo e busca ativa' },
          { id: 'relatorios-turmas', label: 'Relatórios de Turmas e Lotações', description: 'Quadro geral de ocupação de vagas' },
          { id: 'censo-demografico', label: 'Censo Demográfico da Rede', description: 'Perfil socioeconômico e territorial' },
          { id: 'exportacao-consolidada', label: 'Exportação Consolidada', description: 'Geração de planilhas e relatórios oficiais' },
        ],
      },
      {
        id: 'documentos-suporte',
        canonicalCode: 'M14',
        name: 'Gestão Documental e Suporte',
        shortName: 'Gestão Documental',
        icon: Files,
        description: 'Modelos padronizados de atas, certificados, arquivo histórico, suporte técnico e base de conhecimento.',
        subdivisions: [
          { id: 'modelos-oficiais', label: 'Modelos Oficiais SEMED', description: 'Minutas de ofícios, declarações e atestados' },
          { id: 'atas-portarias', label: 'Atas e Portarias', description: 'Publicações normativas da Secretaria' },
          { id: 'central-ajuda', label: 'Central de Ajuda e Tutoriais', description: 'Guias operacionais passo a passo' },
          { id: 'chamados-tecnicos', label: 'Abertura de Chamados Técnicos', description: 'Suporte a incidentes do sistema SIGEON' },
          { id: 'arquivo-historico', label: 'Arquivo Histórico Digital', description: 'Livros de registro e documentos legados' },
          { id: 'certificacao-digital', label: 'Validação e Assinatura Digital', description: 'Autenticidade de documentos via QR Code' },
        ],
      },
      {
        id: 'financeiro-integracoes',
        canonicalCode: 'M15',
        name: 'Gestão Financeira e Integrações Governamentais',
        shortName: 'Gestão Financeira',
        icon: Landmark,
        description: 'Execução orçamentária do PDDE, prestação de contas, repasses FUNDEB e integração com o MEC.',
        subdivisions: [
          { id: 'pdde-recursos', label: 'PDDE e Recursos Próprios', description: 'Plano de aplicação e despesas escolares' },
          { id: 'prestacao-contas', label: 'Prestação de Contas', description: 'Demonstrativos e relatórios ao conselho fiscal' },
          { id: 'fundeb-municipal', label: 'FUNDEB Municipal', description: 'Acompanhamento de repasses e custeio' },
          { id: 'integracao-govbr', label: 'Integração GOV.BR / MEC', description: 'Sincronização com bases federais' },
          { id: 'webservices-censo', label: 'Web Services e Censo', description: 'Barramento de serviços de dados' },
          { id: 'repasses-convenios', label: 'Repasses e Convênios', description: 'Termos de fomento e parcerias' },
        ],
      },
    ],
  },
];

// Flat list of all 16 modules (M0 to M15)
export const ALL_INSTITUTIONAL_MODULES: InstitutionalModule[] = INSTITUTIONAL_NAVIGATION.flatMap(
  (group) => group.modules
);

// Map by ID for O(1) lookups
export const MODULES_BY_ID = new Map<string, InstitutionalModule>(
  ALL_INSTITUTIONAL_MODULES.map((m) => [m.id, m])
);

// Helper to find a module by ID with alias fallback
export function getInstitutionalModule(id: string): InstitutionalModule | undefined {
  if (MODULES_BY_ID.has(id)) {
    return MODULES_BY_ID.get(id);
  }
  // Aliases for backward compatibility
  const aliasMap: Record<string, string> = {
    'alunos': 'gestao-alunos',
    'servidores': 'equipe-escolar',
    'gestao': 'organizacao-escolar',
    'relatorios': 'paineis-relatorios',
  };
  const resolved = aliasMap[id];
  return resolved ? MODULES_BY_ID.get(resolved) : undefined;
}

// Helper to get group title for a module
export function getGroupForModule(moduleId: string): InstitutionalGroup | undefined {
  const mod = getInstitutionalModule(moduleId);
  if (!mod) return undefined;
  return INSTITUTIONAL_NAVIGATION.find((group) =>
    group.modules.some((m) => m.id === mod.id)
  );
}
