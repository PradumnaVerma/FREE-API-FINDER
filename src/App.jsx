import React, { useState, useEffect } from 'react';
import { Search, Activity, ExternalLink, Globe, Copy, Check } from 'lucide-react';

const ApiCard = ({ api }) => {
  const [copied, setCopied] = useState(false);
  
  // Extract domain from URL to simulate Owner
  let owner = "Unknown";
  try {
    const urlObj = new URL(api.url);
    owner = urlObj.hostname.replace('www.', '');
  } catch (e) {
    // ignore
  }

  // Simulate a status (since validator isn't run yet)
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
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-neon-cyan transition-colors truncate pr-16">{api.name}</h3>
        
        <div className="flex items-center text-gray-400 text-sm mb-4 space-x-2">
          <Globe size={14} />
          <span>{owner}</span>
        </div>

        <div className="bg-dark-900/50 rounded-lg p-3 mb-4 border border-white/5 font-mono text-xs text-gray-400 break-all relative group/code">
          {api.url}
          <button 
            onClick={copyToClipboard}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-dark-800 hover:bg-dark-700 rounded-md border border-white/10 transition-all opacity-0 group-hover/code:opacity-100 flex items-center space-x-1"
          >
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
          
          <a 
            href={api.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-sm text-gray-300 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10"
          >
            <span>Docs</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [apis, setApis] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        setApis(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load APIs", err);
        setLoading(false);
      });
  }, []);

  const filteredApis = apis.filter(api => 
    api.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    api.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-dark-900 text-white selection:bg-neon-cyan selection:text-black font-sans relative">
      {/* Background gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-neon-purple/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-neon-cyan/20 blur-[120px]"></div>
      </div>

      <main className="container mx-auto px-4 py-12 relative z-10 max-w-7xl">
        <header className="mb-16 text-center space-y-4">
          <div className="inline-flex items-center justify-center space-x-3 mb-4">
            <Activity className="text-neon-cyan" size={40} />
            <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan to-neon-purple">
              API-Pulse
            </h1>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Autonomous Discovery & Validation Engine. Exploring {apis.length || '...'} public APIs.
          </p>
        </header>

        <section className="mb-12 max-w-2xl mx-auto relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-neon-cyan transition-colors">
            <Search size={20} />
          </div>
          <input
            type="text"
            className="w-full bg-dark-800/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all glass-panel"
            placeholder="Search providers or endpoints..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </section>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-white/10 border-t-neon-cyan rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredApis.map((api, index) => (
              <ApiCard key={index} api={api} />
            ))}
          </div>
        )}
        
        {!loading && filteredApis.length === 0 && (
          <div className="text-center text-gray-500 mt-12 glass-panel p-8 rounded-2xl max-w-md mx-auto">
            <Search size={48} className="mx-auto mb-4 text-gray-600" />
            <p>No APIs found matching "{searchTerm}"</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
