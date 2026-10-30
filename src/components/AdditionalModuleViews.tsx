import React, { useState } from 'react';
import { 
  LayoutGrid, 
  GraduationCap, 
  ClipboardCheck, 
  BookOpen, 
  Users, 
  School, 
  MessagesSquare, 
  Heart, 
  Library, 
  Building, 
  Package, 
  ShieldCheck, 
  Settings, 
  TrendingUp, 
  Files, 
  Landmark, 
  Search, 
  Plus, 
  Download, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Calendar, 
  Printer, 
  CheckCircle2, 
  ArrowRight, 
  Send, 
  Phone, 
  Mail, 
  Ship, 
  Bus, 
  Utensils, 
  Check, 
  FileText,
  UserCheck,
  QrCode,
  FileCheck,
  XCircle,
  AlertCircle,
  RefreshCw,
  Lock,
  Edit3,
  X
} from 'lucide-react';
import { Student } from '../types';
import { RbacProfilesSection } from './RbacProfilesSection';
import { ProfileDefinition, hasModuleAccess } from '../config/rbacProfiles';

// ============================================================================
// 1. VISÃO GERAL (OVERVIEW EXECUTIVE DASHBOARD)
// ============================================================================
export const VisaoGeralView: React.FC<{ 
  onNavigate: (module: string) => void;
  selectedSchool: string;
  userRole?: string;
}> = ({ onNavigate, selectedSchool, userRole }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          onClick={() => onNavigate('gestao-alunos')}
          className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between cursor-pointer hover:border-[#0b4ea2]/40 transition-all hover:shadow-sm"
        >
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Matrículas Ativas</p>
            <p className="text-2xl font-extrabold text-slate-900 font-mono mt-1">1.240</p>
            <p className="text-[11px] text-emerald-600 font-medium mt-0.5">100% capacidade preenchida</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0b4ea2] flex items-center justify-center">
            <GraduationCap className="w-6 h-6" />
          </div>
        </div>

        <div 
          onClick={() => onNavigate('notas-frequencia')}
          className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between cursor-pointer hover:border-emerald-500/40 transition-all hover:shadow-sm"
        >
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Frequência Média</p>
            <p className="text-2xl font-extrabold text-slate-900 font-mono mt-1">94.8%</p>
            <p className="text-[11px] text-emerald-600 font-medium mt-0.5">Acima da meta SEMED (90%)</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>

        <div 
          onClick={() => onNavigate('equipe-escolar')}
          className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between cursor-pointer hover:border-purple-500/40 transition-all hover:shadow-sm"
        >
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Corpo Docente</p>
            <p className="text-2xl font-extrabold text-[#0b4ea2] font-mono mt-1">58</p>
            <p className="text-[11px] text-purple-600 font-medium mt-0.5">Assiduidade 96.4% no ponto</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div 
          onClick={() => onNavigate('paineis-relatorios')}
          className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between cursor-pointer hover:border-amber-500/40 transition-all hover:shadow-sm"
        >
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">IDEB Unidade</p>
            <p className="text-2xl font-extrabold text-amber-600 font-mono mt-1">6.1</p>
            <p className="text-[11px] text-emerald-600 font-medium mt-0.5">Meta 5.8 superada (SEMED)</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Quick Access Matrix to All Core Modules */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Painel Central de Gestão Integrada</h3>
            <p className="text-xs text-slate-500">Acesse diretamente os módulos administrativos e pedagógicos da unidade escolar</p>
          </div>
          <span className="text-[11px] font-semibold text-[#0b4ea2] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200 shrink-0 self-start sm:self-auto">
            Ano Letivo 2026 Ativo
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            { id: 'gestao-alunos', label: 'Vida Escolar', desc: '1.240 Alunos matriculados', icon: GraduationCap, color: 'text-blue-600 bg-blue-50' },
            { id: 'notas-frequencia', label: 'Diário Escolar', desc: 'Diário e avaliações bimestrais', icon: ClipboardCheck, color: 'text-emerald-600 bg-emerald-50' },
            { id: 'organizacao-escolar', label: 'Organização Escolar', desc: '12 Salas climatizadas e turmas', icon: School, color: 'text-slate-700 bg-slate-100' },
            { id: 'gestao-pedagogica', label: 'Gestão Pedagógica', desc: 'Planos de aula e projetos', icon: BookOpen, color: 'text-indigo-600 bg-indigo-50' },
            { id: 'equipe-escolar', label: 'Gestão de Pessoas', desc: '58 Servidores e ponto digital', icon: Users, color: 'text-cyan-600 bg-cyan-50' },
            { id: 'comunicacao-escolar', label: 'Comunicação Escolar', desc: 'Mural e avisos aos responsáveis', icon: MessagesSquare, color: 'text-teal-600 bg-teal-50' },
            { id: 'materiais-logistica', label: 'Recursos e Logística', desc: 'Cardápio regionalizado SEMED', icon: Package, color: 'text-amber-600 bg-amber-50' },
            { id: 'paineis-relatorios', label: 'Relatórios e Indicadores', desc: 'Indicadores IDEB e Censo', icon: TrendingUp, color: 'text-rose-600 bg-rose-50' },
          ]
            .filter((card) => !userRole || hasModuleAccess(userRole, card.id))
            .map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => onNavigate(card.id)}
                className="p-3.5 rounded-xl border border-slate-200/80 hover:border-[#0b4ea2] bg-slate-50/50 hover:bg-blue-50/30 transition-all text-left flex flex-col justify-between group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${card.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#0b4ea2] group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="mt-3">
                  <h4 className="font-bold text-xs text-slate-800 group-hover:text-[#0b4ea2] transition-colors">{card.label}</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">{card.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Operational Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Merenda Card */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <Utensils className="w-4 h-4 text-amber-600" /> Alimentação Escolar Hoje
            </span>
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Homologado</span>
          </div>
          <p className="text-xs text-slate-600">Peixe regional (Tambaqui assado), arroz com legumes e suco de cupuaçu natural.</p>
          <span className="text-[11px] text-slate-400 block">Cardápio SEMED · Agricultura familiar do AM</span>
        </div>

        {/* Climatização Card */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <School className="w-4 h-4 text-[#0b4ea2]" /> Climatização de Salas
            </span>
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">100% Ativa</span>
          </div>
          <p className="text-xs text-slate-600">Todas as 12 salas de aula e laboratório climatizados nos Blocos A, B e C.</p>
          <span className="text-[11px] text-slate-400 block">Manutenção preventiva regularizada</span>
        </div>

        {/* Ponto Facial Card */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Ponto Digital Facial
            </span>
            <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">58 / 58 Registrados</span>
          </div>
          <p className="text-xs text-slate-600">Marcação biométrica facial do corpo docente e administrativo sincronizada.</p>
          <span className="text-[11px] text-slate-400 block">Portaria SEMED Manaus cumprida</span>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 2. NOTAS E FREQUÊNCIA (GRADEBOOK & DAILY ATTENDANCE)
// ============================================================================
export const NotasFrequenciaView: React.FC<{ students: Student[]; userRole?: string }> = ({ students, userRole = 'gestor' }) => {
  const [selectedBimestre, setSelectedBimestre] = useState('1º Bimestre');
  const [selectedTurma, setSelectedTurma] = useState('Todas as Turmas');
  const [gradeList, setGradeList] = useState<Record<string, { port: number; mat: number; cien: number; retificada?: boolean; justificativa?: string }>>({
    '1': { port: 8.8, mat: 9.2, cien: 8.5 },
    '2': { port: 9.5, mat: 9.0, cien: 9.2 },
    '3': { port: 6.5, mat: 7.0, cien: 6.8, retificada: true, justificativa: 'Retificado após revisão de prova pelo Pedagogo' },
    '4': { port: 7.5, mat: 8.0, cien: 7.8 },
    '5': { port: 8.0, mat: 8.5, cien: 8.2 },
    '6': { port: 9.8, mat: 9.5, cien: 9.6 },
    '7': { port: 5.5, mat: 6.0, cien: 5.8 },
  });

  const [studentFrequencies, setStudentFrequencies] = useState<Record<string, { freq: number; faltasAbonadas: number }>>({
    '1': { freq: 96, faltasAbonadas: 0 },
    '2': { freq: 98, faltasAbonadas: 0 },
    '3': { freq: 88, faltasAbonadas: 2 },
    '4': { freq: 95, faltasAbonadas: 0 },
    '5': { freq: 92, faltasAbonadas: 0 },
    '6': { freq: 99, faltasAbonadas: 0 },
    '7': { freq: 72, faltasAbonadas: 0 }, // Below 75% -> triggers low attendance alert
  });

  // Retificação Modal State
  const [retificandoStudent, setRetificandoStudent] = useState<Student | null>(null);
  const [editDisciplina, setEditDisciplina] = useState<'port' | 'mat' | 'cien'>('port');
  const [newNota, setNewNota] = useState<string>('8.0');
  const [justificativa, setJustificativa] = useState<string>('');
  const [atestadoModalStudent, setAtestadoModalStudent] = useState<Student | null>(null);
  const [atestadoDias, setAtestadoDias] = useState<number>(3);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const isBimestreAberto = selectedBimestre === '1º Bimestre';
  const canRectify = ['gestor', 'pedagogo', 'assessor-tecnico'].includes(userRole);

  const handleSaveNota = (e: React.FormEvent) => {
    e.preventDefault();
    if (!retificandoStudent) return;

    const val = parseFloat(newNota.replace(',', '.'));
    if (isNaN(val) || val < 0 || val > 10) {
      alert('Regra Normativa: Nota deve ser entre 0 e 10 com até uma casa decimal.');
      return;
    }

    if (!isBimestreAberto && !justificativa.trim()) {
      alert('Regra Normativa do SIGEON: Alteração de nota fora do prazo/bimestre aberto exige justificativa obrigatória e registro de auditoria.');
      return;
    }

    setGradeList(prev => ({
      ...prev,
      [retificandoStudent.id]: {
        ...(prev[retificandoStudent.id] || { port: 8, mat: 8, cien: 8 }),
        [editDisciplina]: Math.round(val * 10) / 10,
        retificada: true,
        justificativa: justificativa.trim() || 'Ajuste docente homologado',
      }
    }));

    setSuccessMessage(`Nota de ${retificandoStudent.nome} retificada com sucesso e registrada na trilha de auditoria.`);
    setTimeout(() => setSuccessMessage(''), 3500);
    setRetificandoStudent(null);
    setJustificativa('');
  };

  const handleAbonarAtestado = () => {
    if (!atestadoModalStudent) return;
    setStudentFrequencies(prev => {
      const current = prev[atestadoModalStudent.id] || { freq: atestadoModalStudent.frequencia, faltasAbonadas: 0 };
      const newFreq = Math.min(100, current.freq + (atestadoDias * 2));
      return {
        ...prev,
        [atestadoModalStudent.id]: {
          freq: newFreq,
          faltasAbonadas: current.faltasAbonadas + atestadoDias,
        }
      };
    });
    setSuccessMessage(`Atestado médico de ${atestadoDias} dias deferido. Faltas abonadas automaticamente conforme Seção 8 do SIGEON.`);
    setTimeout(() => setSuccessMessage(''), 3500);
    setAtestadoModalStudent(null);
  };

  const filtered = students.filter(s => 
    selectedTurma === 'Todas as Turmas' ? true : s.turma === selectedTurma
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Success banner */}
      {successMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">{successMessage}</span>
          </div>
          <button onClick={() => setSuccessMessage('')} className="text-emerald-700 hover:text-emerald-900 cursor-pointer">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase">Frequência Geral Registrada</p>
          <p className="text-2xl font-black text-emerald-600 font-mono mt-1">95.2%</p>
          <p className="text-[11px] text-emerald-700 mt-0.5 font-medium">1.180 estudantes presentes hoje</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase">Faltas Justificadas por Atestado</p>
          <p className="text-2xl font-black text-blue-600 font-mono mt-1">42</p>
          <p className="text-[11px] text-slate-500 mt-0.5 font-medium">Abono automático aplicado pelo sistema</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase">Média Geral da Unidade</p>
          <p className="text-2xl font-black text-[#0b4ea2] font-mono mt-1">8.6</p>
          <p className="text-[11px] text-slate-500 mt-0.5 font-medium">Corte de aprovação: 6.0 (Regimento SEMED)</p>
        </div>
      </div>

      {/* Controls & Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-800 text-sm">Diário de Classe & Rendimento Bimestral</h3>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                isBimestreAberto ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {isBimestreAberto ? '● 1º Bimestre Aberto' : '🔒 Bimestre Fechado'}
              </span>
            </div>
            <p className="text-xs text-slate-500">Lançamento de proficiência com trava de 0 a 10 (uma casa decimal) e retificação auditada</p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={selectedBimestre}
              onChange={(e) => setSelectedBimestre(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-700 cursor-pointer"
            >
              <option value="1º Bimestre">1º Bimestre 2026 (Aberto)</option>
              <option value="2º Bimestre">2º Bimestre 2026 (Aguardando)</option>
              <option value="3º Bimestre">3º Bimestre 2026 (Fechado)</option>
              <option value="4º Bimestre">4º Bimestre 2026 (Fechado)</option>
            </select>
            <select
              value={selectedTurma}
              onChange={(e) => setSelectedTurma(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-700 cursor-pointer"
            >
              <option value="Todas as Turmas">Todas as Turmas</option>
              <option value="5º Ano A">5º Ano A</option>
              <option value="5º Ano B">5º Ano B</option>
              <option value="4º Ano A">4º Ano A</option>
              <option value="4º Ano B">4º Ano B</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-xs min-w-[760px]">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[11px] font-semibold">
              <tr>
                <th className="py-3 px-4">Estudante</th>
                <th className="py-3 px-4">Matrícula</th>
                <th className="py-3 px-4">Turma</th>
                <th className="py-3 px-4 text-center">Português</th>
                <th className="py-3 px-4 text-center">Matemática</th>
                <th className="py-3 px-4 text-center">Ciências</th>
                <th className="py-3 px-4 text-center">Frequência</th>
                <th className="py-3 px-4 text-center">Status / Alerta</th>
                <th className="py-3 px-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((s) => {
                const g = gradeList[s.id] || { port: 8.0, mat: 8.0, cien: 8.0 };
                const freqData = studentFrequencies[s.id] || { freq: s.frequencia, faltasAbonadas: 0 };
                const isLowFreq = freqData.freq < 75;

                return (
                  <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-800 uppercase">
                      <div>{s.nome}</div>
                      {g.retificada && (
                        <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200 mt-0.5 inline-block">
                          RETIFICADA
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500">{s.matricula}</td>
                    <td className="py-3 px-4 font-semibold text-slate-700">{s.turma}</td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-[#0b4ea2]">{g.port.toFixed(1)}</td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-[#0b4ea2]">{g.mat.toFixed(1)}</td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-[#0b4ea2]">{g.cien.toFixed(1)}</td>
                    <td className="py-3 px-4 text-center font-mono font-bold">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-mono font-bold ${
                        isLowFreq ? 'bg-rose-100 text-rose-800 border border-rose-300' : 'text-slate-800'
                      }`}>
                        {freqData.freq}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {isLowFreq ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 animate-pulse">
                          <AlertTriangle className="w-3 h-3" />
                          Risco Evasão (&lt;75%)
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Aprovado
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setRetificandoStudent(s);
                            setNewNota(g[editDisciplina].toFixed(1));
                          }}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-[#0b4ea2] hover:text-white text-slate-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                          title="Lançar ou retificar nota"
                        >
                          Lançar Nota
                        </button>
                        <button
                          type="button"
                          onClick={() => setAtestadoModalStudent(s)}
                          className="p-1 text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                          title="Abonar faltas por atestado médico"
                        >
                          <FileCheck className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Retificação / Lançamento de Nota */}
      {retificandoStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-sm text-slate-900">Lançamento & Retificação de Nota</h3>
                <p className="text-xs text-slate-500 uppercase font-semibold">{retificandoStudent.nome}</p>
              </div>
              <button onClick={() => setRetificandoStudent(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNota} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Componente Curricular</label>
                <select
                  value={editDisciplina}
                  onChange={(e) => setEditDisciplina(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                >
                  <option value="port">Língua Portuguesa</option>
                  <option value="mat">Matemática</option>
                  <option value="cien">Ciências Naturais</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-semibold text-slate-700">Nota Bimestral (0.0 a 10.0)</label>
                  <span className="text-[10px] text-blue-600 font-mono">1 casa decimal</span>
                </div>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  required
                  value={newNota}
                  onChange={(e) => setNewNota(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-base font-bold text-[#0b4ea2]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-semibold text-slate-700">Justificativa da Alteração</label>
                  <span className="text-[10px] text-slate-400">Obrigatório em retificações</span>
                </div>
                <textarea
                  rows={2}
                  required={!isBimestreAberto}
                  placeholder="Ex: Correção de lançamento de avaliação diagnóstica após conferência do Pedagogo..."
                  value={justificativa}
                  onChange={(e) => setJustificativa(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-800 space-y-1">
                <span className="font-bold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Regra do SIGEON (Seção 8):
                </span>
                <p>A alteração gera marcação automática RETIFICADA e registro irretratável na trilha de auditoria.</p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRetificandoStudent(null)}
                  className="flex-1 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-xs font-bold text-white bg-[#0b4ea2] hover:bg-[#093e80] rounded-xl shadow-xs"
                >
                  Salvar Nota Retificada
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Abono por Atestado Médico */}
      {atestadoModalStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Abono Automático de Faltas</h3>
              <p className="text-xs text-slate-500 mt-0.5">Estudante: <strong>{atestadoModalStudent.nome}</strong></p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left space-y-2 text-xs">
              <label className="font-semibold text-slate-700 block">Dias de Repouso Prescritos no Atestado</label>
              <input
                type="number"
                min="1"
                max="15"
                value={atestadoDias}
                onChange={(e) => setAtestadoDias(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono font-bold text-center text-sm"
              />
              <p className="text-[11px] text-slate-500">
                Conforme a Seção 8 do SIGEON: "Atestado aceito abona automaticamente faltas correspondentes e recalcula a frequência acadêmica."
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setAtestadoModalStudent(null)}
                className="flex-1 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleAbonarAtestado}
                className="flex-1 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs"
              >
                Abonar Faltas
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// 3. GESTÃO PEDAGÓGICA (PEDAGOGICAL, LESSON PLANS & CLASS COUNCIL)
// ============================================================================
export const GestaoPedagogicaView: React.FC<{ userRole?: string }> = ({ userRole = 'pedagogo' }) => {
  const [subTab, setSubTab] = useState<'planos' | 'metas' | 'conselho'>('planos');
  
  // Lesson plans with full state machine: Rascunho -> Enviado -> Aprovado / Reprovado -> Ministrado -> Arquivado
  const [planos, setPlanos] = useState([
    {
      id: 'PL-01',
      turma: '5º Ano A',
      disciplina: 'Língua Portuguesa',
      professor: 'Prof. Carlos Eduardo Siqueira',
      tema: 'Gêneros Textuais Amazônicos e Lendas Regionais',
      status: 'Aprovado',
      data: '24/10/2026',
      parecer: 'Planejamento alinhado às diretrizes curriculares municipais da SEMED.',
    },
    {
      id: 'PL-02',
      turma: '5º Ano B',
      disciplina: 'Matemática',
      professor: 'Prof. Carlos Eduardo Siqueira',
      tema: 'Frações, Números Decimais e Medidas Regionais',
      status: 'Enviado',
      data: '26/10/2026',
      parecer: 'Aguardando parecer do Pedagogo responsável.',
    },
    {
      id: 'PL-03',
      turma: '4º Ano B',
      disciplina: 'Ciências Naturais',
      professor: 'Profa. Danielle Peixoto',
      tema: 'Biodiversidade da Bacia Amazônica e Preservação',
      status: 'Rascunho',
      data: '27/10/2026',
      parecer: 'Em elaboração pelo docente regente.',
    },
    {
      id: 'PL-04',
      turma: '4º Ano A',
      disciplina: 'História e Geografia',
      professor: 'Prof. Carlos Eduardo Siqueira',
      tema: 'Origens e Ocupação Urbana de Manaus',
      status: 'Reprovado',
      data: '20/10/2026',
      parecer: 'Retornado a Rascunho: Necessário detalhar metodologia avaliativa adaptada.',
    },
  ]);

  const [novoPlanoModal, setNovoPlanoModal] = useState(false);
  const [planoForm, setPlanoForm] = useState({ turma: '5º Ano A', disciplina: 'Língua Portuguesa', tema: '' });

  const handleCreatePlano = (e: React.FormEvent) => {
    e.preventDefault();
    if (!planoForm.tema.trim()) return;

    const newP = {
      id: `PL-0${planos.length + 1}`,
      turma: planoForm.turma,
      disciplina: planoForm.disciplina,
      professor: 'Prof. Carlos Eduardo Siqueira',
      tema: planoForm.tema,
      status: 'Enviado',
      data: 'Hoje às 10:15',
      parecer: 'Submetido para avaliação da Coordenação Pedagógica.',
    };

    setPlanos([newP, ...planos]);
    setNovoPlanoModal(false);
    setPlanoForm({ turma: '5º Ano A', disciplina: 'Língua Portuguesa', tema: '' });
  };

  const handleUpdateStatus = (id: string, newStatus: 'Aprovado' | 'Reprovado') => {
    if (userRole === 'professor') {
      alert('Regra Normativa do SIGEON: Professor não aprova o próprio plano. Competência exclusiva do Pedagogo(a).');
      return;
    }

    setPlanos(planos.map(p => {
      if (p.id === id) {
        return {
          ...p,
          status: newStatus,
          parecer: newStatus === 'Aprovado' 
            ? 'Plano aprovado e homologado pela Gestão Pedagógica.' 
            : 'Retornado para ajustes: adequar critérios de avaliação diagnóstica.'
        };
      }
      return p;
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Subtab navigation */}
      <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            type="button"
            onClick={() => setSubTab('planos')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              subTab === 'planos' ? 'bg-[#0b4ea2] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Planos de Aula & Ciclo Normativo (Seção 9)</span>
          </button>
          <button
            type="button"
            onClick={() => setSubTab('metas')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              subTab === 'metas' ? 'bg-[#0b4ea2] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Metas & Alfabetização na Idade Certa</span>
          </button>
          <button
            type="button"
            onClick={() => setSubTab('conselho')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              subTab === 'conselho' ? 'bg-[#0b4ea2] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Conselho de Classe & Atas</span>
          </button>
        </div>
      </div>

      {/* SUBTAB 1: PLANOS DE AULA */}
      {subTab === 'planos' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-sm text-slate-800">Fluxo de Planos de Aula (Rascunho → Enviado → Aprovado/Reprovado → Ministrado)</h3>
                <p className="text-xs text-slate-500">Submissão docente e validação obrigatória pela equipe pedagógica (Art. 9 e 14)</p>
              </div>
              <button
                type="button"
                onClick={() => setNovoPlanoModal(true)}
                className="px-3.5 py-2 bg-[#0b4ea2] hover:bg-[#093e80] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Novo Plano de Aula</span>
              </button>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {planos.map(p => (
                <div key={p.id} className="py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono font-bold text-[#0b4ea2]">{p.id}</span>
                      <span className="font-bold text-slate-800 text-sm">{p.tema}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        p.status === 'Aprovado' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                        p.status === 'Enviado' ? 'bg-sky-100 text-sky-800 border border-sky-300' :
                        p.status === 'Reprovado' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {p.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-3">
                      <span>{p.turma} · {p.disciplina}</span>
                      <span>·</span>
                      <span>{p.professor}</span>
                      <span>·</span>
                      <span>Submetido: {p.data}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-200">
                      <strong>Parecer Pedagógico:</strong> {p.parecer}
                    </p>
                  </div>

                  {/* Actions according to role */}
                  <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                    {p.status === 'Enviado' && ['pedagogo', 'gestor', 'assessor-tecnico'].includes(userRole) && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(p.id, 'Aprovado')}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer shadow-xs"
                        >
                          Aprovar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(p.id, 'Reprovado')}
                          className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer shadow-xs"
                        >
                          Reprovar
                        </button>
                      </>
                    )}
                    {p.status === 'Enviado' && userRole === 'professor' && (
                      <span className="text-[11px] text-slate-400 italic">
                        Aguardando parecer do Pedagogo
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: METAS */}
      {subTab === 'metas' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <p className="text-xs font-semibold text-slate-500 uppercase">Capacidade Total Homologada</p>
              <p className="text-2xl font-black text-slate-900 font-mono mt-1">1.300 vagas</p>
              <p className="text-[11px] text-blue-600 mt-0.5 font-medium">Ensino Fundamental Anos Iniciais e Finais</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <p className="text-xs font-semibold text-slate-500 uppercase">Vagas Preenchidas</p>
              <p className="text-2xl font-black text-emerald-600 font-mono mt-1">1.240 alunos</p>
              <p className="text-[11px] text-emerald-700 mt-0.5 font-medium">95.4% taxa de ocupação</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <p className="text-xs font-semibold text-slate-500 uppercase">Vagas Remanescentes</p>
              <p className="text-2xl font-black text-cyan-600 font-mono mt-1">60 disponíveis</p>
              <p className="text-[11px] text-slate-500 mt-0.5 font-medium">Para transferências na rede SEMED</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-800 text-sm">Programa de Alfabetização na Idade Certa (SEMED)</h3>
                <p className="text-xs text-slate-500">Acompanhamento do 1º ao 5º ano com intervenções pedagógicas</p>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-xl border border-emerald-200">
                98% Alfabetizados no 2º Ano
              </span>
            </div>

            <div className="space-y-3">
              {[
                { meta: '1º Ano - Alfabetização Inicial e Letramento', metaPct: 96, atingido: '96% consolidado' },
                { meta: '2º Ano - Fluência Leitora e Escrita Ortográfica', metaPct: 98, atingido: '98% consolidado' },
                { meta: '3º Ano - Produção Textual e Resolução de Problemas', metaPct: 94, atingido: '94% consolidado' },
                { meta: '4º e 5º Ano - Proficiência em Língua Portuguesa e Matemática (IDEB)', metaPct: 95, atingido: '95% consolidado' },
              ].map((item, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{item.meta}</span>
                    <span className="font-mono font-bold text-[#0b4ea2]">{item.atingido}</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${item.metaPct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: CONSELHO DE CLASSE */}
      {subTab === 'conselho' && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-800">Conselho de Classe Bimestral</h3>
              <p className="text-slate-500">Registro de deliberações pedagógicas e intervenções preventivas</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0b4ea2] font-bold">1º Bimestre 2026</span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-800">Ata de Reunião do 5º Ano A</h4>
            <p className="text-slate-600 leading-relaxed">
              Deliberado encaminhamento de 3 estudantes para reforço de fluência leitora no contraturno e atendimento psicopedagógico na sala de recursos (AEE). Nenhuma evasão detectada no bimestre.
            </p>
            <div className="pt-2 text-[11px] text-slate-400">
              Assinado por: Gestora Francisca Ribeiro e Pedagoga Luciana Matos.
            </div>
          </div>
        </div>
      )}

      {/* Modal Novo Plano de Aula */}
      {novoPlanoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-900">Novo Plano de Aula</h3>
              <button onClick={() => setNovoPlanoModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePlano} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Turma</label>
                <select
                  value={planoForm.turma}
                  onChange={(e) => setPlanoForm({ ...planoForm, turma: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                >
                  <option value="5º Ano A">5º Ano A</option>
                  <option value="5º Ano B">5º Ano B</option>
                  <option value="4º Ano A">4º Ano A</option>
                  <option value="4º Ano B">4º Ano B</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Disciplina</label>
                <select
                  value={planoForm.disciplina}
                  onChange={(e) => setPlanoForm({ ...planoForm, disciplina: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                >
                  <option value="Língua Portuguesa">Língua Portuguesa</option>
                  <option value="Matemática">Matemática</option>
                  <option value="Ciências Naturais">Ciências Naturais</option>
                  <option value="História e Geografia">História e Geografia</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tema da Aula / Objeto de Conhecimento</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Ex: Leitura e interpretação de textos jornalísticos e crônicas do cotidiano de Manaus..."
                  value={planoForm.tema}
                  onChange={(e) => setPlanoForm({ ...planoForm, tema: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setNovoPlanoModal(false)}
                  className="flex-1 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-xs font-bold text-white bg-[#0b4ea2] hover:bg-[#093e80] rounded-xl shadow-xs"
                >
                  Submeter para Aprovação
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// 4. COMUNICAÇÃO ESCOLAR (CIRCULARS & PARENT NOTICES)
// ============================================================================
export const ComunicacaoEscolarView: React.FC = () => {
  const [msgSent, setMsgSent] = useState(false);
  const [destinatario, setDestinatario] = useState('Todos os Pais e Responsáveis');
  const [mensagem, setMensagem] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setMsgSent(true);
    setTimeout(() => {
      setMsgSent(false);
      setMensagem('');
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Send Announcement */}
        <div className="lg:col-span-1 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-800 text-sm">Enviar Comunicado Oficial</h3>
            <p className="text-xs text-slate-500">Disparo via WhatsApp Institucional e SMS da SEMED</p>
          </div>

          {msgSent ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs space-y-1">
              <p className="font-bold">Comunicado enviado com sucesso!</p>
              <p className="text-[11px] text-emerald-600">Notificação entregue para 1.240 responsáveis.</p>
            </div>
          ) : (
            <form onSubmit={handleSend} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Destinatários</label>
                <select
                  value={destinatario}
                  onChange={(e) => setDestinatario(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                >
                  <option value="Todos os Pais e Responsáveis">Todos os Pais e Responsáveis</option>
                  <option value="Turmas do 5º Ano (A e B)">Turmas do 5º Ano (A e B)</option>
                  <option value="Corpo Docente e Servidores">Corpo Docente e Servidores</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Mensagem do Comunicado</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Ex: Convocação para reunião bimestral de pais e mestres nesta quinta-feira às 15h..."
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#0b4ea2] hover:bg-[#093e80] text-white font-semibold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Disparar Comunicado</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Active Feed */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-800 text-sm">Mural de Avisos & Circulares SEMED</h3>
            <p className="text-xs text-slate-500">Histórico de comunicados enviados no ano letivo de 2026</p>
          </div>

          <div className="space-y-3">
            {[
              { titulo: 'Reunião Bimestral de Pais e Mestres', data: '24/10/2026', autor: 'Diretoria Escolar', texto: 'Apresentação dos resultados de proficiência e entrega dos boletins escolares do 1º Bimestre no auditório.', badge: 'Reunião' },
              { titulo: 'Vacinação Infantil nas Escolas Municipais', data: '18/10/2026', autor: 'SEMSA / SEMED Manaus', texto: 'Campanha de atualização da caderneta de vacinação dos alunos da Educação Infantil e Anos Iniciais.', badge: 'Saúde' },
              { titulo: 'Cardápio Especial da Semana da Amazônia', data: '12/10/2026', autor: 'Nutrição SEMED', texto: 'Fornecimento de merenda escolar rica em produtos da agricultura familiar de Manaus e Rio Preto da Eva.', badge: 'Merenda' },
            ].map((item, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-sm">{item.titulo}</span>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-blue-50 text-[#0b4ea2] rounded-md">
                    {item.badge}
                  </span>
                </div>
                <p className="text-slate-600">{item.texto}</p>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                  <span>Por: {item.autor}</span>
                  <span>·</span>
                  <span>Data: {item.data}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 5. ATENDIMENTO AO ESTUDANTE (STUDENT CARE & SPECIAL ED)
// ============================================================================
export const AtendimentoEstudanteView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase">Estudantes com AEE / PCD</p>
          <p className="text-2xl font-black text-[#0b4ea2] font-mono mt-1">28</p>
          <p className="text-[11px] text-emerald-600 mt-0.5 font-medium">Sala de Recursos Multifuncionais</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase">Beneficiários Bolsa Família</p>
          <p className="text-2xl font-black text-purple-700 font-mono mt-1">892</p>
          <p className="text-[11px] text-purple-600 mt-0.5 font-medium">Acompanhamento de condicionalidade</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase">Apoio Psicossocial</p>
          <p className="text-2xl font-black text-emerald-600 font-mono mt-1">100%</p>
          <p className="text-[11px] text-slate-500 mt-0.5 font-medium">Equipe multiprofissional ativa</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-800 text-sm">Atendimento Educacional Especializado (AEE)</h3>
          <p className="text-xs text-slate-500">Plano de desenvolvimento individual para estudantes com necessidades específicas</p>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {[
            { nome: 'LUCAS MATHEUS PINTO', turma: '4º Ano A', tipo: 'Transtorno do Espectro Autista (TEA)', suporte: 'Mediador pedagógico em sala + Atendimento 2x por semana' },
            { nome: 'SOPHIA EMANUELLY LIMA', turma: '3º Ano B', tipo: 'Baixa Visão', suporte: 'Material didático ampliado + Recursos ópticos de tecnologia assistiva' },
            { nome: 'DAVI LUCCA NOGUEIRA', turma: '5º Ano A', tipo: 'Deficiência Auditiva', suporte: 'Intérprete de Libras em sala regular' },
          ].map((item, idx) => (
            <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-bold text-slate-800 block uppercase">{item.nome}</span>
                <span className="text-[11px] text-slate-500">{item.turma} · {item.tipo}</span>
              </div>
              <div className="text-right sm:max-w-md">
                <span className="px-2.5 py-1 rounded-full bg-blue-50 text-[#0b4ea2] text-[11px] font-semibold border border-blue-200">
                  {item.suporte}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 6. BIBLIOTECA (LIBRARY & READING INITIATIVES)
// ============================================================================
export const BibliotecaView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase">Acervo Total Catalogado</p>
          <p className="text-2xl font-black text-slate-900 font-mono mt-1">4.850 títulos</p>
          <p className="text-[11px] text-blue-600 mt-0.5 font-medium">Literatura infantojuvenil e PNLD</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase">Empréstimos Ativos</p>
          <p className="text-2xl font-black text-emerald-600 font-mono mt-1">184 livros</p>
          <p className="text-[11px] text-emerald-700 mt-0.5 font-medium">Devolução regularizada</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase">Coleção Amazônica</p>
          <p className="text-2xl font-black text-amber-600 font-mono mt-1">420 obras</p>
          <p className="text-[11px] text-slate-500 mt-0.5 font-medium">Autores e lendas do Amazonas</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Obras Populares do Clube de Leitura SEMED</h3>
            <p className="text-xs text-slate-500">Livros com maior circulação entre os alunos do 1º ao 9º ano</p>
          </div>
          <button 
            type="button"
            onClick={() => alert('Abrindo sistema de empréstimo de livros da biblioteca.')}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0b4ea2] rounded-xl hover:bg-[#093e80] transition-colors cursor-pointer"
          >
            Novo Empréstimo
          </button>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {[
            { titulo: 'Lendas Amazônicas para Crianças', autor: 'Thiago de Mello', exemplares: '8 disponíveis', tombo: 'L-2041' },
            { titulo: 'Dois Irmãos (Edição Escolar)', autor: 'Milton Hatoum', exemplares: '12 disponíveis', tombo: 'L-1890' },
            { titulo: 'O Boto Navegador e Outros Contos do Rio Negro', autor: 'Elson Farias', exemplares: '6 disponíveis', tombo: 'L-0943' },
            { titulo: 'Pequeno Guia da Fauna e Flora de Manaus', autor: 'SEMED Manaus / Pesquisa', exemplares: '15 disponíveis', tombo: 'L-3102' },
          ].map((book, idx) => (
            <div key={idx} className="py-3 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800 block text-sm">{book.titulo}</span>
                <span className="text-[11px] text-slate-500">Autor: {book.autor} · Tombo: {book.tombo}</span>
              </div>
              <span className="font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full text-xs border border-emerald-200">
                {book.exemplares}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 7. PATRIMÔNIO E MANUTENÇÃO (FACILITIES & IT ASSETS)
// ============================================================================
export const PatrimonioManutencaoView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase">Aparelhos de Ar-Condicionado</p>
          <p className="text-2xl font-black text-slate-900 font-mono mt-1">18 splits</p>
          <p className="text-[11px] text-emerald-600 mt-0.5 font-medium">100% em pleno funcionamento</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase">Computadores no Laboratório</p>
          <p className="text-2xl font-black text-slate-900 font-mono mt-1">32 PCs</p>
          <p className="text-[11px] text-blue-600 mt-0.5 font-medium">Laboratório de Informática ProInfo</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase">Manutenção Predial SEMED</p>
          <p className="text-2xl font-black text-emerald-600 font-mono mt-1">Regular</p>
          <p className="text-[11px] text-slate-500 mt-0.5 font-medium">Última vistoria técnica em Jan/2026</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Inventário de Equipamentos por Setor</h3>
            <p className="text-xs text-slate-500">Tombamento patrimonial cadastrado no patrimônio municipal de Manaus</p>
          </div>
          <button
            type="button"
            onClick={() => alert('Abertura de chamado de manutenção predial à SEMED.')}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0b4ea2] rounded-xl hover:bg-[#093e80] transition-colors cursor-pointer"
          >
            Solicitar Manutenção
          </button>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {[
            { setor: 'Bloco A - Salas 101 a 104', itens: '8 Splits 30.000 BTUs, 140 carteiras anatômicas, 4 quadros brancos', status: 'Operacional 100%' },
            { setor: 'Bloco B - Salas 105 a 108', itens: '8 Splits 30.000 BTUs, 140 carteiras anatômicas, 4 quadros brancos', status: 'Operacional 100%' },
            { setor: 'Laboratório de Informática (Bloco C)', itens: '32 Computadores Core i5, 2 Splits 24.000 BTUs, 1 Servidor Linux', status: 'Operacional 100%' },
            { setor: 'Refeitório e Cozinha Industrial', itens: '2 Câmaras frias, fogão industrial 6 bocas, bebedouros elétricos', status: 'Vistoria Sanitária Aprovada' },
          ].map((inv, idx) => (
            <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-bold text-slate-800 block">{inv.setor}</span>
                <span className="text-[11px] text-slate-500">{inv.itens}</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200 self-start sm:self-auto">
                {inv.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 8. MATERIAIS E LOGÍSTICA (REGIONAL MEALS & SCHOOL LOGISTICS)
// ============================================================================
export const MateriaisLogisticaView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase">Alimentação Escolar Hoje</p>
          <p className="text-2xl font-black text-amber-600 font-mono mt-1">1.240 refeições</p>
          <p className="text-[11px] text-emerald-700 mt-0.5 font-medium">Cardápio regional com supervisão PNAE</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase">Transporte Terrestre</p>
          <p className="text-2xl font-black text-[#0b4ea2] font-mono mt-1">2 ônibus</p>
          <p className="text-[11px] text-slate-500 mt-0.5 font-medium">140 alunos atendidos na zona urbana</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase">Transporte Fluvial (Ribeirinho)</p>
          <p className="text-2xl font-black text-cyan-600 font-mono mt-1">1 lancha</p>
          <p className="text-[11px] text-slate-500 mt-0.5 font-medium">45 alunos atendidos no Rio Negro</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-800 text-sm">Cardápio da Merenda Escolar SEMED Manaus</h3>
          <p className="text-xs text-slate-500">Insumos da agricultura familiar amazônica com alto teor nutritivo</p>
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
  );
};

// ============================================================================
// 9. PORTARIA E VISITANTES (GATE SECURITY & ACCESS CONTROL)
// ============================================================================
export const PortariaVisitantesView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase">Entrada de Alunos Hoje</p>
          <p className="text-2xl font-black text-emerald-600 font-mono mt-1">1.180</p>
          <p className="text-[11px] text-emerald-700 mt-0.5 font-medium">Controle de acesso por catraca digital</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase">Visitantes e Pais Cadastrados</p>
          <p className="text-2xl font-black text-[#0b4ea2] font-mono mt-1">14 hoje</p>
          <p className="text-[11px] text-slate-500 mt-0.5 font-medium">Identificação por documento oficial</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase">Status da Portaria</p>
          <p className="text-2xl font-black text-slate-800 font-mono mt-1">Seguro</p>
          <p className="text-[11px] text-emerald-600 mt-0.5 font-medium">Ronda escolar Guarda Municipal ativa</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Registro de Acessos Recentes na Portaria</h3>
            <p className="text-xs text-slate-500">Histórico de entradas com crachá e autorização da direção escolar</p>
          </div>
          <button
            type="button"
            onClick={() => alert('Registrar nova entrada de visitante ou prestador de serviço.')}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0b4ea2] rounded-xl hover:bg-[#093e80] transition-colors cursor-pointer"
          >
            Registrar Visitante
          </button>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {[
            { nome: 'Sandra Regina Lima (Mãe de Aluno)', motivo: 'Reunião com pedagoga do 5º Ano A', entrada: '08:15', saida: '09:00', cracha: 'CR-04' },
            { nome: 'Marcos Vinicius Andrade (Técnico SEMED)', motivo: 'Vistoria periódica de rede e ProInfo', entrada: '09:30', saida: 'Em andamento', cracha: 'CR-02' },
            { nome: 'Distribuidora Amazonas Alimentos', motivo: 'Entrega de gêneros perecíveis da merenda', entrada: '10:05', saida: '10:45', cracha: 'CR-11' },
          ].map((vis, idx) => (
            <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-bold text-slate-800 block">{vis.nome}</span>
                <span className="text-[11px] text-slate-500">{vis.motivo}</span>
              </div>
              <div className="flex items-center gap-3 font-mono text-xs">
                <span>Entrada: <strong>{vis.entrada}</strong></span>
                <span>Saída: <strong>{vis.saida}</strong></span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">
                  {vis.cracha}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 10. ADMINISTRAÇÃO DO SISTEMA (SCHOOL CONFIGURATION, CALENDAR & RBAC)
// ============================================================================
export interface AdministracaoSistemaViewProps {
  currentProfileId?: string;
  onSwitchProfile?: (profile: ProfileDefinition) => void;
}

export const AdministracaoSistemaView: React.FC<AdministracaoSistemaViewProps> = ({
  currentProfileId = 'gestor',
  onSwitchProfile,
}) => {
  const [adminSubTab, setAdminSubTab] = useState<'rbac' | 'escola' | 'auditoria'>('rbac');

  // Logs de Auditoria
  const [auditLogs, setAuditLogs] = useState([
    { timestamp: 'Hoje às 15:20', acao: 'Backup Incremental da Base SEMED', autor: 'Administrador do Sistema (TI)', status: 'Concluído com Sucesso' },
    { timestamp: 'Hoje às 14:45', acao: 'Desbloqueio de Acesso de Docente', autor: 'Gestor(a) Antonina Borges de Sá', status: 'Homologado na Unidade' },
    { timestamp: 'Hoje às 11:30', acao: 'Aprovação de Plano Bimestral 5º Ano A', autor: 'Pedagoga Luciana Matos', status: 'Registrado em Ata' },
    { timestamp: 'Ontem às 18:00', acao: 'Exportação Prévia Educacenso / GOV.BR', autor: 'Assessor Técnico de Rede', status: 'Validado com Sucesso' },
  ]);

  // Virada Anual (Exclusiva do Assessor Técnico)
  const [showViradaModal, setShowViradaModal] = useState(false);
  const [viradaConfirmText, setViradaConfirmText] = useState('');
  const [anoLetivoAtual, setAnoLetivoAtual] = useState(2026);
  const [viradaSuccess, setViradaSuccess] = useState(false);

  // Educacenso Export
  const [exportingCenso, setExportingCenso] = useState(false);
  const [censoExportInfo, setCensoExportInfo] = useState<{ date: string; hash: string; total: number } | null>(null);

  // Desbloqueio de Contas
  const [lockedUsers, setLockedUsers] = useState([
    { id: 'u1', nome: 'CARLOS EDUARDO SIQUEIRA', cargo: 'Professor 40h', matricula: '98150339-1C', motivo: 'Bloqueado por 10 tentativas consecutivas de senha incorreta (Seção 5)', bloqueadoEm: 'Hoje às 14:10' },
    { id: 'u2', nome: 'FERNANDA VITÓRIA PINHEIRO', cargo: 'Estudante 6º Ano A', matricula: '1089412-3', motivo: 'Bloqueio preventivo por inatividade prolongada de 90 dias', bloqueadoEm: 'Ontem às 09:30' }
  ]);

  const isAssessorTecnico = currentProfileId === 'assessor-tecnico';
  const isGestorOrAbove = ['gestor', 'assessor-tecnico', 'admin-sistema'].includes(currentProfileId);

  const handleExecuteVirada = () => {
    if (viradaConfirmText !== 'CONFIRMAR-VIRADA-2027') return;
    setAnoLetivoAtual(2027);
    setViradaSuccess(true);
    setShowViradaModal(false);
    setViradaConfirmText('');
    setAuditLogs(prev => [
      {
        timestamp: 'Agora mesmo',
        acao: 'Abertura Oficial do Ano Letivo 2027 e Fechamento do Exercício 2026',
        autor: 'Assessor Técnico de Rede (Exclusivo)',
        status: 'Homologado na Rede'
      },
      ...prev
    ]);
  };

  const handleExportCenso = () => {
    setExportingCenso(true);
    setTimeout(() => {
      const generatedHash = '8f3a921d7e4b509ca284e6012bce9f0451a9e87d';
      setCensoExportInfo({
        date: new Date().toLocaleTimeString('pt-BR'),
        hash: generatedHash,
        total: 1240
      });
      setExportingCenso(false);
      setAuditLogs(prev => [
        {
          timestamp: 'Agora mesmo',
          acao: `Exportação Geral Educacenso / GOV.BR (${1240} alunos, Hash SHA-256: ${generatedHash.slice(0, 8)}...)`,
          autor: 'Assessor Técnico de Rede',
          status: 'Transmitido ao MEC/INEP'
        },
        ...prev
      ]);
    }, 1000);
  };

  const handleUnlockUser = (userId: string, userName: string) => {
    setLockedUsers(prev => prev.filter(u => u.id !== userId));
    setAuditLogs(prev => [
      {
        timestamp: 'Agora mesmo',
        acao: `Desbloqueio de Acesso com Redefinição de Tentativas: ${userName}`,
        autor: isAssessorTecnico ? 'Assessor Técnico de Rede' : 'Gestor(a) Escolar',
        status: 'Acesso Restaurado'
      },
      ...prev
    ]);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Sub-Navigation between RBAC Matrix and General Config */}
      <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            type="button"
            onClick={() => setAdminSubTab('rbac')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              adminSubTab === 'rbac'
                ? 'bg-[#0b4ea2] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Matriz de Perfis & Escopos (17 Perfis Oficiais)</span>
          </button>

          {['gestor', 'assessor-tecnico', 'admin-sistema', 'secretario'].includes(currentProfileId) && (
            <button
              type="button"
              onClick={() => setAdminSubTab('escola')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                adminSubTab === 'escola'
                  ? 'bg-[#0b4ea2] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <School className="w-4 h-4" />
              <span>Parâmetros da Escola & Censo INEP</span>
            </button>
          )}

          {['admin-sistema', 'assessor-tecnico', 'auditor', 'gestor'].includes(currentProfileId) && (
            <button
              type="button"
              onClick={() => setAdminSubTab('auditoria')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                adminSubTab === 'auditoria'
                  ? 'bg-[#0b4ea2] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Governança, Ano Letivo & Auditoria</span>
            </button>
          )}
        </div>

        <div className="text-[11px] text-slate-500 font-semibold px-3 py-1 bg-slate-50 rounded-lg border border-slate-200 hidden md:block">
          SEMED Manaus · Ano Letivo {anoLetivoAtual}
        </div>
      </div>

      {/* SUB-VIEW 1: RBAC MATRIX (THE OFFICIAL 17 PROFILES AND MODULE CEILINGS) */}
      {adminSubTab === 'rbac' && (
        <RbacProfilesSection 
          currentProfileId={currentProfileId}
          onSelectProfile={onSwitchProfile}
          isEmbedded={true}
        />
      )}

      {/* SUB-VIEW 2: GENERAL SCHOOL PARAMS */}
      {adminSubTab === 'escola' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <p className="text-xs font-semibold text-slate-500 uppercase">Código INEP da Escola</p>
              <p className="text-2xl font-black text-slate-900 font-mono mt-1">13084201</p>
              <p className="text-[11px] text-blue-600 mt-0.5 font-medium">Homologado no MEC</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <p className="text-xs font-semibold text-slate-500 uppercase">Dias Letivos {anoLetivoAtual}</p>
              <p className="text-2xl font-black text-emerald-600 font-mono mt-1">200 dias</p>
              <p className="text-[11px] text-emerald-700 mt-0.5 font-medium">800 horas mínimas cumpridas</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <p className="text-xs font-semibold text-slate-500 uppercase">Divisão Distrital</p>
              <p className="text-2xl font-black text-[#0b4ea2] font-mono mt-1">DDZ Leste II</p>
              <p className="text-[11px] text-slate-500 mt-0.5 font-medium">SEMED Prefeitura de Manaus</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-800 text-sm">Configurações Gerais da Unidade Escolar</h3>
              <p className="text-xs text-slate-500">Parâmetros institucionais configurados para o ano letivo de {anoLetivoAtual}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-slate-500">Nome Oficial:</span>
                <p className="font-bold text-slate-800 text-sm">Escola Municipal Antonina Borges de Sá (Unidade Piloto)</p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-slate-500">Endereço da Unidade:</span>
                <p className="font-bold text-slate-800 text-sm">Manaus - AM · Rede Municipal de Ensino</p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-slate-500">Turnos de Funcionamento:</span>
                <p className="font-bold text-slate-800 text-sm">Matutino (07h às 11h30) · Vespertino (13h às 17h30)</p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-slate-500">Versão do Sistema:</span>
                <p className="font-bold text-[#0b4ea2] text-sm">SIGEON Manaus v1.0 (Outubro de 2026 - SEMED)</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 3: AUDITORIA, BACKUPS & LOGS */}
      {adminSubTab === 'auditoria' && (
        <div className="space-y-6 animate-in fade-in duration-150">

          {viradaSuccess && (
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center gap-3 text-emerald-900 text-xs font-medium">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <strong>Virada Anual Concluída com Sucesso!</strong> O Ano Letivo de {anoLetivoAtual} foi oficialmente homologado para toda a rede escolar de Manaus.
              </div>
            </div>
          )}

          {/* Special Control Box for Assessor Técnico & Gestão */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                  M12 · Competências de Rede & Governança (Seção 11 e 12)
                </span>
                <h3 className="font-bold text-base mt-1">Ações Exclusivas e Controle de Segurança</h3>
                <p className="text-xs text-slate-400">
                  {isAssessorTecnico 
                    ? 'Você está autenticado como Assessor Técnico de Rede. Possui autorização exclusiva para virada anual e exportação Educacenso.'
                    : 'Ações de alta governança: virada de ano letivo e exportação Educacenso são exclusivas do Assessor Técnico de Rede.'
                  }
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {/* Virada Anual Button */}
              <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700/80 flex flex-col justify-between space-y-2.5">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200">Abertura / Fechamento de Ano Letivo</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      Exclusivo Assessor Técnico
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Operação crítica de fechamento de 2026 e migração para o Ano Letivo 2027 com validação de pré-requisitos e confirmação dupla.
                  </p>
                </div>
                <button
                  type="button"
                  disabled={!isAssessorTecnico}
                  onClick={() => setShowViradaModal(true)}
                  className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    isAssessorTecnico 
                      ? 'bg-amber-600 hover:bg-amber-500 text-white' 
                      : 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                  }`}
                  title={!isAssessorTecnico ? 'Operação exclusiva do Assessor Técnico de Rede' : ''}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Executar Virada Anual (2026 ➔ 2027)</span>
                </button>
              </div>

              {/* Educacenso Export */}
              <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700/80 flex flex-col justify-between space-y-2.5">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200">Exportação Educacenso / GOV.BR</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      Exclusivo Assessor Técnico
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Gera pacote oficial no padrão MEC/INEP do Censo Escolar da Rede Municipal de Manaus com cálculo de hash SHA-256.
                  </p>
                </div>
                <button
                  type="button"
                  disabled={!isAssessorTecnico || exportingCenso}
                  onClick={handleExportCenso}
                  className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    isAssessorTecnico 
                      ? 'bg-[#0b4ea2] hover:bg-[#093e80] text-white' 
                      : 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                  }`}
                  title={!isAssessorTecnico ? 'Operação exclusiva do Assessor Técnico de Rede' : ''}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{exportingCenso ? 'Exportando e assinando dados...' : 'Exportar Educacenso / GOV.BR'}</span>
                </button>
              </div>
            </div>

            {censoExportInfo && (
              <div className="p-3 bg-blue-950/70 border border-blue-800 rounded-xl text-xs space-y-1 text-blue-200 animate-in fade-in">
                <div className="flex items-center gap-1.5 font-bold text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Exportação Educacenso Concluída com Sucesso!</span>
                </div>
                <p className="text-[11px]">Total: <strong>{censoExportInfo.total} alunos</strong> da rede municipal de Manaus exportados às {censoExportInfo.date}.</p>
                <p className="text-[10px] font-mono text-slate-400">Checksum SHA-256: {censoExportInfo.hash}</p>
              </div>
            )}
          </div>

          {/* User Unlock Control Box */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-800 text-sm">Desbloqueio de Usuários (Seção 5 - Proteção Brute-force & Inatividade)</h3>
                <p className="text-xs text-slate-500">
                  {isAssessorTecnico 
                    ? 'Desbloqueio com autorização de rede inteira.' 
                    : 'Desbloqueio de usuários sob a circunscrição da unidade escolar pelo(a) Gestor(a).'
                  }
                </p>
              </div>
              <span className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-lg text-xs font-bold">
                {lockedUsers.length} {lockedUsers.length === 1 ? 'Conta Bloqueada' : 'Contas Bloqueadas'}
              </span>
            </div>

            {lockedUsers.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-500">
                <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                Nenhuma conta de usuário bloqueada no momento. Todas as credenciais estão ativas.
              </div>
            ) : (
              <div className="divide-y divide-slate-100 text-xs">
                {lockedUsers.map((u) => (
                  <div key={u.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">{u.nome}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">{u.matricula}</span>
                      </div>
                      <p className="text-[11px] text-rose-600 font-medium mt-0.5">{u.motivo} · {u.bloqueadoEm}</p>
                    </div>
                    {isGestorOrAbove ? (
                      <button
                        type="button"
                        onClick={() => handleUnlockUser(u.id, u.nome)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto shadow-xs"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Desbloquear Acesso</span>
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-400 italic">Requer Gestor(a) ou Assessor Técnico</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Audit Logs Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-800 text-sm">Trilha de Auditoria e Logs Técnicos (Seção 8)</h3>
                <p className="text-xs text-slate-500">Rastreabilidade integral das operações no SIGEON Manaus</p>
              </div>
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold">
                Auditoria Criptografada Ativa
              </span>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {auditLogs.map((log, idx) => (
                <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-bold text-slate-800 block">{log.acao}</span>
                    <span className="text-[11px] text-slate-500">Responsável: {log.autor} · {log.timestamp}</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-[#0b4ea2] border border-blue-200 self-start sm:self-auto">
                    {log.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* DOUBLE CONFIRMATION MODAL FOR ANNUAL ROLLOVER */}
      {showViradaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
            <div className="bg-amber-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-white" />
                <h4 className="font-bold text-sm">Confirmação Crítica: Virada Anual do Sistema</h4>
              </div>
              <button 
                type="button"
                onClick={() => setShowViradaModal(false)}
                className="text-white/80 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 space-y-1">
                <p className="font-bold">Atenção: Operação Irreversível de Rede Escolar</p>
                <p className="text-[11px]">
                  A abertura do ano letivo de 2027 arquivará os diários de classe de 2026, gerará o histórico definitivo dos alunos e criará a nova base letiva.
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-bold text-slate-700 block">Checklist Obrigatório de Pré-requisitos (Seção 11):</span>
                <ul className="space-y-1.5 text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Notas do 4º bimestre consolidadas em 100% das turmas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Atas finais do Conselho de Classe homologadas pelo Pedagogo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Backup global pré-migração executado pelo Administrador</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Pendências de matrícula e transferência zeradas</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <label className="font-bold text-slate-800 block">
                  Para confirmar, digite exatamente: <span className="font-mono text-rose-600">CONFIRMAR-VIRADA-2027</span>
                </label>
                <input
                  type="text"
                  value={viradaConfirmText}
                  onChange={(e) => setViradaConfirmText(e.target.value)}
                  placeholder="CONFIRMAR-VIRADA-2027"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowViradaModal(false)}
                  className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  disabled={viradaConfirmText !== 'CONFIRMAR-VIRADA-2027'}
                  onClick={handleExecuteVirada}
                  className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer ${
                    viradaConfirmText === 'CONFIRMAR-VIRADA-2027'
                      ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-sm'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Confirmar e Abrir Ano 2027</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

// ============================================================================
// 11. DOCUMENTOS E SUPORTE (OFFICIAL DOCS, LIFECYCLE & CENTRAL DE SUPORTE)
// ============================================================================
interface SchoolDoc {
  id: string;
  codigo: string;
  tipo: string;
  titular: string;
  matricula: string;
  status: 'Rascunho' | 'Assinado pela Escola' | 'Validado pela Rede' | 'Cancelado';
  dataEmissao: string;
  hash: string;
  motivoCancelamento?: string;
  canceladoPor?: string;
  canceladoEm?: string;
}

export const DocumentosSuporteView: React.FC<{ userRole?: string }> = ({ userRole = 'gestor' }) => {
  const [documents, setDocuments] = useState<SchoolDoc[]>([
    {
      id: 'd1',
      codigo: 'DOC-2026-0842-8921',
      tipo: 'Declaração de Matrícula Ativa',
      titular: 'ARTHUR GABRIEL SOUZA LIMA',
      matricula: '1042109-4',
      status: 'Validado pela Rede',
      dataEmissao: '15/02/2026',
      hash: 'a4f89d31c4e72a819b02efc67290bc41d2e185c7',
    },
    {
      id: 'd2',
      codigo: 'DOC-2026-0842-8922',
      tipo: 'Histórico Escolar Oficial',
      titular: 'BEATRIZ VASCONCELOS RIBEIRO',
      matricula: '1048932-1',
      status: 'Assinado pela Escola',
      dataEmissao: '18/02/2026',
      hash: '7b23f81e09d12c8a77ef3410cb051289de61ab34',
    },
    {
      id: 'd3',
      codigo: 'DOC-2026-0842-8923',
      tipo: 'Certidão de Conclusão Anos Iniciais',
      titular: 'DANIELE CRISTINA CARVALHO',
      matricula: '1031587-2',
      status: 'Rascunho',
      dataEmissao: '20/02/2026',
      hash: 'c5819e074bf1092e4412ad0981b7e310fe912a77',
    },
    {
      id: 'd4',
      codigo: 'DOC-2026-0842-8890',
      tipo: 'Guia de Transferência SEMED',
      titular: 'GUILHERME ARAÚJO DOS SANTOS',
      matricula: '2053178-0',
      status: 'Cancelado',
      dataEmissao: '10/02/2026',
      hash: '99ab31c0eef14820dc7712ba091e4530fe189ca2',
      motivoCancelamento: 'Duplicidade de emissão por remanejamento de turma no sistema',
      canceladoPor: 'Secretário(a) Escolar',
      canceladoEm: '12/02/2026 às 10:15'
    }
  ]);

  // Modal states
  const [validatingDoc, setValidatingDoc] = useState<SchoolDoc | null>(null);
  const [cancelModalDoc, setCancelModalDoc] = useState<SchoolDoc | null>(null);
  const [cancelJustificativa, setCancelJustificativa] = useState('');
  const [cancelError, setCancelError] = useState('');
  const [searchVerifyCode, setSearchVerifyCode] = useState('');
  const [verificationResult, setVerificationResult] = useState<SchoolDoc | 'not-found' | null>(null);

  const canManageDocs = ['secretario', 'gestor', 'assessor-tecnico', 'admin-sistema'].includes(userRole);

  const handleOpenCancel = (doc: SchoolDoc) => {
    setCancelModalDoc(doc);
    setCancelJustificativa('');
    setCancelError('');
  };

  const handleConfirmCancel = () => {
    if (!cancelModalDoc) return;
    if (cancelJustificativa.trim().length < 10) {
      setCancelError('A justificativa de cancelamento é obrigatória e deve ter no mínimo 10 caracteres (Seção 7.2 do regulamento).');
      return;
    }

    setDocuments(prev => prev.map(d => {
      if (d.id === cancelModalDoc.id) {
        return {
          ...d,
          status: 'Cancelado',
          motivoCancelamento: cancelJustificativa.trim(),
          canceladoPor: userRole === 'secretario' ? 'Secretário(a) Escolar' : userRole === 'assessor-tecnico' ? 'Assessor Técnico de Rede' : 'Gestor(a) Escolar',
          canceladoEm: `Hoje às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`
        };
      }
      return d;
    }));

    setCancelModalDoc(null);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchVerifyCode.trim().toLowerCase();
    if (!query) return;

    const found = documents.find(d => 
      d.codigo.toLowerCase() === query || 
      d.hash.toLowerCase().startsWith(query) ||
      d.matricula.toLowerCase() === query
    );

    setVerificationResult(found || 'not-found');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">

      {/* Official Documentation & PDFs Download Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
        <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Guias Normativos e Manuais Oficiais do SIGEON</h3>
            <p className="text-xs text-slate-500">Documentação técnica homologada pela SEMED Manaus para consulta e download</p>
          </div>
          <span className="px-2.5 py-1 bg-blue-50 text-[#0b4ea2] border border-blue-200 rounded-lg text-xs font-bold self-start sm:self-auto">
            Documentos Homologados
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gradient-to-br from-blue-50/80 to-white rounded-xl border border-blue-200 flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#0b4ea2]" />
                <h4 className="font-bold text-xs text-slate-800">Especificação Teórica SIGEON v1.0</h4>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Manual oficial de arquitetura RBAC, escopos de acesso, regras de funcionamento e limites por perfil da Rede Municipal de Manaus (Outubro 2026).
              </p>
            </div>
            <a
              href="/assets/aistudio/TEORIA_67d50b79.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 bg-[#0b4ea2] text-white hover:bg-[#083e82] rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-center shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Acessar Especificação Teórica (PDF)</span>
            </a>
          </div>

          <div className="p-4 bg-gradient-to-br from-amber-50/80 to-white rounded-xl border border-amber-200 flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <h4 className="font-bold text-xs text-slate-800">Análise de Perfis, Permissões e Regras (18 Páginas)</h4>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Análise técnica e funcional completa detalhando os 17 perfis, regras de 2FA obrigatório, 10 tentativas com bloqueio, notas com retificação e ciclo documental.
              </p>
            </div>
            <a
              href="/assets/aistudio/SIGEON___An_lise_de_perfis__permiss_es__autoriza__es_e_regras_de_funcionamento_b14d6eec.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 bg-amber-600 text-white hover:bg-amber-700 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-center shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Acessar Análise de Perfis & Permissões (PDF)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Document Validation by QR Code or SHA-256 Hash */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
        <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Validação Digital de Autenticidade (QR Code / Hash SHA-256)</h3>
            <p className="text-xs text-slate-500">Verifique a autenticidade jurídica de qualquer certidão, histórico ou declaração emitida pela SEMED</p>
          </div>
        </div>

        <form onSubmit={handleVerifyCode} className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Digite o código do documento (ex: DOC-2026-0842-8921) ou Hash SHA-256..."
              value={searchVerifyCode}
              onChange={(e) => setSearchVerifyCode(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0b4ea2]/20 focus:border-[#0b4ea2]"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-[#0b4ea2] hover:bg-[#093e80] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Verificar Documento</span>
          </button>
        </form>

        {verificationResult && (
          <div className="mt-3 animate-in fade-in">
            {verificationResult === 'not-found' ? (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Nenhum documento encontrado com o código ou hash informado. Verifique os dados digitados.</span>
              </div>
            ) : (
              <div className={`p-4 rounded-xl border text-xs space-y-2 ${
                verificationResult.status === 'Cancelado'
                  ? 'bg-rose-50 border-rose-200 text-rose-900'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-900'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    {verificationResult.status === 'Cancelado' ? (
                      <XCircle className="w-4 h-4 text-rose-600" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    )}
                    <span>{verificationResult.tipo} · {verificationResult.codigo}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    verificationResult.status === 'Cancelado'
                      ? 'bg-rose-200 text-rose-900'
                      : 'bg-emerald-200 text-emerald-900'
                  }`}>
                    {verificationResult.status}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                  <div>Titular: <strong>{verificationResult.titular}</strong> (Matrícula: {verificationResult.matricula})</div>
                  <div>Data de Emissão: <strong>{verificationResult.dataEmissao}</strong> · Unidade: E.M. Antonina Borges de Sá</div>
                </div>
                <div className="text-[10px] font-mono text-slate-600 break-all bg-white/70 p-2 rounded-lg border">
                  Assinatura Digital SHA-256: {verificationResult.hash}
                </div>
                {verificationResult.status === 'Cancelado' && (
                  <div className="p-2 bg-rose-100 rounded-lg text-[11px] text-rose-800 font-semibold">
                    Documento Cancelado em Auditoria: {verificationResult.motivoCancelamento} (Cancelado por: {verificationResult.canceladoPor} em {verificationResult.canceladoEm})
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Document Lifecycle & Issuance Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
        <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Ciclo de Vida de Documentos Escolares Oficiais (M14 / Seção 7.2)</h3>
            <p className="text-xs text-slate-500">Rascunho ➔ Assinado pela Escola ➔ Validado pela Rede ➔ Cancelado (com motivo obrigatório)</p>
          </div>
          {canManageDocs && (
            <button
              type="button"
              onClick={() => alert('Abrindo formulário de emissão de novo documento escolar com assinatura digital ICP-SEMED.')}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0b4ea2] hover:bg-[#093e80] rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Emitir Novo Documento</span>
            </button>
          )}
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-xs min-w-[720px]">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[11px] font-semibold">
              <tr>
                <th className="py-3 px-4">Código / Tipo</th>
                <th className="py-3 px-4">Titular (Aluno)</th>
                <th className="py-3 px-4">Emissão</th>
                <th className="py-3 px-4 text-center">Status do Ciclo</th>
                <th className="py-3 px-4">Hash SHA-256</th>
                <th className="py-3 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-800">
                    <div className="font-bold text-[#0b4ea2] font-mono text-[11px]">{doc.codigo}</div>
                    <div className="text-[11px] text-slate-600 font-normal">{doc.tipo}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-700">
                    <span className="font-bold uppercase block">{doc.titular}</span>
                    <span className="text-[10px] text-slate-400 font-mono">Matrícula: {doc.matricula}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-600 font-mono text-xs">{doc.dataEmissao}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      doc.status === 'Validado pela Rede' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : doc.status === 'Assinado pela Escola'
                        ? 'bg-blue-50 text-[#0b4ea2] border border-blue-200'
                        : doc.status === 'Rascunho'
                        ? 'bg-slate-100 text-slate-700'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-[10px] text-slate-400">
                    {doc.hash.slice(0, 14)}...
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => setValidatingDoc(doc)}
                        className="px-2 py-1 bg-slate-100 hover:bg-[#0b4ea2] hover:text-white text-slate-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                        title="Ver QR Code e detalhes da assinatura digital"
                      >
                        Ver Detalhes
                      </button>

                      {canManageDocs && doc.status !== 'Cancelado' && (
                        <button
                          type="button"
                          onClick={() => handleOpenCancel(doc)}
                          className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Cancelar documento com justificativa formal"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: VER DETALHES E QR CODE */}
      {validatingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden">
            <div className="bg-[#0b4ea2] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-blue-200" />
                <h4 className="font-bold text-sm">Autenticidade do Documento Digital</h4>
              </div>
              <button
                type="button"
                onClick={() => setValidatingDoc(null)}
                className="text-white/80 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="w-32 h-32 bg-white p-2 rounded-lg border border-slate-300 flex items-center justify-center shadow-xs">
                  <div className="w-full h-full border-2 border-dashed border-[#0b4ea2]/40 rounded flex flex-col items-center justify-center text-center p-1">
                    <QrCode className="w-14 h-14 text-[#0b4ea2]" />
                    <span className="text-[9px] font-mono text-slate-500 font-bold mt-1">SEMED MANAUS QR</span>
                  </div>
                </div>
                <span className="font-mono text-[11px] font-bold text-slate-800">{validatingDoc.codigo}</span>
              </div>

              <div className="space-y-1.5 text-slate-600">
                <div>Documento: <strong className="text-slate-800">{validatingDoc.tipo}</strong></div>
                <div>Titular: <strong className="text-slate-800 uppercase">{validatingDoc.titular}</strong></div>
                <div>Matrícula: <strong className="text-slate-800 font-mono">{validatingDoc.matricula}</strong></div>
                <div>Emissão: <strong className="text-slate-800 font-mono">{validatingDoc.dataEmissao}</strong></div>
                <div>Status Atual: <span className="font-bold text-[#0b4ea2]">{validatingDoc.status}</span></div>
                <div>Emissor: <strong>E.M. Antonina Borges de Sá · SEMED Manaus</strong></div>
              </div>

              <div className="p-2.5 bg-slate-100 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-500 block font-semibold">Assinatura Digital SHA-256 (ICP-SEMED):</span>
                <span className="text-[10px] font-mono text-slate-800 break-all block">{validatingDoc.hash}</span>
              </div>

              {validatingDoc.status === 'Cancelado' && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 space-y-1">
                  <strong className="block">Documento Cancelado</strong>
                  <p className="text-[11px]">{validatingDoc.motivoCancelamento}</p>
                  <p className="text-[10px] text-rose-600">Por: {validatingDoc.canceladoPor} em {validatingDoc.canceladoEm}</p>
                </div>
              )}

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setValidatingDoc(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CANCELAMENTO OBRIGATÓRIO COM JUSTIFICATIVA (SEÇÃO 7.2) */}
      {cancelModalDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
            <div className="bg-rose-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-white" />
                <h4 className="font-bold text-sm">Cancelamento Formal de Documento Escolar</h4>
              </div>
              <button
                type="button"
                onClick={() => setCancelModalDoc(null)}
                className="text-white/80 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-900 space-y-1">
                <p className="font-bold">Regulamento Normativo SIGEON · Seção 7.2</p>
                <p className="text-[11px]">
                  É vedado cancelar certidões, declarações ou históricos sem justificativa formal. Toda anulação é registrada na trilha de auditoria contendo CPF e carimbo de tempo.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500">Documento a ser cancelado:</span>
                <p className="font-bold text-slate-800 text-sm">
                  {cancelModalDoc.tipo} ({cancelModalDoc.codigo})
                </p>
                <p className="text-slate-600">Titular: {cancelModalDoc.titular} · Matrícula: {cancelModalDoc.matricula}</p>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">
                  Justificativa Formal do Cancelamento <span className="text-rose-600">* (mínimo 10 caracteres)</span>
                </label>
                <textarea
                  rows={3}
                  value={cancelJustificativa}
                  onChange={(e) => setCancelJustificativa(e.target.value)}
                  placeholder="Ex: Emissão cancelada em virtude de erro no número do termo de certidão de nascimento informado pelo responsável."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 text-xs"
                />
                {cancelError && (
                  <p className="text-[11px] text-rose-600 font-semibold">{cancelError}</p>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCancelModalDoc(null)}
                  className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Voltar
                </button>
                <button
                  type="button"
                  onClick={handleConfirmCancel}
                  className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors shadow-xs cursor-pointer"
                >
                  Confirmar Cancelamento em Auditoria
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Support Information Box */}
      <div className="p-5 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-2">
        <div className="flex items-center gap-2 font-bold text-sm text-[#072d61]">
          <Phone className="w-4 h-4 text-[#0b4ea2]" />
          <span>Central de Atendimento Técnico SEMED Manaus</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Para solicitações de alteração cadastral avançada, desbloqueio de acessos ou chamados de tecnologia, ligue para <strong>(92) 3632-2250</strong> ou envie e-mail para <strong>suporte.sigeon@semed.manaus.am.gov.br</strong>. Horário de funcionamento: Segunda a Sexta, das 08h às 17h.
        </p>
      </div>
    </div>
  );
};

// ============================================================================
// 12. FINANCEIRO E INTEGRAÇÕES (FUNDEB, PDDE & GOV INTEGRATION)
// ============================================================================
export const FinanceiroIntegracoesView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase">Recursos PDDE 2026</p>
          <p className="text-2xl font-black text-slate-900 font-mono mt-1">R$ 48.200</p>
          <p className="text-[11px] text-emerald-700 mt-0.5 font-medium">Repasse federal FNDE regular</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase">Verba PNAE Merenda</p>
          <p className="text-2xl font-black text-[#0b4ea2] font-mono mt-1">R$ 82.400</p>
          <p className="text-[11px] text-blue-600 mt-0.5 font-medium">100% prestação de contas aprovada</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase">Integrações Federais</p>
          <p className="text-2xl font-black text-emerald-600 font-mono mt-1">Sincronizado</p>
          <p className="text-[11px] text-emerald-700 mt-0.5 font-medium">MEC / INEP Educacenso Conectado</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-800 text-sm">Status das Integrações Governamentais e Prestação de Contas</h3>
          <p className="text-xs text-slate-500">Conexões ativas de dados com sistemas municipais, estaduais e federais</p>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {[
            { orgao: 'MEC / INEP - Censo Escolar da Educação Básica', status: 'Conexão API Ativa', sinc: 'Sincronizado há 2 horas' },
            { orgao: 'SEMED Manaus - Folha de Pagamento e Ponto Digital', status: 'Homologado', sinc: 'Transmissão biométrica diária' },
            { orgao: 'FNDE / PNAE - Prestação de Contas de Alimentação Escolar', status: 'Em Conformidade', sinc: 'Exercício 2026 regularizado' },
            { orgao: 'SEMSA Manaus - Programa Saúde na Escola (PSE)', status: 'Ativo', sinc: 'Cartão de vacinação integrado' },
          ].map((item, idx) => (
            <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-bold text-slate-800 block text-sm">{item.orgao}</span>
                <span className="text-[11px] text-slate-500">{item.sinc}</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-xs border border-emerald-200 self-start sm:self-auto">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
