
'use client'

import Image from 'next/image'
import { ExternalLink, Sparkles } from 'lucide-react'

export function ContentMachineSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 via-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-purple-600" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Our Content Machine
            </h2>
            <Sparkles className="w-8 h-8 text-purple-600" />
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            See how our AI-powered content generation system transforms complex topics into 
            professional documents, press releases, and strategic communications—instantly.
          </p>
        </div>

        {/* Clickable Screenshot */}
        <a
          href="https://issuescrutiny.abacusai.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-[1.02] bg-white p-4 border-4 border-purple-100 hover:border-purple-300">
            {/* "Try It" Badge */}
            <div className="absolute top-8 right-8 z-10 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 group-hover:scale-110 transition-transform duration-300">
              <ExternalLink className="w-5 h-5" />
              <span className="font-bold text-lg">Try It Now!</span>
            </div>

            {/* Screenshot Image */}
            <div className="relative w-full aspect-[16/10] bg-gray-100">
              <Image
                src="/content-machine-screenshot.png"
                alt="Content Generator Machine - Click to try it"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
              <p className="text-white text-xl font-semibold bg-purple-900/80 px-6 py-3 rounded-full backdrop-blur-sm">
                Click to Launch Content Generator →
              </p>
            </div>
          </div>
        </a>

        {/* Description Below */}
        <div className="mt-8 text-center">
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            <strong>Create professional policy content in 3 simple steps:</strong> Choose your topic, 
            select your perspective, and generate instant, high-quality content ready for your campaigns, 
            media outreach, or strategic communications.
          </p>
        </div>
      </div>
    </section>
  )
}
