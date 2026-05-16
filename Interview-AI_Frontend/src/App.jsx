import { BrowserRouter, Routes, Route } from "react-router";
import Landing from "../src/features/authentication/pages/Landing";
import Login from "./features/authentication/pages/Login";
import Register from "./features/authentication/pages/Register";
import { AuthProvider } from "./features/authentication/services/auth.context";
import { InterviewProvider } from "./features/interview/services/interview.context";
import Home from "./features/interview/pages/Home";
import Protected from "./features/authentication/components/Protected";
import Interview from "./features/interview/pages/Interview";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <InterviewProvider>
          <Routes>
            {/* 1. Public Landing Page */}
            <Route path="/" element={<Landing />} />

            {/* 2. Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* 3. Protected Dashboard Routes */}
            <Route 
              path="/dashboard" 
              element={
                <Protected>
                  <Home />
                </Protected>
              } 
            />
            <Route 
              path="/interview/:interviewId" 
              element={
                <Protected>
                  <Interview />
                </Protected>
              } 
            />
          </Routes>
        </InterviewProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;