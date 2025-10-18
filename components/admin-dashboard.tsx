
'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArticleManager } from './article-manager'
import { ArticleList } from './article-list'
import { ProjectManager } from './project-manager'
import { ProjectList } from './project-list'
import { LogOut, Plus, FileText, List, Video, Folder, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function AdminDashboard() {
  const { data: session } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome back, {session?.user?.name}</p>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                onClick={() => router.push('/admin/settings')}
                className="flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Settings
              </Button>
              <Button 
                variant="outline" 
                onClick={() => signOut()}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Folder className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Article
            </TabsTrigger>
            <TabsTrigger value="manage" className="flex items-center gap-2">
              <List className="w-4 h-4" />
              Manage Articles
            </TabsTrigger>
            <TabsTrigger value="create-project" className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              Create Project
            </TabsTrigger>
            <TabsTrigger value="manage-projects" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Manage Projects
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">Articles published</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Draft Articles</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">Unpublished drafts</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Categories</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">Available categories</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                <Button onClick={() => setActiveTab('create')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Article
                </Button>
                <Button variant="outline" onClick={() => setActiveTab('manage')}>
                  <List className="w-4 h-4 mr-2" />
                  Manage Articles
                </Button>
                <Button onClick={() => setActiveTab('create-project')} className="bg-blue-600 hover:bg-blue-700">
                  <Video className="w-4 h-4 mr-2" />
                  Create New Project
                </Button>
                <Button variant="outline" onClick={() => setActiveTab('manage-projects')}>
                  <FileText className="w-4 h-4 mr-2" />
                  Manage Projects
                </Button>
                <Button variant="outline" onClick={() => router.push('/admin/settings')} className="border-blue-300 text-blue-700 hover:bg-blue-50">
                  <Settings className="w-4 h-4 mr-2" />
                  Site Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create">
            <ArticleManager />
          </TabsContent>

          <TabsContent value="manage">
            <ArticleList />
          </TabsContent>

          <TabsContent value="create-project">
            <ProjectManager />
          </TabsContent>

          <TabsContent value="manage-projects">
            <ProjectList />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
