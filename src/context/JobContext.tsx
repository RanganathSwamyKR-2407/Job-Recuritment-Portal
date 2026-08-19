import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { Job, Company, Application, CandidateProfile, FilterState, JobType, ExperienceLevel } from '../types';
import { INITIAL_JOBS, INITIAL_COMPANIES, INITIAL_APPLICATIONS, INITIAL_SAVED_JOB_IDS, INITIAL_CANDIDATE } from '../data/mockData';

export type ScreenType = 'find-jobs' | 'job-detail' | 'apply' | 'apply-success' | 'dashboard' | 'companies' | 'company-detail';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface JobContextType {
  // Navigation & Screens
  currentScreen: ScreenType;
  selectedJob: Job | null;
  selectedCompany: Company | null;
  lastSubmittedApplication: Application | null;
  inspectedApplication: Application | null;
  setInspectedApplication: (app: Application | null) => void;
  isPostJobModalOpen: boolean;
  setIsPostJobModalOpen: (open: boolean) => void;

  // Actions for Navigation
  navigateToFindJobs: () => void;
  navigateToJobDetail: (jobId: string) => void;
  navigateToApply: (jobId: string) => void;
  navigateToSuccess: (application: Application) => void;
  navigateToDashboard: () => void;
  navigateToCompanies: () => void;
  navigateToCompanyDetail: (companyId: string) => void;

  // Data
  jobs: Job[];
  companies: Company[];
  applications: Application[];
  savedJobIds: string[];
  candidate: CandidateProfile;

  // Filters & Search
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  filteredJobs: Job[];
  resetFilters: () => void;
  toggleJobTypeFilter: (type: JobType) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  totalMatchingJobsCount: number;

  // Saved Jobs
  toggleSaveJob: (jobId: string) => void;
  isJobSaved: (jobId: string) => boolean;

  // Applications
  submitApplication: (appData: {
    jobId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    resumeFileName?: string;
    resumeFileSize?: string;
    linkedInUrl?: string;
    portfolioUrl?: string;
    coverNote?: string;
  }) => Application;
  withdrawApplication: (appId: string) => void;

  // Post a Job
  postJob: (newJob: Omit<Job, 'id' | 'postedDate' | 'postedTimestamp'>) => Job;

  // Candidate
  updateCandidateProfile: (profile: Partial<CandidateProfile>) => void;

  // Toasts
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
}

const DEFAULT_FILTERS: FilterState = {
  searchQuery: '',
  jobTypes: ['Full-time', 'Remote'],
  experienceLevels: [],
  department: 'All',
  salaryMin: '',
  salaryMax: '',
  locationType: 'all',
  sortBy: 'latest'
};

const JobContext = createContext<JobContextType | undefined>(undefined);

const STORAGE_KEYS = {
  JOBS: 'hirestream_jobs_v1',
  APPLICATIONS: 'hirestream_applications_v1',
  SAVED: 'hirestream_saved_jobs_v1',
  CANDIDATE: 'hirestream_candidate_v1'
};

export const JobProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Persistent or default state
  const [jobs, setJobs] = useState<Job[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.JOBS);
    return saved ? JSON.parse(saved) : INITIAL_JOBS;
  });

  const [companies] = useState<Company[]>(INITIAL_COMPANIES);

  const [applications, setApplications] = useState<Application[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SAVED);
    return saved ? JSON.parse(saved) : INITIAL_SAVED_JOB_IDS;
  });

  const [candidate, setCandidate] = useState<CandidateProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CANDIDATE);
    return saved ? JSON.parse(saved) : INITIAL_CANDIDATE;
  });

  // Navigation state
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('find-jobs');
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [lastSubmittedApplication, setLastSubmittedApplication] = useState<Application | null>(null);
  const [inspectedApplication, setInspectedApplication] = useState<Application | null>(null);
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);

  // Filters & Pagination
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const JOBS_PER_PAGE = 3;

  // Toast notifications
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CANDIDATE, JSON.stringify(candidate));
  }, [candidate]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Selected entities
  const selectedJob = useMemo(() => {
    if (!selectedJobId) return null;
    return jobs.find((j) => j.id === selectedJobId) || null;
  }, [selectedJobId, jobs]);

  const selectedCompany = useMemo(() => {
    if (!selectedCompanyId) return null;
    return companies.find((c) => c.id === selectedCompanyId) || null;
  }, [selectedCompanyId, companies]);

  // Navigation handlers
  const navigateToFindJobs = () => {
    setCurrentScreen('find-jobs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToJobDetail = (jobId: string) => {
    setSelectedJobId(jobId);
    setCurrentScreen('job-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToApply = (jobId: string) => {
    setSelectedJobId(jobId);
    setCurrentScreen('apply');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToSuccess = (app: Application) => {
    setLastSubmittedApplication(app);
    setCurrentScreen('apply-success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToDashboard = () => {
    setCurrentScreen('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCompanies = () => {
    setCurrentScreen('companies');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCompanyDetail = (companyId: string) => {
    setSelectedCompanyId(companyId);
    setCurrentScreen('company-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter handlers
  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setCurrentPage(1);
    showToast('Filters reset to default', 'info');
  };

  const toggleJobTypeFilter = (type: JobType) => {
    setFilters((prev) => {
      const exists = prev.jobTypes.includes(type);
      const nextTypes = exists ? prev.jobTypes.filter((t) => t !== type) : [...prev.jobTypes, type];
      return { ...prev, jobTypes: nextTypes };
    });
    setCurrentPage(1);
  };

  // Filtered jobs calculation
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Keyword search
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(query);
        const matchesCompany = job.companyName.toLowerCase().includes(query);
        const matchesLocation = job.location.toLowerCase().includes(query);
        const matchesDepartment = job.department.toLowerCase().includes(query);
        const matchesTags = job.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesCompany && !matchesLocation && !matchesDepartment && !matchesTags) {
          return false;
        }
      }

      // Job type filter (if any selected)
      if (filters.jobTypes.length > 0) {
        const matchesType = filters.jobTypes.some((t) => {
          if (t === 'Remote') return job.workplaceType === 'Remote' || job.location.toLowerCase().includes('remote') || job.tags.includes('Remote');
          if (t === 'Hybrid') return job.workplaceType === 'Hybrid' || job.location.toLowerCase().includes('hybrid') || job.tags.includes('Hybrid');
          return job.jobType === t || job.tags.includes(t);
        });
        if (!matchesType) return false;
      }

      // Salary filters
      if (filters.salaryMin !== '') {
        const minVal = Number(filters.salaryMin) * 1000;
        if (job.salaryMax < minVal) return false;
      }
      if (filters.salaryMax !== '') {
        const maxVal = Number(filters.salaryMax) * 1000;
        if (job.salaryMin > maxVal) return false;
      }

      // Department filter
      if (filters.department && filters.department !== 'All') {
        if (!job.department.toLowerCase().includes(filters.department.toLowerCase())) {
          return false;
        }
      }

      return true;
    });
  }, [jobs, filters]);

  const totalMatchingJobsCount = filteredJobs.length;
  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / JOBS_PER_PAGE));

  // Saved jobs handler
  const toggleSaveJob = (jobId: string) => {
    const isSaved = savedJobIds.includes(jobId);
    if (isSaved) {
      setSavedJobIds((prev) => prev.filter((id) => id !== jobId));
      showToast('Removed from saved jobs', 'info');
    } else {
      setSavedJobIds((prev) => [...prev, jobId]);
      showToast('Saved to your dashboard bookmarks!', 'success');
    }
  };

  const isJobSaved = (jobId: string) => savedJobIds.includes(jobId);

  // Application submission
  const submitApplication = (appData: {
    jobId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    resumeFileName?: string;
    resumeFileSize?: string;
    linkedInUrl?: string;
    portfolioUrl?: string;
    coverNote?: string;
  }) => {
    const job = jobs.find((j) => j.id === appData.jobId) || jobs[0];
    const candidateName = `${appData.firstName} ${appData.lastName}`.trim();

    const newApp: Application = {
      id: `app-${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      companyName: job.companyName,
      companyLogo: job.companyLogo,
      location: job.location,
      appliedDate: 'Applied Today',
      appliedTimestamp: Date.now(),
      status: 'Applied',
      candidateName,
      candidateEmail: appData.email,
      candidatePhone: appData.phone,
      resumeFileName: appData.resumeFileName || candidate.resumeName || 'Resume.pdf',
      resumeFileSize: appData.resumeFileSize || '2.4 MB',
      linkedInUrl: appData.linkedInUrl || candidate.linkedInUrl,
      portfolioUrl: appData.portfolioUrl || candidate.portfolioUrl,
      coverNote: appData.coverNote,
      timeline: [
        {
          stage: 'Application Received',
          description: 'We have your resume and portfolio.',
          completed: true,
          date: 'Today, Just now'
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
      ],
      recruiterNotes: 'Application submitted successfully. Under active review.'
    };

    setApplications((prev) => [newApp, ...prev]);
    showToast(`Application submitted to ${job.companyName}!`, 'success');
    return newApp;
  };

  const withdrawApplication = (appId: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== appId));
    showToast('Application withdrawn', 'info');
  };

  const postJob = (newJobData: Omit<Job, 'id' | 'postedDate' | 'postedTimestamp'>) => {
    const newJob: Job = {
      ...newJobData,
      id: `job-${Date.now()}`,
      postedDate: 'Just now',
      postedTimestamp: Date.now(),
      applicantCount: 0
    };
    setJobs((prev) => [newJob, ...prev]);
    showToast(`Job listing "${newJob.title}" posted successfully!`, 'success');
    return newJob;
  };

  const updateCandidateProfile = (updates: Partial<CandidateProfile>) => {
    setCandidate((prev) => ({ ...prev, ...updates }));
    showToast('Profile updated', 'success');
  };

  return (
    <JobContext.Provider
      value={{
        currentScreen,
        selectedJob,
        selectedCompany,
        lastSubmittedApplication,
        inspectedApplication,
        setInspectedApplication,
        isPostJobModalOpen,
        setIsPostJobModalOpen,

        navigateToFindJobs,
        navigateToJobDetail,
        navigateToApply,
        navigateToSuccess,
        navigateToDashboard,
        navigateToCompanies,
        navigateToCompanyDetail,

        jobs,
        companies,
        applications,
        savedJobIds,
        candidate,

        filters,
        setFilters,
        filteredJobs,
        resetFilters,
        toggleJobTypeFilter,
        currentPage,
        setCurrentPage,
        totalPages,
        totalMatchingJobsCount,

        toggleSaveJob,
        isJobSaved,
        submitApplication,
        withdrawApplication,
        postJob,
        updateCandidateProfile,

        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobContext must be used within a JobProvider');
  }
  return context;
};
