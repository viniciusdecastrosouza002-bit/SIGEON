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
  LogOut, 
  PanelLeftClose, 
  PanelLeft, 
  X,
  Lock,
  ShieldCheck as ShieldIcon
} from 'lucide-react';
import { UserProfile } from '../types';
import { getProfileById, hasModuleAccess } from '../config/rbacProfiles';

export interface SidebarProps {
  currentModule: string;
  currentSubItem?: string;
  onSelectNavigation: (module: any, subItemId?: string) => void;
  user: UserProfile;
  onLogout: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentModule,
  currentSubItem = 'default',
  onSelectNavigation,
  user,
  onLogout,
  isMobileOpen,
  onCloseMobile,
}) => {
  const currentProfile = getProfileById(user.role);
  // Desktop collapsed state
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  // Logout confirmation modal
  const [showLogoutConfirm, setShowLogoutConfirm] = useState<boolean>(false);

  // Top Standalone Item
  const topItem = {
    id: 'visao-geral',
    label: 'Visão Geral',
    icon: LayoutGrid,
  };

  // Navigation Groups matching the exact uploaded schema
  const navigationGroups = [
    {
      id: 'gestao-escolar',
      groupTitle: 'GESTÃO ESCOLAR',
      items: [
        { id: 'gestao-alunos', label: 'Gestão de Alunos', icon: GraduationCap },
        { id: 'notas-frequencia', label: 'Notas e Frequência', icon: ClipboardCheck },
        { id: 'gestao-pedagogica', label: 'Gestão Pedagógica', icon: BookOpen },
        { id: 'equipe-escolar', label: 'Equipe Escolar', icon: Users },
        { id: 'organizacao-escolar', label: 'Organização Escolar', icon: School },
      ],
    },
    {
      id: 'comunicacao-servicos',
      groupTitle: 'COMUNICAÇÃO E SERVIÇOS',
      items: [
        { id: 'comunicacao-escolar', label: 'Comunicação Escolar', icon: MessagesSquare },
        { id: 'atendimento-estudante', label: 'Atendimento ao Estudante', icon: Heart },
        { id: 'biblioteca', label: 'Biblioteca', icon: Library },
        { id: 'patrimonio-manutencao', label: 'Patrimônio e Manutenção', icon: Building },
        { id: 'materiais-logistica', label: 'Materiais e Logística', icon: Package },
        { id: 'portaria-visitantes', label: 'Portaria e Visitantes', icon: ShieldCheck },
      ],
    },
    {
      id: 'administracao-controle',
      groupTitle: 'ADMINISTRAÇÃO E CONTROLE',
      items: [
        { id: 'administracao-sistema', label: 'Administração do Sistema', icon: Settings },
        { id: 'paineis-relatorios', label: 'Painéis e Relatórios', icon: TrendingUp },
        { id: 'documentos-suporte', label: 'Documentos e Suporte', icon: Files },
        { id: 'financeiro-integracoes', label: 'Financeiro e Integrações', icon: Landmark },
      ],
    },
  ];

  const handleItemClick = (moduleId: string) => {
    onSelectNavigation(moduleId);
    if (isMobileOpen) {
      onCloseMobile();
    }
  };

  // Helper to determine if an item is active, with backward compatibility
  const isItemActive = (id: string) => {
    if (currentModule === id) return true;
    if (currentModule === 'alunos' && id === 'gestao-alunos') return true;
    if (currentModule === 'servidores' && id === 'equipe-escolar') return true;
    if (currentModule === 'gestao' && id === 'organizacao-escolar') return true;
    if (currentModule === 'relatorios' && id === 'paineis-relatorios') return true;
    return false;
  };

  const getInitials = (fullName: string) => {
    const parts = fullName.split(' ').filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0]?.slice(0, 2).toUpperCase() || 'US';
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 lg:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Confirmation Modal for Logout */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-sm w-full p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <LogOut className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Encerrar Sessão?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Você retornará para a tela inicial de autenticação do SIGEON da Prefeitura de Manaus.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                Permanecer
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowLogoutConfirm(false);
                  onLogout();
                }}
                className="flex-1 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors shadow-sm cursor-pointer"
              >
                Confirmar Saída
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SIDEBAR MAIN CONTAINER */}
      <aside
        aria-label="Barra Lateral de Navegação Institucional"
        className={`fixed lg:sticky top-0 left-0 h-screen z-50 flex flex-col justify-between bg-[#191b1f] border-r border-slate-800/80 text-slate-200 transition-all duration-300 ease-in-out select-none shadow-xl ${
          // Mobile drawer slide
          isMobileOpen 
            ? 'translate-x-0 w-[280px] max-w-[85vw]' 
            : '-translate-x-full lg:translate-x-0'
        } ${
          // Desktop width (expanded vs collapsed)
          isCollapsed ? 'lg:w-[76px]' : 'lg:w-[280px]'
        }`}
      >
        {/* ======================================================== */}
        {/* 1. TOP HEADER: LOGO, SIGEON BRAND & TOGGLE               */}
        {/* ======================================================== */}
        <div className="h-18 px-4 flex items-center justify-between border-b border-slate-800/80 shrink-0 bg-[#141619]">
          
          {/* Expanded Brand View */}
          {!isCollapsed ? (
            <div className="flex items-center gap-3 overflow-hidden">
              <img
                src="/assets/aistudio/sigeon_icon.png"
                alt="Logo SIGEON"
                className="h-11 w-auto object-contain shrink-0 drop-shadow-sm"
              />
              <div className="flex flex-col leading-tight min-w-0">
                <span className="text-sm font-extrabold tracking-wider text-white uppercase flex items-center gap-1.5">
                  <span>SIGEON</span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#0b4ea2] text-cyan-200 tracking-normal uppercase">
                    SEMED
                  </span>
                </span>
                <span className="text-[11px] text-slate-400 truncate">
                  Gestão Educacional
                </span>
              </div>
            </div>
          ) : (
            /* Collapsed Brand View (Compact Icon) */
            <div className="w-full flex justify-center">
              <img
                src="/assets/aistudio/sigeon_icon.png"
                alt="Logo SIGEON"
                className="h-9 w-auto object-contain drop-shadow-sm"
                title="SIGEON - Sistema Integrado de Gestão Educacional"
              />
            </div>
          )}

          {/* Desktop Toggle Expand/Collapse Button */}
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer shrink-0"
            title={isCollapsed ? "Expandir barra lateral" : "Recolher barra lateral"}
            aria-label={isCollapsed ? "Expandir barra lateral" : "Recolher barra lateral"}
          >
            {isCollapsed ? (
              <PanelLeft className="w-4 h-4" />
            ) : (
              <PanelLeftClose className="w-4 h-4" />
            )}
          </button>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            aria-label="Fechar menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ======================================================== */}
        {/* 2. NAVIGATION LIST (SCROLLABLE INDEPENDENTLY)           */}
        {/* ======================================================== */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-3 space-y-4 scrollbar-thin scrollbar-thumb-slate-700/60 scrollbar-track-transparent">
          
          {/* Top Standalone Item: Visão Geral (Only if profile has authorization) */}
          {hasModuleAccess(user.role, topItem.id) && (() => {
            const TopIcon = topItem.icon;
            const isTopActive = isItemActive(topItem.id);
            return (
              <div className="relative group/top">
                <button
                  type="button"
                  onClick={() => handleItemClick(topItem.id)}
                  className={`w-full flex items-center px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer relative ${
                    isTopActive
                      ? 'bg-[#0b4ea2] text-white shadow-md shadow-blue-950/40 font-bold'
                      : 'text-slate-200 hover:text-white hover:bg-white/5'
                  } ${isCollapsed ? 'justify-center px-0' : 'gap-3'}`}
                  title={isCollapsed ? topItem.label : undefined}
                >
                  {isTopActive && (
                    <span 
                      className="absolute -left-3 top-1.5 bottom-1.5 w-1.5 bg-cyan-400 rounded-r-md shadow-sm" 
                      aria-hidden="true"
                    />
                  )}
                  <TopIcon className={`w-4.5 h-4.5 shrink-0 transition-transform ${
                    isTopActive ? 'text-cyan-300 scale-105' : 'text-slate-300 group-hover/top:text-white'
                  }`} />
                  {!isCollapsed && (
                    <span className="truncate tracking-wide text-left flex-1 font-semibold">
                      {topItem.label}
                    </span>
                  )}
                </button>

                {/* Collapsed Tooltip */}
                {isCollapsed && (
                  <div className="hidden group-hover/top:flex absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 bg-[#25282d] text-white py-1.5 px-3 rounded-xl shadow-2xl border border-slate-700 whitespace-nowrap text-xs font-semibold pointer-events-none items-center gap-2 animate-in fade-in duration-150">
                    <span>{topItem.label}</span>
                  </div>
                )}
              </div>
            );
          })()}

          {/* Divider after Visão Geral if visible and there are following groups */}
          {hasModuleAccess(user.role, topItem.id) && (
            <div className="w-full h-[1px] bg-slate-800/80 my-2" />
          )}

          {/* Navigation Groups: strictly filtered to authorized tabs only */}
          {navigationGroups
            .map((group) => ({
              ...group,
              items: group.items.filter((item) => hasModuleAccess(user.role, item.id)),
            }))
            .filter((group) => group.items.length > 0)
            .map((group) => (
            <div key={group.id} className="space-y-1">
              {/* Group Title Header */}
              {!isCollapsed ? (
                <h4 className="px-3 pt-1 pb-1 text-[10px] font-bold text-slate-400/80 uppercase tracking-wider">
                  {group.groupTitle}
                </h4>
              ) : (
                <div className="w-full h-[1px] bg-slate-800/60 my-2" />
              )}

              {/* Group Items */}
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = isItemActive(item.id);

                  return (
                    <div key={item.id} className="relative group/nav">
                      <button
                        type="button"
                        onClick={() => handleItemClick(item.id)}
                        className={`w-full flex items-center px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer relative ${
                          isActive
                            ? 'bg-[#0b4ea2] text-white shadow-md shadow-blue-950/40 font-bold'
                            : 'text-slate-300 hover:text-white hover:bg-white/5'
                        } ${isCollapsed ? 'justify-center px-0' : 'gap-3'}`}
                        title={isCollapsed ? item.label : undefined}
                      >
                        {/* Active Indicator Bar on Left Edge */}
                        {isActive && (
                          <span 
                            className="absolute -left-3 top-1.5 bottom-1.5 w-1.5 bg-cyan-400 rounded-r-md shadow-sm" 
                            aria-hidden="true"
                          />
                        )}

                        <Icon className={`w-4 h-4 shrink-0 transition-transform ${
                          isActive 
                            ? 'text-cyan-300 scale-105' 
                            : 'text-slate-400 group-hover/nav:text-white'
                        }`} />

                        {!isCollapsed && (
                          <span className="truncate tracking-wide text-left flex-1 flex items-center justify-between gap-1.5">
                            <span className="truncate">{item.label}</span>
                          </span>
                        )}
                      </button>

                      {/* Collapsed Tooltip Flyout on Hover */}
                      {isCollapsed && (
                        <div className="hidden group-hover/nav:flex absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 bg-[#25282d] text-white py-1.5 px-3 rounded-xl shadow-2xl border border-slate-700 whitespace-nowrap text-xs font-semibold pointer-events-none items-center gap-2 animate-in fade-in duration-150">
                          <span>{item.label}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Divider after group */}
              <div className="w-full h-[1px] bg-slate-800/80 my-2" />
            </div>
          ))}
        </div>

        {/* ======================================================== */}
        {/* 3. FOOTER USER PROFILE & SESSION MANAGEMENT              */}
        {/* ======================================================== */}
        <div className="p-3 border-t border-slate-800/80 bg-[#141619] shrink-0">
          {!isCollapsed ? (
            /* Expanded User Profile Card */
            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-2.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  {/* User Avatar Circle */}
                  <div 
                    className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0b4ea2] to-cyan-500 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-sm"
                    title={user.name}
                  >
                    {getInitials(user.name)}
                  </div>

                  {/* User Information */}
                  <div className="flex flex-col leading-tight min-w-0">
                    <span className="text-xs font-bold text-white truncate" title={user.name}>
                      {user.name}
                    </span>
                    <span className="text-[10px] text-slate-300 truncate mt-0.5">
                      {user.roleTitle}
                    </span>
                    <span className="text-[9px] text-slate-400 truncate">
                      {user.ddz}
                    </span>
                  </div>
                </div>

                {/* Logout Action Button */}
                <button
                  type="button"
                  onClick={() => setShowLogoutConfirm(true)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer shrink-0"
                  title="Sair do sistema SIGEAM"
                  aria-label="Sair do sistema"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>

              {/* Authenticated Profile Badge */}
              <div
                className="w-full py-1.5 px-2.5 rounded-xl bg-blue-500/15 text-cyan-200 border border-blue-400/25 text-[10px] font-bold flex items-center justify-between shadow-xs"
                title={`Perfil Oficial Autenticado: ${currentProfile.name} (${currentProfile.category})`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <ShieldIcon className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                  <span className="truncate">Perfil: {currentProfile.name}</span>
                </div>
                <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-emerald-600/40 text-emerald-200 font-medium shrink-0">Ativo</span>
              </div>
            </div>
          ) : (
            /* Collapsed User View (Compact) */
            <div className="flex flex-col items-center gap-2 group/user relative">
              <div 
                className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0b4ea2] to-cyan-500 text-white font-extrabold text-xs flex items-center justify-center shadow-sm cursor-pointer"
                title={`${user.name} (${user.roleTitle})`}
              >
                {getInitials(user.name)}
              </div>

              <div
                className="p-2 rounded-xl text-cyan-300"
                title={`Perfil Ativo: ${currentProfile.name}`}
              >
                <ShieldIcon className="w-4 h-4" />
              </div>

              <button
                type="button"
                onClick={() => setShowLogoutConfirm(true)}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                title="Sair do sistema"
                aria-label="Sair do sistema"
              >
                <LogOut className="w-4 h-4" />
              </button>

              {/* Collapsed Hover Card for User */}
              <div className="hidden group-hover/user:flex absolute left-full ml-3 bottom-0 z-50 bg-[#25282d] text-white p-3 rounded-xl shadow-2xl border border-slate-700 whitespace-nowrap text-xs font-medium pointer-events-none flex-col gap-1 animate-in fade-in duration-150">
                <span className="font-bold text-white">{user.name}</span>
                <span className="text-[10px] text-slate-300">{user.roleTitle}</span>
                <span className="text-[9px] text-slate-400">{user.ddz}</span>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
