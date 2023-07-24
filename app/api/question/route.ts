import { qa } from '@/utils/ai'
import { getuserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'

export const POST = async (request) => {
  const { question } = await request.json()
  const user = await getuserByClerkId()
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    select: {
      content: true,
      createdAt: true,
    },
  })

  const answer = await qa(question, entries)
  return NextResponse.json({ data: answer })
}