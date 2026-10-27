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
  UserCheck
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
            { id: 'gestao-alunos', label: 'Gestão de Alunos', desc: '1.240 Alunos matriculados', icon: GraduationCap, color: 'text-blue-600 bg-blue-50' },
            { id: 'notas-frequencia', label: 'Notas e Frequência', desc: 'Diário e avaliações bimestrais', icon: ClipboardCheck, color: 'text-emerald-600 bg-emerald-50' },
            { id: 'gestao-pedagogica', label: 'Gestão Pedagógica', desc: 'Quadro de vagas e projetos', icon: BookOpen, color: 'text-indigo-600 bg-indigo-50' },
            { id: 'equipe-escolar', label: 'Equipe Escolar', desc: '58 Servidores e ponto digital', icon: Users, color: 'text-cyan-600 bg-cyan-50' },
            { id: 'organizacao-escolar', label: 'Organização Escolar', desc: '12 Salas climatizadas', icon: School, color: 'text-slate-700 bg-slate-100' },
            { id: 'comunicacao-escolar', label: 'Comunicação Escolar', desc: 'Mural e avisos aos responsáveis', icon: MessagesSquare, color: 'text-teal-600 bg-teal-50' },
            { id: 'materiais-logistica', label: 'Materiais & Merenda', desc: 'Cardápio regionalizado SEMED', icon: Package, color: 'text-amber-600 bg-amber-50' },
            { id: 'paineis-relatorios', label: 'Painéis e Relatórios', desc: 'Indicadores IDEB e Censo', icon: TrendingUp, color: 'text-rose-600 bg-rose-50' },
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
export const NotasFrequenciaView: React.FC<{ students: Student[] }> = ({ students }) => {
  const [selectedBimestre, setSelectedBimestre] = useState('1º Bimestre');
  const [selectedTurma, setSelectedTurma] = useState('Todas as Turmas');

  const filtered = students.filter(s => 
    selectedTurma === 'Todas as Turmas' ? true : s.turma === selectedTurma
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase">Frequência Geral Registrada</p>
          <p className="text-2xl font-black text-emerald-600 font-mono mt-1">95.2%</p>
          <p className="text-[11px] text-emerald-700 mt-0.5 font-medium">1.180 estudantes presentes hoje</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase">Faltas Justificadas</p>
          <p className="text-2xl font-black text-blue-600 font-mono mt-1">42</p>
          <p className="text-[11px] text-slate-500 mt-0.5 font-medium">Atestados médicos validados</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase">Média Geral da Unidade</p>
          <p className="text-2xl font-black text-[#0b4ea2] font-mono mt-1">8.6</p>
          <p className="text-[11px] text-slate-500 mt-0.5 font-medium">Acima da média de corte (6.0)</p>
        </div>
      </div>

      {/* Controls & Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Diário de Classe & Notas Bimestrais</h3>
            <p className="text-xs text-slate-500">Lançamento de proficiência e assiduidade dos estudantes por turma</p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={selectedBimestre}
              onChange={(e) => setSelectedBimestre(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-700 cursor-pointer"
            >
              <option value="1º Bimestre">1º Bimestre 2026</option>
              <option value="2º Bimestre">2º Bimestre 2026</option>
              <option value="3º Bimestre">3º Bimestre 2026</option>
              <option value="4º Bimestre">4º Bimestre 2026</option>
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
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[11px] font-semibold">
              <tr>
                <th className="py-3 px-4">Estudante</th>
                <th className="py-3 px-4">Matrícula</th>
                <th className="py-3 px-4">Turma</th>
                <th className="py-3 px-4 text-center">Português</th>
                <th className="py-3 px-4 text-center">Matemática</th>
                <th className="py-3 px-4 text-center">Ciências</th>
                <th className="py-3 px-4 text-center">Frequência</th>
                <th className="py-3 px-4 text-center">Situação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((s, idx) => (
                <tr key={s.id} className="hover:bg-slate-50/70">
                  <td className="py-3 px-4 font-bold text-slate-800 uppercase">{s.nome}</td>
                  <td className="py-3 px-4 font-mono text-slate-500">{s.matricula}</td>
                  <td className="py-3 px-4 font-semibold text-slate-700">{s.turma}</td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-emerald-600">8.8</td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-emerald-600">9.2</td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-emerald-600">8.5</td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-slate-800">{s.frequencia}%</td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Aprovado
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 3. GESTÃO PEDAGÓGICA (PEDAGOGICAL & VACANCIES)
// ============================================================================
export const GestaoPedagogicaView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
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

          {['admin-sistema', 'assessor-tecnico', 'auditor'].includes(currentProfileId) && (
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
              <span>Logs Técnicos & Backups</span>
            </button>
          )}
        </div>

        <div className="text-[11px] text-slate-500 font-semibold px-3 py-1 bg-slate-50 rounded-lg border border-slate-200 hidden md:block">
          SEMED Manaus · Ano Letivo 2026
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
              <p className="text-xs font-semibold text-slate-500 uppercase">Dias Letivos 2026</p>
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
              <p className="text-xs text-slate-500">Parâmetros institucionais configurados para o ano letivo de 2026</p>
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
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4 animate-in fade-in duration-150">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Logs de Auditoria e Backups do Sistema</h3>
              <p className="text-xs text-slate-500">Rastreabilidade integral conforme exigências do Administrador do Sistema e Assessor Técnico</p>
            </div>
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold">
              Backup Automático Ativo
            </span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {[
              { timestamp: 'Hoje às 15:20', acao: 'Backup Incremental da Base SEMED', autor: 'Administrador do Sistema (TI)', status: 'Concluído com Sucesso' },
              { timestamp: 'Hoje às 14:45', acao: 'Desbloqueio de Acesso de Docente', autor: 'Gestor(a) Antonina Borges de Sá', status: 'Homologado na Unidade' },
              { timestamp: 'Hoje às 11:30', acao: 'Aprovação de Plano Bimestral 5º Ano A', autor: 'Pedagoga Luciana Matos', status: 'Registrado em Ata' },
              { timestamp: 'Ontem às 18:00', acao: 'Exportação Prévia Educacenso / GOV.BR', autor: 'Assessor Técnico de Rede', status: 'Validado com Sucesso' },
            ].map((log, idx) => (
              <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="font-bold text-slate-800 block">{log.acao}</span>
                  <span className="text-[11px] text-slate-500">Responsável: {log.autor} · {log.timestamp}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-[#0b4ea2] border border-blue-200">
                  {log.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

// ============================================================================
// 11. DOCUMENTOS E SUPORTE (OFFICIAL DOCS & CENTRAL DE SUPORTE)
// ============================================================================
export const DocumentosSuporteView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-800 text-sm">Emissão Rápida de Documentos Escolares Oficiais</h3>
          <p className="text-xs text-slate-500">Geração de certidões, declarações e documentação técnica oficial com autenticação digital SEMED Manaus</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { nome: 'Especificação Teórica SIGEON v1.0', desc: 'Manual oficial de RBAC, matriz de acesso e regras normativas (Outubro 2026)', url: '/assets/aistudio/TEORIA_67d50b79.pdf' },
            { nome: 'Declaração de Matrícula Ativa', desc: 'Comprovação escolar com código QR verificável' },
            { nome: 'Declaração de Frequência Bimestral', desc: 'Para fins de benefícios sociais e previdenciários' },
            { nome: 'Histórico Escolar Oficial', desc: 'Emissão para transferência entre redes públicas' },
            { nome: 'Guia de Transferência SEMED', desc: 'Remanejamento entre unidades de Manaus' },
            { nome: 'Boletim Escolar do Aluno', desc: 'Relatório com notas de todos os bimestres' },
            { nome: 'Espelho de Ponto Individual', desc: 'Documento homologado para corpo docente' },
          ].map((doc, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between space-y-3">
              <div>
                <h4 className="font-bold text-xs text-slate-800">{doc.nome}</h4>
                <p className="text-[11px] text-slate-500 mt-1">{doc.desc}</p>
              </div>
              {doc.url ? (
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-1.5 px-3 bg-[#0b4ea2] text-white hover:bg-[#083e82] rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-center"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Baixar Documento Oficial (PDF)</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => alert(`Gerando documento digital "${doc.nome}" em PDF oficial da SEMED...`)}
                  className="w-full py-1.5 px-3 bg-white text-[#0b4ea2] hover:bg-blue-50 border border-slate-200 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Emitir PDF Oficial</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

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
