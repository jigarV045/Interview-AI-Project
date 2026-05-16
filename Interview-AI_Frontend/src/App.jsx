import { BrowserRouter, Routes, Route } from "react-router";
import Landing from "../src/features/authentication/pages/Landing";
import Login from "./features/authentication/pages/Login";
import Register from "./features/authentication/pages/Register";
import { AuthProvider } from "./features/authentication/services/auth.context";
import { InterviewProvider } from "./features/interview/services/interview.context";
import Home from "./features/interview/pages/Home";
import Protected from "./features/authentication/components/Protected";
import Interview from "./features/interview/pages/Interview";
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <InterviewProvider>
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              style: {
                width: "300px",
                background: "#161925",         
                color: "#f3f4f6",              
                border: "1px solid #1f2937",   
                borderRadius: "12px",
                padding: "12px 16px",
                fontWeight: "600",
                fontSize: "14px",
              },
              success: {
                iconTheme: {
                  primary: "#6366f1",          
                  secondary: "#161925",        
                },
              },
              error: {
                iconTheme: {
                  primary: "#ef4444",          
                  secondary: "#161925",        
                },
              },
            }}
          />
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