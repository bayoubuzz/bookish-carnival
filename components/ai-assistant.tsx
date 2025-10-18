
'use client'

import { useState, useRef, useEffect } from 'react'
import { Bot, MessageCircle, X, ArrowRight, ExternalLink, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface Message {
  id: string
  type: 'bot' | 'user'
  content: string
  options?: { label: string; value: string }[]
  timestamp: Date
}

interface ConversationState {
  step: string
  path: string[]
  userData: Record<string, any>
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [conversationState, setConversationState] = useState<ConversationState>({
    step: 'welcome',
    path: [],
    userData: {}
  })
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(scrollToBottom, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage(
        "Hi, I'm Steve's AI assistant. I'm here to help you discover how Steve can use AI and video to solve your business, legal, or creative challenges. What brings you here today?",
        [
          { label: "I want to use AI in my business", value: "ai_business" },
          { label: "I'm an attorney/law firm interested in AI", value: "legal_ai" },
          { label: "I need help with a video project", value: "video_project" },
          { label: "I want to see Steve's portfolio", value: "portfolio" },
          { label: "I'm not sure—show me what's possible", value: "explore" }
        ]
      )
    }
  }, [isOpen])

  const addBotMessage = (content: string, options?: { label: string; value: string }[]) => {
    setIsTyping(true)
    setTimeout(() => {
      const message: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content,
        options,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, message])
      setIsTyping(false)
    }, 1000)
  }

  const addUserMessage = (content: string) => {
    const message: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, message])
  }

  const handleOptionClick = (option: { label: string; value: string }) => {
    addUserMessage(option.label)
    processUserResponse(option.value)
  }

  const processUserResponse = (value: string) => {
    switch (conversationState.step) {
      case 'welcome':
        handleWelcomeResponse(value)
        break
      case 'ai_business':
        handleAIBusinessResponse(value)
        break
      case 'legal_ai':
        handleLegalAIResponse(value)
        break
      case 'video_project':
        handleVideoProjectResponse(value)
        break
      case 'portfolio':
        handlePortfolioResponse(value)
        break
      case 'explore':
        handleExploreResponse(value)
        break
      default:
        handleGeneralResponse(value)
    }
  }

  const handleWelcomeResponse = (value: string) => {
    setConversationState(prev => ({ ...prev, step: value, path: [value] }))

    switch (value) {
      case 'ai_business':
        addBotMessage(
          "Great! AI can transform business operations in many ways. What's your main goal?",
          [
            { label: "Automate repetitive tasks", value: "automate" },
            { label: "Improve customer communication", value: "communication" },
            { label: "Create content more efficiently", value: "content" },
            { label: "Analyze data and insights", value: "analytics" },
            { label: "Other specific challenge", value: "other" }
          ]
        )
        break
      case 'legal_ai':
        addBotMessage(
          "Excellent! Steve specializes in AI solutions for legal professionals. Which area interests you most?",
          [
            { label: "Legal research and case analysis", value: "research" },
            { label: "Document automation and drafting", value: "documents" },
            { label: "Client intake and communication", value: "intake" },
            { label: "Workflow optimization", value: "workflow" },
            { label: "Compliance and risk management", value: "compliance" }
          ]
        )
        break
      case 'video_project':
        addBotMessage(
          "Perfect! Steve creates professional videos that deliver results. What type of video do you need?",
          [
            { label: "Explainer or educational video", value: "explainer" },
            { label: "Marketing or promotional content", value: "marketing" },
            { label: "Case study or testimonial", value: "testimonial" },
            { label: "Training or instructional video", value: "training" },
            { label: "Other video project", value: "other_video" }
          ]
        )
        break
      case 'portfolio':
        showPortfolio()
        break
      case 'explore':
        addBotMessage(
          "Let me show you the possibilities! Steve's expertise spans multiple areas. Which sounds most relevant to you?",
          [
            { label: "Business automation with AI", value: "ai_business" },
            { label: "Legal technology solutions", value: "legal_ai" },
            { label: "Professional video content", value: "video_project" },
            { label: "Innovation and strategy consulting", value: "strategy" }
          ]
        )
        break
    }
  }

  const handleAIBusinessResponse = (value: string) => {
    const responses = {
      automate: "Task automation can save hours daily! Steve can help implement AI solutions for document processing, data entry, scheduling, and more.",
      communication: "AI-powered communication tools can enhance customer service, automate responses, and provide 24/7 support capabilities.",
      content: "Content creation AI can help generate blogs, social media posts, marketing copy, and more while maintaining your brand voice.",
      analytics: "AI analytics can uncover insights from your data, predict trends, and help make data-driven decisions.",
      other: "Steve loves solving unique challenges! Every business has specific needs that can benefit from custom AI solutions."
    }
    
    addBotMessage(responses[value as keyof typeof responses] || responses.other)
    setTimeout(() => offerConsultation(), 2000)
  }

  const handleLegalAIResponse = (value: string) => {
    const responses = {
      research: "AI can revolutionize legal research by quickly analyzing case law, finding relevant precedents, and summarizing complex documents.",
      documents: "Document automation saves time on contracts, pleadings, and routine paperwork while ensuring consistency and accuracy.",
      intake: "AI-powered intake systems can qualify leads, schedule consultations, and gather preliminary case information efficiently.",
      workflow: "Workflow optimization through AI can streamline case management, deadline tracking, and resource allocation.",
      compliance: "AI compliance tools help monitor regulatory changes, assess risks, and ensure adherence to legal requirements."
    }
    
    addBotMessage(responses[value as keyof typeof responses] || "AI can transform many aspects of legal practice.")
    setTimeout(() => offerConsultation(), 2000)
  }

  const handleVideoProjectResponse = (value: string) => {
    const responses = {
      explainer: "Explainer videos are perfect for simplifying complex concepts. Steve creates engaging videos that make difficult topics easy to understand.",
      marketing: "Marketing videos that convert! Steve combines storytelling with strategic messaging to create compelling promotional content.",
      testimonial: "AI-Assisted videos and testimonials build trust and credibility. Steve knows how to capture authentic stories that resonate.",
      training: "Training videos that actually teach! Steve creates instructional content that's engaging and effective for learning.",
      other_video: "Every video project is unique. Steve brings creativity and technical expertise to bring your vision to life."
    }
    
    addBotMessage(responses[value as keyof typeof responses] || responses.other_video)
    setTimeout(() => offerConsultation(), 2000)
  }

  const showPortfolio = () => {
    setConversationState(prev => ({ ...prev, step: 'portfolio' }))
    addBotMessage(
      "Here are some of Steve's featured projects. Click any project to view it:",
      [
        { label: "🎬 Germany 1930s: Roads Chosen (Documentary)", value: "germany_doc" },
        { label: "🎵 Music's Last Right: AI-Composed Requiem", value: "music_ai" },
        { label: "⚖️ How AI is Transforming Legal Practice", value: "legal_transform" },
        { label: "🚀 2025: AI Spaced-out Idiocy", value: "ai_2025" },
        { label: "📺 Media Going AI and How", value: "media_ai" },
        { label: "View all projects in portfolio section", value: "full_portfolio" }
      ]
    )
  }

  const handlePortfolioResponse = (value: string) => {
    const projects = {
      germany_doc: "https://youtube.com/watch?v=example1",
      music_ai: "https://youtube.com/watch?v=example2",
      legal_transform: "https://youtube.com/watch?v=example3",
      ai_2025: "https://youtube.com/watch?v=example4",
      media_ai: "https://youtube.com/watch?v=example5",
      full_portfolio: "#portfolio"
    }
    
    if (value === 'full_portfolio') {
      addBotMessage("Great! Let me scroll you to the full portfolio section.")
      setTimeout(() => {
        document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })
      }, 1000)
    } else {
      addBotMessage("Opening project in new tab...")
      window.open(projects[value as keyof typeof projects], '_blank')
    }
    
    setTimeout(() => offerConsultation(), 2000)
  }

  const handleExploreResponse = (value: string) => {
    // Redirect to appropriate path
    handleWelcomeResponse(value)
  }

  const handleGeneralResponse = (value: string) => {
    offerConsultation()
  }

  const offerConsultation = () => {
    addBotMessage(
      "Would you like to schedule a free consultation to discuss your specific needs? Steve can provide personalized recommendations for your situation.",
      [
        { label: "Yes, book a consultation", value: "book_consultation" },
        { label: "Tell me more about pricing", value: "pricing" },
        { label: "I have more questions", value: "more_questions" },
        { label: "Show me the portfolio", value: "portfolio" }
      ]
    )
  }

  const resetConversation = () => {
    setMessages([])
    setConversationState({ step: 'welcome', path: [], userData: {} })
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-glow"
          data-ai-assistant="true"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-lg shadow-2xl border border-gray-200 z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">Steve's AI Assistant</p>
                <p className="text-xs text-blue-100">Online now</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetConversation}
              className="text-white hover:bg-white/20 p-1"
              title="Start new conversation"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  
                  {message.options && (
                    <div className="mt-3 space-y-2">
                      {message.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleOptionClick(option)}
                          className="block w-full text-left p-2 bg-white text-gray-800 rounded border hover:bg-gray-50 transition-colors text-xs"
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-t bg-gray-50 rounded-b-lg">
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex-1 text-xs"
              >
                <Calendar className="h-3 w-3 mr-1" />
                Book Now
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex-1 text-xs"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Portfolio
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
