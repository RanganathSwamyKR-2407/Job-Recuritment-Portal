import React from 'react';
import { useJobContext } from '../context/JobContext';

export const CompaniesScreen: React.FC = () => {
  const { companies, jobs, navigateToCompanyDetail, navigateToJobDetail } = useJobContext();

  return (
    <main className="flex-grow w-full max-w-[1280px] mx-auto px-4 md:px-12 py-8 md:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-geist text-[28px] md:text-[36px] font-bold text-[#091426] tracking-tight mb-2">
          Featured Companies
        </h1>
        <p className="text-[16px] text-[#45474c] max-w-2xl">
          Explore world-class teams that value craftsmanship, strong engineering principles, and supportive work cultures.
        </p>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((comp) => {
          const companyJobs = jobs.filter((j) => j.companyId === comp.id || j.companyName === comp.name);

          return (
            <div
              key={comp.id}
              className="bg-white rounded-xl border border-outline-variant/60 p-6 shadow-resting hover:shadow-hover transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header with Logo */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl bg-[#f8f9ff] border border-outline-variant/60 p-2 shrink-0 flex items-center justify-center">
                    <img
                      src={comp.logo}
                      alt={`${comp.name} logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3
                      onClick={() => navigateToCompanyDetail(comp.id)}
                      className="font-geist text-[18px] font-bold text-[#091426] hover:text-[#0058be] transition-colors cursor-pointer"
                    >
                      {comp.name}
                    </h3>
                    <p className="text-[13px] text-[#45474c] flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-[15px] text-[#75777d]">
                        location_on
                      </span>
                      {comp.location}
                    </p>
                    <span className="inline-block mt-1 text-[11px] font-medium text-[#0058be] bg-[#eff4ff] px-2 py-0.5 rounded-full">
                      {comp.industry}
                    </span>
                  </div>
                </div>

                {/* About snippet */}
                <p className="text-[13px] text-[#45474c] leading-relaxed line-clamp-3 mb-4">
                  {comp.about}
                </p>

                {/* Culture highlights */}
                <div className="space-y-1.5 mb-4">
                  {comp.culture.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[12px] text-[#0b1c30]">
                      <span className="material-symbols-outlined text-[#0058be] text-[16px] icon-fill">
                        check_circle
                      </span>
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Open Roles Pill & Actions */}
              <div className="pt-4 border-t border-outline-variant/40 flex items-center justify-between">
                <span className="text-[12px] font-semibold text-[#091426]">
                  {companyJobs.length} {companyJobs.length === 1 ? 'Open Role' : 'Open Roles'}
                </span>
                <button
                  onClick={() => navigateToCompanyDetail(comp.id)}
                  className="text-[13px] font-semibold text-[#0058be] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  View Profile
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};
