import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Zap,
  ShoppingCart,
  Lock,
  Database,
  ArrowRight,
  CheckCircle2,
  Menu,
  X,
  CreditCard,
  Layers,
  Server,
  Code,
  Terminal, 
  Scale, 
  HardDrive, 
  DollarSign,
  Shield,
  Cpu
} from 'lucide-react';

import PaymentManage from './components/PaymentManage';
import EmailSetupHelp from './components/EmailSetupHelp';
import WorkFlow from './components/workflow_diagram';

const App = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const Header = () => (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <div className="bg-teal-500 p-1.5 rounded-lg">
            <CreditCard className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">
            ClickPay<span className="text-teal-400">.</span>
          </span>
        </div>

        <div className="hidden lg:flex items-center space-x-8 text-sm font-medium text-slate-300">
          <button onClick={() => navigate('/features')}>Features</button>
          <button onClick={() => navigate('/integration')}>SAP B1</button>
          <button onClick={() => navigate('/workflow')}>Workflows</button>
          <button onClick={() => navigate('/magento')}>Magento</button>
          <button onClick={() => navigate('/migration')}>Migration</button>
          <button onClick={() => navigate('/security')}>Security</button>
          <button onClick={() => navigate('/pricing')}>Pricing</button>
        </div>

        <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
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
            <li><button onClick={() => navigate('/features')} className="hover:text-teal-400">Core Features</button></li>
            <li><button onClick={() => navigate('/integration')} className="hover:text-teal-400">SAP B1 SQL & HANA</button></li>
            <li><button onClick={() => navigate('/magento')} className="hover:text-teal-400">Magento Plugin</button></li>
            <li><button onClick={() => navigate('/security')} className="hover:text-teal-400">Security & PCI</button></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li><button onClick={() => navigate('/home')} className="hover:text-teal-400">Documentation</button></li>
            <li><button onClick={() => navigate('/home')} className="hover:text-teal-400">FAQ</button></li>
            <li><button onClick={() => navigate('/migration')} className="hover:text-teal-400">Migration Guide</button></li>
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
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
        Built for Enterprise Revenue Operations
      </h1>
      <p className="text-slate-400 text-lg mb-12">
        ClickPay streamlines B2B payment workflows inside SAP Business One — helping protect revenue, reduce payment friction, and automate key payment operations directly within the ERP.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* PRE-AUTH */}
        <div className="bg-slate-800/50 p-10 rounded-3xl border border-slate-700">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Zap className="mr-3 text-teal-400" /> Revenue Protection
          </h3>
          <ul className="space-y-4 text-slate-300">
            <li className="flex items-start">
              <CheckCircle2 className="text-teal-500 mr-2 shrink-0" />
              Secure payment authorization at order entry using intelligent pre-authorization workflows.
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="text-teal-500 mr-2 shrink-0" />
              Helps prevent fulfillment of orders with expired or insufficient authorizations.
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="text-teal-500 mr-2 shrink-0" />
              Supports automated re-authorization for long fulfillment cycles and backorders.
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="text-teal-500 mr-2 shrink-0" />
              Reduces failed captures caused by expired authorization holds.
            </li>
          </ul>
        </div>

        {/* CAPTURE */}
        <div className="bg-slate-800/50 p-10 rounded-3xl border border-slate-700">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Layers className="mr-3 text-blue-400" /> Automated Cash Collection
          </h3>
          <ul className="space-y-4 text-slate-300">
            <li className="flex items-start">
              <CheckCircle2 className="text-blue-500 mr-2 shrink-0" />
              Supports automatic capture of payments when invoices are created.
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="text-blue-500 mr-2 shrink-0" />
              Designed for complex fulfillment scenarios including partial shipments and multi-warehouse orders.
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="text-blue-500 mr-2 shrink-0" />
              Reduces manual payment handling for finance teams.
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="text-blue-500 mr-2 shrink-0" />
              Helps accelerate cash collection by capturing funds at shipment.
            </li>
          </ul>
        </div>

        {/* COST REDUCTION */}
        <div className="bg-slate-800/50 p-10 rounded-3xl border border-slate-700">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <DollarSign className="mr-3 text-green-400" /> Lower Payment Processing Costs
          </h3>
          <ul className="space-y-4 text-slate-300">
            <li className="flex items-start">
              <CheckCircle2 className="text-green-500 mr-2 shrink-0" />
              Level 3 transaction data can be included automatically to help qualify for lower interchange rates where supported.
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="text-green-500 mr-2 shrink-0" />
              Reduces the likelihood of duplicate authorizations and unnecessary gateway fees.
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="text-green-500 mr-2 shrink-0" />
              Optimizes authorization and capture timing to improve payment efficiency.
            </li>
          </ul>
        </div>

        {/* FINANCIAL CONTROLS */}
        <div className="bg-slate-800/50 p-10 rounded-3xl border border-slate-700">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Shield className="mr-3 text-purple-400" /> Financial Controls & Auditability
          </h3>
          <ul className="space-y-4 text-slate-300">
            <li className="flex items-start">
              <CheckCircle2 className="text-purple-500 mr-2 shrink-0" />
              Maintains a detailed audit trail of authorizations, captures, refunds, and voids.
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="text-purple-500 mr-2 shrink-0" />
              Helps prevent duplicate captures and common payment processing errors.
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="text-purple-500 mr-2 shrink-0" />
              Supports approval workflows for large or high-risk transactions.
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="text-purple-500 mr-2 shrink-0" />
              Includes safeguards designed to handle gateway failures and retry scenarios.
            </li>
          </ul>
        </div>

        {/* ERP INTEGRATION */}
        <div className="bg-slate-800/50 p-10 rounded-3xl border border-slate-700">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Database className="mr-3 text-orange-400" /> Native SAP Integration
          </h3>
          <ul className="space-y-4 text-slate-300">
            <li className="flex items-start">
              <CheckCircle2 className="text-orange-500 mr-2 shrink-0" />
              Embedded directly into SAP Business One workflows.
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="text-orange-500 mr-2 shrink-0" />
              Eliminates the need for external payment portals or disconnected systems.
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="text-orange-500 mr-2 shrink-0" />
              Works with Sales Orders, Deliveries, and A/R Invoices.
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="text-orange-500 mr-2 shrink-0" />
              Provides real-time payment visibility within the ERP.
            </li>
          </ul>
        </div>

        {/* OPERATIONS */}
        <div className="bg-slate-800/50 p-10 rounded-3xl border border-slate-700">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Cpu className="mr-3 text-cyan-400" /> Automated Payment Operations
          </h3>
          <ul className="space-y-4 text-slate-300">
            <li className="flex items-start">
              <CheckCircle2 className="text-cyan-500 mr-2 shrink-0" />
              Background worker processes captures and retry operations automatically.
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="text-cyan-500 mr-2 shrink-0" />
              Designed to recover from gateway interruptions or temporary ERP issues.
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="text-cyan-500 mr-2 shrink-0" />
              Provides centralized monitoring of payment activity.
            </li>
          </ul>
        </div>

      </div>
    </div>

    <ClickPayShowcase />
  </div>
);

  const Integration = () => (
  <div className="pt-32 pb-24 px-6 animate-in fade-in duration-500 bg-slate-900">
    <div className="container mx-auto max-w-6xl">
      <h1 className="text-4xl font-extrabold text-white mb-6">
        Architectural Overview
      </h1>

      <p className="text-slate-400 max-w-3xl leading-relaxed">
        ClickPay is designed as a native SAP Business One extension that integrates
        directly with ERP workflows while maintaining clear separation between
        payment processing, transaction logging, and financial document management.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mt-12">

        {/* LEFT COLUMN */}
        <div className="space-y-10">

          {/* DATABASE */}
          <div>
            <h3 className="text-xl font-bold text-teal-400 mb-4 flex items-center">
              <Server className="mr-2" /> Database Layer
            </h3>
            <p className="text-slate-400 leading-relaxed">
              ClickPay operates directly within the SAP Business One company
              database. Configuration and transaction metadata are stored using
              User Defined Tables and User Defined Objects, ensuring that payment
              state remains fully visible within the ERP environment.
            </p>
          </div>

          {/* SDK */}
          <div>
            <h3 className="text-xl font-bold text-teal-400 mb-4 flex items-center">
              <Code className="mr-2" /> Native SAP SDK Integration
            </h3>
            <p className="text-slate-400 leading-relaxed">
              The add-on is implemented using the SAP Business One SDK,
              interacting with both the UI API and DI API to integrate with
              Sales Orders, Deliveries, and A/R Invoices while preserving
              SAP's transaction lifecycle and document validation rules.
            </p>
          </div>

          {/* PAYMENT PROCESSING */}
          <div>
            <h3 className="text-xl font-bold text-teal-400 mb-4 flex items-center">
              <Shield className="mr-2" /> Secure Payment Processing
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Payment authorization and capture operations are performed through
              the payment gateway using tokenized customer payment profiles.
              ClickPay does not store raw card data within the ERP database.
            </p>
          </div>

          {/* RELIABILITY */}
          <div>
            <h3 className="text-xl font-bold text-teal-400 mb-4 flex items-center">
              <Cpu className="mr-2" /> Background Processing
            </h3>
            <p className="text-slate-400 leading-relaxed">
              A background processing worker coordinates capture attempts,
              retries, and reconciliation tasks to reduce the risk of duplicate
              gateway transactions and improve operational resilience.
            </p>
          </div>

          {/* SUMMARY */}
          <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700">
            <h4 className="text-white font-bold mb-3">Technical Summary</h4>
            <ul className="text-xs text-slate-400 space-y-2">
              <li>• Compatible with Microsoft SQL Server and SAP HANA deployments</li>
              <li>• Uses SAP User Defined Objects for configuration and logging</li>
              <li>• Tokenized payment profiles handled by the payment gateway</li>
              <li>• Immutable transaction logging for auditability</li>
              <li>• Supports multi-currency SAP Business Partners</li>
              <li>• Designed to operate entirely within the SAP Business One client</li>
            </ul>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="bg-slate-950 p-8 rounded-3xl border border-slate-800 shadow-2xl">
          <div className="text-xs font-mono text-teal-400 space-y-2 overflow-x-auto">

            <p className="opacity-50">// ClickPay Transaction Flow</p>

            <p className="text-slate-400">
              SAP Sales Order Created
            </p>

            <p>
              → Authorize.Net AUTH_ONLY request
            </p>

            <p className="text-white">
              {"<"}-- Authorization Approved (TransID: 99120)
            </p>

            <p className="text-slate-500">
              Logging transaction in @CP_TX_LOG
            </p>

            <p className="text-slate-400">
              SAP A/R Invoice Generated
            </p>

            <p>
              → PRIOR_AUTH_CAPTURE request
            </p>

            <p className="text-white">
              {"<"}-- Capture Successful
            </p>

            <p className="text-teal-500">
              Payment state updated in SAP document
            </p>

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

      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
        Secure Customer Payment Onboarding
      </h1>

      <p className="text-slate-400 text-lg mb-12">
        Transition customers to secure payment profiles through a guided onboarding process without handling sensitive card data inside SAP.
      </p>

      <div className="bg-slate-900 p-12 rounded-3xl border border-slate-800 grid grid-cols-1 md:grid-cols-4 gap-8">

        {[
          { n: "1", t: "Invite", d: "Send secure onboarding links to customer contacts." },
          { n: "2", t: "Verify", d: "Customers access a secure onboarding portal." },
          { n: "3", t: "Enroll", d: "Payment profiles created through Authorize.Net hosted forms." },
          { n: "4", t: "Sync", d: "Profiles automatically linked to SAP Business Partners." }
        ].map((step, i) => (
          <div key={i}>
            <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto mb-4 text-teal-400 font-bold">
              {step.n}
            </div>
            <h4 className="text-white font-bold mb-2 uppercase text-xs tracking-widest">
              {step.t}
            </h4>
            <p className="text-[11px] text-slate-500">
              {step.d}
            </p>
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

        <h1 className="text-4xl font-extrabold text-white mb-4">
          Security & Compliance Architecture
        </h1>

        <p className="text-slate-400 italic max-w-2xl mx-auto">
          ClickPay is designed so sensitive card data is handled only by the payment gateway. 
          Full credit card numbers and CVV values are never stored inside SAP Business One.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
          <h4 className="text-white font-bold mb-3">
            PCI Scope Reduction
          </h4>

          <p className="text-sm text-slate-400 leading-relaxed">
            ClickPay utilizes Authorize.Net hosted payment forms and customer profiles, 
            allowing sensitive card data to be entered directly into the payment gateway. 
            This architecture helps reduce PCI scope for SAP environments by avoiding the 
            storage or transmission of raw card data within the ERP system.
          </p>
        </div>

        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
          <h4 className="text-white font-bold mb-3">
            Tokenized Payment Profiles
          </h4>

          <p className="text-sm text-slate-400 leading-relaxed">
            Customer payment methods are stored securely within the Authorize.Net 
            Customer Information Manager (CIM). ClickPay interacts with these profiles 
            using gateway-issued tokens rather than raw card data.
          </p>
        </div>

        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
          <h4 className="text-white font-bold mb-3">
            Secure Transaction Logging
          </h4>

          <p className="text-sm text-slate-400 leading-relaxed">
            Payment activity is recorded in SAP using transaction metadata such as 
            authorization IDs, status codes, and timestamps. Sensitive payment data 
            is not written to the ERP database.
          </p>
        </div>

        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
          <h4 className="text-white font-bold mb-3">
            Gateway-Based Payment Processing
          </h4>

          <p className="text-sm text-slate-400 leading-relaxed">
            Authorization and capture operations are performed through the payment 
            gateway using tokenized customer profiles, allowing SAP Business One to 
            coordinate payments without directly handling cardholder data.
          </p>
        </div>

      </div>

    </div>
  </div>
);

  const Pricing = () => (
  <div className="pt-32 pb-24 px-6 animate-in fade-in duration-500 bg-slate-900">
    <div className="container mx-auto text-center max-w-5xl">

      <h1 className="text-4xl font-extrabold text-white mb-6">
        Commercial Model
      </h1>

      <p className="text-slate-400 text-lg mb-12">
        ClickPay is licensed as a SAP Business One add-on with flexible deployment options for end users and SAP Value-Added Resellers.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">

        {/* CORE ADDON */}
        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
          <h4 className="text-white font-bold text-xl mb-4">
            Core Add-On
          </h4>

          <p className="text-xs text-slate-400 mb-6">
            Native SAP Business One payment integration.
          </p>

          <ul className="text-sm text-slate-300 space-y-2">
            <li>• Sales Order authorization workflows</li>
            <li>• Invoice-based payment capture</li>
            <li>• Secure tokenized payment profiles</li>
            <li>• Transaction logging and reconciliation</li>
            <li>• Compatible with SQL Server and SAP HANA</li>
          </ul>
        </div>

        {/* ENTERPRISE */}
        <div className="bg-slate-800 p-8 rounded-2xl border-2 border-teal-500 relative">

          <div className="absolute -top-3 right-6 bg-teal-500 text-white text-[10px] px-2 py-1 rounded font-bold uppercase">
            Enterprise
          </div>

          <h4 className="text-white font-bold text-xl mb-4">
            Omnichannel
          </h4>

          <p className="text-xs text-slate-400 mb-6">
            Extends ClickPay across ERP and ecommerce workflows.
          </p>

          <ul className="text-sm text-slate-300 space-y-2">
            <li>• Magento integration options</li>
            <li>• Shared payment profiles across channels</li>
            <li>• Order-to-payment reconciliation</li>
            <li>• Advanced onboarding and migration support</li>
            <li>• Priority technical support</li>
          </ul>
        </div>

        {/* IMPLEMENTATION */}
        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
          <h4 className="text-white font-bold text-xl mb-4">
            Implementation
          </h4>

          <p className="text-xs text-slate-400 mb-6">
            Delivered through SAP Business One partners.
          </p>

          <ul className="text-sm text-slate-300 space-y-2">
            <li>• Gateway configuration</li>
            <li>• Payment workflow setup</li>
            <li>• Customer payment onboarding</li>
            <li>• Migration planning and validation</li>
            <li>• End-user training</li>
          </ul>
        </div>

      </div>

      <p className="text-xs text-slate-500 mt-12 max-w-xl mx-auto">
        Payment processing fees are billed directly by the payment gateway and merchant processor. 
        ClickPay licensing and implementation services are provided separately through authorized partners.
      </p>

    </div>
  </div>
);

  /**
   * ClickPay Marketing Showcase Section
   * Use these components inside your main landing page.
   * Includes designated placeholders for screenshots and ROI breakdowns.
   */

  const ROIStat = ({ label, value }) => (
    <div className="flex flex-col border-l-2 border-teal-500/30 pl-4 py-1">
      <span className="text-teal-400 font-black text-xl leading-none">{value}</span>
      <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mt-1">{label}</span>
    </div>
  );

  const MarketingShowcase = ({
  title,
  subtitle,
  icon,
  features,
  roi,
  imageSrc,
  reversed = false
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className={`flex flex-col ${
          reversed ? "lg:flex-row-reverse" : "lg:flex-row"
        } items-center gap-16 py-20 border-b border-slate-800 last:border-0`}
      >
        {/* Text Context */}
        <div className="flex-1 space-y-8">
          <div className="inline-flex p-3 rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/20 shadow-lg shadow-teal-500/5">
            {icon}
          </div>

          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
              {title}
            </h3>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              {subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div
                key={i}
                className="flex items-center text-slate-300 text-sm font-semibold"
              >
                <CheckCircle2 className="text-teal-500 w-4 h-4 mr-3 shrink-0" />
                {f}
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-wrap gap-8">
            {roi.map((stat, i) => (
              <ROIStat key={i} label={stat.label} value={stat.value} />
            ))}
          </div>
        </div>

        {/* Screenshot Visual */}
        <div className="flex-1 w-full">
          <div className="rounded-[2.5rem] overflow-hidden border border-slate-700 shadow-2xl inline-block">
            
            <img
              src={imageSrc}
              alt={title}
              onClick={() => setIsOpen(true)}
              className="w-full h-auto cursor-zoom-in transition-transform duration-500 hover:scale-[1.02]"
            />

          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
          onClick={() => setIsOpen(false)}
        >
          <img
            src={imageSrc}
            alt={title}
            className="max-w-6xl w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </>
  );
};

  const ClickPayShowcase = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <section className="bg-slate-900 py-24 px-6 overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-teal-400 text-xs font-black uppercase tracking-[0.3em] mb-4">
              Enterprise Visibility
            </h2>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">
              Four Dashboards. <br />
              <span className="text-slate-500 text-3xl md:text-5xl">
                Total Financial Clarity.
              </span>
            </h1>
            <p className="text-slate-400 text-lg font-medium">
              We don't just process cards; we provide the analytics layer SAP Business One was missing.
            </p>
          </div>

          {/* 1. PAYMENT HUB */}
          <MarketingShowcase
            title="The Payment Hub"
            subtitle="Empower your clerks with a high-velocity command center. Manage every transaction lifecycle state without leaving a single screen."
            icon={<Zap size={28} />}
            imageSrc="/PaymentHub.png"
            features={[
              "One-Click Pre-Auth. Voids",
              "Shipping-Synced Captures",
              "Partial Shipment Support",
              "Instant Status Sync"
            ]}
            roi={[
              { value: "Up to 40%", label: "Faster Operations" },
              { value: "Greatly Reduced", label: "Manual Entry Errors" }
            ]}
          />

          {/* 2. SECURITY AUDIT */}
          <MarketingShowcase
            title="Security & Activity Monitor"
            subtitle="Centralized visibility into payment-related user activity and gateway response data — providing operational transparency without expanding PCI scope."
            icon={<Terminal size={28} />}
            imageSrc="/AuditHub.png"
            reversed={true}
            features={[
              "User-Level Transaction Activity Logs",
              "IP & Location Capture (Gateway & Server-Level)",
              "Tokenized Payment Architecture",
              "Gateway Response & Risk Flag Visibility"
            ]}
            roi={[
              { value: "Improved", label: "Audit Visibility" },
              { value: "Enhanced", label: "Risk Awareness" }
            ]}
          />

          {/* 3. SETTLEMENT HUB */}
          <MarketingShowcase
            title="Assisted Gateway Settlement"
            subtitle="Synchronize settled gateway batches with SAP and generate G/L-ready journal entries — eliminating manual reconciliation steps without requiring bank integration."
            icon={<Scale size={28} />}
            imageSrc="/SettlementHub.png"
            features={[
              "Gateway-to-SAP Batch Synchronization",
              "Automated Fee Allocation (Gateway-Reported)",
              "Batch Variance Detection & Alerts",
              "Journal Entry Auto-Generation"
            ]}
            roi={[
              { value: "Reduced", label: "Manual Reconciliation Time" }
            ]}
          />

          {/* 4. CIM HEALTH */}
          <MarketingShowcase
            title="Token & Vault Management"
            subtitle="Monitor stored payment profiles, reduce preventable declines, and maintain data integrity within your gateway token vault."
            icon={<HardDrive size={28} />}
            imageSrc="/CIMVaultHub.png"
            reversed={true}
            features={[
              "Proactive Expiry Monitoring",
              "Enhanced Transaction Data Support (Where Eligible)",
              "Customer Profile Status Tracking",
              "Token Integrity & Validation Checks"
            ]}
            roi={[
              { value: "Reduced", label: "Preventable Declines" },
              { value: "Improved", label: "Token Lifecycle Visibility" }
            ]}
          />

          {/* ROI Disclaimer */}
          <p className="text-[11px] text-slate-500 mt-16 leading-relaxed text-center max-w-4xl mx-auto">
            All performance metrics, ROI projections, and efficiency estimates are illustrative in nature and provided for informational purposes only. They are based on internal analysis and do not constitute guarantees of future results.
            Actual performance may vary materially depending on implementation approach, processor agreements, transaction volume, industry segment, and operational controls.
          </p>
        </div>
        
      </section>
    );
  };

  
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/integration" element={<Integration />} />
        <Route path="/magento" element={<Magento />} />
        <Route path="/migration" element={<Migration />} />
        <Route path="/security" element={<Security />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/paymentupdate" element={<PaymentManage />} />
        <Route path="/emailsetup" element={<EmailSetupHelp />} />
        <Route path="/workflow" element={<WorkFlow />} />
      </Routes>

      <Footer />

      
    </div>
  );
};

export default App;