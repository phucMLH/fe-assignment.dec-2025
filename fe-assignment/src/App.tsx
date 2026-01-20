import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "./index.css";
import MainLayout from "./components/layouts/MainLayout";
import MessagePage from "./features/message/MessagePage";
import DiscussionPage from "./features/discussion/DiscussionPage";
import AttachmentPage from "./features/attachment/AttachmentPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-neutral-300">
        {/* Navigation Tabs */}
        <div className="flex gap-2 border-b border-neutral-300 bg-white px-6 py-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `rounded-t px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-primary-600 text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`
            }
          >
            Exercise 1: Message
          </NavLink>
          <NavLink
            to="/discussion"
            className={({ isActive }) =>
              `rounded-t px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-primary-600 text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`
            }
          >
            Exercise 2: Discussion
          </NavLink>
          <NavLink
            to="/attachment"
            className={({ isActive }) =>
              `rounded-t px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-primary-600 text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`
            }
          >
            Exercise 3: Attachment
          </NavLink>
        </div>

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <MessagePage />
              </MainLayout>
            }
          />
          <Route path="/discussion" element={<DiscussionPage />} />
          <Route path="/attachment" element={<AttachmentPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;