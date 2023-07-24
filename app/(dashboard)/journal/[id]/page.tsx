import Editor from "@/components/Editor"
import { getuserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"

const getEntry = async (id) => {
    const user = await getuserByClerkId()
    const entry = await prisma.journalEntry.findUnique({
        where: {
            userId_id: {
                userId: user.id,
                id
            }
        },
        include: {
            analysis: true
        }
    })

    return entry
}

const EntryPage = async ({params}) => {
    const entry = await getEntry(params.id)
    return (
        <div className="w-full h-full3">
            <Editor entry={entry}></Editor>
        </div>
    )
}

export default EntryPage 