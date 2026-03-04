import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Settings, 
  ShieldCheck, 
  Cpu, 
  CheckCircle2, 
  Zap,
  Lock,
  GitBranch,
  Split,
  Play,
  History,
  AlertCircle
} from 'lucide-react';

const App = () => {
  const [view, setView] = useState('sequence'); // 'sequence' or 'logic'
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState(null);

  const scenarios = [
    { id: 1, title: "Standard Order", summary: "Full Shipment → Full Capture", detail: "Total $100. Sales Order auths $100. AR Invoice created for $100. Worker captures full amount." },
    { id: 2, title: "Partial (AllowPartial=Y)", summary: "Split Shipments → Multiple Captures", detail: "Total $100. Ship 1 ($60) → Capture $60. Remaining auth $40. Ship 2 ($40) → Capture $40." },
    { id: 3, title: "Partial (AllowPartial=N)", summary: "Split Shipments → Capture Deferral", detail: "Total $100. Ship 1 ($60). Policy prevents partial capture. Auth stays open. Capture skipped." },
    { id: 5, title: "Order Adjusted", summary: "Total Decreases/Increases", detail: "Original $100 → Adjusted $80. System detects change, voids old auth, and performs REAUTH for $80." },
    { id: 6, title: "Auto-ReAuth", summary: "Handling Expiration (Day 6)", detail: "Auth valid 7 days. At Day 6, worker detects expiry. Re-authorizes $100 and voids old auth to extend." },
    { id: 10, title: "Worker Recovery", summary: "Automatic Failure Handling", detail: "Worker crashes. Job lock timeout exceeded. Secondary worker reclaims job and completes capture." }
  ];

  const sequenceSteps = [
    { id: 1, from: 'SAP', to: 'Addon', label: 'Order Add', desc: 'Triggered by OINV/ORDR Add event via SBO_SP_TransactionNotification.' },
    { id: 2, from: 'Addon', to: 'AuthorizeNet', label: 'AUTH_ONLY', desc: 'Secure TLS 1.2 Handshake to Authorize.Net CIM Vault.' },
    { id: 3, from: 'AuthorizeNet', to: 'Addon', label: 'TransID', desc: 'Unique Gateway ID returned; No sensitive card data stored in SAP.' },
    { id: 4, from: 'Addon', to: 'SAP', label: 'Update UDFs', desc: 'Auth data written to Sales Order (ORDR) user-defined fields.' },
    { id: 5, from: 'SAP', to: 'SAP', label: 'AR Invoice', desc: 'Fulfillment process generates Invoice object in SAP B1.' },
    { id: 6, from: 'Worker', to: 'Addon', label: 'Polling', desc: 'Background service checks for uncaptured invoices with active Auths.' },
    { id: 7, from: 'Addon', to: 'AuthorizeNet', label: 'CAPTURE', desc: 'PRIOR_AUTH_CAPTURE request sent for the invoice amount.' },
    { id: 8, from: 'AuthorizeNet', to: 'Addon', label: 'Success', desc: 'Gateway confirms funds are settled to merchant account.' },
    { id: 9, from: 'Addon', to: 'SAP', label: 'Close Flow', desc: 'Order status updated to Paid/Closed in Business One.' },
  ];

  // Recalibrated Y-coordinates to give diamonds more vertical room (approx 14-16% gaps)
  const logicSteps = [
    { id: 'A', label: 'Order Created', type: 'start', desc: 'SAP Transaction Commits via DI-API or UI-API.', x: 50, y: 5 },
    { id: 'B', label: 'PreAuth Req?', type: 'decision', desc: 'Check Business Logic / @CP_SETUP / Customer Group.', x: 50, y: 18 },
    { id: 'C', label: 'Allow Order', type: 'end', color: 'blue', desc: 'Standard workflow (No Credit Card required).', x: 20, y: 18 },
    { id: 'D', label: 'AUTH_ONLY', type: 'action', desc: 'Authorize.Net CIM Handshake for full order amount.', x: 50, y: 32 },
    { id: 'E', label: 'Save Auth Data', type: 'action', desc: 'Persist TransID to ORDR Table for lifecycle tracking.', x: 50, y: 42 },
    { id: 'F', label: 'Invoice Created', type: 'event', desc: 'Fulfillment Trigger in SAP B1 Inventory.', x: 50, y: 52 },
    { id: 'G', label: 'Worker Detects', type: 'action', desc: 'Batch Polling identifies new Invoice link.', x: 50, y: 62 },
    { id: 'H', label: 'Allow Partial?', type: 'decision', desc: 'Check Setting: @CP_SETUP.AllowPartial.', x: 50, y: 76 },
    { id: 'I', label: 'Partial Capture', type: 'end', color: 'emerald', desc: 'Capture current invoice amount; Auth remains open.', x: 20, y: 76 },
    { id: 'J', label: 'Full Shipped?', type: 'decision', desc: 'Compare Invoice Total vs. Remaining Open Order Balance.', x: 50, y: 90 },
    { id: 'K', label: 'Final Capture', type: 'end', color: 'emerald', desc: 'Capture full amount; Finalize gateway transaction.', x: 80, y: 90 },
    { id: 'L', label: 'Skip Capture', type: 'end', color: 'slate', desc: 'Workflow Deferred; Waiting for full shipment.', x: 50, y: 99 },
  ];

  const currentSteps = view === 'sequence' ? sequenceSteps : logicSteps;

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % currentSteps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, view, currentSteps.length]);

  const actors = [
    { id: 'SAP', name: 'SAP BUSINESS ONE', icon: <Database className="w-5 h-5" />, color: 'bg-[#3b82f6]' },
    { id: 'Addon', name: 'CLICKPAY ADD-ON', icon: <Settings className="w-5 h-5" />, color: 'bg-[#10b981]' },
    { id: 'AuthorizeNet', name: 'AUTHORIZE.NET API', icon: <ShieldCheck className="w-5 h-5" />, color: 'bg-[#6366f1]' },
    { id: 'Worker', name: 'BACKGROUND WORKER', icon: <Cpu className="w-5 h-5" />, color: 'bg-[#475569]' },
  ];

  const renderLogicPaths = () => {
    const paths = [
      { from: 'A', to: 'B' },
      { from: 'B', to: 'C', label: 'No' },
      { from: 'B', to: 'D', label: 'Yes' },
      { from: 'D', to: 'E' },
      { from: 'E', to: 'F' },
      { from: 'F', to: 'G' },
      { from: 'G', to: 'H' },
      { from: 'H', to: 'I', label: 'Yes' },
      { from: 'H', to: 'J', label: 'No' },
      { from: 'J', to: 'K', label: 'Yes' },
      { from: 'J', to: 'L', label: 'No' },
    ];

    return paths.map((path, i) => {
      const start = logicSteps.find(n => n.id === path.from);
      const end = logicSteps.find(n => n.id === path.to);
      const isActive = currentSteps[activeStep].id === path.to;

      return (
        <g key={i}>
          <line 
            x1={`${start.x}%`} y1={`${start.y}%`} 
            x2={`${end.x}%`} y2={`${end.y}%`} 
            stroke={isActive ? '#10b981' : '#334155'} 
            strokeWidth={isActive ? '3' : '2'}
            className="transition-all duration-500"
          />
          {path.label && (
            <text 
              x={`${(start.x + end.x) / 2}%`} 
              y={`${(start.y + end.y) / 2}%`} 
              dy={path.from === 'B' || path.from === 'H' || path.from === 'J' ? '-12' : '20'}
              dx={path.label === 'No' && (path.from === 'B' || path.from === 'J') ? '-18' : '18'}
              fill={isActive ? '#10b981' : '#94a3b8'} 
              fontSize="10" 
              fontWeight="900"
              textAnchor="middle"
              className="uppercase tracking-widest"
            >
              {path.label}
            </text>
          )}
        </g>
      );
    });
  };

  return (
    <div className="min-h-screen bg-[#0a1221] text-white p-4 md:p-8 font-sans selection:bg-teal-500/30 overflow-x-hidden">
      {/* Header Area */}
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-400 text-[10px] font-bold tracking-[0.2em] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          Technical Specification & Lifecycle Workflows
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-tight">
          ClickPay <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] via-[#3b82f6] to-[#6366f1]">
            SAP Business One Integration
          </span>
        </h1>
        
        <div className="flex justify-center mt-6">
          <div className="bg-[#111c30] p-1 rounded-2xl border border-slate-800 flex gap-1 shadow-lg shadow-black/40">
            <button 
              onClick={() => { setView('sequence'); setActiveStep(0); setSelectedScenario(null); }}
              className={`px-6 py-2 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all flex items-center gap-2 ${view === 'sequence' ? 'bg-[#3b82f6] text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <Split size={14} /> Data Flow
            </button>
            <button 
              onClick={() => { setView('logic'); setActiveStep(0); setSelectedScenario(null); }}
              className={`px-6 py-2 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all flex items-center gap-2 ${view === 'logic' ? 'bg-[#10b981] text-[#0a1221] shadow-lg shadow-emerald-500/20' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <GitBranch size={14} /> Logic Engine
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Main Visualization */}
        <div className="lg:col-span-8 relative">
          <div className="bg-[#111c30]/50 backdrop-blur-md rounded-[2.5rem] border border-slate-800 p-8 md:p-12 shadow-2xl min-h-[900px] flex flex-col justify-start overflow-hidden relative">
            
            {view === 'sequence' ? (
              <div className="relative flex justify-between items-start h-full">
                {actors.map((actor) => (
                  <div key={actor.id} className="flex flex-col items-center z-10 w-1/4">
                    <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${actor.color} flex items-center justify-center shadow-lg border border-white/10 mb-4 transition-all duration-500`}>
                      {actor.icon}
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-wider text-slate-500 text-center">{actor.name}</span>
                    <div className="w-px h-[600px] bg-gradient-to-b from-slate-700/50 via-slate-800/20 to-transparent mt-6" />
                  </div>
                ))}

                <div className="absolute inset-0 top-32 pointer-events-none">
                  {sequenceSteps.map((step, idx) => {
                    const fromIdx = actors.findIndex(a => a.id === step.from);
                    const toIdx = actors.findIndex(a => a.id === step.to);
                    const isActive = activeStep === idx;
                    const leftPos = Math.min(fromIdx, toIdx) * 25 + 12.5;
                    const width = Math.abs(fromIdx - toIdx) * 25;
                    const isReverse = fromIdx > toIdx;
                    const isSelf = fromIdx === toIdx;

                    if (!isActive) return null;

                    return (
                      <div key={step.id} className="absolute transition-all duration-700 flex items-center justify-center h-16"
                        style={{ left: `${leftPos}%`, width: isSelf ? '80px' : `${width}%`, transform: isSelf ? 'translateX(-50%)' : 'none', top: `${idx * 52}px` }}>
                        <div className={`w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#10b981] to-transparent relative ${isReverse ? 'rotate-180' : ''}`}>
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 rotate-45 border-t-2 border-r-2 border-[#10b981] shadow-[0_0_10px_#10b981]" />
                          <div className={`absolute top-[-28px] left-1/2 -translate-x-1/2 flex flex-col items-center ${isReverse ? 'rotate-180' : ''}`}>
                            <div className="bg-[#10b981] text-[#0a1221] px-3 py-0.5 rounded-full text-[9px] font-black whitespace-nowrap shadow-xl animate-pulse tracking-wider">
                              {step.label}
                            </div>
                            <div className="text-[#10b981]/20 text-[9px] font-black whitespace-nowrap scale-y-[-1] blur-[1px] mt-0.5 select-none">
                              {step.label}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* CLEAN LOGIC ENGINE WITH SVG PATHS */
              <div className="relative w-full h-full min-h-[820px]">
                {/* SVG Connections Layer */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
                  {renderLogicPaths()}
                </svg>

                {/* Nodes Layer */}
                {logicSteps.map((node, idx) => {
                  const isActive = activeStep === idx;
                  const isDecision = node.type === 'decision';
                  
                  return (
                    <div 
                      key={node.id} 
                      className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500 cursor-pointer ${isActive ? 'scale-110 z-20' : 'opacity-60 grayscale-[0.4] z-10'}`}
                      style={{ left: `${node.x}%`, top: `${node.y}%` }}
                      onClick={() => { setActiveStep(idx); setIsPaused(true); }}
                    >
                      <div className={`
                        relative flex items-center justify-center text-center
                        ${isDecision ? 'w-24 h-24' : node.type === 'start' ? 'px-6 py-2 rounded-full border-2' : 'w-40 py-3 rounded-xl border-2'}
                        ${isActive ? 'border-[#10b981] bg-[#10b981]/10 shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'border-slate-700 bg-slate-800/80'}
                        ${node.color === 'blue' ? 'border-blue-500/50' : ''}
                        ${node.color === 'emerald' ? 'border-emerald-500/50' : ''}
                      `}>
                        {isDecision && (
                          <div className={`absolute inset-0 rotate-45 border-2 transition-all ${isActive ? 'border-[#10b981] bg-[#10b981]/20 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'border-slate-700 bg-slate-900/90 shadow-inner'}`} />
                        )}

                        <div className="relative z-10 flex flex-col items-center">
                          <span className={`text-[9px] font-black tracking-widest uppercase leading-tight ${isActive ? 'text-white' : 'text-slate-400'}`}>
                            {node.label}
                          </span>
                          {isActive && (
                            <div className="flex items-center gap-1 mt-1">
                              <Play size={8} className="fill-teal-400 text-teal-400" />
                              <span className="text-[7px] text-teal-400 font-bold animate-pulse">PROCESSING</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Bottom Status Bar */}
            <div className="flex justify-between items-center pt-6 border-t border-slate-800/50 mt-auto z-30">
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_5px_#3b82f6]" />
                  <span className="text-[9px] font-bold text-slate-500 tracking-widest uppercase">AES-256 TLS 1.2+</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_#10b981]" />
                  <span className="text-[9px] font-bold text-slate-500 tracking-widest uppercase">CIM Vault Security</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Lock size={12} className="opacity-50" />
                <span className="text-[9px] font-bold tracking-widest uppercase">PCI-DSS COMPLIANT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Interaction Panel */}
        <div className="lg:col-span-4 space-y-4">
          

          <div className="bg-[#111c30]/50 backdrop-blur-md rounded-3xl border border-slate-800 p-5 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-[10px] tracking-[0.2em] text-slate-500 uppercase">
                {view === 'sequence' ? 'Event Lifecycle' : 'Logic Flow Tracing'}
              </h3>
              <button onClick={() => setIsPaused(!isPaused)} className="text-[9px] font-black text-teal-400 border border-teal-500/30 px-2 py-0.5 rounded uppercase hover:bg-teal-500/10 transition-colors">
                {isPaused ? 'Resume' : 'Pause'}
              </button>
            </div>

            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
              {currentSteps.map((step, idx) => (
                <div 
                  key={step.id}
                  onClick={() => { setActiveStep(idx); setIsPaused(true); }}
                  className={`group relative p-3 rounded-xl border transition-all duration-500 cursor-pointer overflow-hidden ${
                    activeStep === idx 
                      ? 'bg-gradient-to-r from-blue-600/10 to-emerald-600/10 border-[#10b981]/50 shadow-lg shadow-emerald-500/10' 
                      : 'bg-slate-800/20 border-slate-800 hover:border-slate-700 opacity-60'
                  }`}
                >
                  {activeStep === idx && !isPaused && (
                    <div className="absolute bottom-0 left-0 h-[1.5px] bg-teal-500 animate-progress" />
                  )}

                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-lg flex items-center justify-center text-[9px] font-black ${
                      activeStep === idx ? 'bg-teal-500 text-slate-900 shadow-[0_0_10px_rgba(20,184,166,0.5)]' : 'bg-slate-800 text-slate-500'
                    }`}>
                      {view === 'sequence' ? idx + 1 : step.id}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className={`text-[10px] font-black tracking-wider uppercase ${activeStep === idx ? 'text-teal-400' : 'text-slate-300'}`}>
                          {step.label}
                        </span>
                        {activeStep === idx && <Zap size={10} className="text-teal-400 animate-pulse" />}
                      </div>
                      <p className="text-[10px] text-slate-500 leading-tight">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#10b981]/10 to-transparent border border-[#10b981]/20 rounded-3xl p-5 flex items-center gap-4">
            <div className="p-2.5 bg-[#10b981]/20 rounded-xl text-[#10b981]">
              <AlertCircle size={20} />
            </div>
            <div>
              <h4 className="text-[10px] font-black tracking-widest uppercase mb-0.5">Automation Guard</h4>
              <p className="text-[9px] text-slate-500 leading-tight">Batch worker includes collision detection and automatic lock release for crashed threads.</p>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-progress {
          animation: progress 4s linear infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 10px;
        }
      `}} />
    </div>
  );
};

export default App;