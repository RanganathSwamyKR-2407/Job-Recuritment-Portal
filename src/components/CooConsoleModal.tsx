import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useJobContext } from '../context/JobContext';
import { SignedInUserRecord } from '../types';

export const CooConsoleModal: React.FC = () => {
  const { cooModalOpen, setCooModalOpen, signedInUsers, simulateUserSignIn, candidateProfile, isCOO } = useAuth();
  const { showToast } = useJobContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'coo' | 'candidates'>('all');
  const [selectedUser, setSelectedUser] = useState<SignedInUserRecord | null>(null);

  // New simulated user input state
  const [simName, setSimName] = useState('');
  const [simEmail, setSimEmail] = useState('');
  const [simTitle, setSimTitle] = useState('Senior Backend Engineer');

  if (!cooModalOpen || !isCOO) return null;

  const filteredUsers = signedInUsers.filter((u) => {
    // Search matching
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matches =
        u.displayName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.title.toLowerCase().includes(q) ||
        (u.location && u.location.toLowerCase().includes(q));
      if (!matches) return false;
    }

    if (statusFilter === 'active') {
      return u.status === 'Active Now' || u.status === 'Online';
    }
    if (statusFilter === 'coo') {
      return u.isCOO || u.title.toLowerCase().includes('coo');
    }
    if (statusFilter === 'candidates') {
      return !u.isCOO;
    }
    return true;
  });

  const handleSimulateLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!simName.trim()) {
      showToast('Please enter a candidate name to simulate', 'warning');
      return;
    }

    const email = simEmail.trim() || `${simName.toLowerCase().replace(/\s+/g, '.')}@candidate.io`;
    await simulateUserSignIn({
      displayName: simName,
      email,
      title: simTitle || 'Product Manager',
      location: 'Remote, US'
    });

    showToast(`New user "${simName}" signed in! Visible in your COO Console.`, 'success');
    setSimName('');
    setSimEmail('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#091426]/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-floating border border-outline-variant/60 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-outline-variant/40 bg-[#091426] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0058be] flex items-center justify-center text-white shadow-sm">
              <span className="material-symbols-outlined text-[22px]">admin_panel_settings</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[19px] font-bold font-geist tracking-tight">
                  COO Executive Directory & User Monitor
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Live Firestore Feed
                </span>
              </div>
              <p className="text-[12px] text-[#adc6ff]">
                Executive overview for {candidateProfile.firstName} {candidateProfile.lastName} (COO)
              </p>
            </div>
          </div>
          <button
            onClick={() => setCooModalOpen(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Top Metric Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-[#f8f9ff] border-b border-outline-variant/40 text-[13px]">
          <div className="bg-white p-3 rounded-xl border border-outline-variant/40 shadow-xs">
            <span className="text-[#75777d] text-[11px] font-semibold uppercase">Total Signed-In Users</span>
            <p className="text-[20px] font-bold text-[#091426] mt-0.5">{signedInUsers.length}</p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-outline-variant/40 shadow-xs">
            <span className="text-[#75777d] text-[11px] font-semibold uppercase">Active Now (Online)</span>
            <p className="text-[20px] font-bold text-emerald-600 mt-0.5">
              {signedInUsers.filter((u) => u.status === 'Active Now' || u.status === 'Online').length}
            </p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-outline-variant/40 shadow-xs">
            <span className="text-[#75777d] text-[11px] font-semibold uppercase">Candidate Profiles</span>
            <p className="text-[20px] font-bold text-[#0058be] mt-0.5">
              {signedInUsers.filter((u) => !u.isCOO).length}
            </p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-outline-variant/40 shadow-xs">
            <span className="text-[#75777d] text-[11px] font-semibold uppercase">Sync Status</span>
            <p className="text-[13px] font-bold text-[#091426] mt-1.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Real-time Firestore
            </p>
          </div>
        </div>

        {/* Content Body: Left List + Right Simulation/Inspector */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-outline-variant/40">
          {/* Left Column (7 cols): User Directory List */}
          <div className="lg:col-span-7 flex flex-col h-[500px] overflow-hidden">
            {/* Search and Filters */}
            <div className="p-3.5 border-b border-outline-variant/40 space-y-2.5 bg-white">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#75777d] text-[18px]">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter users by name, email, or role..."
                  className="w-full pl-9 pr-3 py-1.5 text-[13px] bg-[#f8f9ff] border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0058be]/20"
                />
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors ${
                    statusFilter === 'all'
                      ? 'bg-[#091426] text-white'
                      : 'bg-[#f1f5f9] text-[#45474c] hover:bg-[#e2e8f0]'
                  }`}
                >
                  All ({signedInUsers.length})
                </button>
                <button
                  onClick={() => setStatusFilter('active')}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors ${
                    statusFilter === 'active'
                      ? 'bg-[#0058be] text-white'
                      : 'bg-[#eff4ff] text-[#0058be] hover:bg-[#dce9ff]'
                  }`}
                >
                  🟢 Active Online
                </button>
                <button
                  onClick={() => setStatusFilter('candidates')}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors ${
                    statusFilter === 'candidates'
                      ? 'bg-[#091426] text-white'
                      : 'bg-[#f1f5f9] text-[#45474c] hover:bg-[#e2e8f0]'
                  }`}
                >
                  Candidates
                </button>
                <button
                  onClick={() => setStatusFilter('coo')}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors ${
                    statusFilter === 'coo'
                      ? 'bg-[#091426] text-white'
                      : 'bg-[#f1f5f9] text-[#45474c] hover:bg-[#e2e8f0]'
                  }`}
                >
                  Executives / COO
                </button>
              </div>
            </div>

            {/* Scrollable User List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
              {filteredUsers.length === 0 ? (
                <div className="text-center py-12 text-[#75777d] text-[13px]">
                  No users found matching "{searchQuery}"
                </div>
              ) : (
                filteredUsers.map((u) => {
                  const isSelected = selectedUser?.userId === u.userId;
                  return (
                    <div
                      key={u.userId}
                      onClick={() => setSelectedUser(u)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                        isSelected
                          ? 'border-[#0058be] bg-[#eff4ff] shadow-xs'
                          : 'border-outline-variant/50 hover:border-[#0058be]/40 hover:bg-[#f8f9ff]'
                      }`}
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        {u.photoURL ? (
                          <img
                            src={u.photoURL}
                            alt={u.displayName}
                            className="w-9 h-9 rounded-full object-cover border border-white shrink-0"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-[#091426] text-white font-bold flex items-center justify-center text-[13px] shrink-0">
                            {u.displayName.charAt(0)}
                          </div>
                        )}
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-[14px] font-bold text-[#091426] truncate">
                              {u.displayName}
                            </h4>
                            {u.isCOO && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#091426] text-white">
                                COO
                              </span>
                            )}
                          </div>
                          <p className="text-[12px] text-[#45474c] truncate">{u.email}</p>
                          <p className="text-[11px] font-medium text-[#0058be] mt-0.5 truncate">
                            {u.title}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end shrink-0 text-right">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            u.status === 'Active Now'
                              ? 'bg-emerald-100 text-emerald-800'
                              : u.status === 'Online'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {u.status}
                        </span>
                        <span className="text-[10px] text-[#75777d] mt-1">
                          {u.lastActiveDisplay}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Column (5 cols): User Detail & Real-Time Test Simulator */}
          <div className="lg:col-span-5 flex flex-col h-[500px] overflow-y-auto bg-[#fafbff] p-4 space-y-4">
            {/* Inspector or Selected Card */}
            {selectedUser ? (
              <div className="bg-white p-4 rounded-xl border border-outline-variant/60 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-outline-variant/40">
                  <span className="text-[11px] font-bold uppercase text-[#75777d]">Inspecting User Record</span>
                  <span className="text-[11px] text-emerald-600 font-semibold">● Live Firestore Document</span>
                </div>
                <div>
                  <h4 className="text-[16px] font-bold text-[#091426]">{selectedUser.displayName}</h4>
                  <p className="text-[13px] text-[#45474c]">{selectedUser.email}</p>
                  <p className="text-[12px] font-medium text-[#0058be] mt-0.5">{selectedUser.title}</p>
                  {selectedUser.location && (
                    <p className="text-[11px] text-[#75777d] mt-0.5 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]">location_on</span>
                      {selectedUser.location}
                    </p>
                  )}
                </div>

                <div className="text-[12px] space-y-1.5 pt-2 border-t border-outline-variant/40 text-[#45474c]">
                  <div className="flex justify-between">
                    <span>Authentication Provider:</span>
                    <span className="font-semibold text-[#091426]">{selectedUser.provider}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Applications Filed:</span>
                    <span className="font-semibold text-[#0058be]">{selectedUser.appliedJobsCount || 1} active</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Sign-In:</span>
                    <span className="font-mono text-[11px]">{new Date(selectedUser.lastLoginAt).toLocaleTimeString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => {
                      showToast(`Invitation sent to ${selectedUser.displayName} (${selectedUser.email})`, 'success');
                    }}
                    className="flex-1 py-1.5 px-3 bg-[#0058be] hover:bg-[#004ca8] text-white text-[12px] font-semibold rounded-lg transition-colors cursor-pointer text-center"
                  >
                    Schedule Interview
                  </button>
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="py-1.5 px-2.5 bg-white border border-outline-variant text-[12px] text-[#45474c] rounded-lg hover:bg-[#f1f5f9]"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-[#eff4ff] p-3.5 rounded-xl border border-[#d8e2ff] text-[12px] text-[#0058be]">
                <p className="font-semibold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">visibility</span>
                  Live COO Telemetry Active
                </p>
                <p className="mt-1 text-[#45474c]">
                  Select any registered user on the left to inspect their dossier, application pipeline, and auth timestamps in real time.
                </p>
              </div>
            )}

            {/* Simulator: Test New Sign-In */}
            <form onSubmit={handleSimulateLogin} className="bg-white p-4 rounded-xl border border-outline-variant/60 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0058be] text-[18px]">person_add</span>
                <h4 className="text-[13px] font-bold font-geist text-[#091426]">
                  Simulate New User Sign-In
                </h4>
              </div>
              <p className="text-[11px] text-[#75777d]">
                Test real-time Firestore synchronization by generating an incoming candidate sign-in.
              </p>

              <div className="space-y-2">
                <div>
                  <label className="text-[11px] font-semibold text-[#45474c]">Candidate Name</label>
                  <input
                    type="text"
                    value={simName}
                    onChange={(e) => setSimName(e.target.value)}
                    placeholder="e.g. Maya Lin"
                    className="w-full px-2.5 py-1 text-[12px] bg-[#f8f9ff] border border-outline-variant rounded-md focus:outline-none focus:border-[#0058be]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-[#45474c]">Title / Role</label>
                  <input
                    type="text"
                    value={simTitle}
                    onChange={(e) => setSimTitle(e.target.value)}
                    placeholder="e.g. Senior Product Designer"
                    className="w-full px-2.5 py-1 text-[12px] bg-[#f8f9ff] border border-outline-variant rounded-md focus:outline-none focus:border-[#0058be]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-[#091426] hover:bg-[#1e293b] text-white text-[12px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span className="material-symbols-outlined text-[16px]">login</span>
                Trigger Live Sign-In
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-[#f8f9ff] border-t border-outline-variant/40 flex items-center justify-between text-[12px]">
          <span className="text-[#75777d] flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-emerald-600">verified_user</span>
            COO Executive Privilege Enabled
          </span>
          <button
            onClick={() => setCooModalOpen(false)}
            className="px-4 py-1.5 bg-[#091426] text-white text-[12px] font-semibold rounded-lg hover:bg-[#1e293b] cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
