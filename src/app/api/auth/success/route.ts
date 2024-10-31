import { PrismaClient } from "@prisma/client"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { NextResponse } from "next/server"
import { SITE_URL } from "@/site/config"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user || !user.id) {
      throw new Error("Authentication failed: User not found.")
    }

    let dbUser = await prisma.user.findUnique({
      where: { id: user.id },
    })

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          id: user.id,
          name: `${user.given_name} ${user.family_name}`,
          email: user.email ?? "",
        },
      })
    }

    return NextResponse.redirect(SITE_URL)
  } catch (error) {
    console.error("Error in /api/auth/success:", error)
    return NextResponse.json(
      { error: "An error occurred during authentication." },
      { status: 500 }
    )
  }
}
