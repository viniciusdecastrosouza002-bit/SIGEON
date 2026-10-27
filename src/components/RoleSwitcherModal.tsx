import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Check, 
  Search, 
  ArrowRight, 
  Lock, 
  Eye, 
  CheckCircle2, 
  UserCheck 
} from 'lucide-react';
import { RBAC_PROFILES, ProfileDefinition } from '../config/rbacProfiles';
import { UserProfile } from '../types';

interface RoleSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: string;
  onSelectUser: (user: UserProfile) => void;
}

export const RoleSwitcherModal: React.FC<RoleSwitcherModalProps> = ({
  isOpen,
  onClose,
  currentRole,
  onSelectUser,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  if (!isOpen) return null;

  const categories = [
    { id: 'todos', label: 'Todos (17)' },
    { id: 'Administração & Rede', label: 'Administração & Rede' },
    { id: 'Gestão & Secretaria', label: 'Gestão & Secretaria' },
    { id: 'Corpo Pedagógico', label: 'Corpo Pedagógico' },
    { id: 'Apoio & Operacional', label: 'Apoio & Operacional' },
    { id: 'Comunidade Escolar', label: 'Comunidade Escolar' },
  ];

  const filtered = RBAC_PROFILES.filter((p) => {
    const matchesCat = selectedCategory === 'todos' || p.category === selectedCategory;
    const matchesQuery = 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.scopeAndLimits.toLowerCase().includes(search.toLowerCase()) ||
      p.sampleUser.roleTitle.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleSelect = (p: ProfileDefinition) => {
    const newUser: UserProfile = {
      name: p.sampleUser.name,
      cpf: p.sampleUser.cpf,
      role: p.id as any,
      roleTitle: p.sampleUser.roleTitle,
      school: p.sampleUser.school,
      ddz: p.sampleUser.ddz,
      email: p.sampleUser.email,
    };
    onSelectUser(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0b4ea2] px-6 py-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-blue-100">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Alternar Perfil para Teste (17 Perfis SEMED)</h3>
              <p className="text-xs text-blue-200 mt-0.5">
                Selecione qualquer perfil para navegar com suas permissões, escopos e limites de teto
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Categories Bar */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 space-y-3 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Buscar perfil ou limite específico (ex: notas, plano, Educacenso)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b4ea2]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1 rounded-lg font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                  selectedCategory === c.id
                    ? 'bg-[#0b4ea2] text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Profiles List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5 divide-y divide-slate-100">
          {filtered.map((p) => {
            const isCurrent = currentRole === p.id;
            return (
              <div
                key={p.id}
                onClick={() => handleSelect(p)}
                className={`pt-2.5 p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isCurrent 
                    ? 'bg-blue-50/70 border-blue-300 ring-2 ring-blue-500/20' 
                    : 'bg-white border-slate-200 hover:border-[#0b4ea2] hover:bg-slate-50/60'
                }`}
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-slate-900 text-sm">{p.name}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-[#0b4ea2] border border-slate-200">
                      {p.category}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Escopo: <strong>{p.scopeCategory}</strong>
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {p.scopeAndLimits}
                  </p>

                  <div className="text-[11px] text-slate-400 font-medium">
                    Usuário demo: <strong>{p.sampleUser.name}</strong> ({p.sampleUser.roleTitle})
                  </div>
                </div>

                <div className="shrink-0 flex items-center justify-end">
                  {isCurrent ? (
                    <span className="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold flex items-center gap-1 shadow-xs">
                      <Check className="w-3.5 h-3.5" />
                      Ativo
                    </span>
                  ) : (
                    <button
                      type="button"
                      className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-[#0b4ea2] hover:text-white text-slate-700 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <span>Entrar</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500 shrink-0">
          <span>O SIGEAM aplicará automaticamente os tetos e permissões de cada perfil por módulo.</span>
        </div>
      </div>
    </div>
  );
};
