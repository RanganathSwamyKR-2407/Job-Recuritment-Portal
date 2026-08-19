import { Company, Job, Application, CandidateProfile } from '../types';

export const INITIAL_COMPANIES: Company[] = [
  {
    id: 'techflow',
    name: 'TechFlow',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR3BriCc6gp8OsSmJnw07vhylB3KgQbbJo30CQJm_WyXMRNAINMmn27BMlR8-MBS_0bdUr66n5h-wXcv5eAG4QGvJVv0VKj0hB58EFzEaLBRT5XDx1wuRp5bgz38H3zeawEF5Ky_o94FFlhcrhCD1qzM9ltEoZGKnYUrB7VB5s5jAjnG7jSHG94zI12qyXtrqO7NvxWFyLqJzB_7x-eCMuxkh-aSJf1LJFfikJVwEKp8t1UU26mGw',
    location: 'San Francisco, CA',
    website: 'https://techflow.io',
    size: '250 - 500 Employees',
    industry: 'Enterprise B2B SaaS / Supply Chain Logistics',
    founded: '2019',
    about: 'TechFlow is a B2B SaaS platform optimizing supply chain logistics for enterprise retailers. We believe in building software that empowers people to do their best work without friction.',
    culture: [
      'Customer-obsessed product discovery',
      'High autonomy & ownership mindset',
      'Asynchronous-first collaboration',
      'Continuous learning stipend ($2,500/year)'
    ],
    benefits: [
      'Comprehensive Medical, Dental, and Vision (100% covered)',
      'Flexible 401(k) matching up to 5%',
      'Unlimited Paid Time Off & quarterly wellness days',
      'Home office setup allowance ($1,200)'
    ],
    openRolesCount: 4
  },
  {
    id: 'lumina-tech',
    name: 'Lumina Tech',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkUefj16KDyojJLtLoyJPTiACMwbwtMQU3h_lR6Dvykxtkx02w1G6WoPVrrKyqOULW4nCGqml6iPJbAViMqqHtXZZvXMJLI4-tV5WBNr999BUtSnc68PMEB-V0bdeNc0M6OSG8uQQBVL-5kHezd5IpvpxXomWO4bCx9DvY3WbRH2PW0iW_BafwjEqZ6_L53IPVkFxuezrhJwjfHJz95hmwUx7oa_XFecJE0_He-7U1A_dAeJHbRJ8',
    location: 'San Francisco, CA',
    website: 'https://luminatech.dev',
    size: '100 - 250 Employees',
    industry: 'Design Systems & Developer Tools',
    founded: '2021',
    about: 'Lumina Tech creates unified design engineering infrastructure that harmonizes product design and frontend software delivery for teams worldwide.',
    culture: [
      'Craft-first engineering and design',
      'Open-source stewardship',
      'Radical candor and rapid prototyping'
    ],
    benefits: [
      'Top-tier health coverage',
      'Equity options in high-growth Series B',
      'Quarterly team offsites in premier locations'
    ],
    openRolesCount: 3
  },
  {
    id: 'vanguard-analytics',
    name: 'Vanguard Analytics',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgou58d42BwpQxem2QvLHbA3F3Dg0uOltNApeQxdsaD3xZr8RjF5EFSpdA5p1oVquCrUVoW4O7t5EpzeMt7jiNrGNbBxWIEP6wcY0jRX6QapaVDlg_aYZBGOYruWfP0_pEh632eF96CO2HolI8J7dGSUmB3o6pW4XjVK2eClsto4kfemFiTvOlkqxI4sgbgHCkrcwwTxucpj32wbJKKAF8WHTwKQHRgBZL2SFpnl_zsvWEp1rp0Dc',
    location: 'Remote (HQ: Chicago, IL)',
    website: 'https://vanguardanalytics.ai',
    size: '500 - 1000 Employees',
    industry: 'Real-time Financial Analytics & Big Data',
    founded: '2017',
    about: 'Vanguard Analytics builds low-latency data streaming engines for the global financial ecosystem, processing over 10 billion events daily.',
    culture: [
      'Distributed-first culture',
      'Deep focus on speed, correctness, and reliability',
      'Encouragement of technical experimentation'
    ],
    benefits: [
      'Competitive remote salary with no geo-discounting',
      'Generous parental leave (16 weeks paid)',
      'Annual hardware refresh grant'
    ],
    openRolesCount: 6
  },
  {
    id: 'aero-scale',
    name: 'Aero scale',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQJtOd_eEhtJndKUeEiQ4V367j8VX9BYCwND7WjOqfFZm5T0Oo2Kuulf4aW7I4RD8BUmqBAN7XJovjlAjWDm_0BiJRIfjUXfLc1hAVMGqAioXGN5M0ZKpbIp1FkXwbnKPNHwDEi1h3LwAzWtlAlQoxmHpgIE7B495wLbNK427clNNM0X4Q_6japK0uHcVkrEteSjTo0q_GigVoBUj3JZnp_k1Y8OiIk2JRCI5AnARFR_brs4uY_HI',
    location: 'New York, NY',
    website: 'https://aeroscale.co',
    size: '50 - 100 Employees',
    industry: 'Cloud Infrastructure & API Acceleration',
    founded: '2022',
    about: 'Aero scale is transforming the edge computing landscape with zero-config routing and ultra-fast application delivery networks.',
    culture: [
      'Fast-paced entrepreneurial vibe',
      'Direct contact with founders and early customers',
      'Bias towards action'
    ],
    benefits: [
      'Early employee stock grant',
      'Downtown Manhattan office with catered lunches',
      'Full transit pass'
    ],
    openRolesCount: 2
  },
  {
    id: 'innovate-inc',
    name: 'Innovate Inc.',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR3BriCc6gp8OsSmJnw07vhylB3KgQbbJo30CQJm_WyXMRNAINMmn27BMlR8-MBS_0bdUr66n5h-wXcv5eAG4QGvJVv0VKj0hB58EFzEaLBRT5XDx1wuRp5bgz38H3zeawEF5Ky_o94FFlhcrhCD1qzM9ltEoZGKnYUrB7VB5s5jAjnG7jSHG94zI12qyXtrqO7NvxWFyLqJzB_7x-eCMuxkh-aSJf1LJFfikJVwEKp8t1UU26mGw',
    location: 'Remote',
    website: 'https://innovateinc.org',
    size: '150 - 300 Employees',
    industry: 'User Research & Experience Intelligence',
    founded: '2020',
    about: 'Innovate Inc. delivers end-to-end qualitative research automation that empowers product teams to understand customer behavior faster.',
    culture: ['Empathy driven', 'Human-centered', 'Flexible work hours'],
    benefits: ['Full healthcare', 'Flexible workspace stipend', 'Gym membership'],
    openRolesCount: 3
  }
];

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-techflow-lead-architect',
    title: 'Principal Distributed Systems Architect',
    companyId: 'techflow',
    companyName: 'TechFlow',
    companyLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR3BriCc6gp8OsSmJnw07vhylB3KgQbbJo30CQJm_WyXMRNAINMmn27BMlR8-MBS_0bdUr66n5h-wXcv5eAG4QGvJVv0VKj0hB58EFzEaLBRT5XDx1wuRp5bgz38H3zeawEF5Ky_o94FFlhcrhCD1qzM9ltEoZGKnYUrB7VB5s5jAjnG7jSHG94zI12qyXtrqO7NvxWFyLqJzB_7x-eCMuxkh-aSJf1LJFfikJVwEKp8t1UU26mGw',
    location: 'San Francisco, CA',
    workplaceType: 'Hybrid',
    jobType: 'Full-time',
    jobTypeDetails: 'Full-time, Principal Level',
    department: 'Core Infrastructure & Cloud Engineering',
    experienceLevel: 'Lead / Principal',
    salaryMin: 195000,
    salaryMax: 245000,
    salaryDisplay: '$195,000 - $245,000',
    postedDate: '1 day ago',
    postedTimestamp: Date.now() - 86400000,
    isFeatured: true,
    tags: ['Full-time', 'Distributed Systems', 'Go / Rust', 'Kubernetes'],
    aboutRole: 'TechFlow is looking for a Principal Distributed Systems Architect to design, scale, and optimize our high-throughput global logistics event-streaming backbone. You will collaborate directly with our engineering leadership to architect zero-downtime, fault-tolerant infrastructure capable of processing billions of transactions per day.',
    whatYoullDo: [
      'Architect and lead next-generation distributed streaming and transactional pipelines.',
      'Establish architectural standards for resiliency, high availability, and disaster recovery.',
      'Partner closely with Product and Data teams to optimize real-time routing engines.',
      'Mentor senior and staff software engineers across infrastructure domains.'
    ],
    whatWereLookingFor: [
      '8+ years building large-scale, fault-tolerant distributed systems in Go, Rust, or Java/C++.',
      'Deep knowledge of Kafka, Redis, gRPC, Kubernetes, and cloud primitives (GCP/AWS).',
      'Strong track record in database partitioning, replication, and distributed consensus algorithms.',
      'Excellent technical writing and cross-functional leadership ability.'
    ],
    benefits: [
      '$195,000 - $245,000 base salary + equity package',
      '100% company-paid medical, dental, and vision insurance',
      'Flexible hybrid schedule (2 days in our downtown SF hub)',
      '$2,500 annual personal growth and learning budget'
    ],
    applicantCount: 14,
    responseSpeed: 'Typically responds within 2 days'
  },
  {
    id: 'job-techflow-spd',
    title: 'Senior Product Designer',
    companyId: 'techflow',
    companyName: 'TechFlow',
    companyLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR3BriCc6gp8OsSmJnw07vhylB3KgQbbJo30CQJm_WyXMRNAINMmn27BMlR8-MBS_0bdUr66n5h-wXcv5eAG4QGvJVv0VKj0hB58EFzEaLBRT5XDx1wuRp5bgz38H3zeawEF5Ky_o94FFlhcrhCD1qzM9ltEoZGKnYUrB7VB5s5jAjnG7jSHG94zI12qyXtrqO7NvxWFyLqJzB_7x-eCMuxkh-aSJf1LJFfikJVwEKp8t1UU26mGw',
    location: 'San Francisco, CA',
    workplaceType: 'Hybrid',
    jobType: 'Full-time',
    jobTypeDetails: 'Full-time, W2',
    department: 'Product Experience',
    experienceLevel: 'Senior Level',
    salaryMin: 150000,
    salaryMax: 185000,
    salaryDisplay: '$150,000 - $185,000',
    postedDate: '2 days ago',
    postedTimestamp: Date.now() - 2 * 86400000,
    isFeatured: true,
    tags: ['Full-time', 'Hybrid', 'Design Systems', 'Enterprise UX'],
    aboutRole: 'TechFlow is seeking a Senior Product Designer to lead the end-to-end user experience for our flagship enterprise application. You will collaborate closely with product managers, engineers, and researchers to transform complex workflows into intuitive, beautiful, and efficient interfaces. This is a high-impact role requiring a strong balance of systems thinking and visual execution.',
    whatYoullDo: [
      'Lead the design of complex features from concept to final execution, ensuring a cohesive experience across platforms.',
      'Collaborate with cross-functional teams to define product vision, strategy, and roadmap.',
      'Develop and maintain our emerging design system, ensuring consistency and scalability.',
      'Conduct user research and usability testing to validate design decisions and uncover new insights.'
    ],
    whatWereLookingFor: [
      '5+ years of experience designing digital products, preferably in B2B SaaS or enterprise software.',
      'A strong portfolio demonstrating complex problem-solving, clean visual design, and user-centered methodologies.',
      'Proficiency in Figma and modern prototyping tools.',
      'Excellent communication skills and the ability to articulate design rationale to stakeholders.'
    ],
    benefits: [
      '$150,000 - $185,000 base salary + competitive equity',
      'Comprehensive medical, dental, and vision insurance',
      'Flexible hybrid schedule (2 days in our downtown SF hub)',
      '$2,500 annual personal growth and learning budget'
    ],
    applicantCount: 42,
    responseSpeed: 'Typically responds within 3 days'
  },
  {
    id: 'job-lumina-spd',
    title: 'Senior Product Designer',
    companyId: 'lumina-tech',
    companyName: 'Lumina Tech',
    companyLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkUefj16KDyojJLtLoyJPTiACMwbwtMQU3h_lR6Dvykxtkx02w1G6WoPVrrKyqOULW4nCGqml6iPJbAViMqqHtXZZvXMJLI4-tV5WBNr999BUtSnc68PMEB-V0bdeNc0M6OSG8uQQBVL-5kHezd5IpvpxXomWO4bCx9DvY3WbRH2PW0iW_BafwjEqZ6_L53IPVkFxuezrhJwjfHJz95hmwUx7oa_XFecJE0_He-7U1A_dAeJHbRJ8',
    location: 'San Francisco, CA (Hybrid)',
    workplaceType: 'Hybrid',
    jobType: 'Full-time',
    jobTypeDetails: 'Full-time',
    department: 'Design Infrastructure',
    experienceLevel: 'Senior Level',
    salaryMin: 140000,
    salaryMax: 175000,
    salaryDisplay: '$140,000 - $175,000',
    postedDate: '3 days ago',
    postedTimestamp: Date.now() - 3 * 86400000,
    isFeatured: false,
    tags: ['Full-time', 'Hybrid', 'Figma Tokens', 'UI Components'],
    aboutRole: 'Lumina Tech is looking for a systems-minded Senior Product Designer to spearhead our cross-platform design token ecosystem. You will bridge the gap between creative visual designers and frontend engineers.',
    whatYoullDo: [
      'Design modular component libraries and accessibility-compliant UI elements.',
      'Maintain token hierarchies in Figma and synchronize with code repositories.',
      'Facilitate design critique sessions and align product teams with system guidelines.'
    ],
    whatWereLookingFor: [
      '4+ years specializing in design systems, component architecture, and design tokens.',
      'Deep understanding of WCAG 2.1 AA accessibility guidelines.',
      'Familiarity with HTML, CSS, and component prop structures.'
    ],
    benefits: [
      '$140,000 - $175,000 base salary',
      'Series B incentive stock options',
      'Catered healthy lunches and wellness stipend'
    ],
    applicantCount: 29,
    responseSpeed: 'Typically responds within 2 days'
  },
  {
    id: 'job-vanguard-fe',
    title: 'Lead Frontend Engineer',
    companyId: 'vanguard-analytics',
    companyName: 'Vanguard Analytics',
    companyLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgou58d42BwpQxem2QvLHbA3F3Dg0uOltNApeQxdsaD3xZr8RjF5EFSpdA5p1oVquCrUVoW4O7t5EpzeMt7jiNrGNbBxWIEP6wcY0jRX6QapaVDlg_aYZBGOYruWfP0_pEh632eF96CO2HolI8J7dGSUmB3o6pW4XjVK2eClsto4kfemFiTvOlkqxI4sgbgHCkrcwwTxucpj32wbJKKAF8WHTwKQHRgBZL2SFpnl_zsvWEp1rp0Dc',
    location: 'Remote (HQ: Chicago, IL)',
    workplaceType: 'Remote',
    jobType: 'Full-time',
    jobTypeDetails: 'Full-time, 100% Remote',
    department: 'Frontend Platforms',
    experienceLevel: 'Lead / Principal',
    salaryMin: 165000,
    salaryMax: 200000,
    salaryDisplay: '$165,000 - $200,000',
    postedDate: 'Just now',
    postedTimestamp: Date.now(),
    isFeatured: true,
    tags: ['Full-time', 'Remote', 'React', 'TypeScript', 'Data Viz'],
    aboutRole: 'Vanguard Analytics is looking for a Lead Frontend Engineer to architect real-time interactive financial dashboards and charting libraries. You will optimize rendering pipelines for sub-16ms interactive frames.',
    whatYoullDo: [
      'Lead our client-side architecture using React, TypeScript, and Canvas/WebGL data visualization.',
      'Partner with backend teams to establish high-throughput WebSocket protocols.',
      'Champion performance audits and modern web vitals optimization.'
    ],
    whatWereLookingFor: [
      '6+ years of modern JavaScript/TypeScript and React experience.',
      'Demonstrated expertise in performance profiling and memory management in the browser.',
      'Experience with high-frequency streaming UI states.'
    ],
    benefits: [
      '$165,000 - $200,000 base salary with zero location discount',
      'Annual $3,000 tech allowance + desk stipend',
      '16 weeks fully paid parental leave'
    ],
    applicantCount: 36,
    responseSpeed: 'Typically responds within 1 day'
  },
  {
    id: 'job-aero-gmm',
    title: 'Growth Marketing Manager',
    companyId: 'aero-scale',
    companyName: 'Aero scale',
    companyLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQJtOd_eEhtJndKUeEiQ4V367j8VX9BYCwND7WjOqfFZm5T0Oo2Kuulf4aW7I4RD8BUmqBAN7XJovjlAjWDm_0BiJRIfjUXfLc1hAVMGqAioXGN5M0ZKpbIp1FkXwbnKPNHwDEi1h3LwAzWtlAlQoxmHpgIE7B495wLbNK427clNNM0X4Q_6japK0uHcVkrEteSjTo0q_GigVoBUj3JZnp_k1Y8OiIk2JRCI5AnARFR_brs4uY_HI',
    location: 'New York, NY',
    workplaceType: 'Hybrid',
    jobType: 'Full-time',
    jobTypeDetails: 'Full-time',
    department: 'Marketing & Acquisition',
    experienceLevel: 'Senior Level',
    salaryMin: 125000,
    salaryMax: 155000,
    salaryDisplay: '$125,000 - $155,000',
    postedDate: '4 days ago',
    postedTimestamp: Date.now() - 4 * 86400000,
    isFeatured: false,
    tags: ['Full-time', 'Hybrid', 'Performance Marketing', 'B2B Growth'],
    aboutRole: 'Aero scale is hiring a Growth Marketing Manager to expand our enterprise inbound funnel through data-driven performance marketing and content experimentation.',
    whatYoullDo: [
      'Design, execute, and scale multi-channel acquisition campaigns.',
      'Partner with product to optimize self-serve developer onboarding conversion.',
      'Manage paid search, LinkedIn ads, and developer sponsorship channels.'
    ],
    whatWereLookingFor: [
      '4+ years in B2B tech growth marketing or demand generation.',
      'Strong quantitative analytical skills and SQL proficiency.',
      'Experience optimizing full-funnel CAC/LTV economics.'
    ],
    benefits: [
      '$125,000 - $155,000 base salary',
      'Downtown Manhattan office access with catered lunches',
      'Comprehensive dental, health, and vision plans'
    ],
    applicantCount: 19,
    responseSpeed: 'Typically responds within 3 days'
  },
  {
    id: 'job-innovate-uxr',
    title: 'Lead User Researcher',
    companyId: 'innovate-inc',
    companyName: 'Innovate Inc.',
    companyLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR3BriCc6gp8OsSmJnw07vhylB3KgQbbJo30CQJm_WyXMRNAINMmn27BMlR8-MBS_0bdUr66n5h-wXcv5eAG4QGvJVv0VKj0hB58EFzEaLBRT5XDx1wuRp5bgz38H3zeawEF5Ky_o94FFlhcrhCD1qzM9ltEoZGKnYUrB7VB5s5jAjnG7jSHG94zI12qyXtrqO7NvxWFyLqJzB_7x-eCMuxkh-aSJf1LJFfikJVwEKp8t1UU26mGw',
    location: 'Remote',
    workplaceType: 'Remote',
    jobType: 'Full-time',
    jobTypeDetails: 'Full-time, 100% Remote',
    department: 'User Research',
    experienceLevel: 'Lead / Principal',
    salaryMin: 145000,
    salaryMax: 175000,
    salaryDisplay: '$145,000 - $175,000',
    postedDate: '5 days ago',
    postedTimestamp: Date.now() - 5 * 86400000,
    isFeatured: false,
    tags: ['Full-time', 'Remote', 'Qualitative Research', 'Usability Testing'],
    aboutRole: 'Innovate Inc. is seeking a Lead User Researcher to drive discovery research across our international enterprise customer cohort.',
    whatYoullDo: [
      'Design generative and evaluative research studies for product discovery.',
      'Synthesize complex findings into actionable product frameworks.',
      'Lead usability benchmarking studies across key user cohorts.'
    ],
    whatWereLookingFor: [
      '5+ years leading UX research in product-led software environments.',
      'Deep fluency in mixed-methods qualitative and quantitative research.',
      'Exceptional storytelling and stakeholder presentation abilities.'
    ],
    benefits: [
      '$145,000 - $175,000 base salary',
      'Flexible home office budget and monthly wellness stipend',
      'Flexible time off policy'
    ],
    applicantCount: 22,
    responseSpeed: 'Typically responds within 2 days'
  }
];

export const INITIAL_SAVED_JOB_IDS = ['job-techflow-lead-architect', 'job-techflow-spd', 'job-vanguard-fe'];

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app-sarah-sample-001',
    userId: 'cand-sarah-002',
    jobId: 'job-techflow-spd',
    jobTitle: 'Senior Product Designer',
    companyName: 'TechFlow',
    companyLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR3BriCc6gp8OsSmJnw07vhylB3KgQbbJo30CQJm_WyXMRNAINMmn27BMlR8-MBS_0bdUr66n5h-wXcv5eAG4QGvJVv0VKj0hB58EFzEaLBRT5XDx1wuRp5bgz38H3zeawEF5Ky_o94FFlhcrhCD1qzM9ltEoZGKnYUrB7VB5s5jAjnG7jSHG94zI12qyXtrqO7NvxWFyLqJzB_7x-eCMuxkh-aSJf1LJFfikJVwEKp8t1UU26mGw',
    location: 'San Francisco, CA',
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
    coverNote: 'Excited to bring my experience scaling enterprise design systems and UI component ecosystems to TechFlow.',
    timeline: [
      {
        stage: 'Application Received',
        description: 'Resume received by HireStream platform.',
        completed: true,
        date: 'Today, 9:15 AM'
      },
      {
        stage: 'COO Initial Review',
        description: 'Under active review in the COO Executive Pipeline.',
        completed: true,
        date: 'Today, 2:30 PM'
      },
      {
        stage: 'Interview Scheduling',
        description: 'Product team round scheduling.',
        completed: false
      }
    ],
    recruiterNotes: 'Strong portfolio in enterprise UI/UX and design systems.'
  }
];

export const INITIAL_CANDIDATE: CandidateProfile = {
  firstName: 'Ranganath Swamy',
  lastName: 'K R',
  email: 'ranganath.swamy@example.com',
  phone: '+1 (555) 019-2834',
  title: 'Chief Operating Officer (COO)',
  location: 'San Francisco, CA & Remote',
  linkedInUrl: 'https://linkedin.com/in/ranganathswamykr',
  portfolioUrl: 'https://ranganathswamykr.com',
  bio: 'Chief Operating Officer (COO) with 15+ years of experience leading global business operations, executive strategy, scaling hyper-growth tech enterprises, and operational excellence.',
  resumeName: 'Ranganath_Swamy_KR_COO_Executive_Resume.pdf',
  resumeSize: '2.4 MB',
  skills: [
    'Executive Leadership',
    'Chief Operating Officer (COO)',
    'Global Business Operations',
    'P&L Management',
    'Scaling Organizations',
    'Cross-Functional Strategy',
    'Corporate Governance',
    'Enterprise SaaS'
  ]
};
