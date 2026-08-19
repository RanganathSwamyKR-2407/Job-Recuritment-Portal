import React from 'react';
import { useJobContext } from '../context/JobContext';

export const ApplicationDetailModal: React.FC = () => {
  const { inspectedApplication, setInspectedApplication, withdrawApplication } = useJobContext();

  if (!inspectedApplication) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#091426]/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 md:p-8 shadow-floating border border-outline-variant/60 relative overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={() => setInspectedApplication(null)}
          className="absolute right-4 top-4 text-[#75777d] hover:text-[#091426] p-1.5 rounded-lg hover:bg-[#eff4ff] transition-colors"
        >
          <span className="material-symbols-outlined text-[22px]">close</span>
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0058be] bg-[#eff4ff] px-2.5 py-0.5 rounded-full border border-[#d8e2ff]">
              {inspectedApplication.status}
            </span>
            <span className="text-[12px] text-[#75777d]">
              {inspectedApplication.appliedDate}
            </span>
          </div>
          <h2 className="text-[22px] font-bold font-geist text-[#091426]">
            {inspectedApplication.jobTitle}
          </h2>
          <p className="text-[14px] text-[#45474c] flex items-center gap-2 mt-1">
            <span className="font-semibold text-[#091426]">{inspectedApplication.companyName}</span>
            <span>•</span>
            <span>{inspectedApplication.location}</span>
          </p>
        </div>

        {/* Interview Callout if scheduled */}
        {inspectedApplication.interviewDate && (
          <div className="bg-[#eff4ff] border border-[#d8e2ff] rounded-xl p-4 mb-6 flex items-start gap-3">
            <span className="material-symbols-outlined text-[#0058be] text-[24px] mt-0.5">
              video_camera_front
            </span>
            <div>
              <h4 className="text-[14px] font-bold text-[#091426] font-geist">
                Upcoming Interview
              </h4>
              <p className="text-[13px] text-[#0058be] font-medium mt-0.5">
                {inspectedApplication.interviewDate}
              </p>
              <p className="text-[12px] text-[#45474c] mt-1">
                Calendar invite sent to {inspectedApplication.candidateEmail}
              </p>
            </div>
          </div>
        )}

        {/* Timeline */}
        <div className="mb-6">
          <h3 className="text-[15px] font-bold font-geist text-[#091426] mb-4">
            Pipeline Progression
          </h3>
          <div className="relative pl-6 space-y-5 border-l-2 border-[#e5eeff] ml-2">
            {inspectedApplication.timeline.map((step, idx) => (
              <div key={idx} className="relative">
                <div
                  className={`absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full border-2 border-white ${
                    step.completed ? 'bg-[#0058be] shadow-xs' : 'bg-[#d3e4fe]'
                  }`}
                />
                <h4 className="text-[13px] font-bold text-[#091426]">{step.stage}</h4>
                <p className="text-[12px] text-[#45474c] mt-0.5">{step.description}</p>
                {step.date && (
                  <span className="text-[11px] text-[#75777d] mt-1 block">{step.date}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recruiter Notes */}
        {inspectedApplication.recruiterNotes && (
          <div className="bg-[#f8f9ff] p-4 rounded-xl border border-outline-variant/40 mb-6">
            <h4 className="text-[13px] font-bold text-[#091426] mb-1 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#0058be]">chat</span>
              Talent Team Note
            </h4>
            <p className="text-[13px] text-[#45474c] italic">
              "{inspectedApplication.recruiterNotes}"
            </p>
          </div>
        )}

        {/* Application Details */}
        <div className="border-t border-outline-variant/40 pt-4 mb-6 space-y-2 text-[13px]">
          <div className="flex justify-between">
            <span className="text-[#75777d]">Applicant</span>
            <span className="font-medium text-[#091426]">{inspectedApplication.candidateName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#75777d]">Email</span>
            <span className="font-medium text-[#091426]">{inspectedApplication.candidateEmail}</span>
          </div>
          {inspectedApplication.resumeFileName && (
            <div className="flex justify-between">
              <span className="text-[#75777d]">Resume</span>
              <span className="font-medium text-[#0058be]">{inspectedApplication.resumeFileName}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center pt-2">
          <button
            onClick={() => {
              if (confirm('Are you sure you want to withdraw this application?')) {
                withdrawApplication(inspectedApplication.id);
                setInspectedApplication(null);
              }
            }}
            className="text-[12px] text-red-600 hover:underline cursor-pointer"
          >
            Withdraw Application
          </button>
          <button
            onClick={() => setInspectedApplication(null)}
            className="px-5 py-2 bg-[#091426] hover:bg-[#1e293b] text-white rounded-lg text-[13px] font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
