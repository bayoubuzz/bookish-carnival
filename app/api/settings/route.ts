
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    // Get settings (public endpoint for reading only)
    let settings = await prisma.siteSettings.findFirst();
    
    if (!settings) {
      // Create default settings if none exist
      settings = await prisma.siteSettings.create({
        data: {
          chatbotUrl: 'https://apps.abacus.ai/chatllm/?appId=7942a1764&hideTopBar=2',
          chatbotTitle: "New Orleans Mayor's Election",
          chatbotSubtitle: 'Your AI-powered Q&A assistant for election information',
          siteTitle: 'Steve Sabludowsky - AI & Video Consultant',
          siteDescription: 'AI Strategy & Content Systems',
          contactEmail: 'admin@steveaiandvideo.com',
        },
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}
