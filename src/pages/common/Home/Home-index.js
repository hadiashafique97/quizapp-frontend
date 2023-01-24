import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getAllTests } from '../../../services/Test-api'
import { ShowSpinner, HideSpinner } from '../../../reducers/spinnerSlice'
import { Col, message, Row } from 'antd'
import PageTitle from "../../../Components/PageTitle"
import { useNavigate } from 'react-router-dom'

function Home() {
  const [tests, setTests] = React.useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.users)
  // const [user, setUser] = React.useState(null)

  const getTests = async () => {
    try {
      dispatch(ShowSpinner())
      const response = await getAllTests()
      if (response.success) {
        setTests(response.data)
      } else {
        message.error(response.message)
      }
      dispatch(HideSpinner())
    } catch (error) {
      dispatch(HideSpinner())
      message.error(error.message)
    }
  }
  useEffect(() => {
    getTests()
  }, [])

  return (
    <div>
      {user ? <PageTitle title={
        `Hello There ${user.name}, Welcome to TEST ME`
      }/> : <div> error: "Error occurred" </div>}
     
      <div className="p-bottom3"> <div className='divider'></div></div>
        <Row gutter={[16,16]}>
          {tests.map((test)=>(
            <Col span={6}>
              <div className='tile flex flex-col gap1 p2'>
                <h1 className='text-xl'>
                 <b>{test?.name}</b>
                 <div className='divider2 ptop1'></div>
                </h1>
                <h1 className='text-sm'>
                  Category: {test.category}
                </h1>
                <h1 className='text-sm'>
                Total Score: {test.totalScore}
                </h1>
                <h1 className='text-sm'>
                Passing Score: {test.passingScore}
                </h1>
                <h1 className='text-sm'>
                Duration: {test.duration}
                </h1>
                <button className='create-button' onClick={()=> navigate(`/user/write-test/${test._id}`)}>
                  Attempt Test
                </button>
              </div>


            </Col>
          ))}



        </Row>
        
      
    </div>
  )
}

export default Home