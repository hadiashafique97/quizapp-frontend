import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { HideSpinner, ShowSpinner } from '../../../reducers/spinnerSlice'
import { getTestById } from '../../../services/Test-api'
import TestInstructions from './TestInstructions'

function WriteTest() {
    const [testData, setTestData] = React.useState(null)
    const [questions = [], setQuestions] = React.useState([])
    const [selectedQuestionIndex, setSelectedQuestionIndex] = React.useState(0)
    const [selectedChoices, setSelectedChoices] = React.useState({})
    const [result= {}, setResult] = React.useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const [view, setView] = useState("instructions")
    const getTestsData = async () => {
        try {
            dispatch(ShowSpinner())
            const response = await getTestById({ testId: params.id })
            dispatch(HideSpinner())
            if (response.success) {
                setQuestions(response.data.questions)
                setTestData(response.data)

                
            } else {
                message.error(response.message)
            }
        } catch (error) {
            dispatch(HideSpinner())
            message.error(error.message)
        }
    }
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
            {view === "instructions" && ( <TestInstructions testData={testData}
                setView={setView}
            />)}
            {view === "questions" && (
                <div className='flex flex-col ptop2  mtop3 gap2'>
                    <h1 className='text-2xl'>
                        {selectedQuestionIndex + 1} : {questions[selectedQuestionIndex].name}
                    </h1>
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
                                {selectedQuestionIndex < questions.length -1 && (
                            <i className="ri-skip-forward-mini-fill" onClick={() => {
                                setSelectedQuestionIndex(selectedQuestionIndex + 1 )
                            }}> Next</i>
                            )}
                            </div>
                            
                        </div>
                    </div>
                </div>

            )}
            {view === "result" && (
            <div>   
                <h1 className='text-2xl'>
                    RESULT 
                </h1>
                <div className='score'>
                    <h1 className='text-md'>
                        Total Score : {testData.totalScore}
                    </h1>
                    <h1 className='text-md'>
                        Your Score : 
                    </h1>
                    <h1 className='text-md'>
                        VERDICT : {}
                    </h1>
                </div>



            </div>)}
        </div>
    )
}

export default WriteTest