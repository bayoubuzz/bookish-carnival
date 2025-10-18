
'use client'

import { useState, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Upload, X, Video, Image as ImageIcon, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const categories = [
  'Legal AI',
  'Healthcare AI',
  'Content Creation',
  'Data Systems',
  'AI Strategy'
]

export function ArticleManager({ editingArticle = null }: { editingArticle?: any }) {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [imageUploading, setImageUploading] = useState(false)
  const [videoUploading, setVideoUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState('')
  
  // Refs for file inputs
  const imageInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    title: editingArticle?.title || '',
    content: editingArticle?.content || '',
    excerpt: editingArticle?.excerpt || '',
    category: editingArticle?.category || '',
    published: editingArticle?.published || false,
    imageUrl: editingArticle?.imageUrl || '',
    videoUrl: editingArticle?.videoUrl || '',
    thumbnailUrl: editingArticle?.thumbnailUrl || '',
    youtubeUrl: editingArticle?.youtubeUrl || '',
  })

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>(editingArticle?.imageUrl || editingArticle?.thumbnailUrl || '')
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videoPreview, setVideoPreview] = useState<string>(editingArticle?.videoUrl || editingArticle?.youtubeUrl || '')

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Reset any previous errors
      setError('')
      setImageFile(file)
      
      // Create and set preview URL
      try {
        const previewUrl = URL.createObjectURL(file)
        setImagePreview(previewUrl)
      } catch (err) {
        console.error('Error creating image preview:', err)
        setImagePreview('')
      }
    }
  }

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Reset any previous errors
      setError('')
      setVideoFile(file)
      
      // Create and set preview URL
      try {
        const previewUrl = URL.createObjectURL(file)
        setVideoPreview(previewUrl)
      } catch (err) {
        console.error('Error creating video preview:', err)
        setVideoPreview('')
      }
    }
  }

  const handleImageUpload = async () => {
    if (!imageFile) return ''

    setImageUploading(true)
    setUploadStatus('Uploading image...')
    
    try {
      const uploadFormData = new FormData()
      uploadFormData.append('image', imageFile)

      console.log('Starting image upload for file:', imageFile.name)
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      })

      console.log('Image upload response status:', response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Image upload failed:', errorText)
        throw new Error(`Upload failed: ${response.status} - ${errorText}`)
      }

      const data = await response.json()
      console.log('Image uploaded successfully:', data.url)
      setUploadStatus('Image uploaded successfully')
      return data.url
    } catch (error) {
      console.error('Image upload error:', error)
      setUploadStatus('')
      throw new Error('Image upload failed: ' + (error instanceof Error ? error.message : 'Unknown error'))
    } finally {
      setImageUploading(false)
    }
  }

  const handleVideoUpload = async () => {
    if (!videoFile) return ''

    setVideoUploading(true)
    setUploadStatus(`Uploading video (${Math.round(videoFile.size / 1024 / 1024)}MB)...`)
    
    try {
      const uploadFormData = new FormData()
      uploadFormData.append('video', videoFile)

      console.log('Starting video upload for file:', videoFile.name)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      })

      console.log('Video upload response status:', response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Video upload failed:', errorText)
        throw new Error(`Upload failed: ${response.status} - ${errorText}`)
      }

      const data = await response.json()
      console.log('Video uploaded successfully:', data.url)
      setUploadStatus('Video uploaded successfully')
      return data.url
    } catch (error) {
      console.error('Video upload error:', error)
      setUploadStatus('')
      throw new Error('Video upload failed: ' + (error instanceof Error ? error.message : 'Unknown error'))
    } finally {
      setVideoUploading(false)
    }
  }

  const resetUploadStates = () => {
    setImageUploading(false)
    setVideoUploading(false)
    setUploadStatus('')
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Reset all states
    setLoading(true)
    setError('')
    setSuccess('')
    resetUploadStates()

    try {
      // Validate required fields
      if (!formData.title.trim()) {
        throw new Error('Title is required')
      }
      if (!formData.content.trim()) {
        throw new Error('Content is required')
      }
      if (!formData.category) {
        throw new Error('Category is required')
      }

      console.log('Starting article creation process...')
      
      let imageUrl = formData.imageUrl
      let videoUrl = formData.videoUrl

      // Upload files sequentially to avoid overwhelming the server
      if (imageFile) {
        console.log('Uploading image...')
        try {
          imageUrl = await handleImageUpload()
          console.log('Image upload completed:', imageUrl)
        } catch (uploadError) {
          console.error('Image upload failed:', uploadError)
          throw uploadError
        }
      }

      if (videoFile) {
        console.log('Uploading video...')
        try {
          videoUrl = await handleVideoUpload()
          console.log('Video upload completed:', videoUrl)
        } catch (uploadError) {
          console.error('Video upload failed:', uploadError)
          throw uploadError
        }
      }

      setUploadStatus('Saving article...')
      const slug = editingArticle?.slug || generateSlug(formData.title)

      const articleData = {
        ...formData,
        imageUrl: imageUrl || formData.thumbnailUrl || '',
        videoUrl: videoUrl || formData.youtubeUrl || '',
        slug,
        authorId: session?.user?.id,
      }

      console.log('Saving article with data:', articleData)

      const url = editingArticle ? `/api/articles/${editingArticle.id}` : '/api/articles'
      const method = editingArticle ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleData),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Article save failed:', errorText)
        throw new Error(`Failed to save article: ${response.status} - ${errorText}`)
      }

      const result = await response.json()
      console.log('Article saved successfully:', result)
      
      setUploadStatus('')
      setSuccess(editingArticle ? 'Article updated successfully!' : 'Article created successfully!')
      
      // Only reset form for new articles
      if (!editingArticle) {
        setTimeout(() => {
          setFormData({
            title: '',
            content: '',
            excerpt: '',
            category: '',
            published: false,
            imageUrl: '',
            videoUrl: '',
            thumbnailUrl: '',
            youtubeUrl: '',
          })
          setImageFile(null)
          setImagePreview('')
          setVideoFile(null)
          setVideoPreview('')
          
          // Clear file inputs
          if (imageInputRef.current) imageInputRef.current.value = ''
          if (videoInputRef.current) videoInputRef.current.value = ''
          
          setSuccess('')
        }, 3000)
      }
    } catch (error) {
      console.error('Article creation error:', error)
      resetUploadStates()
      setError(error instanceof Error ? error.message : 'An error occurred while saving the article. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{editingArticle ? 'Edit Article' : 'Create New Article'}</CardTitle>
        <CardDescription>
          {editingArticle ? 'Update your article content and settings' : 'Write and publish a new article to your website'}
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
              placeholder="Enter article title"
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
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Excerpt */}
          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt (Optional)</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="Brief summary of the article"
              rows={2}
            />
          </div>

          {/* Media Section with Tabs */}
          <div className="space-y-4">
            <Label>Media (Optional)</Label>
            <Tabs defaultValue="links" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="links">URLs (Recommended)</TabsTrigger>
                <TabsTrigger value="uploads">File Uploads</TabsTrigger>
              </TabsList>
              
              <TabsContent value="links" className="space-y-4">
                {/* YouTube/Video URL */}
                <div className="space-y-2">
                  <Label htmlFor="youtubeUrl">YouTube/Video URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="youtubeUrl"
                      value={formData.youtubeUrl}
                      onChange={(e) => {
                        setFormData({ ...formData, youtubeUrl: e.target.value })
                        if (e.target.value) {
                          setVideoPreview(e.target.value)
                        }
                      }}
                      placeholder="https://youtu.be/... or https://youtube.com/watch?v=..."
                      type="url"
                    />
                    {formData.youtubeUrl && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(formData.youtubeUrl, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>

                {/* Thumbnail URL */}
                <div className="space-y-2">
                  <Label htmlFor="thumbnailUrl">Thumbnail Image URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="thumbnailUrl"
                      value={formData.thumbnailUrl}
                      onChange={(e) => {
                        setFormData({ ...formData, thumbnailUrl: e.target.value })
                        if (e.target.value) {
                          setImagePreview(e.target.value)
                        }
                      }}
                      placeholder="https://example.com/thumbnail.jpg"
                      type="url"
                    />
                    {formData.thumbnailUrl && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(formData.thumbnailUrl, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="uploads" className="space-y-4">
                {/* Image Upload */}
                <div className="space-y-2">
                  <Label htmlFor="image">Upload Thumbnail Image</Label>
                  <Input
                    ref={imageInputRef}
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {imageFile && (
                    <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                      <ImageIcon className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-blue-700">
                        {imageFile.name} ({Math.round(imageFile.size / 1024)} KB)
                      </span>
                      {imageUploading && <Loader2 className="w-4 h-4 animate-spin text-blue-600" />}
                    </div>
                  )}
                </div>

                {/* Video Upload */}
                <div className="space-y-2">
                  <Label htmlFor="video">Upload Video File</Label>
                  <Input
                    ref={videoInputRef}
                    id="video"
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                  />
                  {videoFile && (
                    <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                      <Video className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-700">
                        {videoFile.name} ({Math.round(videoFile.size / 1024 / 1024)} MB)
                      </span>
                      {videoUploading && <Loader2 className="w-4 h-4 animate-spin text-green-600" />}
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            {/* Media Preview */}
            {(imagePreview || videoPreview) && (
              <div className="space-y-4">
                <Label>Media Preview</Label>
                {imagePreview && (
                  <div className="relative border rounded-lg overflow-hidden max-w-md">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      width={300}
                      height={200}
                      className="object-cover w-full"
                      unoptimized={imagePreview.startsWith('blob:')}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setImagePreview('')
                        setImageFile(null)
                        setFormData({ ...formData, imageUrl: '', thumbnailUrl: '' })
                        if (imageInputRef.current) imageInputRef.current.value = ''
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                {videoPreview && videoPreview !== imagePreview && (
                  <div className="relative border rounded-lg overflow-hidden max-w-md">
                    {videoPreview.includes('youtube') || videoPreview.includes('youtu.be') ? (
                      <div className="bg-gray-100 p-4 rounded">
                        <p className="text-sm text-gray-600 mb-2">YouTube Video Preview:</p>
                        <a 
                          href={videoPreview} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline break-all"
                        >
                          {videoPreview}
                        </a>
                      </div>
                    ) : (
                      <video
                        src={videoPreview}
                        controls
                        width={400}
                        height={300}
                        className="w-full max-w-md"
                      >
                        Your browser does not support the video tag.
                      </video>
                    )}
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setVideoPreview('')
                        setVideoFile(null)
                        setFormData({ ...formData, videoUrl: '', youtubeUrl: '' })
                        if (videoInputRef.current) videoInputRef.current.value = ''
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Write your article content here..."
              rows={15}
              required
            />
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
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">{success}</AlertDescription>
            </Alert>
          )}

          {/* Upload Status */}
          {uploadStatus && (
            <Alert className="border-blue-200 bg-blue-50">
              <AlertDescription className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                <span className="text-blue-800">{uploadStatus}</span>
              </AlertDescription>
            </Alert>
          )}

          {/* Form Validation Feedback */}
          {!formData.title.trim() || !formData.content.trim() || !formData.category ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please fill in all required fields: Title, Category, and Content
              </AlertDescription>
            </Alert>
          ) : null}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              type="submit" 
              disabled={loading || imageUploading || videoUploading || !formData.title.trim() || !formData.content.trim() || !formData.category} 
              className="flex-1"
            >
              {loading || imageUploading || videoUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {uploadStatus || (imageUploading ? 'Uploading image...' : 
                   videoUploading ? 'Uploading video...' : 'Saving...')}
                </>
              ) : (
                editingArticle ? 'Update Article' : 'Create Article'
              )}
            </Button>
            
            {!editingArticle && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setFormData({
                    title: '',
                    content: '',
                    excerpt: '',
                    category: '',
                    published: false,
                    imageUrl: '',
                    videoUrl: '',
                    thumbnailUrl: '',
                    youtubeUrl: '',
                  })
                  setImageFile(null)
                  setImagePreview('')
                  setVideoFile(null)
                  setVideoPreview('')
                  setError('')
                  setSuccess('')
                  resetUploadStates()
                  if (imageInputRef.current) imageInputRef.current.value = ''
                  if (videoInputRef.current) videoInputRef.current.value = ''
                }}
                disabled={loading || imageUploading || videoUploading}
              >
                Clear Form
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
