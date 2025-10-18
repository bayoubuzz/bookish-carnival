
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { isAdmin: true },
    });

    if (!user?.isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get or create settings
    let settings = await prisma.siteSettings.findFirst();
    
    if (!settings) {
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

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { isAdmin: true },
    });

    if (!user?.isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const data = await req.json();

    // Get or create settings
    let settings = await prisma.siteSettings.findFirst();
    
    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: {
          chatbotUrl: data.chatbotUrl || 'https://apps.abacus.ai/chatllm/?appId=7942a1764&hideTopBar=2',
          chatbotTitle: data.chatbotTitle || "New Orleans Mayor's Election",
          chatbotSubtitle: data.chatbotSubtitle || 'Your AI-powered Q&A assistant for election information',
          siteTitle: data.siteTitle || 'Steve Sabludowsky - AI & Video Consultant',
          siteDescription: data.siteDescription || 'AI Strategy & Content Systems',
          contactEmail: data.contactEmail || 'admin@steveaiandvideo.com',
        },
      });
    } else {
      settings = await prisma.siteSettings.update({
        where: { id: settings.id },
        data: {
          chatbotUrl: data.chatbotUrl,
          chatbotTitle: data.chatbotTitle,
          chatbotSubtitle: data.chatbotSubtitle,
          siteTitle: data.siteTitle,
          siteDescription: data.siteDescription,
          contactEmail: data.contactEmail,
        },
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
