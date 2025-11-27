"use client"

interface Profile {
  travel_style?: string | null
  interests?: string[] | null
  location?: string | null
}

interface CompatibilityResult {
  score: number
  commonInterests: string[]
  reasons: string[]
}

export function calculateCompatibility(profile1: Profile, profile2: Profile): CompatibilityResult {
  let score = 0
  let commonInterests: string[] = []
  const reasons: string[] = []

  // Travel style match (30 points)
  if (profile1.travel_style && profile2.travel_style) {
    if (profile1.travel_style === profile2.travel_style) {
      score += 30
      reasons.push(`Both prefer ${profile1.travel_style} travel`)
    }
  }

  // Common interests (10 points each, max 50)
  if (profile1.interests && profile2.interests) {
    commonInterests = profile1.interests.filter((interest) => profile2.interests?.includes(interest))
    const interestScore = Math.min(commonInterests.length * 10, 50)
    score += interestScore

    if (commonInterests.length > 0) {
      reasons.push(`${commonInterests.length} shared interests`)
    }
  }

  // Location proximity (20 points)
  if (profile1.location && profile2.location) {
    const location1 = profile1.location.toLowerCase()
    const location2 = profile2.location.toLowerCase()

    if (location1.includes(location2) || location2.includes(location1)) {
      score += 20
      reasons.push("Similar locations")
    }
  }

  return {
    score: Math.min(score, 100),
    commonInterests,
    reasons,
  }
}

export function getCompatibilityColor(score: number): string {
  if (score >= 80) return "text-green-600"
  if (score >= 60) return "text-yellow-600"
  if (score >= 40) return "text-orange-600"
  return "text-red-600"
}

export function getCompatibilityLabel(score: number): string {
  if (score >= 80) return "Excellent Match"
  if (score >= 60) return "Good Match"
  if (score >= 40) return "Fair Match"
  return "Low Match"
}
