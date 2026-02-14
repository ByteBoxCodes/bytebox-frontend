
import { Outlet } from "react-router-dom"
import Header from "./components/layout/Header"
import { ThemeProvider } from "./context/ThemeContext"

function App() {
  return (
    <ThemeProvider>
      <div className="flex flex-col h-screen overflow-hidden bg-(--bg-primary)">
        <Header />
        <main className="flex-1 min-h-0 overflow-y-auto relative scroll-smooth">
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
