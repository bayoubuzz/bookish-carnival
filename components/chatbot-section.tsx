
'use client'

import { useEffect, useState } from 'react'

interface SiteSettings {
  chatbotUrl: string;
  chatbotTitle: string;
  chatbotSubtitle: string;
}

export function ChatbotSection() {
  const [settings, setSettings] = useState<SiteSettings>({
    chatbotUrl: 'https://apps.abacus.ai/chatllm/?appId=7942a1764&hideTopBar=2',
    chatbotTitle: "New Orleans Mayor's Election",
    chatbotSubtitle: 'Your AI-powered Q&A assistant for election information',
  });

  useEffect(() => {
    // Fetch settings from API
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.chatbotUrl) {
          setSettings({
            chatbotUrl: data.chatbotUrl,
            chatbotTitle: data.chatbotTitle,
            chatbotSubtitle: data.chatbotSubtitle,
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching settings:', error);
      });
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
      <div className="max-w-7xl mx-auto px-6">
        {/* Chatbot header - Dynamic from settings */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {settings.chatbotTitle.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="text-cyan-400">{settings.chatbotTitle.split(' ').slice(-1)}</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mb-6"></div>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            {settings.chatbotSubtitle}
          </p>
        </div>

        {/* Ask Me Anything callout */}
        <div className="text-center mb-6">
          <div className="inline-block bg-blue-600/50 backdrop-blur-sm rounded-2xl px-8 py-4 border border-blue-400/30">
            <p className="text-2xl font-semibold text-white flex items-center gap-3 justify-center">
              <span className="text-3xl">💬</span>
              Ask Me Anything
            </p>
            <p className="text-blue-200 mt-2">
              Get instant answers about candidates, policies, voting locations, and everything related to the election
            </p>
          </div>
        </div>

        {/* Clickable Chatbot Link - Opens in new tab */}
        <a
          href={settings.chatbotUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
        >
          <div className="relative rounded-2xl shadow-2xl overflow-hidden border-4 border-blue-400 hover:border-yellow-400 transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] cursor-pointer">
            {/* Custom Chatbot Image */}
            <div className="relative w-full">
              <img 
                src="/chatbot-preview.png" 
                alt={settings.chatbotTitle}
                className="w-full h-auto"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-blue-900 px-12 py-6 rounded-2xl shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                  <p className="text-3xl font-bold flex items-center gap-3">
                    <span>🚀</span>
                    Click to Open Chatbot
                    <span>↗️</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </a>

        {/* Disclaimer */}
        <div className="mt-6 bg-blue-800/50 backdrop-blur-sm rounded-xl p-4 border border-blue-600/30">
          <p className="text-sm text-blue-100 flex items-start gap-3">
            <span className="text-yellow-400 text-xl flex-shrink-0">⚠️</span>
            <span>
              <strong>Disclaimer:</strong> This chatbot is experimental and AI-powered. While it strives to provide accurate information, it may occasionally produce errors or outdated content. Please verify important details through official sources such as your local election office, candidate websites, or the New Orleans Board of Elections.
            </span>
          </p>
        </div>

        {/* Transition to Steve's work */}
        <div className="text-center mt-12 pt-8 border-t border-blue-600/30">
          <p className="text-lg text-blue-100">
            Explore <span className="font-semibold text-white">Stephen Sabludowsky&apos;s</span> AI creations — from campaign tools to research engines to AI Videos.
          </p>
          <a 
            href="https://newagecampaigns.abacusai.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-blue-900 font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <span>⭐</span>
            newagecampaigns.abacusai.app
            <span>↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}
