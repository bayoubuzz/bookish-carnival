
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Brain, 
  Video, 
  Scale, 
  Database, 
  MessageSquare, 
  ArrowRight,
  Zap,
  BarChart,
  FileText,
  Settings,
  Presentation
} from 'lucide-react'

export function ServicesSection() {
  const services = [
    {
      title: "AI Strategy & Workflow Development",
      icon: Brain,
      color: "from-blue-500 to-cyan-500",
      items: [
        "AI ecosystem design for legal, healthcare, and media needs",
        "Comparative model analysis (GPT, Gemini, Claude, etc.)",
        "AI agent development and multi-GPT workflows",
        "Automated research, reminders, and content delivery"
      ]
    },
    {
      title: "Multimedia Content & Visual Storytelling",
      icon: Video,
      color: "from-purple-500 to-pink-500",
      items: [
        "Event videos, explainer animations, and narrative short films",
        "Tribute videos for civic and business leaders",
        "Video breakdown and enhancement (audio, visuals, speech)"
      ]
    },
    {
      title: "Legal, Medical, and Technical Research",
      icon: Scale,
      color: "from-emerald-500 to-teal-500",
      items: [
        "Case analysis, evidence breakdown, demonstrative tools",
        "AI-assisted legal and medical trend reports",
        "Custom litigation research databases and expert witness prep"
      ]
    },
    {
      title: "Data Systems & Automation",
      icon: Database,
      color: "from-orange-500 to-red-500",
      items: [
        "Custom business databases (stocks, grants, YouTube content)",
        "Shopping automation, calendar/task systems",
        "Google Workspace optimization"
      ]
    },
    {
      title: "Communication & Visualization Tools",
      icon: Presentation,
      color: "from-indigo-500 to-purple-500",
      items: [
        "Visual reports and explainers (healthcare, law, senior tech)",
        "Speech-to-text, text-to-speech evaluations",
        "Slide decks, webinars, AI-guided presentations"
      ]
    }
  ]

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    contactSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Core Services
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Strategic capabilities that transform complex challenges into clear solutions
          </p>
        </div>

        {/* Services grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2">
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${service.color} p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {service.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3 text-gray-600">
                        <Zap className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                        <span className="text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Call to action */}
        <div className="text-center bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-12 text-white">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Let's Build Something That Works
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            If you need more than just research—if you need strategy, systems, content, and clarity—I'm ready to help. Reach out to collaborate on your next big project.
          </p>
          <Button 
            onClick={scrollToContact}
            size="lg"
            className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Your Project
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
