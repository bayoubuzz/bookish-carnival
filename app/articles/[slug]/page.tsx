
import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import { format } from 'date-fns'

const prisma = new PrismaClient()

async function getArticle(slug: string) {
  try {
    const article = await prisma.article.findUnique({
      where: {
        slug: slug,
        published: true,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    })
    return article
  } catch (error) {
    console.error('Error fetching article:', error)
    return null
  }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug)

  if (!article) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Back Navigation */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link href="/articles">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Articles
            </Button>
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-6">
            <Badge variant="secondary" className="mb-4">
              {article.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {article.title}
            </h1>
            {article.excerpt && (
              <p className="text-xl text-blue-100 leading-relaxed">
                {article.excerpt}
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-6 text-blue-200">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{article.author.name || 'Steve Sabludowsky'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{format(new Date(article.createdAt), 'MMMM d, yyyy')}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Media */}
      {article.youtubeUrl ? (
        <div className="relative bg-black">
          <div className="w-full h-96 flex items-center justify-center">
            <iframe
              src={article.youtubeUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
              title={article.title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      ) : article.videoUrl ? (
        <div className="relative bg-black">
          <video
            src={article.videoUrl}
            controls
            className="w-full h-96 object-contain"
            poster={article.thumbnailUrl || article.imageUrl || undefined}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      ) : article.thumbnailUrl || article.imageUrl ? (
        <div className="relative h-96 overflow-hidden">
          <Image
            src={article.thumbnailUrl || article.imageUrl || ''}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>
      ) : null}

      {/* Article Content */}
      <article className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-lg prose-blue max-w-none">
           {article.content.split('\n').map((paragraph: string, index: number) => (
              paragraph.trim() ? (
                <p key={index} className="mb-6 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ) : (
                <br key={index} />
              )
            ))}
          </div>
        </div>
      </article>

      {/* Footer CTA */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need Strategic AI Solutions?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Let's discuss how I can help with your next project.
          </p>
          <Link href="/#contact">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
              Get In Touch
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}

// Generate static params for better performance
export async function generateStaticParams() {
  try {
    const articles = await prisma.article.findMany({
      where: {
        published: true,
      },
      select: {
        slug: true,
      },
    })

   return articles.map((article: { slug: string }) => ({
      slug: article.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}
