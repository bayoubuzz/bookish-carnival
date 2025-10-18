'use client'

import { useState, useEffect } from 'react'
import { ExternalLink, Play, FileText, Music, Scale, Tv, BarChart, Users, Clock, Facebook } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Article {
  id: string
  title: string
  content: string
  excerpt?: string | null
  category: string
  imageUrl?: string | null
  videoUrl?: string | null
  thumbnailUrl?: string | null
  youtubeUrl?: string | null
  published: boolean
  slug: string
  createdAt: string
  updatedAt: string
}

interface Project {
  id: string
  title: string
  description: string
  category: string
  type: string
  duration: string
  thumbnail?: string | null
  link: string
  toolLink?: string | null
  featured: boolean
  published: boolean
  createdAt: string
  updatedAt: string
}

export function PortfolioSection() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [articles, setArticles] = useState<Article[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch articles and projects in parallel
        const [articlesResponse, projectsResponse] = await Promise.all([
          fetch('/api/articles'),
          fetch('/api/projects?published=true')
        ])

        if (articlesResponse.ok) {
          const articlesData = await articlesResponse.json()
          // Only include published articles
          setArticles(articlesData.filter((article: Article) => article.published))
        }

        if (projectsResponse.ok) {
          const projectsData = await projectsResponse.json()
          // Only include published projects
          setProjects(projectsData.filter((project: Project) => project.published))
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const hardcodedProjects = [
    {
      id: 1,
      title: "AI Policy Assistant: Instant Analysis & Content for Campaigns & Media",
      description: "AI-powered platform designed to revolutionize how policy professionals, journalists, and advocacy groups analyze, explain, and communicate complex policy developments in real time.",
      category: "policy-ai",
      type: "YouTube + Live Tool",
      duration: "Demo",
      thumbnail: "https://cdn.abacus.ai/images/9e3d53c5-abbd-40ae-ac49-729c5374e8d2.png",
      link: "https://youtu.be/XnBgVXUy2_k",
      toolLink: "https://4sowqc8jci.space.minimax.io/",
      icon: Scale,
      featured: true
    },
    {
      id: 2,
      title: "Germany 1930s: Roads Chosen",
      description: "A 55-minute documentary blending historical research with AI-generated graphics and narrative structure, exploring the pivotal choices of 1930s Germany. Watch on YouTube.",
      category: "documentary",
      type: "YouTube",
      duration: "55 min",
      thumbnail: "https://cdn.abacus.ai/images/4933e38e-98fd-46b4-a6cf-d6fe9acd7f40.png",
      link: "https://youtu.be/ByG_kUneShY",
      icon: Play
    },
    {
      id: 3,
      title: "Music's Last Right: A Requiem Composed with AI",
      description: "An original music video where AI co-created the score and visuals, blending technology and emotion in a unique artistic experience. Watch on YouTube.",
      category: "ai-music",
      type: "YouTube",
      duration: "8 min",
      thumbnail: "https://cdn.abacus.ai/images/c8379bff-a0bb-47ef-80ac-79f0a5a1de4f.png",
      link: "https://youtu.be/UFEPae819f8?si=oylnHvd6IsYY_gdb",
      icon: Music
    },
    {
      id: 4,
      title: "How AI is Transforming Legal Practice | The Future of Law & AI",
      description: "Explore how artificial intelligence is reshaping the legal profession, with insights on practical applications, ethical considerations, and the future of law practice. Watch on YouTube.",
      category: "legal-ai",
      type: "YouTube",
      duration: "12 min",
      thumbnail: "https://cdn.abacus.ai/images/847a4de6-0084-447a-a8b5-24a0ed750b1b.png",
      link: "https://youtu.be/11urJb0A0do?si=1JmrlZ60JH6uAE63",
      icon: Scale
    },
    {
      id: 5,
      title: "2025: AI Spaced-out Idiocy",
      description: "A creative exploration comparing the birth and evolution of AI to the iconic themes of 2001: A Space Odyssey, using generative AI for visuals and narrative. Watch on YouTube.",
      category: "ai-analysis",
      type: "YouTube",
      duration: "15 min",
      thumbnail: "https://cdn.abacus.ai/images/5334fbd2-5862-41c9-86f6-f70dba975f59.png",
      link: "https://youtu.be/uC5dbimnal8",
      icon: Tv
    },
    {
      id: 6,
      title: "Media Going AI and How",
      description: "An analysis of how artificial intelligence is transforming the media landscape, from content creation to audience engagement. Watch on YouTube.",
      category: "media-ai",
      type: "YouTube",
      duration: "18 min",
      thumbnail: "https://cdn.abacus.ai/images/69d92d34-d068-43d6-a39d-2fce6b199ffc.png",
      link: "https://youtu.be/8e7gfFPhWTA",
      icon: Tv
    },
    {
      id: 7,
      title: "AI Chatbot is Real Clear Winner in Analyzing Political Stats",
      description: "An article exploring how AI chatbots are revolutionizing political data analysis, offering clarity and actionable insights for campaigns and analysts. Read the Article.",
      category: "analysis",
      type: "Article",
      duration: "8 min read",
      thumbnail: "https://cdn.abacus.ai/images/3a1bf00c-abed-4923-b927-c299ad701cec.png",
      link: "https://bayoubuzz.com/dir/index.php/bb/technology/item/1064194-ai-chatbot-is-real-clear-winner-in-analyzing-political-stats",
      icon: BarChart
    },
    {
      id: 8,
      title: "Definitive ChatGPT Lists: How Businesses, Professions, NGOs & Politicians Can Use It",
      description: "A comprehensive guide to practical ChatGPT applications across industries, professions, and public sectors. Read the Article.",
      category: "education",
      type: "Article",
      duration: "12 min read",
      thumbnail: "https://cdn.abacus.ai/images/b4f96764-c9e5-4ded-b18c-9d5cfacbb8b1.png",
      link: "https://bayoubuzz.com/dir/index.php/bb/technology/item/1064191-definitive-chatgpt-lists-how-businesses-professions-ngos-politicians-can-use-it",
      icon: FileText
    },
    {
      id: 9,
      title: "AI, Health Tech & Digital Health: LinkedIn Post",
      description: "A LinkedIn post exploring the intersection of artificial intelligence, health tech, and digital health, highlighting the latest trends and innovations. View on LinkedIn.",
      category: "health-tech",
      type: "LinkedIn",
      duration: "3 min read",
      thumbnail: "https://cdn.abacus.ai/images/c39b4173-22ee-49bd-b06c-c8eba3e005b8.png",
      link: "https://www.linkedin.com/posts/steve-sabludowsky-631678_artificialintelligence-healthtech-digitalhealth-activity-7226306137283813377-Fz1o?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAAZOIUBFsCXfw4_PMQFFYvjlRB7Xfu8ydI",
      icon: Users
    },
    {
      id: 10,
      title: "Senior Moments for Life—AI Can Assist Seniors with Life",
      description: "A video discussing how AI technologies can empower seniors, improve quality of life, and support independent living. Watch on YouTube.",
      category: "social-impact",
      type: "YouTube",
      duration: "10 min",
      thumbnail: "https://cdn.abacus.ai/images/5a1cfa12-acb0-4b21-9c2e-53c9f551fb83.png",
      link: "https://youtu.be/rTC37Ukeiww",
      icon: Users
    },
    {
      id: 11,
      title: "AI Video: Facebook Feature",
      description: "A featured Facebook video showcasing the impact of AI in everyday life and digital communication. Watch on Facebook.",
      category: "social-media",
      type: "Facebook",
      duration: "5 min",
      thumbnail: "https://cdn.abacus.ai/images/a81b5c8c-d37a-4cfd-8792-88f6f01de066.png",
      link: "https://www.facebook.com/stephen.sabludowsky/videos/3529833333987229",
      icon: Facebook
    },
    {
      id: 12,
      title: "The Future of Search: AI Assistant or Overkill?",
      description: "An exploration of the evolving role of AI assistants in search technology—are they the future, or just hype? Watch on YouTube.",
      category: "search-ai",
      type: "YouTube",
      duration: "14 min",
      thumbnail: "https://cdn.abacus.ai/images/165774a6-27d1-4e5b-8622-f97282775378.png",
      link: "https://youtu.be/Lrsoyw84nAg",
      icon: Tv
    }
  ]

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'policy-ai', label: 'Policy AI' },
    { id: 'documentary', label: 'Documentary' },
    { id: 'legal-ai', label: 'Legal AI' },
    { id: 'ai-analysis', label: 'AI Analysis' },
    { id: 'education', label: 'Educational' },
    { id: 'social-impact', label: 'Social Impact' }
  ]

  // Convert articles to project format
  const articleProjects = articles.map((article) => ({
    id: `article-${article.id}`,
    title: article.title,
    description: article.excerpt || article.content.substring(0, 150) + '...',
    category: article.category.toLowerCase().replace(/\s+/g, '-'), // Convert "Legal AI" to "legal-ai"
    type: article.youtubeUrl || article.videoUrl ? "Video Article" : "Article",
    duration: `${Math.ceil(article.content.length / 1000)} min read`,
    thumbnail: article.thumbnailUrl || article.imageUrl || 'https://cdn.abacus.ai/images/b4f96764-c9e5-4ded-b18c-9d5cfacbb8b1.png',
    link: article.youtubeUrl || `/articles/${article.slug}`, // Use YouTube URL if available, otherwise article page
    toolLink: article.youtubeUrl ? `/articles/${article.slug}` : undefined, // If has YouTube, link to article page as secondary
    icon: article.youtubeUrl || article.videoUrl ? Play : FileText,
    featured: false
  }))

  // Convert database projects to display format
  const databaseProjects = projects.map((project) => ({
    id: `project-${project.id}`,
    title: project.title,
    description: project.description,
    category: project.category,
    type: project.type,
    duration: project.duration,
    thumbnail: project.thumbnail || 'https://cdn.abacus.ai/images/b4f96764-c9e5-4ded-b18c-9d5cfacbb8b1.png',
    link: project.link,
    toolLink: project.toolLink,
    icon: project.type.includes('YouTube') ? Play : 
          project.type.includes('Article') ? FileText :
          project.type.includes('LinkedIn') ? Users :
          project.type.includes('Facebook') ? Facebook : ExternalLink,
    featured: project.featured
  }))

  // Combine hardcoded projects, database projects, and article projects
  const allProjects = [...hardcodedProjects, ...databaseProjects, ...articleProjects]

  const filteredProjects = selectedCategory === 'all' 
    ? allProjects 
    : allProjects.filter(project => project.category === selectedCategory)

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Featured <span className="brand-text-gradient">Portfolio</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover how AI and video solutions have transformed businesses and created 
            meaningful impact across various industries and use cases.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className={`group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white shadow-lg ${
                project.featured 
                  ? 'border-2 border-blue-500 ring-2 ring-blue-200 shadow-blue-100' 
                  : 'border-0'
              }`}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-gray-200 overflow-hidden">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={() => window.open(project.link, '_blank', 'noopener,noreferrer')}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 rounded-md px-8 bg-white/90 text-gray-900 hover:bg-white"
                  >
                    <project.icon className="h-5 w-5 mr-2" />
                    View Project
                  </button>
                </div>
                
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
                    🌟 FEATURED
                  </div>
                )}
                
                {/* Type Badge */}
                <div className={`absolute top-3 ${project.featured ? 'left-24' : 'left-3'} bg-black/80 text-white px-2 py-1 rounded text-xs font-medium`}>
                  {project.type}
                </div>
                
                {/* Duration Badge */}
                <div className="absolute top-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {project.duration}
                </div>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-gray-600 text-sm leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                {project.toolLink ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => window.open(project.link, '_blank', 'noopener,noreferrer')}
                      className="flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Watch Video
                    </button>
                    <button
                      onClick={() => project.toolLink && window.open(project.toolLink, '_blank', 'noopener,noreferrer')}
                      className="flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Try Tool
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => window.open(project.link, '_blank', 'noopener,noreferrer')}
                    className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Project
                  </button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Portfolio CTA */}
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Create Your Own Success Story?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            These projects represent just a glimpse of what's possible when you combine 
            AI innovation with professional video production. Let's discuss your unique vision.
          </p>
          <Button
            size="lg"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Your Project Today
          </Button>
        </div>
      </div>
    </section>
  )
}