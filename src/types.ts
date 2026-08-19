export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Remote' | 'Internship' | 'Hybrid';

export type ExperienceLevel = 'Entry Level' | 'Mid Level' | 'Senior Level' | 'Lead / Principal' | 'Executive';

export interface Company {
  id: string;
  name: string;
  logo: string;
  logoAlt?: string;
  location: string;
  website: string;
  size: string;
  industry: string;
  founded: string;
  about: string;
  culture: string[];
  benefits: string[];
  openRolesCount: number;
}

export interface Job {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  location: string;
  workplaceType: 'On-site' | 'Hybrid' | 'Remote';
  jobType: JobType;
  jobTypeDetails?: string; // e.g. "Full-time, W2"
  department: string;
  experienceLevel: ExperienceLevel;
  salaryMin: number;
  salaryMax: number;
  salaryDisplay: string;
  postedDate: string; // e.g. "2 days ago"
  postedTimestamp: number;
  isFeatured?: boolean;
  tags: string[];
  aboutRole: string;
  whatYoullDo: string[];
  whatWereLookingFor: string[];
  benefits?: string[];
  applicantCount?: number;
  responseSpeed?: string; // e.g. "Typically responds within 3 days"
}

export type ApplicationStatus = 'Applied' | 'Under Review' | 'Interviewing' | 'Technical Round' | 'Offer Extended' | 'Archived';

export interface Application {
  id: string;
  userId?: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  companyLogo: string;
  location: string;
  appliedDate: string;
  appliedTimestamp: number;
  status: ApplicationStatus;
  candidateName: string;
  candidateEmail: string;
  candidatePhone?: string;
  resumeFileName?: string;
  resumeFileSize?: string;
  linkedInUrl?: string;
  portfolioUrl?: string;
  coverNote?: string;
  timeline: {
    stage: string;
    description: string;
    completed: boolean;
    date?: string;
  }[];
  interviewDate?: string;
  recruiterNotes?: string;
}

export interface CandidateProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  title: string;
  location: string;
  linkedInUrl: string;
  portfolioUrl: string;
  bio: string;
  resumeName?: string;
  resumeSize?: string;
  skills: string[];
}

export interface SignedInUserRecord {
  userId: string;
  displayName: string;
  email: string;
  photoURL?: string;
  title: string;
  status: 'Active Now' | 'Online' | 'Idle' | 'Just Joined';
  lastLoginAt: number;
  lastActiveDisplay: string;
  provider: string;
  appliedJobsCount?: number;
  appliedRoles?: string[];
  isCOO?: boolean;
  location?: string;
}

export interface FilterState {
  searchQuery: string;
  jobTypes: JobType[];
  experienceLevels: ExperienceLevel[];
  department: string;
  salaryMin: number | '';
  salaryMax: number | '';
  locationType: string;
  sortBy: 'latest' | 'salary-high' | 'salary-low' | 'featured';
}
