import React, { useState, useRef } from 'react';
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
  Building2,
  Sparkles,
  X,
  CheckCircle2,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { ManausLogo } from './ManausLogo';
import { SupportModal } from './SupportModal';
import { PasswordResetModal } from './PasswordResetModal';
import { ModulePreviewModal, ModuleType } from './ModulePreviewModal';
import { UserProfile } from '../types';
import { RBAC_PROFILES, validateCredentials, ProfileDefinition } from '../config/rbacProfiles';

interface LoginScreenProps {
  onLogin: (user: UserProfile) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [rememberUser, setRememberUser] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 2FA Security State (Art. 5 & 10: Obrigatório para Gestor e Assessor Técnico)
  const [twoFactorPending, setTwoFactorPending] = useState<ProfileDefinition | null>(null);
  const [twoFactorCode, setTwoFactorCode] = useState('582914');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLockedOut, setIsLockedOut] = useState(false);

  // Modals state
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [isFirstAccessOpen, setIsFirstAccessOpen] = useState(false);
  const [activeModule, setActiveModule] = useState<ModuleType | null>(null);
  const [showProfileDrawer, setShowProfileDrawer] = useState(false);

  // First access state
  const [firstAccessCpf, setFirstAccessCpf] = useState('');
  const [firstAccessMatricula, setFirstAccessMatricula] = useState('');
  const [firstAccessSent, setFirstAccessSent] = useState(false);

  const cpfInputRef = useRef<HTMLInputElement>(null);
  const senhaInputRef = useRef<HTMLInputElement>(null);

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

  const completeLogin = (p: ProfileDefinition) => {
    onLogin({
      name: p.sampleUser.name,
      cpf: p.sampleUser.cpf,
      role: p.id,
      roleTitle: p.sampleUser.roleTitle,
      school: p.sampleUser.school || 'E.M. Antonina Borges de Sá',
      ddz: p.sampleUser.ddz,
      email: p.sampleUser.email,
    });
  };

  const handleQuickLogin = (p: ProfileDefinition) => {
    setCpf(p.sampleUser.cpf);
    setSenha(p.sampleUser.password);
    setShowProfileDrawer(false);
    
    // Auto-login with 2FA check
    if (p.id === 'gestor' || p.id === 'assessor-tecnico') {
      setTwoFactorPending(p);
    } else {
      completeLogin(p);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLockedOut) {
      setErrorMessage('Acesso bloqueado por 10 minutos após 10 tentativas incorretas (Regra de Segurança do SIGEON).');
      return;
    }

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
        const nextAttempts = failedAttempts + 1;
        setFailedAttempts(nextAttempts);

        if (nextAttempts >= 10) {
          setIsLockedOut(true);
          setErrorMessage('Conta temporariamente bloqueada por 10 minutos após 10 tentativas incorretas (Seção 5 da Documentação).');
          return;
        }

        if (validation.error === 'CPF_NOT_FOUND') {
          setErrorMessage('CPF NÃO ENCONTRADO. CONTATE A SECRETARIA DA SUA UNIDADE DE ENSINO.');
        } else if (validation.error === 'INVALID_PASSWORD') {
          setErrorMessage(`Senha incorreta. Tentativa ${nextAttempts} de 10 antes do bloqueio temporário.`);
        } else {
          setErrorMessage('Por favor, informe seu CPF e sua senha de acesso.');
        }
        return;
      }

      // Reset attempts on valid credentials
      setFailedAttempts(0);
      const p = validation.profile;

      // PDF Seção 5 & 10: 2FA obrigatório para Gestor(a) e Assessor Técnico
      if (p.id === 'gestor' || p.id === 'assessor-tecnico') {
        setTwoFactorPending(p);
        return;
      }

      completeLogin(p);
    }, 450);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-[#022b64] selection:bg-blue-500 selection:text-white font-sans">
      {/* Modals */}
      <SupportModal isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />
      <PasswordResetModal isOpen={isResetOpen} onClose={() => setIsResetOpen(false)} />
      <ModulePreviewModal
        module={activeModule}
        onClose={() => setActiveModule(null)}
      />

      {/* Primeiro Acesso Modal */}
      {isFirstAccessOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-100 text-left relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => {
                setIsFirstAccessOpen(false);
                setFirstAccessSent(false);
              }}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!firstAccessSent ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setFirstAccessSent(true);
                }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0b4ea2] flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Primeiro Acesso ao SIGEON
                    </h3>
                    <p className="text-xs text-slate-500">
                      Ativação cadastral de servidores e docentes da SEMED
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">
                  Informe seu CPF institucional e matrícula funcional. As instruções para primeiro acesso e criação de senha pessoal serão encaminhadas para o e-mail institucional cadastrado.
                </p>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    CPF Institucional *
                  </label>
                  <input
                    type="text"
                    required
                    value={firstAccessCpf}
                    onChange={(e) => setFirstAccessCpf(e.target.value)}
                    placeholder="000.000.000-00"
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg p-2.5 outline-none focus:border-[#0b4ea2] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Matrícula SEMED *
                  </label>
                  <input
                    type="text"
                    required
                    value={firstAccessMatricula}
                    onChange={(e) => setFirstAccessMatricula(e.target.value)}
                    placeholder="Ex: 142.890-1"
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg p-2.5 outline-none focus:border-[#0b4ea2] focus:bg-white"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsFirstAccessOpen(false)}
                    className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 px-4 bg-[#0b4ea2] hover:bg-[#083e82] text-white text-xs font-bold rounded-lg cursor-pointer"
                  >
                    Solicitar Ativação
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-4 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900">
                  Solicitação Enviada com Sucesso
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  As instruções de primeiro acesso e link de validação foram enviadas para o e-mail institucional associado ao CPF informado.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsFirstAccessOpen(false);
                    setFirstAccessSent(false);
                  }}
                  className="w-full py-2.5 bg-[#0b4ea2] text-white text-xs font-semibold rounded-lg cursor-pointer mt-2"
                >
                  Voltar ao Login
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2FA Mandatory Modal (Gestor & Assessor Técnico - Art. 5 do SIGEON) */}
      {twoFactorPending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0b4ea2] flex items-center justify-center mx-auto border border-blue-200 shadow-xs">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-[#0b4ea2] text-[10px] font-bold uppercase tracking-wider">
                2FA Obrigatório · Regra Oficial SEMED
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-2">
                Autenticação em Duas Etapas
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Perfil de alta autoridade funcional detectado: <strong>{twoFactorPending.name}</strong>. Conforme a Seção 5 e 10 do regulamento do SIGEON, confirme o token enviado.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left space-y-2">
              <label className="block text-xs font-semibold text-slate-700">
                Código de Verificação (6 dígitos)
              </label>
              <input
                type="text"
                maxLength={6}
                value={twoFactorCode}
                onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="w-full text-center tracking-[0.35em] font-mono text-2xl font-black py-2.5 px-4 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0b4ea2]"
                placeholder="582914"
              />
              <span className="text-[11px] text-slate-400 block text-center">
                Canal seguro: {twoFactorPending.sampleUser.email}
              </span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setTwoFactorPending(null)}
                className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => completeLogin(twoFactorPending)}
                className="flex-1 py-2.5 px-4 bg-[#0b4ea2] hover:bg-[#093e80] text-white text-xs font-bold rounded-xl transition-colors shadow-xs cursor-pointer"
              >
                Confirmar Acesso
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="relative flex-1 w-full grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-48px)]">
        
        {/* LEFT SECTION (Hero & SEMED Brand) - 7 cols on lg */}
        <div className="relative lg:col-span-7 flex flex-col justify-between p-6 sm:p-10 lg:p-14 z-10 overflow-hidden">
          
          {/* Background School Photography with Blue Overlay */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {/* Photorealistic School in Manaus */}
            <img
              src="/src/assets/images/escola_municipal_manaus_hero_1792512716162.jpg"
              alt="Escola Municipal da Prefeitura de Manaus"
              className="w-full h-full object-cover object-center filter brightness-[0.42] contrast-[1.12] scale-105"
            />
            {/* Deep Oceanic Blue Gradient Mask */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, rgba(2, 43, 100, 0.94) 0%, rgba(3, 57, 125, 0.88) 50%, rgba(1, 26, 64, 0.96) 100%)'
              }}
            />

            {/* School Sign on Building Wall matching image: "ESCOLA É O LUGAR ONDE O FUTURO COMEÇA" */}
            <div className="hidden md:block absolute top-[28%] right-[10%] text-right select-none opacity-40 font-bold tracking-widest text-blue-100 text-xs sm:text-sm max-w-[220px] leading-snug drop-shadow-md">
              <span className="block text-[10px] tracking-wider text-blue-200 uppercase mb-0.5">Escola</span>
              <span className="block text-xs uppercase">é o lugar</span>
              <span className="block text-xs uppercase">onde o futuro</span>
              <span className="block text-xs uppercase">começa</span>
            </div>

            {/* Bottom organic swoosh waves */}
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
          <div className="relative z-10 pt-1 flex flex-wrap items-center gap-4">
            <ManausLogo variant="white" size="md" />
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white text-xs font-medium tracking-wide">
              <span>✪</span>
              <span>ESCOLA É O LUGAR ONDE O FUTURO COMEÇA</span>
            </div>
          </div>

          {/* Hero Main Content */}
          <div className="relative z-10 my-auto py-6 sm:py-10 lg:py-14 max-w-xl">
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
              Mais organização, transparência e qualidade para a educação municipal em conformidade com as diretrizes do MEC e FUNDEB.
            </p>

            {/* 4 Module Cards (Alunos, Servidores, Gestão Escolar, Relatórios) */}
            <div className="mt-6 sm:mt-10 lg:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5">
              
              {/* Card 1: Alunos */}
              <button
                type="button"
                onClick={() => setActiveModule('alunos')}
                className="group p-3.5 sm:p-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/15 hover:border-white/40 transition-all duration-200 text-center flex flex-col items-center justify-center backdrop-blur-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-blue-200 group-hover:text-white group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-6 h-6 stroke-[1.8]" />
                </div>
                <span className="mt-2 text-xs sm:text-sm font-semibold text-white tracking-wide">
                  Alunos
                </span>
                <span className="text-[10px] text-blue-200/70 mt-0.5 leading-tight">Matrícula & Histórico</span>
              </button>

              {/* Card 2: Servidores */}
              <button
                type="button"
                onClick={() => setActiveModule('servidores')}
                className="group p-3.5 sm:p-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/15 hover:border-white/40 transition-all duration-200 text-center flex flex-col items-center justify-center backdrop-blur-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-blue-200 group-hover:text-white group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 stroke-[1.8]" />
                </div>
                <span className="mt-2 text-xs sm:text-sm font-semibold text-white tracking-wide">
                  Servidores
                </span>
                <span className="text-[10px] text-blue-200/70 mt-0.5 leading-tight">Lotação & Vínculos</span>
              </button>

              {/* Card 3: Gestão Escolar */}
              <button
                type="button"
                onClick={() => setActiveModule('gestao')}
                className="group p-3.5 sm:p-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/15 hover:border-white/40 transition-all duration-200 text-center flex flex-col items-center justify-center backdrop-blur-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-blue-200 group-hover:text-white group-hover:scale-110 transition-transform">
                  <Building2 className="w-6 h-6 stroke-[1.8]" />
                </div>
                <span className="mt-2 text-xs sm:text-sm font-semibold text-white tracking-wide whitespace-nowrap">
                  Gestão Escolar
                </span>
                <span className="text-[10px] text-blue-200/70 mt-0.5 leading-tight">Turmas & Merenda</span>
              </button>

              {/* Card 4: Relatórios */}
              <button
                type="button"
                onClick={() => setActiveModule('relatorios')}
                className="group p-3.5 sm:p-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/15 hover:border-white/40 transition-all duration-200 text-center flex flex-col items-center justify-center backdrop-blur-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-blue-200 group-hover:text-white group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-6 h-6 stroke-[1.8]" />
                </div>
                <span className="mt-2 text-xs sm:text-sm font-semibold text-white tracking-wide">
                  Relatórios
                </span>
                <span className="text-[10px] text-blue-200/70 mt-0.5 leading-tight">IDEB & Indicadores</span>
              </button>
            </div>
          </div>

          {/* Bottom helper trigger for 17 RBAC profiles */}
          <div className="relative z-10 pt-3 flex items-center justify-between text-xs text-blue-200/80 border-t border-white/10">
            <span>Acesso institucional seguro SEMED</span>
            <button
              type="button"
              onClick={() => setShowProfileDrawer(!showProfileDrawer)}
              className="text-xs text-blue-200 hover:text-white underline cursor-pointer transition-colors"
            >
              Testar com os 17 Perfis RBAC
            </button>
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

          {/* THE EXACT RECREATION OF THE WHITE LOGIN CARD WITH ALL FIXES */}
          <div className="relative w-full max-w-[420px] bg-white rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_rgba(8,35,80,0.16)] border border-slate-100 p-6 sm:p-8 z-10">
            
            {/* SIGEON Logo inside Card - Calibrated size */}
            <div className="flex flex-col items-center text-center">
              <ManausLogo variant="color" size="md" />
            </div>

            {/* Acesso ao Sistema Title with Blue Lock Icon */}
            <div className="mt-4 sm:mt-5 text-center">
              {/* Blue rounded Lock badge */}
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#0b4ea2] text-white shadow-md shadow-blue-900/20 mb-2.5">
                <Lock className="w-5 h-5 stroke-[2.2]" />
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-[#072d61] tracking-tight">
                Acesso ao Sistema
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Informe seus dados institucionais para continuar
              </p>
            </div>

            {/* Error message alert */}
            {errorMessage && (
              <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 text-left flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span className="flex-1">{errorMessage}</span>
                <button
                  type="button"
                  onClick={() => setErrorMessage('')}
                  className="text-rose-500 hover:text-rose-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* The Form */}
            <form onSubmit={handleLoginSubmit} className="mt-5 space-y-3.5">
              
              {/* CPF Field - Unified Container with Full Click Area & Focus */}
              <label 
                htmlFor="login-cpf"
                onClick={() => cpfInputRef.current?.focus()}
                className="group relative flex items-center gap-3.5 px-4 py-2.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 focus-within:border-[#0b4ea2] focus-within:ring-2 focus-within:ring-[#0b4ea2]/20 transition-all shadow-2xs cursor-text block text-left"
              >
                <div className="text-slate-400 group-focus-within:text-[#0b4ea2] transition-colors shrink-0">
                  <User className="w-5 h-5 stroke-[1.8]" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <span className="block text-[11px] font-semibold text-slate-500 leading-tight select-none">
                    CPF <span className="text-red-500">*</span>
                  </span>
                  <input
                    ref={cpfInputRef}
                    id="login-cpf"
                    type="text"
                    inputMode="numeric"
                    autoComplete="username"
                    required
                    value={cpf}
                    onChange={handleCpfChange}
                    placeholder="000.000.000-00"
                    className="w-full text-sm text-slate-800 placeholder:text-slate-400 bg-transparent border-0 p-0 focus:outline-none focus:ring-0 leading-normal font-medium"
                  />
                </div>
              </label>

              {/* Senha Field - Unified Container with Full Click Area & Focus */}
              <label 
                htmlFor="login-senha"
                onClick={() => senhaInputRef.current?.focus()}
                className="group relative flex items-center gap-3.5 px-4 py-2.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 focus-within:border-[#0b4ea2] focus-within:ring-2 focus-within:ring-[#0b4ea2]/20 transition-all shadow-2xs cursor-text block text-left"
              >
                <div className="text-slate-400 group-focus-within:text-[#0b4ea2] transition-colors shrink-0">
                  <Lock className="w-5 h-5 stroke-[1.8]" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <span className="block text-[11px] font-semibold text-slate-500 leading-tight select-none">
                    Senha <span className="text-red-500">*</span>
                  </span>
                  <input
                    ref={senhaInputRef}
                    id="login-senha"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Digite sua senha"
                    className="w-full text-sm text-slate-800 placeholder:text-slate-400 bg-transparent border-0 p-0 focus:outline-none focus:ring-0 leading-normal font-medium"
                  />
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowPassword(!showPassword);
                  }}
                  className="text-slate-400 hover:text-slate-600 p-1 focus:outline-none cursor-pointer shrink-0"
                  aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </label>

              {/* Lembrar meu usuário Checkbox */}
              <div className="flex items-center gap-2 pt-0.5 text-left">
                <input
                  type="checkbox"
                  id="remember-user"
                  checked={rememberUser}
                  onChange={(e) => setRememberUser(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[#0b4ea2] focus:ring-[#0b4ea2] cursor-pointer"
                />
                <label htmlFor="remember-user" className="text-xs text-slate-600 select-none cursor-pointer">
                  Lembrar meu usuário
                </label>
              </div>

              {/* Primary Entrar Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 px-6 rounded-xl font-bold text-white text-sm bg-[#0b4ea2] hover:bg-[#083e82] active:bg-[#063066] transition-colors shadow-md shadow-blue-900/20 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0b4ea2] focus:ring-offset-2"
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

              {/* Links: Esqueci minha senha & Primeiro acesso */}
              <div className="pt-2 flex items-center justify-between text-xs px-1">
                <button
                  type="button"
                  onClick={() => setIsResetOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0b4ea2] hover:underline cursor-pointer transition-colors"
                >
                  <Lock className="w-3.5 h-3.5 text-[#0b4ea2]" />
                  <span>Esqueci minha senha</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsFirstAccessOpen(true)}
                  className="text-xs text-slate-600 hover:text-[#0b4ea2] hover:underline cursor-pointer transition-colors"
                >
                  Primeiro acesso
                </button>
              </div>

              {/* Hairline Separator */}
              <div className="border-t border-slate-200 my-3.5" />

              {/* Help & Support Footer */}
              <div className="flex items-center gap-3 pt-0.5">
                <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                  <Headphones className="w-4 h-4 text-[#0b4ea2]" />
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

              {/* Security Legal Disclaimer */}
              <p className="text-[10px] text-slate-400 text-center leading-tight mt-3 px-1">
                É proibido o compartilhamento de senhas. Cada usuário responde individualmente pelos atos registrados em sua conta.
              </p>

            </form>
          </div>
        </div>

      </div>

      {/* 17 RBAC Profiles Drawer for rapid testing */}
      {showProfileDrawer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Perfis Institucionais de Acesso (17 Perfis SEMED)
                </h3>
                <p className="text-xs text-slate-500">
                  Selecione qualquer cargo para preencher e validar credenciais automaticamente
                </p>
              </div>
              <button
                onClick={() => setShowProfileDrawer(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto py-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {RBAC_PROFILES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleQuickLogin(p)}
                  className="p-3 rounded-xl border border-slate-200 hover:border-[#0b4ea2] hover:bg-blue-50/50 transition-all text-left flex items-start justify-between group cursor-pointer"
                >
                  <div>
                    <span className="text-xs font-bold text-slate-900 block group-hover:text-[#0b4ea2]">
                      {p.name}
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      {p.sampleUser.name}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 block mt-1">
                      CPF: {p.sampleUser.cpf} · Senha: {p.sampleUser.password}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0b4ea2] shrink-0 mt-1" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* BOTTOM BAR (Matches the exact dark navy bar with SEMED & LGPD info) */}
      <footer className="relative z-30 w-full bg-[#051833] text-blue-100/90 py-2.5 sm:py-3 px-4 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] sm:text-xs border-t border-blue-900/50">
        
        {/* Left Side: School icon + SEMED */}
        <div className="flex items-center justify-center gap-2 text-center">
          <Building2 className="w-4 h-4 text-blue-300 shrink-0" />
          <span className="font-semibold text-white text-center">
            SEMED — Secretaria Municipal de Educação
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
          <span className="text-blue-300/40">|</span>
          <span>SIGEON v1.2</span>
        </div>

      </footer>
    </div>
  );
};
