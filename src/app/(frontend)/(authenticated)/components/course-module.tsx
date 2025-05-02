import { Participation } from '@/payload-types'

interface Props {
  module: any
  participation: Participation
  onCompleted: (nextIndex: number) => void
}
export default function CourseModule({ module, participation, onCompleted }: Props) {
  switch (module.blockType) {
    case 'xx':
      break

    default:
      return <div>unkown module type</div>
      break
  }
}
