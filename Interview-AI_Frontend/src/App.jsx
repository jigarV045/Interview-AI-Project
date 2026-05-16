import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./features/authentication/pages/Login";
import Register from "./features/authentication/pages/Register";
import { AuthProvider } from "./features/authentication/services/auth.context";
import { InterviewProvider } from "./features/interview/services/interview.context";
import Home from "./features/interview/pages/Home";
import Protected from "./features/authentication/components/Protected";
import Interview from "./features/interview/pages/Interview";
import Landing from "./pages/Landing";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <InterviewProvider>
          <Routes>
            <Route path="/landing" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Protected><Home /></Protected>} />
            <Route path="/interview/:interviewId" element={<Protected><Interview /></Protected>} />
          </Routes>
        </InterviewProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
