import React from 'react'

function TestInstructions({ testData, setView, startTimer }) {
    return (
        <div className='flex flex-col'>
            <h1 className='text-xl underline mtop3 text-center'>
                Instructions
            </h1>
            <div className='tile ptop1'>
                <ol className="flex flex-col gap1">
                    <li> Test needs to be completed within {testData.duration} minutes <i className="ri-timer-fill"></i></li>
                    <li> Test will automatically be submitted once the {testData.duration} seconds <i className="ri-timer-fill"></i> has timed out</li>
                    <li> Answers cannot be changed once submitted, Sorry <i className="ri-emotion-sad-fill"></i> </li>
                    <li>  <i className="ri-alert-fill"></i> DO NOT REFRESH THE PAGE WHILE TAKING THE TEST <i className="ri-alert-fill"></i> </li>
                    <li>You can use the <span className='font-bold'> <i className="ri-skip-back-mini-fill">"Previous"</i></span> and {" "} <span className='font-bold'>"Next"<i className="ri-skip-forward-mini-fill"></i> buttons to go in between the questions</span></li>
                    <li>
                        Total Score you can get on the test is <span className='font-bold'>{testData.totalScore} <i className="ri-ruler-fill"></i> points</span>.
                    </li>
                    <li>
                        You will need a Score of <span className='font-bold'>{testData.passingScore} <i className="ri-ruler-fill"></i> points in order to pass the test</span>.
                    </li>
                    <li>Click on the Start Test button to go to your test </li>
                    <li>LAST BUT NOT LEAST GOODLUCK <i className="ri-thumb-up-fill"></i></li>
                </ol>

            </div>
            <div className='flex justify-end ptop2'>
                <button className='create-button' onClick={() => {
                    startTimer()
                    setView("questions")
                }}> Start Test
                </button>
            </div>

        </div>
    )
}

export default TestInstructions