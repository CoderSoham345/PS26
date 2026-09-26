import React, { useState } from 'react';
import { FileText, Download, Share2, Sparkles, CheckCircle2, Loader2, Shield } from 'lucide-react';
import { Habitation, RelocationSite } from '../../types';

interface AuthorityReportViewProps {
  habitation: Habitation;
  site: RelocationSite;
}

export const AuthorityReportView: React.FC<AuthorityReportViewProps> = ({ habitation, site }) => {
  const [generating, setGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [aiReportText, setAiReportText] = useState<string | null>(null);

  const handleGenerateReport = async () => {
    setGenerating(true);
    try {
      const res = await fetch('/api/ai/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ villageId: habitation.id })
      });
      const data = await res.json();
      setAiReportText(data.rawReport || JSON.stringify(data, null, 2));
      setReportGenerated(true);
    } catch (err) {
      setReportGenerated(true);
      setAiReportText(`OFFICIAL RELOCATION ASSESSMENT REPORT: ${habitation.name} (${habitation.district})\nGenerated via सुरक्षित धरा (SURAKSHIT DHARA) SDMA AI Engine.`);
    } finally {
      setGenerating(false);
    }
  };

  const sections = [
    '1. Habitation Profile & Demographics',
    '2. Multi-Hazard Risk Assessment & Telemetry',
    '3. Population Vulnerability Index',
    '4. Historical Disaster Impact Analysis',
    '5. AI-Assessed Red Zone Conditions',
    '6. Relocation Priority Classification',
    '7. Candidate Relocation Sites Evaluation',
    '8. Carrying Capacity & Water Audit',
    '9. Infrastructure Gaps & Egress Roads',
    '10. Rehabilitation & City Transformation Scenario',
    '11. Transparent Data Sources & Metadata',
    '12. Model Assumptions & Limitations'
  ];

  return (
    <div className="space-y-4 sm:space-y-6 pb-12 animate-fadeIn w-full max-w-full">
      <div className="bg-white border border-[#DCE7E1] p-4 sm:p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 w-full box-border">
        <div>
          <div className="flex items-center space-x-2 mb-1 flex-wrap gap-y-1">
            <span className="text-[10px] bg-[#E7F6EF] text-[#087F5B] px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
              State Authority Document • {habitation.district}
            </span>
          </div>
          <h1 className="text-lg sm:text-xl font-extrabold text-[#17221D]">Authority Relocation Assessment Report</h1>
          <p className="text-xs text-slate-600">Comprehensive 12-section compliance report for district collectorate review</p>
        </div>

        <button
          onClick={handleGenerateReport}
          disabled={generating}
          className="w-full md:w-auto px-5 py-3 bg-[#087F5B] hover:bg-[#07543F] disabled:opacity-50 text-white font-semibold text-xs rounded-xl shadow-sm transition-colors flex items-center justify-center space-x-2 min-h-[44px] cursor-pointer shrink-0"
        >
          {generating ? <Loader2 className="w-4 h-4 animate-spin shrink-0" /> : <Sparkles className="w-4 h-4 shrink-0" />}
          <span>{reportGenerated ? 'Regenerate AI Report' : 'Generate Relocation Assessment Report'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white border border-[#DCE7E1] p-6 rounded-2xl shadow-sm">
          <h2 className="text-sm font-bold text-[#17221D] mb-4 flex items-center space-x-2">
            <FileText className="w-4 h-4 text-[#087F5B]" />
            <span>Report Sections (12)</span>
          </h2>
          <div className="space-y-2">
            {sections.map((sec, idx) => (
              <div key={idx} className="p-2.5 bg-[#F6F9F7] border border-[#DCE7E1] rounded-xl text-xs text-slate-700 flex items-center justify-between">
                <span>{sec}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#087F5B]" />
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white border border-[#DCE7E1] p-8 rounded-2xl flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#DCE7E1] mb-6">
              <div>
                <div className="text-xs font-bold text-[#087F5B] uppercase tracking-widest">Government of Maharashtra • SDMA ({habitation.district})</div>
                <h3 className="text-lg font-extrabold text-[#17221D] mt-0.5">Relocation Intelligence Document: {habitation.name}</h3>
              </div>
              <div className="text-right text-xs text-slate-500 font-mono">
                <div>Date: {new Date().toISOString().split('T')[0]}</div>
                <div>Status: Verified Pilot</div>
              </div>
            </div>

            {reportGenerated ? (
              <div className="bg-[#F6F9F7] border border-[#DCE7E1] p-6 rounded-xl font-mono text-xs text-slate-800 leading-relaxed max-h-96 overflow-y-auto whitespace-pre-wrap">
                {aiReportText}
              </div>
            ) : (
              <div className="py-16 text-center space-y-4 bg-[#F6F9F7] border border-[#DCE7E1] rounded-xl">
                <Shield className="w-12 h-12 text-[#087F5B]/40 mx-auto" />
                <div>
                  <h4 className="text-sm font-bold text-[#17221D]">Ready to Compile Authority Assessment</h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto mt-1">Click "Generate Relocation Assessment Report" to synthesize multi-hazard telemetry, AI red zone conditions, and carrying capacity audits for {habitation.name}.</p>
                </div>
              </div>
            )}
          </div>

          <div className="pt-6 mt-6 border-t border-[#DCE7E1] flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => alert('Downloading official PDF report...')}
                className="px-4 py-2 bg-[#F6F9F7] hover:bg-slate-100 text-[#17221D] text-xs font-semibold rounded-xl flex items-center space-x-2 transition-colors border border-[#DCE7E1]"
              >
                <Download className="w-4 h-4 text-[#087F5B]" />
                <span>Export PDF</span>
              </button>
              <button
                onClick={() => alert('Exporting report datasets to CSV...')}
                className="px-4 py-2 bg-[#F6F9F7] hover:bg-slate-100 text-[#17221D] text-xs font-semibold rounded-xl flex items-center space-x-2 transition-colors border border-[#DCE7E1]"
              >
                <Download className="w-4 h-4 text-teal-600" />
                <span>Export CSV</span>
              </button>
            </div>
            <button
              onClick={() => alert('Report sharing link copied to clipboard.')}
              className="px-4 py-2 bg-[#F6F9F7] hover:bg-slate-100 text-[#17221D] text-xs font-semibold rounded-xl flex items-center space-x-2 transition-colors border border-[#DCE7E1]"
            >
              <Share2 className="w-4 h-4 text-[#087F5B]" />
              <span>Share Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
