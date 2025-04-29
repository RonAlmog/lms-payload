import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { getUser } from '../actions/get-user'
import { Course, Media } from '@/payload-types'
import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Dashboard = async () => {
  const payload = await getPayload({ config: configPromise })

  // get the user
  const user = await getUser()

  // get courses
  let courses: Course[] = []

  try {
    // filter courses to only show courses belong to this user
    let coursesRes = await payload.find({
      collection: 'courses',
      limit: 10,
      overrideAccess: false,
      user: user,
    })
    courses = coursesRes.docs
  } catch (e) {
    console.log(e)
  }

  return (
    <div className="flex flex-col mx-auto w-full max-w-4xl p-4 gap-4">
      <div className="text-xl">
        Welcome <span className="text-gray-400">{user?.email}</span>
      </div>
      <div className="text-sm text-teal-400">All Courses</div>
      <div className="grid grid-cols-2 gap-4">
        <Suspense fallback={<div>Loading...</div>}>
          {courses.map((course) => {
            return (
              <Link
                href={`/dashboard/course/${course.id}`}
                key={course.id}
                className="flex flex-col cursor-pointer relative border border-gray-700 hover:border-white transition ease-in-out duration-100 overflow-hidden"
              >
                <div className="relative w-full aspect-video">
                  <Image
                    alt={`${course.title} thumbnail`}
                    src={(course.image as Media).url!}
                    width="500"
                    height="300"
                    objectFit="contain"
                  />
                </div>
              </Link>
            )
          })}
        </Suspense>
      </div>
    </div>
  )
}

export default Dashboard
