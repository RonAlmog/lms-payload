import { Block } from 'payload'

export const VideoBlock: Block = {
  slug: 'video',
  labels: {
    singular: "Video",
    plural: "Videos",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Title",
      required: true
    },
    {
      name: "duration",
      label: "Duration in min",
      type: "text",
      required: true
    },
    {
      name: "playerUrl",
      label: "Player url",
      type: "text",
      required: true
    }
  ]

}
