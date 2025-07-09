'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Users,
  Music,
  FileText,
  CreditCard,
  BarChart3,
  Bell,
  Settings,
  Plus,
  Eye,
  NotePencil,
  Trash2,
  DollarSign,
  TrendingUp,
  UserCheck,
  Calendar,
} from '@repo/ui/components/icons';

import { Button } from '@repo/ui/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/ui/card';
import { Input } from '@repo/ui/components/ui/input';
import { Badge } from '@repo/ui/components/ui/badge';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui/components/ui/dropdownmenu';

export default function VYBZAdmin() {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const stats = {
    totalBuskers: 1247,
    totalUsers: 15632,
    totalPosts: 3421,
    totalRevenue: 89750,
  };

  const recentBuskers = [
    {
      id: 1,
      name: '김민수',
      genre: '어쿠스틱',
      location: '홍대',
      status: 'active',
      earnings: 125000,
    },
    {
      id: 2,
      name: '박지영',
      genre: '재즈',
      location: '강남',
      status: 'pending',
      earnings: 89000,
    },
    {
      id: 3,
      name: '이준호',
      genre: '힙합',
      location: '명동',
      status: 'active',
      earnings: 156000,
    },
    {
      id: 4,
      name: '최서연',
      genre: '팝',
      location: '이태원',
      status: 'inactive',
      earnings: 67000,
    },
  ];

  const recentUsers = [
    {
      id: 1,
      name: '홍길동',
      email: 'hong@example.com',
      joinDate: '2024-01-15',
      status: 'active',
    },
    {
      id: 2,
      name: '김영희',
      email: 'kim@example.com',
      joinDate: '2024-01-14',
      status: 'active',
    },
    {
      id: 3,
      name: '박철수',
      email: 'park@example.com',
      joinDate: '2024-01-13',
      status: 'suspended',
    },
    {
      id: 4,
      name: '이미영',
      email: 'lee@example.com',
      joinDate: '2024-01-12',
      status: 'active',
    },
  ];

  const recentPosts = [
    {
      id: 1,
      title: '홍대 버스킹 라이브',
      author: '김민수',
      date: '2024-01-15',
      views: 1250,
      status: 'published',
    },
    {
      id: 2,
      title: '재즈 세션 하이라이트',
      author: '박지영',
      date: '2024-01-14',
      views: 890,
      status: 'published',
    },
    {
      id: 3,
      title: '힙합 프리스타일',
      author: '이준호',
      date: '2024-01-13',
      views: 2100,
      status: 'review',
    },
    {
      id: 4,
      title: '어쿠스틱 커버송',
      author: '최서연',
      date: '2024-01-12',
      views: 670,
      status: 'draft',
    },
  ];

  const settlements = [
    {
      id: 1,
      busker: '김민수',
      amount: 125000,
      date: '2024-01-15',
      status: 'completed',
    },
    {
      id: 2,
      busker: '박지영',
      amount: 89000,
      date: '2024-01-14',
      status: 'pending',
    },
    {
      id: 3,
      busker: '이준호',
      amount: 156000,
      date: '2024-01-13',
      status: 'processing',
    },
    {
      id: 4,
      busker: '최서연',
      amount: 67000,
      date: '2024-01-12',
      status: 'completed',
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants: {
      [key: string]: 'default' | 'secondary' | 'destructive' | 'outline';
    } = {
      active: 'default',
      pending: 'secondary',
      inactive: 'outline',
      suspended: 'destructive',
      published: 'default',
      review: 'secondary',
      draft: 'outline',
      completed: 'default',
      processing: 'secondary',
    };
    return <Badge variant={variants[status] || 'outline'}>{status}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 text-black">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Image
              src="/logo.png"
              alt="VYBZ Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
            <div className="h-8 w-px bg-gray-300" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
              관리자 대시보드
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input placeholder="검색..." className="pl-10 w-64" />
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src="/defaultProfile.png" />
              <AvatarFallback>관리자</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white/60 backdrop-blur-sm border-r border-gray-200 min-h-[calc(100vh-73px)]">
          <nav className="p-4 space-y-2">
            <Button
              variant={activeTab === 'overview' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('overview')}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              대시보드 개요
            </Button>
            <Button
              variant={activeTab === 'buskers' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('buskers')}
            >
              <Music className="mr-2 h-4 w-4" />
              버스커 관리
            </Button>
            <Button
              variant={activeTab === 'users' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('users')}
            >
              <Users className="mr-2 h-4 w-4" />
              사용자 관리
            </Button>
            <Button
              variant={activeTab === 'posts' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('posts')}
            >
              <FileText className="mr-2 h-4 w-4" />
              게시물 관리
            </Button>
            <Button
              variant={activeTab === 'settlements' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('settlements')}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              정산 관리
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      총 버스커
                    </CardTitle>
                    <Music className="h-4 w-4" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {stats.totalBuskers.toLocaleString()}
                    </div>
                    <p className="text-xs opacity-80">
                      <TrendingUp className="inline h-3 w-3 mr-1" />
                      +12% from last month
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      총 사용자
                    </CardTitle>
                    <Users className="h-4 w-4" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {stats.totalUsers.toLocaleString()}
                    </div>
                    <p className="text-xs opacity-80">
                      <TrendingUp className="inline h-3 w-3 mr-1" />
                      +8% from last month
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      총 게시물
                    </CardTitle>
                    <FileText className="h-4 w-4" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {stats.totalPosts.toLocaleString()}
                    </div>
                    <p className="text-xs opacity-80">
                      <TrendingUp className="inline h-3 w-3 mr-1" />
                      +15% from last month
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      총 수익
                    </CardTitle>
                    <DollarSign className="h-4 w-4" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ₩{stats.totalRevenue.toLocaleString()}
                    </div>
                    <p className="text-xs opacity-80">
                      <TrendingUp className="inline h-3 w-3 mr-1" />
                      +23% from last month
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>최근 가입 버스커</CardTitle>
                    <CardDescription>
                      새로 가입한 버스커들을 확인하세요
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentBuskers.slice(0, 3).map((busker) => (
                        <div
                          key={busker.id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarFallback>{busker.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{busker.name}</p>
                              <p className="text-sm text-gray-500">
                                {busker.genre} • {busker.location}
                              </p>
                            </div>
                          </div>
                          {getStatusBadge(busker.status)}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>최근 게시물</CardTitle>
                    <CardDescription>
                      최근 업로드된 게시물들을 확인하세요
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentPosts.slice(0, 3).map((post) => (
                        <div
                          key={post.id}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <p className="font-medium">{post.title}</p>
                            <p className="text-sm text-gray-500">
                              {post.author} • {post.views} views
                            </p>
                          </div>
                          {getStatusBadge(post.status)}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'buskers' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">버스커 관리</h2>
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600">
                  <Plus className="mr-2 h-4 w-4" />새 버스커 추가
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>이름</TableHead>
                        <TableHead>장르</TableHead>
                        <TableHead>위치</TableHead>
                        <TableHead>수익</TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead>액션</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentBuskers.map((busker) => (
                        <TableRow key={busker.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarFallback>
                                  {busker.name[0]}
                                </AvatarFallback>
                              </Avatar>
                              <span>{busker.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{busker.genre}</TableCell>
                          <TableCell>{busker.location}</TableCell>
                          <TableCell>
                            ₩{busker.earnings.toLocaleString()}
                          </TableCell>
                          <TableCell>{getStatusBadge(busker.status)}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  액션
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  상세보기
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <NotePencil className="mr-2 h-4 w-4" />
                                  수정
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  삭제
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">사용자 관리</h2>
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600">
                  <UserCheck className="mr-2 h-4 w-4" />
                  사용자 초대
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>이름</TableHead>
                        <TableHead>이메일</TableHead>
                        <TableHead>가입일</TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead>액션</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarFallback>{user.name[0]}</AvatarFallback>
                              </Avatar>
                              <span>{user.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.joinDate}</TableCell>
                          <TableCell>{getStatusBadge(user.status)}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  액션
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  상세보기
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <NotePencil className="mr-2 h-4 w-4" />
                                  수정
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  정지
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'posts' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">게시물 관리</h2>
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600">
                  <Plus className="mr-2 h-4 w-4" />새 게시물
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>제목</TableHead>
                        <TableHead>작성자</TableHead>
                        <TableHead>작성일</TableHead>
                        <TableHead>조회수</TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead>액션</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentPosts.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell className="font-medium">
                            {post.title}
                          </TableCell>
                          <TableCell>{post.author}</TableCell>
                          <TableCell>{post.date}</TableCell>
                          <TableCell>{post.views.toLocaleString()}</TableCell>
                          <TableCell>{getStatusBadge(post.status)}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  액션
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  상세보기
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <NotePencil className="mr-2 h-4 w-4" />
                                  수정
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  삭제
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'settlements' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">정산 관리</h2>
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600">
                  <Calendar className="mr-2 h-4 w-4" />
                  정산 처리
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>버스커</TableHead>
                        <TableHead>금액</TableHead>
                        <TableHead>날짜</TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead>액션</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {settlements.map((settlement) => (
                        <TableRow key={settlement.id}>
                          <TableCell className="font-medium">
                            {settlement.busker}
                          </TableCell>
                          <TableCell>
                            ₩{settlement.amount.toLocaleString()}
                          </TableCell>
                          <TableCell>{settlement.date}</TableCell>
                          <TableCell>
                            {getStatusBadge(settlement.status)}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  액션
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  상세보기
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <CreditCard className="mr-2 h-4 w-4" />
                                  정산 승인
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  정산 거부
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
