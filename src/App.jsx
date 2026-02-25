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
  Phone
} from 'lucide-react';

const App = () => {
  const [activePage, setActivePage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
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
          <button 
            onClick={() => navigate('contact')}
            className="bg-teal-600 hover:bg-teal-500 text-white px-5 py-2.5 rounded-full transition-all shadow-lg"
          >
            Book Demo
          </button>
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
          <button onClick={() => navigate('contact')} className="text-teal-400 font-bold py-2">Book a Demo</button>
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
            <li><button onClick={() => navigate('contact')} className="hover:text-teal-400">Partner Program</button></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Contact</h4>
          <p className="text-sm mb-2">Ready to streamline your payments?</p>
          <button onClick={() => navigate('contact')} className="text-teal-400 border border-teal-400/30 hover:bg-teal-400/10 px-4 py-2 rounded-lg text-sm transition-all">
            Schedule a Strategy Call
          </button>
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
            <span className="text-xs font-medium text-slate-300 uppercase tracking-wider">New: Optimized Legacy Migration Pathway</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-8">
            Enterprise-Grade <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Authorize.Net Integration</span> for SAP Business One
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
            Native pre-authorization, capture, refund, and tokenization—fully embedded in SAP B1. Reduce PCI scope with secure Customer Information Management (CIM).
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button onClick={() => navigate('contact')} className="bg-teal-600 hover:bg-teal-500 text-white font-bold px-8 py-4 rounded-xl flex items-center shadow-2xl transition-all w-full sm:w-auto justify-center">
              Book a Strategy Demo <ChevronRight className="ml-2 w-5 h-5" />
            </button>
            <button onClick={() => navigate('integration')} className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-8 py-4 rounded-xl border border-slate-700 transition-all w-full sm:w-auto justify-center">
              Request Tech Overview
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-950 px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Database />, title: "Native SAP Integration", desc: "No middleware. Integrated directly into SAP B1 logic using UDOs." },
            { icon: <Lock />, title: "Zero Card Data Storage", desc: "Reduce PCI DSS scope. Sensitive card data is tokenized securely." },
            { icon: <Zap />, title: "Pre-Auth Automation", desc: "Manage sales order auth expiration and re-auth logic automatically." }
          ].map((item, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-teal-500/50 transition-colors">
              <div className="text-teal-400 mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm">{item.desc}</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          <div className="bg-slate-800/50 p-10 rounded-3xl border border-slate-700">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center"><Zap className="mr-3 text-teal-400" /> Pre-Authorization</h3>
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-start"><CheckCircle2 className="text-teal-500 mr-2 shrink-0" /> Lock funds at order entry without immediate settlement.</li>
              <li className="flex items-start"><CheckCircle2 className="text-teal-500 mr-2 shrink-0" /> Automatic re-authorization logic for aging orders.</li>
            </ul>
          </div>
          <div className="bg-slate-800/50 p-10 rounded-3xl border border-slate-700">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center"><Layers className="mr-3 text-blue-400" /> Invoice Capture</h3>
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-start"><CheckCircle2 className="text-blue-500 mr-2 shrink-0" /> Settle funds directly from the A/R Invoice creation process.</li>
              <li className="flex items-start"><CheckCircle2 className="text-blue-500 mr-2 shrink-0" /> Partial captures support for split shipments.</li>
            </ul>
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
             { n: "4", t: "Live", d: "linked and ready for processing" }
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

  const Contact = () => (
    <div className="pt-32 pb-24 px-6 animate-in fade-in duration-500 bg-slate-900">
      <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Book a Strategy Demo</h1>
          <p className="text-slate-400 text-lg mb-10">Consult with technical experts on modernizing your SAP payment environment.</p>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="bg-teal-500/10 p-3 rounded-full text-teal-400"><Mail /></div>
              <div><p className="text-xs text-slate-500 font-bold uppercase">Email Us</p><p className="text-white">sales@clickpay-sap.com</p></div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-teal-500/10 p-3 rounded-full text-teal-400"><Phone /></div>
              <div><p className="text-xs text-slate-500 font-bold uppercase">Call Us</p><p className="text-white">+1 (888) 555-0199</p></div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5" placeholder="Full Name" />
            <input className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5" placeholder="Company Name" />
            <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5">
              <option>SAP B1 SQL</option>
              <option>SAP B1 HANA</option>
            </select>
            <textarea className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5" rows="4" placeholder="Your Message"></textarea>
            <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all">Submit Request</button>
          </form>
        </div>
      </div>
    </div>
  );

  const renderPage = () => {
    switch(activePage) {
      case 'features': return <Features />;
      case 'integration': return <Features />; // Reusing features view for demo
      case 'magento': return <Features />; // Reusing features view for demo
      case 'migration': return <Migration />;
      case 'security': return <Features />;
      case 'pricing': return <Features />;
      case 'contact': return <Contact />;
      default: return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      <Header />
      {renderPage()}
      <Footer />
    </div>
  );
};

export default App;