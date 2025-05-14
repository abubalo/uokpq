import {defineType, defineField} from 'sanity'

export default  defineType({
  name: 'lecturer',
  title: 'Lecturer',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'reference',
      to: [{type: 'department'}],
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})