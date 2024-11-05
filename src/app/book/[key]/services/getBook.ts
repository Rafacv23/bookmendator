// src/app/book/[key]/services/fetchBookData.ts

import { PrismaClient } from "@prisma/client"
import { SITE_URL } from "@/site/config"

const prisma = new PrismaClient()

export async function getBook(key: string) {
  // Check if the book already exists in the database
  const res = await fetch(`${SITE_URL}/api/book/${key}`)
  if (res.status !== 404) {
    return await res.json()
  }

  // Fetch the book details from OpenLibrary API
  const url = `https://openlibrary.org/books/${key}.json`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Error fetching book details.")
  }

  const book = await response.json()

  // Fetch author details if available
  const authorUrl = book.authors?.[0]?.author?.key
    ? `https://openlibrary.org${book.authors[0].author.key}.json`
    : null

  let author
  if (authorUrl) {
    const authorResponse = await fetch(authorUrl)
    author = authorResponse.ok
      ? await authorResponse.json()
      : { name: "Unknown Author" }
  } else {
    author = { name: "Unknown Author" }
  }

  // Prepare the book data to save in the database
  const description = book.description?.value || "No description available."
  const imageUrl = book.covers?.[0]
    ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg`
    : `https://placehold.co/180x280?text=${encodeURIComponent(book.title)}`

  // Add the book to the database
  const bookData = await prisma.book.create({
    data: {
      id: key,
      title: book.title,
      author: author.name,
      description: description,
      cover: imageUrl,
      subjects: book.subjects || [],
      rating: "unrated",
    },
  })

  return bookData
}
