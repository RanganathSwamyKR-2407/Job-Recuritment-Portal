import React from 'react';
import { useJobContext } from '../context/JobContext';

export const ApplicationSuccessScreen: React.FC = () => {
  const { lastSubmittedApplication, selectedJob, navigateToFindJobs, navigateToDashboard } = useJobContext();

  const app = lastSubmittedApplication || {
    id: 'app-default',
    jobTitle: selectedJob?.title || 'Senior Product Designer',
    companyName: selectedJob?.companyName || 'TechFlow',
    location: selectedJob?.location || 'San Francisco, CA (Hybrid)',
    appliedDate: 'Applied Today',
    timeline: [
      {
        stage: 'Application Received',
        description: 'We have your resume and portfolio.',
        completed: true
      },
      {
        stage: 'Initial Review',
        description: 'The hiring manager will review your materials.',
        completed: false
      },
      {
        stage: 'Interview Scheduling',
        description: "If selected, we'll reach out to schedule a call.",
        completed: false
      }
    ]
  };

  return (
    <div className="bg-[#f8f9ff] text-[#0b1c30] min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-4 md:p-12">
      <main className="w-full max-w-2xl mx-auto flex flex-col items-center success-animation py-6">
        {/* Success Icon matching Image 7 */}
        <div className="w-20 h-20 bg-[#0058be] rounded-full flex items-center justify-center mb-6 shadow-md border-4 border-white">
          <span className="material-symbols-outlined text-[44px] text-white icon-fill">
            check_circle
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-geist text-[32px] md:text-[40px] font-bold text-[#091426] text-center mb-2 tracking-tight">
          Application Submitted!
        </h1>
        <p className="text-[16px] text-[#45474c] text-center mb-8 max-w-lg leading-relaxed">
          Your application is on its way to the hiring team. We've sent a confirmation email with these details.
        </p>

        {/* Details Card matching Image 7 */}
        <div className="bg-white rounded-xl border border-outline-variant/50 p-6 md:p-8 w-full mb-8 shadow-resting hover:shadow-hover transition-shadow duration-300">
          {/* Job & Company Info */}
          <div className="flex items-start md:items-center justify-between border-b border-outline-variant/40 pb-5 mb-6 flex-col md:flex-row gap-3">
            <div>
              <h2 className="font-geist text-[22px] font-bold text-[#091426] mb-1">
                {app.jobTitle}
              </h2>
              <p className="text-[14px] text-[#45474c] flex items-center gap-2 flex-wrap">
                <span className="material-symbols-outlined text-[18px] text-[#75777d]">
                  corporate_fare
                </span>
                <span className="font-semibold text-[#091426]">{app.companyName}</span>
                <span className="text-[#c5c6cd]">•</span>
                <span>{app.location}</span>
              </p>
            </div>

            <div className="flex items-center gap-1.5 bg-[#eff4ff] px-3.5 py-1.5 rounded-full border border-[#d8e2ff]">
              <span className="material-symbols-outlined text-[16px] text-[#0058be]">
                schedule
              </span>
              <span className="text-[12px] font-semibold text-[#0058be] font-geist">
                Applied Today
              </span>
            </div>
          </div>

          {/* Vertical Progress Timeline */}
          <div className="relative pl-6 md:pl-8 space-y-6">
            {/* Timeline track line */}
            <div className="absolute left-[7px] md:left-[11px] top-2 bottom-3 w-[2px] bg-[#e5eeff]" />

            {/* Step 1: Application Received */}
            <div className="relative flex items-start">
              <div className="absolute -left-[20px] md:-left-[24px] w-[14px] h-[14px] rounded-full bg-[#0058be] border-2 border-white shadow-xs mt-1" />
              <div>
                <h3 className="font-geist text-[14px] font-bold text-[#091426] mb-0.5">
                  Application Received
                </h3>
                <p className="text-[13px] text-[#45474c]">
                  We have your resume and portfolio.
                </p>
              </div>
            </div>

            {/* Step 2: Initial Review */}
            <div className="relative flex items-start opacity-70">
              <div className="absolute -left-[20px] md:-left-[24px] w-[14px] h-[14px] rounded-full bg-[#d3e4fe] border-2 border-white mt-1" />
              <div>
                <h3 className="font-geist text-[14px] font-bold text-[#091426] mb-0.5">
                  Initial Review
                </h3>
                <p className="text-[13px] text-[#45474c]">
                  The hiring manager will review your materials.
                </p>
              </div>
            </div>

            {/* Step 3: Interview Scheduling */}
            <div className="relative flex items-start opacity-70">
              <div className="absolute -left-[20px] md:-left-[24px] w-[14px] h-[14px] rounded-full bg-[#d3e4fe] border-2 border-white mt-1" />
              <div>
                <h3 className="font-geist text-[14px] font-bold text-[#091426] mb-0.5">
                  Interview Scheduling
                </h3>
                <p className="text-[13px] text-[#45474c]">
                  If selected, we'll reach out to schedule a call.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons matching Image 7 */}
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto">
          <button
            onClick={navigateToFindJobs}
            className="flex-1 bg-[#0058be] hover:bg-[#2170e4] text-white font-geist text-[14px] font-semibold py-3 px-5 rounded-lg transition-all shadow-[0px_4px_12px_rgba(0,88,190,0.25)] text-center cursor-pointer"
          >
            Return to Job Search
          </button>
          <button
            onClick={navigateToDashboard}
            className="flex-1 bg-white hover:bg-[#eff4ff] text-[#091426] font-geist text-[14px] font-semibold py-3 px-5 rounded-lg border border-outline-variant/70 transition-colors shadow-xs text-center cursor-pointer"
          >
            View Dashboard
          </button>
        </div>
      </main>
    </div>
  );
};
