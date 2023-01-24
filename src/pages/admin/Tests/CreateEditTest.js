import { Col, Form, message, Row, Table, Tabs, } from 'antd'

import React, { useEffect } from 'react'
import PageTitle from '../../../Components/PageTitle'
import { addTest, editTestById, getTestById } from '../../../services/Test-api'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ShowSpinner, HideSpinner } from '../../../reducers/spinnerSlice'
import CreateEditQuestion from './CreateEditQuestion'
const { TabPane } = Tabs

function CreateEditTest() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const [testData, setTestData] = React.useState(null)
  const [showCreateEditQuestion, setShowCreateEditQuestion] = React.useState(false)
  const [selectedQuestion, setselectedQuestion] =React.useState(null)



  const onFinish = async (values) => {
    try {
      dispatch(ShowSpinner())
      let response

      if (params.id) {
        response = await editTestById({
          ...values, testId: params.id,
        })
      } else {
        response = await addTest(values)
      }

      if (response.success) {
        message.success(response.message)
        navigate("/admin/tests")
      } else {
        message.error(response.message)
        dispatch(HideSpinner())
      }
    } catch (error) {
      dispatch(HideSpinner())
      message.error(error.message)
    }
  }
  const getTestsData = async () => {
    try {
      dispatch(ShowSpinner())
      const response = await getTestById({ testId: params.id })
      dispatch(HideSpinner())
      if (response.success) {
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
  const questionsColumns = [
    {
      title: "Question",
      dataIndex: "name",
    },
    {
      title: "Choices",
      dataIndex: "choices",
      render: (text, record) =>{
       return Object.keys(record.choices).map((key)=>{
        return <div>{key} : {record.choices[key]}</div>
       })
      }
    },
    {
      title: "Correct Answer",
      dataIndex: "correctAnswer",
      render: (text, record)=>{
        return `${record.correctAnswer} : ${record.choices[record.correctAnswer]}`
      }
    },

    {
      title: "Edit/Delete",
      dataIndex: "edit/delete",
      render: (text, record) => (
        <div className='flex gap3'>
          <i className="ri-pencil-fill" onClick={() => {setselectedQuestion(record)
          setShowCreateEditQuestion(true)}}></i>
          <i className="ri-delete-bin-3-fill" ></i>
        </div>
      )
    },
  ]
  return (
    <div>
      <div className="mtop1"> <PageTitle title={params.id ? "Edit Test" : "Create Test"} /></div>

      <div className="divider2"> </div>
      {(testData || !params.id) && (<Form layout="horizontal" className="ptop1" onFinish={onFinish}
        initialValues={testData}
      >
        <Tabs defaultActiveKey='1'>
          <TabPane tab="Test Info" key="1">
            <Row gutter={[10, 10]}>
              <Col span={8}>
                <Form.Item label="Test Name" name="name">
                  <input type="text" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Test Duration" name="duration">
                  <input type="number" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Category" name="category">
                  <select name="" id="">
                    <option value="">Select Category</option>
                    <option value="Javascript">JavaScript</option>
                    <option value="React">React</option>
                    <option value="Express">Express</option>
                    <option value="Interview">Interview</option>
                    <option value="Node">Node</option>
                  </select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Total Score" name="totalScore">
                  <input type="number" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Passing Score" name="passingScore">
                  <input type="number" />
                </Form.Item>
              </Col>
            </Row>
            <div className='flex justify-end  gap1'>
              <button className='create-button ptop2' type='submit'>Save</button>
              <button className='create-button ptop2' type='button' onClick={() => navigate("/admin/tests")}>Cancel</button>
            </div>
          </TabPane>
          {params.id && (
            <TabPane tab="Test Questions?" key="2">
              <div className='flex justify-end'>

                <button className='create-button ptop2' type='button' onClick={() => setShowCreateEditQuestion(true)} >Add Question?</button>
              </div>

              <Table columns={questionsColumns}
              dataSource={testData?.questions || []} />
            </TabPane>
          )}

        </Tabs>


      </Form>
      )}
      {showCreateEditQuestion && <CreateEditQuestion
        setShowCreateEditQuestion={setShowCreateEditQuestion}
        showCreateEditQuestion={showCreateEditQuestion}
        testId={params.id}
        refreshData={getTestsData}

      />}
    </div>
  )
}

export default CreateEditTest