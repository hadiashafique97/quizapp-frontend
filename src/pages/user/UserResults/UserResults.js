import { message, Table } from 'antd'
import React, { useEffect } from 'react'
import PageTitle from '../../../Components/PageTitle'
import { useDispatch } from "react-redux"
import { getAllResultsByUser } from '../../../services/Result-api'
import { ShowSpinner, HideSpinner } from "../../../reducers/spinnerSlice"
import moment from "moment"

function UserResults() {
    const [resultsData, setResultsData] = React.useState([])
    const dispatch = useDispatch()
    const columns = [
        {
            title: "Test Name",
            dataIndex: 'testName',
            render : (text, record)=> <>
            {record.test.name}
            </>
        },
        {
            title: "Date",
            dataIndex: 'date',
            render : (text, record)=> <>{
                moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss")
            }
             
            </>
        },

         {
            title: "Total Questions",
            dataIndex: 'totalScore',
            render : (text, record)=> <>
            {record.test.totalScore}
            </>
        },
        {
            title: "Your Score",
            dataIndex: 'correctAnswers',
            render : (text, record)=> <>
            {record.result.correctAnswers.length}
            </>
        },

       
        {
            title: "Passing Score",
            dataIndex: 'correctAnswers',
            render : (text, record)=> <>
            {record.test.passingScore}
            </>
        },
        {
            title: "Final Result",
            dataIndex: 'finalResult',
            render : (text, record)=> <>
            {record.result.finalResult}
            </>
        },
    ]
    const getData = async () => {
        try {
            dispatch(ShowSpinner())
            const response = await getAllResultsByUser()
            if (response.success) {
                setResultsData(response.data)
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
        getData()
    }, [])

    return (
        <div>
            <PageTitle title="Results" />
            <div className='divider'></div>
            <Table columns={columns} dataSource={resultsData} />
        </div>
    )
}

export default UserResults