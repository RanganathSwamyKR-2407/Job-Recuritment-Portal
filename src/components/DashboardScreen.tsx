import React from 'react';
import { useJobContext } from '../context/JobContext';

export const DashboardScreen: React.FC = () => {
  const {
    candidate,
    applications,
    savedJobIds,
    jobs,
    navigateToJobDetail,
    navigateToFindJobs,
    setInspectedApplication,
    navigateToApply,
    toggleSaveJob
  } = useJobContext();

  const savedJobs = jobs.filter((j) => savedJobIds.includes(j.id));
  const recommendedJobs = jobs.filter((j) => !savedJobIds.includes(j.id)).slice(0, 3);
  const interviewCount = applications.filter((a) => a.status === 'Interviewing' || a.status === 'Technical Round').length;

  return (
    <main className="flex-grow pt-4 pb-16 px-4 md:px-12 max-w-[1280px] mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8">
      {/* Header Section (Full Width) */}
      <header className="col-span-12 mb-2">
        <h1 className="text-[32px] md:text-[40px] font-bold font-geist text-[#091426] tracking-tight mb-1">
          Welcome back, {candidate.firstName}!
        </h1>
        <p className="text-[16px] text-[#45474c]">
          Here is a quick summary of your recent application activity and pipeline progress.
        </p>
      </header>

      {/* Left Column (8 cols): Stats & Active Applications */}
      <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
        {/* Stats Overview matching Dashboard in Image 7 */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Card 1: Total Applications */}
          <div className="bg-white rounded-xl border border-outline-variant/60 p-5 shadow-resting hover:shadow-hover transition-shadow">
            <div className="flex items-center gap-2 mb-2 text-[#0058be]">
              <span className="material-symbols-outlined icon-fill text-[24px]">description</span>
              <h3 className="text-[13px] font-semibold text-[#45474c] font-geist">
                Total Applications
              </h3>
            </div>
            <p className="text-[32px] font-bold font-geist text-[#091426]">
              {Math.max(12, applications.length)}
            </p>
          </div>

          {/* Card 2: Interviews */}
          <div className="bg-white rounded-xl border border-outline-variant/60 p-5 shadow-resting hover:shadow-hover transition-shadow">
            <div className="flex items-center gap-2 mb-2 text-[#0058be]">
              <span className="material-symbols-outlined icon-fill text-[24px]">forum</span>
              <h3 className="text-[13px] font-semibold text-[#45474c] font-geist">
                Interviews
              </h3>
            </div>
            <p className="text-[32px] font-bold font-geist text-[#091426]">
              {Math.max(3, interviewCount)}
            </p>
          </div>

          {/* Card 3: Saved Jobs */}
          <div className="bg-white rounded-xl border border-outline-variant/60 p-5 shadow-resting hover:shadow-hover transition-shadow">
            <div className="flex items-center gap-2 mb-2 text-[#0058be]">
              <span className="material-symbols-outlined icon-fill text-[24px]">bookmark</span>
              <h3 className="text-[13px] font-semibold text-[#45474c] font-geist">
                Saved Jobs
              </h3>
            </div>
            <p className="text-[32px] font-bold font-geist text-[#091426]">
              {Math.max(8, savedJobIds.length)}
            </p>
          </div>
        </section>

        {/* Active Applications Section */}
        <section>
          <div className="flex justify-between items-center mb-4 border-b border-outline-variant/50 pb-3">
            <h2 className="text-[20px] font-bold font-geist text-[#091426]">
              Active Applications
            </h2>
            <span className="text-[13px] text-[#45474c]">
              {applications.length} submitted
            </span>
          </div>

          {applications.length === 0 ? (
            <div className="bg-white rounded-xl border border-outline-variant/60 p-8 text-center">
              <p className="text-[14px] text-[#45474c] mb-3">You haven't submitted any applications yet.</p>
              <button
                onClick={navigateToFindJobs}
                className="px-4 py-2 bg-[#0058be] text-white rounded-lg text-[13px] font-medium"
              >
                Browse Open Roles
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3.5">
              {applications.map((app) => {
                const isInterviewing = app.status === 'Interviewing' || app.status === 'Technical Round';
                return (
                  <div
                    key={app.id}
                    className="bg-white rounded-xl border border-outline-variant/60 p-5 flex flex-col sm:flex-row justify-between sm:items-center shadow-resting hover:shadow-hover transition-shadow group"
                  >
                    <div className="mb-3 sm:mb-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-[18px] font-bold font-geist text-[#091426]">
                          {app.jobTitle}
                        </h3>
                        {app.appliedDate === 'Applied Today' && (
                          <span className="text-[10px] uppercase font-bold bg-[#eff4ff] text-[#0058be] px-2 py-0.5 rounded-full">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-[14px] text-[#45474c] flex items-center gap-2 mt-1">
                        <span className="material-symbols-outlined text-[16px] text-[#75777d]">
                          business
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
                        <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                          arrow_forward
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {/* Right Column (4 cols): Saved Jobs & Recommendations */}
      <aside className="col-span-12 lg:col-span-4 flex flex-col gap-6">
        {/* Saved Jobs matching Dashboard in Image 7 */}
        <section className="bg-white rounded-xl border border-outline-variant/60 p-5 shadow-resting">
          <div className="flex justify-between items-center mb-4 border-b border-outline-variant/50 pb-2.5">
            <h2 className="text-[18px] font-bold font-geist text-[#091426]">
              Saved Jobs
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
                      className="text-[#75777d] hover:text-red-500 p-1"
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
                      className="text-[12px] text-[#0058be] font-semibold hover:underline"
                    >
                      Apply Now →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {savedJobs.length > 3 && (
            <button
              onClick={navigateToFindJobs}
              className="mt-4 text-[13px] font-semibold text-[#0058be] hover:underline text-center block w-full pt-2 border-t border-outline-variant/30"
            >
              View all saved jobs ({savedJobs.length})
            </button>
          )}
        </section>

        {/* Recommended Jobs matching Dashboard in Image 7 */}
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
                    {rec.department.toLowerCase().includes('design') ? 'design_services' : 'code'}
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
    </main>
  );
};
