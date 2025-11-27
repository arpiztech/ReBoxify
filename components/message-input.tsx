"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import { useRouter } from "next/navigation"

interface MessageInputProps {
  tripId: string
  userId: string
}

export default function MessageInput({ tripId, userId }: MessageInputProps) {
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || isLoading) return

    setIsLoading(true)

    try {
      const { error } = await supabase.from("messages").insert({
        trip_id: tripId,
        sender_id: userId,
        content: message.trim(),
      })

      if (error) throw error

      setMessage("")
      router.refresh()
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSendMessage} className="flex gap-2">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        disabled={isLoading}
        className="flex-1"
      />
      <Button type="submit" disabled={isLoading || !message.trim()} size="sm">
        <Send className="h-4 w-4" />
      </Button>
    </form>
  )
}
