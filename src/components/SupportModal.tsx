import React, { useState } from 'react';
import { Headphones, Phone, Mail, Clock, MapPin, X, CheckCircle2, MessageSquare, Send } from 'lucide-react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
  const [ticketSent, setTicketSent] = useState(false);
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [escola, setEscola] = useState('');
  const [mensagem, setMensagem] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketSent(true);
    setTimeout(() => {
      // Auto reset after 3s
      setNome('');
      setCpf('');
      setEscola('');
      setMensagem('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0b4ea2] px-4 sm:px-6 py-3.5 sm:py-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 flex items-center justify-center text-blue-100 shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg leading-tight">Central de Suporte SEMED</h3>
              <p className="text-[11px] sm:text-xs text-blue-200 mt-0.5">Secretaria Municipal de Educação de Manaus</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5 sm:space-y-6">
          {/* Quick Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 bg-blue-50/70 border border-blue-100 rounded-xl flex items-start gap-3">
              <Phone className="w-5 h-5 text-[#0b4ea2] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Telefone Oficial</p>
                <p className="text-sm font-bold text-slate-800">(92) 3632-2250</p>
                <p className="text-xs text-slate-600">0800 092 0156 (Gratuito)</p>
              </div>
            </div>

            <div className="p-3.5 bg-emerald-50/70 border border-emerald-100 rounded-xl flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">WhatsApp SEMED</p>
                <p className="text-sm font-bold text-slate-800">(92) 98842-1200</p>
                <p className="text-xs text-slate-600">Atendimento ao Servidor</p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
              <Mail className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">E-mail do SIGED</p>
                <p className="text-xs font-bold text-slate-800 break-all">suporte.siged@semed.manaus.am.gov.br</p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
              <Clock className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Horário de Atendimento</p>
                <p className="text-xs font-bold text-slate-800">08:00 às 17:00 (AMT)</p>
                <p className="text-xs text-slate-500">Segunda a Sexta-feira</p>
              </div>
            </div>
          </div>

          {/* Location info */}
          <div className="flex items-center gap-2.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
            <MapPin className="w-4 h-4 text-[#0b4ea2] shrink-0" />
            <span>Sede SEMED: Av. Mário Ypiranga Monteiro, 2540 - Adrianópolis, Manaus - AM</span>
          </div>

          {/* Quick Ticket Form */}
          <div className="border-t border-slate-200 pt-5">
            <h4 className="font-semibold text-slate-800 text-sm mb-3">Abrir Chamado de Acesso ou Dúvida</h4>
            
            {ticketSent ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="font-bold text-emerald-900 text-sm">Chamado registrado com sucesso!</p>
                <p className="text-xs text-emerald-700">
                  Protocolo #{Math.floor(100000 + Math.random() * 900000)}. Nossa equipe técnica da SEMED responderá via e-mail institucional em até 4 horas úteis.
                </p>
                <button
                  type="button"
                  onClick={() => setTicketSent(false)}
                  className="mt-2 text-xs font-semibold text-emerald-800 underline hover:text-emerald-900"
                >
                  Enviar outro chamado
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Nome completo</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Maria Pereira Silva"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b4ea2]/30 focus:border-[#0b4ea2]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">CPF ou Matrícula</label>
                    <input
                      type="text"
                      required
                      placeholder="000.000.000-00"
                      value={cpf}
                      onChange={(e) => setCpf(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b4ea2]/30 focus:border-[#0b4ea2]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Unidade Escolar / DDZ</label>
                  <input
                    type="text"
                    placeholder="Ex: EMEF Darcy Ribeiro / DDZ Leste"
                    value={escola}
                    onChange={(e) => setEscola(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b4ea2]/30 focus:border-[#0b4ea2]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Descreva a solicitação ou erro</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Ex: Não consigo acessar a turma do 5º ano A, ou recebo mensagem de credencial bloqueada..."
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b4ea2]/30 focus:border-[#0b4ea2]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#0b4ea2] hover:bg-[#093e80] rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Enviar Chamado
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
