import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Zap, 
  RefreshCcw, 
  ShoppingCart, 
  ChevronRight, 
  Lock, 
  Database, 
  ArrowRight, 
  CheckCircle2, 
  Menu, 
  X,
  CreditCard,
  Layers,
  FileText,
  Mail,
  Phone,
  Server,
  Code
} from 'lucide-react';
import PaymentManage from './components/PaymentManage';
import EmailSetupHelp from './components/EmailSetupHelp';

const App = () => {
  const [activePage, setActivePage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('paymentupdate')) {
      setActivePage('payment');
    } else if (path.includes('emailsetup')) {
      setActivePage('emailsetup');
    }
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = (page) => {
    setActivePage(page);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  // --- Shared Components ---
  const Header = () => (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('home')}>
          <div className="bg-teal-500 p-1.5 rounded-lg">
            <CreditCard className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">ClickPay<span className="text-teal-400">.</span></span>
        </div>

        <div className="hidden lg:flex items-center space-x-8 text-sm font-medium text-slate-300">
          <button onClick={() => navigate('features')} className="hover:text-teal-400 transition-colors">Features</button>
          <button onClick={() => navigate('integration')} className="hover:text-teal-400 transition-colors">SAP B1</button>
          <button onClick={() => navigate('magento')} className="hover:text-teal-400 transition-colors">Magento</button>
          <button onClick={() => navigate('migration')} className="hover:text-teal-400 transition-colors">Migration</button>
          <button onClick={() => navigate('security')} className="hover:text-teal-400 transition-colors">Security</button>
          <button onClick={() => navigate('pricing')} className="hover:text-teal-400 transition-colors">Pricing</button>
        </div>

        <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-slate-900 border-t border-slate-800 p-6 flex flex-col space-y-4 shadow-2xl">
          <button onClick={() => navigate('features')} className="text-left py-2 text-slate-300 border-b border-slate-800">Features</button>
          <button onClick={() => navigate('integration')} className="text-left py-2 text-slate-300 border-b border-slate-800">SAP Integration</button>
          <button onClick={() => navigate('magento')} className="text-left py-2 text-slate-300 border-b border-slate-800">Magento</button>
          <button onClick={() => navigate('migration')} className="text-left py-2 text-slate-300 border-b border-slate-800">Migration</button>
          <button onClick={() => navigate('security')} className="text-left py-2 text-slate-300 border-b border-slate-800">Security</button>
          <button onClick={() => navigate('pricing')} className="text-left py-2 text-slate-300">Pricing</button>
        </div>
      )}
    </nav>
  );

  const Footer = () => (
    <footer className="bg-slate-950 text-slate-400 py-16 px-6 border-t border-slate-900">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <CreditCard className="text-teal-500 w-6 h-6" />
            <span className="text-xl font-bold text-white">ClickPay.</span>
          </div>
          <p className="text-sm leading-relaxed">
            Enterprise-grade Authorize.Net payment integration specifically designed for SAP Business One ecosystems.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Solution</h4>
          <ul className="space-y-2 text-sm">
            <li><button onClick={() => navigate('features')} className="hover:text-teal-400">Core Features</button></li>
            <li><button onClick={() => navigate('integration')} className="hover:text-teal-400">SAP B1 SQL & HANA</button></li>
            <li><button onClick={() => navigate('magento')} className="hover:text-teal-400">Magento Plugin</button></li>
            <li><button onClick={() => navigate('security')} className="hover:text-teal-400">Security & PCI</button></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li><button onClick={() => navigate('home')} className="hover:text-teal-400">Documentation</button></li>
            <li><button onClick={() => navigate('home')} className="hover:text-teal-400">FAQ</button></li>
            <li><button onClick={() => navigate('migration')} className="hover:text-teal-400">Migration Guide</button></li>
          </ul>
        </div>
        
      </div>
    </footer>
  );

  // --- Page Sections ---

  const Home = () => (
    <div className="animate-in fade-in duration-500">
      <section className="pt-40 pb-24 px-6 relative overflow-hidden bg-slate-900">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-teal-500/10 blur-[120px] rounded-full -z-10"></div>
        <div className="container mx-auto text-center max-w-5xl">
          <div className="inline-flex items-center space-x-2 bg-slate-800 border border-slate-700 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
            <span className="text-xs font-medium text-slate-300 uppercase tracking-wider">Product Overview & Technical Specification</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-8">
            Enterprise-Grade <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Authorize.Net Integration</span> for SAP Business One
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
            Native pre-authorization, capture, refund, and tokenization—fully embedded in SAP B1. Reduce PCI scope with secure Customer Information Management (CIM).
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button onClick={() => navigate('features')} className="bg-teal-600 hover:bg-teal-500 text-white font-bold px-8 py-4 rounded-xl flex items-center shadow-2xl transition-all w-full sm:w-auto justify-center">
              Explore Capabilities <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button onClick={() => navigate('integration')} className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-8 py-4 rounded-xl border border-slate-700 transition-all w-full sm:w-auto justify-center">
              Technical Architecture
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-950 px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Database />, title: "Native SAP Integration", desc: "No middleware. Integrated directly into SAP B1 logic using UDOs and the system transaction flow." },
            { icon: <Lock />, title: "Zero Card Data Storage", desc: "Reduce PCI DSS scope. Sensitive card data is tokenized and stored in Authorize.Net's secure CIM vaults." },
            { icon: <Zap />, title: "Pre-Auth Automation", desc: "Manage sales order auth expiration, re-auth logic, and partial captures on delivery automatically." }
          ].map((item, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-teal-500/50 transition-colors group">
              <div className="text-teal-400 mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const Features = () => (
    <div className="pt-32 pb-24 px-6 animate-in fade-in duration-500 bg-slate-900">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Designed for Enterprise Complexity</h1>
        <p className="text-slate-400 text-lg mb-12">ClickPay handles the specific, high-friction scenarios of B2B commerce directly inside your ERP.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-slate-800/50 p-10 rounded-3xl border border-slate-700">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center"><Zap className="mr-3 text-teal-400" /> Pre-Authorization</h3>
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-start"><CheckCircle2 className="text-teal-500 mr-2 shrink-0" /> Auth-Only logic: Lock funds at order entry.</li>
              <li className="flex items-start"><CheckCircle2 className="text-teal-500 mr-2 shrink-0" /> Expiration tracking based on processor-specific rules.</li>
              <li className="flex items-start"><CheckCircle2 className="text-teal-500 mr-2 shrink-0" /> Intelligent re-authorization for aging sales orders.</li>
            </ul>
          </div>
          <div className="bg-slate-800/50 p-10 rounded-3xl border border-slate-700">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center"><Layers className="mr-3 text-blue-400" /> Invoice & Capture</h3>
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-start"><CheckCircle2 className="text-blue-500 mr-2 shrink-0" /> Prior-Auth Capture: Single-click settlement on A/R Invoice.</li>
              <li className="flex items-start"><CheckCircle2 className="text-blue-500 mr-2 shrink-0" /> Level 3 Data: Qualify for lower interchange rates automatically.</li>
              <li className="flex items-start"><CheckCircle2 className="text-blue-500 mr-2 shrink-0" /> Partial captures support for multi-warehouse split shipments.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const Integration = () => (
    <div className="pt-32 pb-24 px-6 animate-in fade-in duration-500 bg-slate-900">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-extrabold text-white mb-6">Architectural Overview</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mt-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-teal-400 mb-4 flex items-center"><Server className="mr-2" /> Database Layer</h3>
              <p className="text-slate-400 leading-relaxed">ClickPay supports both Microsoft SQL Server and SAP HANA. We utilize User Defined Objects (UDO) to store configuration and transaction metadata safely within your company database.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-teal-400 mb-4 flex items-center"><Code className="mr-2" /> Native SDK Integration</h3>
              <p className="text-slate-400 leading-relaxed">The add-on is built on the SAP Business One SDK, respecting the DI-API and Service Layer protocols for data integrity and performance.</p>
            </div>
            <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700">
              <h4 className="text-white font-bold mb-2">Technical Summary</h4>
              <ul className="text-xs text-slate-400 space-y-2">
                <li>• Unified experience for SQL & HANA versions</li>
                <li>• No third-party API middle-men</li>
                <li>• Supports multi-currency business partners</li>
                <li>• Immutable transaction audit logging</li>
              </ul>
            </div>
          </div>
          <div className="bg-slate-950 p-8 rounded-3xl border border-slate-800 shadow-2xl">
             <div className="text-xs font-mono text-teal-400 space-y-1 overflow-x-auto">
                <p className="opacity-50">// ClickPay Transaction Flow</p>
                <p>POST /v1/payment/authorization {'{ "amount": 1250.00 }'}</p>
                <p className="text-white">{"<"}--- Response: Approved (AuthID: 99120) ---</p>
                <p className="text-slate-500">Writing result to SAP UDO @CLICK_PAY_LOG...</p>
                <p className="text-teal-500">Sales Order 1022 updated with TokenID: CIM_8822</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );

  const Magento = () => (
    <div className="pt-32 pb-24 px-6 animate-in fade-in duration-500 bg-slate-950">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
             <h1 className="text-4xl font-extrabold text-white mb-6">Magento Plugin</h1>
             <p className="text-slate-400 text-lg leading-relaxed mb-6">Seamlessly bridge the gap between eCommerce checkout and back-office fulfillment.</p>
             <ul className="space-y-4 text-slate-300">
                <li className="flex items-start"><CheckCircle2 className="text-orange-500 mr-2 shrink-0" /> Capture on shipment logic inside SAP B1.</li>
                <li className="flex items-start"><CheckCircle2 className="text-orange-500 mr-2 shrink-0" /> Replicate legacy omnichannel workflows.</li>
                <li className="flex items-start"><CheckCircle2 className="text-orange-500 mr-2 shrink-0" /> Custom plugin ensures Auth.Net token consistency.</li>
             </ul>
          </div>
          <div className="bg-slate-900 p-8 rounded-3xl border border-orange-500/20 shadow-xl">
             <ShoppingCart className="w-16 h-16 text-orange-500 mb-4" />
             <p className="text-xs font-bold text-white uppercase tracking-widest">Magento 2</p>
          </div>
        </div>
      </div>
    </div>
  );

  const Migration = () => (
    <div className="pt-32 pb-24 px-6 animate-in fade-in duration-500 bg-slate-950">
      <div className="container mx-auto max-w-5xl text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Modernize Your Legacy Payments</h1>
        <p className="text-slate-400 text-lg mb-12">Upgrade your SAP Business One payments without losing your existing customer profiles.</p>
        <div className="bg-slate-900 p-12 rounded-3xl border border-slate-800 grid grid-cols-1 md:grid-cols-4 gap-8">
           {[
             { n: "1", t: "Identify", d: "Map legacy IDs to SAP Master Data" },
             { n: "2", t: "Onboard", d: "Send secure links to clients" },
             { n: "3", t: "Sync", d: "Create secure CIM profiles" },
             { n: "4", t: "Live", d: "Linked and ready for processing" }
           ].map((step, i) => (
             <div key={i}>
                <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto mb-4 text-teal-400 font-bold">{step.n}</div>
                <h4 className="text-white font-bold mb-2 uppercase text-xs tracking-widest">{step.t}</h4>
                <p className="text-[11px] text-slate-500">{step.d}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );

  const Security = () => (
    <div className="pt-32 pb-24 px-6 animate-in fade-in duration-500 bg-slate-900">
       <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <ShieldCheck className="w-16 h-16 text-teal-400 mx-auto mb-6" />
            <h1 className="text-4xl font-extrabold text-white mb-4">Security & Compliance</h1>
            <p className="text-slate-400 italic">ClickPay never stores full credit card numbers or CVV in SAP Business One.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
                <h4 className="text-white font-bold mb-3">PCI Scope Reduction</h4>
                <p className="text-sm text-slate-400 leading-relaxed">By utilizing Authorize.Net's Hosted Profile pages, sensitive data never touches your network, drastically lowering audit complexity.</p>
             </div>
             <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
                <h4 className="text-white font-bold mb-3">Tokenized Vaulting</h4>
                <p className="text-sm text-slate-400 leading-relaxed">Customer profiles are vaulted in the Authorize.Net CIM, providing secure access via alphanumeric tokens.</p>
             </div>
          </div>
       </div>
    </div>
  );

  const Pricing = () => (
    <div className="pt-32 pb-24 px-6 animate-in fade-in duration-500 bg-slate-900">
       <div className="container mx-auto text-center max-w-5xl">
          <h1 className="text-4xl font-extrabold text-white mb-6">Commercial Tiers</h1>
          <p className="text-slate-400 text-lg mb-12">Flexible structures for end-users and SAP Value-Added Resellers.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
             <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
                <h4 className="text-white font-bold text-xl mb-4">Standard</h4>
                <p className="text-xs text-slate-400 mb-6">Core SAP Add-on for SQL or HANA.</p>
                <ul className="text-sm text-slate-300 space-y-2">
                   <li>• One-time implementation</li>
                   <li>• Core Auth/Capture flows</li>
                   <li>• Standard Maintenance</li>
                </ul>
             </div>
             <div className="bg-slate-800 p-8 rounded-2xl border-2 border-teal-500 relative">
                <div className="absolute -top-3 right-6 bg-teal-500 text-white text-[10px] px-2 py-1 rounded font-bold uppercase">Enterprise</div>
                <h4 className="text-white font-bold text-xl mb-4">Omnichannel</h4>
                <p className="text-xs text-slate-400 mb-6">Everything in Standard plus Magento plugin.</p>
                <ul className="text-sm text-slate-300 space-y-2">
                   <li>• Magento 2 Extension</li>
                   <li>• Advanced Migration Support</li>
                   <li>• Priority Technical Support</li>
                </ul>
             </div>
        
          </div>
       </div>
    </div>
  );

  const renderPage = () => {
    switch(activePage) {
      case 'features': return <Features />;
      case 'integration': return <Integration />;
      case 'magento': return <Magento />;
      case 'migration': return <Migration />;
      case 'security': return <Security />;
      case 'pricing': return <Pricing />;
      case 'payment': return <PaymentManage />;
      case 'emailsetup': return <EmailSetupHelp />;
      default: return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      <Header />
      {/* If it's the payment page, we might want to hide the footer/header for a cleaner look */}
      {renderPage()}
      {activePage !== 'payment' && <Footer />}
    </div>
  );
};

export default App;