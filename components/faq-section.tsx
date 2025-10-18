
'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0)

  const faqs = [
    {
      question: "What exactly does Steve do as an AI and video consultant?",
      answer: "Steve helps businesses, law firms, and individuals implement AI solutions and create professional video content. This includes AI workflow automation, document processing, video production, digital strategy consulting, and training. Important: Steve does not provide legal advice but focuses on technology solutions and content creation."
    },
    {
      question: "How can AI help my law firm or legal practice?",
      answer: "AI can revolutionize legal work through automated research, document analysis, contract review, client intake systems, and case management. Steve specializes in implementing AI tools that save time, reduce errors, and improve efficiency while maintaining the highest professional standards."
    },
    {
      question: "What types of video projects does Steve create?",
      answer: "He can help you create AI-related music videos, full length movies, AI-video conferencing solutions and more. Each project is tailored to your specific goals and audience needs."
    },
    {
      question: "How much do Steve's consulting services cost?",
      answer: "Project costs vary based on scope, complexity, and timeline. Steve offers flexible pricing options including project-based fees, hourly consultation rates, and ongoing support packages. A free initial consultation helps determine the best approach for your budget and needs."
    },
    {
      question: "How long does a typical project take?",
      answer: "Project timelines depend on complexity and scope. Simple AI implementations or short videos may take 1-2 weeks, while comprehensive solutions or documentary projects can take several months. Steve provides detailed timelines during the planning phase."
    },
    {
      question: "Do I need technical expertise to work with AI solutions?",
      answer: "Not at all! Steve specializes in making AI accessible to non-technical users. He provides comprehensive training, clear documentation, and ongoing support to ensure you can confidently use any implemented solutions."
    },
    {
      question: "Can Steve help with existing AI tools or only new implementations?",
      answer: "Steve can help with both! Whether you want to implement new AI solutions, optimize existing tools, integrate different systems, or train your team on current technologies, he provides expert guidance for all scenarios."
    },
    {
      question: "What makes Steve's approach different from other consultants?",
      answer: "Steve combines deep technical expertise with practical business and legal understanding and creative storytelling skills. His unique background in AI, video production, and business strategy ensures solutions that are both innovative and practical for real-world implementation."
    },
    {
      question: "How do I get started with a project?",
      answer: "Simply book a free consultation through the contact form or AI assistant. Steve will discuss your goals, assess your needs, and provide a customized proposal. There's no obligation, and you'll gain valuable insights even from the initial conversation."
    },
    {
      question: "Does Steve provide ongoing support after project completion?",
      answer: "Yes! Steve offers various support options including training sessions, troubleshooting assistance, system updates, and consulting for future enhancements. The goal is ensuring long-term success with your AI and video solutions."
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <HelpCircle className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="brand-text-gradient">Questions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about AI consulting, video production, 
            and how Steve can help transform your business.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openFAQ === index ? (
                    <ChevronUp className="h-5 w-5 text-blue-600" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </button>
              
              {openFAQ === index && (
                <CardContent className="px-6 pb-6 pt-0">
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Still Have Questions CTA */}
        <div className="text-center mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Still Have Questions?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Don't see your question answered here? Steve is happy to discuss your specific 
            situation and provide personalized answers during a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
            >
              Book Free Consultation
            </button>
            <button
              onClick={() => {
                const assistant = document.querySelector('[data-ai-assistant="true"]') as HTMLButtonElement
                assistant?.click()
              }}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Chat with AI Assistant
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
