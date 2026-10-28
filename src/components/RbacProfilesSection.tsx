import React, { useState } from 'react';
import { 
  ShieldCheck, 
  UserCheck, 
  Lock, 
  Unlock, 
  Eye, 
  Edit3, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Search, 
  Filter, 
  Layers, 
  FileCheck, 
  ChevronRight, 
  HelpCircle,
  ExternalLink,
  Sparkles,
  School,
  Building,
  GraduationCap
} from 'lucide-react';
import { 
  RBAC_PROFILES, 
  ALL_CANONICAL_MODULES, 
  ProfileDefinition, 
  AccessLevel,
  getProfileById
} from '../config/rbacProfiles';
import { UserProfile } from '../types';

interface RbacProfilesSectionProps {
  currentProfileId?: string;
  onSelectProfile?: (profile: ProfileDefinition) => void;
  isEmbedded?: boolean;
}

export const RbacProfilesSection: React.FC<RbacProfilesSectionProps> = ({
  currentProfileId = 'gestor',
  onSelectProfile,
  isEmbedded = false,
}) => {
  const [activeTab, setActiveTab] = useState<'perfis' | 'matriz' | 'comparador'>('perfis');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedProfileId, setSelectedProfileId] = useState<string>(currentProfileId);
  const [selectedModuleFilter, setSelectedModuleFilter] = useState<string>('todos');

  const selectedProfile = getProfileById(selectedProfileId);

  const categories = [
    { id: 'todos', label: 'Todos os Perfis (17)' },
    { id: 'Administração & Rede', label: 'Administração & Rede (3)' },
    { id: 'Gestão & Secretaria', label: 'Gestão & Secretaria (2)' },
    { id: 'Corpo Pedagógico', label: 'Corpo Pedagógico (4)' },
    { id: 'Apoio & Operacional', label: 'Apoio & Operacional (5)' },
    { id: 'Comunidade Escolar', label: 'Comunidade Escolar (3)' },
  ];

  const filteredProfiles = RBAC_PROFILES.filter(p => {
    const matchesCategory = selectedCategory === 'todos' || p.category === selectedCategory;
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.scopeAndLimits.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.scopeCategory.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getLevelBadge = (level: AccessLevel, matrixCode?: string) => {
    switch (level) {
      case 'TOTAL':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>{matrixCode || 'TOTAL'}</span>
          </span>
        );
      case 'PARCIAL':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-300">
            <Edit3 className="w-3 h-3 text-sky-600" />
            <span>{matrixCode || 'PARCIAL'}</span>
          </span>
        );
      case 'LEITURA':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <Eye className="w-3 h-3 text-amber-600" />
            <span>{matrixCode || 'LEITURA'}</span>
          </span>
        );
      case 'VEDADO':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300">
            <Lock className="w-3 h-3 text-rose-600" />
            <span>{matrixCode || 'VEDADO'}</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#032c66] to-[#0b4ea2] text-white p-5 sm:p-6 rounded-2xl shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Matriz Oficial de Controle de Acesso e Segurança (RBAC)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Perfis, Escopos e Limites por Módulo
            </h2>
            <p className="text-xs text-blue-100 mt-1 max-w-2xl leading-relaxed">
              Consulte a definição oficial dos 17 perfis do sistema educacional SEMED Manaus, limites de atuação e o teto máximo de permissão por módulo institucional.
            </p>
          </div>

          {onSelectProfile && (
            <div className="bg-white/10 p-3 rounded-xl border border-white/20 text-xs shrink-0 flex flex-col gap-1">
              <span className="text-blue-200 text-[11px] font-medium">Perfil Atual Ativo:</span>
              <div className="font-bold text-white text-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {selectedProfile.name}
              </div>
            </div>
          )}
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-white/15 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('perfis')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'perfis'
                ? 'bg-white text-[#0b4ea2] shadow-sm'
                : 'text-blue-100 hover:bg-white/10'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>1. Catálogo dos 17 Perfis e Escopos</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('matriz')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'matriz'
                ? 'bg-white text-[#0b4ea2] shadow-sm'
                : 'text-blue-100 hover:bg-white/10'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>2. Teto por Módulo (Matriz Completa M1 a M16)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('comparador')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'comparador'
                ? 'bg-white text-[#0b4ea2] shadow-sm'
                : 'text-blue-100 hover:bg-white/10'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>3. Detalhamento & Simulação em Tempo Real</span>
          </button>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* TAB 1: CATÁLOGO DOS 17 PERFIS & ESCOPOS                              */}
      {/* ==================================================================== */}
      {activeTab === 'perfis' && (
        <div className="space-y-4">
          
          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Buscar por perfil, escopo ou regra..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b4ea2]/30 focus:border-[#0b4ea2]"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-[#0b4ea2] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Profiles Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredProfiles.map((p) => {
              const isSelected = selectedProfileId === p.id;
              return (
                <div 
                  key={p.id}
                  className={`bg-white rounded-2xl border transition-all duration-200 shadow-xs flex flex-col justify-between overflow-hidden ${
                    isSelected ? 'border-[#0b4ea2] ring-2 ring-[#0b4ea2]/20' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-slate-900 text-base leading-tight">
                            {p.name}
                          </h3>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mt-1.5">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#0b4ea2] border border-blue-200">
                            {p.category}
                          </span>
                          <span className="text-[10px] font-medium text-slate-500">
                            Escopo: <strong>{p.scopeCategory}</strong>
                          </span>
                        </div>
                      </div>

                      {currentProfileId === p.id && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md shrink-0">
                          ✓ Perfil Autenticado Atual
                        </span>
                      )}
                    </div>

                    {/* Official Scope & Limits Block (Verbatim as specified) */}
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
                      <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-[#0b4ea2]" />
                        Escopo e Limites Oficiais:
                      </p>
                      <p className="text-xs text-slate-700 leading-relaxed font-sans">
                        {p.scopeAndLimits}
                      </p>
                    </div>

                    {/* Authority Flags Matrix */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
                      <div className="p-2 rounded-lg bg-slate-50 flex items-center justify-between border border-slate-100">
                        <span className="text-slate-500">Pode Editar:</span>
                        {p.canEdit ? (
                          <span className="font-bold text-emerald-600 flex items-center gap-0.5"><CheckCircle2 className="w-3 h-3" /> Sim</span>
                        ) : (
                          <span className="font-bold text-rose-500 flex items-center gap-0.5"><XCircle className="w-3 h-3" /> Não</span>
                        )}
                      </div>

                      <div className="p-2 rounded-lg bg-slate-50 flex items-center justify-between border border-slate-100">
                        <span className="text-slate-500">Aprova Planos:</span>
                        {p.canApprove ? (
                          <span className="font-bold text-emerald-600 flex items-center gap-0.5"><CheckCircle2 className="w-3 h-3" /> Sim</span>
                        ) : (
                          <span className="font-bold text-rose-500 flex items-center gap-0.5"><XCircle className="w-3 h-3" /> Não</span>
                        )}
                      </div>

                      <div className="p-2 rounded-lg bg-slate-50 flex items-center justify-between border border-slate-100">
                        <span className="text-slate-500">Assina Docs:</span>
                        {p.canSign ? (
                          <span className="font-bold text-emerald-600 flex items-center gap-0.5"><CheckCircle2 className="w-3 h-3" /> Sim</span>
                        ) : (
                          <span className="font-bold text-rose-500 flex items-center gap-0.5"><XCircle className="w-3 h-3" /> Não</span>
                        )}
                      </div>

                      <div className="p-2 rounded-lg bg-slate-50 flex items-center justify-between border border-slate-100">
                        <span className="text-slate-500">Cria Usuários:</span>
                        {p.canManageUsers ? (
                          <span className="font-bold text-emerald-600 flex items-center gap-0.5"><CheckCircle2 className="w-3 h-3" /> Sim</span>
                        ) : (
                          <span className="font-bold text-rose-500 flex items-center gap-0.5"><XCircle className="w-3 h-3" /> Não</span>
                        )}
                      </div>

                      <div className="p-2 rounded-lg bg-slate-50 flex items-center justify-between border border-slate-100 col-span-2 sm:col-span-2">
                        <span className="text-slate-500">Educacenso / GOV.BR:</span>
                        {p.canExportCenso ? (
                          <span className="font-bold text-emerald-600 flex items-center gap-0.5"><CheckCircle2 className="w-3 h-3" /> Exclusivo (Rede)</span>
                        ) : (
                          <span className="font-bold text-slate-400 flex items-center gap-0.5"><Lock className="w-3 h-3" /> Vedado</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quick Ceilings Preview Strip */}
                  <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-500">
                      Módulos com acesso: <strong className="text-slate-800">{p.allowedModules.length} de {ALL_CANONICAL_MODULES.length}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedProfileId(p.id);
                        setActiveTab('comparador');
                      }}
                      className="text-[#0b4ea2] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Ver Teto de Módulos</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 2: MATRIZ DE TETOS POR MÓDULO (TODOS OS PERFIS X TODOS OS MÓDULOS) */}
      {/* ==================================================================== */}
      {activeTab === 'matriz' && (
        <div className="space-y-4">
          
          {/* Sub-header with module filter */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Teto Máximo por Módulo (Matriz Completa de Segurança)</h3>
              <p className="text-xs text-slate-500">Identificação clara do limite máximo de cada perfil nos 16 módulos do sistema</p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-slate-600">Filtrar Módulo:</span>
              <select
                value={selectedModuleFilter}
                onChange={(e) => setSelectedModuleFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0b4ea2]"
              >
                <option value="todos">Todos os Módulos (Visão Geral da Matriz)</option>
                {ALL_CANONICAL_MODULES.map((m) => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Official Legend Banner from Page 11 of PDF */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="font-bold text-slate-800">Legenda Oficial (Seção 2.2):</span>
            <span><strong className="text-emerald-700">V</strong> = Visualizar</span>
            <span><strong className="text-sky-700">C</strong> = Criar</span>
            <span><strong className="text-blue-700">E</strong> = Editar</span>
            <span><strong className="text-purple-700">A</strong> = Aprovar/Assinar</span>
            <span><strong className="text-rose-700">—</strong> = Sem Acesso</span>
            <span><strong className="text-amber-700">†</strong> = Variável</span>
            <span className="text-slate-400">·</span>
            <span><strong>(t)</strong> Turmas próprias</span>
            <span><strong>(a)</strong> Alunos AEE</span>
            <span><strong>(f)</strong> Filhos vinculados</span>
            <span><strong>(p)</strong> Próprios dados</span>
          </div>

          {/* Interactive Matrix Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200 sticky top-0 z-10">
                  <tr>
                    <th className="py-3 px-4 min-w-[200px]">Perfil Oficial SEMED</th>
                    <th className="py-3 px-4 min-w-[140px]">Categoria & Escopo</th>
                    {selectedModuleFilter === 'todos' ? (
                      ALL_CANONICAL_MODULES.slice(0, 8).map((m) => (
                        <th key={m.id} className="py-3 px-3 text-center min-w-[110px]" title={m.name}>
                          {m.name.length > 14 ? `${m.name.slice(0, 12)}...` : m.name}
                        </th>
                      ))
                    ) : (
                      <th className="py-3 px-4 text-center min-w-[220px]">
                        Teto no Módulo Selecionado: {ALL_CANONICAL_MODULES.find(m => m.id === selectedModuleFilter)?.name}
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {RBAC_PROFILES.map((p) => {
                    return (
                      <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4 font-bold text-slate-800 whitespace-nowrap">
                          <div>{p.name}</div>
                          <div className="text-[10px] text-slate-400 font-normal">{p.sampleUser.roleTitle}</div>
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          <div className="font-semibold text-[11px] text-[#0b4ea2]">{p.category}</div>
                          <div className="text-[10px] text-slate-500 truncate max-w-[150px]">{p.scopeCategory}</div>
                        </td>
                        
                        {selectedModuleFilter === 'todos' ? (
                          ALL_CANONICAL_MODULES.slice(0, 8).map((m) => {
                            const ceiling = p.moduleCeilings[m.id] || { level: 'VEDADO', matrixCode: '—' };
                            return (
                              <td key={m.id} className="py-3 px-2 text-center" title={`${p.name} em ${m.name}: ${ceiling.matrixCode} (${ceiling.level}) - ${ceiling.details || ''}`}>
                                {getLevelBadge(ceiling.level, ceiling.matrixCode)}
                              </td>
                            );
                          })
                        ) : (
                          <td className="py-3 px-4 text-center">
                            {(() => {
                              const ceiling = p.moduleCeilings[selectedModuleFilter] || { level: 'VEDADO', matrixCode: '—' };
                              return (
                                <div className="inline-flex flex-col items-center gap-1">
                                  {getLevelBadge(ceiling.level, ceiling.matrixCode)}
                                  {ceiling.details && (
                                    <span className="text-[10px] text-slate-500 max-w-xs">{ceiling.details}</span>
                                  )}
                                </div>
                              );
                            })()}
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {selectedModuleFilter === 'todos' && (
              <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500">
                <span>Visualizando primeiros 8 módulos na tabela compacta. Selecione um módulo no filtro acima para examinar detalhes completos e regras de exceção.</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 3: DETALHAMENTO & SIMULADOR EM TEMPO REAL                        */}
      {/* ==================================================================== */}
      {activeTab === 'comparador' && (
        <div className="space-y-6">
          
          {/* Profile Selector Toolbar */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Ficha Detalhada do Perfil & Teto nos 16 Módulos</h3>
                <p className="text-xs text-slate-500">Selecione qualquer perfil para inspecionar todas as permissões e restrições específicas</p>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={selectedProfileId}
                  onChange={(e) => setSelectedProfileId(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0b4ea2]"
                >
                  {RBAC_PROFILES.map((p) => (
                    <option key={p.id} value={p.id}>{p.name} ({p.category})</option>
                  ))}
                </select>

              </div>
            </div>

            {/* Selected Profile Header Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-semibold text-[#0b4ea2] uppercase tracking-wider">{selectedProfile.category}</span>
                  <h4 className="text-lg font-black text-slate-900">{selectedProfile.name}</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Escopo territorial: <strong>{selectedProfile.scopeCategory}</strong></p>
                </div>

                <div className="text-xs text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-slate-200 font-medium">
                  Perfil Oficial: <strong>{selectedProfile.sampleUser.roleTitle}</strong>
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-700 leading-relaxed font-sans">
                <strong className="text-slate-900 block mb-1">Escopo e Limites Oficiais (SEMED Manaus):</strong>
                {selectedProfile.scopeAndLimits}
              </div>
            </div>

            {/* Ceiling of this profile across all 16 modules */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider">
                Teto do Perfil por Módulo (Todos os 16 Módulos do Sistema)
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {ALL_CANONICAL_MODULES.map((m) => {
                  const ceiling = selectedProfile.moduleCeilings[m.id] || { level: 'VEDADO' };
                  return (
                    <div 
                      key={m.id}
                      className={`p-3.5 rounded-xl border transition-all text-xs flex flex-col justify-between space-y-2 ${
                        ceiling.level === 'TOTAL'
                          ? 'bg-emerald-50/60 border-emerald-200'
                          : ceiling.level === 'PARCIAL'
                          ? 'bg-sky-50/60 border-sky-200'
                          : ceiling.level === 'LEITURA'
                          ? 'bg-amber-50/60 border-amber-200'
                          : 'bg-slate-50 border-slate-200 opacity-80'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <h5 className="font-bold text-slate-800 text-xs truncate" title={m.name}>{m.name}</h5>
                          {getLevelBadge(ceiling.level, ceiling.matrixCode)}
                        </div>
                        {ceiling.details && (
                          <p className="text-[11px] text-slate-600 leading-tight">
                            {ceiling.details}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
