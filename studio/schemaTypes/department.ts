import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'department',
  title: 'Department',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Department Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'code',
      title: 'Department Code',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
})