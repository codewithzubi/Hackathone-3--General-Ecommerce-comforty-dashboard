"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus } from "lucide-react"
import { client } from "../../../sanity/lib/sanity"
import { SearchComponent } from "@/components/SearchComponent"

interface Product {
  _id: string
  title: string
  price: number
  priceWithoutDiscount: number
  category: {
    title: string
  }
  inventory: number
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])

  const fetchProducts = async (query = "") => {
    let sanityQuery = `*[_type == "products"`
    if (query) {
      sanityQuery += ` && (title match "${query}*" || category->title match "${query}*")`
    }
    sanityQuery += `] {
      _id,
      title,
      price,
      priceWithoutDiscount,
      "category": category->title,
      inventory
    }`

    const fetchedProducts = await client.fetch(sanityQuery)
    setProducts(fetchedProducts)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleSearch = (query: string) => {
    fetchProducts(query)
  }

  const formatPrice = (price: number) => {
    return isNaN(price) || price == null ? 0 : price.toFixed(2)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>
      <SearchComponent onSearch={handleSearch} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Original Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product.title}</TableCell>
              <TableCell>{product.category.title}</TableCell>
              <TableCell>${formatPrice(product.price)}</TableCell>
              <TableCell>${formatPrice(product.priceWithoutDiscount)}</TableCell>
              <TableCell>{product.inventory}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
                <Button variant="ghost" size="sm" className="text-red-500">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
