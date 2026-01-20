import "./index.css";
import Header from "./components/layouts/Header";
import InboxPage from "./pages/InboxPage";

function App() {
  return (
    <div className="flex h-screen flex-col bg-neutral-50 font-sans">
      <Header />
      <InboxPage />
    </div>
  );
}
export default App;