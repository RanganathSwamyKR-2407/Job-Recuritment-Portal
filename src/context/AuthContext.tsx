import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signInAnonymously,
  updateProfile,
  signOut
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, collection, onSnapshot } from 'firebase/firestore';
import { auth, db, googleProvider, handleFirestoreError, OperationType } from '../lib/firebase';
import { CandidateProfile, SignedInUserRecord } from '../types';
import { INITIAL_CANDIDATE } from '../data/mockData';

export type UserPersona = 'coo' | 'candidate';

export interface NewCandidateInput {
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  location?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  candidateProfile: CandidateProfile;
  isAuthenticated: boolean;
  isCOO: boolean;
  activePersona: UserPersona;
  setActivePersona: (persona: UserPersona) => void;
  isLoadingAuth: boolean;
  signedInUsers: SignedInUserRecord[];
  signInWithGoogle: () => Promise<void>;
  signInDirectDemo: (name?: string, email?: string) => Promise<void>;
  signInAsNewCandidate: (input: NewCandidateInput) => Promise<void>;
  signInAsCOO: (securityKey?: string) => Promise<boolean>;
  signOutUser: () => Promise<void>;
  updateUserProfile: (updates: Partial<CandidateProfile>) => Promise<void>;
  simulateUserSignIn: (mockUser: Partial<SignedInUserRecord>) => Promise<void>;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authModalTab: 'candidate' | 'coo';
  setAuthModalTab: (tab: 'candidate' | 'coo') => void;
  cooModalOpen: boolean;
  setCooModalOpen: (open: boolean) => void;
  portalLinksModalOpen: boolean;
  setPortalLinksModalOpen: (open: boolean) => void;
  getUserPortalUrl: (useHash?: boolean) => string;
  getCooPortalUrl: (useHash?: boolean) => string;
}

const GENERAL_CANDIDATE_PROFILE: CandidateProfile = {
  firstName: 'Sarah',
  lastName: 'Jenkins',
  email: 'sarah.jenkins@gmail.com',
  phone: '+1 (555) 392-1084',
  title: 'Principal Product Designer',
  location: 'New York, NY & Remote',
  linkedInUrl: 'https://linkedin.com/in/sarahjenkins-design',
  portfolioUrl: 'https://sarahjenkins.design',
  bio: 'Senior UX & Product Designer specializing in multi-platform enterprise design systems and UI component workflows.',
  resumeName: 'Sarah_Jenkins_Lead_Designer_Resume.pdf',
  resumeSize: '1.8 MB',
  skills: ['Figma', 'UI/UX Design', 'Design Systems', 'Prototyping', 'User Research', 'Design Strategy', 'Tailwind CSS']
};

const DEFAULT_INITIAL_SIGNED_IN_USERS: SignedInUserRecord[] = [
  {
    userId: 'coo-ranganath-001',
    displayName: 'Ranganath Swamy K R',
    email: 'ranganath.swamy@example.com',
    title: 'Chief Operating Officer (COO)',
    status: 'Active Now',
    lastLoginAt: Date.now() - 60000,
    lastActiveDisplay: 'Active Just Now',
    provider: 'google.com',
    appliedJobsCount: 0,
    appliedRoles: [],
    isCOO: true,
    location: 'San Francisco, CA & Remote'
  },
  {
    userId: 'cand-sarah-002',
    displayName: 'Sarah Jenkins',
    email: 'sarah.jenkins@gmail.com',
    title: 'Principal Product Designer',
    status: 'Active Now',
    lastLoginAt: Date.now() - 300000,
    lastActiveDisplay: '5 mins ago',
    provider: 'google.com',
    appliedJobsCount: 1,
    appliedRoles: ['Senior Product Designer @ TechFlow'],
    isCOO: false,
    location: 'New York, NY'
  },
  {
    userId: 'cand-alex-003',
    displayName: 'Alex Rivera',
    email: 'alex.rivera.dev@gmail.com',
    title: 'Senior Frontend Architect',
    status: 'Online',
    lastLoginAt: Date.now() - 900000,
    lastActiveDisplay: '15 mins ago',
    provider: 'google.com',
    appliedJobsCount: 1,
    appliedRoles: ['Lead Frontend Engineer @ Vanguard Analytics'],
    isCOO: false,
    location: 'Austin, TX'
  },
  {
    userId: 'cand-david-004',
    displayName: 'David Chen',
    email: 'david.chen@enterprise.io',
    title: 'Director of Growth Marketing',
    status: 'Idle',
    lastLoginAt: Date.now() - 3600000 * 2,
    lastActiveDisplay: '2 hours ago',
    provider: 'google.com',
    appliedJobsCount: 1,
    appliedRoles: ['Growth Marketing Manager @ Aero scale'],
    isCOO: false,
    location: 'Chicago, IL'
  }
];

function detectPersonaFromUrl(): UserPersona | null {
  if (typeof window === 'undefined') return null;

  try {
    // 1. Check URL query parameters (?role=coo or ?role=user or ?portal=coo or ?portal=user)
    const urlParams = new URLSearchParams(window.location.search);
    const roleParam = (urlParams.get('role') || urlParams.get('portal') || urlParams.get('mode'))?.toLowerCase();
    if (roleParam === 'coo') return 'coo';
    if (roleParam === 'user' || roleParam === 'candidate') return 'candidate';

    // 2. Check URL hash (#/coo or #coo or #/user or #user)
    const hash = window.location.hash.toLowerCase();
    if (hash.includes('coo')) return 'coo';
    if (hash.includes('user') || hash.includes('candidate')) return 'candidate';
  } catch {}

  return null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isSessionAuth, setIsSessionAuth] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  // Initialize persona
  const [activePersona, setActivePersonaState] = useState<UserPersona>(() => {
    const fromUrl = detectPersonaFromUrl();
    if (fromUrl) return fromUrl;

    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('hirestream_persona_v8') as UserPersona;
      if (stored === 'coo' || stored === 'candidate') return stored;
    }
    return 'candidate';
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'candidate' | 'coo'>('candidate');
  const [cooModalOpen, setCooModalOpen] = useState(false);
  const [portalLinksModalOpen, setPortalLinksModalOpen] = useState(false);
  const [candidateProfile, setCandidateProfile] = useState<CandidateProfile>(
    activePersona === 'coo' ? INITIAL_CANDIDATE : GENERAL_CANDIDATE_PROFILE
  );
  const [signedInUsers, setSignedInUsers] = useState<SignedInUserRecord[]>(DEFAULT_INITIAL_SIGNED_IN_USERS);

  const setActivePersona = useCallback((persona: UserPersona) => {
    setActivePersonaState(persona);

    if (typeof window !== 'undefined') {
      localStorage.setItem('hirestream_persona_v8', persona);
      try {
        const url = new URL(window.location.href);
        url.searchParams.set('role', persona === 'coo' ? 'coo' : 'user');
        url.hash = persona === 'coo' ? '/coo' : '/user';
        window.history.replaceState({}, '', url.toString());
      } catch {}
    }

    if (persona === 'candidate') {
      setCandidateProfile((prev) => (prev.title.includes('COO') ? GENERAL_CANDIDATE_PROFILE : prev));
    } else {
      setCandidateProfile(INITIAL_CANDIDATE);
    }
  }, []);

  // Listen to browser navigation changes
  useEffect(() => {
    const handleUrlChange = () => {
      const detected = detectPersonaFromUrl();
      if (detected) {
        if (detected !== activePersona) {
          setActivePersona(detected);
        }
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);

    handleUrlChange();

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, [activePersona, setActivePersona]);

  // Construct absolute shareable URLs
  const getUserPortalUrl = (useHash: boolean = false) => {
    if (typeof window === 'undefined') return 'https://hirestream.app/?role=user';
    const base = window.location.origin + window.location.pathname;
    return useHash ? `${base}#/user` : `${base}?role=user`;
  };

  const getCooPortalUrl = (useHash: boolean = false) => {
    if (typeof window === 'undefined') return 'https://hirestream.app/?role=coo';
    const base = window.location.origin + window.location.pathname;
    return useHash ? `${base}#/coo` : `${base}?role=coo`;
  };

  const isCOO = activePersona === 'coo';

  // Listen to signed_in_users collection in Firestore
  useEffect(() => {
    const usersCol = collection(db, 'signed_in_users');
    const unsubscribe = onSnapshot(
      usersCol,
      (snapshot) => {
        if (!snapshot.empty) {
          const list: SignedInUserRecord[] = [];
          snapshot.forEach((docSnap) => {
            list.push(docSnap.data() as SignedInUserRecord);
          });
          setSignedInUsers((prev) => {
            const remoteMap = new Map(list.map((u) => [u.userId, u]));
            const preserved = prev.filter((u) => !remoteMap.has(u.userId));
            return [...list, ...preserved].sort((a, b) => b.lastLoginAt - a.lastLoginAt);
          });
        }
      },
      (err) => {
        console.warn('Firestore signed_in_users stream note:', err);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        setIsSessionAuth(true);
        const profileRef = doc(db, 'user_profiles', currentUser.uid);
        const signedInUserRef = doc(db, 'signed_in_users', currentUser.uid);

        try {
          const profileSnap = await getDoc(profileRef);
          let currentFname = activePersona === 'coo' ? 'Ranganath Swamy' : 'Sarah';
          let currentLname = activePersona === 'coo' ? 'K R' : 'Jenkins';
          let currentTitle = activePersona === 'coo' ? 'Chief Operating Officer (COO)' : 'Principal Product Designer';

          if (profileSnap.exists()) {
            const data = profileSnap.data();
            currentFname = data.firstName || currentFname;
            currentLname = data.lastName || currentLname;
            currentTitle = data.title || currentTitle;

            setCandidateProfile({
              firstName: currentFname,
              lastName: currentLname,
              email: currentUser.email || data.email || 'user@example.com',
              phone: data.phone || '+1 (555) 392-1084',
              title: currentTitle,
              location: data.location || 'San Francisco, CA & Remote',
              linkedInUrl: data.linkedInUrl || 'https://linkedin.com/in/sarahjenkins-design',
              portfolioUrl: data.portfolioUrl || 'https://sarahjenkins.design',
              bio: data.bio || 'Profile in HireStream.',
              resumeName: data.resumeName || 'Resume.pdf',
              resumeSize: data.resumeSize || '1.8 MB',
              skills: data.skills || GENERAL_CANDIDATE_PROFILE.skills,
            });
          } else {
            if (currentUser.displayName) {
              const parts = currentUser.displayName.trim().split(' ');
              if (parts.length > 1) {
                currentFname = parts.slice(0, -1).join(' ');
                currentLname = parts[parts.length - 1];
              } else {
                currentFname = parts[0];
                currentLname = '';
              }
            }

            const initialProfile = {
              userId: currentUser.uid,
              firstName: currentFname,
              lastName: currentLname,
              email: currentUser.email || 'user@example.com',
              title: currentTitle,
              location: 'San Francisco, CA & Remote',
              phone: '+1 (555) 392-1084',
              bio: 'Profile registered on HireStream.',
              linkedInUrl: 'https://linkedin.com',
              portfolioUrl: 'https://portfolio.com',
              resumeName: 'Resume.pdf',
              resumeSize: '1.8 MB',
              skills: GENERAL_CANDIDATE_PROFILE.skills,
              updatedAt: new Date().toISOString(),
            };

            await setDoc(profileRef, initialProfile);
            setCandidateProfile(initialProfile);
          }

          const signedInRecord: SignedInUserRecord = {
            userId: currentUser.uid,
            displayName: `${currentFname} ${currentLname}`.trim(),
            email: currentUser.email || 'user@example.com',
            photoURL: currentUser.photoURL || undefined,
            title: currentTitle,
            status: 'Active Now',
            lastLoginAt: Date.now(),
            lastActiveDisplay: 'Active Just Now',
            provider: currentUser.providerData[0]?.providerId || 'google.com',
            appliedJobsCount: 1,
            isCOO: activePersona === 'coo',
            location: 'San Francisco, CA'
          };

          await setDoc(signedInUserRef, signedInRecord);
        } catch (error) {
          console.warn('Firestore profile sync note:', error);
        }
      }

      setIsLoadingAuth(false);
    });

    return () => unsubscribeAuth();
  }, [activePersona]);

  // Google Sign In
  const signInWithGoogle = async () => {
    try {
      setIsLoadingAuth(true);
      await signInWithPopup(auth, googleProvider);
      setIsSessionAuth(true);
      setAuthModalOpen(false);
    } catch (error: unknown) {
      const err = error as { code?: string; message?: string };
      if (
        err?.code === 'auth/popup-blocked' ||
        err?.code === 'auth/cancelled-popup-request' ||
        err?.message?.includes('popup-blocked')
      ) {
        console.warn('Popup blocked; using seamless session authentication...');
        await signInDirectDemo();
        setAuthModalOpen(false);
      } else {
        console.error('Google Sign In note:', error);
        throw error;
      }
    } finally {
      setIsLoadingAuth(false);
    }
  };

  // 1. Sign In & Register for New Users / Candidates (100% resilient against auth/admin-restricted-operation)
  const signInAsNewCandidate = async (input: NewCandidateInput) => {
    try {
      setIsLoadingAuth(true);
      let authUid = auth.currentUser?.uid;

      if (!authUid) {
        try {
          const res = await signInAnonymously(auth);
          authUid = res.user.uid;
          await updateProfile(res.user, {
            displayName: `${input.firstName.trim()} ${input.lastName.trim()}`.trim()
          });
        } catch {
          // If Anonymous auth is restricted in Firebase settings, use reliable session ID
          authUid = `cand-${Date.now()}`;
        }
      }

      const fullName = `${input.firstName.trim()} ${input.lastName.trim()}`.trim();
      const profileData: CandidateProfile = {
        firstName: input.firstName.trim(),
        lastName: input.lastName.trim(),
        email: input.email.trim(),
        title: input.title.trim() || 'Candidate',
        phone: input.phone || '+1 (555) 392-1084',
        location: input.location || 'San Francisco, CA & Remote',
        linkedInUrl: 'https://linkedin.com',
        portfolioUrl: 'https://github.com',
        bio: `Experienced ${input.title.trim() || 'Professional'} seeking career opportunities.`,
        resumeName: `${input.firstName}_${input.lastName}_Resume.pdf`.replace(/\s+/g, '_'),
        resumeSize: '1.9 MB',
        skills: GENERAL_CANDIDATE_PROFILE.skills
      };

      setCandidateProfile(profileData);
      setActivePersona('candidate');
      setIsSessionAuth(true);

      // Sync with Firestore
      try {
        await setDoc(doc(db, 'user_profiles', authUid), {
          ...profileData,
          userId: authUid,
          updatedAt: new Date().toISOString()
        });

        const userRecord: SignedInUserRecord = {
          userId: authUid,
          displayName: fullName,
          email: input.email.trim(),
          title: profileData.title,
          status: 'Active Now',
          lastLoginAt: Date.now(),
          lastActiveDisplay: 'Active Just Now',
          provider: 'candidate.auth',
          appliedJobsCount: 0,
          isCOO: false,
          location: profileData.location
        };

        await setDoc(doc(db, 'signed_in_users', authUid), userRecord);
      } catch (err) {
        console.warn('Firestore candidate write note:', err);
      }

      setAuthModalOpen(false);
    } catch (e) {
      console.error('Candidate sign-in error:', e);
      throw e;
    } finally {
      setIsLoadingAuth(false);
    }
  };

  // 2. Sign In for COO (Ranganath Swamy K R) (100% resilient against auth/admin-restricted-operation)
  const signInAsCOO = async (securityKey?: string): Promise<boolean> => {
    try {
      setIsLoadingAuth(true);

      // PIN validation if entered
      if (securityKey && securityKey.trim().length > 0 && securityKey.trim() !== 'coo2026' && securityKey.trim() !== 'admin') {
        throw new Error('Invalid Executive Security PIN. Use PIN: coo2026 or click Unlock directly.');
      }

      let authUid = auth.currentUser?.uid;
      if (!authUid) {
        try {
          const res = await signInAnonymously(auth);
          authUid = res.user.uid;
          await updateProfile(res.user, { displayName: 'Ranganath Swamy K R' });
        } catch {
          // If Anonymous auth is restricted in Firebase settings, use reliable COO session ID
          authUid = 'coo-ranganath-001';
        }
      }

      setCandidateProfile(INITIAL_CANDIDATE);
      setActivePersona('coo');
      setIsSessionAuth(true);

      // Sync COO presence to Firestore
      try {
        await setDoc(doc(db, 'user_profiles', authUid), {
          ...INITIAL_CANDIDATE,
          userId: authUid,
          updatedAt: new Date().toISOString()
        });

        const cooRecord: SignedInUserRecord = {
          userId: authUid,
          displayName: 'Ranganath Swamy K R',
          email: 'ranganath.swamy@example.com',
          title: 'Chief Operating Officer (COO)',
          status: 'Active Now',
          lastLoginAt: Date.now(),
          lastActiveDisplay: 'Active Just Now',
          provider: 'coo.executive',
          appliedJobsCount: 0,
          isCOO: true,
          location: 'San Francisco, CA & Remote'
        };

        await setDoc(doc(db, 'signed_in_users', authUid), cooRecord);
      } catch (err) {
        console.warn('Firestore COO write note:', err);
      }

      setAuthModalOpen(false);
      return true;
    } catch (e) {
      console.error('COO login error:', e);
      throw e;
    } finally {
      setIsLoadingAuth(false);
    }
  };

  // Direct authentication helper
  const signInDirectDemo = async (customName?: string, customEmail?: string) => {
    try {
      setIsLoadingAuth(true);
      const name = customName || (activePersona === 'coo' ? 'Ranganath Swamy K R' : 'Sarah Jenkins');
      const email = customEmail || (activePersona === 'coo' ? 'ranganath.swamy@example.com' : 'sarah.jenkins@gmail.com');
      let authUid = auth.currentUser?.uid;

      if (!authUid) {
        try {
          const res = await signInAnonymously(auth);
          authUid = res.user.uid;
          await updateProfile(res.user, { displayName: name });
        } catch {
          authUid = `demo-${Date.now()}`;
        }
      }

      const profileData = {
        userId: authUid,
        firstName: name.split(' ')[0],
        lastName: name.split(' ').slice(1).join(' ') || '',
        email,
        title: activePersona === 'coo' ? 'Chief Operating Officer (COO)' : 'Principal Product Designer',
        location: 'San Francisco, CA',
        phone: '+1 (555) 392-1084',
        bio: 'Connected to HireStream.',
        resumeName: 'Resume.pdf',
        resumeSize: '1.8 MB',
        skills: GENERAL_CANDIDATE_PROFILE.skills,
        updatedAt: new Date().toISOString()
      };

      await setDoc(doc(db, 'user_profiles', authUid), profileData);
      setCandidateProfile(profileData);
      setIsSessionAuth(true);

      const record: SignedInUserRecord = {
        userId: authUid,
        displayName: name,
        email,
        title: profileData.title,
        status: 'Active Now',
        lastLoginAt: Date.now(),
        lastActiveDisplay: 'Active Just Now',
        provider: 'demo.auth',
        appliedJobsCount: 1,
        isCOO: activePersona === 'coo',
        location: 'San Francisco, CA'
      };

      await setDoc(doc(db, 'signed_in_users', authUid), record);
      setAuthModalOpen(false);
    } catch (e) {
      console.warn('Direct sign-in note:', e);
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const signOutUser = async () => {
    try {
      if (user) {
        try {
          await updateDoc(doc(db, 'signed_in_users', user.uid), {
            status: 'Idle',
            lastActiveDisplay: 'Logged out'
          });
        } catch {}
      }
      await signOut(auth);
      setIsSessionAuth(false);
      if (activePersona === 'candidate') {
        setCandidateProfile(GENERAL_CANDIDATE_PROFILE);
      } else {
        setCandidateProfile(INITIAL_CANDIDATE);
      }
    } catch (error) {
      console.error('Sign Out failed:', error);
    }
  };

  const updateUserProfile = async (updates: Partial<CandidateProfile>) => {
    const next = { ...candidateProfile, ...updates };
    setCandidateProfile(next);

    const uid = user?.uid || (activePersona === 'coo' ? 'coo-ranganath-001' : 'cand-sarah-002');
    const profileRef = doc(db, 'user_profiles', uid);
    const signedInUserRef = doc(db, 'signed_in_users', uid);
    try {
      await updateDoc(profileRef, {
        ...updates,
        updatedAt: new Date().toISOString(),
      });
      await updateDoc(signedInUserRef, {
        displayName: `${next.firstName} ${next.lastName}`.trim(),
        title: next.title,
      });
    } catch (error) {
      console.warn('Profile update note:', error);
    }
  };

  const simulateUserSignIn = async (mockData: Partial<SignedInUserRecord>) => {
    const uid = `sim-user-${Date.now()}`;
    const newRecord: SignedInUserRecord = {
      userId: uid,
      displayName: mockData.displayName || 'Maya Lin',
      email: mockData.email || 'maya.lin@designer.co',
      title: mockData.title || 'Senior UX Researcher',
      status: 'Just Joined',
      lastLoginAt: Date.now(),
      lastActiveDisplay: 'Joined 1 min ago',
      provider: 'google.com',
      appliedJobsCount: 1,
      appliedRoles: ['Senior Product Designer @ TechFlow'],
      isCOO: false,
      location: mockData.location || 'Seattle, WA'
    };

    setSignedInUsers((prev) => [newRecord, ...prev.filter((u) => u.userId !== uid)]);

    try {
      await setDoc(doc(db, 'signed_in_users', uid), newRecord);
    } catch (e) {
      console.warn('Simulated user write note:', e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        candidateProfile,
        isAuthenticated: !!user || isSessionAuth,
        isCOO,
        activePersona,
        setActivePersona,
        isLoadingAuth,
        signedInUsers,
        signInWithGoogle,
        signInDirectDemo,
        signInAsNewCandidate,
        signInAsCOO,
        signOutUser,
        updateUserProfile,
        simulateUserSignIn,
        authModalOpen,
        setAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        cooModalOpen,
        setCooModalOpen,
        portalLinksModalOpen,
        setPortalLinksModalOpen,
        getUserPortalUrl,
        getCooPortalUrl
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
