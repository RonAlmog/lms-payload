'use client'
import { Course, Participation } from '@/payload-types'
import { useState } from 'react'
import Curriculum from './curriculum'
import CourseModule from './course-module'

interface Props {
  participation: Participation
}
export default function CourseViewer({ participation }: Props) {
  const [currentProgress, setCurrentProgress] = useState(participation.progress ?? 0)

  const course: Course = participation.course as Course

  console.log({ course })

  async function handleComplete(nextIndex: number) {
    setCurrentProgress(nextIndex)
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <CourseModule
        onCompleted={handleComplete}
        module={course.curriculum?.[currentProgress] ?? null}
        participation={participation}
      />
      <Curriculum course={course} currentProgress={currentProgress} />
    </div>
  )
}
