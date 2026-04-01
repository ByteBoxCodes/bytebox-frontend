import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/layout/Header";
import { cleanupExpiredStorage } from "./utils/storageCleanup";

function App() {
  // Clean up expired localStorage entries on app start
  useEffect(() => {
    cleanupExpiredStorage();
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-(--bg-primary)">
      <Header />
      <main className="flex-1 min-h-0 overflow-y-auto relative scroll-smooth">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
