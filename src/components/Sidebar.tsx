import React, { useState, useMemo } from 'react';
import { 
  LogOut, 
  PanelLeftClose, 
  PanelLeft, 
  X,
  Search,
  ChevronDown,
  ChevronRight,
  ShieldCheck as ShieldIcon,
  School as SchoolIcon
} from 'lucide-react';
import { UserProfile } from '../types';
import { getProfileById, hasModuleAccess } from '../config/rbacProfiles';
import { 
  INSTITUTIONAL_NAVIGATION, 
  InstitutionalGroup, 
  InstitutionalModule,
  getInstitutionalModule
} from '../config/navigationData';

export interface SidebarProps {
  currentModule: string;
  currentSubItem?: string;
  onSelectNavigation: (moduleId: string, subItemId?: string) => void;
  user: UserProfile;
  onLogout: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentModule,
  currentSubItem,
  onSelectNavigation,
  user,
  onLogout,
  isMobileOpen,
  onCloseMobile,
}) => {
  const currentProfile = getProfileById(user.role);
  
  // Desktop collapsed state
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  
  // Search query for modules
  const [navSearch, setNavSearch] = useState<string>('');

  // Logout confirmation modal
  const [showLogoutConfirm, setShowLogoutConfirm] = useState<boolean>(false);

  // Group accordion state (all groups open by default for clear institutional visibility)
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    'inicio': true,
    'gestao-academica': true,
    'gestao-pedagogica': true,
    'gestao-administrativa': true,
    'infraestrutura-servicos': true,
    'administracao-controle': true,
  });

  const toggleGroup = (groupId: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  // Helper to determine if a module is active, with alias fallback
  const isItemActive = (id: string) => {
    if (currentModule === id) return true;
    const resolved = getInstitutionalModule(currentModule);
    return resolved?.id === id;
  };

  // Filter groups and modules based on RBAC permissions and user search
  const filteredNavigation = useMemo(() => {
    const q = navSearch.trim().toLowerCase();

    return INSTITUTIONAL_NAVIGATION.map((group) => {
      // 1. Filter by role access
      const authorizedModules = group.modules.filter((m) =>
        hasModuleAccess(user.role, m.id)
      );

      // 2. Filter by search query (match module name or any internal subdivision)
      const matchingModules = authorizedModules.filter((m) => {
        if (!q) return true;
        const matchName = m.name.toLowerCase().includes(q) || m.shortName.toLowerCase().includes(q);
        const matchSub = m.subdivisions.some((s) => s.label.toLowerCase().includes(q));
        const matchGroup = group.groupTitle.toLowerCase().includes(q);
        return matchName || matchSub || matchGroup;
      });

      return {
        ...group,
        modules: matchingModules,
      };
    }).filter((group) => group.modules.length > 0);
  }, [user.role, navSearch]);

  const handleModuleClick = (moduleId: string, subItemId?: string) => {
    onSelectNavigation(moduleId, subItemId);
    if (isMobileOpen) {
      onCloseMobile();
    }
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
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs z-50 lg:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Confirmation Modal for Logout */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
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
        className={`fixed lg:sticky top-0 left-0 h-screen z-50 flex flex-col justify-between bg-[#111622] border-r border-slate-800 text-slate-200 transition-all duration-300 ease-in-out select-none shadow-2xl ${
          // Mobile drawer slide
          isMobileOpen 
            ? 'translate-x-0 w-[295px] max-w-[88vw]' 
            : '-translate-x-full lg:translate-x-0'
        } ${
          // Desktop width (expanded vs collapsed)
          isCollapsed ? 'lg:w-[76px]' : 'lg:w-[295px]'
        }`}
      >
        {/* ======================================================== */}
        {/* 1. TOP HEADER: LOGO, SIGEON BRAND & TOGGLE               */}
        {/* ======================================================== */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800/80 shrink-0 bg-[#0d121c]">
          
          {/* Expanded Brand View */}
          {!isCollapsed ? (
            <div className="flex items-center gap-3 overflow-hidden">
              <img
                src="/assets/aistudio/sigeon_icon.png"
                alt="Logo SIGEON"
                className="h-10 w-auto object-contain shrink-0 drop-shadow-sm"
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
        {/* 2. INSTITUTIONAL SEARCH BAR (Expanded view only)         */}
        {/* ======================================================== */}
        {!isCollapsed && (
          <div className="px-3 pt-3 pb-1 shrink-0">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
                placeholder="Pesquisar módulos ou funções..."
                className="w-full bg-[#161c29] border border-slate-700/70 rounded-xl pl-8 pr-7 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-[#0b4ea2] focus:ring-1 focus:ring-[#0b4ea2]/30 transition-all"
              />
              {navSearch && (
                <button
                  type="button"
                  onClick={() => setNavSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 3. NAVIGATION GROUPS ACCORDION (SCROLLABLE)              */}
        {/* ======================================================== */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-2 px-3 space-y-3 scrollbar-thin scrollbar-thumb-slate-700/60 scrollbar-track-transparent">
          {filteredNavigation.map((group) => {
            const isOpen = openGroups[group.id] ?? true;

            return (
              <div key={group.id} className="space-y-1">
                {/* Group Accordion Header */}
                {!isCollapsed ? (
                  <button
                    type="button"
                    onClick={() => toggleGroup(group.id)}
                    className="w-full px-2.5 py-1 text-[10px] font-bold text-slate-400 hover:text-slate-200 uppercase tracking-wider flex items-center justify-between group/grp transition-colors cursor-pointer"
                  >
                    <span className="truncate">{group.groupTitle}</span>
                    <span className="text-slate-500 group-hover/grp:text-slate-300">
                      {isOpen ? (
                        <ChevronDown className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5" />
                      )}
                    </span>
                  </button>
                ) : (
                  <div className="w-full h-[1px] bg-slate-800/80 my-2" />
                )}

                {/* Modules in this Group */}
                {(isCollapsed || isOpen) && (
                  <div className="space-y-0.5 animate-in fade-in duration-150">
                    {group.modules.map((m) => {
                      const Icon = m.icon;
                      const isActive = isItemActive(m.id);

                      return (
                        <div key={m.id} className="relative group/nav">
                          <button
                            type="button"
                            onClick={() => handleModuleClick(m.id)}
                            className={`w-full flex items-center px-3 py-2 rounded-xl text-xs transition-all duration-200 cursor-pointer relative ${
                              isActive
                                ? 'bg-[#0b4ea2] text-white shadow-md shadow-blue-950/40 font-bold'
                                : 'text-slate-300 hover:text-white hover:bg-white/5 font-medium'
                            } ${isCollapsed ? 'justify-center px-0' : 'gap-3'}`}
                            title={isCollapsed ? m.name : undefined}
                          >
                            {/* Active Indicator Bar on Left Edge */}
                            {isActive && (
                              <span 
                                className="absolute -left-3 top-1.5 bottom-1.5 w-1.5 bg-cyan-400 rounded-r-md shadow-sm" 
                                aria-hidden="true"
                              />
                            )}

                            <Icon className={`w-4.5 h-4.5 shrink-0 transition-transform ${
                              isActive 
                                ? 'text-cyan-300 scale-105' 
                                : 'text-slate-400 group-hover/nav:text-white'
                            }`} />

                            {!isCollapsed && (
                              <div className="min-w-0 flex-1 text-left flex items-center justify-between gap-1.5">
                                <span className="truncate leading-tight">{m.name}</span>
                              </div>
                            )}
                          </button>

                          {/* Collapsed Tooltip Flyout on Hover */}
                          {isCollapsed && (
                            <div className="hidden group-hover/nav:flex absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 bg-[#1e2536] text-white py-2 px-3 rounded-xl shadow-2xl border border-slate-700 whitespace-nowrap text-xs font-semibold pointer-events-none flex-col gap-0.5 animate-in fade-in duration-150">
                              <span className="font-bold text-cyan-300">{m.name}</span>
                              <span className="text-[10px] text-slate-400">{group.groupTitle}</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {filteredNavigation.length === 0 && (
            <div className="text-center py-6 px-2 text-xs text-slate-500">
              Nenhum módulo encontrado para "{navSearch}".
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* 4. FOOTER: USER IDENTIFICATION, SCHOOL & LOGOUT          */}
        {/* ======================================================== */}
        <div className="p-3 border-t border-slate-800/80 bg-[#0d121c] shrink-0">
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
                    <span className="text-[9px] text-slate-400 truncate flex items-center gap-1 mt-0.5">
                      <SchoolIcon className="w-2.5 h-2.5 text-blue-400 shrink-0" />
                      <span className="truncate">{user.school}</span>
                    </span>
                  </div>
                </div>

                {/* Logout Action Button */}
                <button
                  type="button"
                  onClick={() => setShowLogoutConfirm(true)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer shrink-0"
                  title="Encerrar sessão"
                  aria-label="Sair do sistema"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>

              {/* Authenticated Profile Badge */}
              <div
                className="w-full py-1.5 px-2.5 rounded-xl bg-blue-500/15 text-cyan-200 border border-blue-400/25 text-[10px] font-bold flex items-center justify-between shadow-xs"
                title={`Perfil Autenticado: ${currentProfile.name} (${currentProfile.category})`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <ShieldIcon className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                  <span className="truncate">{currentProfile.name}</span>
                </div>
                <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-emerald-600/40 text-emerald-200 font-medium shrink-0">
                  {user.ddz}
                </span>
              </div>
            </div>
          ) : (
            /* Collapsed User View (Compact) */
            <div className="flex flex-col items-center gap-2 group/user relative">
              <div 
                className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0b4ea2] to-cyan-500 text-white font-extrabold text-xs flex items-center justify-center shadow-sm cursor-pointer"
                title={`${user.name} (${user.roleTitle}) - ${user.school}`}
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
              <div className="hidden group-hover/user:flex absolute left-full ml-3 bottom-0 z-50 bg-[#1e2536] text-white p-3 rounded-xl shadow-2xl border border-slate-700 whitespace-nowrap text-xs font-medium pointer-events-none flex-col gap-1 animate-in fade-in duration-150">
                <span className="font-bold text-white">{user.name}</span>
                <span className="text-[10px] text-slate-300">{user.roleTitle}</span>
                <span className="text-[9px] text-slate-400">{user.school} · {user.ddz}</span>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
