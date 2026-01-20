import "./index.css";
import MainLayout from "./components/layouts/MainLayout";
import MessagePage from "./features/message/MessagePage";

function App() {
  return (
    <MainLayout>
      <MessagePage />
    </MainLayout>
  );
}
export default App;