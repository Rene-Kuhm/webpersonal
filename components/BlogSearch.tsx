'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Category {
  _id: string;
  title: string;
}

interface BlogSearchProps {
  categories: Category[];
  initialSearch?: string;
  initialCategory?: string;
}

export default function BlogSearch({ 
  categories, 
  initialSearch = '', 
  initialCategory = 'all' 
}: BlogSearchProps) {
  const [search, setSearch] = useState(initialSearch)
  const [category, setCategory] = useState(initialCategory)
  const router = useRouter()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    router.push(`/blog?search=${e.target.value}&category=${category}`)
  }

  const handleCategoryChange = (value: string) => {
    setCategory(value)
    router.push(`/blog?search=${search}&category=${value}`)
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
      <Input 
        type="search" 
        placeholder="Buscar artículos..." 
        className="max-w-sm"
        value={search}
        onChange={handleSearch}
      />
      <Select value={category} onValueChange={handleCategoryChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Categoría" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas</SelectItem>
          {categories.map((category: Category) => (
            <SelectItem key={category._id} value={category._id}>{category.title}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

