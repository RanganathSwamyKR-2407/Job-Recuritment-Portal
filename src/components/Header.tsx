import React, { useState } from 'react';
import { useJobContext } from '../context/JobContext';

export const Header: React.FC = () => {
  const {
    currentScreen,
    navigateToFindJobs,
    navigateToDashboard,
    navigateToCompanies,
    setIsPostJobModalOpen,
    applications,
    savedJobIds,
    candidate
  } = useJobContext();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const isJobsActive = currentScreen === 'find-jobs' || currentScreen === 'job-detail' || currentScreen === 'apply' || currentScreen === 'apply-success';
  const isCompaniesActive = currentScreen === 'companies' || currentScreen === 'company-detail';
  const isDashboardActive = currentScreen === 'dashboard';

  return (
    <header className="bg-surface/95 backdrop-blur-md border-b border-outline-variant/60 shadow-sm fixed top-0 left-0 right-0 w-full z-50 h-20 transition-all">
      <div className="max-w-[1280px] h-full mx-auto px-4 md:px-12 flex items-center justify-between">
        {/* Left: Brand & Main Navigation */}
        <div className="flex items-center gap-8 lg:gap-14">
          <button
            onClick={navigateToFindJobs}
            className="flex items-center gap-2 text-left group focus:outline-none"
            aria-label="HireStream Home"
          >
            <div className="w-9 h-9 rounded-lg bg-[#091426] flex items-center justify-center text-white shadow-sm group-hover:bg-[#0058be] transition-colors">
              <span className="material-symbols-outlined text-[20px] text-white icon-fill">work</span>
            </div>
            <span className="text-[24px] font-bold tracking-tight text-[#091426] font-geist">
              HireStream
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-3">
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
              Dashboard
              {applications.length > 0 && (
                <span className="px-1.5 py-0.5 text-[11px] font-bold bg-[#d8e2ff] text-[#0058be] rounded-full">
                  {applications.length}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Post a Job Button (Recruiter mode) */}
          <button
            onClick={() => setIsPostJobModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-semibold text-[#0058be] bg-[#eff4ff] hover:bg-[#dce9ff] border border-[#d8e2ff] rounded-lg transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            Post a Job
          </button>

          {/* Candidate Profile / Sign In Pill */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2.5 px-3.5 py-1.5 bg-[#091426] hover:bg-[#1e293b] text-white rounded-lg text-[14px] font-medium transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0058be]/40"
            >
              <div className="w-6 h-6 rounded-full bg-[#0058be] text-white flex items-center justify-center text-[12px] font-bold">
                {candidate.firstName.charAt(0)}
              </div>
              <span className="hidden sm:inline font-geist font-medium">
                {candidate.firstName} {candidate.lastName.charAt(0)}.
              </span>
              <span className="material-symbols-outlined text-[16px] opacity-70">
                {profileDropdownOpen ? 'expand_less' : 'expand_more'}
              </span>
            </button>

            {/* Profile Dropdown */}
            {profileDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-floating border border-outline-variant/50 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onClick={() => setProfileDropdownOpen(false)}
              >
                <div className="px-4 py-2.5 border-b border-outline-variant/30">
                  <p className="text-[14px] font-semibold text-[#091426]">{candidate.firstName} {candidate.lastName}</p>
                  <p className="text-[12px] text-[#45474c] truncate">{candidate.email}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-semibold bg-[#eff4ff] text-[#0058be] rounded-full">
                    {candidate.title}
                  </span>
                </div>
                <div className="py-1">
                  <button
                    onClick={navigateToDashboard}
                    className="w-full text-left px-4 py-2 text-[13px] text-[#0b1c30] hover:bg-[#eff4ff] flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-[#0058be]">dashboard</span>
                      Candidate Dashboard
                    </span>
                    <span className="text-[11px] bg-[#e5eeff] text-[#0058be] px-1.5 py-0.5 rounded-full font-bold">
                      {applications.length}
                    </span>
                  </button>
                  <button
                    onClick={navigateToDashboard}
                    className="w-full text-left px-4 py-2 text-[13px] text-[#0b1c30] hover:bg-[#eff4ff] flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-[#0058be]">bookmark</span>
                      Saved Jobs
                    </span>
                    <span className="text-[11px] bg-[#e5eeff] text-[#0058be] px-1.5 py-0.5 rounded-full font-bold">
                      {savedJobIds.length}
                    </span>
                  </button>
                  <button
                    onClick={navigateToFindJobs}
                    className="w-full text-left px-4 py-2 text-[13px] text-[#0b1c30] hover:bg-[#eff4ff] flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px] text-[#0058be]">search</span>
                    Browse Open Roles
                  </button>
                </div>
                <div className="border-t border-outline-variant/30 pt-1">
                  <button
                    onClick={() => setIsPostJobModalOpen(true)}
                    className="w-full text-left px-4 py-2 text-[13px] text-[#0058be] font-medium hover:bg-[#eff4ff] flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">add_circle</span>
                    Post a New Job
                  </button>
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
              navigateToCompanies();
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-[15px] font-medium flex items-center justify-between ${
              isCompaniesActive ? 'bg-[#eff4ff] text-[#0058be] font-bold' : 'text-[#0b1c30]'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[20px]">corporate_fare</span>
              Companies
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
              Dashboard
            </span>
            <span className="text-[12px] bg-[#d8e2ff] text-[#0058be] px-2 py-0.5 rounded-full font-bold">
              {applications.length}
            </span>
          </button>

          <div className="pt-2 border-t border-outline-variant/40">
            <button
              onClick={() => {
                setIsPostJobModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2.5 bg-[#eff4ff] text-[#0058be] font-semibold text-[14px] rounded-lg border border-[#d8e2ff]"
            >
              + Post a Job Listing
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
