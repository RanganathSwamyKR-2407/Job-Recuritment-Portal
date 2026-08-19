import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { Job, Company, Application, CandidateProfile, FilterState, JobType, ApplicationStatus } from '../types';
import {
  INITIAL_JOBS,
  INITIAL_COMPANIES,
  INITIAL_APPLICATIONS,
  INITIAL_SAVED_JOB_IDS,
} from '../data/mockData';
import { useAuth } from './AuthContext';

export type ScreenType =
  | 'find-jobs'
  | 'job-detail'
  | 'apply'
  | 'apply-success'
  | 'dashboard'
  | 'companies'
  | 'company-detail';

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
  applications: Application[]; // Role-dependent: all apps if COO, user's only if candidate
  allPlatformApplications: Application[]; // Full list for COO
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
  toggleSaveJob: (jobId: string) => Promise<void>;
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
  }) => Promise<Application>;
  withdrawApplication: (appId: string) => Promise<void>;
  updateApplicationStatus: (appId: string, newStatus: ApplicationStatus, recruiterNote?: string) => Promise<void>;

  // Post a Job
  postJob: (newJob: Omit<Job, 'id' | 'postedDate' | 'postedTimestamp'>) => Promise<Job>;

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
  JOBS: 'hirestream_jobs_v5',
  ALL_APPLICATIONS: 'hirestream_all_apps_v5',
  SAVED: 'hirestream_saved_jobs_v5',
};

// Default platform applications submitted by diverse general candidates
const SEED_PLATFORM_APPLICATIONS: Application[] = [
  {
    id: 'app-sarah-001',
    userId: 'cand-sarah-002',
    jobId: 'job-techflow-spd',
    jobTitle: 'Senior Product Designer',
    companyName: 'TechFlow Solutions',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&auto=format&fit=crop',
    location: 'San Francisco, CA (Hybrid)',
    appliedDate: 'Applied 10 mins ago',
    appliedTimestamp: Date.now() - 600000,
    status: 'Under Review',
    candidateName: 'Sarah Jenkins',
    candidateEmail: 'sarah.jenkins@gmail.com',
    candidatePhone: '+1 (555) 392-1084',
    resumeFileName: 'Sarah_Jenkins_Lead_Designer_Resume.pdf',
    resumeFileSize: '1.8 MB',
    linkedInUrl: 'https://linkedin.com/in/sarahjenkins-design',
    portfolioUrl: 'https://sarahjenkins.design',
    coverNote: 'Excited about the design system challenges at TechFlow. Having scaled design teams from Series A to C, I am confident in driving the product vision.',
    timeline: [
      { stage: 'Application Received', description: 'Resume received.', completed: true, date: 'Today' },
      { stage: 'Initial Review', description: 'Under active COO review.', completed: true, date: 'Today' },
      { stage: 'Interview Scheduling', description: 'Scheduling leadership interview.', completed: false }
    ],
    recruiterNotes: 'Strong portfolio and enterprise design systems background.'
  },
  {
    id: 'app-alex-002',
    userId: 'cand-alex-003',
    jobId: 'job-vanguard-fe',
    jobTitle: 'Lead Frontend Engineer',
    companyName: 'Vanguard Analytics',
    companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=200&auto=format&fit=crop',
    location: 'Austin, TX & Remote',
    appliedDate: 'Applied 1 hour ago',
    appliedTimestamp: Date.now() - 3600000,
    status: 'Interviewing',
    candidateName: 'Alex Rivera',
    candidateEmail: 'alex.rivera.dev@gmail.com',
    candidatePhone: '+1 (555) 839-2041',
    resumeFileName: 'Alex_Rivera_Frontend_Architect.pdf',
    resumeFileSize: '2.1 MB',
    linkedInUrl: 'https://linkedin.com/in/alexrivera-dev',
    portfolioUrl: 'https://alexrivera.dev',
    coverNote: 'Specialist in high performance React/TypeScript data visualizations.',
    timeline: [
      { stage: 'Application Received', description: 'Resume received.', completed: true, date: 'Today' },
      { stage: 'Initial Review', description: 'Approved by hiring team.', completed: true, date: 'Today' },
      { stage: 'Interview Scheduling', description: 'Boardroom technical interview confirmed for tomorrow at 2:00 PM.', completed: true, date: 'Tomorrow, 2:00 PM' }
    ],
    recruiterNotes: 'Excellent React performance benchmarks and OSS contributions.'
  },
  {
    id: 'app-david-003',
    userId: 'cand-david-004',
    jobId: 'job-aero-gmm',
    jobTitle: 'Growth Marketing Manager',
    companyName: 'Aero Scale',
    companyLogo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=200&auto=format&fit=crop',
    location: 'Chicago, IL',
    appliedDate: 'Applied yesterday',
    appliedTimestamp: Date.now() - 86400000,
    status: 'Technical Round',
    candidateName: 'David Chen',
    candidateEmail: 'david.chen@enterprise.io',
    candidatePhone: '+1 (555) 492-9102',
    resumeFileName: 'David_Chen_Growth_Marketing.pdf',
    resumeFileSize: '1.4 MB',
    timeline: [
      { stage: 'Application Received', description: 'Resume received.', completed: true, date: 'Yesterday' },
      { stage: 'Initial Review', description: 'Passed initial screening.', completed: true, date: 'Yesterday' },
      { stage: 'Interview Scheduling', description: 'Marketing strategy assessment.', completed: true, date: 'In progress' }
    ]
  },
  ...INITIAL_APPLICATIONS
];

export const JobProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, isCOO, candidateProfile, updateUserProfile } = useAuth();

  // Primary state
  const [jobs, setJobs] = useState<Job[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.JOBS);
    return saved ? JSON.parse(saved) : INITIAL_JOBS;
  });

  const [companies] = useState<Company[]>(INITIAL_COMPANIES);

  // All applications across all platform users
  const [allApplications, setAllApplications] = useState<Application[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ALL_APPLICATIONS);
    return saved ? JSON.parse(saved) : SEED_PLATFORM_APPLICATIONS;
  });

  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SAVED);
    return saved ? JSON.parse(saved) : INITIAL_SAVED_JOB_IDS;
  });

  // Navigation state
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('find-jobs');
  const [selectedJobId, setSelectedJobId] = useState<string | null>('job-techflow-lead-architect');
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
    localStorage.setItem(STORAGE_KEYS.ALL_APPLICATIONS, JSON.stringify(allApplications));
  }, [allApplications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  // Load published jobs from Firestore
  useEffect(() => {
    const fetchRemoteJobs = async () => {
      try {
        const snap = await getDocs(collection(db, 'jobs'));
        if (!snap.empty) {
          const remoteJobs: Job[] = [];
          snap.forEach((docSnap) => {
            remoteJobs.push(docSnap.data() as Job);
          });
          setJobs((prev) => {
            const existingIds = new Set(remoteJobs.map((j) => j.id));
            const preserved = prev.filter((j) => !existingIds.has(j.id));
            return [...remoteJobs, ...preserved];
          });
        }
      } catch (e) {
        console.warn('Firestore jobs fetch note:', e);
      }
    };
    fetchRemoteJobs();
  }, []);

  // Real-time Firestore synchronization for Applications:
  // If COO: listen to all applications across Firestore
  // If Candidate: listen only to this user's applications
  useEffect(() => {
    try {
      const appsRef = collection(db, 'applications');
      const appsQuery = user && !isCOO ? query(appsRef, where('userId', '==', user.uid)) : appsRef;

      const unsubscribeApps = onSnapshot(
        appsQuery,
        (snapshot) => {
          if (!snapshot.empty) {
            const remoteApps: Application[] = [];
            snapshot.forEach((d) => remoteApps.push(d.data() as Application));

            setAllApplications((prev) => {
              const remoteIds = new Set(remoteApps.map((a) => a.id));
              const preserved = prev.filter((a) => !remoteIds.has(a.id));
              return [...remoteApps, ...preserved].sort((a, b) => b.appliedTimestamp - a.appliedTimestamp);
            });
          }
        },
        (error) => {
          console.warn('Applications snapshot listener note:', error);
        }
      );

      return () => unsubscribeApps();
    } catch (e) {
      console.warn('Listener error:', e);
    }
  }, [user, isCOO]);

  // Filtered applications based on current active role:
  // COO sees ALL candidate applications across the company
  // General candidate sees ONLY their own applications!
  const visibleApplications = useMemo(() => {
    if (isCOO) {
      return allApplications;
    }
    // Candidate role: only match candidate email or user id
    const userEmail = user?.email || candidateProfile.email.toLowerCase();
    return allApplications.filter(
      (a) =>
        (a.userId && user && a.userId === user.uid) ||
        (a.candidateEmail && a.candidateEmail.toLowerCase() === userEmail) ||
        (a.candidateName && a.candidateName.toLowerCase().includes(candidateProfile.firstName.toLowerCase()))
    );
  }, [isCOO, allApplications, user, candidateProfile]);

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
    if (!selectedJobId) return jobs[0] || null;
    return jobs.find((j) => j.id === selectedJobId) || jobs[0] || null;
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
        const queryStr = filters.searchQuery.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(queryStr);
        const matchesCompany = job.companyName.toLowerCase().includes(queryStr);
        const matchesLocation = job.location.toLowerCase().includes(queryStr);
        const matchesDepartment = job.department.toLowerCase().includes(queryStr);
        const matchesTags = job.tags.some((t) => t.toLowerCase().includes(queryStr));
        if (!matchesTitle && !matchesCompany && !matchesLocation && !matchesDepartment && !matchesTags) {
          return false;
        }
      }

      // Job type filter
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
  const toggleSaveJob = async (jobId: string) => {
    const isSaved = savedJobIds.includes(jobId);
    const nextSaved = isSaved ? savedJobIds.filter((id) => id !== jobId) : [...savedJobIds, jobId];
    setSavedJobIds(nextSaved);

    if (isSaved) {
      showToast('Removed from saved jobs', 'info');
      if (user) {
        try {
          await deleteDoc(doc(db, 'saved_jobs', `${user.uid}_${jobId}`));
        } catch (error) {
          console.warn('Firestore delete saved job note:', error);
        }
      }
    } else {
      showToast('Saved to bookmarks!', 'success');
      if (user) {
        try {
          await setDoc(doc(db, 'saved_jobs', `${user.uid}_${jobId}`), {
            userId: user.uid,
            jobId,
            savedAt: Date.now()
          });
        } catch (error) {
          handleFirestoreError(error, OperationType.WRITE, `saved_jobs/${user.uid}_${jobId}`);
        }
      }
    }
  };

  const isJobSaved = (jobId: string) => savedJobIds.includes(jobId);

  // Application submission
  const submitApplication = async (appData: {
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
    const appId = `app-${Date.now()}`;
    const uid = user ? user.uid : `cand-${Date.now()}`;

    const newApp: Application = {
      id: appId,
      userId: uid,
      jobId: job.id,
      jobTitle: job.title,
      companyName: job.companyName,
      companyLogo: job.companyLogo,
      location: job.location,
      appliedDate: 'Applied Just Now',
      appliedTimestamp: Date.now(),
      status: 'Applied',
      candidateName,
      candidateEmail: appData.email,
      candidatePhone: appData.phone,
      resumeFileName: appData.resumeFileName || candidateProfile.resumeName || 'Resume.pdf',
      resumeFileSize: appData.resumeFileSize || '1.8 MB',
      linkedInUrl: appData.linkedInUrl || candidateProfile.linkedInUrl,
      portfolioUrl: appData.portfolioUrl || candidateProfile.portfolioUrl,
      coverNote: appData.coverNote,
      timeline: [
        {
          stage: 'Application Received',
          description: 'Application dossier received by HireStream platform.',
          completed: true,
          date: 'Just now'
        },
        {
          stage: 'COO Executive Review',
          description: 'Under review in the COO Executive Pipeline.',
          completed: false
        },
        {
          stage: 'Interview Scheduling',
          description: 'Hiring team will reach out for boardroom round.',
          completed: false
        }
      ],
      recruiterNotes: 'Application submitted successfully. Under active review.'
    };

    setAllApplications((prev) => [newApp, ...prev]);

    // Save to Firestore
    try {
      await setDoc(doc(db, 'applications', appId), newApp);
    } catch (error) {
      console.warn('Firestore application write note:', error);
    }

    showToast(`Application submitted to ${job.companyName}!`, 'success');
    return newApp;
  };

  const withdrawApplication = async (appId: string) => {
    setAllApplications((prev) => prev.filter((a) => a.id !== appId));
    try {
      await deleteDoc(doc(db, 'applications', appId));
    } catch (error) {
      console.warn('Firestore withdraw error:', error);
    }
    showToast('Application withdrawn', 'info');
  };

  const updateApplicationStatus = async (appId: string, newStatus: ApplicationStatus, recruiterNote?: string) => {
    setAllApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          return {
            ...app,
            status: newStatus,
            recruiterNotes: recruiterNote || app.recruiterNotes
          };
        }
        return app;
      })
    );

    // Save to Firestore
    try {
      await updateDoc(doc(db, 'applications', appId), {
        status: newStatus,
        recruiterNotes: recruiterNote || 'Status updated by COO.'
      });
    } catch (e) {
      console.warn('Firestore update application note:', e);
    }

    showToast(`Application status updated to "${newStatus}"`, 'success');
  };

  const postJob = async (newJobData: Omit<Job, 'id' | 'postedDate' | 'postedTimestamp'>) => {
    const jobId = `job-${Date.now()}`;
    const newJob: Job = {
      ...newJobData,
      id: jobId,
      postedDate: 'Just now',
      postedTimestamp: Date.now(),
      applicantCount: 0
    };
    setJobs((prev) => [newJob, ...prev]);

    try {
      await setDoc(doc(db, 'jobs', jobId), {
        ...newJob,
        postedBy: user?.uid || 'recruiter_system'
      });
    } catch (e) {
      console.warn('Firestore job write note:', e);
    }

    showToast(`Job listing "${newJob.title}" posted successfully!`, 'success');
    return newJob;
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
        applications: visibleApplications,
        allPlatformApplications: allApplications,
        savedJobIds,
        candidate: candidateProfile,

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
        updateApplicationStatus,
        postJob,
        updateCandidateProfile: updateUserProfile,

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
