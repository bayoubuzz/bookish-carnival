
'use client'

import { Button } from '@/components/ui/button'
import { CheckCircle2, ArrowDown } from 'lucide-react'

export function WeCanHelpSection() {
  const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById('portfolio')
    portfolioSection?.scrollIntoView({ behavior: 'smooth' })
  }

  const helpItems = [
    "Need help analyzing complex policy issues and creating compelling arguments?",
    "Want to transform dense research into clear, persuasive content for your audience?",
    "Looking to automate content creation while maintaining professional quality?",
    "Need strategic AI implementation for your business or organization?",
    "Want to create multimedia content that tells your story effectively?"
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How Can We Help You?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From complex policy analysis to automated content systems—we turn your challenges into solutions.
          </p>
        </div>

        {/* Help Items Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {helpItems.map((item, index) => (
            <div 
              key={index} 
              className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <p className="text-lg text-gray-700 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-10 text-white">
          <p className="text-2xl md:text-3xl font-semibold mb-6">
            Check out our examples below to see what's possible
          </p>
          <Button
            onClick={scrollToPortfolio}
            size="lg"
            className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            View Our Work
            <ArrowDown className="ml-2 w-5 h-5 animate-bounce" />
          </Button>
        </div>
      </div>
    </section>
  )
}
