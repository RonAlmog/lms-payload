'use client'

import { Participation } from '@/payload-types'
import { useEffect, useState } from 'react'
import NextButton from './next-button'
import { markProgress } from '../actions/mark-progress'
import { HiArrowRight } from 'react-icons/hi2'

interface QuizModuleProps {
  module: any
  participation: Participation
  onCompleted: (nextIndex: number) => void
}

export default function QuizModule({ module, participation, onCompleted }: QuizModuleProps) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [userAnswers, setUserAnswers] = useState([])
  const [allAnswersCorrect, setAllAnswersCorrect] = useState(false)

  // run setEmptyUserAnswrs on start
  useEffect(() => {
    setEmptyUserAnswers()
  }, [])

  function setEmptyUserAnswers() {
    let temp = []

    temp = module.questions.map((question: any) => {
      return question.answers.map(() => {
        return false
      })
    })

    setUserAnswers(temp)
  }

  function checkAnswer(i: number) {
    let correct = true
    let length = module.questions[i].answers.length

    for (let n = 0; n < length; n++) {
      let val = module.questions[i].answers[n].correct
      // console.log('answer', i, val, userAnswers[i][n])
      if (val !== userAnswers[i][n]) {
        correct = false
      }
    }
    return correct
  }

  function checkAllAnswers() {
    for (let i = 0; i < module.questions.length; i++) {
      if (!checkAnswer(i)) {
        return false
      }
    }
    return true
  }

  async function handleNextModule() {
    setLoading(true)
    try {
      let updatedParticipation = await markProgress(participation)
      if (updatedParticipation && updatedParticipation.progress) {
        onCompleted(updatedParticipation.progress)
      } else {
        console.error('Failed to update participation progress')
      }
    } catch (error) {
      console.error('Error marking progress:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <h2>{module.title}</h2>
      <div className="relative w-full aspect-video border-white overflow-y-auto p-6">
        {module.questions.map((question: any, index: number) => (
          <div key={index} className="flex flex-col gap-4 mb-6">
            <p className="font-bold">
              {index + 1}. {question.question}
            </p>
            {question.answers.map((answer: any, answerIndex: number) => {
              return (
                <div className="flex items-center cursor-pointer" key={`${index}-${answerIndex}`}>
                  <input
                    type="checkbox"
                    id={`answer-${index}-${answerIndex}`}
                    onClick={(e) => {
                      setMessage('')
                      let tempAns = JSON.parse(JSON.stringify(userAnswers))
                      tempAns[index][answerIndex] = e.currentTarget.checked
                      setUserAnswers(tempAns)
                    }}
                    className=" h-4 w-4 text-teal-500 bg-gray-100 rounded-full focus:ring-2 focus:ring-teal-400"
                  />
                  <label
                    htmlFor={`answer-${index}-${answerIndex}`}
                    className="ml-4 text-2xl font-medium text-gray-300"
                  >
                    {answer.answer}
                  </label>
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {message && <div className="text-red-500 p-2 font-bold">{message}</div>}

      <div className="flex flex-col gap-4 justify-center">
        {allAnswersCorrect ? (
          <NextButton loading={loading} text="Next" onClick={handleNextModule} />
        ) : (
          <button
            disabled={allAnswersCorrect}
            className={`${allAnswersCorrect ? 'btn-primary-outline' : 'btn-primary'}`}
            onClick={() => {
              console.log('userAnswers', userAnswers)
              if (checkAllAnswers()) {
                setUserAnswers([])
                setAllAnswersCorrect(true)
              } else {
                setMessage(
                  'Not all answers are correct. Please check your answers again. Multiple answers can be correct.',
                )
              }
            }}
          >
            <div className="flex gap-2 items-center">
              <span>Check Answers</span>
              <HiArrowRight className="h-4 w-4" />
            </div>
          </button>
        )}
      </div>
    </div>
  )
}
