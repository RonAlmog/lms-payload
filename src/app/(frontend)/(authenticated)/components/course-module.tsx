import { Participation } from '@/payload-types'
import VideoModule from './video-module'

interface Props {
  module: any
  participation: Participation
  onCompleted: (nextIndex: number) => void
}
export default function CourseModule({ module, participation, onCompleted }: Props) {
  switch (module.blockType) {
    case 'video':
      return <VideoModule module={module} participation={participation} onCompleted={onCompleted} />
      break

    default:
      return <div>unknown module type {module.blockType}</div>
      break
  }
}
