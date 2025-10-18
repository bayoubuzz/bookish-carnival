
'use client'

import { Calendar, Mail, MessageSquare, Phone, Clock, MapPin, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function ContactSection() {
  const contactMethods = [
    {
      icon: Calendar,
      title: 'Free Consultation',
      description: 'Book a 30-minute discovery call to discuss your needs',
      action: 'Schedule Now',
      primary: true
    },
    {
      icon: MessageSquare,
      title: 'AI Assistant',
      description: 'Get instant answers and guidance through our chatbot',
      action: 'Chat Now',
      primary: false
    },
    {
      icon: Mail,
      title: 'Email Inquiry',
      description: 'Send detailed questions about your project requirements',
      action: 'Send Email',
      primary: false
    }
  ]

  const businessHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM CST' },
    { day: 'Saturday', hours: '10:00 AM - 2:00 PM CST' },
    { day: 'Sunday', hours: 'By Appointment Only' }
  ]

  const handleBookConsultation = () => {
    window.open('https://docs.google.com/forms/d/1pHC5in8-SivsvyfFAMznNtZOLXIVTe2IEF_6_W7qzNE/viewform', '_blank')
  }

  const handleChatNow = () => {
    // Trigger AI assistant
    const chatButton = document.querySelector('[data-ai-assistant="true"]') as HTMLButtonElement
    if (chatButton) {
      chatButton.click()
    } else {
      // Fallback: scroll to assistant area or show message
      alert('AI Assistant will open in a moment!')
    }
  }

  const handleEmailInquiry = () => {
    window.open('mailto:steve@sabludowsky.com?subject=AI%20and%20Video%20Consulting%20Inquiry&body=Hi%20Steve,%0A%0AI%27m%20interested%20in%20learning%20more%20about%20your%20AI%20and%20video%20consulting%20services.%0A%0AMy%20specific%20needs%20include:%0A-%20%0A-%20%0A-%20%0A%0APlease%20let%20me%20know%20when%20we%20can%20schedule%20a%20consultation.%0A%0ABest%20regards,', '_blank')
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ready to <span className="brand-text-gradient">Get Started?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Take the first step toward transforming your business with AI and video solutions. 
            Choose the contact method that works best for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Methods */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {contactMethods.map((method, index) => (
                <Card
                  key={index}
                  className={`text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 ${
                    method.primary 
                      ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg' 
                      : 'bg-gradient-to-br from-white to-gray-50 shadow-lg'
                  }`}
                >
                  <CardHeader className="pb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 ${
                      method.primary 
                        ? 'bg-white/20' 
                        : 'bg-gradient-to-br from-blue-500 to-blue-600'
                    }`}>
                      <method.icon className={`h-6 w-6 ${
                        method.primary ? 'text-white' : 'text-white'
                      }`} />
                    </div>
                    <CardTitle className={`text-lg font-bold ${
                      method.primary ? 'text-white' : 'text-gray-900'
                    }`}>
                      {method.title}
                    </CardTitle>
                    <CardDescription className={`${
                      method.primary ? 'text-blue-100' : 'text-gray-600'
                    }`}>
                      {method.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={
                        method.title === 'Free Consultation' ? handleBookConsultation :
                        method.title === 'AI Assistant' ? handleChatNow :
                        handleEmailInquiry
                      }
                      className={`w-full ${
                        method.primary 
                          ? 'bg-white text-blue-600 hover:bg-gray-100' 
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {method.action}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* AI Knowledge Quiz */}
            <Card className="bg-gradient-to-br from-gray-50 to-blue-50 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
                  HOW'S YOUR AI?
                </CardTitle>
                <CardDescription>
                  Test your knowledge about generative artificial intelligence. Below is a short quiz. If you want the challenge, please answer. You will get an immediate response. This quiz will be updated regularly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
                  <div className="mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Knowledge Quiz</h3>
                    <p className="text-gray-600 text-sm">
                      Test your knowledge about generative AI with our interactive quiz. Get instant feedback on your answers!
                    </p>
                  </div>
                  <Button
                    onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSecd-4cQNdyH63VPqvscQjlzGrZlBLEUSlQx_t0qC4gRoFrWg/viewform', '_blank')}
                    className="bg-blue-600 hover:bg-blue-700 text-white w-full"
                  >
                    Take AI Quiz
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            {/* Business Hours */}
            <Card className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-blue-600" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {businessHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="font-medium text-gray-700">{schedule.day}</span>
                      <span className="text-gray-600">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-800">
                    <strong>Note:</strong> Response time is typically within 24 hours during business days.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                  Service Areas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Primary:</strong> Remote consultations worldwide</p>
                  <p><strong>Local:</strong> Louisiana, USA</p>
                  <p><strong>Industries:</strong> Legal, business, education, healthcare, personal growth projects</p>
                </div>
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-xs text-green-800">
                    <strong>Remote-First:</strong> All services available via video conferencing for convenience and efficiency.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold">What Happens Next?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</div>
                    <span>We'll review your inquiry within 24 hours</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</div>
                    <span>Schedule a free 30-minute consultation</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">3</div>
                    <span>Receive a customized proposal and timeline</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">4</div>
                    <span>Begin transforming your business!</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-50 rounded-full px-4 py-2 mb-6">
            <Phone className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Ready to innovate?</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Don't Wait – Transform Your Business Today
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Every day without AI and video optimization is a missed opportunity. 
            Take action now and gain a competitive advantage.
          </p>
          <Button
            size="lg"
            onClick={handleBookConsultation}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Book Your Free Consultation Now
          </Button>
        </div>
      </div>
    </section>
  )
}
