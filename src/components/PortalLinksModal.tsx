import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useJobContext } from '../context/JobContext';

export const PortalLinksModal: React.FC = () => {
  const {
    portalLinksModalOpen,
    setPortalLinksModalOpen,
    activePersona,
    setActivePersona,
    getUserPortalUrl,
    getCooPortalUrl,
    signedInUsers
  } = useAuth();

  const { allPlatformApplications, showToast, navigateToDashboard } = useJobContext();

  const [copiedUser, setCopiedUser] = useState(false);
  const [copiedCoo, setCopiedCoo] = useState(false);

  if (!portalLinksModalOpen) return null;

  const userQueryUrl = getUserPortalUrl(false);
  const userHashUrl = getUserPortalUrl(true);
  const cooQueryUrl = getCooPortalUrl(false);
  const cooHashUrl = getCooPortalUrl(true);

  const copyToClipboard = async (text: string, isUser: boolean) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const input = document.createElement('input');
        input.value = text;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }

      if (isUser) {
        setCopiedUser(true);
        showToast('Candidate / User Portal Link copied!', 'success');
        setTimeout(() => setCopiedUser(false), 2500);
      } else {
        setCopiedCoo(true);
        showToast('COO Executive Portal Link copied!', 'success');
        setTimeout(() => setCopiedCoo(false), 2500);
      }
    } catch {
      showToast('Copied to clipboard!', 'info');
    }
  };

  const handleSwitchToUser = () => {
    setActivePersona('candidate');
    navigateToDashboard();
    setPortalLinksModalOpen(false);
    showToast('Switched to General User / Candidate View', 'info');
  };

  const handleSwitchToCoo = () => {
    setActivePersona('coo');
    navigateToDashboard();
    setPortalLinksModalOpen(false);
    showToast('Switched to COO Executive View (Ranganath Swamy)', 'info');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={() => setPortalLinksModalOpen(false)}
    >
      <div
        className="bg-white rounded-2xl max-w-xl w-full border border-outline-variant/60 shadow-floating overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-outline-variant/40 bg-[#f8f9ff] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#091426] text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[22px]">link</span>
            </div>
            <div>
              <h3 className="text-[19px] font-bold font-geist text-[#091426]">
                Shareable Portal Links
              </h3>
              <p className="text-[12px] text-[#45474c]">
                Two dedicated links: One for general job applicants and one for the COO.
              </p>
            </div>
          </div>

          <button
            onClick={() => setPortalLinksModalOpen(false)}
            className="w-8 h-8 rounded-full hover:bg-[#e5eeff] text-[#45474c] hover:text-[#091426] flex items-center justify-center cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Link 1: General Users / Candidate Portal */}
          <div
            className={`p-4 rounded-xl border transition-all ${
              activePersona === 'candidate'
                ? 'border-[#0058be] bg-[#f0f6ff] ring-2 ring-[#0058be]/20'
                : 'border-[#d8e2ff] bg-[#f8faff] hover:border-[#0058be]/50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-[20px]">👤</span>
                <div>
                  <h4 className="text-[15px] font-bold text-[#091426] font-geist">
                    1. General User & Candidate Link
                  </h4>
                  <p className="text-[11px] text-[#5b6e8c]">For all public applicants & job seekers</p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#eff4ff] text-[#0058be] border border-[#d8e2ff]">
                Public Portal
              </span>
            </div>

            <p className="text-[13px] text-[#45474c] mb-3">
              Share this link with any user. They can browse open roles, apply to jobs, and track their personal applications privately. They cannot access COO features.
            </p>

            {/* URL Display and Action Buttons */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 bg-white border border-outline-variant/70 rounded-lg p-1.5 pl-3">
                <span className="text-[12px] font-mono text-[#091426] truncate flex-1 select-all font-medium">
                  {userQueryUrl}
                </span>
                <button
                  onClick={() => copyToClipboard(userQueryUrl, true)}
                  className="px-3 py-1.5 bg-[#0058be] hover:bg-[#004ca8] text-white text-[12px] font-semibold rounded-md transition-colors flex items-center gap-1 shrink-0 cursor-pointer shadow-xs"
                >
                  <span className="material-symbols-outlined text-[15px]">
                    {copiedUser ? 'check' : 'content_copy'}
                  </span>
                  {copiedUser ? 'Copied!' : 'Copy Link'}
                </button>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-[#75777d]">
                  Also supports: <code className="font-mono text-[#0058be]">{userHashUrl}</code>
                </span>
                <button
                  onClick={handleSwitchToUser}
                  className="px-3 py-1 bg-[#eff4ff] hover:bg-[#d8e2ff] text-[#0058be] text-[12px] font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Switch to this View Now</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* Link 2: COO Executive Portal */}
          <div
            className={`p-4 rounded-xl border transition-all ${
              activePersona === 'coo'
                ? 'border-[#091426] bg-[#f8f9fc] ring-2 ring-[#091426]/20'
                : 'border-[#091426]/20 bg-gradient-to-br from-[#f8faff] to-[#eff4ff] hover:border-[#091426]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-[20px]">👑</span>
                <div>
                  <h4 className="text-[15px] font-bold text-[#091426] font-geist">
                    2. COO Executive Console Link
                  </h4>
                  <p className="text-[11px] text-[#5b6e8c]">For COO: Ranganath Swamy K R</p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#091426] text-white">
                Executive Access
              </span>
            </div>

            <p className="text-[13px] text-[#45474c] mb-3">
              Private executive link for the COO. Opens full live overview of all candidate dossiers, inbound applications ({allPlatformApplications.length} total), and live signed-in user directory ({signedInUsers.length} online).
            </p>

            {/* URL Display and Action Buttons */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 bg-white border border-outline-variant/70 rounded-lg p-1.5 pl-3">
                <span className="text-[12px] font-mono text-[#091426] truncate flex-1 select-all font-semibold">
                  {cooQueryUrl}
                </span>
                <button
                  onClick={() => copyToClipboard(cooQueryUrl, false)}
                  className="px-3 py-1.5 bg-[#091426] hover:bg-[#1e293b] text-white text-[12px] font-semibold rounded-md transition-colors flex items-center gap-1 shrink-0 cursor-pointer shadow-xs"
                >
                  <span className="material-symbols-outlined text-[15px]">
                    {copiedCoo ? 'check' : 'content_copy'}
                  </span>
                  {copiedCoo ? 'Copied!' : 'Copy COO Link'}
                </button>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-[#75777d]">
                  Also supports: <code className="font-mono text-[#091426]">{cooHashUrl}</code>
                </span>
                <button
                  onClick={handleSwitchToCoo}
                  className="px-3 py-1 bg-[#091426] hover:bg-[#1e293b] text-white text-[12px] font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Switch to COO View Now</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#f8f9ff] border-t border-outline-variant/40 flex items-center justify-between">
          <div className="text-[12px] text-[#45474c] flex items-center gap-1.5">
            <span>Currently Active:</span>
            <strong className="text-[#091426] font-bold">
              {activePersona === 'coo' ? '👑 COO Mode' : '👤 Candidate / User Mode'}
            </strong>
          </div>
          <button
            onClick={() => setPortalLinksModalOpen(false)}
            className="px-5 py-2 text-[13px] font-bold text-white bg-[#091426] hover:bg-[#1e293b] rounded-xl transition-colors cursor-pointer shadow-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
