'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { MessageCircle, X, Send, Loader2, Bot, Trash2 } from 'lucide-react'
import { useChat, ChatMessage } from '@/hooks/use-chat'
import { cn } from '@/lib/utils'

export default function FloatingAIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [inputMessage, setInputMessage] = useState('')
  const { messages, isLoading, error, sendMessage, clearChat } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim() || isLoading) return

    const message = inputMessage.trim()
    setInputMessage('')
    await sendMessage(message)
  }

  const formatMessage = (content: string) => {
    // Simple markdown-like formatting for bot messages
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>')
  }

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <div className="relative">
            {/* Animated pulse rings */}
            <div className="absolute inset-0 rounded-full bg-blue-500 opacity-30 animate-ping"></div>
            <div className="absolute inset-0 rounded-full bg-cyan-500 opacity-20 animate-pulse animation-delay-1000"></div>

            {/* Main button */}
            <Button
              onClick={() => setIsOpen(true)}
              className="relative h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all duration-300 group animate-bounce hover:animate-none"
              size="lg"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300"></div>

              {/* Icon with rotation animation */}
              <MessageCircle className="relative h-6 w-6 text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
              <span className="sr-only">Open AI Assistant</span>

              {/* Active indicator dot */}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse">
                <div className="w-full h-full bg-green-400 rounded-full animate-ping"></div>
              </div>
            </Button>
          </div>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] animate-in slide-in-from-bottom-4 slide-in-from-right-4 duration-300">
          <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-t-lg relative overflow-hidden">
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 animate-gradient-x"></div>

              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Bot className="h-5 w-5 animate-pulse" />
                    {/* Active status indicator */}
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                  </div>
                  <div>
                    <CardTitle className="text-lg">ScamVerse AI Assistant</CardTitle>
                    <div className="flex items-center space-x-1 text-xs opacity-80">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span>Online</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearChat}
                    className="text-white hover:bg-white/20 h-8 w-8 p-0"
                    title="Clear chat"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20 h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              {/* Messages Area */}
              <ScrollArea className="h-80 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        'flex',
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      <div
                        className={cn(
                          'max-w-[80%] rounded-lg px-3 py-2 text-sm',
                          message.role === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                        )}
                      >
                        {message.role === 'assistant' ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: formatMessage(message.content),
                            }}
                          />
                        ) : (
                          message.content
                        )}
                        {message.requiresUrlAnalysis && (
                          <div className="mt-2">
                            <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                              Analysis in progress...
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Loading indicator with typing animation */}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 text-sm animate-pulse">
                        <div className="flex items-center space-x-2">
                          <Bot className="h-4 w-4 animate-spin" />
                          <span>AI is thinking</span>
                          <div className="flex space-x-1">
                            <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"></div>
                            <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce animation-delay-200"></div>
                            <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce animation-delay-400"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Error indicator */}
                  {error && (
                    <div className="flex justify-start">
                      <div className="bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 rounded-lg px-3 py-2 text-sm">
                        Error: {error}
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>

              {/* Input Area */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <Input
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask about scams, paste a URL to check, or chat..."
                    className="flex-1 text-sm"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    size="sm"
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Powered by AI • Always verify important security decisions
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
