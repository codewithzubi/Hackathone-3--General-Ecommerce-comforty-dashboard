"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchComponentProps {
  onSearch: (query: string) => void
}

export function SearchComponent({ onSearch }: SearchComponentProps) {
  const [query, setQuery] = useState("")

  const handleSearch = () => {
    onSearch(query)
  }

  return (
    <div className="flex items-center space-x-2">
      <Input placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} className="max-w-sm" />
      <Button variant="secondary" onClick={handleSearch}>
        Search
      </Button>
    </div>
  )
}

