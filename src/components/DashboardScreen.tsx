import React, { useState } from 'react';
import { useJobContext } from '../context/JobContext';
import { useAuth } from '../context/AuthContext';
import { ApplicationStatus } from '../types';

export const DashboardScreen: React.FC = () => {
  const {
    candidate,
    applications,
    allPlatformApplications,
    savedJobIds,
    jobs,
    navigateToJobDetail,
    navigateToFindJobs,
    setInspectedApplication,
    navigateToApply,
    toggleSaveJob,
    updateApplicationStatus
  } = useJobContext();

  const {
    user,
    isAuthenticated,
    isCOO,
    signedInUsers,
    setAuthModalOpen,
    setCooModalOpen,
    setPortalLinksModalOpen
  } = useAuth();

  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [applicantSearch, setApplicantSearch] = useState<string>('');

  const savedJobs = jobs.filter((j) => savedJobIds.includes(j.id));
  const recommendedJobs = jobs.filter((j) => !savedJobIds.includes(j.id)).slice(0, 3);
  const interviewCount = applications.filter((a) => a.status === 'Interviewing' || a.status === 'Technical Round').length;

  // Filter COO applications
  const filteredCooApplications = allPlatformApplications.filter((app) => {
    if (statusFilter !== 'All' && app.status !== statusFilter) return false;
    if (applicantSearch.trim()) {
      const q = applicantSearch.toLowerCase();
      return (
        app.candidateName.toLowerCase().includes(q) ||
        app.candidateEmail.toLowerCase().includes(q) ||
        app.jobTitle.toLowerCase().includes(q) ||
        app.companyName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <main className="flex-grow pt-4 pb-16 px-4 md:px-12 max-w-[1280px] mx-auto w-full flex flex-col gap-6">
      {/* Role / Persona Banner */}
      <section className="bg-white p-5 md:p-6 rounded-2xl border border-outline-variant/60 shadow-resting flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-[26px] md:text-[32px] font-bold font-geist text-[#091426] tracking-tight">
              {isCOO
                ? `COO Executive Console • ${candidate.firstName} ${candidate.lastName}`
                : `My Applications • ${candidate.firstName} ${candidate.lastName}`}
            </h1>
            {isCOO ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-bold bg-[#091426] text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                COO Executive Access
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-semibold bg-[#eff4ff] text-[#0058be] border border-[#d8e2ff]">
                <span className="material-symbols-outlined text-[14px]">lock</span>
                Candidate Privacy Mode
              </span>
            )}
          </div>
          <p className="text-[14px] text-[#45474c] mt-1">
            {isCOO
              ? 'Real-time visibility into all platform candidates, inbound applications, and active sign-ins.'
              : 'Private portal showing only your personal applications, interview status, and saved jobs.'}
          </p>
        </div>

        {/* COO Quick Sharing Tool (Only rendered for COO) */}
        {isCOO && (
          <button
            onClick={() => setPortalLinksModalOpen(true)}
            className="px-3.5 py-2 bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0058be] text-[12px] font-bold rounded-xl border border-[#d8e2ff] transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs self-start md:self-auto"
            title="Open shareable links for Candidates and COO"
          >
            <span className="material-symbols-outlined text-[16px]">link</span>
            <span>Share Candidate & COO Links</span>
          </button>
        )}
      </section>

      {/* ========================================================================= */}
      {/* 1. COO EXECUTIVE VIEW (Visible ONLY when accessed via COO link)           */}
      {/* ========================================================================= */}
      {isCOO ? (
        <div className="flex flex-col gap-6">
          {/* COO Top Metric KPI Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-resting">
              <div className="flex items-center justify-between text-[#0058be] mb-2">
                <span className="material-symbols-outlined text-[24px]">inbox</span>
                <span className="text-[11px] font-bold uppercase bg-[#eff4ff] px-2 py-0.5 rounded text-[#0058be]">
                  Across Platform
                </span>
              </div>
              <p className="text-[32px] font-bold font-geist text-[#091426]">
                {allPlatformApplications.length}
              </p>
              <p className="text-[12px] text-[#45474c] font-medium mt-0.5">
                Total Inbound Applications
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-resting">
              <div className="flex items-center justify-between text-emerald-600 mb-2">
                <span className="material-symbols-outlined text-[24px]">group</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <p className="text-[32px] font-bold font-geist text-emerald-600">
                {signedInUsers.length}
              </p>
              <p className="text-[12px] text-[#45474c] font-medium mt-0.5">
                Live Signed-In Users Online
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-resting">
              <div className="flex items-center justify-between text-[#0058be] mb-2">
                <span className="material-symbols-outlined text-[24px]">event_available</span>
                <span className="text-[11px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                  Boardroom
                </span>
              </div>
              <p className="text-[32px] font-bold font-geist text-[#091426]">
                {allPlatformApplications.filter((a) => a.status === 'Interviewing' || a.status === 'Technical Round').length}
              </p>
              <p className="text-[12px] text-[#45474c] font-medium mt-0.5">
                Candidates in Interview Round
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-resting">
              <div className="flex items-center justify-between text-[#0058be] mb-2">
                <span className="material-symbols-outlined text-[24px]">domain</span>
                <button
                  onClick={() => setCooModalOpen(true)}
                  className="text-[11px] font-bold text-[#0058be] hover:underline"
                >
                  Live Monitor →
                </button>
              </div>
              <p className="text-[32px] font-bold font-geist text-[#091426]">
                {jobs.length}
              </p>
              <p className="text-[12px] text-[#45474c] font-medium mt-0.5">
                Active Open Positions
              </p>
            </div>
          </div>

          {/* Main COO Applications Pipeline Section */}
          <section className="bg-white rounded-2xl border border-outline-variant/60 shadow-resting p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-outline-variant/50">
              <div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#0058be] text-[22px]">assignment</span>
                  <h2 className="text-[20px] font-bold font-geist text-[#091426]">
                    All Inbound Candidate Applications (COO Overview)
                  </h2>
                </div>
                <p className="text-[13px] text-[#45474c] mt-0.5">
                  Review every candidate's resume and dossier, and update their hiring pipeline stage in real-time.
                </p>
              </div>

              {/* Filters & Search */}
              <div className="flex items-center gap-2.5 flex-wrap">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-2.5 top-2 text-[#75777d] text-[16px]">
                    search
                  </span>
                  <input
                    type="text"
                    value={applicantSearch}
                    onChange={(e) => setApplicantSearch(e.target.value)}
                    placeholder="Search candidate name, job, or email..."
                    className="pl-8 pr-3 py-1.5 text-[12px] bg-[#f8f9ff] border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0058be]/20 w-56"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-1.5 text-[12px] font-medium bg-[#f8f9ff] border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0058be]/20 text-[#091426]"
                >
                  <option value="All">All Statuses ({allPlatformApplications.length})</option>
                  <option value="Applied">Applied</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Interviewing">Interviewing</option>
                  <option value="Technical Round">Technical Round</option>
                  <option value="Offer Extended">Offer Extended</option>
                </select>
              </div>
            </div>

            {/* Applications Table / Cards */}
            <div className="divide-y divide-outline-variant/40 mt-2">
              {filteredCooApplications.length === 0 ? (
                <div className="text-center py-12 text-[#75777d] text-[14px]">
                  No applications found matching your filter criteria.
                </div>
              ) : (
                filteredCooApplications.map((app) => (
                  <div
                    key={app.id}
                    className="py-4 hover:bg-[#f8f9ff] transition-colors rounded-xl px-3 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                  >
                    {/* Left Info */}
                    <div className="flex items-start gap-3.5 min-w-0">
                      <div className="w-11 h-11 rounded-full bg-[#091426] text-white font-bold flex items-center justify-center text-[15px] shrink-0 shadow-xs">
                        {app.candidateName.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-[16px] font-bold text-[#091426] font-geist truncate">
                            {app.candidateName}
                          </h4>
                          <span className="text-[12px] text-[#75777d]">• {app.candidateEmail}</span>
                          {app.candidatePhone && (
                            <span className="text-[12px] text-[#75777d]">• {app.candidatePhone}</span>
                          )}
                        </div>

                        <p className="text-[14px] text-[#0058be] font-semibold mt-0.5 flex items-center gap-1.5">
                          <span>Applied for:</span>
                          <span className="underline decoration-dotted">{app.jobTitle}</span>
                          <span className="text-[#75777d] font-normal">at {app.companyName}</span>
                        </p>

                        <div className="flex items-center gap-3 text-[12px] text-[#45474c] mt-1.5 flex-wrap">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[15px] text-[#0058be]">description</span>
                            {app.resumeFileName || 'Resume.pdf'} ({app.resumeFileSize || '1.8 MB'})
                          </span>
                          <span className="text-[#c5c6cd]">•</span>
                          <span className="text-[#75777d]">{app.appliedDate}</span>
                          {app.coverNote && (
                            <>
                              <span className="text-[#c5c6cd]">•</span>
                              <span className="italic text-[#75777d] truncate max-w-xs">
                                "{app.coverNote}"
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right Controls: Status Selector & Inspection */}
                    <div className="flex items-center gap-3 shrink-0 self-end lg:self-center">
                      <div className="flex flex-col items-end">
                        <label className="text-[10px] uppercase font-bold text-[#75777d] mb-1">
                          COO Stage Control
                        </label>
                        <select
                          value={app.status}
                          onChange={(e) =>
                            updateApplicationStatus(app.id, e.target.value as ApplicationStatus)
                          }
                          className="px-2.5 py-1 text-[12px] font-bold rounded-lg border border-outline-variant bg-white text-[#091426] shadow-xs cursor-pointer focus:ring-2 focus:ring-[#0058be]"
                        >
                          <option value="Applied">Applied</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Interviewing">Interviewing</option>
                          <option value="Technical Round">Technical Round</option>
                          <option value="Offer Extended">Offer Extended</option>
                          <option value="Archived">Archived</option>
                        </select>
                      </div>

                      <button
                        onClick={() => setInspectedApplication(app)}
                        className="px-3.5 py-2 bg-[#091426] hover:bg-[#1e293b] text-white text-[12px] font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        Inspect Dossier
                        <span className="material-symbols-outlined text-[15px]">open_in_new</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Live Signed-In Users Section for COO */}
          <section className="bg-gradient-to-r from-[#091426] via-[#111f38] to-[#091426] rounded-2xl p-6 text-white shadow-floating border border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/15">
              <div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-400 text-[22px]">admin_panel_settings</span>
                  <h3 className="text-[18px] font-bold font-geist tracking-tight">
                    COO Real-Time Sign-In & Talent Stream
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Live Firestore Feed
                  </span>
                </div>
                <p className="text-[13px] text-[#adc6ff] mt-0.5">
                  Whenever any candidate signs in to HireStream, their session is streamed here immediately.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPortalLinksModalOpen(true)}
                  className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white text-[13px] font-semibold rounded-xl border border-white/20 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">share</span>
                  Share Links
                </button>
                <button
                  onClick={() => setCooModalOpen(true)}
                  className="px-4 py-2 bg-[#0058be] hover:bg-[#004ca8] text-white text-[13px] font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">group</span>
                  Full Directory ({signedInUsers.length})
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
              {signedInUsers.slice(0, 4).map((u) => (
                <div
                  key={u.userId}
                  onClick={() => setCooModalOpen(true)}
                  className="bg-white/10 hover:bg-white/15 border border-white/15 rounded-xl p-3.5 transition-all cursor-pointer group flex items-start gap-3"
                >
                  {u.photoURL ? (
                    <img
                      src={u.photoURL}
                      alt={u.displayName}
                      className="w-10 h-10 rounded-full object-cover border border-white/30 shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#0058be] text-white font-bold flex items-center justify-center text-[14px] shrink-0">
                      {u.displayName.charAt(0)}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[13px] font-bold text-white truncate group-hover:text-[#adc6ff] transition-colors">
                        {u.displayName}
                      </h4>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                    </div>
                    <p className="text-[11px] text-[#d8e2ff] truncate">{u.email}</p>
                    <p className="text-[11px] text-[#adc6ff] font-medium mt-0.5 truncate">{u.title}</p>
                    <div className="flex items-center justify-between text-[10px] text-white/70 mt-1.5">
                      <span>{u.status}</span>
                      <span className="font-mono">{u.lastActiveDisplay}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      ) : (
        /* ========================================================================= */
        /* 2. GENERAL USER / CANDIDATE VIEW (Strictly Private to this Candidate)     */
        /* ========================================================================= */
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column (8 cols): Stats & Personal Applications */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
            {/* Candidate Stats */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl border border-outline-variant/60 p-5 shadow-resting">
                <div className="flex items-center gap-2 mb-2 text-[#0058be]">
                  <span className="material-symbols-outlined icon-fill text-[24px]">description</span>
                  <h3 className="text-[13px] font-semibold text-[#45474c] font-geist">
                    My Applications
                  </h3>
                </div>
                <p className="text-[32px] font-bold font-geist text-[#091426]">
                  {applications.length}
                </p>
                <p className="text-[12px] text-emerald-700 flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-[14px]">lock</span>
                  Private to your account
                </p>
              </div>

              <div className="bg-white rounded-xl border border-outline-variant/60 p-5 shadow-resting">
                <div className="flex items-center gap-2 mb-2 text-[#0058be]">
                  <span className="material-symbols-outlined icon-fill text-[24px]">calendar_today</span>
                  <h3 className="text-[13px] font-semibold text-[#45474c] font-geist">
                    Interviews Scheduled
                  </h3>
                </div>
                <p className="text-[32px] font-bold font-geist text-[#091426]">
                  {interviewCount}
                </p>
                <p className="text-[12px] text-[#0058be] font-medium mt-1">
                  {interviewCount > 0 ? '1 interview in review' : 'Pending recruiter review'}
                </p>
              </div>

              <div className="bg-white rounded-xl border border-outline-variant/60 p-5 shadow-resting">
                <div className="flex items-center gap-2 mb-2 text-[#0058be]">
                  <span className="material-symbols-outlined icon-fill text-[24px]">bookmark</span>
                  <h3 className="text-[13px] font-semibold text-[#45474c] font-geist">
                    My Saved Jobs
                  </h3>
                </div>
                <p className="text-[32px] font-bold font-geist text-[#091426]">
                  {savedJobIds.length}
                </p>
                <p className="text-[12px] text-[#75777d] mt-1">Bookmarked opportunities</p>
              </div>
            </section>

            {/* Personal Active Applications */}
            <section className="bg-white rounded-xl border border-outline-variant/60 p-6 shadow-resting">
              <div className="flex justify-between items-center mb-6 pb-3 border-b border-outline-variant/50">
                <h2 className="text-[20px] font-bold font-geist text-[#091426]">
                  My Active Applications ({applications.length})
                </h2>
                <button
                  onClick={navigateToFindJobs}
                  className="text-[13px] text-[#0058be] font-semibold hover:underline cursor-pointer"
                >
                  + Apply to New Role
                </button>
              </div>

              {applications.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#0058be] mx-auto mb-3">
                    <span className="material-symbols-outlined text-[24px]">work_outline</span>
                  </div>
                  <h3 className="text-[16px] font-bold text-[#091426] mb-1">No applications yet</h3>
                  <p className="text-[14px] text-[#45474c] mb-4">
                    Explore open roles and apply with your candidate profile.
                  </p>
                  <button
                    onClick={navigateToFindJobs}
                    className="px-4 py-2 bg-[#0058be] text-white text-[14px] font-semibold rounded-lg hover:bg-[#004ca8] transition-colors cursor-pointer"
                  >
                    Browse Open Roles
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {applications.map((app) => {
                    const isInterviewing = app.status === 'Interviewing' || app.status === 'Technical Round';
                    return (
                      <div
                        key={app.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-outline-variant/50 hover:border-[#0058be]/40 hover:bg-[#fcfdff] transition-all gap-4"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-[16px] font-bold text-[#091426] font-geist">
                              {app.jobTitle}
                            </h3>
                            <span className="text-[12px] text-[#75777d]">• {app.appliedDate}</span>
                          </div>
                          <p className="text-[14px] text-[#45474c] flex items-center gap-2 flex-wrap">
                            <span className="material-symbols-outlined text-[16px] text-[#75777d]">
                              apartment
                            </span>
                            <span className="font-medium text-[#091426]">{app.companyName}</span>
                            <span className="text-[#c5c6cd]">•</span>
                            <span className="material-symbols-outlined text-[16px] text-[#75777d]">
                              location_on
                            </span>
                            <span>{app.location}</span>
                          </p>
                        </div>

                        <div className="flex flex-row sm:flex-col sm:items-end justify-between items-center gap-2.5">
                          <span
                            className={`px-3 py-1 rounded-full text-[12px] font-semibold ${
                              isInterviewing
                                ? 'bg-[#eff4ff] text-[#0058be] border border-[#d8e2ff]'
                                : 'bg-[#f1f5f9] text-[#091426] border border-outline-variant/50'
                            }`}
                          >
                            {app.status}
                          </span>
                          <button
                            onClick={() => setInspectedApplication(app)}
                            className="text-[13px] font-semibold text-[#0058be] hover:text-[#091426] transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            View Details
                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </div>

          {/* Right Column (4 cols): Personal Saved Jobs */}
          <aside className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            <section className="bg-white rounded-xl border border-outline-variant/60 p-5 shadow-resting">
              <div className="flex justify-between items-center mb-4 border-b border-outline-variant/50 pb-2.5">
                <h2 className="text-[18px] font-bold font-geist text-[#091426]">
                  My Saved Jobs
                </h2>
                <span className="text-[12px] text-[#75777d]">{savedJobs.length} total</span>
              </div>

              {savedJobs.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-[13px] text-[#45474c] mb-3">No saved jobs currently.</p>
                  <button
                    onClick={navigateToFindJobs}
                    className="text-[12px] text-[#0058be] hover:underline font-semibold"
                  >
                    Browse & bookmark roles
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {savedJobs.slice(0, 3).map((job, idx) => (
                    <div
                      key={job.id}
                      className={`group cursor-pointer ${idx > 0 ? 'border-t border-outline-variant/40 pt-3' : ''}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div onClick={() => navigateToJobDetail(job.id)} className="flex-1">
                          <h4 className="text-[15px] font-semibold text-[#091426] group-hover:text-[#0058be] transition-colors">
                            {job.title}
                          </h4>
                          <p className="text-[13px] text-[#45474c] mt-0.5">
                            {job.companyName} • {job.location}
                          </p>
                        </div>
                        <button
                          onClick={() => toggleSaveJob(job.id)}
                          className="text-[#75777d] hover:text-red-500 p-1 cursor-pointer"
                          title="Remove from saved"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete_outline</span>
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[#0058be] text-[11px] font-bold uppercase tracking-wider">
                          {job.jobType}
                        </span>
                        <button
                          onClick={() => navigateToApply(job.id)}
                          className="text-[12px] text-[#0058be] font-semibold hover:underline cursor-pointer"
                        >
                          Apply Now →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Recommended Jobs */}
            <section className="bg-white rounded-xl border border-outline-variant/60 p-5 shadow-resting">
              <h2 className="text-[18px] font-bold font-geist text-[#091426] mb-4 border-b border-outline-variant/50 pb-2.5">
                Recommended for you
              </h2>

              <div className="flex flex-col gap-4">
                {recommendedJobs.map((rec) => (
                  <div
                    key={rec.id}
                    onClick={() => navigateToJobDetail(rec.id)}
                    className="flex gap-3 items-start p-2 rounded-lg hover:bg-[#f8f9ff] transition-colors cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#0058be] shrink-0 border border-[#d8e2ff]">
                      <span className="material-symbols-outlined text-[20px]">
                        {rec.department.toLowerCase().includes('design') ? 'design_services' : 'business_center'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[14px] font-semibold text-[#091426] group-hover:text-[#0058be] transition-colors leading-tight">
                        {rec.title}
                      </h4>
                      <p className="text-[12px] text-[#45474c] mt-0.5">
                        {rec.companyName} • {rec.location}
                      </p>
                      <p className="text-[12px] font-medium text-[#0058be] mt-1">
                        {rec.salaryDisplay}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      )}
    </main>
  );
};
