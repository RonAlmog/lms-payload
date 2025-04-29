import { Label } from '@radix-ui/react-dropdown-menu'
import { CollectionConfig } from 'payload'
import { VideoBlock } from "./blocks/VideoBlock"
import { QuizBlock } from "./blocks/QuizBlock"

export const Courses: CollectionConfig = {
  slug: 'courses',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      label: 'Image',
      type: 'relationship',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'curriculum',
      label: 'Curriculum',
      type: 'blocks',
      blocks: [VideoBlock, QuizBlock],
    },
  ],
}
