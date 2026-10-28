import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn, 
  Headphones, 
  GraduationCap, 
  Users, 
  FileText, 
  BarChart3, 
  ShieldCheck, 
  Building2
} from 'lucide-react';
import { ManausLogo } from './ManausLogo';
import { SupportModal } from './SupportModal';
import { PasswordResetModal } from './PasswordResetModal';
import { ModulePreviewModal, ModuleType } from './ModulePreviewModal';
import { UserProfile } from '../types';
import { RBAC_PROFILES, validateCredentials } from '../config/rbacProfiles';

interface LoginScreenProps {
  onLogin: (user: UserProfile) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Modals state
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [activeModule, setActiveModule] = useState<ModuleType | null>(null);

  // CPF formatter
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 11);
    let formatted = raw;
    if (raw.length > 9) {
      formatted = `${raw.slice(0, 3)}.${raw.slice(3, 6)}.${raw.slice(6, 9)}-${raw.slice(9)}`;
    } else if (raw.length > 6) {
      formatted = `${raw.slice(0, 3)}.${raw.slice(3, 6)}.${raw.slice(6)}`;
    } else if (raw.length > 3) {
      formatted = `${raw.slice(0, 3)}.${raw.slice(3)}`;
    }
    setCpf(formatted);
    if (errorMessage) setErrorMessage('');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!cpf.trim() || !senha.trim()) {
      setErrorMessage('Por favor, informe seu CPF e sua senha de acesso.');
      return;
    }

    const cleanCpf = cpf.replace(/\D/g, '');
    if (cleanCpf.length < 11 && cpf !== '000.000.000-00') {
      setErrorMessage('Por favor, informe o CPF completo no formato 000.000.000-00');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);

      const validation = validateCredentials(cpf, senha);

      if (!validation.success || !validation.profile) {
        if (validation.error === 'CPF_NOT_FOUND') {
          // Exact normative message required by page 4 of TEORIA_67d50b79.pdf
          setErrorMessage('CPF NÃO ENCONTRADO. CONTATE A SECRETARIA DA SUA UNIDADE DE ENSINO.');
        } else if (validation.error === 'INVALID_PASSWORD') {
          setErrorMessage('Senha incorreta. Verifique os dados digitados e tente novamente.');
        } else {
          setErrorMessage('Por favor, informe seu CPF e sua senha de acesso.');
        }
        return;
      }

      const p = validation.profile;
      onLogin({
        name: p.sampleUser.name,
        cpf: p.sampleUser.cpf,
        role: p.id,
        roleTitle: p.sampleUser.roleTitle,
        school: p.sampleUser.school || 'E.M. Antonina Borges de Sá',
        ddz: p.sampleUser.ddz,
        email: p.sampleUser.email,
      });
    }, 450);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-[#022b64] selection:bg-blue-500 selection:text-white">
      {/* Modals */}
      <SupportModal isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />
      <PasswordResetModal isOpen={isResetOpen} onClose={() => setIsResetOpen(false)} />
      <ModulePreviewModal
        module={activeModule}
        onClose={() => setActiveModule(null)}
      />

      {/* Main Container */}
      <div className="relative flex-1 w-full grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-48px)]">
        
        {/* LEFT SECTION (Hero & SEMED Brand) - 7 cols on lg */}
        <div className="relative lg:col-span-7 flex flex-col justify-between p-4 sm:p-8 lg:p-14 z-10 overflow-hidden">
          
          {/* Background School Photography with Blue Overlay */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {/* Generated Photorealistic School in Manaus */}
            <img
              src="/src/assets/images/escola_municipal_manaus_hero_1792512716162.jpg"
              alt="Escola Municipal da Prefeitura de Manaus"
              className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.1] scale-105"
            />
            {/* Deep Oceanic Blue Gradient Mask */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, rgba(3, 44, 102, 0.94) 0%, rgba(2, 62, 138, 0.88) 50%, rgba(0, 31, 77, 0.96) 100%)'
              }}
            />

            {/* Faint School Sign on Building Wall matching image: "ESCOLA É O LUGAR ONDE O FUTURO COMEÇA" */}
            <div className="hidden md:block absolute top-[28%] right-[12%] text-right select-none opacity-40 font-bold tracking-widest text-blue-100 text-xs sm:text-sm max-w-[200px] leading-snug drop-shadow-md">
              <span className="block text-[10px] tracking-wider text-blue-200 uppercase mb-0.5">Escola</span>
              <span className="block text-xs uppercase">é o lugar</span>
              <span className="block text-xs uppercase">onde o futuro</span>
              <span className="block text-xs uppercase">começa</span>
            </div>

            {/* Bottom organic swoosh waves as seen in the mockup */}
            <svg
              className="absolute -bottom-1 -left-1 w-[120%] h-48 pointer-events-none opacity-90"
              viewBox="0 0 1200 240"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M-20 240 L-20 120 C180 80 340 180 560 130 C780 80 940 140 1220 70 L1220 240 Z"
                fill="#0b4ea2"
                fillOpacity="0.45"
              />
              <path
                d="M-20 240 L-20 160 C240 110 420 220 720 160 C980 100 1100 170 1220 120 L1220 240 Z"
                fill="#0077b6"
                fillOpacity="0.35"
              />
              <path
                d="M-20 240 L-20 190 C320 160 520 240 860 190 C1040 160 1150 200 1220 170 L1220 240 Z"
                fill="#03045e"
                fillOpacity="0.7"
              />
            </svg>
          </div>

          {/* Top Logo Zone */}
          <div className="relative z-10 pt-1">
            <ManausLogo variant="white" size="md" />
          </div>

          {/* Hero Main Content */}
          <div className="relative z-10 my-auto py-6 sm:py-10 lg:py-16 max-w-xl">
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white leading-[1.15] tracking-tight">
              <span className="font-normal block text-blue-100 text-2xl sm:text-3xl mb-1">
                Sistema Integrado de
              </span>
              <span className="block text-white drop-shadow-sm font-extrabold">
                Gestão Educacional
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-3 sm:mt-5 text-base sm:text-lg text-blue-100/90 font-light max-w-lg leading-relaxed">
              Mais organização, transparência e qualidade para a educação municipal.
            </p>

            {/* 4 Module Cards (Alunos, Servidores, Gestão Escolar, Relatórios) */}
            <div className="mt-6 sm:mt-10 lg:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
              
              {/* Card 1: Alunos */}
              <button
                type="button"
                onClick={() => setActiveModule('alunos')}
                className="group p-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/15 hover:border-white/40 transition-all duration-200 text-center flex flex-col items-center justify-center backdrop-blur-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-blue-200 group-hover:text-white group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-6 h-6 stroke-[1.8]" />
                </div>
                <span className="mt-2 text-xs sm:text-sm font-semibold text-white tracking-wide">
                  Alunos
                </span>
                <span className="text-[10px] text-blue-200/70 mt-0.5">Matrícula & Notas</span>
              </button>

              {/* Card 2: Servidores */}
              <button
                type="button"
                onClick={() => setActiveModule('servidores')}
                className="group p-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/15 hover:border-white/40 transition-all duration-200 text-center flex flex-col items-center justify-center backdrop-blur-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-blue-200 group-hover:text-white group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 stroke-[1.8]" />
                </div>
                <span className="mt-2 text-xs sm:text-sm font-semibold text-white tracking-wide">
                  Servidores
                </span>
                <span className="text-[10px] text-blue-200/70 mt-0.5">Lotação & Ponto</span>
              </button>

              {/* Card 3: Gestão Escolar */}
              <button
                type="button"
                onClick={() => setActiveModule('gestao')}
                className="group p-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/15 hover:border-white/40 transition-all duration-200 text-center flex flex-col items-center justify-center backdrop-blur-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-blue-200 group-hover:text-white group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6 stroke-[1.8]" />
                </div>
                <span className="mt-2 text-xs sm:text-sm font-semibold text-white tracking-wide whitespace-nowrap">
                  Gestão Escolar
                </span>
                <span className="text-[10px] text-blue-200/70 mt-0.5">Turmas & Merenda</span>
              </button>

              {/* Card 4: Relatórios */}
              <button
                type="button"
                onClick={() => setActiveModule('relatorios')}
                className="group p-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/15 hover:border-white/40 transition-all duration-200 text-center flex flex-col items-center justify-center backdrop-blur-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-blue-200 group-hover:text-white group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-6 h-6 stroke-[1.8]" />
                </div>
                <span className="mt-2 text-xs sm:text-sm font-semibold text-white tracking-wide">
                  Relatórios
                </span>
                <span className="text-[10px] text-blue-200/70 mt-0.5">IDEB & Indicadores</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION (Floating Login Card) - 5 cols on lg */}
        <div 
          className="relative lg:col-span-5 flex items-center justify-center p-4 sm:p-8 lg:p-12 z-20"
          style={{
            background: 'linear-gradient(to bottom, #f1f5f9, #e2e8f0)',
          }}
        >
          {/* Subtle soft backdrop element */}
          <div className="absolute inset-0 bg-radial from-white/80 via-transparent to-transparent pointer-events-none" />

          {/* THE EXACT RECREATION OF THE WHITE LOGIN CARD */}
          <div className="relative w-full max-w-[430px] bg-white rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_rgba(8,35,80,0.18)] border border-slate-100 p-5 sm:p-8 z-10">
            
            {/* Manaus Logo inside Card - using image_7044ae04.png */}
            <div className="flex flex-col items-center text-center">
              <ManausLogo variant="color" size="md" />
            </div>

            {/* Acesso ao Sistema Title with Blue Lock Icon */}
            <div className="mt-5 sm:mt-6 text-center">
              {/* Blue rounded Lock badge */}
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#0b4ea2] text-white shadow-md shadow-blue-900/20 mb-3">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  <path d="M12 17v-3" />
                  <path d="M10 15l2-2 2 2" />
                </svg>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-[#072d61] tracking-tight">
                Acesso ao Sistema
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Informe seus dados para continuar
              </p>
            </div>

            {/* Error message alert */}
            {errorMessage && (
              <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
                {errorMessage}
              </div>
            )}

            {/* The Form */}
            <form onSubmit={handleLoginSubmit} className="mt-6 space-y-4">
              
              {/* CPF Field */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">
                  CPF
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 text-slate-400 pointer-events-none">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    required
                    value={cpf}
                    onChange={handleCpfChange}
                    placeholder="000.000.000-00"
                    className="w-full pl-11 pr-4 py-3 text-sm bg-white rounded-xl border border-slate-300 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0b4ea2]/30 focus:border-[#0b4ea2] transition-all font-mono"
                  />
                </div>
              </div>

              {/* Senha Field */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Senha
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 text-slate-400 pointer-events-none">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Digite sua senha"
                    className="w-full pl-11 pr-11 py-3 text-sm bg-white rounded-xl border border-slate-300 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0b4ea2]/30 focus:border-[#0b4ea2] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-slate-400 hover:text-slate-600 p-1 focus:outline-none"
                    aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Primary Entrar Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3.5 px-6 rounded-xl font-bold text-white text-sm bg-[#0b4ea2] hover:bg-[#083e82] active:bg-[#063066] transition-colors shadow-md shadow-blue-900/20 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0b4ea2] focus:ring-offset-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Entrar</span>
                  </>
                )}
              </button>

              {/* Consultar Credenciais de Teste (17 Perfis) */}
              {/* Options */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setIsResetOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#0b4ea2] hover:underline cursor-pointer transition-colors"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Esqueci minha senha</span>
                </button>
              </div>

              {/* Hairline Separator */}
              <div className="border-t border-slate-200 my-4" />

              {/* Help & Support Footer */}
              <div className="flex items-center gap-3 pt-1">
                <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                  <Headphones className="w-4 h-4" />
                </div>
                <div className="text-left leading-tight">
                  <p className="text-xs font-bold text-slate-800">
                    Precisa de ajuda?
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSupportOpen(true)}
                    className="text-xs text-slate-500 hover:text-[#0b4ea2] hover:underline cursor-pointer text-left transition-colors"
                  >
                    Entre em contato com o suporte técnico.
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>

      </div>

      {/* BOTTOM BAR (Matches the exact dark navy bar with SEMED & LGPD info) */}
      <footer className="relative z-30 w-full bg-[#051833] text-blue-100/90 py-2.5 sm:py-3 px-4 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] sm:text-xs border-t border-blue-900/50">
        
        {/* Left Side: School icon + SEMED */}
        <div className="flex items-center justify-center gap-2 text-center">
          <Building2 className="w-4 h-4 text-blue-300 shrink-0" />
          <span className="font-semibold text-white text-center">
            SEMED - Secretaria Municipal de Educação
          </span>
          <span className="hidden md:inline text-blue-300/40">|</span>
          <span className="hidden md:inline italic text-blue-200/80">
            Educação é transformação.
          </span>
        </div>

        {/* Right Side: Shield + LGPD + Lock */}
        <div className="flex items-center gap-2 text-blue-200/90 text-center sm:text-right">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Ambiente seguro</span>
          <span className="text-blue-300/40">|</span>
          <span>LGPD</span>
          <Lock className="w-3.5 h-3.5 text-blue-300 ml-0.5" />
        </div>

      </footer>
    </div>
  );
};
