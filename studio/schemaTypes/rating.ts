import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'rating',
  title: 'Rating',
  type: 'document',
  fields: [
    defineField({
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{type: 'user'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'paper',
      title: 'Paper',
      type: 'reference',
      to: [{type: 'paper'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Rating Value',
      type: 'number',
      options: {
        list: [1, 2, 3, 4, 5],
      },
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'comment',
      title: 'Comment',
      type: 'text',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeStep: 15,
      },
      readOnly: true,
      initialValue: (new Date()).toISOString(),
    }),
  ],
})