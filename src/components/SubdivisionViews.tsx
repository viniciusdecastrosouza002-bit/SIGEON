import React, { useState } from 'react';
import { 
  Users, 
  GraduationCap, 
  FileText, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Plus, 
  Search, 
  Download, 
  Printer, 
  Layers, 
  School, 
  Calendar, 
  BookOpen, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  FileCheck, 
  QrCode, 
  Lock,
  X,
  AlertCircle
} from 'lucide-react';
import { Student, Teacher, SchoolClass } from '../types';

// ============================================================================
// 1. VIDA ESCOLAR SUBDIVISIONS (M1)
// ============================================================================
interface VidaEscolarSubProps {
  subdivisionId: string;
  students: Student[];
  onOpenManageStudent: (student: Student) => void;
  selectedSchool: string;
}

export const VidaEscolarSubdivisions: React.FC<VidaEscolarSubProps> = ({
  subdivisionId,
  students,
  onOpenManageStudent,
  selectedSchool,
}) => {
  const [search, setSearch] = useState('');
  const [modalItem, setModalItem] = useState<any>(null);

  // 1.2 Cadastro de Responsáveis
  if (subdivisionId === 'cadastro-responsaveis') {
    const responsaveis = [
      { id: 'R1', nome: 'SANDRA REGINA LIMA', parentesco: 'Mãe', aluno: 'ARTHUR GABRIEL SOUZA LIMA', matricula: '1042109-4', turma: '5º Ano A', cpf: '710.239.112-04', telefone: '(92) 99120-4411', bairro: 'Coroado', autorizacaoSaida: true },
      { id: 'R2', nome: 'JOÃO CARLOS RIBEIRO', parentesco: 'Pai', aluno: 'BEATRIZ VASCONCELOS RIBEIRO', matricula: '1048932-1', turma: '5º Ano A', cpf: '482.901.332-90', telefone: '(92) 98450-2219', bairro: 'São José Operário', autorizacaoSaida: true },
      { id: 'R3', nome: 'PATRÍCIA MENDES', parentesco: 'Mãe', aluno: 'CAUÃ HENRIQUE DA SILVA MENDES', matricula: '2110245-8', turma: '4º Ano B', cpf: '592.110.843-15', telefone: '(92) 99412-9901', bairro: 'Zumbi dos Palmares', autorizacaoSaida: false },
      { id: 'R4', nome: 'RENATO CARVALHO', parentesco: 'Pai', aluno: 'DANIELE CRISTINA CARVALHO', matricula: '1031587-2', turma: '5º Ano B', cpf: '341.229.004-81', telefone: '(92) 98110-3344', bairro: 'Armando Mendes', autorizacaoSaida: true },
      { id: 'R5', nome: 'LUCIANA CASTRO', parentesco: 'Mãe', aluno: 'ENZO GABRIEL CASTRO NUNES', matricula: '3072210-9', turma: '3º Ano A', cpf: '819.330.129-50', telefone: '(92) 99230-8811', bairro: 'Coroado', autorizacaoSaida: true },
      { id: 'R6', nome: 'MARCOS PINHEIRO', parentesco: 'Pai', aluno: 'FERNANDA VITÓRIA PINHEIRO', matricula: '1089412-3', turma: '6º Ano A', cpf: '230.119.442-83', telefone: '(92) 98820-9944', bairro: 'Aleixo', autorizacaoSaida: true },
    ].filter(r => r.nome.toLowerCase().includes(search.toLowerCase()) || r.aluno.toLowerCase().includes(search.toLowerCase()));

    return (
      <div className="space-y-4 animate-in fade-in">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Buscar responsável ou aluno..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#0b4ea2]"
            />
          </div>
          <button
            type="button"
            onClick={() => alert('Formulário de cadastro de novo responsável vinculado.')}
            className="px-4 py-2 bg-[#0b4ea2] hover:bg-[#093e80] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Novo Responsável</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-xs min-w-[760px]">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[11px] font-semibold">
                <tr>
                  <th className="py-3 px-4">Responsável Legal</th>
                  <th className="py-3 px-4">Estudante Vinculado</th>
                  <th className="py-3 px-4">Turma</th>
                  <th className="py-3 px-4">Telefone / WhatsApp</th>
                  <th className="py-3 px-4">Bairro (Manaus)</th>
                  <th className="py-3 px-4 text-center">Retirada Autorizada</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {responsaveis.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/70">
                    <td className="py-3 px-4">
                      <span className="font-bold text-slate-900 block">{r.nome}</span>
                      <span className="text-[10px] text-slate-400 font-mono">CPF: {r.cpf} · {r.parentesco}</span>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-800">{r.aluno}</td>
                    <td className="py-3 px-4 font-semibold text-[#0b4ea2]">{r.turma}</td>
                    <td className="py-3 px-4 font-mono text-slate-700">{r.telefone}</td>
                    <td className="py-3 px-4 text-slate-600">{r.bairro}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        r.autorizacaoSaida 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {r.autorizacaoSaida ? 'Sim (Portaria)' : 'Somente com Aviso'}
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
  }

  // 1.3 Matrículas
  if (subdivisionId === 'matriculas') {
    return (
      <div className="space-y-6 animate-in fade-in">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-xs font-semibold text-slate-500 uppercase">Capacidade Homologada</p>
            <p className="text-2xl font-black text-slate-900 font-mono mt-1">1.240 vagas</p>
            <p className="text-[11px] text-emerald-600 font-medium mt-0.5">100% preenchimento</p>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-xs font-semibold text-slate-500 uppercase">Matrículas Confirmadas</p>
            <p className="text-2xl font-black text-[#0b4ea2] font-mono mt-1">1.232</p>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">8 em análise documental</p>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-xs font-semibold text-slate-500 uppercase">Lista de Espera Municipal</p>
            <p className="text-2xl font-black text-amber-600 font-mono mt-1">7 estudantes</p>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">Prioridade georreferenciada</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Quadro de Oferta de Matrículas 2026</h3>
              <p className="text-xs text-slate-500">Unidade: {selectedSchool}</p>
            </div>
            <button
              type="button"
              onClick={() => alert('Iniciando fluxo de nova matrícula escolar online da SEMED.')}
              className="px-4 py-2 bg-[#0b4ea2] hover:bg-[#093e80] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Realizar Nova Matrícula</span>
            </button>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {[
              { etapa: '1º Ano do Ensino Fundamental', vagas: 120, matriculados: 120, turno: 'Matutino & Vespertino' },
              { etapa: '2º Ano do Ensino Fundamental', vagas: 150, matriculados: 150, turno: 'Matutino & Vespertino' },
              { etapa: '3º Ano do Ensino Fundamental', vagas: 180, matriculados: 175, turno: 'Matutino & Vespertino' },
              { etapa: '4º Ano do Ensino Fundamental', vagas: 210, matriculados: 202, turno: 'Matutino & Vespertino' },
              { etapa: '5º Ano do Ensino Fundamental', vagas: 240, matriculados: 238, turno: 'Matutino & Vespertino' },
            ].map((m, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block">{m.etapa}</span>
                  <span className="text-[11px] text-slate-500">{m.turno}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono font-bold text-slate-700">{m.matriculados} / {m.vagas} vagas</span>
                  <span className="text-emerald-700 font-semibold text-[10px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {m.vagas - m.matriculados === 0 ? 'Turma Lotada' : `${m.vagas - m.matriculados} vagas restantes`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 1.4 Enturmação
  if (subdivisionId === 'enturmacao') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4 animate-in fade-in">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Enturmação e Alocação em Turmas</h3>
            <p className="text-xs text-slate-500">Distribuição automatizada de estudantes por critérios pedagógicos e de turno</p>
          </div>
          <button
            type="button"
            onClick={() => alert('Processamento de enturmação em lote concluído.')}
            className="px-4 py-2 bg-[#0b4ea2] hover:bg-[#093e80] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Enturmar Estudantes Pendentes</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { turma: '5º Ano A', turno: 'Matutino', sala: 'Bloco B - Sala 104', alunos: 32, max: 35, regente: 'Prof. Carlos Eduardo' },
            { turma: '5º Ano B', turno: 'Matutino', sala: 'Bloco B - Sala 105', alunos: 30, max: 35, regente: 'Profa. Danielle Prado' },
            { turma: '4º Ano A', turno: 'Matutino', sala: 'Bloco A - Sala 102', alunos: 28, max: 32, regente: 'Profa. Silvia Helena' },
            { turma: '4º Ano B', turno: 'Vespertino', sala: 'Bloco A - Sala 103', alunos: 29, max: 32, regente: 'Prof. Márcio Tavares' },
            { turma: '6º Ano A', turno: 'Vespertino', sala: 'Bloco C - Sala 201', alunos: 34, max: 36, regente: 'Profa. Juliana Cunha' },
          ].map((t, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900 text-sm">{t.turma}</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-[#0b4ea2] font-semibold text-[10px]">{t.turno}</span>
              </div>
              <p className="text-slate-600">{t.sala} · Regente: <strong>{t.regente}</strong></p>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-[#0b4ea2] h-full" style={{ width: `${(t.alunos / t.max) * 100}%` }} />
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>Ocupação: {t.alunos}/{t.max}</span>
                <span>{Math.round((t.alunos / t.max) * 100)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 1.5 Transferências
  if (subdivisionId === 'transferencias') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4 animate-in fade-in">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Transferências Escolares (Entrada & Saída)</h3>
            <p className="text-xs text-slate-500">Expedição e validação de declarações com assinatura digital e código de autenticidade</p>
          </div>
          <button
            type="button"
            onClick={() => alert('Emissão de guia de transferência iniciada.')}
            className="px-4 py-2 bg-[#0b4ea2] hover:bg-[#093e80] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Emitir Guia de Transferência</span>
          </button>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {[
            { aluno: 'GUILHERME ARAÚJO DOS SANTOS', tipo: 'Saída', destino: 'EMEF Darcy Ribeiro (DDZ Leste II)', data: '22/10/2026', status: 'Concluída', doc: 'GUIA-TR-2026-8912' },
            { aluno: 'MARIA EDUARDA NOGUEIRA', tipo: 'Entrada', destino: 'Procedente da Rede Estadual (SEDUC)', data: '25/10/2026', status: 'Documentação Aprovada', doc: 'GUIA-REC-2026-1049' },
            { aluno: 'FELIPE BATISTA ALVES', tipo: 'Saída', destino: 'Mudança de Município (Parintins/AM)', data: '27/10/2026', status: 'Em Análise de Notas', doc: 'GUIA-TR-2026-9042' },
          ].map((tr, idx) => (
            <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-bold text-slate-900 block">{tr.aluno}</span>
                <span className="text-[11px] text-slate-500">{tr.tipo}: {tr.destino} · Data: {tr.data}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded">{tr.doc}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {tr.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 1.7 Histórico Escolar
  if (subdivisionId === 'historico-escolar') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4 animate-in fade-in">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Emissão Oficial de Histórico Escolar</h3>
            <p className="text-xs text-slate-500">Documento homologado pela SEMED com certificação digital e validação por QR Code</p>
          </div>
          <button
            type="button"
            onClick={() => alert('Histórico escolar gerado em formato oficial PDF para impressão.')}
            className="px-4 py-2 bg-[#0b4ea2] hover:bg-[#093e80] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Emitir Histórico em PDF</span>
          </button>
        </div>

        <div className="overflow-x-auto w-full text-xs">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[11px] font-semibold">
              <tr>
                <th className="py-2.5 px-3">Estudante</th>
                <th className="py-2.5 px-3">Matrícula</th>
                <th className="py-2.5 px-3">Último Ano Letivo</th>
                <th className="py-2.5 px-3">Resultado</th>
                <th className="py-2.5 px-3 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.slice(0, 5).map((s) => (
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-bold text-slate-900">{s.nome}</td>
                  <td className="py-3 px-3 font-mono text-slate-600">{s.matricula}</td>
                  <td className="py-3 px-3 text-slate-700">Ano Letivo 2025 (Concluído)</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Aprovado
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => alert(`Visualizando histórico escolar digital de ${s.nome}.`)}
                      className="px-2.5 py-1 text-xs font-semibold text-[#0b4ea2] hover:underline"
                    >
                      Visualizar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // 1.8 Certificados
  if (subdivisionId === 'certificados') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4 animate-in fade-in">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Certificados e Declarações Escolares</h3>
            <p className="text-xs text-slate-500">Declaração de Matrícula, Frequência, Quitação e Conclusão de Ensino Fundamental</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { titulo: 'Declaração de Matrícula', prazo: 'Imediato', desc: 'Comprova vínculo ativo no ano 2026' },
            { titulo: 'Declaração de Frequência', prazo: 'Imediato', desc: 'Atesta frequência para programas sociais' },
            { titulo: 'Certificado de Conclusão', prazo: '3 dias úteis', desc: 'Conclusão do 5º ou 9º ano' },
            { titulo: 'Declaração de Transferência', prazo: '24 horas', desc: 'Para matrícula em outra unidade' },
          ].map((c, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2 text-xs flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-slate-900">{c.titulo}</h4>
                <p className="text-[11px] text-slate-500 mt-1">{c.desc}</p>
              </div>
              <button
                type="button"
                onClick={() => alert(`Gerando ${c.titulo} com assinatura digital e carimbo SEMED.`)}
                className="w-full mt-3 py-1.5 bg-[#0b4ea2] hover:bg-[#093e80] text-white rounded-lg text-xs font-semibold text-center cursor-pointer shadow-2xs"
              >
                Gerar Documento
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 1.9 Ocorrências Disciplinares
  if (subdivisionId === 'ocorrencias-disciplinares') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4 animate-in fade-in">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Registro de Ocorrências e Mediações Pedagógicas</h3>
            <p className="text-xs text-slate-500">Acompanhamento socioemocional e conciliação em conformidade com o regimento SEMED</p>
          </div>
          <button
            type="button"
            onClick={() => alert('Nova ocorrência disciplinar registrada para acompanhamento pedagógico.')}
            className="px-4 py-2 bg-[#0b4ea2] hover:bg-[#093e80] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Registrar Mediação</span>
          </button>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {[
            { aluno: 'ENZO GABRIEL CASTRO NUNES', turma: '3º Ano A', data: '26/10/2026', motivo: 'Conflito interpessoal em sala de aula', solucao: 'Mediação realizada pela Pedagoga Profa. Silvia Melo. Pais notificados via agenda.', status: 'Resolvido' },
            { aluno: 'CAUÃ HENRIQUE DA SILVA MENDES', turma: '4º Ano B', data: '24/10/2026', motivo: 'Desatenção e não realização de atividades', solucao: 'Encaminhamento para acolhimento do AEE e acompanhamento psicossocial.', status: 'Em Acompanhamento' },
          ].map((oc, idx) => (
            <div key={idx} className="py-3.5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">{oc.aluno} · <span className="text-[#0b4ea2]">{oc.turma}</span></span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-[#0b4ea2] border border-blue-200">
                  {oc.status}
                </span>
              </div>
              <p className="text-slate-700 font-medium">{oc.motivo}</p>
              <p className="text-[11px] text-slate-500">{oc.solucao}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Fallback for Remanejamento de Alunos
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4 animate-in fade-in">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="font-bold text-slate-800 text-sm">Remanejamento de Alunos</h3>
          <p className="text-xs text-slate-500">Troca de turma, turno ou sala mediante parecer pedagógico do conselho escolar</p>
        </div>
        <button
          type="button"
          onClick={() => alert('Novo pedido de remanejamento cadastrado.')}
          className="px-4 py-2 bg-[#0b4ea2] hover:bg-[#093e80] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Solicitar Remanejamento</span>
        </button>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
        Nenhum pedido de remanejamento pendente de homologação no momento. Todas as 5 turmas ativas operam dentro do limite de capacidade estipulado para o ano letivo de 2026.
      </p>
    </div>
  );
};

// ============================================================================
// 2. GESTÃO DE PESSOAS SUBDIVISIONS (M4)
// ============================================================================
interface GestaoPessoasSubProps {
  subdivisionId: string;
  teachers: Teacher[];
  selectedSchool: string;
}

export const GestaoPessoasSubdivisions: React.FC<GestaoPessoasSubProps> = ({
  subdivisionId,
  teachers,
  selectedSchool,
}) => {
  // 2.2 Cargos e Funções
  if (subdivisionId === 'cargos-funcoes') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4 animate-in fade-in">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Cargos, Funções e Quadro Funcional</h3>
            <p className="text-xs text-slate-500">Distribuição homologada para {selectedSchool}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {[
            { cargo: 'Professor Nível Superior (Regente)', total: 38, regime: '30h e 40h semanais', status: 'Quadro 100% preenchido' },
            { cargo: 'Pedagogo(a) Escolar', total: 4, regime: '40h semanais', status: 'Orientação e Coordenação' },
            { cargo: 'Secretário(a) e Assistentes Administrativos', total: 6, regime: '40h semanais', status: 'Secretaria e Expediente' },
            { cargo: 'Inspetor(a) de Alunos & Portaria', total: 4, regime: 'Escala 12x36h', status: 'Segurança e Acesso' },
            { cargo: 'Merendeiro(a) Escolar', total: 4, regime: '40h semanais', status: 'Alimentação Regional SEMED' },
            { cargo: 'Equipe de Apoio e Serviços Gerais', total: 2, regime: '40h semanais', status: 'Higienização e Manutenção' },
          ].map((c, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900">{c.cargo}</span>
                <span className="font-mono font-bold text-[#0b4ea2] text-sm">{c.total}</span>
              </div>
              <p className="text-slate-600">{c.regime}</p>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block font-semibold">
                {c.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 2.4 Remanejamentos
  if (subdivisionId === 'remanejamentos') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4 animate-in fade-in">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Remanejamentos de Lotação Docente</h3>
            <p className="text-xs text-slate-500">Transferências funcionais entre escolas e polos da rede municipal de Manaus</p>
          </div>
          <button
            type="button"
            onClick={() => alert('Solicitação de remanejamento enviada ao Departamento de Gestão de Pessoas (SEMED).')}
            className="px-4 py-2 bg-[#0b4ea2] hover:bg-[#093e80] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Solicitar Remanejamento</span>
          </button>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {[
            { servidor: 'MARCELO ANDRADE VIEIRA', matricula: '98129011-2B', cargo: 'Professor Matemática', origem: 'EMEF Darcy Ribeiro', destino: 'EMEF Profa. Francisca Pereira (DDZ Norte)', status: 'Homologado SEMED', data: '18/10/2026' },
            { servidor: 'ANA PAULA FERREIRA', matricula: '98114099-1A', cargo: 'Pedagoga', origem: 'CMEI Maria Luiza', destino: 'E.M. Antonina Borges de Sá', status: 'Em Análise na DDZ', data: '25/10/2026' },
          ].map((r, idx) => (
            <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-bold text-slate-900 block">{r.servidor} · <span className="font-mono text-slate-500">{r.matricula}</span></span>
                <span className="text-[11px] text-slate-500">{r.cargo} | {r.origem} ➔ {r.destino}</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 self-start sm:self-auto">
                {r.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 2.5 Vínculos Funcionais
  if (subdivisionId === 'vinculos-funcionais') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4 animate-in fade-in">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Vínculos Funcionais e Regime Jurídico</h3>
            <p className="text-xs text-slate-500">Concursados efetivos estatutários e contratos por Processo Seletivo Simplificado (PSS)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 block">Efetivos Concursados:</span>
            <strong className="text-2xl font-black font-mono text-[#0b4ea2] block mt-1">48 servidores</strong>
            <span className="text-[11px] text-emerald-700 font-medium">82.7% do quadro total</span>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 block">PSS / Temporários:</span>
            <strong className="text-2xl font-black font-mono text-purple-700 block mt-1">10 servidores</strong>
            <span className="text-[11px] text-purple-600 font-medium">17.3% do quadro total</span>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 block">Comissionados / Função:</span>
            <strong className="text-2xl font-black font-mono text-slate-800 block mt-1">3 servidores</strong>
            <span className="text-[11px] text-slate-500 font-medium">Gestor e Assessores</span>
          </div>
        </div>
      </div>
    );
  }

  // 2.6 Substituições e Delegações
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4 animate-in fade-in">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="font-bold text-slate-800 text-sm">Substituições e Delegações Funcionais</h3>
          <p className="text-xs text-slate-500">Substituição de regência temporária em sala de aula e delegação de competências</p>
        </div>
        <button
          type="button"
          onClick={() => alert('Substituição temporária de regência registrada no diário escolar.')}
          className="px-4 py-2 bg-[#0b4ea2] hover:bg-[#093e80] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Registrar Substituição</span>
        </button>
      </div>

      <div className="divide-y divide-slate-100 text-xs">
        {[
          { titular: 'Profa. Danielle Prado', substituto: 'Prof. Márcio Tavares', turma: '5º Ano B', periodo: '24/10 a 28/10/2026', motivo: 'Licença Capacitação SEMED', status: 'Ativo' },
        ].map((sub, idx) => (
          <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="font-bold text-slate-900 block">Titular: {sub.titular} ➔ Substituto(a): {sub.substituto}</span>
              <span className="text-[11px] text-slate-500">Turma: {sub.turma} · Período: {sub.periodo} ({sub.motivo})</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {sub.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// 3. ORGANIZAÇÃO ESCOLAR SUBDIVISIONS (M5)
// ============================================================================
interface OrganizacaoEscolarSubProps {
  subdivisionId: string;
  classes: SchoolClass[];
  selectedSchool: string;
}

export const OrganizacaoEscolarSubdivisions: React.FC<OrganizacaoEscolarSubProps> = ({
  subdivisionId,
  classes,
  selectedSchool,
}) => {
  // 3.1 Escolas
  if (subdivisionId === 'escolas') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4 animate-in fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Unidades Escolares da Rede Municipal (SEMED Manaus)</h3>
            <p className="text-xs text-slate-500">Divisão Distrital Zonal (DDZ) e Polos de Ensino Ativos</p>
          </div>
          <span className="px-3 py-1 bg-blue-50 text-[#0b4ea2] rounded-xl text-xs font-bold border border-blue-200 self-start sm:self-auto">
            507 Escolas Ativas
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {[
            { nome: 'E.M. Antonina Borges de Sá', ddz: 'DDZ Leste I', endereco: 'Rua São Pedro, s/n - Coroado', alunos: 1240, turnos: 'Matutino / Vespertino', status: 'Ativa (Sede Atual)' },
            { nome: 'EMEF Darcy Ribeiro', ddz: 'DDZ Leste II', endereco: 'Av. Autaz Mirim, 450 - São José', alunos: 980, turnos: 'Matutino / Vespertino / Noturno', status: 'Ativa' },
            { nome: 'CMEI Maria Luiza', ddz: 'DDZ Sul', endereco: 'Rua Barcelos, 120 - Cachoeirinha', alunos: 320, turnos: 'Integral', status: 'Ativa' },
            { nome: 'EMEF Profa. Francisca Pereira', ddz: 'DDZ Norte', endereco: 'Rua Prof. Félix, 88 - Cidade Nova', alunos: 1100, turnos: 'Matutino / Vespertino', status: 'Ativa' },
            { nome: 'E.M. São José Ribeirinho', ddz: 'DDZ Rural Fluvial', endereco: 'Comunidade Bonsucesso - Rio Negro', alunos: 185, turnos: 'Matutino', status: 'Ativa' },
            { nome: 'EMEF Gilberto Mestrinho', ddz: 'DDZ Centro-Sul', endereco: 'Rua Maceió, 540 - Adrianópolis', alunos: 890, turnos: 'Matutino / Vespertino', status: 'Ativa' },
          ].map((esc, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 block truncate">{esc.nome}</span>
              </div>
              <span className="text-[10px] text-[#0b4ea2] font-semibold bg-blue-50 px-2 py-0.5 rounded border border-blue-100 inline-block">
                {esc.ddz}
              </span>
              <p className="text-slate-500 text-[11px]">{esc.endereco}</p>
              <div className="flex justify-between items-center pt-1 border-t border-slate-200/60 text-[11px]">
                <span className="font-mono font-semibold text-slate-700">{esc.alunos} alunos</span>
                <span className="text-emerald-700 font-semibold">{esc.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 3.2 Cursos e Modalidades
  if (subdivisionId === 'cursos-modalidades') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4 animate-in fade-in">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-800 text-sm">Modalidades e Cursos Ofertados</h3>
          <p className="text-xs text-slate-500">Etapas oficiais conforme as Diretrizes Curriculares Nacionais e SEMED</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {[
            { nome: 'Ensino Fundamental - Anos Iniciais (1º ao 5º Ano)', publico: 'Crianças de 6 a 10 anos', carga: '800h / 1.000h anuais', foco: 'Alfabetização consolidada, letramento matemático e formação cidadã', turmas: '18 turmas na unidade' },
            { nome: 'Ensino Fundamental - Anos Finais (6º ao 9º Ano)', publico: 'Adolescentes de 11 a 14 anos', carga: '1.000h anuais', foco: 'Aprofundamento científico, linguagens, humanidades e robótica', turmas: '12 turmas na unidade' },
            { nome: 'Educação Infantil (Creche e Pré-Escola)', publico: 'Crianças de 0 a 5 anos', carga: '800h anuais / Tempo Integral', foco: 'Campos de experiências, brincadeira, socialização e cuidado', turmas: '4 turmas na unidade' },
            { nome: 'Educação de Jovens e Adultos (EJA)', publico: 'Jovens a partir de 15 anos e adultos', carga: '400h por módulo', foco: 'Aceleração de estudos, inclusão produtiva e letramento funcional', turmas: '3 turmas noturnas' },
          ].map((cur, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
              <span className="font-bold text-slate-900 block text-sm">{cur.nome}</span>
              <p className="text-slate-600 leading-relaxed">{cur.foco}</p>
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200/60 text-[11px]">
                <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-medium text-slate-700">Público: {cur.publico}</span>
                <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-mono text-[#0b4ea2]">{cur.carga}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 3.3 Séries, Anos e Etapas
  if (subdivisionId === 'series-etapas') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4 animate-in fade-in">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-800 text-sm">Séries, Anos e Ciclos de Aprendizagem</h3>
          <p className="text-xs text-slate-500">Distribuição curricular alinhada à Base Nacional Comum Curricular (BNCC)</p>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {[
            { ciclo: 'Ciclo de Alfabetização', anos: '1º e 2º Anos', objetivo: 'Alfabetização plena e letramento inicial na idade certa', turmas: 6, alunos: 168 },
            { ciclo: 'Ciclo Complementar', anos: '3º ao 5º Anos', objetivo: 'Desenvolvimento de raciocínio lógico, leitura autônoma e ciências', turmas: 9, alunos: 270 },
            { ciclo: 'Ciclo Fundamental II', anos: '6º ao 9º Anos', objetivo: 'Conhecimento especializado, projetos de pesquisa e transição para o médio', turmas: 10, alunos: 310 },
          ].map((et, idx) => (
            <div key={idx} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-bold text-slate-900 text-sm block">{et.ciclo} · <span className="text-[#0b4ea2]">{et.anos}</span></span>
                <p className="text-slate-600 mt-0.5">{et.objetivo}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-mono font-semibold">{et.turmas} turmas</span>
                <span className="bg-blue-50 text-[#0b4ea2] px-2.5 py-1 rounded-lg font-mono font-bold">{et.alunos} alunos</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 3.4 Turnos
  if (subdivisionId === 'turnos') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4 animate-in fade-in">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-800 text-sm">Turnos de Funcionamento</h3>
          <p className="text-xs text-slate-500">Jornadas diárias da unidade {selectedSchool}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {[
            { turno: 'Matutino', horario: '07:00 às 11:15', turmas: 12, alunos: 360, intervalo: '09:00 - 09:20' },
            { turno: 'Vespertino', horario: '13:00 às 17:15', turmas: 12, alunos: 355, intervalo: '15:00 - 15:20' },
            { turno: 'Noturno (EJA)', horario: '18:30 às 22:00', turmas: 3, alunos: 75, intervalo: '20:00 - 20:15' },
            { turno: 'Tempo Integral', horario: '07:30 às 16:30', turmas: 2, alunos: 50, intervalo: '3 refeições diárias' },
          ].map((t, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
              <span className="font-bold text-slate-900 block text-sm">{t.turno}</span>
              <p className="text-[#0b4ea2] font-mono font-bold text-sm">{t.horario}</p>
              <div className="space-y-1 text-slate-600 pt-1 border-t border-slate-200/60">
                <div className="flex justify-between"><span>Turmas:</span> <strong className="font-mono">{t.turmas}</strong></div>
                <div className="flex justify-between"><span>Alunos:</span> <strong className="font-mono">{t.alunos}</strong></div>
                <div className="flex justify-between text-[11px] text-slate-500"><span>Recreio:</span> <span>{t.intervalo}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 3.5 Salas e Ambientes
  if (subdivisionId === 'salas-ambientes') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4 animate-in fade-in">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Salas e Ambientes de Aprendizagem</h3>
            <p className="text-xs text-slate-500">Capacidade física, climatização e recursos de acessibilidade</p>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            100% Climatizadas
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {[
            { sala: 'Sala 101 - Bloco A', tipo: 'Sala de Aula Regular', capacidade: 35, arCondicionado: 'Split 24.000 BTUs', acessibilidade: 'Rampa de acesso e porta larga' },
            { sala: 'Sala 102 - Bloco A', tipo: 'Sala de Aula Regular', capacidade: 35, arCondicionado: 'Split 24.000 BTUs', acessibilidade: 'Rampa de acesso' },
            { sala: 'Sala de Recursos Multifuncionais', tipo: 'AEE / Inclusão', capacidade: 12, arCondicionado: 'Split 18.000 BTUs', acessibilidade: 'Tecnologia assistiva e mobiliário adaptado' },
            { sala: 'Laboratório de Robótica & Informática', tipo: 'Tecnologia SEMED', capacidade: 30, arCondicionado: '2x Split 24.000 BTUs', acessibilidade: 'Bancadas com ajuste de altura' },
            { sala: 'Biblioteca Escolar Malba Tahan', tipo: 'Acervo e Leitura', capacidade: 40, arCondicionado: 'Split 36.000 BTUs', acessibilidade: 'Piso tátil e acervo em braile' },
            { sala: 'Refeitório e Cozinha Experimental', tipo: 'Alimentação PNAE', capacidade: 120, arCondicionado: 'Ventilação Cruzada + Climatizadores', acessibilidade: 'Mesas reservadas para PCD' },
          ].map((s, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
              <span className="font-bold text-slate-900 block">{s.sala}</span>
              <span className="text-[10px] text-[#0b4ea2] font-semibold bg-blue-50 px-2 py-0.5 rounded border border-blue-100 inline-block">
                {s.tipo}
              </span>
              <p className="text-slate-600 text-[11px]">Capacidade: <strong className="font-mono text-slate-800">{s.capacidade} alunos</strong></p>
              <p className="text-slate-500 text-[11px]">❄️ {s.arCondicionado}</p>
              <p className="text-emerald-700 text-[10px] font-medium">♿ {s.acessibilidade}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 3.7 Disciplinas e Componentes Curriculares
  if (subdivisionId === 'disciplinas-componentes') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4 animate-in fade-in">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-800 text-sm">Disciplinas e Componentes Curriculares</h3>
          <p className="text-xs text-slate-500">Base Nacional Comum Curricular (BNCC) e Parte Diversificada Regional</p>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {[
            { codigo: 'LP-01', nome: 'Língua Portuguesa & Literatura', tipo: 'Base Nacional Comum', aulasSemanais: 5, cargaAnual: 200 },
            { codigo: 'MAT-02', nome: 'Matemática e Raciocínio Lógico', tipo: 'Base Nacional Comum', aulasSemanais: 5, cargaAnual: 200 },
            { codigo: 'CIE-03', nome: 'Ciências da Natureza & Meio Ambiente Amazônico', tipo: 'Base Nacional Comum', aulasSemanais: 3, cargaAnual: 120 },
            { codigo: 'HIS-04', nome: 'História Geral e do Amazonas', tipo: 'Base Nacional Comum', aulasSemanais: 2, cargaAnual: 80 },
            { codigo: 'GEO-05', nome: 'Geografia e Territorialidade da Amazônia', tipo: 'Base Nacional Comum', aulasSemanais: 2, cargaAnual: 80 },
            { codigo: 'ART-06', nome: 'Arte, Cultura & Dança Regional', tipo: 'Base Nacional Comum', aulasSemanais: 2, cargaAnual: 80 },
            { codigo: 'EF-07', nome: 'Educação Física & Jogos Tradicionais', tipo: 'Base Nacional Comum', aulasSemanais: 2, cargaAnual: 80 },
            { codigo: 'ROB-08', nome: 'Robótica Educacional & Pensamento Computacional', tipo: 'Parte Diversificada (SEMED)', aulasSemanais: 2, cargaAnual: 80 },
          ].map((d, idx) => (
            <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-bold text-slate-900 block">{d.nome} <span className="font-mono text-slate-400 font-normal">({d.codigo})</span></span>
                <span className="text-[11px] text-slate-500">{d.tipo}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-mono font-semibold">{d.aulasSemanais} aulas/sem</span>
                <span className="bg-blue-50 text-[#0b4ea2] px-2.5 py-1 rounded-lg font-mono font-bold">{d.cargaAnual}h anuais</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 3.8 Matriz Curricular
  if (subdivisionId === 'matriz-curricular') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4 animate-in fade-in">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Matriz Curricular Oficial 2026</h3>
            <p className="text-xs text-slate-500">Distribuição homologada pelo Conselho Municipal de Educação (CME)</p>
          </div>
          <button
            type="button"
            onClick={() => alert('Download da matriz curricular oficial em PDF homologado pelo CME.')}
            className="px-3.5 py-1.5 bg-[#0b4ea2] hover:bg-[#093e80] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar Matriz PDF</span>
          </button>
        </div>

        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-slate-500">Dias Letivos</p>
              <p className="text-xl font-bold font-mono text-[#0b4ea2] mt-0.5">200 dias</p>
            </div>
            <div>
              <p className="text-slate-500">Carga Horária Mínima</p>
              <p className="text-xl font-bold font-mono text-[#0b4ea2] mt-0.5">800 horas</p>
            </div>
            <div>
              <p className="text-slate-500">Semanas Letivas</p>
              <p className="text-xl font-bold font-mono text-emerald-700 mt-0.5">40 semanas</p>
            </div>
            <div>
              <p className="text-slate-500">Duração da Aula</p>
              <p className="text-xl font-bold font-mono text-slate-800 mt-0.5">50 minutos</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3.9 Grade de Horários
  if (subdivisionId === 'grade-horarios') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4 animate-in fade-in">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-800 text-sm">Grade Semanal de Horários das Turmas</h3>
          <p className="text-xs text-slate-500">Escala de aulas por componente curricular (5º Ano A - Matutino)</p>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-center text-xs min-w-[650px] border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3 text-left">Horário</th>
                <th className="py-2.5 px-3">Segunda</th>
                <th className="py-2.5 px-3">Terça</th>
                <th className="py-2.5 px-3">Quarta</th>
                <th className="py-2.5 px-3">Quinta</th>
                <th className="py-2.5 px-3">Sexta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-2.5 px-3 text-left font-mono font-bold text-slate-600">07:00 - 07:50</td>
                <td className="py-2.5 px-3 bg-blue-50/50 font-semibold text-[#0b4ea2]">Português</td>
                <td className="py-2.5 px-3 bg-emerald-50/50 font-semibold text-emerald-800">Matemática</td>
                <td className="py-2.5 px-3 bg-blue-50/50 font-semibold text-[#0b4ea2]">Português</td>
                <td className="py-2.5 px-3 bg-purple-50/50 font-semibold text-purple-800">Ciências</td>
                <td className="py-2.5 px-3 bg-emerald-50/50 font-semibold text-emerald-800">Matemática</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 text-left font-mono font-bold text-slate-600">07:50 - 08:40</td>
                <td className="py-2.5 px-3 bg-blue-50/50 font-semibold text-[#0b4ea2]">Português</td>
                <td className="py-2.5 px-3 bg-emerald-50/50 font-semibold text-emerald-800">Matemática</td>
                <td className="py-2.5 px-3 bg-amber-50/50 font-semibold text-amber-800">História</td>
                <td className="py-2.5 px-3 bg-purple-50/50 font-semibold text-purple-800">Ciências</td>
                <td className="py-2.5 px-3 bg-emerald-50/50 font-semibold text-emerald-800">Matemática</td>
              </tr>
              <tr className="bg-slate-100/60 font-semibold text-slate-500 text-[11px]">
                <td className="py-1 px-3 text-left font-mono">08:40 - 09:00</td>
                <td colSpan={5} className="py-1">Intervalo / Merenda Escolar Regional</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 text-left font-mono font-bold text-slate-600">09:00 - 09:50</td>
                <td className="py-2.5 px-3 bg-amber-50/50 font-semibold text-amber-800">Geografia</td>
                <td className="py-2.5 px-3 bg-rose-50/50 font-semibold text-rose-800">Arte</td>
                <td className="py-2.5 px-3 bg-teal-50/50 font-semibold text-teal-800">Robótica</td>
                <td className="py-2.5 px-3 bg-blue-50/50 font-semibold text-[#0b4ea2]">Português</td>
                <td className="py-2.5 px-3 bg-indigo-50/50 font-semibold text-indigo-800">Educação Física</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 text-left font-mono font-bold text-slate-600">09:50 - 10:40</td>
                <td className="py-2.5 px-3 bg-amber-50/50 font-semibold text-amber-800">Geografia</td>
                <td className="py-2.5 px-3 bg-rose-50/50 font-semibold text-rose-800">Arte</td>
                <td className="py-2.5 px-3 bg-teal-50/50 font-semibold text-teal-800">Robótica</td>
                <td className="py-2.5 px-3 bg-blue-50/50 font-semibold text-[#0b4ea2]">Português</td>
                <td className="py-2.5 px-3 bg-indigo-50/50 font-semibold text-indigo-800">Educação Física</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // 3.10 Ano Letivo & 3.11 Calendário Escolar
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4 animate-in fade-in">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="font-bold text-slate-800 text-sm">Calendário Escolar e Ano Letivo 2026</h3>
        <p className="text-xs text-slate-500">Cronograma de bimestres, recessos e conselhos deliberativos da SEMED</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        {[
          { periodo: '1º Bimestre', inicio: '05/02/2026', fim: '24/04/2026', dias: '50 dias letivos', status: 'Em Curso (Aberto)' },
          { periodo: '2º Bimestre', inicio: '27/04/2026', fim: '09/07/2026', dias: '50 dias letivos', status: 'Aguardando' },
          { periodo: 'Recesso Escolar', inicio: '10/07/2026', fim: '25/07/2026', dias: '15 dias de férias', status: 'Férias Docentes' },
          { periodo: '3º Bimestre', inicio: '28/07/2026', fim: '02/10/2026', dias: '50 dias letivos', status: 'Programado' },
          { periodo: '4º Bimestre', inicio: '05/10/2026', fim: '18/12/2026', dias: '50 dias letivos', status: 'Programado' },
        ].map((c, idx) => (
          <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5">
            <span className="font-bold text-slate-900 block text-sm">{c.periodo}</span>
            <p className="text-[#0b4ea2] font-mono font-semibold">{c.inicio} a {c.fim}</p>
            <p className="text-slate-500">{c.dias}</p>
            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
              c.status.includes('Curso') ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600'
            }`}>
              {c.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// 4. RELATÓRIOS E INDICADORES SUBDIVISIONS (M13)
// ============================================================================
interface RelatoriosIndicadoresSubProps {
  subdivisionId: string;
}

export const RelatoriosIndicadoresSubdivisions: React.FC<RelatoriosIndicadoresSubProps> = ({
  subdivisionId,
}) => {
  // 4.2 Rendimento e Aprovação
  if (subdivisionId === 'rendimento-aprovacao') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4 animate-in fade-in">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Taxas de Rendimento e Aprovação Escolar</h3>
            <p className="text-xs text-slate-500">Histórico de rendimento escolar por etapa e componente</p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
            96.4% Aprovação Geral
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-slate-500">Anos Iniciais (1º ao 5º)</p>
            <p className="text-2xl font-black font-mono text-emerald-600 mt-1">97.8%</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Apenas 2.2% em recuperação</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-slate-500">Anos Finais (6º ao 9º)</p>
            <p className="text-2xl font-black font-mono text-blue-600 mt-1">94.9%</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Com reforço escolar no contraturno</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-slate-500">EJA Integrado</p>
            <p className="text-2xl font-black font-mono text-purple-700 mt-1">91.2%</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Programa de combate ao abandono</p>
          </div>
        </div>
      </div>
    );
  }

  // 4.3 Frequência e Evasão Escolar
  if (subdivisionId === 'frequencia-evasao') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4 animate-in fade-in">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Monitoramento de Frequência e Busca Ativa Escolar</h3>
            <p className="text-xs text-slate-500">Identificação precoce de risco de evasão e visitas domiciliares</p>
          </div>
          <span className="text-xs font-mono font-bold text-[#0b4ea2] bg-blue-50 px-3 py-1 rounded-xl border border-blue-200">
            0.8% Abandono (Histórico Baixo)
          </span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {[
            { acao: 'Busca Ativa Escolar SEMED', cobertura: '100% dos casos de infrequência superior a 10%', meta: 'Superada' },
            { acao: 'Comitê de Proteção Escolar', cobertura: 'Articulação direta com Conselho Tutelar Zonal', meta: 'Ativo' },
            { acao: 'Avisos Instantâneos aos Pais via SMS/WhatsApp', cobertura: 'Mais de 1.100 responsáveis notificados mensalmente', meta: '99.4% entrega' },
          ].map((item, idx) => (
            <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-bold text-slate-900 block">{item.acao}</span>
                <span className="text-[11px] text-slate-500">{item.cobertura}</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 self-start sm:self-auto">
                {item.meta}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 4.5 Censo Demográfico da Rede
  if (subdivisionId === 'censo-demografico') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4 animate-in fade-in">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-800 text-sm">Censo Demográfico e Perfil Socioeconômico</h3>
          <p className="text-xs text-slate-500">Dados cadastrais consolidados dos estudantes e famílias atendidas</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-slate-500 block">Beneficiários Bolsa Família / CadÚnico:</span>
            <strong className="text-2xl font-black font-mono text-[#0b4ea2] block mt-1">72.4%</strong>
            <span className="text-[11px] text-slate-500">898 estudantes com acompanhamento</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-slate-500 block">Usuários do Transporte Escolar:</span>
            <strong className="text-2xl font-black font-mono text-purple-700 block mt-1">185 alunos</strong>
            <span className="text-[11px] text-slate-500">Rotas terrestres e fluviais</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-slate-500 block">Estudantes com AEE / Inclusão:</span>
            <strong className="text-2xl font-black font-mono text-emerald-700 block mt-1">34 alunos</strong>
            <span className="text-[11px] text-slate-500">Com plano de desenvolvimento PDI ativo</span>
          </div>
        </div>
      </div>
    );
  }

  // 4.6 Exportação Consolidada
  if (subdivisionId === 'exportacao-consolidada') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4 animate-in fade-in">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-800 text-sm">Exportação Consolidada de Relatórios Oficiais</h3>
          <p className="text-xs text-slate-500">Geração de arquivos oficiais para órgãos fiscalizadores (SEMED, MEC, TCE-AM)</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {[
            { titulo: 'Arquivo Censo Escolar 2026 (MEC / INEP)', formato: 'TXT Padronizado Educacenso', data: 'Gerado em 24/10/2026' },
            { titulo: 'Relatório Trimestral de Prestação de Contas (TCE-AM)', formato: 'PDF com Assinatura Digital', data: 'Gerado em 15/10/2026' },
            { titulo: 'Boletim Estatístico da Unidade Escolar', formato: 'Planilha Excel (XLSX)', data: 'Gerado hoje' },
            { titulo: 'Quadro de Lotação Docente e Carga Horária', formato: 'PDF Oficial SEMED', data: 'Gerado hoje' },
          ].map((rep, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between gap-3">
              <div>
                <span className="font-bold text-slate-900 block">{rep.titulo}</span>
                <span className="text-[11px] text-slate-500">{rep.formato} · {rep.data}</span>
              </div>
              <button
                type="button"
                onClick={() => alert(`Download iniciado: ${rep.titulo}`)}
                className="p-2 text-[#0b4ea2] hover:bg-blue-50 rounded-lg border border-blue-200 transition-colors cursor-pointer shrink-0"
                title="Baixar arquivo"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default / paineis-ideb fallback
  return null;
};

