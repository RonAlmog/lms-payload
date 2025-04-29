import { Block } from 'payload'

export const QuizBlock: Block = {
    slug: 'quiz',
    labels: {
        singular: "Quiz",
        plural: "Quizes",
    },
    fields: [
        {
            name: "title",
            type: "text",
            label: "Title",
            required: true
        },
        {
            name: "questions",
            label: "Questions",
            type: 'array',
            required: true,
            fields: [
                {
                    name: 'question',
                    label: "Question",
                    type: "text",
                    required: true

                },
                {
                    name: 'answers',
                    label: "Answers",
                    type: "array",
                    fields: [
                        {
                            name: 'answer',
                            label: 'Answer',
                            type: 'text',
                            required: true
                        },
                        {
                            name: 'correct',
                            label: 'Correct',
                            type: "checkbox",
                            required: true
                        }
                    ]
                }
            ]
        },

    ]

}
