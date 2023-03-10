import { Form, message, Modal } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import React from 'react'
import { useDispatch } from 'react-redux'
import { HideSpinner, ShowSpinner } from '../../../reducers/spinnerSlice'
import { addingAQuestion, editQuestionById } from '../../../services/Test-api'

function CreateEditQuestion({ setShowCreateEditQuestion, showCreateEditQuestion, refreshData, testId, selectedQuestion, setSelectedQuestion }) {
    const dispatch = useDispatch()
    const onFinish = async (values) => {
        try {
            dispatch(ShowSpinner())
            const requiredPayload = {
                name: values.name,
                correctAnswer: values.correctAnswer,
                choices: {
                    A: values.A,
                    B: values.B,
                    C: values.C,
                    D: values.D,
                },
                test: testId,
            }
            let response
            if(selectedQuestion){
                response = await editQuestionById({
                    ...requiredPayload,
                    questionId: selectedQuestion._id,
                })
            }else{
                response = await addingAQuestion(requiredPayload)
            }
            if (response.success) {
                message.success(response.message)
                refreshData()
                setShowCreateEditQuestion(false)
            } else {
                message.error(response.message)
            }
            setSelectedQuestion(null)
            dispatch(HideSpinner())
        } catch (error) {
            dispatch(HideSpinner())
            message.error(error.message)
        }
    }


    return (
        <Modal title={selectedQuestion ? "Edit Question" : "Add Question"} open={showCreateEditQuestion} footer={false} onCancel={() => {setShowCreateEditQuestion(false)
            setSelectedQuestion(null)
        }}>
            <div className="divider2 mbot1" > </div>
            <Form onFinish={onFinish} layout="horizontal"
            initialValues={{
                name: selectedQuestion?.name,
                A: selectedQuestion?.choices?.A,
                B: selectedQuestion?.choices?.B,
                C: selectedQuestion?.choices?.C,
                D: selectedQuestion?.choices?.D,
                correctAnswer: selectedQuestion?.correctAnswer,
            }}
            
            
            >
                <Form.Item name="name" label="Question">
                    <input type="text" />
                </Form.Item>
                <Form.Item name="correctAnswer" label="Correct Answer">
                    <input type="text" />
                </Form.Item>
                <div className='flex'>
                    <Form.Item name="A" label="A">
                        <input type="text" />
                    </Form.Item>
                    <Form.Item name="B" label="B">
                        <input type="text" />
                    </Form.Item>

                </div>
                <div className='flex'>
                    <Form.Item name="C" label="C">
                        <input type="text" />
                    </Form.Item>
                    <Form.Item name="D" label="D">
                        <input type="text" />
                    </Form.Item>

                </div>
                <div className='flex justify-end gap1'>
                    <button className='create-button ptop2' type='button' onClick={() => setShowCreateEditQuestion(false)}>
                        Cancel
                    </button>
                    <button className='create-button ptop2'>Save</button>
                </div>



            </Form>


        </Modal>
    )
}

export default CreateEditQuestion