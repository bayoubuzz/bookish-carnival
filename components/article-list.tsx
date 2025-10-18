
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Edit, Trash2, Eye, EyeOff, Calendar } from 'lucide-react'
import Image from 'next/image'
import { format } from 'date-fns'
import { ArticleManager } from './article-manager'

interface Article {
  id: string
  title: string
  excerpt: string | null
  category: string
  imageUrl: string | null
  videoUrl: string | null
  thumbnailUrl: string | null
  youtubeUrl: string | null
  published: boolean
  createdAt: string
  updatedAt: string
  slug: string
}

export function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [editingArticle, setEditingArticle] = useState<Article | null>(null)

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/articles')
      if (response.ok) {
        const data = await response.json()
        setArticles(data)
      }
    } catch (error) {
      console.error('Error fetching articles:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        setArticles(articles.filter(article => article.id !== id))
      }
    } catch (error) {
      console.error('Error deleting article:', error)
    }
  }

  const togglePublished = async (id: string, published: boolean) => {
    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ published: !published }),
      })
      
      if (response.ok) {
        setArticles(articles.map(article => 
          article.id === id ? { ...article, published: !published } : article
        ))
      }
    } catch (error) {
      console.error('Error updating article:', error)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading articles...</div>
        </CardContent>
      </Card>
    )
  }

  if (articles.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Articles Found</CardTitle>
          <CardDescription>
            You haven't created any articles yet. Create your first article to get started.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>All Articles</CardTitle>
          <CardDescription>
            Manage your published and draft articles
          </CardDescription>
        </CardHeader>
      </Card>

      {articles.map((article) => (
        <Card key={article.id}>
          <CardContent className="p-6">
            <div className="flex gap-4">
              {/* Featured Image */}
              {(article.thumbnailUrl || article.imageUrl) && (
                <div className="flex-shrink-0">
                  <Image
                    src={article.thumbnailUrl || article.imageUrl || ''}
                    alt={article.title}
                    width={120}
                    height={80}
                    className="rounded-lg object-cover"
                    unoptimized={!(article.thumbnailUrl || article.imageUrl || '').startsWith('/api/')}
                  />
                </div>
              )}

              {/* Article Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={article.published ? 'default' : 'secondary'}>
                        {article.published ? 'Published' : 'Draft'}
                      </Badge>
                      <Badge variant="outline">{article.category}</Badge>
                    </div>
                    {article.excerpt && (
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                        {article.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Created {format(new Date(article.createdAt), 'MMM d, yyyy')}
                      </span>
                      {article.updatedAt !== article.createdAt && (
                        <span>
                          Updated {format(new Date(article.updatedAt), 'MMM d, yyyy')}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => togglePublished(article.id, article.published)}
                    >
                      {article.published ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setEditingArticle(article)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Article</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{article.title}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(article.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {/* Edit Article Modal */}
      {editingArticle && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Edit Article</h2>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setEditingArticle(null)
                    fetchArticles() // Refresh the list after editing
                  }}
                >
                  Close
                </Button>
              </div>
              <ArticleManager editingArticle={editingArticle} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
