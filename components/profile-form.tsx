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
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { useRouter } from "next/navigation"

interface Profile {
  id: string
  display_name: string
  bio: string | null
  age: number | null
  location: string | null
  travel_style: string | null
  interests: string[] | null
  languages: string[] | null
}

interface ProfileFormProps {
  profile: Profile | null
  userId: string
}

const TRAVEL_STYLES = [
  { value: "budget", label: "Budget Traveler" },
  { value: "mid-range", label: "Mid-Range" },
  { value: "luxury", label: "Luxury" },
  { value: "backpacker", label: "Backpacker" },
  { value: "business", label: "Business" },
]

const COMMON_INTERESTS = [
  "Adventure",
  "Photography",
  "Food",
  "Culture",
  "History",
  "Nature",
  "Nightlife",
  "Museums",
  "Beach",
  "Mountains",
  "Cities",
  "Wildlife",
  "Art",
  "Music",
  "Sports",
  "Hiking",
  "Diving",
  "Shopping",
  "Architecture",
  "Local Experiences",
]

const COMMON_LANGUAGES = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Chinese",
  "Japanese",
  "Korean",
  "Arabic",
  "Russian",
  "Hindi",
  "Dutch",
  "Swedish",
]

export default function ProfileForm({ profile, userId }: ProfileFormProps) {
  const [formData, setFormData] = useState({
    display_name: profile?.display_name || "",
    bio: profile?.bio || "",
    age: profile?.age || "",
    location: profile?.location || "",
    travel_style: profile?.travel_style || "",
  })

  const [interests, setInterests] = useState<string[]>(profile?.interests || [])
  const [languages, setLanguages] = useState<string[]>(profile?.languages || [])
  const [newInterest, setNewInterest] = useState("")
  const [newLanguage, setNewLanguage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const router = useRouter()
  const supabase = createClient()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addInterest = (interest: string) => {
    if (interest && !interests.includes(interest)) {
      setInterests((prev) => [...prev, interest])
      setNewInterest("")
    }
  }

  const removeInterest = (interest: string) => {
    setInterests((prev) => prev.filter((i) => i !== interest))
  }

  const addLanguage = (language: string) => {
    if (language && !languages.includes(language)) {
      setLanguages((prev) => [...prev, language])
      setNewLanguage("")
    }
  }

  const removeLanguage = (language: string) => {
    setLanguages((prev) => prev.filter((l) => l !== language))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const updateData = {
        display_name: formData.display_name,
        bio: formData.bio || null,
        age: formData.age ? Number.parseInt(formData.age) : null,
        location: formData.location || null,
        travel_style: formData.travel_style || null,
        interests: interests.length > 0 ? interests : null,
        languages: languages.length > 0 ? languages : null,
        updated_at: new Date().toISOString(),
      }

      const { error } = await supabase.from("profiles").upsert({ id: userId, ...updateData })

      if (error) throw error

      setSuccess(true)
      setTimeout(() => {
        router.push("/dashboard")
      }, 1500)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <div className="text-green-600 text-lg font-semibold mb-2">Profile Updated Successfully!</div>
          <p className="text-gray-600">Redirecting to dashboard...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Help other travelers get to know you better</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="display_name">Display Name *</Label>
              <Input
                id="display_name"
                value={formData.display_name}
                onChange={(e) => handleInputChange("display_name", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                min="18"
                max="100"
                value={formData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="City, Country"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell other travelers about yourself, your travel experiences, and what you're looking for in a travel buddy..."
              rows={4}
              value={formData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="travel_style">Travel Style</Label>
            <Select value={formData.travel_style} onValueChange={(value) => handleInputChange("travel_style", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your travel style" />
              </SelectTrigger>
              <SelectContent>
                {TRAVEL_STYLES.map((style) => (
                  <SelectItem key={style.value} value={style.value}>
                    {style.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Interests */}
          <div className="space-y-2">
            <Label>Interests</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {interests.map((interest) => (
                <Badge key={interest} variant="secondary" className="flex items-center gap-1">
                  {interest}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeInterest(interest)} />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Select value={newInterest} onValueChange={setNewInterest}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Add an interest" />
                </SelectTrigger>
                <SelectContent>
                  {COMMON_INTERESTS.filter((i) => !interests.includes(i)).map((interest) => (
                    <SelectItem key={interest} value={interest}>
                      {interest}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="button" variant="outline" onClick={() => addInterest(newInterest)} disabled={!newInterest}>
                Add
              </Button>
            </div>
          </div>

          {/* Languages */}
          <div className="space-y-2">
            <Label>Languages</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {languages.map((language) => (
                <Badge key={language} variant="secondary" className="flex items-center gap-1">
                  {language}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeLanguage(language)} />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Select value={newLanguage} onValueChange={setNewLanguage}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Add a language" />
                </SelectTrigger>
                <SelectContent>
                  {COMMON_LANGUAGES.filter((l) => !languages.includes(l)).map((language) => (
                    <SelectItem key={language} value={language}>
                      {language}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="button" variant="outline" onClick={() => addLanguage(newLanguage)} disabled={!newLanguage}>
                Add
              </Button>
            </div>
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Profile"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
