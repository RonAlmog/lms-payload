import { Course, Participation } from '@/payload-types'
import { useState } from 'react'
import NextButton from './next-button'
import axios from 'axios'

interface FinishModuleProps {
  participation: Participation
}

export default function FinishModule({ participation }: FinishModuleProps) {
  const [loading, setLoading] = useState(false)

  async function handlePrint() {
    setLoading(true)
    try {
      let course: Course = participation.course as Course

      let resp = await axios.get(`/printCertificate/${participation.id}`, {
        responseType: 'blob', // THIS is very important, because we need Blob object in order to download PDF
      })
      // here we create a link with url click it for the user.
      // the result will be the file downloaded
      const url = window.URL.createObjectURL(resp.data)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `Certificate_${course.title.replace(' ', '_')}.pdf`)
      document.body.appendChild(link)
      link.click()
    } catch (error) {
      console.error('Error printing certificate:', error)
    }
    setLoading(false)
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Congratulations!</h1>
      <p className="text-gray-400">You have completed the course.</p>
      <NextButton loading={loading} text="Download Certificate" onClick={handlePrint} />
    </div>
  )
}
