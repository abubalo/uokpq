import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'paper',
  title: 'Paper',
  type: 'document',
  fields: [
    defineField({
      name: 'moduleTitle',
      title: 'Module Title',
      type: 'string',
      description: 'Descriptive title for the paper',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'moduleCode',
      title: 'Module Code',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pdfFile',
      title: 'PDF File',
      type: 'file',
      options: {
        accept: '.pdf',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'dateTaken',
      title: 'Date Taken',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'reference',
      to: [{type: 'department'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'programme',
      title: 'Programme',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'programme'}],
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'level',
      title: 'Level',
      type: 'number',
      options: {
        list: [
          {title: 'Level 1', value: 1},
          {title: 'Level 2', value: 2},
          {title: 'Level 3', value: 3},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'trimester',
      title: 'Trimester',
      type: 'number',
      options: {
        list: [
          {title: 'Trimester 1', value: 1},
          {title: 'Trimester 2', value: 2},
          {title: 'Trimester 3', value: 3},
          {title: 'Trimester 4', value: 4},
          {title: 'Trimester 5', value: 5},
          {title: 'Trimester 6', value: 6},
          {title: 'Trimester 7', value: 7},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lecturer',
      title: 'Lecturer',
      type: 'reference',
      to: [{type: 'lecturer'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'paperType',
      title: 'Paper Type',
      type: 'string',
      description: 'E.g, Exam, CAT',
      options: {
        list: [
          {title: 'Final Exam', value: 'exam'},
          {title: 'CAT', value: 'cat'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'session',
      title: 'Session',
      type: 'string',
      description: 'E.g., Day, Evening, Weekend',
      options: {
        list: [
          {title: 'Day', value: 'day'},
          {title: 'Evening', value: 'evening'},
          {title: 'Weekend', value: 'weekend'},
        ],
      },
    }),
    defineField({
      name: 'uploadedBy',
      title: 'Uploaded By',
      type: 'reference',
      to: [{type: 'user'}],
      //   readOnly: true,
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'isArchived',
      title: 'Archived',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  initialValue: {
    isArchived: false,
  },
  preview: {
    select: {
      moduleTitle: 'moduleTitle',
      moduleCode: 'moduleCode',
      department: 'department.name',
      trimester: 'trimester',
      paperType: 'paperType',
      media: 'thumbnail',
    },
    prepare({moduleTitle, moduleCode, department, trimester, paperType, media}) {
      const title = moduleCode ? `${paperType}: ${moduleCode}-${moduleTitle}` : moduleTitle
      const trimesterDisplay = trimester ? `Trimester ${trimester}` : ''

      return {
        title,
        subtitle: [department, paperType, trimesterDisplay].filter(Boolean).join(' • '),
        media,
      }
    },
  },
})
