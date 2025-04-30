import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getUser } from '../../../actions/get-user'
import { Course, Media } from '@/payload-types'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Pencil, Video } from 'lucide-react'
import Image from 'next/image'

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

  return (
    <div className="w-full max-w-4xl mx-auto p-6 flex flex-col gap-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition duration-300 ease-in-out"
      >
        <ArrowLeft className="size-6 mr-2" />
        Back to Dashboard
      </Link>
      <div className="relative w-full aspect-video overflow-hidden border border-gray-700">
        <Image
          src={(course.image as Media).url as string}
          alt={course.title}
          fill={true}
          className="object-cover"
        />
      </div>
      <h1 className="text-3xl font-bold">{course.title}</h1>
      <p className="text-gray-500">{course.description}</p>

      <div>
        <h2 className="text-xl font-semibold mt-6 mb-2">Curriculum</h2>
        <div className="flex flex-col gap-4">
          {course.curriculum?.map((item, index) => {
            if (item.blockType === 'video') {
              return (
                <div key={index} className="p-4 bg-gray-200 rounded-md">
                  <div className="text-teal-500 font-semibold flex items-center gap-2">
                    <Video className="size-6" />
                    {item.title}
                    <div className="text-sm text-gray-400">{item.duration} min</div>
                  </div>
                </div>
              )
            }
            if (item.blockType === 'quiz') {
              return (
                <div key={index} className="p-4 bg-gray-200 rounded-md">
                  <div className="text-rose-700 font-semibold flex items-center gap-2">
                    <Pencil className="size-6" />
                    {item.title}
                    <div className="text-sm text-gray-400">
                      Questions: {item.questions.length || 0}
                    </div>
                  </div>
                </div>
              )
            }
            // if none of those
            return null
          })}
        </div>
      </div>
    </div>
  )
}

export default CoursePage
