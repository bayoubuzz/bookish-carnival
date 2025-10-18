
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    console.log('Upload API called')
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.isAdmin) {
      console.log('Upload failed - unauthorized')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const data = await request.formData()
    const file: File | null = data.get('image') as unknown as File || data.get('video') as unknown as File

    if (!file) {
      console.log('Upload failed - no file')
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      )
    }

    console.log(`Uploading file: ${file.name}, size: ${file.size}, type: ${file.type}`)

    // Validate file type
    const isImage = file.type.startsWith('image/')
    const isVideo = file.type.startsWith('video/') || 
                   ['video/mp4', 'video/webm', 'video/ogg', 'video/avi', 'video/mov', 'video/quicktime'].includes(file.type)
    
    if (!isImage && !isVideo) {
      console.log(`Upload failed - invalid file type: ${file.type}`)
      return NextResponse.json(
        { error: 'Only image and video files are allowed' },
        { status: 400 }
      )
    }

    // Different size limits for images vs videos
    const maxSize = isImage ? 5 * 1024 * 1024 : 100 * 1024 * 1024 // 5MB for images, 100MB for videos
    if (file.size > maxSize) {
      const sizeLimit = isImage ? '5MB' : '100MB'
      console.log(`Upload failed - file too large: ${file.size} bytes, limit: ${maxSize}`)
      return NextResponse.json(
        { error: `File size too large. Max ${sizeLimit} allowed.` },
        { status: 400 }
      )
    }

    console.log('Converting file to buffer...')
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads')
    if (!existsSync(uploadsDir)) {
      console.log('Creating uploads directory...')
      await mkdir(uploadsDir, { recursive: true })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
    const filepath = join(uploadsDir, filename)

    console.log(`Saving file to: ${filepath}`)
    // Save file
    await writeFile(filepath, buffer)

    // Return the API URL that serves the file
    const url = `/api/uploads/${filename}`
    console.log(`File uploaded successfully: ${url}`)

    return NextResponse.json({ url }, { status: 201 })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'Failed to upload file: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    )
  }
}
