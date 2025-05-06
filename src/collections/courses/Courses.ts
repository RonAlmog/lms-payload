import { CollectionConfig } from 'payload';
import { VideoBlock } from "./blocks/VideoBlock";
import { QuizBlock } from "./blocks/QuizBlock";
import { FinishBlock } from "./blocks/FinishBlock";

export const Courses: CollectionConfig = {
  slug: 'courses',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    // read allowed for any authenticated user
    read: ({ req: { user } }) => {
      return Boolean(user);
    },
    // allowed only for users (allowed in admin system), not customers
    create: ({ req: { user } }) => {
      return user?.collection === "users";
    },
    update: ({ req: { user } }) => {
      return user?.collection === "users";
    },
    delete: ({ req: { user } }) => {
      return user?.collection === "users";
    }
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
      required: true,
      blocks: [VideoBlock, QuizBlock, FinishBlock],
    },
  ],
};
