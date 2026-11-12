import React, { useState } from 'react';
import { Fingerprint, Scale, ShieldCheck, HelpCircle, MessageSquare } from 'lucide-react';
import { ETHICS_POINTS } from '../data/upgrades';
import { cyberAudio } from '../utils/audio';

export default function EthicsSection() {
  const [selectedInquiry, setSelectedInquiry] = useState('identity');
  const [pollVoted, setPollVoted] = useState(false);
  const [pollVotes, setPollVotes] = useState({
    yes: 742,
    cautious: 489,
    no: 168
  });

  const getInquiryIcon = (iconName, className) => {
    switch (iconName) {
      case 'Fingerprint':
        return <Fingerprint className={className} />;
      case 'Scale':
        return <Scale className={className} />;
      case 'ShieldCheck':
        return <ShieldCheck className={className} />;
      default:
        return <HelpCircle className={className} />;
    }
  };

  const handleVote = (choice) => {
    if (pollVoted) return;
    cyberAudio.playActivation();
    setPollVoted(true);
    setPollVotes((prev) => ({
      ...prev,
      [choice]: prev[choice] + 1
    }));
  };

  const totalVotes = pollVotes.yes + pollVotes.cautious + pollVotes.no;
  const yesPercent = Math.round((pollVotes.yes / totalVotes) * 100);
  const cautiousPercent = Math.round((pollVotes.cautious / totalVotes) * 100);
  const noPercent = Math.round((pollVotes.no / totalVotes) * 100);

  return (
    <section id="ethics" className="evo-section select-none">
      <div className="container position-relative z-10 d-flex flex-column justify-content-between my-auto">
        
        {/* Section Header Card */}
        <div className="evo-glass-panel text-center max-w-3xl mx-auto mb-4 p-3 p-md-4">
          <div className="sub-headline-evo justify-content-center">
            PHILOSOPHICAL MANDATE & HUMAN SOVEREIGNTY
          </div>
          <h2 className="section-heading-evo mb-1">
            HOW FAR SHOULD HUMANITY EVOLVE?
          </h2>
          <p className="lead-text-evo mx-auto text-xs sm:text-sm mb-0">
            "Technology can extend human capabilities, but the future should always remain a choice."
          </p>
        </div>

        {/* 3 Interactive Inquiries Grid with Bootstrap */}
        <div className="row g-3 mb-4">
          {ETHICS_POINTS.map((item) => {
            const isSelected = selectedInquiry === item.id;

            return (
              <div key={item.id} className="col-12 col-md-4">
                <div
                  onClick={() => {
                    cyberAudio.playClick();
                    setSelectedInquiry(item.id);
                  }}
                  className={`evo-glass-panel p-3 p-sm-4 cursor-pointer transition-all h-100 ${
                    isSelected
                      ? 'border-[#987BFF] shadow-[0_0_25px_rgba(152,123,255,0.25)] -translate-y-1'
                      : 'border-[#42EAFF]/20 hover:border-[#42EAFF]/50'
                  }`}
                >
                  <div className="w-10 h-10 rounded bg-[#987BFF]/10 text-[#987BFF] d-flex align-items-center justify-content-center mb-3">
                    {getInquiryIcon(item.icon, 'w-5 h-5')}
                  </div>

                  <h3 className="font-heading fw-bold text-sm sm:text-base text-white mb-1.5">
                    {item.title}
                  </h3>

                  <p className="text-xs font-mono text-[#42EAFF] mb-2 fst-italic">
                    "{item.question}"
                  </p>

                  <p className="text-xs text-[#8899A6] font-body leading-relaxed mb-3">
                    {item.argument}
                  </p>

                  <div className="p-2.5 bg-[#050812] border border-[#987BFF]/20 rounded text-[10px] sm:text-[11px] font-mono text-[#C4D1DF]">
                    <span className="text-[#987BFF] fw-bold d-block mb-0.5">ETHICAL SAFEGUARD:</span>
                    {item.principle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Community Sentiment Poll */}
        <div className="evo-glass-panel max-w-3xl mx-auto w-100 p-3 p-md-4 shadow-xl">
          <div className="d-flex align-items-center gap-2 mb-2">
            <MessageSquare className="w-4 h-4 text-[#42EAFF]" />
            <h3 className="font-heading fw-bold text-xs sm:text-sm text-white mb-0">
              COMMUNITY SENTIMENT DIALOGUE // SECTOR 07 CONSENSUS
            </h3>
          </div>
          
          <p className="text-xs text-[#8899A6] mb-3">
            If non-invasive, certified cybernetic neural enhancement became accessible tomorrow, would you choose to integrate?
          </p>

          {!pollVoted ? (
            <div className="row g-2">
              <div className="col-12 col-sm-4">
                <button
                  onClick={() => handleVote('yes')}
                  className="w-100 p-2.5 rounded border border-[#42EAFF]/30 bg-[#050812] hover:bg-[#42EAFF]/15 hover:border-[#42EAFF] text-start transition-all cursor-pointer"
                >
                  <div className="text-[11px] font-mono fw-bold text-[#42EAFF] mb-0.5">A) AFFIRMATIVE</div>
                  <div className="text-[10px] text-[#C4D1DF]">Yes, immediately upgrade to post-human capabilities.</div>
                </button>
              </div>

              <div className="col-12 col-sm-4">
                <button
                  onClick={() => handleVote('cautious')}
                  className="w-100 p-2.5 rounded border border-[#987BFF]/30 bg-[#050812] hover:bg-[#987BFF]/15 hover:border-[#987BFF] text-start transition-all cursor-pointer"
                >
                  <div className="text-[11px] font-mono fw-bold text-[#987BFF] mb-0.5">B) CONDITIONAL</div>
                  <div className="text-[10px] text-[#C4D1DF]">Only with strict sovereignty safeguards.</div>
                </button>
              </div>

              <div className="col-12 col-sm-4">
                <button
                  onClick={() => handleVote('no')}
                  className="w-100 p-2.5 rounded border border-[#8899A6]/30 bg-[#050812] hover:bg-white/10 hover:border-white text-start transition-all cursor-pointer"
                >
                  <div className="text-[11px] font-mono fw-bold text-white mb-0.5">C) BIOLOGICAL PURITY</div>
                  <div className="text-[10px] text-[#C4D1DF]">No, preserve strictly natural organic human limits.</div>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3 animate-fadeIn font-mono text-xs">
              <div className="p-2 bg-[#42EAFF]/10 border border-[#42EAFF]/30 rounded text-[#42EAFF] d-flex justify-content-between text-[11px]">
                <span>CONSENSUS REGISTERED</span>
                <span className="fw-bold">TOTAL VOTES: {totalVotes.toLocaleString()}</span>
              </div>

              <div className="space-y-1">
                <div className="d-flex justify-content-between text-[10px] text-[#42EAFF]">
                  <span>YES // IMMEDIATE TRANSHUMAN UPGRADE</span>
                  <span>{yesPercent}% ({pollVotes.yes})</span>
                </div>
                <div className="w-100 bg-[#050812] rounded-full overflow-hidden" style={{ height: '4px' }}>
                  <div className="bg-[#42EAFF] h-100" style={{ width: `${yesPercent}%` }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="d-flex justify-content-between text-[10px] text-[#987BFF]">
                  <span>CONDITIONAL // STRICT PROTOCOLS</span>
                  <span>{cautiousPercent}% ({pollVotes.cautious})</span>
                </div>
                <div className="w-100 bg-[#050812] rounded-full overflow-hidden" style={{ height: '4px' }}>
                  <div className="bg-[#987BFF] h-100" style={{ width: `${cautiousPercent}%` }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="d-flex justify-content-between text-[10px] text-[#8899A6]">
                  <span>PRESERVE ORGANIC PURITY</span>
                  <span>{noPercent}% ({pollVotes.no})</span>
                </div>
                <div className="w-100 bg-[#050812] rounded-full overflow-hidden" style={{ height: '4px' }}>
                  <div className="bg-[#8899A6] h-100" style={{ width: `${noPercent}%` }} />
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
