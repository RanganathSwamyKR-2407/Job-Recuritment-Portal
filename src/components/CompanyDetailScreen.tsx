import React from 'react';
import { useJobContext } from '../context/JobContext';

export const CompanyDetailScreen: React.FC = () => {
  const { selectedCompany, jobs, navigateToCompanies, navigateToJobDetail, navigateToApply } = useJobContext();

  if (!selectedCompany) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 py-16 text-center">
        <p className="text-[16px] text-[#45474c]">Company not found.</p>
        <button
          onClick={navigateToCompanies}
          className="mt-4 px-4 py-2 bg-[#0058be] text-white rounded-lg"
        >
          Back to Companies
        </button>
      </div>
    );
  }

  const companyJobs = jobs.filter(
    (j) => j.companyId === selectedCompany.id || j.companyName === selectedCompany.name
  );

  return (
    <div className="w-full">
      {/* Top Bar */}
      <div className="bg-white border-b border-outline-variant/60 shadow-xs">
        <div className="max-w-[1280px] mx-auto px-4 md:px-12 py-3 flex items-center justify-between">
          <button
            onClick={navigateToCompanies}
            className="flex items-center gap-2 text-[14px] font-medium text-[#45474c] hover:text-[#0058be] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            Back to Companies
          </button>
        </div>
      </div>

      <main className="max-w-[1280px] mx-auto px-4 md:px-12 py-8 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left 8 Cols: Overview & Open Positions */}
        <div className="md:col-span-8 space-y-6">
          {/* Header Card */}
          <section className="bg-white rounded-xl p-6 md:p-8 shadow-resting border border-outline-variant/50">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-6">
              <div className="w-20 h-20 rounded-xl bg-[#f8f9ff] border border-outline-variant/60 p-3 shrink-0 flex items-center justify-center">
                <img
                  src={selectedCompany.logo}
                  alt={`${selectedCompany.name} logo`}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-[28px] md:text-[32px] font-bold font-geist text-[#091426] leading-tight">
                  {selectedCompany.name}
                </h1>
                <p className="text-[14px] text-[#45474c] flex items-center gap-2 mt-1">
                  <span className="material-symbols-outlined text-[16px] text-[#75777d]">location_on</span>
                  {selectedCompany.location}
                  <span className="text-[#c5c6cd]">•</span>
                  <span>{selectedCompany.industry}</span>
                </p>
              </div>
            </div>

            <p className="text-[15px] text-[#45474c] leading-relaxed mb-6">
              {selectedCompany.about}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-outline-variant/40">
              <div>
                <span className="text-[12px] font-semibold uppercase tracking-wider text-[#75777d]">Company Size</span>
                <p className="text-[14px] font-bold text-[#091426] mt-0.5">{selectedCompany.size}</p>
              </div>
              <div>
                <span className="text-[12px] font-semibold uppercase tracking-wider text-[#75777d]">Founded</span>
                <p className="text-[14px] font-bold text-[#091426] mt-0.5">{selectedCompany.founded}</p>
              </div>
              <div>
                <span className="text-[12px] font-semibold uppercase tracking-wider text-[#75777d]">Open Roles</span>
                <p className="text-[14px] font-bold text-[#0058be] mt-0.5">{companyJobs.length} active</p>
              </div>
            </div>
          </section>

          {/* Open Positions */}
          <section className="bg-white rounded-xl p-6 md:p-8 shadow-resting border border-outline-variant/50">
            <h2 className="text-[20px] font-bold font-geist text-[#091426] mb-5">
              Open Positions at {selectedCompany.name}
            </h2>

            {companyJobs.length === 0 ? (
              <p className="text-[14px] text-[#45474c]">No active openings at this moment.</p>
            ) : (
              <div className="space-y-4">
                {companyJobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-4 rounded-xl border border-outline-variant/50 bg-[#f8f9ff] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 hover:border-[#0058be]/40 transition-colors"
                  >
                    <div>
                      <h3
                        onClick={() => navigateToJobDetail(job.id)}
                        className="font-geist text-[16px] font-bold text-[#091426] hover:text-[#0058be] cursor-pointer"
                      >
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-2 text-[13px] text-[#45474c] mt-1">
                        <span>{job.location}</span>
                        <span>•</span>
                        <span>{job.jobType}</span>
                        <span>•</span>
                        <span className="font-semibold text-[#091426]">{job.salaryDisplay}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigateToJobDetail(job.id)}
                        className="px-3 py-1.5 text-[13px] font-medium text-[#45474c] hover:bg-white rounded-lg transition-colors cursor-pointer"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => navigateToApply(job.id)}
                        className="px-4 py-1.5 bg-[#0058be] text-white text-[13px] font-semibold rounded-lg hover:bg-[#2170e4] transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Right 4 Cols: Culture & Perks */}
        <aside className="md:col-span-4 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-resting border border-outline-variant/50 space-y-5">
            <h3 className="text-[18px] font-bold font-geist text-[#091426]">
              Workplace Culture
            </h3>
            <ul className="space-y-3">
              {selectedCompany.culture.map((c, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[14px] text-[#45474c]">
                  <span className="material-symbols-outlined text-[#0058be] text-[18px] mt-0.5 icon-fill">
                    check_circle
                  </span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-resting border border-outline-variant/50 space-y-5">
            <h3 className="text-[18px] font-bold font-geist text-[#091426]">
              Benefits & Perks
            </h3>
            <ul className="space-y-3">
              {selectedCompany.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[14px] text-[#45474c]">
                  <span className="material-symbols-outlined text-[#0058be] text-[18px] mt-0.5">
                    verified
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
};
