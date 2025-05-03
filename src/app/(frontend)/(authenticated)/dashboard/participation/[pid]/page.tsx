import { Participation } from '@/payload-types'
import { getUser } from '../../../actions/get-user'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import BackButton from '../../../components/back-button'
import CourseViewer from '../../../components/course-viewer'

interface Props {
  params: {
    pid: string
  }
}
export default async function ParticipationPage({ params }: Props) {
  const { pid } = await params
  console.log({ pid })
  const payload = await getPayload({ config: configPromise })
  const user = await getUser()

  let participation: Participation | null = null

  try {
    const res: Participation = await payload.findByID({
      collection: 'participation',
      id: pid,
      overrideAccess: false,
      user,
    })

    participation = res
  } catch (error) {
    console.error(error)
    return notFound()
  }

  if (!participation) {
    return notFound()
  }

  return (
    <div className="flex flex-col mx-auto w-full max-w-4xl p-4 gap-4">
      <BackButton />

      <CourseViewer participation={participation} />
    </div>
  )
}
