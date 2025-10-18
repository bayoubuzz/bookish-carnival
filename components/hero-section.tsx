
'use client'

import { useState } from 'react'
import { ArrowRight, Play, Sparkles, Video, Brain } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 hero-section">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-blue-200">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">AI & Video Innovation Expert</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Transform Your Business with{' '}
            <span className="brand-text-gradient">AI & Video</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Helping law firms, businesses, and individuals solve real-world challenges through 
            cutting-edge AI solutions and compelling video content.
          </p>

          {/* Value Propositions */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-3 shadow-sm">
              <Brain className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">AI Automation</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-3 shadow-sm">
              <Video className="h-5 w-5 text-orange-600" />
              <span className="text-sm font-medium text-gray-700">Video Production</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-3 shadow-sm">
              <Sparkles className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">Digital Strategy</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              onClick={scrollToContact}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Book Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsVideoPlaying(true)}
              className="px-8 py-4 text-lg font-semibold rounded-lg border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Portfolio
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4">Trusted by professionals worldwide</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <span className="text-sm font-medium text-gray-600">Law Firms</span>
              <span className="text-sm font-medium text-gray-600">•</span>
              <span className="text-sm font-medium text-gray-600">Businesses</span>
              <span className="text-sm font-medium text-gray-600">•</span>
              <span className="text-sm font-medium text-gray-600">Content Creators</span>
              <span className="text-sm font-medium text-gray-600">•</span>
              <span className="text-sm font-medium text-gray-600">Innovators</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  )
}
