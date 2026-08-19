import React, { useState } from 'react';
import { useJobContext } from '../context/JobContext';
import { useAuth } from '../context/AuthContext';

export const Header: React.FC = () => {
  const {
    currentScreen,
    navigateToFindJobs,
    navigateToDashboard,
    navigateToCompanies,
    setIsPostJobModalOpen,
    applications,
    allPlatformApplications
  } = useJobContext();

  const {
    user,
    candidateProfile,
    isAuthenticated,
    isCOO,
    signedInUsers,
    setAuthModalOpen,
    setAuthModalTab,
    setCooModalOpen,
    setPortalLinksModalOpen,
    signOutUser
  } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const isJobsActive =
    currentScreen === 'find-jobs' ||
    currentScreen === 'job-detail' ||
    currentScreen === 'apply' ||
    currentScreen === 'apply-success';
  const isDashboardActive = currentScreen === 'dashboard';
  const isCompaniesActive = currentScreen === 'companies' || currentScreen === 'company-detail';

  const handleOpenCandidateLogin = () => {
    setAuthModalTab('candidate');
    setAuthModalOpen(true);
    setProfileDropdownOpen(false);
  };

  const handleOpenCooLogin = () => {
    setAuthModalTab('coo');
    setAuthModalOpen(true);
    setProfileDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-outline-variant/60">
      <div className="max-w-[1280px] mx-auto px-4 md:px-12 h-16 flex items-center justify-between">
        {/* Left: Brand Logo & Navigation */}
        <div className="flex items-center gap-6">
          <button
            onClick={navigateToFindJobs}
            className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-[#091426] flex items-center justify-center text-white shadow-xs group-hover:bg-[#0058be] transition-colors">
              <span className="material-symbols-outlined filled text-white text-[18px]">work</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[20px] font-bold font-geist tracking-tight text-[#091426]">
                HireStream
              </span>
              {isCOO && (
                <span className="px-2 py-0.5 text-[10px] font-bold bg-[#091426] text-white rounded-md tracking-wider">
                  COO PORTAL
                </span>
              )}
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={navigateToFindJobs}
              className={`px-3 py-2 rounded-lg text-[14px] font-medium transition-all relative ${
                isJobsActive
                  ? 'text-[#0058be] font-bold after:content-[""] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2.5px] after:bg-[#0058be] after:rounded-full'
                  : 'text-[#45474c] hover:text-[#0058be] hover:bg-[#eff4ff]'
              }`}
            >
              Find Jobs
            </button>

            <button
              onClick={navigateToCompanies}
              className={`px-3 py-2 rounded-lg text-[14px] font-medium transition-all relative ${
                isCompaniesActive
                  ? 'text-[#0058be] font-bold after:content-[""] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2.5px] after:bg-[#0058be] after:rounded-full'
                  : 'text-[#45474c] hover:text-[#0058be] hover:bg-[#eff4ff]'
              }`}
            >
              Companies
            </button>

            <button
              onClick={navigateToDashboard}
              className={`px-3 py-2 rounded-lg text-[14px] font-medium transition-all flex items-center gap-2 relative ${
                isDashboardActive
                  ? 'text-[#0058be] font-bold after:content-[""] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2.5px] after:bg-[#0058be] after:rounded-full'
                  : 'text-[#45474c] hover:text-[#0058be] hover:bg-[#eff4ff]'
              }`}
            >
              {isCOO ? 'COO Dashboard' : 'My Applications'}
              <span className="px-1.5 py-0.5 text-[11px] font-bold bg-[#d8e2ff] text-[#0058be] rounded-full">
                {isCOO ? allPlatformApplications.length : applications.length}
              </span>
            </button>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* COO-Only Tools (Only rendered when opened via COO link) */}
          {isCOO && (
            <>
              {/* Shareable 2 Portal Links Button */}
              <button
                onClick={() => setPortalLinksModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-bold text-[#0058be] bg-[#eff4ff] hover:bg-[#dce9ff] border border-[#d8e2ff] rounded-lg transition-colors cursor-pointer shadow-2xs"
                title="Get shareable links for Candidates and COO"
              >
                <span className="material-symbols-outlined text-[16px]">link</span>
                <span>Share Links</span>
              </button>

              {/* COO Live Users Modal Button */}
              <button
                onClick={() => setCooModalOpen(true)}
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-bold text-white bg-[#091426] hover:bg-[#1e293b] rounded-lg transition-colors cursor-pointer border border-[#1e293b] shadow-xs"
                title="Open COO Live User Directory"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Live Users</span>
                <span className="px-1.5 py-0.2 bg-[#0058be] text-[10px] text-white rounded-full font-mono">
                  {signedInUsers.length}
                </span>
              </button>

              {/* Post a Job Button */}
              <button
                onClick={() => setIsPostJobModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-[#0058be] bg-[#eff4ff] hover:bg-[#dce9ff] border border-[#d8e2ff] rounded-lg transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">add_circle</span>
                Post Job
              </button>
            </>
          )}

          {/* Dedicated Sign In & Login Button (Visible to everyone) */}
          <button
            onClick={handleOpenCandidateLogin}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-bold text-[#0058be] bg-[#eff4ff] hover:bg-[#dce9ff] border border-[#d8e2ff] rounded-lg transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">login</span>
            <span>Sign In</span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#091426] hover:bg-[#1e293b] text-white rounded-lg text-[13px] font-medium transition-all shadow-sm focus:outline-none cursor-pointer"
            >
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={candidateProfile.firstName}
                  className="w-6 h-6 rounded-full object-cover border border-white/20"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-[#0058be] text-white flex items-center justify-center text-[11px] font-bold">
                  {candidateProfile.firstName.charAt(0)}
                </div>
              )}
              <span className="hidden sm:inline font-geist">
                {candidateProfile.firstName} {candidateProfile.lastName}
              </span>
              <span className="material-symbols-outlined text-[15px] opacity-70">
                {profileDropdownOpen ? 'expand_less' : 'expand_more'}
              </span>
            </button>

            {profileDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-floating border border-outline-variant/50 py-2 z-50 animate-in fade-in duration-150"
                onClick={() => setProfileDropdownOpen(false)}
              >
                <div className="px-4 py-3 border-b border-outline-variant/30 bg-[#f8f9ff]">
                  <div className="flex items-center justify-between">
                    <p className="text-[14px] font-semibold text-[#091426]">
                      {candidateProfile.firstName} {candidateProfile.lastName}
                    </p>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                        isCOO ? 'bg-[#091426] text-white' : 'bg-[#eff4ff] text-[#0058be]'
                      }`}
                    >
                      {isCOO ? 'COO Role' : 'Candidate'}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#45474c] truncate mt-0.5">
                    {user?.email || candidateProfile.email}
                  </p>
                  <span className="inline-block mt-1.5 px-2 py-0.5 text-[10px] font-semibold bg-[#eff4ff] text-[#0058be] rounded-full">
                    {candidateProfile.title}
                  </span>
                </div>

                <div className="py-1">
                  <button
                    onClick={handleOpenCandidateLogin}
                    className="w-full text-left px-4 py-2 text-[13px] text-[#0058be] hover:bg-[#eff4ff] flex items-center justify-between font-semibold cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">person_add</span>
                      Candidate Sign In / Register
                    </span>
                  </button>

                  <button
                    onClick={handleOpenCooLogin}
                    className="w-full text-left px-4 py-2 text-[13px] text-[#091426] hover:bg-[#eff4ff] flex items-center justify-between font-semibold cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-amber-600">admin_panel_settings</span>
                      COO Executive Login
                    </span>
                  </button>

                  {isCOO && (
                    <>
                      <button
                        onClick={() => setPortalLinksModalOpen(true)}
                        className="w-full text-left px-4 py-2 text-[13px] text-[#0058be] hover:bg-[#eff4ff] flex items-center justify-between font-semibold cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px]">link</span>
                          Share Portal Links
                        </span>
                      </button>

                      <button
                        onClick={() => setCooModalOpen(true)}
                        className="w-full text-left px-4 py-2 text-[13px] text-[#091426] hover:bg-[#eff4ff] flex items-center justify-between font-semibold cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px] text-[#0058be]">group</span>
                          COO Live Users Monitor
                        </span>
                        <span className="text-[11px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-bold">
                          {signedInUsers.length} Online
                        </span>
                      </button>
                    </>
                  )}

                  <button
                    onClick={navigateToDashboard}
                    className="w-full text-left px-4 py-2 text-[13px] text-[#0b1c30] hover:bg-[#eff4ff] flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-[#0058be]">dashboard</span>
                      {isCOO ? 'COO Pipeline Dashboard' : 'My Applications'}
                    </span>
                    <span className="text-[11px] bg-[#e5eeff] text-[#0058be] px-1.5 py-0.5 rounded-full font-bold">
                      {isCOO ? allPlatformApplications.length : applications.length}
                    </span>
                  </button>

                  <button
                    onClick={navigateToFindJobs}
                    className="w-full text-left px-4 py-2 text-[13px] text-[#0b1c30] hover:bg-[#eff4ff] flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px] text-[#0058be]">search</span>
                    Browse Open Roles
                  </button>
                </div>

                <div className="border-t border-outline-variant/30 pt-1">
                  {isAuthenticated && (
                    <button
                      onClick={() => signOutUser()}
                      className="w-full text-left px-4 py-2 text-[13px] text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">logout</span>
                      Sign Out
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#45474c] hover:text-[#091426] hover:bg-[#eff4ff] rounded-lg focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-outline-variant shadow-lg px-4 py-4 space-y-2">
          <div className="grid grid-cols-2 gap-2 mb-2">
            <button
              onClick={() => {
                handleOpenCandidateLogin();
                setMobileMenuOpen(false);
              }}
              className="py-2 px-3 text-[13px] font-bold text-[#0058be] bg-[#eff4ff] rounded-lg text-center"
            >
              👤 Candidate Sign In
            </button>
            <button
              onClick={() => {
                handleOpenCooLogin();
                setMobileMenuOpen(false);
              }}
              className="py-2 px-3 text-[13px] font-bold text-white bg-[#091426] rounded-lg text-center"
            >
              👑 COO Login
            </button>
          </div>

          <button
            onClick={() => {
              navigateToFindJobs();
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-[15px] font-medium flex items-center justify-between ${
              isJobsActive ? 'bg-[#eff4ff] text-[#0058be] font-bold' : 'text-[#0b1c30]'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[20px]">search</span>
              Find Jobs
            </span>
          </button>

          <button
            onClick={() => {
              navigateToDashboard();
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-[15px] font-medium flex items-center justify-between ${
              isDashboardActive ? 'bg-[#eff4ff] text-[#0058be] font-bold' : 'text-[#0b1c30]'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[20px]">dashboard</span>
              {isCOO ? 'COO Dashboard' : 'My Applications'}
            </span>
            <span className="px-2 py-0.5 text-[12px] font-bold bg-[#d8e2ff] text-[#0058be] rounded-full">
              {isCOO ? allPlatformApplications.length : applications.length}
            </span>
          </button>
        </div>
      )}
    </header>
  );
};
