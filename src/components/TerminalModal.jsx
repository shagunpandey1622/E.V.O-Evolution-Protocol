import React, { useState, useRef, useEffect } from 'react';
import { X, Terminal as TerminalIcon, Send, Sparkles, CornerDownLeft } from 'lucide-react';
import { cyberAudio } from '../utils/audio';

export default function TerminalModal({ isOpen, onClose }) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { type: 'sys', text: 'E.V.O. TERMINAL OS v4.9.2 [SECTOR 07 VALKYRIE CORE]' },
    { type: 'sys', text: 'Type "help" or click below for available protocol directives.' }
  ]);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen]);

  if (!isOpen) return null;

  const quickCommands = ['help', 'status', 'modules', 'evolve', 'protocol', 'clear'];

  const executeCommand = (cmdText) => {
    const raw = cmdText.trim();
    const cmd = raw.toLowerCase();
    cyberAudio.playClick();

    if (!cmd) return;

    if (cmd === 'clear') {
      setHistory([]);
      return;
    }

    const newHistory = [...history, { type: 'user', text: raw }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'res',
          text: `AVAILABLE COMMANDS:
- status      : Display real-time neural telemetry & system diagnostics
- modules     : Enumerate all 4 primary cybernetic upgrade modules
- evolve      : Trigger rapid automatic evolution simulation
- protocol    : Review the E.V.O. Transhuman Covenant credentials
- access-code : Generate an encrypted transhuman session token
- clear       : Wipe terminal buffer`
        });
        break;

      case 'status':
        newHistory.push({
          type: 'res',
          text: `[SYSTEM STATUS //]
- CORE STATE          : OPTIMAL [ONLINE]
- NEURAL SYNCHRONY    : 98.4%
- CORTEX TEMPERATURE  : 36.8°C [STABLE]
- CYBORG POWER DRAW   : 2.8 kW/h
- SECTOR              : VALKYRIE GATEWAY DEPLOYMENT`
        });
        break;

      case 'modules':
        newHistory.push({
          type: 'res',
          text: `[REGISTERED MODULES]
1. MOD-01 : Neural Intelligence (Sub-cranial qubit mesh)
2. MOD-02 : Cybernetic Vision (Multi-spectrum LiDAR optic array)
3. MOD-03 : Robotic Limbs (Carbon-titanium myomers)
4. MOD-04 : Enhanced Reflexes (Sub-spinal autonomic relay)`
        });
        break;

      case 'evolve':
        newHistory.push({
          type: 'res',
          text: `>>> INITIATING EVOLUTION SEQUENCE...
[+] ALLOCATING QUANTUM CORTEX THREADS...
[+] BIO-SYNTHETIC HARMONIC LOCK ACHIEVED.
CONGRATULATIONS: CYBORG APEX TRANSHUMAN STATUS UNLOCKED.`
        });
        cyberAudio.playActivation();
        break;

      case 'protocol':
        newHistory.push({
          type: 'res',
          text: `[PROJECT E.V.O. PROTOCOL]
Autonomous Cybernetic World Engine
"Humanity Was Just The Beginning."`
        });
        break;

      case 'access-code':
        const randomToken = `EVO-TOKEN-${Math.floor(100000 + Math.random() * 900000)}`;
        newHistory.push({
          type: 'res',
          text: `[ENCRYPTED SESSION KEY]: ${randomToken}
Status: ACCREDITED FOR FULL LAB ACCESS.`
        });
        break;

      default:
        newHistory.push({
          type: 'error',
          text: `Command not recognized: "${raw}". Type "help" for a list of available directives.`
        });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    executeCommand(inputVal);
  };

  return (
    <div className="cyber-modal-overlay animate-fadeIn">
      <div className="cyber-modal-box !max-w-2xl bg-[#050812] border-2 border-[#42EAFF] shadow-[0_0_50px_rgba(66,234,255,0.35)]">

        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-[#42EAFF]/30 mb-4">
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-4 h-4 text-[#42EAFF]" />
            <span className="font-heading font-bold text-sm tracking-widest text-white">
              INITIALIZE ACCESS // E.V.O. COMMAND SHELL
            </span>
          </div>

          <button
            onClick={() => {
              cyberAudio.playClick();
              onClose();
            }}
            className="text-[#8899A6] hover:text-[#42EAFF] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Command Buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-4 pb-3 border-b border-[#42EAFF]/15">
          <span className="text-[10px] font-mono text-[#546575]">DIRECTIVES:</span>
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              onClick={() => executeCommand(cmd)}
              className="px-2 py-0.5 rounded bg-[#091426] border border-[#42EAFF]/30 hover:border-[#42EAFF] hover:bg-[#42EAFF]/15 text-[#42EAFF] font-mono text-xs transition-colors"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Console Log Area */}
        <div className="h-64 overflow-y-auto font-mono text-xs space-y-2 text-left mb-4 p-3 bg-[#091426]/60 rounded border border-[#42EAFF]/10">
          {history.map((item, idx) => (
            <div key={idx} className="leading-relaxed">
              {item.type === 'sys' && (
                <div className="text-[#8899A6]">{item.text}</div>
              )}
              {item.type === 'user' && (
                <div className="text-[#42EAFF] font-bold">
                  <span className="text-[#987BFF]">&gt; </span>
                  {item.text}
                </div>
              )}
              {item.type === 'res' && (
                <div className="text-[#C4D1DF] whitespace-pre-wrap pl-3 border-l-2 border-[#42EAFF]/30">
                  {item.text}
                </div>
              )}
              {item.type === 'error' && (
                <div className="text-[#FF5C5C] pl-3 border-l-2 border-[#FF5C5C]/50">
                  {item.text}
                </div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Command Input Form */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex-1 flex items-center bg-[#091426] border border-[#42EAFF]/40 rounded px-3 py-1">
            <span className="text-[#987BFF] font-mono font-bold mr-2">&gt;</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="ENTER DIRECTIVE (e.g. status, evolve)..."
              autoFocus
              className="flex-1 bg-transparent text-xs font-mono text-[#42EAFF] focus:outline-none placeholder:text-[#546575]"
            />
          </div>
          <button
            type="submit"
            className="btn-cyber-primary !py-2 !px-4 text-xs font-mono flex items-center gap-1"
          >
            <span>EXEC</span>
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>

      </div>
    </div>
  );
}
