import React, { useState } from 'react';
import { Lock, KeyRound, CheckCircle2, ArrowRight, X, ShieldAlert } from 'lucide-react';

interface PasswordResetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PasswordResetModal: React.FC<PasswordResetModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [cpf, setCpf] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleCpfMask = (value: string) => {
    const raw = value.replace(/\D/g, '').slice(0, 11);
    let formatted = raw;
    if (raw.length > 9) {
      formatted = `${raw.slice(0, 3)}.${raw.slice(3, 6)}.${raw.slice(6, 9)}-${raw.slice(9)}`;
    } else if (raw.length > 6) {
      formatted = `${raw.slice(0, 3)}.${raw.slice(3, 6)}.${raw.slice(6)}`;
    } else if (raw.length > 3) {
      formatted = `${raw.slice(0, 3)}.${raw.slice(3)}`;
    }
    setCpf(formatted);
  };

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (cpf.replace(/\D/g, '').length < 11) {
      setErrorMsg('Por favor, informe um CPF válido com 11 dígitos.');
      return;
    }
    setErrorMsg('');
    setStep(2);
  };

  const handleStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length < 4) {
      setErrorMsg('Digite o código de 6 dígitos recebido.');
      return;
    }
    setErrorMsg('');
    setStep(3);
  };

  const handleStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setErrorMsg('A senha deve ter no mínimo 6 caracteres.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg('As senhas não coincidem.');
      return;
    }
    setErrorMsg('');
    setStep(4);
  };

  const handleComplete = () => {
    setStep(1);
    setCpf('');
    setCode('');
    setNewPassword('');
    setConfirmPassword('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0b4ea2] px-4 sm:px-6 py-3.5 sm:py-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 flex items-center justify-center text-blue-100 shrink-0">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Recuperar Senha</h3>
              <p className="text-[11px] sm:text-xs text-blue-200 mt-0.5">Sistema Integrado de Gestão Educacional</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress */}
        <div className="px-4 sm:px-6 pt-3 sm:pt-4 pb-2 border-b border-slate-100 flex items-center justify-between text-xs shrink-0">
          <span className={`font-semibold ${step >= 1 ? 'text-[#0b4ea2]' : 'text-slate-400'}`}>1. Identificação</span>
          <span className="text-slate-300">›</span>
          <span className={`font-semibold ${step >= 2 ? 'text-[#0b4ea2]' : 'text-slate-400'}`}>2. Código</span>
          <span className="text-slate-300">›</span>
          <span className={`font-semibold ${step >= 3 ? 'text-[#0b4ea2]' : 'text-slate-400'}`}>3. Nova Senha</span>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {errorMsg && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs text-rose-700">
              <ShieldAlert className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {step === 1 && (
            <form onSubmit={handleStep1} className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                Digite o seu CPF cadastrado na Secretaria Municipal de Educação (SEMED) para enviarmos as instruções de redefinição.
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">CPF do Servidor ou Responsável</label>
                <input
                  type="text"
                  required
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={(e) => handleCpfMask(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b4ea2]/30 focus:border-[#0b4ea2] font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#0b4ea2] hover:bg-[#093e80] text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Avançar para Verificação</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleStep2} className="space-y-4">
              <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-xs text-blue-900 leading-relaxed">
                Código de verificação enviado para o e-mail institucional do titular do CPF <strong>{cpf}</strong>.
                <div className="mt-1 font-mono text-[11px] text-blue-700">
                  (Para teste nesta demonstração, use o código: <strong>482910</strong>)
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Código de 6 dígitos</label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  placeholder="482910"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-center text-lg tracking-widest font-mono rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b4ea2]/30 focus:border-[#0b4ea2]"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-xl transition-colors"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 px-4 bg-[#0b4ea2] hover:bg-[#093e80] text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Validar Código</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleStep3} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nova Senha</label>
                <input
                  type="password"
                  required
                  placeholder="Mínimo 6 caracteres"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b4ea2]/30 focus:border-[#0b4ea2]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Confirmar Nova Senha</label>
                <input
                  type="password"
                  required
                  placeholder="Repita a nova senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b4ea2]/30 focus:border-[#0b4ea2]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#0b4ea2] hover:bg-[#093e80] text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Salvar Nova Senha</span>
              </button>
            </form>
          )}

          {step === 4 && (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">Senha atualizada com sucesso!</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Sua nova credencial foi sincronizada no sistema SIGED da Prefeitura de Manaus. Agora você pode entrar com sua nova senha.
                </p>
              </div>
              <button
                type="button"
                onClick={handleComplete}
                className="w-full py-2.5 px-4 bg-[#0b4ea2] hover:bg-[#093e80] text-white text-xs font-semibold rounded-xl transition-colors shadow-sm"
              >
                Ir para o Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
