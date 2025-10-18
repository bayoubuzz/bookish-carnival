
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Loader2, Edit, Trash2, ExternalLink, Star, Eye, EyeOff } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Image from 'next/image'

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
  author: {
    id: string
    name: string | null
    email: string
  }
}

export function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/projects')
      
      if (!response.ok) {
        throw new Error('Failed to fetch projects')
      }

      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.error('Error fetching projects:', error)
      setError('Failed to fetch projects. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const togglePublished = async (id: string, currentStatus: boolean) => {
    try {
      const project = projects.find(p => p.id === id)
      if (!project) return

      const response = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...project,
          published: !currentStatus
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update project')
      }

      // Update the local state
      setProjects(projects.map(project => 
        project.id === id 
          ? { ...project, published: !currentStatus }
          : project
      ))

      setSuccess(`Project ${!currentStatus ? 'published' : 'unpublished'} successfully`)
      setTimeout(() => setSuccess(''), 3000)
    } catch (error) {
      console.error('Error updating project:', error)
      setError('Failed to update project. Please try again.')
      setTimeout(() => setError(''), 3000)
    }
  }

  const toggleFeatured = async (id: string, currentStatus: boolean) => {
    try {
      const project = projects.find(p => p.id === id)
      if (!project) return

      const response = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...project,
          featured: !currentStatus
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update project')
      }

      // Update the local state
      setProjects(projects.map(project => 
        project.id === id 
          ? { ...project, featured: !currentStatus }
          : project
      ))

      setSuccess(`Project ${!currentStatus ? 'marked as featured' : 'unmarked as featured'}`)
      setTimeout(() => setSuccess(''), 3000)
    } catch (error) {
      console.error('Error updating project:', error)
      setError('Failed to update project. Please try again.')
      setTimeout(() => setError(''), 3000)
    }
  }

  const deleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      return
    }

    try {
      setDeleting(id)
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete project')
      }

      // Remove from local state
      setProjects(projects.filter(project => project.id !== id))
      setSuccess('Project deleted successfully')
      setTimeout(() => setSuccess(''), 3000)
    } catch (error) {
      console.error('Error deleting project:', error)
      setError('Failed to delete project. Please try again.')
      setTimeout(() => setError(''), 3000)
    } finally {
      setDeleting(null)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getCategoryDisplayName = (category: string) => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading projects...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manage Projects</h2>
          <p className="text-gray-600">View and manage your standalone video projects</p>
        </div>
        <Button onClick={fetchProjects}>
          Refresh
        </Button>
      </div>

      {projects.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-600 mb-4">No projects found</p>
            <p className="text-sm text-gray-500">Create your first project to get started</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <div className="flex">
                {/* Thumbnail */}
                <div className="w-48 h-32 relative bg-gray-200 flex-shrink-0">
                  {project.thumbnail ? (
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No image
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">
                          {getCategoryDisplayName(project.category)}
                        </Badge>
                        <Badge variant="outline">
                          {project.type}
                        </Badge>
                        <Badge variant="outline">
                          {project.duration}
                        </Badge>
                        {project.featured && (
                          <Badge className="bg-yellow-500 hover:bg-yellow-600">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {project.published ? (
                        <Badge className="bg-green-500">Published</Badge>
                      ) : (
                        <Badge variant="secondary">Draft</Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>Created: {formatDate(project.createdAt)}</span>
                    <span>Updated: {formatDate(project.updatedAt)}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(project.link, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      {project.toolLink && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => project.toolLink && window.open(project.toolLink, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Tool
                        </Button>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleFeatured(project.id, project.featured)}
                      >
                        <Star className={`w-4 h-4 mr-1 ${project.featured ? 'fill-current text-yellow-500' : ''}`} />
                        {project.featured ? 'Unfeature' : 'Feature'}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => togglePublished(project.id, project.published)}
                      >
                        {project.published ? (
                          <>
                            <EyeOff className="w-4 h-4 mr-1" />
                            Unpublish
                          </>
                        ) : (
                          <>
                            <Eye className="w-4 h-4 mr-1" />
                            Publish
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteProject(project.id)}
                        disabled={deleting === project.id}
                      >
                        {deleting === project.id ? (
                          <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4 mr-1" />
                        )}
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
