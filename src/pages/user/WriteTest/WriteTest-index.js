import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { HideSpinner, ShowSpinner } from '../../../reducers/spinnerSlice'
import { addResult } from '../../../services/Result-api'
import { getTestById } from '../../../services/Test-api'
import TestInstructions from './TestInstructions'

function WriteTest() {
    const [testData, setTestData] = React.useState(null)
    const [questions = [], setQuestions] = React.useState([])
    const [selectedQuestionIndex, setSelectedQuestionIndex] = React.useState(0)
    const [selectedChoices, setSelectedChoices] = React.useState({})
    const [result = {}, setResult] = React.useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const [view, setView] = useState("instructions")
    const [secondsLeft = 0, setSecondsLeft] = useState(0)
    const [timesUp, setTimesUp] = useState(false)
    const [intervalId, setIntervalId] = useState(null)
    const { user } = useSelector(state => state.users)

    const getTestsData = async () => {
        try {
            dispatch(ShowSpinner())
            const response = await getTestById({ testId: params.id })
            dispatch(HideSpinner())
            if (response.success) {
                setQuestions(response.data.questions)
                setTestData(response.data)
                setSecondsLeft(response.data.duration)
            } else {
                message.error(response.message)
            }
        } catch (error) {
            dispatch(HideSpinner())
            message.error(error.message)
        }
    }
    const calculateResult = async () => {
        try {
            let correctAnswers = []
            let wrongAnswers = []

            questions.forEach((question, index) => {
                if (question.correctAnswer === selectedChoices[index]) {
                    correctAnswers.push(question)
                } else {
                    wrongAnswers.push(question)
                }
            })
            let finalResult = "Pass"
            if (correctAnswers.length < testData.passingScore) {
                finalResult = "Fail"
            }
            const tempResult = {
                correctAnswers,
                wrongAnswers,
                finalResult,
            }
            setResult(tempResult)
            dispatch(ShowSpinner())
            const response = await addResult({
                test: params.id,
                result: tempResult,
                user: user._id,

            })
            dispatch(HideSpinner())
            if (response.success) {
                setView("result")
            } else {
                message.error(response.message)
            }
        } catch (error) {
            dispatch(HideSpinner())
            message.error(error.message)
        }

    }

    const startTimer = () => {
        let totalSeconds = testData.duration
        const intervalId = setInterval(() => {
            if (totalSeconds > 0) {
                totalSeconds = totalSeconds - 1
                setSecondsLeft(totalSeconds)

            } else {
                setTimesUp(true)
            }
        }, 1000)
        setIntervalId(intervalId)
    }
    useEffect(() => {
        if (timesUp && view === "questions") {
            clearInterval(intervalId)
            calculateResult()
        }
    }, [timesUp])

    useEffect(() => {
        if (params.id) {
            getTestsData()
        }
    }, [])

    return (
        testData && <div>

            <div className='divider mtop2'>

            </div>
            <div className="mtop1"> <h1 className='text-center'>{testData.name}</h1></div>

            <div className='divider'>
            </div>
            {view === "instructions" && (<TestInstructions testData={testData}
                setView={setView}
                startTimer={startTimer}
            />)}
            {view === "questions" && (
                <div className='flex flex-col ptop2  mtop3 gap2'>
                    <div className='flex justify-between gap2'>
                        <h1 className='text-2xl'>
                            {selectedQuestionIndex + 1} : {questions[selectedQuestionIndex].name}
                        </h1>
                        <div className='timer'>
                            <h1 className='text-2xl'>{secondsLeft}</h1>

                        </div>
                    </div>
                    <div className='flex flex-col ptop2 gap2'>
                        {Object.keys(questions[selectedQuestionIndex].choices).map((choice, index) => {
                            return <div className={`flex gap2 flex-col ${selectedChoices[selectedQuestionIndex] === choice ? "selected-choice" : "choice"}`}
                                key={index}
                                onClick={() => {
                                    setSelectedChoices({
                                        ...selectedChoices,
                                        [selectedQuestionIndex]: choice,
                                    })
                                }}

                            >
                                <h1 className='text-xl'>
                                    {choice} : {questions[selectedQuestionIndex].choices[choice]}
                                </h1>
                            </div>




                        })}
                        <div className='flex justify-between '>
                            <div className=' flex justify-between navbtn'>
                                {selectedQuestionIndex > 0 && (
                                    <i className="ri-skip-back-mini-fill navbtn" onClick={() => {
                                        setSelectedQuestionIndex(selectedQuestionIndex - 1)
                                    }}> Previous </i>
                                )}
                            </div>
                            <div className=' flex justify-between navbtn'>
                                {selectedQuestionIndex < questions.length - 1 && (
                                    <i className="ri-skip-forward-mini-fill" onClick={() => {
                                        setSelectedQuestionIndex(selectedQuestionIndex + 1)
                                    }}> Next</i>
                                )}
                                {selectedQuestionIndex === questions.length - 1 && (
                                    <button className='create-button mtop3 p3' onClick={() => {
                                        setTimesUp(true)
                                        clearInterval(intervalId)


                                    }}>
                                        Submit
                                    </button>
                                )}
                            </div>

                        </div>
                    </div>
                </div>

            )}
            {view === "result" && (
                <div className="flex item-center justify-center m2 ">
                    <div className="flex flex-col gap2 result">


                        <div className='flex flex-row'>
                            <div className='score tile text-center m2 p2'>
                                <h1 className='text-sm'>
                                    Total Score : {testData.totalScore}
                                </h1>
                                <h1 className='text-sm'>
                                    Wrong Answers : {result.wrongAnswers.length}
                                </h1>

                                <h1 className='text-sm'>
                                    Passing Score : {testData.passingScore}
                                </h1>
                                <h1 className='text-md'>
                                    Your Score : {result.correctAnswers.length}
                                </h1>
                                <h1 className='text-l'>
                                    FINAL RESULT : {result.finalResult}
                                </h1>
                                <div className='flex gap2'>
                                    <button className='create-button' onClick={() => {
                                        setView("instructions")
                                        setSelectedQuestionIndex(0)
                                        setSelectedChoices({})
                                        setSecondsLeft(testData.duration)

                                    }}
                                    >
                                        Retry
                                    </button>
                                    <button className=' create-button' onClick={() => {
                                        setView("review")
                                    }}>
                                        Review Answers
                                    </button>
                                </div>

                            </div>
                            <div className=' flex m1 lottie'>
                                {result.finalResult === "Pass" && (<lottie-player src="https://assets5.lottiefiles.com/packages/lf20_ppgwjBSvyJ.json"  background="transparent"  speed="2"  autoplay></lottie-player>
                                )}
                                {result.finalResult === "Fail" && (<lottie-player src="https://assets5.lottiefiles.com/packages/lf20_9xRnlw.json" background="transparent" speed="1" loop autoplay></lottie-player>)}
                            </div>
                        </div>
                        <div className='flex justify-center item-center'>
                            <h1 className='text-2xl '>
                                RESULT
                            </h1>
                        </div>
                    </div>
                </div>)}
            {view === "review" && (
                <div className=' flex flex-col gap2 p1'>
                    {questions.map((question, index) => {
                        const isCorrect = question.correctAnswer === selectedChoices[index]
                        return <div className={`flex flex-col gap1 p1 mtop3 tile ${isCorrect ? "bg-pass" : "bg-fail"}`}>
                            <div className=' flex ptop2'>
                                <h1 className='text-xl'>{index + 1} : {question.name}</h1>
                            </div>
                            <div className='divider 3'></div>
                            <h1 className='text-md'>
                                Answer Chosen : {selectedChoices[index]} - {question.choices[selectedChoices[index]]}
                            </h1>
                            <h1 className='text-md'> Correct Answer : {question.correctAnswer} - {question.choices[question.correctAnswer]}</h1>

                        </div>
                    })}


                    <div className='flex flex-col justify-center gap1 item-center w25'>
                        <button className='create-button' onClick={() => {
                            setView("instructions")
                            setSelectedQuestionIndex(0)
                            setSelectedChoices({})
                            setSecondsLeft(testData.duration)
                        }}
                        >
                            Retry
                        </button>
                        <button className='create-button' onClick={() => {
                            navigate('/')
                        }}>
                            Home
                        </button>
                    </div>

                </div>






            )}



        </div>
    )
}

export default WriteTest