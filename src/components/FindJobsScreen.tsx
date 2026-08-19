import React from 'react';
import { useJobContext } from '../context/JobContext';
import { JobType } from '../types';

export const FindJobsScreen: React.FC = () => {
  const {
    filteredJobs,
    filters,
    setFilters,
    resetFilters,
    toggleJobTypeFilter,
    navigateToJobDetail,
    navigateToApply,
    toggleSaveJob,
    isJobSaved,
    currentPage,
    setCurrentPage,
    totalPages,
    totalMatchingJobsCount
  } = useJobContext();

  const JOBS_PER_PAGE = 3;
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + JOBS_PER_PAGE);

  const jobTypeOptions: { id: JobType; label: string }[] = [
    { id: 'Full-time', label: 'Full-time' },
    { id: 'Part-time', label: 'Part-time' },
    { id: 'Contract', label: 'Contract' },
    { id: 'Remote', label: 'Remote' },
    { id: 'Hybrid', label: 'Hybrid' }
  ];

  return (
    <main className="flex-grow w-full max-w-[1280px] mx-auto px-4 md:px-12 py-8 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Left Sidebar (Filters) - 3 cols */}
      <aside className="md:col-span-3 space-y-6">
        <div className="bg-white rounded-xl border border-outline-variant/60 p-5 shadow-resting sticky top-24">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-geist text-[20px] font-bold text-[#091426]">
              Filters
            </h2>
            {(filters.searchQuery || filters.salaryMin !== '' || filters.salaryMax !== '' || filters.jobTypes.length !== 2) && (
              <button
                onClick={resetFilters}
                className="text-[12px] text-[#0058be] hover:underline font-medium cursor-pointer"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Search Keywords */}
          <div className="mb-5">
            <label className="font-geist text-[13px] font-semibold text-[#45474c] block mb-2">
              Search Keywords
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#75777d] text-[18px]">
                search
              </span>
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) => {
                  setFilters((prev) => ({ ...prev, searchQuery: e.target.value }));
                  setCurrentPage(1);
                }}
                placeholder="Job title, company..."
                className="w-full pl-9 pr-3 py-2 bg-[#f8f9ff] border border-outline-variant/70 rounded-lg text-[14px] text-[#0b1c30] placeholder-[#75777d] focus:outline-none focus:ring-2 focus:ring-[#0058be]/20 focus:border-[#0058be] transition-all"
              />
              {filters.searchQuery && (
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, searchQuery: '' }))}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#75777d] hover:text-[#091426]"
                >
                  <span className="material-symbols-outlined text-[16px]">cancel</span>
                </button>
              )}
            </div>
          </div>

          <hr className="border-outline-variant/50 mb-5" />

          {/* Job Type Checkboxes */}
          <div className="mb-5">
            <label className="font-geist text-[13px] font-semibold text-[#45474c] block mb-2.5">
              Job Type
            </label>
            <div className="space-y-2.5">
              {jobTypeOptions.map((opt) => {
                const isChecked = filters.jobTypes.includes(opt.id);
                return (
                  <label
                    key={opt.id}
                    className="flex items-center gap-2.5 cursor-pointer group select-none"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleJobTypeFilter(opt.id)}
                      className="w-4 h-4 text-[#0058be] rounded border-outline-variant focus:ring-[#0058be] accent-[#0058be] cursor-pointer"
                    />
                    <span
                      className={`text-[14px] transition-colors ${
                        isChecked ? 'text-[#091426] font-medium' : 'text-[#45474c] group-hover:text-[#0058be]'
                      }`}
                    >
                      {opt.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <hr className="border-outline-variant/50 mb-5" />

          {/* Salary Range */}
          <div className="mb-5">
            <label className="font-geist text-[13px] font-semibold text-[#45474c] block mb-2">
              Salary Range <span className="text-[11px] text-[#75777d] font-normal">($ in thousands)</span>
            </label>
            <div className="flex items-center gap-2 mt-1">
              <div className="relative flex-1">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[13px] text-[#75777d]">$</span>
                <input
                  type="number"
                  placeholder="Min (e.g. 100)"
                  value={filters.salaryMin}
                  onChange={(e) => {
                    setFilters((prev) => ({
                      ...prev,
                      salaryMin: e.target.value === '' ? '' : Number(e.target.value)
                    }));
                    setCurrentPage(1);
                  }}
                  className="w-full pl-6 pr-2 py-1.5 bg-[#f8f9ff] border border-outline-variant/70 rounded-lg text-[13px] focus:ring-2 focus:ring-[#0058be]/20 focus:border-[#0058be] focus:outline-none"
                />
              </div>
              <span className="text-outline-variant font-bold">-</span>
              <div className="relative flex-1">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[13px] text-[#75777d]">$</span>
                <input
                  type="number"
                  placeholder="Max (e.g. 180)"
                  value={filters.salaryMax}
                  onChange={(e) => {
                    setFilters((prev) => ({
                      ...prev,
                      salaryMax: e.target.value === '' ? '' : Number(e.target.value)
                    }));
                    setCurrentPage(1);
                  }}
                  className="w-full pl-6 pr-2 py-1.5 bg-[#f8f9ff] border border-outline-variant/70 rounded-lg text-[13px] focus:ring-2 focus:ring-[#0058be]/20 focus:border-[#0058be] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Reset Filters Button */}
          <button
            onClick={resetFilters}
            className="w-full py-2.5 bg-[#eff4ff] hover:bg-[#dce9ff] text-[#091426] font-geist font-semibold text-[13px] rounded-lg border border-outline-variant/60 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      </aside>

      {/* Main Feed (Job List) - 9 cols */}
      <section className="md:col-span-9 flex flex-col gap-4">
        {/* Feed Header */}
        <div className="flex justify-between items-end mb-1 px-1">
          <div>
            <h1 className="font-geist text-[28px] md:text-[32px] font-bold text-[#091426] tracking-tight">
              Discover Roles
            </h1>
            <p className="text-[14px] text-[#45474c] mt-0.5">
              Curated opportunities at high-growth engineering & design organizations.
            </p>
          </div>
          <span className="text-[14px] font-medium text-[#45474c]">
            Showing <strong className="text-[#091426]">{totalMatchingJobsCount}</strong> jobs
          </span>
        </div>

        {/* Empty State */}
        {paginatedJobs.length === 0 && (
          <div className="bg-white rounded-xl border border-outline-variant/60 p-12 text-center shadow-resting">
            <div className="w-16 h-16 rounded-full bg-[#eff4ff] text-[#0058be] flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[32px]">search_off</span>
            </div>
            <h3 className="text-[18px] font-bold text-[#091426] mb-2 font-geist">
              No matching roles found
            </h3>
            <p className="text-[14px] text-[#45474c] max-w-md mx-auto mb-6">
              Try adjusting your search keywords, lowering your salary threshold, or selecting additional job types.
            </p>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 bg-[#0058be] text-white rounded-lg text-[14px] font-medium hover:bg-[#2170e4] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Job Cards */}
        {paginatedJobs.map((job) => {
          const saved = isJobSaved(job.id);
          return (
            <article
              key={job.id}
              className="bg-white rounded-xl border border-outline-variant/60 p-5 md:p-6 shadow-resting hover:shadow-hover transition-all duration-200 flex flex-col md:flex-row gap-5 items-start group relative"
            >
              {/* Featured Badge Flag */}
              {job.isFeatured && (
                <div className="absolute top-0 right-0 bg-[#0058be] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-bl-lg rounded-tr-xl flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px] icon-fill">star</span>
                  Featured
                </div>
              )}

              {/* Company Logo */}
              <div
                onClick={() => navigateToJobDetail(job.id)}
                className="w-16 h-16 rounded-xl bg-[#f8f9ff] border border-outline-variant/60 flex-shrink-0 overflow-hidden flex items-center justify-center p-2 cursor-pointer hover:opacity-90 transition-opacity"
              >
                <img
                  src={job.companyLogo}
                  alt={`${job.companyName} logo`}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback letter avatar if image fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              {/* Job Details Body */}
              <div className="flex-grow flex flex-col gap-2 w-full">
                <div className="flex justify-between items-start">
                  <div>
                    <h3
                      onClick={() => navigateToJobDetail(job.id)}
                      className="font-geist text-[20px] font-bold text-[#091426] group-hover:text-[#0058be] transition-colors cursor-pointer leading-snug"
                    >
                      {job.title}
                    </h3>
                    <div className="flex items-center flex-wrap gap-2 mt-1">
                      <span className="text-[14px] text-[#0b1c30] font-semibold">
                        {job.companyName}
                      </span>
                      <span className="text-[#c5c6cd]">•</span>
                      <span className="text-[14px] text-[#45474c] flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-[#75777d]">
                          location_on
                        </span>
                        {job.location}
                      </span>
                      <span className="text-[#c5c6cd]">•</span>
                      <span className="text-[12px] text-[#75777d]">
                        {job.postedDate}
                      </span>
                    </div>
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => toggleSaveJob(job.id)}
                    aria-label={saved ? 'Remove bookmark' : 'Save job'}
                    className={`p-2 rounded-lg transition-colors cursor-pointer ${
                      saved
                        ? 'text-[#0058be] bg-[#eff4ff]'
                        : 'text-[#75777d] hover:text-[#0058be] hover:bg-[#f8f9ff]'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-[22px] ${saved ? 'icon-fill' : ''}`}>
                      {saved ? 'bookmark' : 'bookmark_border'}
                    </span>
                  </button>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {job.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-[#eff4ff] text-[#0058be] rounded-full text-[12px] font-medium border border-[#d8e2ff]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer with Salary & Apply CTA */}
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-outline-variant/50">
                  <div className="font-geist text-[15px] font-bold text-[#091426]">
                    {job.salaryDisplay}{' '}
                    {!job.salaryDisplay.includes('/ yr') && !job.salaryDisplay.includes('yr') && (
                      <span className="text-[13px] font-normal text-[#45474c]">/ yr</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigateToJobDetail(job.id)}
                      className="hidden sm:inline-flex px-3.5 py-1.5 text-[13px] font-medium text-[#45474c] hover:text-[#091426] hover:bg-[#eff4ff] rounded-lg transition-colors cursor-pointer"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => navigateToApply(job.id)}
                      className="bg-[#0058be] hover:bg-[#2170e4] text-white font-geist text-[14px] font-medium px-5 py-2 rounded-lg transition-colors shadow-sm cursor-pointer"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}

        {/* Pagination Controls matching Image 5 */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/70 bg-white text-[#45474c] hover:bg-[#eff4ff] transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Previous Page"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNum = i + 1;
              const isActive = pageNum === currentPage;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg font-geist text-[14px] transition-colors cursor-pointer ${
                    isActive
                      ? 'border-2 border-[#0058be] bg-[#eff4ff] text-[#0058be] font-bold shadow-sm'
                      : 'border border-outline-variant/70 bg-white text-[#45474c] hover:bg-[#f8f9ff]'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/70 bg-white text-[#45474c] hover:bg-[#eff4ff] transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Next Page"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>
        )}
      </section>
    </main>
  );
};
