import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'programme',
  title: 'Programme',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Programme Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'code',
      title: 'Programme Code',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
})