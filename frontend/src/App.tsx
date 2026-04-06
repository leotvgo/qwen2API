import { BrowserRouter, Routes, Route } from "react-router-dom"
import AdminLayout from "./layouts/AdminLayout"
import Dashboard from "./pages/Dashboard"
import AccountsPage from "./pages/AccountsPage"
import TestPage from "./pages/TestPage"
import { Button } from "./components/ui/button"

function Placeholder({ title }: { title: string }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <div className="rounded-xl border border-border bg-card text-card-foreground shadow p-12 text-center text-muted-foreground flex flex-col items-center justify-center">
        {title} 模块开发中...
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="accounts" element={<AccountsPage />} />
          <Route path="tokens" element={<Placeholder title="API Key 分发" />} />
          <Route path="test" element={<TestPage />} />
          <Route path="settings" element={<Placeholder title="系统设置" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
