"use client"

import * as React from 'react'
import { Star, MapPin, Package, TrendingUp, ChevronLeft, ChevronRight, Users, ShoppingCart, Clock } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Sample store owner data
const storeOwners = [
  {
    id: 1,
    name: "Ahmed Benali",
    location: "Alger | Bab Ezzouar",
    itemsExceeding: 45,
    matchQuality: 92,
    profileImage: "https://picsum.photos/seed/ahmed/200/200",
    storage: {
      current: 1200,
      max: 1000,
    },
    performance: {
      sales: 85,
      growth: 12,
    }
  },
  {
    id: 2,
    name: "Fatima Zohra",
    location: "Oran | Es Senia",
    itemsExceeding: 32,
    matchQuality: 88,
    profileImage: "https://picsum.photos/seed/fatima/200/200",
    storage: {
      current: 950,
      max: 800,
    },
    performance: {
      sales: 78,
      growth: 8,
    }
  },
  {
    id: 3,
    name: "Karim Boudiaf",
    location: "Constantine | El Khroub",
    itemsExceeding: 28,
    matchQuality: 85,
    profileImage: "https://picsum.photos/seed/karim/200/200",
    storage: {
      current: 780,
      max: 700,
    },
    performance: {
      sales: 72,
      growth: 5,
    }
  },
  {
    id: 4,
    name: "Nadia Bouazza",
    location: "Annaba | El Bouni",
    itemsExceeding: 15,
    matchQuality: 82,
    profileImage: "https://picsum.photos/seed/nadia/200/200",
    storage: {
      current: 650,
      max: 600,
    },
    performance: {
      sales: 68,
      growth: 3,
    }
  },
]

// Best match data
const bestMatch = {
  id: 5,
  name: "Mohamed Chérif",
  location: "Blida | Boufarik",
  itemsExceeding: 38,
  matchQuality: 95,
  profileImage: "https://picsum.photos/seed/mohamed/200/200",
  storage: {
    current: 1100,
    max: 900,
  },
  performance: {
    sales: 92,
    growth: 15,
  }
}

export default function Market() {
  return (
    <div className="flex flex-1 flex-col w-full h-full">
      <div className="h-full overflow-y-auto px-4 py-6 md:px-6">
        <div className="max-w-7xl mx-auto space-y-12 pb-20">
          {/* Page Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Discover Similar Businesses for Exchange</h1>
            <p className="text-muted-foreground">
              Find and connect with store owners who match your business profile
            </p>
          </div>

          {/* Best Match Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-3">
              <Card className="relative py-4 px-6 overflow-hidden bg-gradient-to-r from-primary/10 to-secondary/10">
                <div className="absolute top-0 right-0 p-2">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    Best Match
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={bestMatch.profileImage} />
                      <AvatarFallback>{bestMatch.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{bestMatch.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {bestMatch.location}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Match Quality</p>
                      <p className="text-2xl font-bold text-primary">{bestMatch.matchQuality}%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Storage Usage</p>
                      <p className="text-2xl font-bold text-secondary">
                        {bestMatch.storage.current}/{bestMatch.storage.max}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Sales Performance</p>
                      <p className="text-2xl font-bold text-tertiary">{bestMatch.performance.sales}%</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      <span className="text-sm">{bestMatch.itemsExceeding} items exceeding storage</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm">+{bestMatch.performance.growth}% growth</span>
                    </div>
                  </div>
                  
                  {/* Additional Statistics */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center p-2 rounded-lg bg-success/5">
                      <Users className="h-4 w-4 text-success" />
                      <span className="text-xs font-medium mt-1">Active Customers</span>
                      <span className="text-sm font-semibold text-success">850</span>
                    </div>
                    <div className="flex flex-col items-center p-2 rounded-lg bg-warning/5">
                      <ShoppingCart className="h-4 w-4 text-warning" />
                      <span className="text-xs font-medium mt-1">Monthly Sales</span>
                      <span className="text-sm font-semibold text-warning">$12.5K</span>
                    </div>
                    <div className="flex flex-col items-center p-2 rounded-lg bg-info/5">
                      <Clock className="h-4 w-4 text-info" />
                      <span className="text-xs font-medium mt-1">Response Time</span>
                      <span className="text-sm font-semibold text-info">2.5h</span>
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between gap-16 items-center border-t pt-4">
                    <Button variant="ghost" size="sm" className="hover:bg-primary/10 bg-primary">
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous Match
                    </Button>
                    <Button variant="ghost" size="sm" className="hover:bg-primary/10 bg-primary">
                      Next Match
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Other Store Owners Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {storeOwners.map((owner) => (
              <Card key={owner.id} className="py-8 px-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={owner.profileImage} />
                      <AvatarFallback>{owner.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{owner.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {owner.location}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Match Quality</span>
                      <Badge variant="outline" className="text-primary">
                        {owner.matchQuality}%
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Storage Usage</span>
                      <span className="text-sm">
                        {owner.storage.current}/{owner.storage.max}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Sales Performance</span>
                      <span className="text-sm">{owner.performance.sales}%</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      <span className="text-sm">{owner.itemsExceeding} items</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm">+{owner.performance.growth}%</span>
                    </div>
                  </div>

                  {/* Additional Statistics */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex flex-col items-center p-2 rounded-lg bg-success/5">
                      <Users className="h-4 w-4 text-success" />
                      <span className="text-xs">Customers</span>
                      <span className="text-sm font-semibold text-success">650</span>
                    </div>
                    <div className="flex flex-col items-center p-2 rounded-lg bg-warning/5">
                      <ShoppingCart className="h-4 w-4 text-warning" />
                      <span className="text-xs">Sales</span>
                      <span className="text-sm font-semibold text-warning">$8.2K</span>
                    </div>
                    <div className="flex flex-col items-center p-2 rounded-lg bg-info/5">
                      <Clock className="h-4 w-4 text-info" />
                      <span className="text-xs">Response</span>
                      <span className="text-sm font-semibold text-info">3.1h</span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 