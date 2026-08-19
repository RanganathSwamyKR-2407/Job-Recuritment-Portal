import React, { useState } from 'react';
import { useJobContext } from '../context/JobContext';
import { JobType, ExperienceLevel } from '../types';

export const PostJobModal: React.FC = () => {
  const { isPostJobModalOpen, setIsPostJobModalOpen, postJob, navigateToJobDetail } = useJobContext();

  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('TechFlow');
  const [location, setLocation] = useState('San Francisco, CA (Hybrid)');
  const [workplaceType, setWorkplaceType] = useState<'Hybrid' | 'Remote' | 'On-site'>('Hybrid');
  const [jobType, setJobType] = useState<JobType>('Full-time');
  const [department, setDepartment] = useState('Engineering');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('Senior Level');
  const [salaryMin, setSalaryMin] = useState(130000);
  const [salaryMax, setSalaryMax] = useState(165000);
  const [aboutRole, setAboutRole] = useState('');
  const [tagsInput, setTagsInput] = useState('Full-time, React, TypeScript');

  if (!isPostJobModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !companyName.trim()) {
      alert('Please fill out the job title and company.');
      return;
    }

    const tags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean);
    const salaryDisplay = `$${Math.round(salaryMin / 1000)}k - $${Math.round(salaryMax / 1000)}k / yr`;

    const newJob = postJob({
      title,
      companyId: companyName.toLowerCase().replace(/\s+/g, '-'),
      companyName,
      companyLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkUefj16KDyojJLtLoyJPTiACMwbwtMQU3h_lR6Dvykxtkx02w1G6WoPVrrKyqOULW4nCGqml6iPJbAViMqqHtXZZvXMJLI4-tV5WBNr999BUtSnc68PMEB-V0bdeNc0M6OSG8uQQBVL-5kHezd5IpvpxXomWO4bCx9DvY3WbRH2PW0iW_BafwjEqZ6_L53IPVkFxuezrhJwjfHJz95hmwUx7oa_XFecJE0_He-7U1A_dAeJHbRJ8',
      location,
      workplaceType,
      jobType,
      jobTypeDetails: `${jobType}, ${workplaceType}`,
      department,
      experienceLevel,
      salaryMin,
      salaryMax,
      salaryDisplay,
      isFeatured: true,
      tags: tags.length > 0 ? tags : ['Full-time', 'New Role'],
      aboutRole: aboutRole || `We are looking for an exceptional ${title} to join our high-impact team at ${companyName}.`,
      whatYoullDo: [
        'Lead cross-functional initiatives from planning to deployment.',
        'Collaborate with product and design partners to architect elegant user workflows.',
        'Champion engineering excellence, code reviews, and system reliability.'
      ],
      whatWereLookingFor: [
        '3+ years of relevant experience in modern web software or high-growth SaaS.',
        'Strong problem-solving mindset and autonomous execution.',
        'Clear communication and stakeholder collaboration abilities.'
      ],
      benefits: [
        'Comprehensive healthcare & dental',
        'Competitive equity package',
        'Flexible hybrid / remote options'
      ],
      responseSpeed: 'Typically responds within 2 days'
    });

    setIsPostJobModalOpen(false);
    navigateToJobDetail(newJob.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#091426]/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 md:p-8 shadow-floating border border-outline-variant/60 relative overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={() => setIsPostJobModalOpen(false)}
          className="absolute right-4 top-4 text-[#75777d] hover:text-[#091426] p-1.5 rounded-lg hover:bg-[#eff4ff]"
        >
          <span className="material-symbols-outlined text-[22px]">close</span>
        </button>

        <div className="mb-6">
          <h2 className="text-[22px] font-bold font-geist text-[#091426]">
            Post a New Role
          </h2>
          <p className="text-[14px] text-[#45474c] mt-0.5">
            Reach top engineering and design candidates across the HireStream network.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[13px] font-semibold text-[#45474c] block mb-1">
                Job Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Senior Full-Stack Engineer"
                className="w-full bg-[#f8f9ff] border border-outline-variant rounded-lg px-3 py-2 text-[14px] focus:outline-none focus:border-[#0058be]"
              />
            </div>

            <div>
              <label className="text-[13px] font-semibold text-[#45474c] block mb-1">
                Company Name *
              </label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. TechFlow"
                className="w-full bg-[#f8f9ff] border border-outline-variant rounded-lg px-3 py-2 text-[14px] focus:outline-none focus:border-[#0058be]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-[13px] font-semibold text-[#45474c] block mb-1">
                Job Type
              </label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value as JobType)}
                className="w-full bg-[#f8f9ff] border border-outline-variant rounded-lg px-3 py-2 text-[14px] focus:outline-none focus:border-[#0058be]"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div>
              <label className="text-[13px] font-semibold text-[#45474c] block mb-1">
                Workplace Type
              </label>
              <select
                value={workplaceType}
                onChange={(e) => setWorkplaceType(e.target.value as 'Hybrid' | 'Remote' | 'On-site')}
                className="w-full bg-[#f8f9ff] border border-outline-variant rounded-lg px-3 py-2 text-[14px] focus:outline-none focus:border-[#0058be]"
              >
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            <div>
              <label className="text-[13px] font-semibold text-[#45474c] block mb-1">
                Department
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="e.g. Engineering"
                className="w-full bg-[#f8f9ff] border border-outline-variant rounded-lg px-3 py-2 text-[14px] focus:outline-none focus:border-[#0058be]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[13px] font-semibold text-[#45474c] block mb-1">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. San Francisco, CA"
                className="w-full bg-[#f8f9ff] border border-outline-variant rounded-lg px-3 py-2 text-[14px] focus:outline-none focus:border-[#0058be]"
              />
            </div>

            <div>
              <label className="text-[13px] font-semibold text-[#45474c] block mb-1">
                Salary Range ($ USD / Year)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(Number(e.target.value))}
                  className="w-1/2 bg-[#f8f9ff] border border-outline-variant rounded-lg px-3 py-2 text-[14px]"
                  placeholder="Min"
                />
                <span>-</span>
                <input
                  type="number"
                  value={salaryMax}
                  onChange={(e) => setSalaryMax(Number(e.target.value))}
                  className="w-1/2 bg-[#f8f9ff] border border-outline-variant rounded-lg px-3 py-2 text-[14px]"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-[13px] font-semibold text-[#45474c] block mb-1">
              Skill Tags (comma separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Full-time, React, Design Systems, Figma"
              className="w-full bg-[#f8f9ff] border border-outline-variant rounded-lg px-3 py-2 text-[14px] focus:outline-none focus:border-[#0058be]"
            />
          </div>

          <div>
            <label className="text-[13px] font-semibold text-[#45474c] block mb-1">
              About the Role
            </label>
            <textarea
              rows={3}
              value={aboutRole}
              onChange={(e) => setAboutRole(e.target.value)}
              placeholder="Describe the opportunity and what makes this position impactful..."
              className="w-full bg-[#f8f9ff] border border-outline-variant rounded-lg p-3 text-[14px] focus:outline-none focus:border-[#0058be]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/40">
            <button
              type="button"
              onClick={() => setIsPostJobModalOpen(false)}
              className="px-4 py-2 border border-outline-variant rounded-lg text-[14px] text-[#45474c] hover:bg-[#f8f9ff]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#0058be] hover:bg-[#2170e4] text-white rounded-lg text-[14px] font-semibold font-geist shadow-sm"
            >
              Publish Job Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
