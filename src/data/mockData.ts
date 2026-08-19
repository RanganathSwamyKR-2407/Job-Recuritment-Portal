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
    id: 'job-techflow-coo',
    title: 'Chief Operating Officer (COO)',
    companyId: 'techflow',
    companyName: 'TechFlow',
    companyLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR3BriCc6gp8OsSmJnw07vhylB3KgQbbJo30CQJm_WyXMRNAINMmn27BMlR8-MBS_0bdUr66n5h-wXcv5eAG4QGvJVv0VKj0hB58EFzEaLBRT5XDx1wuRp5bgz38H3zeawEF5Ky_o94FFlhcrhCD1qzM9ltEoZGKnYUrB7VB5s5jAjnG7jSHG94zI12qyXtrqO7NvxWFyLqJzB_7x-eCMuxkh-aSJf1LJFfikJVwEKp8t1UU26mGw',
    location: 'San Francisco, CA',
    workplaceType: 'Hybrid',
    jobType: 'Full-time',
    jobTypeDetails: 'Full-time, Executive',
    department: 'Executive Leadership & Operations',
    experienceLevel: 'Executive',
    salaryMin: 220000,
    salaryMax: 280000,
    salaryDisplay: '$220,000 - $280,000',
    postedDate: '2 days ago',
    postedTimestamp: Date.now() - 2 * 86400000,
    isFeatured: true,
    tags: ['Full-time', 'Executive', 'Operations', 'Leadership'],
    aboutRole: 'TechFlow is seeking an experienced Chief Operating Officer (COO) to lead global operational scale, cross-functional execution, enterprise logistics strategy, and high-performance team leadership. In this role, you will work directly alongside the CEO, Board of Directors, and department heads to steer the company through its next phase of hyper-growth.',
    whatYoullDo: [
      'Oversee day-to-day global operations, business performance, and key operational metrics.',
      'Lead and align executive operations across Product, Engineering, Customer Success, and Revenue teams.',
      'Scale operational frameworks, corporate governance, and multi-region business units.',
      'Drive P&L optimization, budget allocation, and strategic growth initiatives.'
    ],
    whatWereLookingFor: [
      '10+ years of executive leadership and business operations experience in high-growth technology or B2B SaaS.',
      'Proven track record scaling organizations from growth stage to global market leadership.',
      'Exceptional strategic planning, organizational design, and stakeholder communication capabilities.',
      'Deep expertise in operational efficiency, process optimization, and executive decision making.'
    ],
    benefits: [
      '$220,000 - $280,000 base salary + substantial executive equity package',
      'Comprehensive medical, dental, and executive wellness coverage',
      'Flexible hybrid schedule with executive travel allowance',
      'Executive leadership development and board advisory support'
    ],
    applicantCount: 18,
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
    jobTypeDetails: 'Full-time, W2',
    department: 'Design & UX',
    experienceLevel: 'Senior Level',
    salaryMin: 140000,
    salaryMax: 180000,
    salaryDisplay: '$140k - $180k / yr',
    postedDate: '3 days ago',
    postedTimestamp: Date.now() - 3 * 86400000,
    isFeatured: true,
    tags: ['Full-time', 'Senior Level', 'Design Systems'],
    aboutRole: 'Lumina Tech is looking for a Senior Product Designer who is passionate about creating pixel-perfect, scalable design systems and developer tooling experiences.',
    whatYoullDo: [
      'Shape our unified design tokens and multi-framework component libraries in Figma and code.',
      'Work alongside developer advocates and core frontend engineers to refine the authoring experience.',
      'Facilitate design sprints and user feedback sessions with design system leaders across the industry.'
    ],
    whatWereLookingFor: [
      '4+ years in design systems, token architecture, or interactive component specifications.',
      'Fluency in modern web standards, accessibility (WCAG 2.1 AA), and responsiveness.',
      'Exceptional visual craft and documentation abilities.'
    ],
    benefits: ['100% health & dental', 'Series B stock options', 'Annual hardware stipend'],
    applicantCount: 38,
    responseSpeed: 'Typically responds within 2 days'
  },
  {
    id: 'job-vanguard-frontend',
    title: 'Frontend Engineer',
    companyId: 'vanguard-analytics',
    companyName: 'Vanguard Analytics',
    companyLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgou58d42BwpQxem2QvLHbA3F3Dg0uOltNApeQxdsaD3xZr8RjF5EFSpdA5p1oVquCrUVoW4O7t5EpzeMt7jiNrGNbBxWIEP6wcY0jRX6QapaVDlg_aYZBGOYruWfP0_pEh632eF96CO2HolI8J7dGSUmB3o6pW4XjVK2eClsto4kfemFiTvOlkqxI4sgbgHCkrcwwTxucpj32wbJKKAF8WHTwKQHRgBZL2SFpnl_zsvWEp1rp0Dc',
    location: 'Remote',
    workplaceType: 'Remote',
    jobType: 'Full-time',
    jobTypeDetails: 'Full-time, Remote',
    department: 'Engineering',
    experienceLevel: 'Mid Level',
    salaryMin: 120000,
    salaryMax: 150000,
    salaryDisplay: '$120k - $150k / yr',
    postedDate: '4 days ago',
    postedTimestamp: Date.now() - 4 * 86400000,
    isFeatured: false,
    tags: ['Full-time', 'React', 'TypeScript'],
    aboutRole: 'Build blazing-fast real-time financial dashboards and high-volume data visualization tools using React 19, TypeScript, and modern canvas libraries.',
    whatYoullDo: [
      'Architect robust web applications rendering real-time streaming market data.',
      'Optimize rendering pipelines for sub-16ms interactive canvas and WebGL graphics.',
      'Write clean, strictly typed, and thoroughly tested TypeScript code.'
    ],
    whatWereLookingFor: [
      '3+ years professional experience with React and TypeScript.',
      'Solid understanding of state management, WebSockets, and performance profiling.',
      'Experience with data charting libraries (D3, Chart.js, or ECharts).'
    ],
    applicantCount: 54,
    responseSpeed: 'Typically responds within 4 days'
  },
  {
    id: 'job-aeroscale-growth',
    title: 'Growth Marketing Manager',
    companyId: 'aero-scale',
    companyName: 'Aero scale',
    companyLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQJtOd_eEhtJndKUeEiQ4V367j8VX9BYCwND7WjOqfFZm5T0Oo2Kuulf4aW7I4RD8BUmqBAN7XJovjlAjWDm_0BiJRIfjUXfLc1hAVMGqAioXGN5M0ZKpbIp1FkXwbnKPNHwDEi1h3LwAzWtlAlQoxmHpgIE7B495wLbNK427clNNM0X4Q_6japK0uHcVkrEteSjTo0q_GigVoBUj3JZnp_k1Y8OiIk2JRCI5AnARFR_brs4uY_HI',
    location: 'New York, NY',
    workplaceType: 'On-site',
    jobType: 'Full-time',
    jobTypeDetails: 'Full-time, On-site',
    department: 'Marketing',
    experienceLevel: 'Mid Level',
    salaryMin: 90000,
    salaryMax: 120000,
    salaryDisplay: '$90k - $120k / yr',
    postedDate: '5 days ago',
    postedTimestamp: Date.now() - 5 * 86400000,
    isFeatured: false,
    tags: ['Full-time', 'B2B SaaS', 'SEO/SEM'],
    aboutRole: 'Drive top-of-funnel acquisition, paid campaign experimentation, and organic search growth for our developer-first cloud network product.',
    whatYoullDo: [
      'Manage multi-channel paid acquisition campaigns across Google Ads, LinkedIn, and Meta.',
      'Execute continuous A/B tests on landing pages, messaging, and signup funnels.',
      'Partner with content teams to accelerate high-intent technical SEO rankings.'
    ],
    whatWereLookingFor: [
      '3+ years of growth marketing experience in B2B tech or SaaS.',
      'Deep quantitative chops in Google Analytics 4, Mixpanel, and SQL.',
      'Proven track record scaling organic and paid customer acquisition pipelines.'
    ],
    applicantCount: 29,
    responseSpeed: 'Typically responds within 3 days'
  },
  {
    id: 'job-innovate-uxr',
    title: 'UX Researcher',
    companyId: 'innovate-inc',
    companyName: 'Innovate Inc.',
    companyLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR3BriCc6gp8OsSmJnw07vhylB3KgQbbJo30CQJm_WyXMRNAINMmn27BMlR8-MBS_0bdUr66n5h-wXcv5eAG4QGvJVv0VKj0hB58EFzEaLBRT5XDx1wuRp5bgz38H3zeawEF5Ky_o94FFlhcrhCD1qzM9ltEoZGKnYUrB7VB5s5jAjnG7jSHG94zI12qyXtrqO7NvxWFyLqJzB_7x-eCMuxkh-aSJf1LJFfikJVwEKp8t1UU26mGw',
    location: 'Remote',
    workplaceType: 'Remote',
    jobType: 'Full-time',
    jobTypeDetails: 'Full-time, Remote',
    department: 'Product Experience',
    experienceLevel: 'Mid Level',
    salaryMin: 115000,
    salaryMax: 145000,
    salaryDisplay: '$115k - $145k / yr',
    postedDate: '6 days ago',
    postedTimestamp: Date.now() - 6 * 86400000,
    isFeatured: false,
    tags: ['Full-time', 'User Research', 'Qualitative Analysis'],
    aboutRole: 'Lead qualitative and quantitative user research initiatives to help define next-generation workflows for collaborative software users.',
    whatYoullDo: [
      'Plan and execute usability tests, contextual inquiries, and surveys.',
      'Synthesize complex findings into actionable product recommendations.',
      'Build a central user research repository accessible across the company.'
    ],
    whatWereLookingFor: [
      '3+ years conducting generative and evaluative research for digital products.',
      'Strong storytelling and stakeholder presentation skills.'
    ],
    applicantCount: 22,
    responseSpeed: 'Typically responds within 2 days'
  },
  {
    id: 'job-creative-lead-ui',
    title: 'Lead UI Designer',
    companyId: 'lumina-tech',
    companyName: 'Creative Solutions',
    companyLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkUefj16KDyojJLtLoyJPTiACMwbwtMQU3h_lR6Dvykxtkx02w1G6WoPVrrKyqOULW4nCGqml6iPJbAViMqqHtXZZvXMJLI4-tV5WBNr999BUtSnc68PMEB-V0bdeNc0M6OSG8uQQBVL-5kHezd5IpvpxXomWO4bCx9DvY3WbRH2PW0iW_BafwjEqZ6_L53IPVkFxuezrhJwjfHJz95hmwUx7oa_XFecJE0_He-7U1A_dAeJHbRJ8',
    location: 'New York, NY',
    workplaceType: 'Hybrid',
    jobType: 'Full-time',
    jobTypeDetails: 'Full-time, Hybrid',
    department: 'Creative Design',
    experienceLevel: 'Lead / Principal',
    salaryMin: 160000,
    salaryMax: 195000,
    salaryDisplay: '$160k - $195k / yr',
    postedDate: '1 week ago',
    postedTimestamp: Date.now() - 7 * 86400000,
    isFeatured: true,
    tags: ['Full-time', 'Lead', 'Figma', 'Visual Craft'],
    aboutRole: 'Set the visual aesthetic, typography standards, and art direction for flagship web applications and consumer experiences.',
    whatYoullDo: [
      'Direct a team of 4 talented designers delivering high-fidelity interfaces.',
      'Collaborate with brand strategists to ensure unified omnichannel experiences.'
    ],
    whatWereLookingFor: ['6+ years in digital UI design with portfolio of shipped products.'],
    applicantCount: 31,
    responseSpeed: 'Typically responds within 3 days'
  },
  {
    id: 'job-fintech-product-designer',
    title: 'Product Designer',
    companyId: 'vanguard-analytics',
    companyName: 'FinTech Startup',
    companyLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgou58d42BwpQxem2QvLHbA3F3Dg0uOltNApeQxdsaD3xZr8RjF5EFSpdA5p1oVquCrUVoW4O7t5EpzeMt7jiNrGNbBxWIEP6wcY0jRX6QapaVDlg_aYZBGOYruWfP0_pEh632eF96CO2HolI8J7dGSUmB3o6pW4XjVK2eClsto4kfemFiTvOlkqxI4sgbgHCkrcwwTxucpj32wbJKKAF8WHTwKQHRgBZL2SFpnl_zsvWEp1rp0Dc',
    location: 'Remote',
    workplaceType: 'Remote',
    jobType: 'Contract',
    jobTypeDetails: 'Contract, 6 months',
    department: 'Design',
    experienceLevel: 'Mid Level',
    salaryMin: 110000,
    salaryMax: 135000,
    salaryDisplay: '$110k - $135k / yr',
    postedDate: '1 week ago',
    postedTimestamp: Date.now() - 7 * 86400000,
    isFeatured: false,
    tags: ['Contract', 'Remote', 'FinTech', 'Mobile UX'],
    aboutRole: 'Redesign onboarding flows and wealth management interfaces for our high-growth consumer investment application.',
    whatYoullDo: ['Design mobile and web investment dashboards', 'Run rapid prototype tests with active investors'],
    whatWereLookingFor: ['3+ years in product design, ideally within fintech or banking.'],
    applicantCount: 19,
    responseSpeed: 'Typically responds within 5 days'
  },
  {
    id: 'job-global-ds-lead',
    title: 'Design Systems Lead',
    companyId: 'lumina-tech',
    companyName: 'Global Corp',
    companyLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkUefj16KDyojJLtLoyJPTiACMwbwtMQU3h_lR6Dvykxtkx02w1G6WoPVrrKyqOULW4nCGqml6iPJbAViMqqHtXZZvXMJLI4-tV5WBNr999BUtSnc68PMEB-V0bdeNc0M6OSG8uQQBVL-5kHezd5IpvpxXomWO4bCx9DvY3WbRH2PW0iW_BafwjEqZ6_L53IPVkFxuezrhJwjfHJz95hmwUx7oa_XFecJE0_He-7U1A_dAeJHbRJ8',
    location: 'Remote',
    workplaceType: 'Remote',
    jobType: 'Full-time',
    jobTypeDetails: 'Full-time, Remote',
    department: 'Engineering & Design',
    experienceLevel: 'Lead / Principal',
    salaryMin: 175000,
    salaryMax: 210000,
    salaryDisplay: '$175k - $210k / yr',
    postedDate: '3 days ago',
    postedTimestamp: Date.now() - 3 * 86400000,
    isFeatured: true,
    tags: ['Full-time', 'Design Systems', 'React', 'Figma Tokens'],
    aboutRole: 'Own and evolve the design systems architecture across 12 product lines and 300+ engineers worldwide.',
    whatYoullDo: ['Build automated token pipelines connecting Figma to React/Tailwind/Swift', 'Establish cross-functional governance'],
    whatWereLookingFor: ['7+ years experience leading design systems at scale.'],
    applicantCount: 45,
    responseSpeed: 'Typically responds within 2 days'
  },
  {
    id: 'job-appworks-mobile-ux',
    title: 'Mobile UX Designer',
    companyId: 'techflow',
    companyName: 'AppWorks',
    companyLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR3BriCc6gp8OsSmJnw07vhylB3KgQbbJo30CQJm_WyXMRNAINMmn27BMlR8-MBS_0bdUr66n5h-wXcv5eAG4QGvJVv0VKj0hB58EFzEaLBRT5XDx1wuRp5bgz38H3zeawEF5Ky_o94FFlhcrhCD1qzM9ltEoZGKnYUrB7VB5s5jAjnG7jSHG94zI12qyXtrqO7NvxWFyLqJzB_7x-eCMuxkh-aSJf1LJFfikJVwEKp8t1UU26mGw',
    location: 'Austin, TX',
    workplaceType: 'Hybrid',
    jobType: 'Full-time',
    jobTypeDetails: 'Full-time, Hybrid',
    department: 'Mobile Apps',
    experienceLevel: 'Mid Level',
    salaryMin: 110000,
    salaryMax: 135000,
    salaryDisplay: '$110k - $135k / yr',
    postedDate: '4 days ago',
    postedTimestamp: Date.now() - 4 * 86400000,
    isFeatured: false,
    tags: ['Full-time', 'iOS', 'Android', 'Figma'],
    aboutRole: 'Design native iOS and Android experiences for millions of daily active lifestyle and wellness users.',
    whatYoullDo: ['Craft micro-interactions and tactile gestures', 'Collaborate with mobile engineers using Swift and Kotlin'],
    whatWereLookingFor: ['3+ years native mobile design experience.'],
    applicantCount: 27,
    responseSpeed: 'Typically responds within 3 days'
  }
];

export const INITIAL_SAVED_JOB_IDS = ['job-techflow-coo', 'job-creative-lead-ui', 'job-fintech-product-designer'];

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app-techflow-001',
    jobId: 'job-techflow-coo',
    jobTitle: 'Chief Operating Officer (COO)',
    companyName: 'TechFlow',
    companyLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR3BriCc6gp8OsSmJnw07vhylB3KgQbbJo30CQJm_WyXMRNAINMmn27BMlR8-MBS_0bdUr66n5h-wXcv5eAG4QGvJVv0VKj0hB58EFzEaLBRT5XDx1wuRp5bgz38H3zeawEF5Ky_o94FFlhcrhCD1qzM9ltEoZGKnYUrB7VB5s5jAjnG7jSHG94zI12qyXtrqO7NvxWFyLqJzB_7x-eCMuxkh-aSJf1LJFfikJVwEKp8t1UU26mGw',
    location: 'San Francisco, CA',
    appliedDate: 'Applied Today',
    appliedTimestamp: Date.now() - 3600000 * 2,
    status: 'Interviewing',
    candidateName: 'Ranganath Swamy K R',
    candidateEmail: 'ranganath.swamy@example.com',
    candidatePhone: '+1 (555) 019-2834',
    resumeFileName: 'Ranganath_Swamy_KR_COO_Executive_Resume.pdf',
    resumeFileSize: '2.4 MB',
    linkedInUrl: 'https://linkedin.com/in/ranganathswamykr',
    portfolioUrl: 'https://ranganathswamykr.com',
    coverNote: 'Excited to bring my 15+ years of executive operations, P&L management, scaling tech organizations, and global logistics execution to TechFlow.',
    timeline: [
      {
        stage: 'Application Received',
        description: 'We have your executive resume and leadership dossier.',
        completed: true,
        date: 'Today, 9:15 AM'
      },
      {
        stage: 'Initial Review',
        description: 'The Board & CEO have completed executive screening.',
        completed: true,
        date: 'Today, 2:30 PM'
      },
      {
        stage: 'Interview Scheduling',
        description: 'Executive Panel & Founder Discussion scheduled.',
        completed: true,
        date: 'Scheduled for Tomorrow, 3:00 PM PST'
      }
    ],
    interviewDate: 'Tomorrow at 3:00 PM PST (Executive Zoom Boardroom)',
    recruiterNotes: 'CEO and Search Committee were exceptionally impressed by your COO track record in scaling B2B enterprise operations. Ready for round 1 executive chat.'
  },
  {
    id: 'app-innovate-002',
    jobId: 'job-innovate-uxr',
    jobTitle: 'VP of Operations / Executive Advisor',
    companyName: 'Innovate Inc.',
    companyLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR3BriCc6gp8OsSmJnw07vhylB3KgQbbJo30CQJm_WyXMRNAINMmn27BMlR8-MBS_0bdUr66n5h-wXcv5eAG4QGvJVv0VKj0hB58EFzEaLBRT5XDx1wuRp5bgz38H3zeawEF5Ky_o94FFlhcrhCD1qzM9ltEoZGKnYUrB7VB5s5jAjnG7jSHG94zI12qyXtrqO7NvxWFyLqJzB_7x-eCMuxkh-aSJf1LJFfikJVwEKp8t1UU26mGw',
    location: 'Remote',
    appliedDate: '3 days ago',
    appliedTimestamp: Date.now() - 86400000 * 3,
    status: 'Under Review',
    candidateName: 'Ranganath Swamy K R',
    candidateEmail: 'ranganath.swamy@example.com',
    candidatePhone: '+1 (555) 019-2834',
    resumeFileName: 'Ranganath_Swamy_KR_COO_Executive_Resume.pdf',
    resumeFileSize: '2.4 MB',
    linkedInUrl: 'https://linkedin.com/in/ranganathswamykr',
    portfolioUrl: 'https://ranganathswamykr.com',
    coverNote: 'Passionate about executive organizational design, cross-functional synergy, and transforming operational strategy into compounding revenue.',
    timeline: [
      {
        stage: 'Application Received',
        description: 'We have your executive profile.',
        completed: true,
        date: '3 days ago'
      },
      {
        stage: 'Initial Review',
        description: 'The Executive Search team is actively reviewing your dossier.',
        completed: false
      },
      {
        stage: 'Interview Scheduling',
        description: 'Executive rounds sent to shortlisted leadership candidates.',
        completed: false
      }
    ],
    recruiterNotes: 'Application passed preliminary executive screening. Under active review with Managing Partner.'
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
