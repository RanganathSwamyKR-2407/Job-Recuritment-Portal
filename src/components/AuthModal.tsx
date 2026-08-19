import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useJobContext } from '../context/JobContext';

export const AuthModal: React.FC = () => {
  const {
    user,
    isAuthenticated,
    signInWithGoogle,
    signInAsNewCandidate,
    signInAsCOO,
    signOutUser,
    authModalOpen,
    setAuthModalOpen,
    authModalTab,
    setAuthModalTab,
    candidateProfile,
    isCOO
  } = useAuth();

  const { showToast, navigateToDashboard } = useJobContext();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Candidate Registration Form State
  const [candidateFirstName, setCandidateFirstName] = useState('');
  const [candidateLastName, setCandidateLastName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [candidateTitle, setCandidateTitle] = useState('Senior Frontend Engineer');
  const [candidateLocation, setCandidateLocation] = useState('San Francisco, CA & Remote');

  // COO Login State
  const [cooSecurityPin, setCooSecurityPin] = useState('');

  if (!authModalOpen) return null;

  // 1. Handle Candidate Registration / Sign In
  const handleCandidateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateFirstName.trim() || !candidateLastName.trim() || !candidateEmail.trim()) {
      setErrorMsg('Please enter your full name and email address.');
      return;
    }

    try {
      setLoading(true);
      setErrorMsg(null);
      await signInAsNewCandidate({
        firstName: candidateFirstName,
        lastName: candidateLastName,
        email: candidateEmail,
        title: candidateTitle,
        location: candidateLocation
      });
      showToast(`Welcome ${candidateFirstName}! Profile created successfully.`, 'success');
      navigateToDashboard();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle COO Sign In (Ranganath Swamy K R)
  const handleCooSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMsg(null);
      await signInAsCOO(cooSecurityPin);
      showToast('Welcome Ranganath Swamy K R! COO Executive Console unlocked.', 'success');
      navigateToDashboard();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'COO sign in failed');
    } finally {
      setLoading(false);
    }
  };

  // 3. Handle Google Login
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
      await signInWithGoogle();
      showToast('Successfully signed in with Google!', 'success');
      navigateToDashboard();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Sign in failed';
      if (!msg.includes('popup-blocked')) {
        setErrorMsg(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  // 4. Quick Pre-filled Candidate Sign In
  const handleQuickCandidate = async (name: string, email: string, title: string) => {
    try {
      setLoading(true);
      setErrorMsg(null);
      const parts = name.split(' ');
      await signInAsNewCandidate({
        firstName: parts[0],
        lastName: parts.slice(1).join(' ') || '',
        email,
        title,
        location: 'Remote & On-site'
      });
      showToast(`Signed in as ${name}!`, 'success');
      navigateToDashboard();
    } catch {
      setErrorMsg('Quick sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await signOutUser();
      showToast('Signed out of HireStream.', 'info');
      setAuthModalOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#091426]/65 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={() => setAuthModalOpen(false)}
    >
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-floating border border-outline-variant/60 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-outline-variant/40 flex items-center justify-between bg-[#f8f9ff]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#091426] flex items-center justify-center text-white shadow-xs">
              <span className="material-symbols-outlined filled text-[20px] text-white">lock_person</span>
            </div>
            <div>
              <h3 className="text-[18px] font-bold font-geist text-[#091426]">
                HireStream Portal Sign In
              </h3>
              <p className="text-[12px] text-[#45474c]">
                Choose your login: General User / Candidate or COO Executive Access
              </p>
            </div>
          </div>
          <button
            onClick={() => setAuthModalOpen(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#75777d] hover:text-[#091426] hover:bg-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Tab Switcher */}
        {!isAuthenticated && (
          <div className="flex border-b border-outline-variant/40 bg-[#f1f5f9] p-1.5 gap-1.5">
            <button
              onClick={() => {
                setAuthModalTab('candidate');
                setErrorMsg(null);
              }}
              className={`flex-1 py-2.5 px-3 rounded-xl text-[13px] font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                authModalTab === 'candidate'
                  ? 'bg-white text-[#0058be] shadow-xs border border-outline-variant/40'
                  : 'text-[#45474c] hover:text-[#091426]'
              }`}
            >
              <span>👤</span>
              <span>New User / Candidate</span>
            </button>

            <button
              onClick={() => {
                setAuthModalTab('coo');
                setErrorMsg(null);
              }}
              className={`flex-1 py-2.5 px-3 rounded-xl text-[13px] font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                authModalTab === 'coo'
                  ? 'bg-[#091426] text-white shadow-xs'
                  : 'text-[#45474c] hover:text-[#091426]'
              }`}
            >
              <span>👑</span>
              <span>COO: Ranganath Swamy</span>
            </button>
          </div>
        )}

        {/* Modal Content */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-[13px] text-red-700 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* If already Authenticated */}
          {isAuthenticated && user ? (
            <div className="space-y-4">
              <div className="p-4 bg-[#eff4ff] rounded-xl border border-[#d8e2ff] flex items-start gap-3.5">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={candidateProfile.firstName}
                    className="w-12 h-12 rounded-full border-2 border-white shadow-xs object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#0058be] text-white font-bold flex items-center justify-center text-[18px] shadow-xs">
                    {candidateProfile.firstName.charAt(0)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-[15px] font-bold text-[#091426] truncate">
                      {candidateProfile.firstName} {candidateProfile.lastName}
                    </h4>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0058be] text-white">
                      {isCOO ? '👑 COO Session' : '👤 Candidate Session'}
                    </span>
                  </div>
                  <p className="text-[13px] text-[#45474c] truncate">{user.email || candidateProfile.email}</p>
                  <p className="text-[12px] font-medium text-[#0058be] mt-0.5">{candidateProfile.title}</p>
                </div>
              </div>

              <div className="p-3.5 bg-[#f8f9ff] rounded-xl border border-outline-variant/50 text-[12px] space-y-2">
                <div className="flex items-center justify-between text-[#45474c]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Database Status
                  </span>
                  <span className="font-semibold text-emerald-700">Firestore Connected</span>
                </div>
                <div className="flex items-center justify-between text-[#45474c]">
                  <span>Active Role Access</span>
                  <span className="font-semibold text-[#091426]">
                    {isCOO ? 'Full COO Executive Controls' : 'Private Candidate Portal'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    navigateToDashboard();
                    setAuthModalOpen(false);
                  }}
                  className="flex-1 py-2.5 px-4 bg-[#0058be] hover:bg-[#004ca8] text-white text-[14px] font-semibold rounded-lg transition-colors text-center cursor-pointer shadow-xs"
                >
                  Open Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="py-2.5 px-4 bg-white hover:bg-red-50 text-red-600 border border-red-200 text-[14px] font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  Sign Out
                </button>
              </div>
            </div>
          ) : authModalTab === 'candidate' ? (
            /* ========================================================= */
            /* TAB 1: NEW USER & CANDIDATE LOGIN / REGISTRATION         */
            /* ========================================================= */
            <div className="space-y-4">
              <form onSubmit={handleCandidateSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[12px] font-bold text-[#091426] mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={candidateFirstName}
                      onChange={(e) => setCandidateFirstName(e.target.value)}
                      placeholder="e.g. Alex"
                      className="w-full px-3 py-2 text-[13px] border border-outline-variant rounded-lg bg-[#f8f9ff] focus:outline-none focus:ring-2 focus:ring-[#0058be]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-[#091426] mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={candidateLastName}
                      onChange={(e) => setCandidateLastName(e.target.value)}
                      placeholder="e.g. Rivera"
                      className="w-full px-3 py-2 text-[13px] border border-outline-variant rounded-lg bg-[#f8f9ff] focus:outline-none focus:ring-2 focus:ring-[#0058be]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-[#091426] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={candidateEmail}
                    onChange={(e) => setCandidateEmail(e.target.value)}
                    placeholder="alex.rivera@example.com"
                    className="w-full px-3 py-2 text-[13px] border border-outline-variant rounded-lg bg-[#f8f9ff] focus:outline-none focus:ring-2 focus:ring-[#0058be]/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[12px] font-bold text-[#091426] mb-1">
                      Target Role / Title
                    </label>
                    <input
                      type="text"
                      value={candidateTitle}
                      onChange={(e) => setCandidateTitle(e.target.value)}
                      placeholder="e.g. Senior Frontend Engineer"
                      className="w-full px-3 py-2 text-[13px] border border-outline-variant rounded-lg bg-[#f8f9ff] focus:outline-none focus:ring-2 focus:ring-[#0058be]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-[#091426] mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={candidateLocation}
                      onChange={(e) => setCandidateLocation(e.target.value)}
                      placeholder="San Francisco, CA"
                      className="w-full px-3 py-2 text-[13px] border border-outline-variant rounded-lg bg-[#f8f9ff] focus:outline-none focus:ring-2 focus:ring-[#0058be]/20"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 px-4 bg-[#0058be] hover:bg-[#004ca8] text-white font-bold text-[14px] rounded-xl transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                  {loading ? 'Creating Profile...' : 'Create Candidate Profile & Sign In'}
                </button>
              </form>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-outline-variant/50"></div>
                <span className="flex-shrink mx-3 text-[#75777d] text-[11px] font-semibold uppercase">
                  Or Continue With
                </span>
                <div className="flex-grow border-t border-outline-variant/50"></div>
              </div>

              {/* Google Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 bg-white hover:bg-[#f8f9ff] text-[#091426] border border-outline-variant rounded-xl font-semibold text-[13px] shadow-2xs transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                Continue with Google
              </button>

              {/* Instant 1-Click Candidate Samples */}
              <div className="pt-1">
                <p className="text-[11px] font-bold text-[#75777d] uppercase tracking-wider mb-2">
                  Quick Demo Candidate Profiles:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleQuickCandidate(
                        'Sarah Jenkins',
                        'sarah.jenkins@gmail.com',
                        'Principal Product Designer'
                      )
                    }
                    className="p-2 text-left bg-[#f8faff] hover:bg-[#eff4ff] border border-[#d8e2ff] rounded-lg transition-colors cursor-pointer"
                  >
                    <div className="text-[12px] font-bold text-[#091426]">Sarah Jenkins</div>
                    <div className="text-[10px] text-[#0058be]">Product Designer</div>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleQuickCandidate(
                        'Alex Rivera',
                        'alex.rivera.dev@gmail.com',
                        'Senior Frontend Architect'
                      )
                    }
                    className="p-2 text-left bg-[#f8faff] hover:bg-[#eff4ff] border border-[#d8e2ff] rounded-lg transition-colors cursor-pointer"
                  >
                    <div className="text-[12px] font-bold text-[#091426]">Alex Rivera</div>
                    <div className="text-[10px] text-[#0058be]">Frontend Architect</div>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* ========================================================= */
            /* TAB 2: COO EXECUTIVE LOGIN (Ranganath Swamy K R)         */
            /* ========================================================= */
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-[#091426] to-[#1e293b] rounded-xl text-white shadow-resting border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white text-[#091426] font-bold text-[18px] flex items-center justify-center shadow-xs">
                    RS
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-[16px] font-bold font-geist">Ranganath Swamy K R</h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-black">
                        COO
                      </span>
                    </div>
                    <p className="text-[12px] text-[#adc6ff]">ranganath.swamy@example.com</p>
                    <p className="text-[11px] text-white/70 mt-0.5">Chief Operating Officer</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleCooSubmit} className="space-y-3">
                <div>
                  <label className="block text-[12px] font-bold text-[#091426] mb-1">
                    Executive Security Key (Optional)
                  </label>
                  <input
                    type="password"
                    value={cooSecurityPin}
                    onChange={(e) => setCooSecurityPin(e.target.value)}
                    placeholder="Enter security PIN (or leave empty for 1-click)"
                    className="w-full px-3 py-2 text-[13px] border border-outline-variant rounded-lg bg-[#f8f9ff] focus:outline-none focus:ring-2 focus:ring-[#091426]/20"
                  />
                  <span className="text-[11px] text-[#75777d] mt-1 block">
                    Default key: <code className="font-mono text-[#0058be]">coo2026</code> (or click Unlock below)
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-[#091426] hover:bg-[#1e293b] text-white font-bold text-[14px] rounded-xl transition-all shadow-resting cursor-pointer flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[20px] text-amber-400">admin_panel_settings</span>
                  {loading ? 'Authenticating COO Session...' : 'Unlock COO Executive Console'}
                </button>
              </form>

              <div className="p-3 bg-[#eff4ff] rounded-xl border border-[#d8e2ff] text-[12px] text-[#45474c] space-y-1">
                <div className="font-bold text-[#091426] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#0058be]">security</span>
                  COO Privileges & Visibility:
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                  <li>Platform-wide access to all inbound candidate applications</li>
                  <li>Live stream of all signed-in users in Firestore</li>
                  <li>Application stage reviews (Interview, Technical Round, Offer)</li>
                  <li>Post and publish new enterprise job roles</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
