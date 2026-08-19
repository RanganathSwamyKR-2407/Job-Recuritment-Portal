import React, { useState } from 'react';
import { useJobContext } from '../context/JobContext';
import confetti from 'canvas-confetti';

export const ApplicationFlowScreen: React.FC = () => {
  const { selectedJob, navigateToJobDetail, navigateToFindJobs, navigateToSuccess, submitApplication, candidate } = useJobContext();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form Fields
  const [firstName, setFirstName] = useState(candidate.firstName || '');
  const [lastName, setLastName] = useState(candidate.lastName || '');
  const [email, setEmail] = useState(candidate.email || '');
  const [phone, setPhone] = useState(candidate.phone || '');

  // Step 2 Fields
  const [resumeFile, setResumeFile] = useState<{ name: string; size: string } | null>({
    name: candidate.resumeName || 'Ranganath_Swamy_KR_COO_Executive_Resume.pdf',
    size: candidate.resumeSize || '2.4 MB'
  });
  const [isDragging, setIsDragging] = useState(false);
  const [linkedInUrl, setLinkedInUrl] = useState(candidate.linkedInUrl || '');
  const [portfolioUrl, setPortfolioUrl] = useState(candidate.portfolioUrl || '');

  // Step 3 Fields
  const [coverNote, setCoverNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateStep1 = () => {
    const errs: { [key: string]: string } = {};
    if (!firstName.trim()) errs.firstName = 'First name is required';
    if (!lastName.trim()) errs.lastName = 'Last name is required';
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid email is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextToStep2 = () => {
    if (validateStep1()) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextToStep3 = () => {
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setResumeFile({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      });
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setResumeFile({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const newApp = await submitApplication({
        jobId: selectedJob?.id || 'job-techflow-coo',
        firstName,
        lastName,
        email,
        phone,
        resumeFileName: resumeFile?.name,
        resumeFileSize: resumeFile?.size,
        linkedInUrl,
        portfolioUrl,
        coverNote
      });

      // Confetti burst for rewarding user action
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Safe fallback
      }

      setIsSubmitting(false);
      navigateToSuccess(newApp);
    } catch (err) {
      console.error('Submit error:', err);
      setIsSubmitting(false);
    }
  };

  const progressLineWidth = currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%';

  return (
    <div className="bg-[#f8f9ff] text-[#0b1c30] min-h-screen flex flex-col md:flex-row w-full">
      {/* Left Conceptual Canvas (Desktop) matching Image 3 */}
      <div className="hidden md:flex md:w-5/12 lg:w-1/2 relative bg-[#091426] flex-col justify-between overflow-hidden p-8 lg:p-12">
        {/* Background Overlay & Architectural Photo */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#091426]/90 via-[#091426]/85 to-[#1e293b]/95" />

        {/* Top Brand */}
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#0058be] flex items-center justify-center text-white">
            <span className="material-symbols-outlined filled text-white text-[18px]">work</span>
          </div>
          <span className="text-[24px] font-bold font-geist text-white tracking-tight">
            HireStream
          </span>
        </div>

        {/* Selected Job Mini Card if available */}
        {selectedJob && (
          <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5 my-8 max-w-md">
            <div className="text-[11px] uppercase tracking-wider text-[#adc6ff] font-geist font-bold mb-1">
              Applying for
            </div>
            <div className="text-[20px] font-bold text-white font-geist leading-tight">
              {selectedJob.title}
            </div>
            <div className="text-[14px] text-[#d8e2ff] mt-1 flex items-center gap-2">
              <span>{selectedJob.companyName}</span>
              <span>•</span>
              <span>{selectedJob.location}</span>
            </div>
          </div>
        )}

        {/* Bottom Hero Copy */}
        <div className="relative z-10 mb-8 max-w-lg">
          <h1 className="text-[36px] lg:text-[48px] font-bold font-geist text-white leading-tight mb-4">
            Propel your career forward.
          </h1>
          <p className="text-[17px] text-[#bcc7de] leading-relaxed">
            Join a network of high-growth companies looking for exceptional talent. Your next breakthrough starts here.
          </p>
        </div>
      </div>

      {/* Right Interaction Canvas (Form Flow) matching Image 3 */}
      <div className="w-full md:w-7/12 lg:w-1/2 flex flex-col min-h-screen overflow-y-auto bg-[#f8f9ff] relative">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-outline-variant/40 bg-white">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#091426] flex items-center justify-center text-white">
              <span className="material-symbols-outlined filled text-white text-[16px]">work</span>
            </div>
            <span className="text-[18px] font-bold font-geist text-[#091426]">HireStream</span>
          </div>
          <button
            onClick={() => (selectedJob ? navigateToJobDetail(selectedJob.id) : navigateToFindJobs())}
            className="text-[#45474c] hover:text-[#091426] p-1"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex flex-col justify-center px-4 sm:px-8 lg:px-14 py-8 lg:py-12 max-w-2xl w-full mx-auto">
          {/* Top Cancel Link on desktop */}
          <div className="hidden md:flex justify-end mb-4">
            <button
              onClick={() => (selectedJob ? navigateToJobDetail(selectedJob.id) : navigateToFindJobs())}
              className="text-[13px] text-[#45474c] hover:text-[#091426] flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
              Cancel Application
            </button>
          </div>

          {/* Progress Bar with 3 Steps */}
          <div className="mb-8 w-full">
            <div className="flex items-center justify-between relative z-10">
              {/* Step 1 Indicator */}
              <div
                onClick={() => setCurrentStep(1)}
                className="flex flex-col items-center gap-1 relative w-1/3 cursor-pointer"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold font-geist shadow-xs z-10 transition-colors ${
                    currentStep === 1
                      ? 'bg-[#0058be] text-white shadow-sm ring-4 ring-[#0058be]/15'
                      : currentStep > 1
                      ? 'bg-[#0058be] text-white'
                      : 'bg-[#d3e4fe] text-[#45474c] border border-outline-variant'
                  }`}
                >
                  {currentStep > 1 ? (
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  ) : (
                    '1'
                  )}
                </div>
                <span
                  className={`text-[12px] font-semibold mt-1 transition-colors ${
                    currentStep === 1 ? 'text-[#0058be]' : currentStep > 1 ? 'text-[#091426]' : 'text-[#75777d]'
                  }`}
                >
                  Details
                </span>
              </div>

              {/* Step 2 Indicator */}
              <div
                onClick={() => {
                  if (validateStep1()) setCurrentStep(2);
                }}
                className="flex flex-col items-center gap-1 relative w-1/3 cursor-pointer"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold font-geist z-10 transition-colors ${
                    currentStep === 2
                      ? 'bg-[#0058be] text-white shadow-sm ring-4 ring-[#0058be]/15'
                      : currentStep > 2
                      ? 'bg-[#0058be] text-white'
                      : 'bg-white text-[#75777d] border border-outline-variant/80'
                  }`}
                >
                  {currentStep > 2 ? (
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  ) : (
                    '2'
                  )}
                </div>
                <span
                  className={`text-[12px] font-semibold mt-1 transition-colors ${
                    currentStep === 2 ? 'text-[#0058be]' : currentStep > 2 ? 'text-[#091426]' : 'text-[#75777d]'
                  }`}
                >
                  Documents
                </span>
              </div>

              {/* Step 3 Indicator */}
              <div
                onClick={() => {
                  if (validateStep1()) setCurrentStep(3);
                }}
                className="flex flex-col items-center gap-1 relative w-1/3 cursor-pointer"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold font-geist z-10 transition-colors ${
                    currentStep === 3
                      ? 'bg-[#0058be] text-white shadow-sm ring-4 ring-[#0058be]/15'
                      : 'bg-white text-[#75777d] border border-outline-variant/80'
                  }`}
                >
                  3
                </div>
                <span
                  className={`text-[12px] font-semibold mt-1 transition-colors ${
                    currentStep === 3 ? 'text-[#0058be]' : 'text-[#75777d]'
                  }`}
                >
                  Review
                </span>
              </div>

              {/* Connecting Background Line */}
              <div className="absolute top-4 left-[16%] right-[16%] h-[2px] bg-[#c5c6cd]/50 -z-0" />
              {/* Animated Progress Line */}
              <div
                className="absolute top-4 left-[16%] h-[2px] bg-[#0058be] -z-0 transition-all duration-300"
                style={{ width: `calc(${progressLineWidth} * 0.68)` }}
              />
            </div>
          </div>

          {/* Form Card Container */}
          <div className="bg-white rounded-xl border border-outline-variant/60 ambient-shadow-lvl2 p-6 md:p-8 relative overflow-hidden">
            {/* STEP 1: Personal Information */}
            {currentStep === 1 && (
              <div className="animate-in fade-in duration-200">
                <div className="mb-6">
                  <h2 className="text-[22px] font-bold font-geist text-[#091426] mb-1">
                    Personal Information
                  </h2>
                  <p className="text-[14px] text-[#45474c]">
                    Let's start with the basics so we can get in touch.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-[#45474c]">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Ranganath Swamy"
                      className={`w-full bg-white text-[#0b1c30] border rounded-lg px-3.5 py-2 text-[14px] focus:outline-none focus:ring-2 transition-all ${
                        errors.firstName
                          ? 'border-red-500 focus:ring-red-200'
                          : 'border-outline-variant focus:border-[#0058be] focus:ring-[#0058be]/20'
                      }`}
                    />
                    {errors.firstName && (
                      <span className="text-[11px] text-red-600">{errors.firstName}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-[#45474c]">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="K R"
                      className={`w-full bg-white text-[#0b1c30] border rounded-lg px-3.5 py-2 text-[14px] focus:outline-none focus:ring-2 transition-all ${
                        errors.lastName
                          ? 'border-red-500 focus:ring-red-200'
                          : 'border-outline-variant focus:border-[#0058be] focus:ring-[#0058be]/20'
                      }`}
                    />
                    {errors.lastName && (
                      <span className="text-[11px] text-red-600">{errors.lastName}</span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 mb-4">
                  <label className="text-[13px] font-semibold text-[#45474c]">
                    Email Address *
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-[#75777d] text-[18px]">
                      mail
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ranganath.swamy@example.com"
                      className={`w-full bg-white text-[#0b1c30] border rounded-lg pl-10 pr-3.5 py-2 text-[14px] focus:outline-none focus:ring-2 transition-all ${
                        errors.email
                          ? 'border-red-500 focus:ring-red-200'
                          : 'border-outline-variant focus:border-[#0058be] focus:ring-[#0058be]/20'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <span className="text-[11px] text-red-600">{errors.email}</span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5 mb-8">
                  <label className="text-[13px] font-semibold text-[#45474c]">
                    Phone Number (Optional)
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-[#75777d] text-[18px]">
                      call
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-white text-[#0b1c30] border border-outline-variant rounded-lg pl-10 pr-3.5 py-2 text-[14px] focus:outline-none focus:border-[#0058be] focus:ring-2 focus:ring-[#0058be]/20 transition-all"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-5 border-t border-outline-variant/50">
                  <button
                    onClick={handleNextToStep2}
                    className="bg-[#0058be] hover:bg-[#2170e4] text-white px-6 py-2.5 rounded-lg text-[14px] font-semibold font-geist flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                  >
                    Continue
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Documents & Links */}
            {currentStep === 2 && (
              <div className="animate-in fade-in duration-200">
                <div className="mb-6">
                  <h2 className="text-[22px] font-bold font-geist text-[#091426] mb-1">
                    Experience & Documents
                  </h2>
                  <p className="text-[14px] text-[#45474c]">
                    Provide your resume and links to your professional footprint.
                  </p>
                </div>

                {/* Drag and Drop Resume Dropzone */}
                <div className="flex flex-col gap-1.5 mb-5">
                  <label className="text-[13px] font-semibold text-[#45474c]">
                    Resume / CV *
                  </label>
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleFileDrop}
                    className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center transition-all cursor-pointer group text-center ${
                      isDragging
                        ? 'border-[#0058be] bg-[#eff4ff]'
                        : resumeFile
                        ? 'border-[#0058be]/50 bg-[#f8f9ff]'
                        : 'border-outline-variant bg-[#eff4ff]/30 hover:bg-[#eff4ff]/60 hover:border-[#0058be]'
                    }`}
                  >
                    <input
                      type="file"
                      id="resume-upload"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileInputChange}
                      className="hidden"
                    />
                    <label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center w-full">
                      <div className="w-12 h-12 rounded-full bg-[#e5eeff] flex items-center justify-center mb-2 group-hover:bg-[#d8e2ff] transition-colors text-[#0058be]">
                        <span className="material-symbols-outlined text-[24px]">
                          {resumeFile ? 'task_alt' : 'upload_file'}
                        </span>
                      </div>
                      {resumeFile ? (
                        <div>
                          <p className="text-[14px] font-bold text-[#091426] font-geist">
                            {resumeFile.name}
                          </p>
                          <p className="text-[12px] text-[#0058be] font-medium mt-0.5">
                            {resumeFile.size} • Click to replace file
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-[14px] font-semibold text-[#091426] mb-0.5 font-geist">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-[12px] text-[#75777d]">
                            PDF, DOCX, or TXT (Max 5MB)
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* LinkedIn Profile */}
                <div className="flex flex-col gap-1.5 mb-4">
                  <label className="text-[13px] font-semibold text-[#45474c]">
                    LinkedIn Profile URL
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-[#75777d] text-[18px]">
                      link
                    </span>
                    <input
                      type="url"
                      value={linkedInUrl}
                      onChange={(e) => setLinkedInUrl(e.target.value)}
                      placeholder="https://linkedin.com/in/janedoe"
                      className="w-full bg-white text-[#0b1c30] border border-outline-variant rounded-lg pl-10 pr-3.5 py-2 text-[14px] focus:outline-none focus:border-[#0058be] focus:ring-2 focus:ring-[#0058be]/20 transition-all"
                    />
                  </div>
                </div>

                {/* Portfolio / Website */}
                <div className="flex flex-col gap-1.5 mb-8">
                  <label className="text-[13px] font-semibold text-[#45474c]">
                    Portfolio / Website (Optional)
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-[#75777d] text-[18px]">
                      language
                    </span>
                    <input
                      type="url"
                      value={portfolioUrl}
                      onChange={(e) => setPortfolioUrl(e.target.value)}
                      placeholder="https://janedoe.design"
                      className="w-full bg-white text-[#0b1c30] border border-outline-variant rounded-lg pl-10 pr-3.5 py-2 text-[14px] focus:outline-none focus:border-[#0058be] focus:ring-2 focus:ring-[#0058be]/20 transition-all"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-5 border-t border-outline-variant/50">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="border border-outline-variant text-[#45474c] px-5 py-2 rounded-lg text-[14px] font-medium hover:bg-[#f8f9ff] hover:text-[#091426] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    Back
                  </button>
                  <button
                    onClick={handleNextToStep3}
                    className="bg-[#0058be] hover:bg-[#2170e4] text-white px-6 py-2 rounded-lg text-[14px] font-semibold font-geist flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                  >
                    Continue
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Review & Final Details */}
            {currentStep === 3 && (
              <div className="animate-in fade-in duration-200">
                <div className="mb-6">
                  <h2 className="text-[22px] font-bold font-geist text-[#091426] mb-1">
                    Final Details
                  </h2>
                  <p className="text-[14px] text-[#45474c]">
                    Anything else you want us to know before submitting?
                  </p>
                </div>

                {/* Candidate Summary Pill */}
                <div className="bg-[#eff4ff] p-3.5 rounded-lg mb-5 border border-[#d8e2ff] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#0058be] text-white flex items-center justify-center text-[12px] font-bold">
                      {firstName.charAt(0)}
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-[#091426]">
                        {firstName} {lastName}
                      </div>
                      <div className="text-[12px] text-[#45474c]">
                        {email} • {resumeFile?.name || 'Resume Attached'}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-[12px] text-[#0058be] hover:underline font-semibold"
                  >
                    Edit
                  </button>
                </div>

                {/* Cover Note / Why Good Fit */}
                <div className="flex flex-col gap-1.5 mb-6">
                  <div className="flex justify-between items-end">
                    <label className="text-[13px] font-semibold text-[#45474c]">
                      Why are you a good fit? (Optional)
                    </label>
                    <span className="text-[11px] text-[#75777d]">
                      {coverNote.length} / 500
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    maxLength={500}
                    value={coverNote}
                    onChange={(e) => setCoverNote(e.target.value)}
                    placeholder="Share a brief summary of what makes you uniquely qualified for this role..."
                    className="w-full bg-white text-[#0b1c30] border border-outline-variant rounded-lg p-3 text-[14px] focus:outline-none focus:border-[#0058be] focus:ring-2 focus:ring-[#0058be]/20 transition-all resize-none"
                  />
                </div>

                {/* Terms Box matching Image 3 */}
                <div className="bg-[#eff4ff]/60 p-3.5 rounded-lg mb-8 flex items-start gap-2.5 border border-outline-variant/40">
                  <span className="material-symbols-outlined text-[#0058be] text-[18px] shrink-0 mt-0.5">
                    info
                  </span>
                  <p className="text-[12px] text-[#45474c] leading-relaxed">
                    By submitting this application, you agree to HireStream's Terms of Service and Privacy Policy. Your data will be processed securely.
                  </p>
                </div>

                <div className="flex justify-between pt-5 border-t border-outline-variant/50">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="border border-outline-variant text-[#45474c] px-5 py-2 rounded-lg text-[14px] font-medium hover:bg-[#f8f9ff] hover:text-[#091426] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    Back
                  </button>
                  <button
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    className="bg-[#091426] hover:bg-[#1e293b] text-white px-7 py-2.5 rounded-lg text-[14px] font-semibold font-geist flex items-center gap-2 transition-colors cursor-pointer shadow-sm disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </span>
                    ) : (
                      <>
                        Submit Application
                        <span className="material-symbols-outlined text-[18px] icon-fill">check_circle</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
