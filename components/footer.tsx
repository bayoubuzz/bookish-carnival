
'use client'

import { Bot, Mail, ExternalLink, Heart } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'About', href: '#about' },
    { label: 'FAQ', href: '#faq' }
  ]

  const contactInfo = [
    { label: 'Book Consultation', href: 'https://forms.gle/MyvfJUKitwETcCgq6', external: true },
    { label: 'Email Steve', href: 'mailto:steve@sabludowsky.com', external: true }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Bot className="h-8 w-8 text-blue-400" />
              <span className="font-bold text-xl text-white">
                Steve Sabludowsky
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Your trusted partner for AI innovation and professional video content. 
              Transforming businesses through cutting-edge technology solutions.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Mail className="h-4 w-4" />
              <span>Remote consultations worldwide</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-white">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => {
                      const element = document.querySelector(link.href)
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                    className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-white">Get In Touch</h3>
            <ul className="space-y-2">
              {contactInfo.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="text-gray-300 hover:text-blue-400 transition-colors text-sm flex items-center space-x-1"
                  >
                    <span>{item.label}</span>
                    {item.external && <ExternalLink className="h-3 w-3" />}
                  </a>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <p className="text-xs text-gray-400 mb-2">
                <strong className="text-white">Important Note:</strong>
              </p>
              <p className="text-xs text-gray-300">
                Steve provides AI and video consulting services but does not offer legal advice. 
                All services focus on technology solutions and content creation.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {currentYear} Steve Sabludowsky. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-1 text-sm text-gray-400">
              <span>Built with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>for innovation and results</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
