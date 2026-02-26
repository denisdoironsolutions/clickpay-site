import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle,
  Terminal,
  Mail,
  Lock,
  AlertTriangle,
  Server,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const EmailSetupHelp = () => {
  const [activeTab, setActiveTab] = useState('ms365');

  const TabButton = ({ id, title, icon: Icon, activeColor }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-2 px-6 py-3 rounded-t-xl font-bold transition-all border-b-2 ${
        activeTab === id 
          ? `bg-slate-800 text-white ${activeColor}` 
          : 'text-slate-500 border-transparent hover:text-slate-300'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{title}</span>
    </button>
  );

  return (
    <div className="pt-32 pb-24 px-6 animate-in fade-in duration-500 bg-slate-900">
      <div className="container mx-auto max-w-5xl">
        
        {/* Header */}
        <div className="mb-12 border-b border-slate-800 pb-8">
          <h1 className="text-4xl font-extrabold text-white mb-4">Mail Authentication Setup</h1>
          <p className="text-slate-400 text-lg">
            Configure modern OAuth 2.0 for SAP Business One. Avoid SMTP passwords and comply with modern security standards.
          </p>
        </div>

        {/* Provider Tabs */}
        <div className="flex border-b border-slate-800 mb-8">
          <TabButton id="ms365" title="Microsoft 365" icon={Mail} activeColor="border-teal-500" />
          <TabButton id="gmail" title="Gmail / Workspace" icon={Server} activeColor="border-orange-500" />
        </div>

        {activeTab === 'ms365' ? (
          <div className="space-y-12 animate-in slide-in-from-left-4">
            {/* MS365 Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { 
                  t: "1. App Registration", 
                  d: "Register 'ClickPay Mailer' in Azure App registrations. Use 'Accounts in this directory only'.",
                  tags: ["ClientID", "TenantID"] 
                },
                { 
                  t: "2. Client Secret", 
                  d: "Create a secret in 'Certificates & Secrets'. Copy the VALUE immediately.",
                  tags: ["12-24 Month Expiry"] 
                },
                { 
                  t: "3. API Permissions", 
                  d: "Add Microsoft Graph 'Mail.Send' (Application permission) and Grant Admin Consent.",
                  tags: ["Requires Global Admin"] 
                }
              ].map((step, i) => (
                <div key={i} className="bg-slate-800 border border-slate-700 p-6 rounded-2xl">
                  <h3 className="text-teal-400 font-bold mb-3">{step.t}</h3>
                  <p className="text-sm text-slate-300 mb-4">{step.d}</p>
                  <div className="flex gap-2">
                    {step.tags.map(tag => <span key={tag} className="text-[10px] bg-slate-900 text-slate-500 px-2 py-1 rounded border border-slate-700">{tag}</span>)}
                  </div>
                </div>
              ))}
            </div>

            {/* Common Errors Table */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="bg-slate-900 px-6 py-4 border-b border-slate-800">
                <h4 className="text-white font-bold flex items-center"><AlertTriangle className="w-4 h-4 mr-2 text-yellow-500" /> Common Microsoft Errors</h4>
              </div>
              <table className="w-full text-sm text-left">
                <tbody className="divide-y divide-slate-800">
                  <tr><td className="px-6 py-3 font-mono text-teal-500">401 Unauthorized</td><td className="px-6 py-3 text-slate-400">Wrong ClientSecret or expired secret</td></tr>
                  <tr><td className="px-6 py-3 font-mono text-teal-500">403 Forbidden</td><td className="px-6 py-3 text-slate-400">Mail.Send not granted or no admin consent</td></tr>
                  <tr><td className="px-6 py-3 font-mono text-teal-500">404 User not found</td><td className="px-6 py-3 text-slate-400">SenderEmail mailbox does not exist</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="space-y-12 animate-in slide-in-from-right-4">
            {/* Gmail Steps */}
            <div className="bg-orange-950/10 border border-orange-500/20 p-6 rounded-2xl mb-8">
              <p className="text-orange-400 text-sm flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" /> 
                Standard consumer Gmail accounts are NOT recommended for production business automation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6 text-slate-300 text-sm">
                <div>
                  <h4 className="text-white font-bold mb-2">1. Google Cloud Project</h4>
                  <p>Create a project and enable the <strong>Gmail API</strong> in the Library.</p>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">2. Service Account</h4>
                  <p>Create a Service Account and download the <strong>JSON Key</strong>. This contains your private key.</p>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">3. Domain-Wide Delegation</h4>
                  <p>In Google Admin, authorize the Service Account Client ID with the <code>gmail.send</code> scope.</p>
                </div>
              </div>
              
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
                <h4 className="text-white font-bold mb-4 flex items-center text-sm"><Terminal className="w-4 h-4 mr-2 text-orange-500" /> Gmail CP_SETUP Fields</h4>
                <div className="space-y-4 font-mono text-[11px]">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-500">MailProvider</span>
                    <span className="text-orange-400">GMAIL</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-500">ClientId</span>
                    <span className="text-orange-400 text-right">Service Account ID</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">ClientSecret</span>
                    <span className="text-orange-400 text-right">Encrypted Private Key</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Shared Bottom Content */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 border-t border-slate-800 pt-12">
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center"><Lock className="w-5 h-5 mr-2 text-teal-500" /> Security Best Practices</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-teal-500 mr-3 shrink-0" /> Never store secrets in plain text. Use DPAPI encryption.</li>
              <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-teal-500 mr-3 shrink-0" /> Set secret expiry reminders (12-24 months).</li>
              <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-teal-500 mr-3 shrink-0" /> Restrict permissions to Mail.Send only.</li>
              <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-teal-500 mr-3 shrink-0" /> Use a dedicated mailbox (billing@) rather than a personal account.</li>
            </ul>
          </div>

          <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-4 italic">Recommendation</h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              For commercial SAP Business One deployments, <strong>Microsoft 365 (Graph API)</strong> is the preferred provider due to easier admin management and superior long-term support for App-to-App authentication.
            </p>
            <div className="flex items-center text-xs font-bold text-teal-400 uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4 mr-2" /> Enterprise Ready
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EmailSetupHelp;