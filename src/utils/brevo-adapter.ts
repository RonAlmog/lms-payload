import axios from 'axios'
import { EmailAdapter, SendEmailOptions } from 'payload'

const brevoAdapter = (): EmailAdapter => {
  const adapter = () => ({
    name: 'brevo',
    defaultFromAddress: process.env.BREVO_SENDER_EMAIL as string,
    defaultFromName: process.env.BREVO_SENDER_NAME as string,
    sendEmail: async (message: SendEmailOptions): Promise<unknown> => {
      //   if (!process.env.BREVO_EMAILS_ACTIVE) {
      //     console.log('Emails disabled, logging to console')
      //     console.log(message)
      //     return
      //   }

      console.log('sending message')

      try {
        const res = await axios({
          method: 'post',
          url: 'https://api.brevo.com/v3/smtp/email',
          headers: {
            'api-key': process.env.BREVO_API_KEY as string,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          data: {
            sender: {
              name: process.env.BREVO_SENDER_NAME as string,
              email: process.env.BREVO_SENDER_EMAIL as string,
            },
            to: [
              {
                email: message.to,
                name: 'username',
              },
            ],
            subject: message.subject,
            HtmlContent: message.html,
          },
        })

        return res.data
      } catch (error) {
        console.log('Error while sending email', error)
      }
    },
  })

  return adapter
}

export default brevoAdapter
