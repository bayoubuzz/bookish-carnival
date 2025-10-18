
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, User, Video } from 'lucide-react'
import { format } from 'date-fns'

const prisma = new PrismaClient()

async function getPublishedArticles() {
  try {
    const articles = await prisma.article.findMany({
      where: {
        published: true,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return articles
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}

export default async function ArticlesPage() {
  const articles = await getPublishedArticles()

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Articles & Insights
          </h1>
          <p className="text-xl text-blue-100 leading-relaxed">
            Exploring AI strategy, content systems, and technical solutions
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          {articles.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No Articles Yet</h2>
              <p className="text-gray-600">Check back soon for new insights and articles.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article: { id: string; slug: string; youtubeUrl?: string | null; videoUrl?: string | null; thumbnailUrl?: string | null; imageUrl?: string | null; title: string; excerpt?: string | null; category: string; author: { name?: string | null }; createdAt: string | Date }) => (
                <Link key={article.id} href={`/articles/${article.slug}`}>
                  <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    {article.youtubeUrl || article.videoUrl ? (
                      <div className="relative h-48 overflow-hidden rounded-t-lg bg-black">
                        {article.thumbnailUrl || article.imageUrl ? (
                          <Image
                            src={article.thumbnailUrl || article.imageUrl || ''}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            unoptimized={!(article.thumbnailUrl || article.imageUrl || '').startsWith('/api/')}
                          />
                        ) : (
                          <video
                            src={article.videoUrl || ''}
                            className="w-full h-full object-cover"
                            poster={article.imageUrl || undefined}
                          />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
                          <Video className="w-12 h-12 text-white opacity-80" />
                        </div>
                      </div>
                    ) : article.thumbnailUrl || article.imageUrl ? (
                      <div className="relative h-48 overflow-hidden rounded-t-lg">
                        <Image
                          src={article.thumbnailUrl || article.imageUrl || ''}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          unoptimized={!(article.thumbnailUrl || article.imageUrl || '').startsWith('/api/')}
                        />
                      </div>
                    ) : null}
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{article.category}</Badge>
                      </div>
                      <CardTitle className="group-hover:text-blue-700 transition-colors line-clamp-2">
                        {article.title}
                      </CardTitle>
                      {article.excerpt && (
                        <CardDescription className="line-clamp-3">
                          {article.excerpt}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{article.author.name || 'Steve Sabludowsky'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{format(new Date(article.createdAt), 'MMM d, yyyy')}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
