
'use client'

import { Award, Users, Lightbulb, Target, CheckCircle, Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export function AboutSection() {
  const stats = [
    { number: '5+', label: 'AI related services including training AI Chatbots', icon: Award },
    { number: '30+', label: 'Focused upon technology and legal issues', icon: Target },
    { number: '25+', label: 'Focus upon online publishing', icon: Users },
    { number: '15+', label: 'Perfecting online video opportunities including AI-related', icon: Star }
  ]

  const expertise = [
    'AI Implementation & Strategy',
    'Video Production & Storytelling',
    'Legal Technology Solutions',
    'Business Process Automation',
    'Digital Transformation Consulting',
    'Educational Content Creation'
  ]

  const approach = [
    {
      title: 'Discovery & Analysis',
      description: 'Understanding your unique challenges and opportunities through comprehensive consultation.'
    },
    {
      title: 'Strategic Planning',
      description: 'Developing customized solutions that align with your goals and budget constraints.'
    },
    {
      title: 'Implementation',
      description: 'Executing the plan with precision, ensuring seamless integration and minimal disruption.'
    },
    {
      title: 'Support & Optimization',
      description: 'Providing ongoing support and continuous improvement to maximize your ROI.'
    }
  ]

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            About <span className="brand-text-gradient">Steve Sabludowsky</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted partner in navigating the intersection of AI innovation and compelling video content.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Bio Section */}
          <div>
            <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Transforming Challenges into Opportunities
              </h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Steve Sabludowsky brings extensive expertise across various fields. For the past five years, he has dedicated countless hours to developing and refining AI prompts, meticulously analyzing the strengths and weaknesses of AI chatbots and agents. He employs a tailored approach, selecting the optimal resource to match specific objectives and enhance professional outcomes.
                </p>
                <p>
                  Recognized for his proficiency in technology and legal matters, e-commerce, AI consulting, video production, and content creation, Steve has been a pioneer in deploying video conferencing technologies and post-event productions. He empowers organizations and individuals to leverage emerging technologies for practical problem-solving.
                </p>
                <p>
                  Though a retired attorney, Steve does not offer legal consultation; however, he provides valuable assistance with AI and other technologies relevant to the legal profession.
                </p>
              </div>
            </div>

            {/* Expertise Areas */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Core Expertise</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {expertise.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats & Visual */}
          <div>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
                  <CardContent className="p-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Steve's Professional Photo */}
            <div className="relative aspect-[4/5] bg-gradient-to-br from-blue-100 to-orange-100 rounded-2xl overflow-hidden">
              <img
                src="/steve-photo.png"
                alt="Steve Sabludowsky - AI & Video Consultant"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Approach Section */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              My <span className="brand-text-gradient">Proven Approach</span>
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every successful project starts with understanding your unique needs and 
              developing a customized strategy that delivers real results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {approach.map((step, index) => (
              <div key={index} className="relative">
                <Card className="h-full p-6 hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                        {index + 1}
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm">{step.title}</h4>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
                
                {/* Connector Line */}
                {index < approach.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-blue-300 to-blue-400 transform -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 bg-blue-50 rounded-full px-4 py-2 mb-6">
            <Lightbulb className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Ready to innovate?</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Let's Discuss Your Vision
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Whether you're looking to implement AI solutions, create compelling video content, 
            or transform your business processes, I'm here to help turn your ideas into reality.
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
          >
            Schedule Free Consultation
          </button>
        </div>
      </div>
    </section>
  )
}
