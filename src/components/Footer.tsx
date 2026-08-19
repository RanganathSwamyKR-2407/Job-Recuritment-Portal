import React from 'react';
import { useJobContext } from '../context/JobContext';

export const Footer: React.FC = () => {
  const { navigateToFindJobs, navigateToCompanies, navigateToDashboard, setIsPostJobModalOpen } = useJobContext();

  return (
    <footer className="bg-white border-t border-outline-variant/60 w-full mt-auto">
      <div className="w-full py-12 md:py-16 px-4 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8 max-w-[1280px] mx-auto">
        {/* Brand & Copyright */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#091426] flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-[16px] text-white icon-fill">work</span>
            </div>
            <span className="text-[20px] font-bold tracking-tight text-[#091426] font-geist">
              HireStream
            </span>
          </div>
          <p className="text-[13px] text-[#45474c] leading-relaxed">
            The next-generation hiring and career discovery network connecting exceptional talent with category-defining companies.
          </p>
          <span className="text-[13px] text-[#45474c] mt-2">
            © 2024 HireStream. All rights reserved.
          </span>
        </div>

        {/* Column 2: Platform */}
        <div className="flex flex-col gap-2.5">
          <h4 className="text-[14px] font-semibold text-[#091426] uppercase tracking-wider font-geist mb-1">
            Platform
          </h4>
          <button
            onClick={navigateToFindJobs}
            className="text-[14px] text-[#45474c] hover:text-[#0058be] text-left transition-colors"
          >
            Discover Roles
          </button>
          <button
            onClick={navigateToCompanies}
            className="text-[14px] text-[#45474c] hover:text-[#0058be] text-left transition-colors"
          >
            Company Directory
          </button>
          <button
            onClick={navigateToDashboard}
            className="text-[14px] text-[#45474c] hover:text-[#0058be] text-left transition-colors"
          >
            Candidate Portal
          </button>
          <button
            onClick={() => setIsPostJobModalOpen(true)}
            className="text-[14px] text-[#0058be] font-medium hover:underline text-left transition-colors"
          >
            Post a Job
          </button>
        </div>

        {/* Column 3: Legal & Trust */}
        <div className="flex flex-col gap-2.5">
          <h4 className="text-[14px] font-semibold text-[#091426] uppercase tracking-wider font-geist mb-1">
            Trust & Legal
          </h4>
          <a
            href="#privacy"
            onClick={(e) => e.preventDefault()}
            className="text-[14px] text-[#45474c] hover:text-[#0058be] underline transition-colors w-fit"
          >
            Privacy Policy
          </a>
          <a
            href="#terms"
            onClick={(e) => e.preventDefault()}
            className="text-[14px] text-[#45474c] hover:text-[#0058be] underline transition-colors w-fit"
          >
            Terms of Service
          </a>
          <a
            href="#security"
            onClick={(e) => e.preventDefault()}
            className="text-[14px] text-[#45474c] hover:text-[#0058be] underline transition-colors w-fit"
          >
            Security Architecture
          </a>
          <a
            href="#cookies"
            onClick={(e) => e.preventDefault()}
            className="text-[14px] text-[#45474c] hover:text-[#0058be] underline transition-colors w-fit"
          >
            Cookie Preferences
          </a>
        </div>

        {/* Column 4: Resources & Contact */}
        <div className="flex flex-col gap-2.5">
          <h4 className="text-[14px] font-semibold text-[#091426] uppercase tracking-wider font-geist mb-1">
            Resources
          </h4>
          <a
            href="#about"
            onClick={(e) => e.preventDefault()}
            className="text-[14px] text-[#45474c] hover:text-[#0058be] underline transition-colors w-fit"
          >
            About Us
          </a>
          <a
            href="#careers"
            onClick={(e) => e.preventDefault()}
            className="text-[14px] text-[#45474c] hover:text-[#0058be] underline transition-colors w-fit"
          >
            Careers at HireStream
          </a>
          <a
            href="#contact"
            onClick={(e) => e.preventDefault()}
            className="text-[14px] text-[#45474c] hover:text-[#0058be] underline transition-colors w-fit"
          >
            Contact & Support
          </a>
          <div className="pt-2 flex items-center gap-3 text-[#75777d]">
            <span className="material-symbols-outlined text-[20px] hover:text-[#0058be] cursor-pointer">public</span>
            <span className="material-symbols-outlined text-[20px] hover:text-[#0058be] cursor-pointer">share</span>
            <span className="material-symbols-outlined text-[20px] hover:text-[#0058be] cursor-pointer">mail</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
