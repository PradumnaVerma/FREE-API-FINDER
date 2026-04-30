import React, { useState, useEffect } from 'react';
import { Search, Activity, ExternalLink, Globe, Copy, Check, ShieldAlert, AlertTriangle, User, ArrowRight, Filter, Tag } from 'lucide-react';

const ApiCard = ({ api }) => {
  const [copied, setCopied] = useState(false);
  let owner = "Unknown";
  try {
    const urlObj = new URL(api.url);
    owner = urlObj.hostname.replace('www.', '');
  } catch (e) {}

  const isHealthy = api.status === 'Online' || !api.status;

  const copyToClipboard = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(api.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] hover:neon-glow-cyan group relative overflow-hidden flex flex-col h-full">
      <div className="absolute top-0 right-0 p-4">
        <div className="flex items-center space-x-2 bg-dark-800/80 rounded-full px-3 py-1 border border-white/10">
          <span className={`w-2 h-2 rounded-full ${isHealthy ? 'bg-neon-green shadow-[0_0_8px_#00ff66]' : 'bg-red-500 shadow-[0_0_8px_#ef4444]'} animate-pulse`}></span>
          <span className="text-xs font-mono text-gray-300">{isHealthy ? 'ONLINE' : 'OFFLINE'}</span>
        </div>
      </div>

      <div className="flex flex-col flex-grow mt-2">
        <div className="flex items-center space-x-2 mb-2">
          <span className="px-2 py-0.5 bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan text-[10px] font-bold uppercase rounded-md">
            {api.category || 'General'}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-neon-cyan transition-colors truncate pr-16">{api.name}</h3>
        <p className="text-gray-400 text-xs mb-4 line-clamp-2 min-h-[2.5rem] italic">"{api.description}"</p>

        <div className="flex items-center text-gray-400 text-[10px] mb-4 space-x-2 uppercase font-bold tracking-wider">
          <Globe size={12} />
          <span>{owner}</span>
        </div>

        <div className="bg-dark-900/50 rounded-lg p-3 mb-4 border border-white/5 font-mono text-xs text-gray-400 break-all relative group/code">
          {api.url}
          <button onClick={copyToClipboard} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-dark-800 hover:bg-dark-700 rounded-md border border-white/10 transition-all opacity-0 group-hover/code:opacity-100 flex items-center space-x-1">
            {copied ? <Check size={14} className="text-neon-green" /> : <Copy size={14} className="text-gray-300" />}
            <span className="text-[10px] uppercase font-bold">{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        <div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-0.5">Authentication</span>
            <span className={`text-xs font-bold uppercase tracking-wider ${api.auth === 'No' ? 'text-neon-green' : 'text-neon-purple'}`}>
              {api.auth === 'No' ? 'No Key Needed' : api.auth}
            </span>
          </div>
          <a href={api.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 text-sm text-gray-300 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
            <span>Docs</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

const SecurityCard = ({ leak }) => {
  return (
    <div className="glass-panel border-red-500/20 rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] group relative overflow-hidden flex flex-col h-full">
      <div className="absolute top-0 right-0 p-4">
        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${leak.severity === 'Critical' ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'}`}>
          {leak.severity}
        </span>
      </div>

      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-red-500/10 rounded-lg text-red-500">
          <ShieldAlert size={24} />
        </div>
        <div>
          <h3 className="font-bold text-lg text-white">Private Key Leaked</h3>
          <p className="text-xs text-gray-500 font-mono uppercase tracking-tighter">Detected on {leak.service}</p>
        </div>
      </div>

      <div className="space-y-3 flex-grow">
        <div className="bg-dark-900/50 rounded-lg p-3 border border-white/5 font-mono text-xs text-gray-400">
          <div className="text-red-400/50 mb-1">LEAKED_SECRET:</div>
          <div className="tracking-widest font-bold text-gray-300">
            {leak.leaked_key_preview}****************
          </div>
        </div>
        <p className="text-[10px] text-red-500 font-bold italic uppercase animate-pulse">⚠️ SECURITY POLICY: Full private keys are never displayed publicly.</p>

        <div className="flex items-center space-x-2 text-sm text-gray-400 bg-white/5 p-2 rounded-lg">
          <User size={14} className="text-neon-cyan" />
          <span className="font-medium">{leak.owner}</span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-white/10 flex flex-col space-y-3">
        <p className="text-xs text-gray-400">Please notify the owner immediately to revoke this key.</p>
        <a 
          href={leak.source_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-2 w-full py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm font-bold transition-all group-hover:bg-red-500 group-hover:text-white"
        >
          <span>Notify Owner on {leak.service}</span>
          <ArrowRight size={16} />
        </a>
      </div>
    </div>
  );
};

const SecurityScanner = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const leakPatterns = [
    { name: 'Generic API Key', regex: /[a-zA-Z0-9]{32,45}/g, advice: 'Ensure this key is not used on the frontend. Move it to a secure .env file on your backend.' },
    { name: 'Stripe Secret Key', regex: /sk_live_[0-9a-zA-Z]{24}/g, advice: 'CRITICAL: Your Stripe Secret Key is exposed. Revoke it immediately in your Stripe Dashboard and use Restricted Keys or a backend proxy.' },
    { name: 'AWS Access Key', regex: /AKIA[0-9A-Z]{16}/g, advice: 'High Risk: AWS keys can lead to massive bills if stolen. Revoke these in IAM and use IAM Roles instead.' },
    { name: 'Google API Key', regex: /AIza[0-9A-Za-z\\-_]{35}/g, advice: 'Warning: Google API keys should be restricted by IP or HTTP referrer in the Google Cloud Console.' }
  ];

  const handleScan = () => {
    setIsScanning(true);
    setResults(null);
    
    // Simulate network delay
    setTimeout(() => {
      const found = [];
      leakPatterns.forEach(pattern => {
        const matches = input.match(pattern.regex);
        if (matches) {
          found.push({ ...pattern, matches: [...new Set(matches)] });
        }
      });
      setResults(found);
      setIsScanning(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto glass-panel p-8 rounded-3xl space-y-6">
      <div className="flex items-center space-x-4 mb-4">
        <div className="p-3 bg-neon-cyan/10 rounded-2xl text-neon-cyan">
          <ShieldAlert size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Personal Security Scanner</h2>
          <p className="text-gray-400 text-sm">Paste your URL or code snippet below to check for accidentally exposed keys.</p>
        </div>
      </div>

      <textarea 
        className="w-full h-48 bg-dark-900/50 border border-white/10 rounded-2xl p-4 font-mono text-sm text-gray-300 focus:outline-none focus:border-neon-cyan transition-all"
        placeholder="Paste your code (e.g. index.js, .env content) or URL here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button 
        onClick={handleScan}
        disabled={!input || isScanning}
        className="w-full py-4 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-2xl font-bold text-black hover:opacity-90 transition-all disabled:opacity-50 flex justify-center items-center space-x-2"
      >
        {isScanning ? (
          <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
        ) : (
          <>
            <Activity size={20} />
            <span>Analyze for Leaks</span>
          </>
        )}
      </button>

      {results && (
        <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h3 className="text-lg font-bold flex items-center space-x-2">
            <AlertTriangle className={results.length > 0 ? 'text-red-500' : 'text-neon-green'} />
            <span>Scan Results: {results.length} Potential Leaks Found</span>
          </h3>
          
          {results.length === 0 ? (
            <div className="p-6 bg-neon-green/10 border border-neon-green/20 rounded-2xl text-neon-green text-center font-medium">
              Great! No obvious API keys detected in the provided content.
            </div>
          ) : (
            results.map((leak, idx) => (
              <div key={idx} className="p-6 bg-red-500/5 border border-red-500/20 rounded-2xl space-y-3">
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 bg-red-500 text-white text-[10px] font-bold uppercase rounded-full">
                    {leak.name}
                  </span>
                </div>
                <div className="space-y-1">
                  {leak.matches.map((m, i) => (
                    <div key={i} className="font-mono text-xs text-red-400 bg-red-500/10 p-2 rounded truncate">
                      Found: {m.substring(0, 8)}****************
                    </div>
                  ))}
                </div>
                <div className="pt-3 border-t border-red-500/10 text-sm text-gray-300 italic">
                  <strong>💡 Advice:</strong> {leak.advice}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

function App() {
  const [activeTab, setActiveTab] = useState('discovery');
  const [apis, setApis] = useState([]);
  const [leaks, setLeaks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/data.json').then(res => res.json()),
      fetch('/security.json').then(res => res.json())
    ]).then(([apiData, securityData]) => {
      setApis(apiData);
      setLeaks(securityData);
      setLoading(false);
    }).catch(err => {
      console.error("Failed to load data", err);
      setLoading(false);
    });
  }, []);

  const categories = ['All', ...new Set(apis.map(api => api.category))].filter(Boolean);

  const filteredItems = activeTab === 'discovery' 
    ? apis.filter(api => 
        (selectedCategory === 'All' || api.category === selectedCategory) &&
        (api.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
         api.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
         api.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : leaks.filter(leak => leak.owner.toLowerCase().includes(searchTerm.toLowerCase()) || leak.service.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-dark-900 text-white selection:bg-neon-cyan selection:text-black font-sans relative">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-neon-purple/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-neon-cyan/20 blur-[120px]"></div>
      </div>

      <main className="container mx-auto px-4 py-12 relative z-10 max-w-7xl">
        <header className="mb-12 text-center space-y-4">
          <div className="flex justify-between items-center mb-8 px-4 py-2 bg-white/5 rounded-full border border-white/10 max-w-fit mx-auto">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-neon-green rounded-full animate-ping"></span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Live Engine Pulse</span>
            </div>
            <div className="mx-4 w-px h-4 bg-white/10"></div>
            <a 
              href="https://github.com/PradumnaVerma/FREE-API-FINDER/actions" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[10px] font-bold text-neon-cyan hover:text-white transition-colors uppercase tracking-widest flex items-center space-x-1"
            >
              <span>Trigger Manual Sync</span>
              <ExternalLink size={10} />
            </a>
          </div>

          <div className="inline-flex items-center justify-center space-x-3 mb-4">
            <Activity className="text-neon-cyan" size={40} />
            <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan to-neon-purple">
              API-Pulse
            </h1>
          </div>
          <div className="flex justify-center space-x-4 mb-8">
            <button 
              onClick={() => setActiveTab('discovery')}
              className={`px-6 py-2 rounded-full font-bold transition-all border ${activeTab === 'discovery' ? 'bg-neon-cyan text-black border-neon-cyan' : 'bg-transparent text-gray-400 border-white/10 hover:border-white/20'}`}
            >
              API Discovery
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`px-6 py-2 rounded-full font-bold transition-all border flex items-center space-x-2 ${activeTab === 'security' ? 'bg-red-500 text-white border-red-500' : 'bg-transparent text-gray-400 border-white/10 hover:border-white/20'}`}
            >
              <ShieldAlert size={18} />
              <span>Security Watch</span>
            </button>
            <button 
              onClick={() => setActiveTab('scanner')}
              className={`px-6 py-2 rounded-full font-bold transition-all border flex items-center space-x-2 ${activeTab === 'scanner' ? 'bg-neon-purple text-white border-neon-purple' : 'bg-transparent text-gray-400 border-white/10 hover:border-white/20'}`}
            >
              <Activity size={18} />
              <span>Scanner</span>
            </button>
          </div>
        </header>

        {activeTab === 'scanner' ? (
          <SecurityScanner />
        ) : (
          <>
            <section className="mb-12 max-w-4xl mx-auto flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-neon-cyan transition-colors">
              <Search size={20} />
            </div>
            <input
              type="text"
              className="w-full bg-dark-800/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all glass-panel"
              placeholder={activeTab === 'discovery' ? "Search providers, keywords, or use cases..." : "Search owners or services..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {activeTab === 'discovery' && (
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                <Filter size={18} />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-dark-800/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white appearance-none focus:outline-none focus:border-neon-cyan transition-all glass-panel"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat} className="bg-dark-800">{cat}</option>
                ))}
              </select>
            </div>
          )}
        </section>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-white/10 border-t-neon-cyan rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {activeTab === 'discovery' 
              ? filteredItems.map((api, index) => <ApiCard key={index} api={api} />)
              : filteredItems.map((leak, index) => <SecurityCard key={index} leak={leak} />)
            }
          </div>
        )}
        
        {!loading && filteredItems.length === 0 && (
          <div className="text-center text-gray-500 mt-12 glass-panel p-8 rounded-2xl max-w-md mx-auto">
            <Search size={48} className="mx-auto mb-4 text-gray-600" />
            <p>No results found for "{searchTerm}"</p>
          </div>
        )}
        </>
        )}
      </main>
    </div>
  );
}

export default App;
