import { useState } from "react"
import { Button } from "../components/ui/button"
import { Send, RefreshCw } from "lucide-react"

export default function TestPage() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim() || loading) return
    const userMsg = { role: "user", content: input }
    setMessages(prev => [...prev, userMsg])
    setInput("")
    setLoading(true)

    try {
      // 假设我们有一个默认可以用来测试的内部 key 或使用预设模型
      const res = await fetch("/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer admin" },
        body: JSON.stringify({
          model: "qwen3.6-plus",
          messages: [...messages, userMsg],
          stream: false
        })
      })
      
      const data = await res.json()
      if (data.choices && data.choices[0]) {
        setMessages(prev => [...prev, data.choices[0].message])
      } else {
        setMessages(prev => [...prev, { role: "assistant", content: `❌ 请求失败: ${JSON.stringify(data)}` }])
      }
    } catch (err: any) {
      setMessages(prev => [...prev, { role: "assistant", content: `❌ 网络错误: ${err.message}` }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">接口测试</h2>
          <p className="text-muted-foreground">在此测试您的 API 分发是否正常工作。</p>
        </div>
        <Button variant="outline" onClick={() => setMessages([])}>
          <RefreshCw className="mr-2 h-4 w-4" /> 清空对话
        </Button>
      </div>

      <div className="flex-1 rounded-xl border bg-card overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col">
          {messages.length === 0 && (
            <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
              发送一条消息以开始测试，系统将通过 /v1/chat/completions 进行调用。
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm shadow-sm ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted/50 border text-card-foreground"}`}>
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-xl px-4 py-2.5 text-sm shadow-sm bg-muted/50 border text-card-foreground">
                <span className="animate-pulse">思考中...</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t bg-card/50 flex gap-3 items-center">
          <input 
            type="text" 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            onKeyDown={e => e.key === "Enter" && handleSend()}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" 
            placeholder="输入测试消息..." 
            disabled={loading}
          />
          <Button onClick={handleSend} disabled={loading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
