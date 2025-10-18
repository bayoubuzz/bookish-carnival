
import { ChatbotSection } from '../components/chatbot-section'
import { WeCanHelpSection } from '../components/we-can-help-section'
import { ContentMachineSection } from '../components/content-machine-section'
import { PortfolioSection } from '../components/portfolio-section'
import { ContactSection } from '../components/contact-section'
import { Header } from '../components/header'
import { Footer } from '../components/footer'

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Focus on Mayor's Election chatbot first */}
        <ChatbotSection />
        
        {/* Then transition to Steve's work/promotions */}
        <WeCanHelpSection />
        <ContentMachineSection />
        <PortfolioSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
