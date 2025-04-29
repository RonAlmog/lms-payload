import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getUser } from '../../../actions/get-user'
import { Course } from '@/payload-types'
import { notFound } from 'next/navigation'

const CoursePage = async ({ params }: { params: { courseId: string } }) => {
  const { courseId } = await params

  const payload = await getPayload({ config: configPromise })
  const user = await getUser()
  let course: Course | null = null
  try {
    const res = await payload.findByID({
      collection: 'courses',
      id: courseId,
      overrideAccess: false,
      user,
    })
    course = res
  } catch (error) {
    console.error(error)
    return notFound()
  }

  if (!course) {
    return notFound()
  }

  return <div>CoursePage</div>
}

export default CoursePage
