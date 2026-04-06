import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Trash2, Plus, RefreshCw } from "lucide-react"

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<any[]>([])
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const fetchAccounts = () => {
    fetch("/api/admin/accounts", { headers: { Authorization: "Bearer admin" } })
      .then(res => res.json())
      .then(data => setAccounts(data.accounts || []))
  }

  useEffect(() => {
    fetchAccounts()
  }, [])

  const handleAdd = () => {
    if (!email || !password) return
    fetch("/api/admin/accounts", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer admin" },
      body: JSON.stringify({ email, password })
    }).then(() => {
      setEmail("")
      setPassword("")
      fetchAccounts()
    })
  }

  const handleDelete = (emailToDelete: string) => {
    fetch(`/api/admin/accounts/${encodeURIComponent(emailToDelete)}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer admin" }
    }).then(() => fetchAccounts())
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">账号管理</h2>
          <p className="text-muted-foreground">管理通义千问上游账号池。</p>
        </div>
        <Button variant="outline" onClick={fetchAccounts}>
          <RefreshCw className="mr-2 h-4 w-4" /> 刷新状态
        </Button>
      </div>

      <div className="flex gap-4 items-end bg-card p-4 rounded-xl border">
        <div className="flex-1">
          <label className="text-sm font-medium mb-1 block">账号邮箱/手机号</label>
          <input 
            type="text" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
            placeholder="例如: test@example.com" 
          />
        </div>
        <div className="flex-1">
          <label className="text-sm font-medium mb-1 block">密码</label>
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
            placeholder="密码" 
          />
        </div>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" /> 添加账号
        </Button>
      </div>

      <div className="rounded-xl border bg-card overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/50 border-b text-muted-foreground">
            <tr>
              <th className="h-12 px-4 align-middle font-medium">账号</th>
              <th className="h-12 px-4 align-middle font-medium">状态</th>
              <th className="h-12 px-4 align-middle font-medium">正在处理</th>
              <th className="h-12 px-4 align-middle font-medium text-right">操作</th>
            </tr>
          </thead>
          <tbody>
            {accounts.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-muted-foreground">暂无账号数据</td>
              </tr>
            )}
            {accounts.map(acc => (
              <tr key={acc.email} className="border-b transition-colors hover:bg-muted/50">
                <td className="p-4 align-middle font-medium">{acc.email}</td>
                <td className="p-4 align-middle">
                  {acc.valid ? (
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
                      有效
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-red-100 text-red-800">
                      失效/待激活
                    </span>
                  )}
                </td>
                <td className="p-4 align-middle">{acc.inflight}</td>
                <td className="p-4 align-middle text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(acc.email)} className="text-destructive hover:bg-destructive/10 hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
