// Maps browser URLs to pages and shares the header and footer across the app.
import { Routes, Route, Navigate } from 'react-router-dom';

import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

import Signup from './pages/Signup';
import Login from './pages/Login';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Questionnaire from './pages/Questionnaire';
import Challenges from './pages/Challenges';
import Leaderboard from './pages/Leaderboard';
import Inbox from './pages/Inbox';
import MemberLayout from './components/MemberLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './pages/main/header';
import Footer from './pages/main/footer';

function App() {
  return (
    <div className="site-layout">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <div id="main-content" className="site-content" tabIndex={-1}>
    {/* These routes can be opened without an existing login. */}
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/reset" element={<Navigate to="/forgot-password" replace />} />

      {/* All five member views require a valid session. */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MemberLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/inbox" element={<Inbox />} />
        </Route>
      </Route>
    </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
