import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Users, 
  FileText, 
  BarChart3, 
  Search, 
  Plus, 
  Filter, 
  Download, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  School, 
  Utensils, 
  Ship, 
  Bus, 
  BookOpen, 
  Calendar,
  Sparkles,
  ChevronRight,
  Printer,
  Settings,
  UserCheck,
  Save,
  X,
  Layers,
  User,
  ShieldCheck,
  Menu,
  CheckCircle2,
  ChevronDown,
  Check,
  ArrowRight,
  FileSpreadsheet,
  ArrowUpDown,
  ArrowDown,
  ArrowUp,
  Briefcase,
  Lock
} from 'lucide-react';
import { ManausLogo } from './ManausLogo';
import { Sidebar } from './Sidebar';
import { UserProfile, Student, Teacher, SchoolClass } from '../types';
import { 
  VisaoGeralView, 
  NotasFrequenciaView, 
  GestaoPedagogicaView, 
  ComunicacaoEscolarView, 
  AtendimentoEstudanteView, 
  BibliotecaView, 
  PatrimonioManutencaoView, 
  MateriaisLogisticaView, 
  PortariaVisitantesView, 
  AdministracaoSistemaView, 
  DocumentosSuporteView, 
  FinanceiroIntegracoesView 
} from './AdditionalModuleViews';
import { RoleSwitcherModal } from './RoleSwitcherModal';
import { getProfileById, ProfileDefinition, hasModuleAccess, canEditInModule } from '../config/rbacProfiles';

interface DashboardProps {
  user: UserProfile;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  // Current Active User (allows instant profile testing)
  const [currentUser, setCurrentUser] = useState<UserProfile>(user);
  const [isRoleSwitcherOpen, setIsRoleSwitcherOpen] = useState<boolean>(false);
  const activeProfile = getProfileById(currentUser.role);

  // Navigation State
  const [activeTab, setActiveTab] = useState<string>('visao-geral');
  const [activeSubItem, setActiveSubItem] = useState<string>('alunos-lista');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('E.M. Antonina Borges de Sá');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Student management modal state (Engrenagem: Dados pessoais, Cadastro, Enturmação, Boletim)
  const [managingStudent, setManagingStudent] = useState<Student | null>(null);
  const [manageTab, setManageTab] = useState<'dados' | 'cadastro' | 'enturmacao' | 'boletim'>('dados');
  const [editFormData, setEditFormData] = useState<any>({});
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Teacher/Servidor management modal state (Engrenagem: Dados pessoais, Cadastro funcional, Lotação & Turmas, Assiduidade)
  const [managingTeacher, setManagingTeacher] = useState<Teacher | null>(null);
  const [manageTeacherTab, setManageTeacherTab] = useState<'dados' | 'cadastro' | 'lotacao' | 'assiduidade'>('dados');
  const [editTeacherFormData, setEditTeacherFormData] = useState<any>({});
  const [saveTeacherSuccess, setSaveTeacherSuccess] = useState(false);

  // Search & Filter state for Servidores/Lotação
  const [searchTeacherQuery, setSearchTeacherQuery] = useState('');
  const [sortTeacherFrequencyOrder, setSortTeacherFrequencyOrder] = useState<'desc' | 'asc' | 'none'>('desc');

  // Mock Students
  const [students, setStudents] = useState<Student[]>([
    { id: '1', matricula: '1042109-4', nome: 'ARTHUR GABRIEL SOUZA LIMA', turma: '5º Ano A', turno: 'Matutino', frequencia: 96, situacao: 'Matriculado', responsavel: 'SANDRA REGINA LIMA', bairro: 'Coroado' },
    { id: '2', matricula: '1048932-1', nome: 'BEATRIZ VASCONCELOS RIBEIRO', turma: '5º Ano A', turno: 'Matutino', frequencia: 98, situacao: 'Matriculado', responsavel: 'JOÃO CARLOS RIBEIRO', bairro: 'São José Operário' },
    { id: '3', matricula: '2110245-8', nome: 'CAUÃ HENRIQUE DA SILVA MENDES', turma: '4º Ano B', turno: 'Vespertino', frequencia: 88, situacao: 'Em análise', responsavel: 'PATRÍCIA MENDES', bairro: 'Zumbi dos Palmares' },
    { id: '4', matricula: '1031587-2', nome: 'DANIELE CRISTINA CARVALHO', turma: '5º Ano B', turno: 'Matutino', frequencia: 95, situacao: 'Matriculado', responsavel: 'RENATO CARVALHO', bairro: 'Armando Mendes' },
    { id: '5', matricula: '3072210-9', nome: 'ENZO GABRIEL CASTRO NUNES', turma: '3º Ano A', turno: 'Matutino', frequencia: 92, situacao: 'Matriculado', responsavel: 'LUCIANA CASTRO', bairro: 'Coroado' },
    { id: '6', matricula: '1089412-3', nome: 'FERNANDA VITÓRIA PINHEIRO', turma: '6º Ano A', turno: 'Vespertino', frequencia: 99, situacao: 'Matriculado', responsavel: 'MARCOS PINHEIRO', bairro: 'Aleixo' },
    { id: '7', matricula: '2053178-0', nome: 'GUILHERME ARAÚJO DOS SANTOS', turma: '4º Ano A', turno: 'Matutino', frequencia: 84, situacao: 'Transferido', responsavel: 'TATIANE ARAÚJO', bairro: 'Parque 10 de Novembro' },
  ]);

  // Mock Teachers / Servidores
  const [teachers, setTeachers] = useState<Teacher[]>([
    { 
      id: '101', 
      nome: 'CARLOS EDUARDO SIQUEIRA', 
      cargo: 'Professor Nível Superior',
      disciplina: 'Língua Portuguesa & Literatura', 
      matricula: '98150339-1C', 
      turmas: ['5º Ano A', '5º Ano B'], 
      cargaHoraria: 40, 
      frequencia: 98,
      status: 'Em atividade',
      vinculo: 'Efetivo Concursado',
      turno: 'Matutino',
      lotacao: 'EMEF Darcy Ribeiro',
      bairro: 'Coroado',
      cpf: '341.892.402-91',
      telefone: '(92) 99120-4401',
      email: 'carlos.siqueira@semed.manaus.am.gov.br'
    },
    { 
      id: '102', 
      nome: 'JULIANA MEDEIROS CUNHA', 
      cargo: 'Professor Nível Superior',
      disciplina: 'Matemática e Geometria', 
      matricula: '98112904-1C', 
      turmas: ['5º Ano A', '6º Ano A'], 
      cargaHoraria: 40, 
      frequencia: 100,
      status: 'Em atividade',
      vinculo: 'Efetivo Concursado',
      turno: 'Matutino',
      lotacao: 'EMEF Darcy Ribeiro',
      bairro: 'Aleixo',
      cpf: '450.123.881-04',
      telefone: '(92) 98450-1122',
      email: 'juliana.cunha@semed.manaus.am.gov.br'
    },
    { 
      id: '103', 
      nome: 'RAIMUNDO NONATO FARIAS', 
      cargo: 'Professor Nível Superior',
      disciplina: 'Ciências Naturais e Meio Ambiente', 
      matricula: '98098412-1B', 
      turmas: ['4º Ano A', '5º Ano A'], 
      cargaHoraria: 30, 
      frequencia: 94,
      status: 'Em atividade',
      vinculo: 'Efetivo Concursado',
      turno: 'Matutino',
      lotacao: 'EMEF Darcy Ribeiro',
      bairro: 'São José Operário',
      cpf: '218.490.119-33',
      telefone: '(92) 99310-8844',
      email: 'raimundo.farias@semed.manaus.am.gov.br'
    },
    { 
      id: '104', 
      nome: 'MARIA CLARA ALBUQUERQUE', 
      cargo: 'Professor Nível Superior',
      disciplina: 'História & Geografia do Amazonas', 
      matricula: '98125670-1A', 
      turmas: ['4º Ano B', '5º Ano B'], 
      cargaHoraria: 40, 
      frequencia: 90,
      status: 'Licença capacitação',
      vinculo: 'Efetivo Concursado',
      turno: 'Vespertino',
      lotacao: 'EMEF Darcy Ribeiro',
      bairro: 'Parque 10 de Novembro',
      cpf: '512.304.770-55',
      telefone: '(92) 98112-9900',
      email: 'maria.albuquerque@semed.manaus.am.gov.br'
    },
    { 
      id: '105', 
      nome: 'THIAGO HENRIQUE MONTEIRO', 
      cargo: 'Professor de Educação Física',
      disciplina: 'Educação Física & Jogos Escolares', 
      matricula: '98130841-1C', 
      turmas: ['3º Ano A', '4º Ano A', '5º Ano A'], 
      cargaHoraria: 40, 
      frequencia: 97,
      status: 'Em atividade',
      vinculo: 'PSS / Temporário',
      turno: 'Vespertino',
      lotacao: 'EMEF Darcy Ribeiro',
      bairro: 'Armando Mendes',
      cpf: '601.782.903-88',
      telefone: '(92) 99422-3311',
      email: 'thiago.monteiro@semed.manaus.am.gov.br'
    },
    { 
      id: '106', 
      nome: 'SILVIA HELENA MELO', 
      cargo: 'Pedagoga Escolar',
      disciplina: 'Orientação Pedagógica & AEE', 
      matricula: '98101783-1B', 
      turmas: ['4º Ano A', '4º Ano B'], 
      cargaHoraria: 40, 
      frequencia: 99,
      status: 'Em atividade',
      vinculo: 'Efetivo Concursado',
      turno: 'Matutino',
      lotacao: 'EMEF Darcy Ribeiro',
      bairro: 'Zumbi dos Palmares',
      cpf: '339.201.884-12',
      telefone: '(92) 98230-5577',
      email: 'silvia.melo@semed.manaus.am.gov.br'
    },
    { 
      id: '107', 
      nome: 'MÁRCIO TAVARES RIBEIRO', 
      cargo: 'Professor Nível Superior',
      disciplina: 'Língua Portuguesa & Artes', 
      matricula: '98119052-1A', 
      turmas: ['4º Ano B'], 
      cargaHoraria: 30, 
      frequencia: 92,
      status: 'Em atividade',
      vinculo: 'PSS / Temporário',
      turno: 'Vespertino',
      lotacao: 'EMEF Darcy Ribeiro',
      bairro: 'Coroado',
      cpf: '710.455.901-20',
      telefone: '(92) 99188-7722',
      email: 'marcio.tavares@semed.manaus.am.gov.br'
    },
  ]);

  // Mock Classes
  const [classes] = useState<SchoolClass[]>([
    { id: 'C1', codigo: 'TURMA-5A', nome: '5º Ano A - Ensino Fundamental', ano: '5º Ano', sala: 'Bloco B - Sala 104', totalAlunos: 32, capacidade: 35, professorRegente: 'Prof. Carlos Eduardo Siqueira', turno: 'Matutino' },
    { id: 'C2', codigo: 'TURMA-5B', nome: '5º Ano B - Ensino Fundamental', ano: '5º Ano', sala: 'Bloco B - Sala 105', totalAlunos: 30, capacidade: 35, professorRegente: 'Profa. Danielle Prado', turno: 'Matutino' },
    { id: 'C3', codigo: 'TURMA-4A', nome: '4º Ano A - Anos Iniciais', ano: '4º Ano', sala: 'Bloco A - Sala 102', totalAlunos: 28, capacidade: 32, professorRegente: 'Profa. Silvia Helena Melo', turno: 'Matutino' },
    { id: 'C4', codigo: 'TURMA-4B', nome: '4º Ano B - Anos Iniciais', ano: '4º Ano', sala: 'Bloco A - Sala 103', totalAlunos: 29, capacidade: 32, professorRegente: 'Prof. Márcio Tavares', turno: 'Vespertino' },
    { id: 'C5', codigo: 'TURMA-6A', nome: '6º Ano A - Anos Finais', ano: '6º Ano', sala: 'Bloco C - Sala 201', totalAlunos: 34, capacidade: 36, professorRegente: 'Profa. Juliana Medeiros Cunha', turno: 'Vespertino' },
  ]);

  // Sort State for Frequency Column (Ordered according to frequency)
  const [sortFrequencyOrder, setSortFrequencyOrder] = useState<'desc' | 'asc' | 'none'>('desc');

  // Filtered & Sorted Students for Table Search (ordered according to frequency)
  const filteredStudents = [...students]
    .filter(s => 
      s.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.matricula.includes(searchQuery) ||
      s.turma.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortFrequencyOrder === 'desc') return b.frequencia - a.frequencia;
      if (sortFrequencyOrder === 'asc') return a.frequencia - b.frequencia;
      return 0;
    });

  // Filtered & Sorted Teachers for Table Search and Lotação
  const filteredTeachers = [...teachers]
    .filter(t => 
      t.nome.toLowerCase().includes(searchTeacherQuery.toLowerCase()) ||
      t.matricula.includes(searchTeacherQuery) ||
      t.disciplina.toLowerCase().includes(searchTeacherQuery.toLowerCase()) ||
      (t.cargo && t.cargo.toLowerCase().includes(searchTeacherQuery.toLowerCase())) ||
      (t.vinculo && t.vinculo.toLowerCase().includes(searchTeacherQuery.toLowerCase()))
    )
    .sort((a, b) => {
      const freqA = a.frequencia ?? 95;
      const freqB = b.frequencia ?? 95;
      if (sortTeacherFrequencyOrder === 'desc') return freqB - freqA;
      if (sortTeacherFrequencyOrder === 'asc') return freqA - freqB;
      return 0;
    });

  // Automatically ensure active tab is one that the current profile has permission to access
  useEffect(() => {
    if (!hasModuleAccess(currentUser.role, activeTab)) {
      const firstAllowed = activeProfile.allowedModules.find(m => hasModuleAccess(currentUser.role, m)) || 'visao-geral';
      handleNavigation(firstAllowed);
    }
  }, [currentUser.role]);

  // Handling navigation from Sidebar or top pills
  const handleNavigation = (module: string, subItemId?: string) => {
    if (!hasModuleAccess(currentUser.role, module)) {
      return;
    }
    setActiveTab(module);
    if (subItemId) {
      setActiveSubItem(subItemId);
    } else {
      const defaultMap: Record<string, string> = {
        'alunos': 'alunos-lista',
        'gestao-alunos': 'alunos-lista',
        'servidores': 'servidores-quadro',
        'equipe-escolar': 'servidores-quadro',
        'gestao': 'gestao-turmas',
        'organizacao-escolar': 'gestao-turmas',
        'relatorios': 'relatorios-ideb',
        'paineis-relatorios': 'relatorios-ideb',
      };
      setActiveSubItem(defaultMap[module] || 'default');
    }
  };


  // Open Student Edit Dialog
  const handleOpenManage = (student: Student) => {
    setManagingStudent(student);
    setManageTab('dados');
    setSaveSuccess(false);
    setEditFormData({
      ...student,
      dataNasc: '2015-05-14',
      sexo: 'Masculino',
      aee: false,
      cpfAluno: '042.819.302-15',
      telefone: '(92) 99123-4567',
      cep: '69082-000',
      endereco: 'Rua Rio Negro, 142',
      nis: '165.84920.12-3',
      parentesco: 'Mãe',
    });
  };

  // Save Student Edit Changes
  const handleSaveStudent = () => {
    if (!managingStudent) return;
    setStudents(prev => prev.map(s => {
      if (s.id === managingStudent.id) {
        return {
          ...s,
          matricula: editFormData.matricula || s.matricula,
          nome: editFormData.nome || s.nome,
          turma: editFormData.turma || s.turma,
          turno: editFormData.turno || s.turno,
          situacao: editFormData.situacao || s.situacao,
          responsavel: editFormData.responsavel || s.responsavel,
          bairro: editFormData.bairro || s.bairro,
        };
      }
      return s;
    }));
    setSaveSuccess(true);
    setTimeout(() => {
      setManagingStudent(null);
      setSaveSuccess(false);
    }, 1200);
  };

  // Open Teacher/Servidor Edit Dialog
  const handleOpenManageTeacher = (teacher: Teacher) => {
    setManagingTeacher(teacher);
    setManageTeacherTab('dados');
    setSaveTeacherSuccess(false);
    const rawMatricula = (teacher.matricula || '98150339-1C').trim().toUpperCase();
    const lockedMatricula = rawMatricula.startsWith('98') ? rawMatricula : `98${rawMatricula}`;
    setEditTeacherFormData({
      ...teacher,
      matricula: lockedMatricula,
      cpf: teacher.cpf || '341.892.402-91',
      telefone: teacher.telefone || '(92) 99120-4401',
      email: teacher.email || 'servidor@semed.manaus.am.gov.br',
      cargo: teacher.cargo || 'Professor Nível Superior',
      vinculo: teacher.vinculo || 'Efetivo Concursado',
      dataPosse: '2019-02-15',
      regime: `${teacher.cargaHoraria}h semanais`,
      lotacao: teacher.lotacao || selectedSchool,
      turno: teacher.turno || 'Matutino',
      disciplina: teacher.disciplina,
      turmas: teacher.turmas,
    });
  };

  // Save Teacher/Servidor Edit Changes
  const handleSaveTeacher = () => {
    if (!managingTeacher) return;
    setTeachers(prev => prev.map(t => {
      if (t.id === managingTeacher.id) {
        let validMatricula = (editTeacherFormData.matricula || t.matricula || '98000000-01').trim().toUpperCase();
        if (!validMatricula.startsWith('98')) {
          validMatricula = '98' + validMatricula;
        }
        return {
          ...t,
          nome: (editTeacherFormData.nome || t.nome).toUpperCase(),
          cargo: editTeacherFormData.cargo || t.cargo,
          disciplina: editTeacherFormData.disciplina || t.disciplina,
          matricula: validMatricula,
          turmas: Array.isArray(editTeacherFormData.turmas) ? editTeacherFormData.turmas : t.turmas,
          cargaHoraria: Number(editTeacherFormData.cargaHoraria) || t.cargaHoraria,
          status: editTeacherFormData.status || t.status,
          vinculo: editTeacherFormData.vinculo || t.vinculo,
          turno: editTeacherFormData.turno || t.turno,
          lotacao: editTeacherFormData.lotacao || t.lotacao,
          bairro: editTeacherFormData.bairro || t.bairro,
          cpf: editTeacherFormData.cpf || t.cpf,
          telefone: editTeacherFormData.telefone || t.telefone,
          email: editTeacherFormData.email || t.email,
        };
      }
      return t;
    }));
    setSaveTeacherSuccess(true);
    setTimeout(() => {
      setManagingTeacher(null);
      setSaveTeacherSuccess(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex text-slate-800">
      
      {/* ======================================================== */}
      {/* 1. INSTITUTIONAL RETRACTABLE SIDEBAR                    */}
      {/* ======================================================== */}
      <Sidebar
        currentModule={activeTab}
        currentSubItem={activeSubItem}
        onSelectNavigation={handleNavigation}
        user={currentUser}
        onLogout={onLogout}
        isMobileOpen={isMobileNavOpen}
        onCloseMobile={() => setIsMobileNavOpen(false)}
        onOpenRoleSwitcher={() => setIsRoleSwitcherOpen(true)}
      />

      {/* ======================================================== */}
      {/* 2. MAIN CONTENT AREA COLUMN                             */}
      {/* ======================================================== */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-slate-50">
        
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
          <div className="w-full px-3 sm:px-6 lg:px-8 min-h-16 py-2.5 flex items-center justify-between gap-2.5">
            
            {/* Left Controls: Directly beside the sidebar */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <button
                type="button"
                onClick={() => setIsMobileNavOpen(true)}
                className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer shrink-0"
                aria-label="Abrir menu de navegação lateral"
                title="Abrir menu lateral"
              >
                <Menu className="w-5 h-5 text-slate-700" />
              </button>

              {/* School Selector Dropdown (positioned right next to the sidebar) */}
              <div className="flex items-center gap-1.5 sm:gap-2 bg-slate-100 py-1.5 px-2.5 sm:px-3 rounded-xl border border-slate-200 text-xs shrink-0 max-w-[calc(100vw-80px)] sm:max-w-none">
                <School className="w-4 h-4 text-[#0b4ea2] shrink-0" />
                <span className="font-semibold text-slate-700 shrink-0 hidden sm:inline">Unidade:</span>
                <select
                  value={selectedSchool}
                  onChange={(e) => setSelectedSchool(e.target.value)}
                  className="bg-transparent font-medium text-slate-800 focus:outline-none cursor-pointer max-w-[140px] xs:max-w-[190px] sm:max-w-xs md:max-w-none truncate"
                >
                  <option value="E.M. Antonina Borges de Sá">E.M. Antonina Borges de Sá (Unidade Piloto)</option>
                  <option value="EMEF Darcy Ribeiro">EMEF Darcy Ribeiro (DDZ Leste II)</option>
                  <option value="EMEF Professora Francisca Pereira">EMEF Profa. Francisca Pereira (DDZ Norte)</option>
                  <option value="CMEI Maria Luiza da Silva">CMEI Maria Luiza da Silva (DDZ Sul)</option>
                  <option value="Escola Ribeirinha São Sebastião">Esc. Ribeirinha São Sebastião (DDZ Rural - Rio Negro)</option>
                </select>
              </div>

              {/* Active Profile Pill with Quick Switcher Trigger */}
              <button
                type="button"
                onClick={() => setIsRoleSwitcherOpen(true)}
                className="flex items-center gap-1.5 sm:gap-2 bg-blue-50/80 hover:bg-blue-100 text-[#0b4ea2] border border-blue-200/80 py-1.5 px-2.5 sm:px-3 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0"
                title="Clique para alternar entre os 17 perfis oficiais da SEMED"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#0b4ea2]" />
                <span className="hidden lg:inline text-slate-600 font-medium">Perfil:</span>
                <span className="truncate max-w-[110px] xs:max-w-[140px] sm:max-w-none">{activeProfile.name}</span>
                <span className="text-[10px] bg-blue-200/70 text-[#072d61] px-1.5 py-0.2 rounded font-mono hidden sm:inline">Trocar</span>
              </button>
            </div>

            {/* Right Status Tag */}
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 font-medium shrink-0">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Ano Letivo 2026
              </span>
            </div>

          </div>
        </header>

        {/* Hero Welcome Bar */}
        <section className="bg-gradient-to-r from-[#032c66] to-[#0b4ea2] text-white py-5 sm:py-6 px-4 sm:px-6 lg:px-8 shadow-inner">
          <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-blue-200 mb-1 flex-wrap">
                <span>{currentUser.ddz}</span>
                <span>·</span>
                <span className="bg-white/15 px-2 py-0.2 rounded text-cyan-200 font-bold">{activeProfile.name} ({currentUser.roleTitle})</span>
                <span>·</span>
                <span>Ano Letivo 2026</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                {selectedSchool}
              </h1>
              <p className="text-xs text-blue-100 mt-1 max-w-2xl">
                Portal integrado de acompanhamento pedagógico, lançamento de notas, diário de frequência e administração escolar.
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-3">
              <button 
                type="button"
                onClick={() => alert('Exportando relatório gerencial consolidado da SEMED Manaus...')}
                className="flex-1 sm:flex-none px-3.5 py-2 text-xs font-medium bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center justify-center gap-2 backdrop-blur-xs border border-white/20 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar Dados</span>
              </button>
              <button 
                type="button"
                onClick={() => window.print()}
                className="flex-1 sm:flex-none px-3.5 py-2 text-xs font-medium bg-white text-[#0b4ea2] hover:bg-blue-50 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm font-semibold cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimir Ficha</span>
              </button>
            </div>
          </div>
        </section>


        {/* Main Dynamic View Content */}
        <main className="w-full px-4 sm:px-6 lg:px-8 py-6 flex-1 min-w-0">
          
          {/* Access Restriction Guard for Vedado Modules */}
          {activeTab !== 'visao-geral' && activeTab !== 'administracao-sistema' && activeProfile.moduleCeilings[activeTab]?.level === 'VEDADO' ? (
            <div className="bg-white rounded-3xl border border-rose-200 p-6 sm:p-10 text-center space-y-4 shadow-sm max-w-2xl mx-auto my-6 animate-in fade-in duration-200">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200 shadow-xs">
                <Lock className="w-7 h-7" />
              </div>
              
              <div>
                <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold border border-rose-200">
                  Teto do Perfil: Acesso Vedado
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-2.5">
                  Módulo Restrito para {activeProfile.name}
                </h3>
                <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto leading-relaxed">
                  {activeProfile.moduleCeilings[activeTab]?.details || 'Este módulo não faz parte das atribuições permitidas para o seu perfil funcional na rede municipal de ensino.'}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-1.5">
                <span className="font-bold text-slate-700 block uppercase text-[10px] tracking-wider">
                  Escopo e Limites Oficiais do seu Perfil (SEMED Manaus):
                </span>
                <p className="text-slate-600 leading-relaxed font-sans">
                  {activeProfile.scopeAndLimits}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsRoleSwitcherOpen(true)}
                  className="px-4 py-2 bg-[#0b4ea2] hover:bg-[#093e80] text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
                >
                  Alternar para Perfil com Permissão
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigation('visao-geral')}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                >
                  Retornar à Visão Geral
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* VISÃO GERAL (STANDALONE TOP MODULE) */}
              {activeTab === 'visao-geral' && (
                <VisaoGeralView 
                  onNavigate={handleNavigation} 
                  selectedSchool={selectedSchool} 
                  userRole={currentUser.role}
                />
              )}

          {/* ======================================================== */}
          {/* MODULE: GESTÃO DE ALUNOS                                */}
          {/* ======================================================== */}
          {(activeTab === 'gestao-alunos' || activeTab === 'alunos') && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* SUBVIEW 1.1: LISTA DE ALUNOS & MATRÍCULA */}
              {activeSubItem === 'alunos-lista' && (
                <div className="space-y-6">
                  {/* KPI Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Matrículas Ativas</p>
                        <p className="text-2xl font-extrabold text-slate-900 font-mono mt-1">1.240</p>
                        <p className="text-[11px] text-emerald-600 font-medium mt-0.5">100% capacidade preenchida</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0b4ea2] flex items-center justify-center">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                    </div>

                    <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Frequência Média</p>
                        <p className="text-2xl font-extrabold text-slate-900 font-mono mt-1">94.8%</p>
                        <p className="text-[11px] text-emerald-600 font-medium mt-0.5">Acima da meta SEMED (90%)</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                    </div>

                    <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Alerta de Faltas</p>
                        <p className="text-2xl font-extrabold text-amber-600 font-mono mt-1">18</p>
                        <p className="text-[11px] text-slate-500 font-medium mt-0.5">Busca ativa pedagógica</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6" />
                      </div>
                    </div>

                    <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Bolsa Família / SEMED</p>
                        <p className="text-2xl font-extrabold text-slate-900 font-mono mt-1">892</p>
                        <p className="text-[11px] text-blue-600 font-medium mt-0.5">Alunos beneficiários</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                        <BookOpen className="w-6 h-6" />
                      </div>
                    </div>
                  </div>

                  {/* Roster Controls */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="relative w-full sm:w-96">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        placeholder="Buscar por nome, matrícula ou turma..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0b4ea2]/20 focus:border-[#0b4ea2]"
                      />
                    </div>

                    {canEditInModule(currentUser.role, 'gestao-alunos') && (
                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        <button
                          type="button"
                          onClick={() => alert('Cadastrar novo aluno na base da SEMED Manaus.')}
                          className="px-4 py-2 bg-[#0b4ea2] hover:bg-[#093e80] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Nova Matrícula</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Students Table */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                    <div className="overflow-x-auto w-full">
                      <table className="w-full text-left text-xs border-collapse min-w-[760px]">
                        <thead>
                          <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                            <th className="py-3 px-4 min-w-[280px]">ALUNO(A)</th>
                            <th className="py-3 px-4">MATRÍCULA</th>
                            <th className="py-3 px-4">Turma / Turno</th>
                            <th 
                              className="py-3 px-4 text-center cursor-pointer select-none hover:text-[#0b4ea2] transition-colors"
                              onClick={() => setSortFrequencyOrder(prev => prev === 'desc' ? 'asc' : prev === 'asc' ? 'none' : 'desc')}
                              title="Clique para alternar a ordenação por frequência"
                            >
                              <div className="inline-flex items-center justify-center gap-1.5">
                                <span>Frequência</span>
                                {sortFrequencyOrder === 'desc' && <ArrowDown className="w-3.5 h-3.5 text-[#0b4ea2]" />}
                                {sortFrequencyOrder === 'asc' && <ArrowUp className="w-3.5 h-3.5 text-[#0b4ea2]" />}
                                {sortFrequencyOrder === 'none' && <ArrowUpDown className="w-3 h-3 text-slate-400" />}
                              </div>
                            </th>
                            <th className="py-3 px-4">Situação</th>
                            <th className="py-3 px-4">Responsável / Bairro</th>
                            <th className="py-3 px-4 text-right">Ação</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {filteredStudents.map((student) => (
                            <tr key={student.id} className="hover:bg-slate-50/70 transition-colors">
                              <td className="py-3.5 px-4 font-bold text-slate-800 uppercase whitespace-nowrap">
                                {student.nome}
                              </td>
                              <td className="py-3.5 px-4 font-mono text-slate-500">
                                {student.matricula}
                              </td>
                              <td className="py-3.5 px-4">
                                <span className="font-semibold text-slate-700">{student.turma}</span>
                                <span className="text-slate-400 block text-[10px]">{student.turno}</span>
                              </td>
                              <td className="py-3.5 px-4 text-center font-mono font-semibold">
                                <span className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-bold font-mono ${
                                  student.frequencia >= 90 
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                                }`}>
                                  {student.frequencia}%
                                </span>
                              </td>
                              <td className="py-3.5 px-4">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                                  student.situacao === 'Matriculado' 
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                    : student.situacao === 'Transferido'
                                    ? 'bg-slate-100 text-slate-700'
                                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                                }`}>
                                  {student.situacao}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-slate-600">
                                <div className="uppercase font-semibold text-slate-700">{student.responsavel}</div>
                                <div className="text-[10px] text-slate-400">{student.bairro} - Manaus</div>
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                <div className="flex items-center justify-end">
                                  <button
                                    type="button"
                                    onClick={() => handleOpenManage(student)}
                                    className="p-1.5 text-slate-500 hover:text-[#0b4ea2] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer group"
                                    title="Gerenciar dados pessoais, cadastro e enturmação"
                                    aria-label="Gerenciar dados pessoais, cadastro e enturmação"
                                  >
                                    <Settings className="w-4 h-4 transition-transform group-hover:rotate-45" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* SUBVIEW 1.2: QUADRO DE VAGAS */}
              {activeSubItem === 'alunos-vagas' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                      <p className="text-xs font-semibold text-slate-500 uppercase">Capacidade Total</p>
                      <p className="text-2xl font-black text-slate-900 font-mono mt-1">1.300 vagas</p>
                      <p className="text-[11px] text-blue-600 mt-0.5 font-medium">Turmas matutinas e vespertinas</p>
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                      <p className="text-xs font-semibold text-slate-500 uppercase">Vagas Ocupadas</p>
                      <p className="text-2xl font-black text-emerald-600 font-mono mt-1">1.240 alunos</p>
                      <p className="text-[11px] text-emerald-700 mt-0.5 font-medium">95.4% taxa de ocupação</p>
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                      <p className="text-xs font-semibold text-slate-500 uppercase">Vagas Remanescentes</p>
                      <p className="text-2xl font-black text-cyan-600 font-mono mt-1">60 disponíveis</p>
                      <p className="text-[11px] text-slate-500 mt-0.5 font-medium">Para transferência na rede SEMED</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <h3 className="font-bold text-slate-800 text-sm">Disponibilidade de Vagas por Ano / Série</h3>
                        <p className="text-xs text-slate-500">Distribuição homologada para o ano letivo de 2026</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => alert('Solicitação de remanejamento enviada à DDZ Leste II.')}
                        className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0b4ea2] hover:bg-[#093e80] rounded-xl transition-colors cursor-pointer"
                      >
                        Ajustar Oferta de Vagas
                      </button>
                    </div>

                    <div className="space-y-4">
                      {[
                        { serie: '1º Ano do Ensino Fundamental', ocupadas: 120, total: 120, espera: 4 },
                        { serie: '2º Ano do Ensino Fundamental', ocupadas: 150, total: 150, espera: 2 },
                        { serie: '3º Ano do Ensino Fundamental', ocupadas: 175, total: 180, espera: 0 },
                        { serie: '4º Ano do Ensino Fundamental', ocupadas: 202, total: 210, espera: 0 },
                        { serie: '5º Ano do Ensino Fundamental', ocupadas: 238, total: 240, espera: 1 },
                        { serie: '6º Ano do Ensino Fundamental', ocupadas: 185, total: 200, espera: 0 },
                        { serie: '7º ao 9º Ano do Ensino Fundamental', ocupadas: 170, total: 200, espera: 0 },
                      ].map((item, idx) => {
                        const pct = Math.round((item.ocupadas / item.total) * 100);
                        const vagasLivres = item.total - item.ocupadas;
                        return (
                          <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-slate-800">{item.serie}</span>
                              <div className="flex items-center gap-3">
                                {item.espera > 0 && (
                                  <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-md font-semibold text-[10px]">
                                    {item.espera} na fila de espera
                                  </span>
                                )}
                                <span className="font-mono font-bold text-slate-700">
                                  {item.ocupadas} / {item.total} ({pct}%)
                                </span>
                              </div>
                            </div>
                            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all duration-500 ${
                                  pct >= 100 ? 'bg-rose-500' : pct >= 95 ? 'bg-amber-500' : 'bg-emerald-500'
                                }`} 
                                style={{ width: `${pct}%` }} 
                              />
                            </div>
                            <div className="flex justify-between text-[11px] text-slate-500">
                              <span>{vagasLivres > 0 ? `${vagasLivres} vagas livres para matrícula` : 'Turmas completas'}</span>
                              <span className="font-semibold text-[#0b4ea2]">Turno Matutino & Vespertino</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* SUBVIEW 1.3: REGISTRO DE FREQUÊNCIA */}
              {activeSubItem === 'alunos-frequencia' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                      <p className="text-xs font-semibold text-slate-500 uppercase">Frequência Geral Hoje</p>
                      <p className="text-2xl font-black text-emerald-600 font-mono mt-1">95.2%</p>
                      <p className="text-[11px] text-emerald-700 mt-0.5 font-medium">1.180 presentes</p>
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                      <p className="text-xs font-semibold text-slate-500 uppercase">Faltas Justificadas</p>
                      <p className="text-2xl font-black text-blue-600 font-mono mt-1">42</p>
                      <p className="text-[11px] text-slate-500 mt-0.5 font-medium">Atestados de saúde validados</p>
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                      <p className="text-xs font-semibold text-slate-500 uppercase">Faltas Não Justificadas</p>
                      <p className="text-2xl font-black text-rose-600 font-mono mt-1">18</p>
                      <p className="text-[11px] text-rose-700 mt-0.5 font-medium">Sujeitas a busca ativa</p>
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                      <p className="text-xs font-semibold text-slate-500 uppercase">Busca Ativa SEMED</p>
                      <p className="text-2xl font-black text-[#0b4ea2] font-mono mt-1">100%</p>
                      <p className="text-[11px] text-slate-500 mt-0.5 font-medium">Assistentes sociais atuando</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <h3 className="font-bold text-slate-800 text-sm">Alunos em Monitoramento de Infrequência (Busca Ativa)</h3>
                        <p className="text-xs text-slate-500">Acompanhamento prioritário de infrequência escolar superior a 10%</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => alert('Notificação gerada e enviada ao Conselho Tutelar e SEMED.')}
                        className="px-3.5 py-1.5 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl transition-colors cursor-pointer"
                      >
                        Emitir Ofício Conselho Tutelar
                      </button>
                    </div>

                    <div className="divide-y divide-slate-100 text-xs">
                      {[
                        { nome: 'CAUÃ HENRIQUE DA SILVA MENDES', turma: '4º Ano B', faltasConsecutivas: 4, freq: '88%', contato: '(92) 98412-9901', status: 'Visita domiciliar agendada' },
                        { nome: 'GUILHERME ARAÚJO DOS SANTOS', turma: '4º Ano A', faltasConsecutivas: 6, freq: '84%', contato: '(92) 99341-2044', status: 'Em processo de transferência' },
                        { nome: 'LUCAS GABRIEL MARTINS', turma: '3º Ano A', faltasConsecutivas: 3, freq: '89%', contato: '(92) 98110-3321', status: 'Família contatada via WhatsApp' },
                      ].map((item, idx) => (
                        <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <span className="font-bold text-slate-800 uppercase block">{item.nome}</span>
                            <span className="text-[11px] text-slate-500">Turma: {item.turma} · Contato: {item.contato}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-amber-700 font-mono font-bold">{item.faltasConsecutivas} faltas ({item.freq})</span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                              {item.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ======================================================== */}
          {/* MODULE: NOTAS E FREQUÊNCIA                               */}
          {/* ======================================================== */}
          {activeTab === 'notas-frequencia' && (
            <NotasFrequenciaView students={students} />
          )}

          {/* ======================================================== */}
          {/* MODULE: GESTÃO PEDAGÓGICA                                */}
          {/* ======================================================== */}
          {activeTab === 'gestao-pedagogica' && (
            <GestaoPedagogicaView />
          )}

          {/* ======================================================== */}
          {/* MODULE: EQUIPE ESCOLAR (SERVIDORES & DOCENTES)           */}
          {/* ======================================================== */}
          {(activeTab === 'equipe-escolar' || activeTab === 'servidores') && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* SUBVIEW 2.1: QUADRO DOCENTE & SUBVIEW 2.3: LOTAÇÃO */}
              {(activeSubItem === 'servidores-quadro' || activeSubItem === 'servidores-lotacao' || !activeSubItem) && (
                <div className="space-y-6">
                  {/* Key Metrics Cards for Lotação de Servidores */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Servidores Lotação</p>
                        <p className="text-2xl font-extrabold text-[#0b4ea2] font-mono mt-1">58</p>
                        <p className="text-[11px] text-emerald-600 font-medium mt-0.5">100% quadro docente coberto</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0b4ea2] flex items-center justify-center">
                        <Users className="w-6 h-6" />
                      </div>
                    </div>

                    <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Assiduidade Geral</p>
                        <p className="text-2xl font-extrabold text-emerald-600 font-mono mt-1">96.4%</p>
                        <p className="text-[11px] text-slate-500 font-medium mt-0.5">Ponto biométrico validado</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                    </div>

                    <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Carga Horária Média</p>
                        <p className="text-2xl font-extrabold text-slate-900 font-mono mt-1">38.5h</p>
                        <p className="text-[11px] text-slate-500 font-medium mt-0.5">Com hora-atividade SEMED</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                        <Clock className="w-6 h-6" />
                      </div>
                    </div>

                    <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Efetivos Concursados</p>
                        <p className="text-2xl font-extrabold text-purple-700 font-mono mt-1">82%</p>
                        <p className="text-[11px] text-purple-600 font-medium mt-0.5">18% PSS / Temporários</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                    </div>
                  </div>

                  {/* Lotação by shift cards when specifically viewing Lotação */}
                  {activeSubItem === 'servidores-lotacao' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#0b4ea2] text-sm">Turno Matutino (07:00 às 11:30)</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-[#0b4ea2] border border-blue-200">32 Docentes</span>
                        </div>
                        <p className="text-slate-600">Alocados em 12 salas climatizadas (Blocos A e B). Horário Pedagógico Coletivo: Terças e Quintas.</p>
                      </div>
                      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#0b4ea2] text-sm">Turno Vespertino (13:00 às 17:30)</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-[#0b4ea2] border border-blue-200">26 Docentes</span>
                        </div>
                        <p className="text-slate-600">Alocados em 10 salas climatizadas (Blocos B e C). Horário Pedagógico Coletivo: Segundas e Quartas.</p>
                      </div>
                    </div>
                  )}

                  {/* Servidores Roster Controls */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="relative w-full sm:w-96">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        placeholder="Buscar servidor por nome, matrícula, disciplina ou cargo..."
                        value={searchTeacherQuery}
                        onChange={(e) => setSearchTeacherQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0b4ea2]/20 focus:border-[#0b4ea2]"
                      />
                    </div>

                    {canEditInModule(currentUser.role, 'equipe-escolar') && (
                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            handleOpenManageTeacher({
                              id: String(Date.now()),
                              nome: 'NOVO SERVIDOR DOCENTE',
                              cargo: 'Professor Nível Superior',
                              disciplina: 'Polivalente',
                              matricula: '98120045-1A',
                              turmas: ['5º Ano A'],
                              cargaHoraria: 40,
                              frequencia: 100,
                              status: 'Em atividade',
                              vinculo: 'Efetivo Concursado',
                              turno: 'Matutino',
                              lotacao: selectedSchool,
                              bairro: 'Manaus',
                            });
                          }}
                          className="px-4 py-2 bg-[#0b4ea2] hover:bg-[#093e80] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Nova Lotação</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Servidores / Lotação Table */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                    <div className="overflow-x-auto w-full">
                      <table className="w-full text-left text-xs min-w-[780px]">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[11px] font-semibold">
                          <tr>
                            <th className="py-3 px-4 min-w-[280px]">SERVIDOR(A) / DOCENTE</th>
                            <th className="py-3 px-4">MATRÍCULA</th>
                            <th className="py-3 px-4">Componente & Turmas Atribuídas</th>
                            <th 
                              className="py-3 px-4 text-center cursor-pointer select-none hover:text-[#0b4ea2] transition-colors"
                              onClick={() => setSortTeacherFrequencyOrder(prev => prev === 'desc' ? 'asc' : prev === 'asc' ? 'none' : 'desc')}
                              title="Clique para alternar a ordenação por assiduidade"
                            >
                              <div className="inline-flex items-center justify-center gap-1.5">
                                <span>Assiduidade</span>
                                {sortTeacherFrequencyOrder === 'desc' && <ArrowDown className="w-3.5 h-3.5 text-[#0b4ea2]" />}
                                {sortTeacherFrequencyOrder === 'asc' && <ArrowUp className="w-3.5 h-3.5 text-[#0b4ea2]" />}
                                {sortTeacherFrequencyOrder === 'none' && <ArrowUpDown className="w-3 h-3 text-slate-400" />}
                              </div>
                            </th>
                            <th className="py-3 px-4">Situação</th>
                            <th className="py-3 px-4">Vínculo / Lotação</th>
                            <th className="py-3 px-4 text-right">Ação</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {filteredTeachers.map((teacher) => (
                            <tr key={teacher.id} className="hover:bg-slate-50/70 transition-colors">
                              <td className="py-3.5 px-4 font-bold text-slate-800 uppercase whitespace-nowrap">
                                <div>{teacher.nome}</div>
                                <div className="text-[10px] text-slate-400 font-normal normal-case">{teacher.cargo || 'Professor Nível Superior'} · {teacher.cargaHoraria}h semanais</div>
                              </td>
                              <td className="py-3.5 px-4 font-mono text-slate-600 font-semibold whitespace-nowrap">
                                <span className="inline-flex items-center gap-0.5">
                                  <span className="text-[#0b4ea2] font-black bg-blue-50 px-1 py-0.5 rounded text-[11px] border border-blue-200">98</span>
                                  <span className="ml-0.5 text-slate-700">{teacher.matricula.startsWith('98') ? teacher.matricula.slice(2) : teacher.matricula}</span>
                                </span>
                              </td>
                              <td className="py-3.5 px-4">
                                <span className="font-semibold text-slate-700">{teacher.disciplina}</span>
                                <div className="flex flex-wrap items-center gap-1 mt-1">
                                  {teacher.turmas.map((turma, tidx) => (
                                    <span key={tidx} className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-[#0b4ea2] border border-blue-100">
                                      {turma}
                                    </span>
                                  ))}
                                  <span className="text-slate-400 text-[10px] ml-1">({teacher.turno || 'Matutino'})</span>
                                </div>
                              </td>
                              <td className="py-3.5 px-4 text-center font-mono font-semibold">
                                <span className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-bold font-mono ${
                                  (teacher.frequencia ?? 95) >= 95 
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                                }`}>
                                  {teacher.frequencia ?? 95}%
                                </span>
                              </td>
                              <td className="py-3.5 px-4">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                                  teacher.status === 'Em atividade' 
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                    : teacher.status === 'Licença capacitação'
                                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                    : 'bg-slate-100 text-slate-700'
                                }`}>
                                  {teacher.status}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-slate-600">
                                <div className="uppercase font-semibold text-slate-700">{teacher.vinculo || 'EFETIVO CONCURSADO'}</div>
                                <div className="text-[10px] text-slate-400">{teacher.lotacao || selectedSchool} - Manaus</div>
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                <div className="flex items-center justify-end">
                                  <button
                                    type="button"
                                    onClick={() => handleOpenManageTeacher(teacher)}
                                    className="p-1.5 text-slate-500 hover:text-[#0b4ea2] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer group"
                                    title="Gerenciar dados pessoais, cadastro e lotação do servidor"
                                    aria-label="Gerenciar dados pessoais, cadastro e lotação do servidor"
                                  >
                                    <Settings className="w-4 h-4 transition-transform group-hover:rotate-45" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* SUBVIEW 2.2: FOLHA DE PONTO DIGITAL */}
              {activeSubItem === 'servidores-ponto' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                      <p className="text-xs font-semibold text-slate-500 uppercase">Registros Biométricos Hoje</p>
                      <p className="text-2xl font-black text-emerald-600 font-mono mt-1">58 / 58</p>
                      <p className="text-[11px] text-emerald-700 mt-0.5 font-medium">100% de conformidade</p>
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                      <p className="text-xs font-semibold text-slate-500 uppercase">Atestados Homologados</p>
                      <p className="text-2xl font-black text-blue-600 font-mono mt-1">1 servidor</p>
                      <p className="text-[11px] text-slate-500 mt-0.5 font-medium">Licença capacitação médica</p>
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                      <p className="text-xs font-semibold text-slate-500 uppercase">Fechamento do Mês</p>
                      <p className="text-2xl font-black text-cyan-600 font-mono mt-1">Regular</p>
                      <p className="text-[11px] text-slate-500 mt-0.5 font-medium">Exportação Folha SEMED ativa</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <h3 className="font-bold text-slate-800 text-sm">Registro de Ponto Digital em Tempo Real</h3>
                        <p className="text-xs text-slate-500">Validação biométrica e geolocalizada da unidade escolar</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => alert('Espelho de ponto digital gerado em PDF.')}
                        className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0b4ea2] hover:bg-[#093e80] rounded-xl transition-colors cursor-pointer"
                      >
                        Exportar Espelho de Ponto
                      </button>
                    </div>

                    <div className="divide-y divide-slate-100 text-xs">
                      {[
                        { nome: 'Prof. Carlos Eduardo Siqueira', cargo: 'Professor 40h', entrada: '06:52', intervalo: '11:30 - 12:30', saida: '16:55', status: 'Biometria Facial Confirmada' },
                        { nome: 'Profa. Juliana Medeiros Cunha', cargo: 'Professor 40h', entrada: '06:58', intervalo: '11:30 - 12:30', saida: '17:02', status: 'Biometria Facial Confirmada' },
                        { nome: 'Prof. Raimundo Nonato Farias', cargo: 'Professor 30h', entrada: '07:05', intervalo: '11:30 - 12:30', saida: '13:00', status: 'Biometria Facial Confirmada' },
                        { nome: 'Prof. Thiago Henrique Monteiro', cargo: 'Professor 40h', entrada: '06:45', intervalo: '11:30 - 12:30', saida: '16:50', status: 'Biometria Facial Confirmada' },
                      ].map((reg, idx) => (
                        <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <span className="font-bold text-slate-800 block">{reg.nome}</span>
                            <span className="text-[11px] text-slate-500">{reg.cargo}</span>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-mono">
                            <span>Entrada: <strong>{reg.entrada}</strong></span>
                            <span>Intervalo: <strong>{reg.intervalo}</strong></span>
                            <span>Saída: <strong>{reg.saida}</strong></span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {reg.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ======================================================== */}
          {/* MODULE: ORGANIZAÇÃO ESCOLAR                              */}
          {/* ======================================================== */}
          {(activeTab === 'organizacao-escolar' || activeTab === 'gestao') && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* SUBVIEW 3.1: TURMAS & SALAS CLIMATIZADAS */}
              {(activeSubItem === 'gestao-turmas' || !activeSubItem) && (
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                    <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-sm text-slate-800">Quadro Geral de Salas e Turmas da Unidade</h3>
                        <p className="text-xs text-slate-500">Turnos Matutino e Vespertino com climatização 100% ativa</p>
                      </div>
                    </div>
                    <div className="overflow-x-auto w-full">
                      <table className="w-full text-left text-xs min-w-[650px]">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[11px] font-semibold">
                          <tr>
                            <th className="py-3 px-4">Código</th>
                            <th className="py-3 px-4">Turma</th>
                            <th className="py-3 px-4">Local / Sala</th>
                            <th className="py-3 px-4">Docente Regente</th>
                            <th className="py-3 px-4">Ocupação</th>
                            <th className="py-3 px-4">Turno</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {classes.map((c) => (
                            <tr key={c.id} className="hover:bg-slate-50/70">
                              <td className="py-3.5 px-4 font-mono font-bold text-[#0b4ea2]">{c.codigo}</td>
                              <td className="py-3.5 px-4 font-semibold text-slate-800">{c.nome}</td>
                              <td className="py-3.5 px-4 text-slate-600">{c.sala}</td>
                              <td className="py-3.5 px-4 text-slate-700">{c.professorRegente}</td>
                              <td className="py-3.5 px-4 font-mono font-semibold">
                                {c.totalAlunos} / {c.capacidade} ({Math.round((c.totalAlunos / c.capacidade) * 100)}%)
                              </td>
                              <td className="py-3.5 px-4 text-slate-600">{c.turno}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* SUBVIEW 3.2: MERENDA ESCOLAR REGIONAL */}
              {activeSubItem === 'gestao-merenda' && (
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                        <Utensils className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-slate-800">Alimentação Escolar SEMED Manaus</h3>
                        <p className="text-xs text-slate-500">Cardápio balanceado com aquisição da agricultura familiar e insumos amazônicos</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1.5">
                        <span className="font-bold text-amber-900 block">Segunda-feira</span>
                        <p className="text-amber-800">Arroz com carne moída e legumes frescos, salada verde e suco de cupuaçu natural.</p>
                        <span className="text-[10px] text-amber-700 block font-semibold mt-2">Nutricionista: Dra. Samara Albuquerque</span>
                      </div>
                      <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1.5">
                        <span className="font-bold text-amber-900 block">Terça-feira</span>
                        <p className="text-amber-800">Peixe regional (Tambaqui em cubos ao forno), pirão de farinha de Uarini e banana pacovã cozida.</p>
                        <span className="text-[10px] text-amber-700 block font-semibold mt-2">100% Aceitação dos alunos</span>
                      </div>
                      <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1.5">
                        <span className="font-bold text-amber-900 block">Quarta-feira</span>
                        <p className="text-amber-800">Sopa nutritiva de frango caipira com macarrão, abóbora cabocla e polpa de açaí puro regional.</p>
                        <span className="text-[10px] text-amber-700 block font-semibold mt-2">Rico em ferro e antioxidantes</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SUBVIEW 3.3: TRANSPORTE ESCOLAR */}
              {activeSubItem === 'gestao-transporte' && (
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                      <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">
                        <Ship className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-slate-800">Transporte Escolar Manaus (Fluvial & Terrestre)</h3>
                        <p className="text-xs text-slate-500">Monitoramento diário de frotas escolares autorizadas pela SEMED</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-200 space-y-2">
                        <div className="flex items-center justify-between font-bold text-sky-950">
                          <span className="flex items-center gap-1.5"><Bus className="w-4 h-4 text-sky-700" /> Ônibus Urbano Rota 04</span>
                          <span className="text-emerald-700 text-[10px] px-2 py-0.5 bg-emerald-50 rounded-full border border-emerald-200">Operando Normalmente</span>
                        </div>
                        <p className="text-sky-800">Atende 140 estudantes dos bairros Coroado, Armando Mendes e São José Operário.</p>
                        <span className="text-[11px] text-slate-500 block font-mono">Horários: 06:15 | 11:45 | 12:30 | 17:40</span>
                      </div>

                      <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-200 space-y-2">
                        <div className="flex items-center justify-between font-bold text-sky-950">
                          <span className="flex items-center gap-1.5"><Ship className="w-4 h-4 text-sky-700" /> Lancha Escolar Fluvial 02</span>
                          <span className="text-emerald-700 text-[10px] px-2 py-0.5 bg-emerald-50 rounded-full border border-emerald-200">Em Trânsito no Rio Negro</span>
                        </div>
                        <p className="text-sky-800">Atende 45 estudantes ribeirinhos das comunidades do Rio Negro e Tarumã-Mirim.</p>
                        <span className="text-[11px] text-slate-500 block font-mono">Condutor Habilitado Marinha: Raimundo Nonato</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ======================================================== */}
          {/* MODULE: COMUNICAÇÃO ESCOLAR                              */}
          {/* ======================================================== */}
          {activeTab === 'comunicacao-escolar' && (
            <ComunicacaoEscolarView />
          )}

          {/* ======================================================== */}
          {/* MODULE: ATENDIMENTO AO ESTUDANTE                         */}
          {/* ======================================================== */}
          {activeTab === 'atendimento-estudante' && (
            <AtendimentoEstudanteView />
          )}

          {/* ======================================================== */}
          {/* MODULE: BIBLIOTECA                                       */}
          {/* ======================================================== */}
          {activeTab === 'biblioteca' && (
            <BibliotecaView />
          )}

          {/* ======================================================== */}
          {/* MODULE: PATRIMÔNIO E MANUTENÇÃO                          */}
          {/* ======================================================== */}
          {activeTab === 'patrimonio-manutencao' && (
            <PatrimonioManutencaoView />
          )}

          {/* ======================================================== */}
          {/* MODULE: MATERIAIS E LOGÍSTICA                            */}
          {/* ======================================================== */}
          {activeTab === 'materiais-logistica' && (
            <MateriaisLogisticaView />
          )}

          {/* ======================================================== */}
          {/* MODULE: PORTARIA E VISITANTES                            */}
          {/* ======================================================== */}
          {activeTab === 'portaria-visitantes' && (
            <PortariaVisitantesView />
          )}

          {/* ======================================================== */}
          {/* MODULE: ADMINISTRAÇÃO DO SISTEMA                         */}
          {/* ======================================================== */}
          {activeTab === 'administracao-sistema' && (
            <AdministracaoSistemaView 
              currentProfileId={currentUser.role}
              onSwitchProfile={(p) => {
                setCurrentUser({
                  name: p.sampleUser.name,
                  cpf: p.sampleUser.cpf,
                  role: p.id as any,
                  roleTitle: p.sampleUser.roleTitle,
                  school: p.sampleUser.school,
                  ddz: p.sampleUser.ddz,
                  email: p.sampleUser.email,
                });
              }}
            />
          )}

          {/* ======================================================== */}
          {/* MODULE: PAINÉIS E RELATÓRIOS                             */}
          {/* ======================================================== */}
          {(activeTab === 'paineis-relatorios' || activeTab === 'relatorios') && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* SUBVIEW 4.1: PAINEL IDEB MANAUS */}
              {(activeSubItem === 'relatorios-ideb' || !activeSubItem) && (
                <div className="space-y-6">
                  {/* IDEB Manaus Highlight */}
                  <div className="bg-gradient-to-r from-blue-900 to-[#0b4ea2] text-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-2">
                      <span className="px-2.5 py-1 rounded-full bg-white/20 text-blue-100 text-[11px] font-bold uppercase tracking-wider">
                        Índice de Desenvolvimento da Educação Básica
                      </span>
                      <h3 className="text-2xl font-bold">IDEB Manaus: 6.1 (Meta 5.8 Superada!)</h3>
                      <p className="text-xs text-blue-100 max-w-xl leading-relaxed">
                        A Rede Municipal de Ensino de Manaus alcançou marco histórico nos anos iniciais e finais, destacando-se na Região Norte com o programa de alfabetização na idade certa.
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="text-center p-3 rounded-xl bg-white/10 border border-white/20 min-w-[100px]">
                        <p className="text-[11px] text-blue-200">Aprovação</p>
                        <p className="text-2xl font-black font-mono mt-0.5">96.4%</p>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-white/10 border border-white/20 min-w-[100px]">
                        <p className="text-[11px] text-blue-200">Abandono</p>
                        <p className="text-2xl font-black font-mono mt-0.5 text-emerald-300">0.8%</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SUBVIEW 4.2: INDICADORES POR DDZ */}
              {activeSubItem === 'relatorios-ddz' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { name: 'DDZ Leste I e II', escolas: 134, alunos: 58200, ideb: '6.2', status: 'Destaque em Alfabetização' },
                      { name: 'DDZ Norte', escolas: 152, alunos: 64100, ideb: '6.0', status: 'Maior expansão de vagas' },
                      { name: 'DDZ Sul & Centro-Sul', escolas: 82, alunos: 34500, ideb: '6.4', status: 'Líder em Proficiência' },
                      { name: 'DDZ Oeste & Centro-Oeste', escolas: 96, alunos: 41200, ideb: '6.1', status: 'Robótica e Tecnologia' },
                      { name: 'DDZ Rural Terrestre', escolas: 45, alunos: 12400, ideb: '5.7', status: 'Fortalecimento da infraestrutura' },
                      { name: 'DDZ Rural Ribeirinha (Rios)', escolas: 38, alunos: 8900, ideb: '5.8', status: 'Educação das Águas' },
                    ].map((zone, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-sm text-slate-800">{zone.name}</h4>
                          <span className="text-xs font-mono font-bold px-2 py-0.5 bg-blue-50 text-[#0b4ea2] rounded-md">
                            IDEB {zone.ideb}
                          </span>
                        </div>
                        <div className="text-xs text-slate-600 flex justify-between">
                          <span>{zone.escolas} Escolas Municipais</span>
                          <span className="font-mono font-semibold">{zone.alunos.toLocaleString('pt-BR')} Alunos</span>
                        </div>
                        <p className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg font-medium">
                          {zone.status}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SUBVIEW 4.3: CENSO ESCOLAR 2026 */}
              {activeSubItem === 'relatorios-censo' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <h3 className="font-bold text-slate-800 text-sm">Censo Escolar 2026 (MEC / INEP)</h3>
                        <p className="text-xs text-slate-500">Consistência e migração de dados cadastrais dos estudantes da SEMED</p>
                      </div>
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold">
                        100% Homologado
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <span className="text-slate-500 block">Cadastros Validados:</span>
                        <strong className="text-base text-slate-800 font-mono">1.240 alunos</strong>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <span className="text-slate-500 block">Turmas Cadastradas:</span>
                        <strong className="text-base text-slate-800 font-mono">5 turmas ativas</strong>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <span className="text-slate-500 block">Corpo Docente Vinculado:</span>
                        <strong className="text-base text-slate-800 font-mono">58 docentes</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ======================================================== */}
          {/* MODULE: DOCUMENTOS E SUPORTE                             */}
          {/* ======================================================== */}
          {activeTab === 'documentos-suporte' && (
            <DocumentosSuporteView />
          )}

          {/* ======================================================== */}
          {/* MODULE: FINANCEIRO E INTEGRAÇÕES                         */}
          {/* ======================================================== */}
          {activeTab === 'financeiro-integracoes' && (
            <FinanceiroIntegracoesView />
          )}
            </>
          )}

        </main>

        {/* Student Management Modal (Engrenagem: Dados Pessoais, Cadastro, Enturmação, Boletim) */}
        {managingStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
            <div 
              className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-[#0b4ea2] px-4 sm:px-6 py-3.5 sm:py-4 text-white flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 flex items-center justify-center text-blue-100 shrink-0">
                    <Settings className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm sm:text-base leading-tight truncate">Gerenciamento do(a) Aluno(a)</h3>
                    <p className="text-[11px] sm:text-xs text-blue-200 mt-0.5 truncate">
                      {managingStudent.nome} · MATRÍCULA: <span className="font-mono">{managingStudent.matricula}</span>
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setManagingStudent(null)}
                  className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0 ml-2"
                  aria-label="Fechar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 4 Management Tabs */}
              <div className="px-3 sm:px-6 pt-2.5 sm:pt-3 pb-1 border-b border-slate-200 bg-slate-50 flex items-center gap-1.5 sm:gap-2 overflow-x-auto shrink-0">
                <button
                  type="button"
                  onClick={() => setManageTab('dados')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    manageTab === 'dados' 
                      ? 'bg-white text-[#0b4ea2] shadow-xs border border-slate-200' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>1. Dados Pessoais</span>
                </button>

                <button
                  type="button"
                  onClick={() => setManageTab('cadastro')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    manageTab === 'cadastro' 
                      ? 'bg-white text-[#0b4ea2] shadow-xs border border-slate-200' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>2. Cadastro & Responsável</span>
                </button>

                <button
                  type="button"
                  onClick={() => setManageTab('enturmacao')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    manageTab === 'enturmacao' 
                      ? 'bg-white text-[#0b4ea2] shadow-xs border border-slate-200' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>3. Enturmação</span>
                </button>

                <button
                  type="button"
                  onClick={() => setManageTab('boletim')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    manageTab === 'boletim' 
                      ? 'bg-white text-[#0b4ea2] shadow-xs border border-slate-200' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>4. Boletim</span>
                </button>
              </div>

              {/* Tab Contents */}
              <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
                {saveSuccess && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800 font-semibold animate-in fade-in">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Dados do aluno atualizados com sucesso no SIGEAM!</span>
                  </div>
                )}

                {manageTab === 'dados' && (
                  <div className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block font-semibold text-slate-700 mb-1">Nome Completo do Aluno</label>
                        <input
                          type="text"
                          value={editFormData.nome || ''}
                          onChange={(e) => setEditFormData({ ...editFormData, nome: e.target.value.toUpperCase() })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 uppercase font-medium focus:outline-none focus:ring-2 focus:ring-[#0b4ea2]/30 focus:border-[#0b4ea2]"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">MATRÍCULA</label>
                        <input
                          type="text"
                          value={editFormData.matricula || ''}
                          onChange={(e) => setEditFormData({ ...editFormData, matricula: e.target.value })}
                          placeholder="1042109-4"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0b4ea2]/30 focus:border-[#0b4ea2]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Data de Nascimento</label>
                        <input
                          type="date"
                          value={editFormData.dataNasc || '2015-05-14'}
                          onChange={(e) => setEditFormData({ ...editFormData, dataNasc: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b4ea2]/30 focus:border-[#0b4ea2]"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Sexo Biológico</label>
                        <select
                          value={editFormData.sexo || 'Masculino'}
                          onChange={(e) => setEditFormData({ ...editFormData, sexo: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b4ea2]/30 focus:border-[#0b4ea2]"
                        >
                          <option value="Masculino">Masculino</option>
                          <option value="Feminino">Feminino</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">CPF do Aluno</label>
                        <input
                          type="text"
                          value={editFormData.cpfAluno || '042.819.302-15'}
                          onChange={(e) => setEditFormData({ ...editFormData, cpfAluno: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-[#0b4ea2]/30 focus:border-[#0b4ea2]"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Certidão de Nascimento (Termo)</label>
                        <input
                          type="text"
                          defaultValue="Livro A-12, Fls 45, Termo 12049"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b4ea2]/30 focus:border-[#0b4ea2]"
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-xl flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-800">Atendimento Educacional Especializado (AEE / PCD)</p>
                        <p className="text-[11px] text-slate-500">Acompanhamento pedagógico com sala de recursos multifuncionais</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={editFormData.aee || false}
                        onChange={(e) => setEditFormData({ ...editFormData, aee: e.target.checked })}
                        className="w-4 h-4 text-[#0b4ea2] rounded cursor-pointer"
                      />
                    </div>
                  </div>
                )}

                {manageTab === 'cadastro' && (
                  <div className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block font-semibold text-slate-700 mb-1">Nome do Responsável Legal</label>
                        <input
                          type="text"
                          value={editFormData.responsavel || ''}
                          onChange={(e) => setEditFormData({ ...editFormData, responsavel: e.target.value.toUpperCase() })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 uppercase focus:outline-none focus:ring-2 focus:ring-[#0b4ea2]/30 focus:border-[#0b4ea2]"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Parentesco</label>
                        <select
                          value={editFormData.parentesco || 'Mãe'}
                          onChange={(e) => setEditFormData({ ...editFormData, parentesco: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b4ea2]/30 focus:border-[#0b4ea2]"
                        >
                          <option value="Mãe">Mãe</option>
                          <option value="Pai">Pai</option>
                          <option value="Avó/Avô">Avó / Avô</option>
                          <option value="Responsável Legal">Responsável Legal</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Telefone / WhatsApp</label>
                        <input
                          type="text"
                          value={editFormData.telefone || '(92) 99123-4567'}
                          onChange={(e) => setEditFormData({ ...editFormData, telefone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-[#0b4ea2]/30 focus:border-[#0b4ea2]"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">NIS / Bolsa Família (se houver)</label>
                        <input
                          type="text"
                          value={editFormData.nis || '165.84920.12-3'}
                          onChange={(e) => setEditFormData({ ...editFormData, nis: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-[#0b4ea2]/30 focus:border-[#0b4ea2]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block font-semibold text-slate-700 mb-1">Endereço Residencial</label>
                        <input
                          type="text"
                          value={editFormData.endereco || 'Rua Rio Negro, 142'}
                          onChange={(e) => setEditFormData({ ...editFormData, endereco: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b4ea2]/30 focus:border-[#0b4ea2]"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Bairro em Manaus</label>
                        <input
                          type="text"
                          value={editFormData.bairro || ''}
                          onChange={(e) => setEditFormData({ ...editFormData, bairro: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b4ea2]/30 focus:border-[#0b4ea2]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {manageTab === 'enturmacao' && (
                  <div className="space-y-4 text-xs">
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <p className="font-semibold text-slate-800">Unidade Escolar Atual</p>
                      <p className="text-slate-600 font-medium">{selectedSchool} · DDZ Leste II</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Turma de Enturmação</label>
                        <select
                          value={editFormData.turma || ''}
                          onChange={(e) => setEditFormData({ ...editFormData, turma: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-[#0b4ea2]/30 focus:border-[#0b4ea2]"
                        >
                          <option value="5º Ano A">5º Ano A - Anos Iniciais</option>
                          <option value="5º Ano B">5º Ano B - Anos Iniciais</option>
                          <option value="4º Ano A">4º Ano A - Anos Iniciais</option>
                          <option value="4º Ano B">4º Ano B - Anos Iniciais</option>
                          <option value="3º Ano A">3º Ano A - Anos Iniciais</option>
                          <option value="6º Ano A">6º Ano A - Anos Finais</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Turno</label>
                        <select
                          value={editFormData.turno || 'Matutino'}
                          onChange={(e) => setEditFormData({ ...editFormData, turno: e.target.value as any })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b4ea2]/30 focus:border-[#0b4ea2]"
                        >
                          <option value="Matutino">Matutino (07:00 às 11:30)</option>
                          <option value="Vespertino">Vespertino (13:00 às 17:30)</option>
                          <option value="Integral">Tempo Integral (07:30 às 16:30)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Situação da Matrícula</label>
                      <select
                        value={editFormData.situacao || 'Matriculado'}
                        onChange={(e) => setEditFormData({ ...editFormData, situacao: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b4ea2]/30 focus:border-[#0b4ea2]"
                      >
                        <option value="Matriculado">Matriculado (Regular)</option>
                        <option value="Em análise">Em análise de documentação</option>
                        <option value="Transferido">Transferido para outra escola</option>
                      </select>
                    </div>
                  </div>
                )}

                {manageTab === 'boletim' && (
                  <div className="space-y-4 text-xs">
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-slate-500 block">Frequência Geral:</span>
                        <strong className="text-emerald-700 font-bold">{managingStudent.frequencia}% (Presente)</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Situação Atual:</span>
                        <strong className="text-slate-800 font-bold">{managingStudent.situacao}</strong>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">Notas Bimestrais (Média 6.0)</h4>
                      <div className="divide-y divide-slate-100 text-xs">
                        <div className="flex justify-between py-1.5"><span>Língua Portuguesa</span><span className="font-mono font-bold text-emerald-600">8.8</span></div>
                        <div className="flex justify-between py-1.5"><span>Matemática</span><span className="font-mono font-bold text-emerald-600">9.2</span></div>
                        <div className="flex justify-between py-1.5"><span>Ciências Naturais</span><span className="font-mono font-bold text-emerald-600">8.5</span></div>
                        <div className="flex justify-between py-1.5"><span>História & Geografia do Amazonas</span><span className="font-mono font-bold text-emerald-600">9.5</span></div>
                        <div className="flex justify-between py-1.5"><span>Arte & Cultura Regional</span><span className="font-mono font-bold text-emerald-600">10.0</span></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="bg-slate-50 px-4 sm:px-6 py-3 sm:py-3.5 border-t border-slate-200 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setManagingStudent(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer text-center"
                >
                  {canEditInModule(currentUser.role, 'gestao-alunos') ? 'Cancelar' : 'Fechar'}
                </button>
                {canEditInModule(currentUser.role, 'gestao-alunos') && (
                  <button
                    type="button"
                    onClick={handleSaveStudent}
                    className="px-5 py-2 text-xs font-semibold text-white bg-[#0b4ea2] hover:bg-[#093e80] rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Salvar Alterações</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Teacher/Servidor Management Modal (Engrenagem: Dados Pessoais, Cadastro, Lotação & Turmas, Assiduidade) */}
        {managingTeacher && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
            <div 
              className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-[#0b4ea2] px-4 sm:px-6 py-3.5 sm:py-4 text-white flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 flex items-center justify-center text-blue-100 shrink-0">
                    <Settings className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm sm:text-base leading-tight truncate">Gerenciamento de Lotação do(a) Servidor(a)</h3>
                    <p className="text-[11px] sm:text-xs text-blue-200 mt-0.5 truncate">
                      {managingTeacher.nome} · MATRÍCULA: <span className="font-mono font-bold text-white bg-white/20 px-1.5 py-0.5 rounded">{managingTeacher.matricula.startsWith('98') ? managingTeacher.matricula : `98${managingTeacher.matricula}`}</span>
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setManagingTeacher(null)}
                  className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0 ml-2"
                  aria-label="Fechar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 4 Management Tabs */}
              <div className="px-3 sm:px-6 pt-2.5 sm:pt-3 pb-1 border-b border-slate-200 bg-slate-50 flex items-center gap-1.5 sm:gap-2 overflow-x-auto shrink-0">
                <button
                  type="button"
                  onClick={() => setManageTeacherTab('dados')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    manageTeacherTab === 'dados' 
                      ? 'bg-white text-[#0b4ea2] shadow-xs border border-slate-200' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>1. Dados Pessoais</span>
                </button>

                <button
                  type="button"
                  onClick={() => setManageTeacherTab('cadastro')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    manageTeacherTab === 'cadastro' 
                      ? 'bg-white text-[#0b4ea2] shadow-xs border border-slate-200' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>2. Cadastro Funcional</span>
                </button>

                <button
                  type="button"
                  onClick={() => setManageTeacherTab('lotacao')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    manageTeacherTab === 'lotacao' 
                      ? 'bg-white text-[#0b4ea2] shadow-xs border border-slate-200' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>3. Lotação & Turmas</span>
                </button>

                <button
                  type="button"
                  onClick={() => setManageTeacherTab('assiduidade')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    manageTeacherTab === 'assiduidade' 
                      ? 'bg-white text-[#0b4ea2] shadow-xs border border-slate-200' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>4. Assiduidade & Ponto</span>
                </button>
              </div>

              {/* Tab Contents */}
              <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
                {saveTeacherSuccess && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Alterações de lotação e cadastro salvas com sucesso na base SEMED!</span>
                  </div>
                )}

                {manageTeacherTab === 'dados' && (
                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Nome Completo do(a) Servidor(a)</label>
                      <input
                        type="text"
                        value={editTeacherFormData.nome || ''}
                        onChange={(e) => setEditTeacherFormData({ ...editTeacherFormData, nome: e.target.value.toUpperCase() })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 uppercase font-semibold focus:outline-none focus:ring-2 focus:ring-[#0b4ea2]/30 focus:border-[#0b4ea2]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">CPF do Servidor</label>
                        <input
                          type="text"
                          value={editTeacherFormData.cpf || ''}
                          onChange={(e) => setEditTeacherFormData({ ...editTeacherFormData, cpf: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-[#0b4ea2]/30 focus:border-[#0b4ea2]"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Telefone / WhatsApp</label>
                        <input
                          type="text"
                          value={editTeacherFormData.telefone || ''}
                          onChange={(e) => setEditTeacherFormData({ ...editTeacherFormData, telefone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b4ea2]/30 focus:border-[#0b4ea2]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">E-mail Institucional SEMED</label>
                        <input
                          type="email"
                          value={editTeacherFormData.email || ''}
                          onChange={(e) => setEditTeacherFormData({ ...editTeacherFormData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b4ea2]/30 focus:border-[#0b4ea2]"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Bairro de Residência</label>
                        <input
                          type="text"
                          value={editTeacherFormData.bairro || ''}
                          onChange={(e) => setEditTeacherFormData({ ...editTeacherFormData, bairro: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b4ea2]/30 focus:border-[#0b4ea2]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {manageTeacherTab === 'cadastro' && (
                  <div className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block font-semibold text-slate-700">MATRÍCULA</label>
                          <span className="text-[10px] font-bold text-[#0b4ea2] bg-blue-50 px-2 py-0.5 rounded border border-blue-200 flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5" /> 98 Obrigatório e Fixo
                          </span>
                        </div>
                        <div className="flex rounded-xl border border-slate-300 overflow-hidden focus-within:ring-2 focus-within:ring-[#0b4ea2]/30 focus-within:border-[#0b4ea2] bg-white shadow-2xs">
                          <div 
                            className="flex items-center gap-1.5 px-3 bg-slate-100 border-r border-slate-300 text-[#0b4ea2] font-mono font-black text-sm select-none"
                            title="O prefixo '98' é o código fixo padrão da SEMED para servidores/professores e não pode ser apagado"
                          >
                            <Lock className="w-3.5 h-3.5 text-slate-400" />
                            <span>98</span>
                          </div>
                          <input
                            type="text"
                            value={
                              (editTeacherFormData.matricula || '').startsWith('98')
                                ? (editTeacherFormData.matricula || '').slice(2)
                                : (editTeacherFormData.matricula || '')
                            }
                            onChange={(e) => {
                              let val = e.target.value.toUpperCase().replace(/\s+/g, '');
                              if (val.startsWith('98')) {
                                val = val.slice(2);
                              }
                              setEditTeacherFormData({ 
                                ...editTeacherFormData, 
                                matricula: '98' + val 
                              });
                            }}
                            placeholder="150339-1C"
                            className="w-full px-3 py-2.5 font-mono font-bold text-slate-800 text-sm focus:outline-none uppercase bg-white tracking-wider"
                          />
                        </div>
                        <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-[#0b4ea2]" />
                          Padrão SEMED: <span className="font-mono font-semibold text-slate-700">98 + Matrícula (ex: 98150339-1C)</span>
                        </p>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Cargo / Função</label>
                        <select
                          value={editTeacherFormData.cargo || 'Professor Nível Superior'}
                          onChange={(e) => setEditTeacherFormData({ ...editTeacherFormData, cargo: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium focus:outline-none focus:ring-2 focus:ring-[#0b4ea2]/30 focus:border-[#0b4ea2]"
                        >
                          <option value="Professor Nível Superior">Professor Nível Superior</option>
                          <option value="Professor de Educação Física">Professor de Educação Física</option>
                          <option value="Pedagoga Escolar">Pedagoga Escolar</option>
                          <option value="Coordenador Pedagógico">Coordenador Pedagógico</option>
                          <option value="Secretário Escolar">Secretário Escolar</option>
                          <option value="Assistente Técnico Educacional">Assistente Técnico Educacional</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Vínculo Funcional</label>
                        <select
                          value={editTeacherFormData.vinculo || 'Efetivo Concursado'}
                          onChange={(e) => setEditTeacherFormData({ ...editTeacherFormData, vinculo: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b4ea2]/30 focus:border-[#0b4ea2]"
                        >
                          <option value="Efetivo Concursado">Efetivo Concursado</option>
                          <option value="PSS / Temporário">PSS / Temporário</option>
                          <option value="Comissionado">Comissionado</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Carga Horária Semanal</label>
                        <select
                          value={editTeacherFormData.cargaHoraria || 40}
                          onChange={(e) => setEditTeacherFormData({ ...editTeacherFormData, cargaHoraria: Number(e.target.value) })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-[#0b4ea2]/30 focus:border-[#0b4ea2]"
                        >
                          <option value={20}>20 horas semanais</option>
                          <option value={30}>30 horas semanais</option>
                          <option value={40}>40 horas semanais (DE)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Situação do Servidor</label>
                        <select
                          value={editTeacherFormData.status || 'Em atividade'}
                          onChange={(e) => setEditTeacherFormData({ ...editTeacherFormData, status: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b4ea2]/30 focus:border-[#0b4ea2]"
                        >
                          <option value="Em atividade">Em atividade</option>
                          <option value="Licença capacitação">Licença capacitação</option>
                          <option value="Atestado">Atestado médico</option>
                          <option value="Removido">Removido / Transferido</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {manageTeacherTab === 'lotacao' && (
                  <div className="space-y-4 text-xs">
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <p className="font-semibold text-slate-800">Unidade Escolar de Lotação</p>
                      <p className="text-slate-600 font-medium">{editTeacherFormData.lotacao || selectedSchool} · DDZ Leste II</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Componente Curricular / Disciplina</label>
                        <input
                          type="text"
                          value={editTeacherFormData.disciplina || ''}
                          onChange={(e) => setEditTeacherFormData({ ...editTeacherFormData, disciplina: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-[#0b4ea2]/30 focus:border-[#0b4ea2]"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Turno Principal de Atuação</label>
                        <select
                          value={editTeacherFormData.turno || 'Matutino'}
                          onChange={(e) => setEditTeacherFormData({ ...editTeacherFormData, turno: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b4ea2]/30 focus:border-[#0b4ea2]"
                        >
                          <option value="Matutino">Matutino (07:00 às 11:30)</option>
                          <option value="Vespertino">Vespertino (13:00 às 17:30)</option>
                          <option value="Integral">Tempo Integral (07:30 às 16:30)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Turmas Atribuídas (Enturmação do Docente)</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                        {['5º Ano A', '5º Ano B', '4º Ano A', '4º Ano B', '3º Ano A', '6º Ano A'].map((turmaOption) => {
                          const currentTurmas: string[] = Array.isArray(editTeacherFormData.turmas) ? editTeacherFormData.turmas : [];
                          const isChecked = currentTurmas.includes(turmaOption);
                          return (
                            <label key={turmaOption} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={(e) => {
                                  const updated = e.target.checked
                                    ? [...currentTurmas, turmaOption]
                                    : currentTurmas.filter(t => t !== turmaOption);
                                  setEditTeacherFormData({ ...editTeacherFormData, turmas: updated });
                                }}
                                className="w-4 h-4 text-[#0b4ea2] rounded cursor-pointer"
                              />
                              <span className="font-medium">{turmaOption}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {manageTeacherTab === 'assiduidade' && (
                  <div className="space-y-4 text-xs">
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-slate-500 block">Assiduidade Geral:</span>
                        <span className="font-bold text-base text-emerald-600 font-mono">
                          {editTeacherFormData.frequencia ?? 98}% de presença
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Ponto Facial Biométrico:</span>
                        <span className="font-bold text-slate-800">Homologado e Ativo</span>
                      </div>
                    </div>

                    <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-emerald-900">
                      <p className="font-semibold">Conformidade com a Portaria SEMED / Ponto Digital</p>
                      <p className="text-[11px] text-emerald-700 mt-0.5">
                        O(a) servidor(a) possui todas as marcações de entrada, intervalo e saída confirmadas biometricamente na unidade escolar.
                      </p>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => alert(`Espelho de ponto do servidor ${editTeacherFormData.nome} gerado com sucesso em PDF.`)}
                        className="px-3.5 py-2 text-xs font-semibold text-[#0b4ea2] bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Printer className="w-4 h-4" />
                        <span>Emitir Espelho de Ponto Individual</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="bg-slate-50 px-4 sm:px-6 py-3 sm:py-3.5 border-t border-slate-200 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setManagingTeacher(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer text-center"
                >
                  {canEditInModule(currentUser.role, 'equipe-escolar') ? 'Cancelar' : 'Fechar'}
                </button>
                {canEditInModule(currentUser.role, 'equipe-escolar') && (
                  <button
                    type="button"
                    onClick={handleSaveTeacher}
                    className="px-5 py-2 text-xs font-semibold text-white bg-[#0b4ea2] hover:bg-[#093e80] rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Salvar Alterações de Lotação</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* System Footer */}
        <footer className="bg-white border-t border-slate-200 py-4 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 flex flex-col items-center justify-center gap-2 text-center mt-auto">
          <div className="flex flex-col items-center justify-center gap-1.5 text-center w-full">
            <ManausLogo variant="color" size="sm" showSubtitle={false} />
            <span className="text-center font-medium">© 2026 SEMED - Prefeitura de Manaus. Todos os direitos reservados.</span>
          </div>
          <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400">
            <span>Central de Atendimento: (92) 3632-2250</span>
            <span>·</span>
            <span>Versão SIGEON 1.0 (Outubro de 2026)</span>
          </div>
        </footer>

        {/* Role Switcher Modal (17 Canonical Profiles) */}
        <RoleSwitcherModal
          isOpen={isRoleSwitcherOpen}
          onClose={() => setIsRoleSwitcherOpen(false)}
          currentRole={currentUser.role}
          onSelectUser={(newUser) => {
            setCurrentUser(newUser);
          }}
        />

      </div>
    </div>
  );
};
