"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"

interface TripRequestActionsProps {
  requestId: string
  tripId: string
  currentMembers: number
  maxMembers: number
}

export default function TripRequestActions({ requestId, tripId, currentMembers, maxMembers }: TripRequestActionsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleRequestAction = async (action: "accepted" | "rejected") => {
    setIsLoading(true)

    try {
      // Update request status
      const { error: requestError } = await supabase
        .from("trip_requests")
        .update({ status: action, updated_at: new Date().toISOString() })
        .eq("id", requestId)

      if (requestError) throw requestError

      // If accepted and there's room, increment trip members
      if (action === "accepted" && currentMembers < maxMembers) {
        const { error: tripError } = await supabase
          .from("trips")
          .update({
            current_members: currentMembers + 1,
            updated_at: new Date().toISOString(),
          })
          .eq("id", tripId)

        if (tripError) throw tripError
      }

      router.refresh()
    } catch (error) {
      console.error("Error updating request:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const canAccept = currentMembers < maxMembers

  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        onClick={() => handleRequestAction("accepted")}
        disabled={isLoading || !canAccept}
        className="bg-green-600 hover:bg-green-700"
      >
        <CheckCircle className="h-4 w-4 mr-1" />
        Accept
      </Button>
      <Button size="sm" variant="destructive" onClick={() => handleRequestAction("rejected")} disabled={isLoading}>
        <XCircle className="h-4 w-4 mr-1" />
        Reject
      </Button>
    </div>
  )
}
