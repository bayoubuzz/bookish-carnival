'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Zap, Target, Cog } from 'lucide-react'

export function StrategicHeroSection() {
  const scrollToServices = () => {
    const servicesSection = document.getElementById('services')
    servicesSection?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    contactSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='https://imgs.search.brave.com/hdhpqBOS2O1HixQa7VOyQkf_K0zipyOKTrxDlNPX9Rw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMDYv/OTQxLzAwMi9zbWFs/bC9zbWFsbC1oZXhh/Z29uLXNoYXBlLXdp/dGgtbGlnaHQtd2hp/dGUtYW5kLWdyZXkt/Y29sb3Itc2VhbWxl/c3MtcGF0dGVybi1i/YWNrZ3JvdW5kLWZy/ZWUtdmVjdG9yLmpw/Zw fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='37' cy='7' r='1'/%3E%3Ccircle cx='7' cy='37' r='1'/%3E%3Ccircle cx='37' cy='37' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Main headline */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            AI Strategy & Content Systems
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl text-blue-100 font-light max-w-4xl mx-auto leading-relaxed">
            Transforming complex information into powerful stories, systems, and solutions.
          </p>
        </div>

        {/* Value proposition */}
        <div className="mb-12 max-w-4xl mx-auto">
          <p className="text-lg md:text-xl text-blue-200 leading-relaxed">
            I don&apos;t just research. I build frameworks, narratives, databases, and automated workflows. With a background in law, media, and education—and expert use of AI tools—I turn complexity into clarity, insight, and action.
          </p>
        </div>

        {/* Key capabilities */}
        <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
          <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <Zap className="w-12 h-12 text-yellow-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">AI Strategy</h3>
            <p className="text-blue-200 text-sm text-center">Multi-model workflows and intelligent automation</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <Target className="w-12 h-12 text-yellow-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Content Systems</h3>
            <p className="text-blue-200 text-sm text-center">Multimedia storytelling and visual narratives</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <Cog className="w-12 h-12 text-yellow-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Technical Solutions</h3>
            <p className="text-blue-200 text-sm text-center">Legal research, data systems, and automation</p>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={scrollToServices}
            size="lg" 
            className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Explore Services
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button 
            onClick={scrollToContact}
            variant="outline" 
            size="lg"
            className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold px-8 py-4 text-lg transition-all duration-300"
          >
            Let&apos;s Collaborate
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}