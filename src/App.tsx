import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { JobProvider, useJobContext } from './context/JobContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FindJobsScreen } from './components/FindJobsScreen';
import { JobDetailScreen } from './components/JobDetailScreen';
import { ApplicationFlowScreen } from './components/ApplicationFlowScreen';
import { ApplicationSuccessScreen } from './components/ApplicationSuccessScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { CompaniesScreen } from './components/CompaniesScreen';
import { CompanyDetailScreen } from './components/CompanyDetailScreen';
import { ApplicationDetailModal } from './components/ApplicationDetailModal';
import { PostJobModal } from './components/PostJobModal';
import { ToastContainer } from './components/ToastContainer';
import { AuthModal } from './components/AuthModal';
import { CooConsoleModal } from './components/CooConsoleModal';
import { PortalLinksModal } from './components/PortalLinksModal';

const MainApp: React.FC = () => {
  const { currentScreen } = useJobContext();

  const isApplyScreen = currentScreen === 'apply';
  const isSuccessScreen = currentScreen === 'apply-success';

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#0b1c30]">
      {/* Top Navigation Bar (Except on specialized split application canvas) */}
      {!isApplyScreen && <Header />}

      {/* Main Screen Content with top spacing when header is fixed */}
      <div className={`flex-grow flex flex-col ${!isApplyScreen ? 'pt-20' : ''}`}>
        {currentScreen === 'find-jobs' && <FindJobsScreen />}
        {currentScreen === 'job-detail' && <JobDetailScreen />}
        {currentScreen === 'apply' && <ApplicationFlowScreen />}
        {currentScreen === 'apply-success' && <ApplicationSuccessScreen />}
        {currentScreen === 'dashboard' && <DashboardScreen />}
        {currentScreen === 'companies' && <CompaniesScreen />}
        {currentScreen === 'company-detail' && <CompanyDetailScreen />}
      </div>

      {/* Footer (Rendered on standard discovery and browsing screens) */}
      {!isApplyScreen && !isSuccessScreen && <Footer />}

      {/* Modals & Overlays */}
      <ApplicationDetailModal />
      <PostJobModal />
      <AuthModal />
      <CooConsoleModal />
      <PortalLinksModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <JobProvider>
        <MainApp />
      </JobProvider>
    </AuthProvider>
  );
}
