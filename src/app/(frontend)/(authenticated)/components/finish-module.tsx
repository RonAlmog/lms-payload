import { Participation } from '@/payload-types'
import { useState } from 'react'
import NextButton from './next-button'

interface FinishModuleProps {
  participation: Participation
}

export default function FinishModule({ participation }: FinishModuleProps) {
  const [loading, setLoading] = useState(false)

  const handleDownload = async () => {
    console.log('download')
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Congratulations!</h1>
      <p className="text-gray-400">You have completed the course.</p>
      <NextButton loading={loading} text="Download Certificate" onClick={handleDownload} />
    </div>
  )
}
