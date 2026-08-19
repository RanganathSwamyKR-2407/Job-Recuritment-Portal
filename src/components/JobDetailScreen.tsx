import React from 'react';
import { useJobContext } from '../context/JobContext';

export const JobDetailScreen: React.FC = () => {
  const {
    selectedJob,
    navigateToFindJobs,
    navigateToApply,
    navigateToCompanyDetail,
    toggleSaveJob,
    isJobSaved,
    companies
  } = useJobContext();

  if (!selectedJob) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 py-16 text-center">
        <p className="text-[16px] text-[#45474c]">No job selected.</p>
        <button
          onClick={navigateToFindJobs}
          className="mt-4 px-4 py-2 bg-[#0058be] text-white rounded-lg"
        >
          Back to Job Directory
        </button>
      </div>
    );
  }

  const saved = isJobSaved(selectedJob.id);
  const company = companies.find((c) => c.id === selectedJob.companyId) || {
    id: selectedJob.companyId,
    name: selectedJob.companyName,
    about: `${selectedJob.companyName} is a leading technology organization building next-generation digital experiences.`,
    location: selectedJob.location
  };

  return (
    <div className="w-full">
      {/* Top Detail Navigation Header */}
      <div className="bg-white border-b border-outline-variant/60 shadow-xs">
        <div className="max-w-[1280px] mx-auto px-4 md:px-12 py-3 flex items-center justify-between">
          <button
            onClick={navigateToFindJobs}
            className="flex items-center gap-2 text-[14px] font-medium text-[#45474c] hover:text-[#0058be] transition-colors cursor-pointer group"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-0.5 transition-transform">
              arrow_back
            </span>
            <span>Back to Search</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveJob(selectedJob.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[13px] font-medium transition-colors cursor-pointer ${
                saved
                  ? 'bg-[#eff4ff] border-[#d8e2ff] text-[#0058be]'
                  : 'bg-white border-outline-variant/60 text-[#45474c] hover:bg-[#f8f9ff]'
              }`}
            >
              <span className={`material-symbols-outlined text-[18px] ${saved ? 'icon-fill' : ''}`}>
                {saved ? 'bookmark' : 'bookmark_border'}
              </span>
              {saved ? 'Saved' : 'Save'}
            </button>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                alert('Job link copied to clipboard!');
              }}
              className="p-1.5 rounded-lg border border-outline-variant/60 text-[#45474c] hover:bg-[#f8f9ff] transition-colors cursor-pointer"
              title="Share Job"
            >
              <span className="material-symbols-outlined text-[18px]">share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <main className="flex-grow w-full max-w-[1280px] mx-auto px-4 md:px-12 py-8 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-8 relative">
        {/* Left Column (8 cols): Hero Header & Description */}
        <div className="md:col-span-8 flex flex-col gap-6">
          {/* Hero Header Card */}
          <section className="bg-white rounded-xl p-6 md:p-8 shadow-resting border border-outline-variant/40 flex flex-col gap-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-5">
                {/* Company Logo (80x80) */}
                <div className="w-[80px] h-[80px] rounded-xl overflow-hidden border border-outline-variant/50 flex-shrink-0 bg-white flex items-center justify-center p-2 shadow-xs">
                  <img
                    src={selectedJob.companyLogo}
                    alt={`${selectedJob.companyName} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div>
                  <h1 className="text-[28px] md:text-[36px] font-bold font-geist text-[#091426] leading-tight mb-1">
                    {selectedJob.title}
                  </h1>
                  <div className="flex items-center flex-wrap gap-2 text-[16px] text-[#45474c]">
                    <span className="font-semibold text-[#091426]">
                      {selectedJob.companyName}
                    </span>
                    <span className="text-[#c5c6cd]">•</span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[18px] text-[#75777d]">
                        location_on
                      </span>
                      {selectedJob.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chips Row */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-outline-variant/30">
              <span className="bg-[#eff4ff] text-[#0058be] px-3.5 py-1 rounded-full text-[13px] font-semibold border border-[#d8e2ff]">
                {selectedJob.jobType}
              </span>
              <span className="bg-[#eff4ff] text-[#0058be] px-3.5 py-1 rounded-full text-[13px] font-semibold border border-[#d8e2ff]">
                {selectedJob.workplaceType}
              </span>
              {selectedJob.isFeatured && (
                <span className="bg-[#e5eeff] text-[#0b1c30] px-3.5 py-1 rounded-full text-[13px] font-semibold flex items-center gap-1.5 border border-[#d3e4fe]">
                  <span className="material-symbols-outlined text-[15px] text-[#0058be] icon-fill">
                    star
                  </span>
                  Featured Role
                </span>
              )}
              {selectedJob.experienceLevel && (
                <span className="bg-[#f8f9ff] text-[#45474c] px-3.5 py-1 rounded-full text-[13px] font-medium border border-outline-variant/60">
                  {selectedJob.experienceLevel}
                </span>
              )}
            </div>
          </section>

          {/* Job Description Card */}
          <section className="bg-white rounded-xl p-6 md:p-8 shadow-resting border border-outline-variant/40 flex flex-col gap-8">
            {/* About the Role */}
            <div>
              <h2 className="text-[20px] md:text-[22px] font-bold font-geist text-[#091426] mb-3">
                About the Role
              </h2>
              <p className="text-[15px] text-[#45474c] leading-relaxed">
                {selectedJob.aboutRole}
              </p>
            </div>

            {/* What You'll Do */}
            <div>
              <h2 className="text-[20px] md:text-[22px] font-bold font-geist text-[#091426] mb-4">
                What You'll Do
              </h2>
              <ul className="space-y-3.5">
                {selectedJob.whatYoullDo.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-[15px] text-[#45474c] leading-relaxed">
                    <span className="material-symbols-outlined text-[#0058be] text-[20px] mt-0.5 shrink-0 icon-fill">
                      check_circle
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What We're Looking For */}
            <div>
              <h2 className="text-[20px] md:text-[22px] font-bold font-geist text-[#091426] mb-4">
                What We're Looking For
              </h2>
              <ul className="space-y-3.5">
                {selectedJob.whatWereLookingFor.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-[15px] text-[#45474c] leading-relaxed">
                    <span className="material-symbols-outlined text-[#75777d] text-[20px] mt-0.5 shrink-0">
                      horizontal_rule
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits & Compensation if available */}
            {selectedJob.benefits && selectedJob.benefits.length > 0 && (
              <div className="pt-4 border-t border-outline-variant/30">
                <h2 className="text-[20px] md:text-[22px] font-bold font-geist text-[#091426] mb-4">
                  Benefits & Perks
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedJob.benefits.map((benefit, i) => (
                    <div
                      key={i}
                      className="p-3 bg-[#f8f9ff] rounded-lg border border-outline-variant/40 flex items-start gap-2.5"
                    >
                      <span className="material-symbols-outlined text-[#0058be] text-[18px] shrink-0 mt-0.5">
                        verified
                      </span>
                      <span className="text-[13px] text-[#0b1c30] font-medium leading-tight">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Right Sticky Sidebar (4 cols) */}
        <aside className="md:col-span-4 flex flex-col gap-6">
          <div className="sticky top-[104px] flex flex-col gap-6">
            {/* Role Overview Card matching Image 1 */}
            <div className="bg-white rounded-xl p-6 shadow-floating border border-outline-variant/40 flex flex-col gap-5 relative overflow-hidden">
              {/* Ambient Top Border Accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-[#0058be]" />

              <h3 className="text-[20px] font-bold font-geist text-[#091426]">
                Role Overview
              </h3>

              <div className="flex flex-col gap-1">
                {/* Salary Range */}
                <div className="flex items-center gap-3.5 py-3 border-b border-[#e5eeff]">
                  <div className="w-10 h-10 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#0058be] shrink-0">
                    <span className="material-symbols-outlined text-[22px]">payments</span>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#75777d] font-geist">
                      Salary Range
                    </div>
                    <div className="text-[15px] font-bold text-[#091426]">
                      {selectedJob.salaryDisplay}
                    </div>
                  </div>
                </div>

                {/* Job Type */}
                <div className="flex items-center gap-3.5 py-3 border-b border-[#e5eeff]">
                  <div className="w-10 h-10 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#0058be] shrink-0">
                    <span className="material-symbols-outlined text-[22px]">work</span>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#75777d] font-geist">
                      Job Type
                    </div>
                    <div className="text-[15px] font-medium text-[#091426]">
                      {selectedJob.jobTypeDetails || selectedJob.jobType}
                    </div>
                  </div>
                </div>

                {/* Department */}
                <div className="flex items-center gap-3.5 py-3 border-b border-[#e5eeff]">
                  <div className="w-10 h-10 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#0058be] shrink-0">
                    <span className="material-symbols-outlined text-[22px]">business</span>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#75777d] font-geist">
                      Department
                    </div>
                    <div className="text-[15px] font-medium text-[#091426]">
                      {selectedJob.department}
                    </div>
                  </div>
                </div>

                {/* Posted */}
                <div className="flex items-center gap-3.5 py-3">
                  <div className="w-10 h-10 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#0058be] shrink-0">
                    <span className="material-symbols-outlined text-[22px]">calendar_today</span>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#75777d] font-geist">
                      Posted
                    </div>
                    <div className="text-[15px] font-medium text-[#091426]">
                      {selectedJob.postedDate}
                    </div>
                  </div>
                </div>
              </div>

              {/* Primary Action Button */}
              <button
                onClick={() => navigateToApply(selectedJob.id)}
                className="w-full bg-[#0058be] hover:bg-[#2170e4] text-white py-3 px-4 rounded-lg text-[15px] font-semibold font-geist flex justify-center items-center gap-2 transition-all shadow-[0_4px_12px_rgba(0,88,190,0.25)] cursor-pointer mt-1"
              >
                Apply Now
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>

              <div className="text-center text-[12px] text-[#75777d]">
                {selectedJob.responseSpeed || 'Typically responds within 3 days'}
              </div>
            </div>

            {/* Company Mini Profile Card matching Image 1 */}
            <div className="bg-white rounded-xl p-6 shadow-resting border border-outline-variant/40 flex flex-col gap-3">
              <h3 className="text-[18px] font-bold font-geist text-[#091426]">
                About {company.name}
              </h3>
              <p className="text-[13px] text-[#45474c] leading-relaxed line-clamp-3">
                {company.about}
              </p>
              <button
                onClick={() => navigateToCompanyDetail(company.id)}
                className="text-[#0058be] hover:underline text-[13px] font-semibold inline-flex items-center gap-1 mt-1 cursor-pointer w-fit"
              >
                View Company Profile
                <span className="material-symbols-outlined text-[15px]">open_in_new</span>
              </button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};
