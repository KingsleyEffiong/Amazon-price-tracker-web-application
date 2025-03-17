import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { PostProvider } from "./components/PostProvider";
import backgroundImage from "./assets/images/black-concrete-wall.jpg";
import UI from "./components/UI";
import Notification from "./components/Notification";
import Setting from "./components/Setting";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <PostProvider>
      <div
        className="w-full h-screen flex flex-col items-center justify-center shadow-lg shadow-gray-800"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<UI />} />
              <Route path="/dashboard" element={<UI />} />
              <Route path="notification" element={<Notification />} />
              <Route path="setting" element={<Setting />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </PostProvider>
  );
}

export default App;
