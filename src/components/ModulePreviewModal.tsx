import React from 'react';
import { GraduationCap, Users, FileText, BarChart3, X, Check, Lock } from 'lucide-react';

export type ModuleType = 'alunos' | 'servidores' | 'gestao' | 'relatorios';

interface ModulePreviewModalProps {
  module: ModuleType | null;
  onClose: () => void;
}

export const ModulePreviewModal: React.FC<ModulePreviewModalProps> = ({
  module,
  onClose,
}) => {
  if (!module) return null;

  const data = {
    alunos: {
      title: 'Vida Escolar',
      icon: GraduationCap,
      color: 'bg-sky-600',
      description: 'Gestão completa da trajetória escolar dos estudantes da Rede Municipal de Ensino de Manaus.',
      highlights: [
        'Matrícula e Rematrícula online unificada no município',
        'Boletim escolar digital com notas bimestrais e médias',
        'Registro diário de frequência e alerta de infrequência escolar',
        'Histórico escolar e expedição de transferências com assinatura digital',
        'Acompanhamento de programas sociais e cartão estudante Manaus',
      ],
      authorizedRole: 'Professor(a) Regente ou Gestor(a)',
    },
    servidores: {
      title: 'Gestão de Pessoas',
      icon: Users,
      color: 'bg-indigo-600',
      description: 'Administração de pessoal, corpo docente e equipe técnica da Secretaria Municipal de Educação.',
      highlights: [
        'Lotação por Divisão Distrital Zonal (DDZ Leste, Norte, Sul, Oeste e Rural)',
        'Quadro de horários e distribuição de disciplinas em sala de aula',
        'Controle de frequência e folha de ponto digital dos servidores',
        'Progressão na carreira, cursos de formação continuada e capacitações',
        'Substituições docentes e registro de licenças',
      ],
      authorizedRole: 'Secretário(a) Escolar ou Gestor(a)',
    },
    gestao: {
      title: 'Organização Escolar',
      icon: FileText,
      color: 'bg-blue-600',
      description: 'Ferramentas de governança escolar para diretores, pedagogos e secretários de Manaus.',
      highlights: [
        'Organização de turmas (Educação Infantil, Ensino Fundamental I e II, EJA)',
        'Diário de classe eletrônico com planejamento pedagógico integrado',
        'Gestão da Merenda Escolar SEMED com produtos regionais amazônicos',
        'Transporte escolar rodoviário e fluvial (lanchas para comunidades ribeirinhas)',
        'Inventário de patrimônio, salas climatizadas e laboratórios de informática',
      ],
      authorizedRole: 'Gestor(a) Escolar / Diretora',
    },
    relatorios: {
      title: 'Relatórios e Indicadores',
      icon: BarChart3,
      color: 'bg-emerald-600',
      description: 'Painel analítico e transparência de dados educacionais da Prefeitura de Manaus.',
      highlights: [
        'Monitoramento do IDEB e índices de alfabetização municipal',
        'Censo Escolar anual sincronizado com dados do MEC/INEP',
        'Taxas de aprovação, reprovação e evasão escolar por zona da cidade',
        'Estatísticas de vagas e demanda por bairros de Manaus',
        'Relatórios gerenciais para prestação de contas do Fundeb e PNAE',
      ],
      authorizedRole: 'Auditor(a) ou Assessor(a) Técnico',
    },
  }[module];

  const Icon = data.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`${data.color} px-4 sm:px-6 py-3.5 sm:py-5 text-white flex items-center justify-between shrink-0`}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0">
              <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg leading-tight">{data.title}</h3>
              <p className="text-[11px] sm:text-xs text-white/80">Sistema Integrado de Gestão Educacional</p>
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

        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 sm:space-y-5">
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {data.description}
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 sm:p-4 space-y-2.5">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Principais Funcionalidades</h4>
            <ul className="space-y-2">
              {data.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Access Requirement Notice */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-800">
              <Lock className="w-4 h-4 text-[#0b4ea2] shrink-0" />
              <span>Acesso Restrito: Autenticação Obrigatória</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              O acesso a este bloco ({data.authorizedRole}) exige autenticação individual com CPF e senha de acesso no formulário de login do sistema.
            </p>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0b4ea2] hover:bg-[#093e80] rounded-xl transition-colors cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
