import { Outlet } from "react-router-dom"
import Header from "./components/layout/Header"

function App() {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-(--bg-primary)">
      <Header />
      <main className="flex-1 min-h-0 overflow-y-auto relative scroll-smooth">
        <Outlet />
      </main>
    </div>
  )
}

export default App
