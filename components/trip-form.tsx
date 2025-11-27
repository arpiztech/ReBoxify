"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

interface TripFormProps {
  userId: string
}

const BUDGET_RANGES = [
  { value: "budget", label: "Budget (Under $50/day)" },
  { value: "mid-range", label: "Mid-Range ($50-150/day)" },
  { value: "luxury", label: "Luxury ($150+/day)" },
]

const TRIP_TYPES = [
  { value: "adventure", label: "Adventure" },
  { value: "relaxation", label: "Relaxation" },
  { value: "cultural", label: "Cultural" },
  { value: "business", label: "Business" },
  { value: "backpacking", label: "Backpacking" },
  { value: "luxury", label: "Luxury" },
]

const ACCOMMODATION_TYPES = [
  { value: "hostel", label: "Hostel" },
  { value: "hotel", label: "Hotel" },
  { value: "airbnb", label: "Airbnb" },
  { value: "camping", label: "Camping" },
  { value: "mixed", label: "Mixed" },
]

const TRANSPORTATION_TYPES = [
  { value: "flight", label: "Flight" },
  { value: "train", label: "Train" },
  { value: "bus", label: "Bus" },
  { value: "car", label: "Car" },
  { value: "mixed", label: "Mixed" },
]

export default function TripForm({ userId }: TripFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    destination: "",
    start_date: "",
    end_date: "",
    budget_range: "",
    group_size: "",
    trip_type: "",
    accommodation_type: "",
    transportation: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Validate dates
      const startDate = new Date(formData.start_date)
      const endDate = new Date(formData.end_date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (startDate < today) {
        throw new Error("Start date cannot be in the past")
      }

      if (endDate <= startDate) {
        throw new Error("End date must be after start date")
      }

      const tripData = {
        creator_id: userId,
        title: formData.title,
        description: formData.description,
        destination: formData.destination,
        start_date: formData.start_date,
        end_date: formData.end_date,
        budget_range: formData.budget_range,
        group_size: Number.parseInt(formData.group_size),
        trip_type: formData.trip_type,
        accommodation_type: formData.accommodation_type || null,
        transportation: formData.transportation || null,
        current_members: 1,
        is_active: true,
      }

      const { data, error } = await supabase.from("trips").insert(tripData).select().single()

      if (error) throw error

      router.push(`/trips/${data.id}`)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trip Details</CardTitle>
        <CardDescription>Tell travelers about your upcoming adventure</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-2">
            <Label htmlFor="title">Trip Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Backpacking through Southeast Asia"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="destination">Destination *</Label>
            <Input
              id="destination"
              placeholder="e.g., Thailand, Vietnam, Cambodia"
              value={formData.destination}
              onChange={(e) => handleInputChange("destination", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe your trip plans, what you're looking for in travel companions, and any specific requirements..."
              rows={4}
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              required
            />
          </div>

          {/* Dates */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_date">Start Date *</Label>
              <Input
                id="start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) => handleInputChange("start_date", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end_date">End Date *</Label>
              <Input
                id="end_date"
                type="date"
                value={formData.end_date}
                onChange={(e) => handleInputChange("end_date", e.target.value)}
                required
              />
            </div>
          </div>

          {/* Trip Details */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="group_size">Group Size *</Label>
              <Input
                id="group_size"
                type="number"
                min="2"
                max="20"
                placeholder="Total travelers including you"
                value={formData.group_size}
                onChange={(e) => handleInputChange("group_size", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget_range">Budget Range *</Label>
              <Select value={formData.budget_range} onValueChange={(value) => handleInputChange("budget_range", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  {BUDGET_RANGES.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="trip_type">Trip Type *</Label>
            <Select value={formData.trip_type} onValueChange={(value) => handleInputChange("trip_type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select trip type" />
              </SelectTrigger>
              <SelectContent>
                {TRIP_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Optional Details */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="accommodation_type">Accommodation Preference</Label>
              <Select
                value={formData.accommodation_type}
                onValueChange={(value) => handleInputChange("accommodation_type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select accommodation" />
                </SelectTrigger>
                <SelectContent>
                  {ACCOMMODATION_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="transportation">Transportation</Label>
              <Select
                value={formData.transportation}
                onValueChange={(value) => handleInputChange("transportation", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select transportation" />
                </SelectTrigger>
                <SelectContent>
                  {TRANSPORTATION_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating Trip..." : "Create Trip"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
