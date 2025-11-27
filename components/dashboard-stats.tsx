"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plane, Users, MessageCircle, Heart } from "lucide-react"

interface DashboardStatsProps {
  stats: {
    totalTrips: number
    activeTrips: number
    totalMessages: number
    profileViews: number
  }
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  const statItems = [
    {
      title: "Total Trips",
      value: stats.totalTrips,
      icon: Plane,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Trips",
      value: stats.activeTrips,
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Messages",
      value: stats.totalMessages,
      icon: MessageCircle,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Profile Views",
      value: stats.profileViews,
      icon: Heart,
      color: "text-pink-600",
      bgColor: "bg-pink-100",
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statItems.map((item) => {
        const Icon = item.icon
        return (
          <Card key={item.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <div className={`p-2 rounded-full ${item.bgColor}`}>
                <Icon className={`h-4 w-4 ${item.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
