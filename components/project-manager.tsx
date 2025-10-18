
'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Upload, X, Video, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

const projectCategories = [
  'policy-ai',
  'documentary',
  'ai-music',
  'legal-ai',
  'ai-analysis',
  'media-ai',
  'analysis',
  'education',
  'health-tech',
  'social-impact',
  'social-media',
  'search-ai'
]

const projectTypes = [
  'YouTube',
  'YouTube + Live Tool',
  'Article',
  'LinkedIn',
  'Facebook',
  'Video Article',
  'Live Tool'
]

export function ProjectManager({ editingProject = null }: { editingProject?: any }) {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [thumbnailUploading, setThumbnailUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState('')

  const [formData, setFormData] = useState({
    title: editingProject?.title || '',
    description: editingProject?.description || '',
    category: editingProject?.category || '',
    type: editingProject?.type || '',
    duration: editingProject?.duration || '',
    link: editingProject?.link || '',
    toolLink: editingProject?.toolLink || '',
    featured: editingProject?.featured || false,
    published: editingProject?.published || false,
    thumbnail: editingProject?.thumbnail || '',
  })

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState<string>(editingProject?.thumbnail || '')

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setThumbnailFile(file)
      const previewUrl = URL.createObjectURL(file)
      setThumbnailPreview(previewUrl)
    }
  }

  const handleThumbnailUpload = async () => {
    if (!thumbnailFile) return ''

    setThumbnailUploading(true)
    setUploadStatus('Uploading thumbnail...')
    const uploadFormData = new FormData()
    uploadFormData.append('image', thumbnailFile)

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Upload failed')
      }

      const data = await response.json()
      setUploadStatus('Thumbnail uploaded successfully')
      return data.url
    } catch (error) {
      console.error('Thumbnail upload error:', error)
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Thumbnail upload timed out. Please try a smaller file or check your connection.')
      }
      throw new Error('Thumbnail upload failed: ' + (error instanceof Error ? error.message : 'Unknown error'))
    } finally {
      setThumbnailUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    setUploadStatus('')

    try {
      let thumbnailUrl = formData.thumbnail

      // Upload thumbnail if a new file was selected
      if (thumbnailFile) {
        thumbnailUrl = await handleThumbnailUpload()
      }

      setUploadStatus('Saving project...')

      const projectData = {
        ...formData,
        thumbnail: thumbnailUrl,
        authorId: session?.user?.id,
      }

      const url = editingProject ? `/api/projects/${editingProject.id}` : '/api/projects'
      const method = editingProject ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save project')
      }

      const result = await response.json()
      setUploadStatus('')
      setSuccess(editingProject ? 'Project updated successfully!' : 'Project created successfully!')
      
      // Only reset form for new projects
      if (!editingProject) {
        setTimeout(() => {
          setFormData({
            title: '',
            description: '',
            category: '',
            type: '',
            duration: '',
            link: '',
            toolLink: '',
            featured: false,
            published: false,
            thumbnail: '',
          })
          setThumbnailFile(null)
          setThumbnailPreview('')
          setSuccess('')
        }, 2000)
      }
    } catch (error) {
      console.error('Project creation error:', error)
      setUploadStatus('')
      setError(error instanceof Error ? error.message : 'An error occurred while saving the project. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{editingProject ? 'Edit Project' : 'Create New Project'}</CardTitle>
        <CardDescription>
          {editingProject ? 'Update your project details' : 'Add a new standalone video/project to your portfolio'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter project title"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the project"
              rows={3}
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {projectCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Type */}
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent>
                {projectTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="e.g. '15 min', 'Demo', '5 min read'"
              required
            />
          </div>

          {/* Link */}
          <div className="space-y-2">
            <Label htmlFor="link">Primary Link</Label>
            <Input
              id="link"
              type="url"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              placeholder="https://youtube.com/..."
              required
            />
          </div>

          {/* Tool Link */}
          <div className="space-y-2">
            <Label htmlFor="toolLink">Tool Link (Optional)</Label>
            <Input
              id="toolLink"
              type="url"
              value={formData.toolLink}
              onChange={(e) => setFormData({ ...formData, toolLink: e.target.value })}
              placeholder="https://tool-url.com/ (for projects with live tools)"
            />
          </div>

          {/* Thumbnail Upload */}
          <div className="space-y-2">
            <Label htmlFor="thumbnail">Thumbnail Image</Label>
            <div className="space-y-4">
              <Input
                id="thumbnail"
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {thumbnailPreview && (
                <div className="relative">
                  <Image
                    src={thumbnailPreview}
                    alt="Thumbnail Preview"
                    width={300}
                    height={200}
                    className="rounded-lg object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setThumbnailPreview('')
                      setThumbnailFile(null)
                      setFormData({ ...formData, thumbnail: '' })
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center space-x-2">
            <Switch
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
            />
            <Label htmlFor="featured">Mark as featured project</Label>
          </div>

          {/* Published Toggle */}
          <div className="flex items-center space-x-2">
            <Switch
              id="published"
              checked={formData.published}
              onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
            />
            <Label htmlFor="published">Publish immediately</Label>
          </div>

          {/* Messages */}
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

          {/* Upload Status */}
          {uploadStatus && (
            <Alert>
              <AlertDescription className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                {uploadStatus}
              </AlertDescription>
            </Alert>
          )}

          {/* Submit Button */}
          <Button type="submit" disabled={loading || thumbnailUploading} className="w-full">
            {loading || thumbnailUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {uploadStatus || (thumbnailUploading ? 'Uploading thumbnail...' : 'Saving...')}
              </>
            ) : (
              editingProject ? 'Update Project' : 'Create Project'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
