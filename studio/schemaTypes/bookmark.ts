import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'bookmark',
  title: 'Bookmark',
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
  preview: {
    select: {
      userName: 'user.name',
      paperTitle: 'paper.title',
      date: 'createdAt',
    },
    prepare(selection) {
      const {userName, paperTitle, date} = selection
      return {
        title: `${userName} - ${paperTitle}`,
        subtitle: new Date(date).toLocaleDateString(),
      }
    },
  },
})