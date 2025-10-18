
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

export const dynamic = 'force-dynamic'

const prisma = new PrismaClient()

// GET /api/articles - Get all articles
export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(articles)
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    )
  }
}

// POST /api/articles - Create new article
export async function POST(request: NextRequest) {
  try {
    console.log('Article creation API called')
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.isAdmin) {
      console.log('Article creation failed - unauthorized')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { title, content, excerpt, category, imageUrl, videoUrl, thumbnailUrl, youtubeUrl, published, slug, authorId } = body

    console.log(`Creating article: ${title}, category: ${category}, published: ${published}`)

    // Validate required fields
    if (!title || !content || !category) {
      console.log('Article creation failed - missing required fields')
      return NextResponse.json(
        { error: 'Title, content, and category are required' },
        { status: 400 }
      )
    }

    // Check if slug already exists
    const existingArticle = await prisma.article.findUnique({
      where: { slug },
    })

    if (existingArticle) {
      console.log(`Article creation failed - slug already exists: ${slug}`)
      return NextResponse.json(
        { error: 'An article with this title already exists' },
        { status: 400 }
      )
    }

    console.log('Creating article in database...')
    const article = await prisma.article.create({
      data: {
        title,
        content,
        excerpt: excerpt || null,
        category,
        imageUrl: imageUrl || null,
        videoUrl: videoUrl || null,
        thumbnailUrl: thumbnailUrl || null,
        youtubeUrl: youtubeUrl || null,
        published: published || false,
        slug,
        authorId: authorId || session.user.id,
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    console.log(`Article created successfully: ${article.id} - ${article.title}`)
    return NextResponse.json(article, { status: 201 })
  } catch (error) {
    console.error('Error creating article:', error)
    return NextResponse.json(
      { error: 'Failed to create article: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    )
  }
}
