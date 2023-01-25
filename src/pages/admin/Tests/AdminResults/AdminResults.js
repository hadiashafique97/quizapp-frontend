import { message, Table } from 'antd'
import React, { useEffect } from 'react'
import PageTitle from '../../../../Components/PageTitle'
import { useDispatch } from "react-redux"
import { getAllResultsByUser } from '../../../../services/Result-api'
import { ShowSpinner, HideSpinner } from "../../../../reducers/spinnerSlice"
import { getAllResults } from '../../../../services/Result-api'
import moment from "moment"

function AdminResults() {
    const [resultsData, setResultsData] = React.useState([])
    const [filters, setFilters] = React.useState({
        testName : "",
        userName : "",
    })
    const dispatch = useDispatch()
    const columns = [
        {
            title: "User Name",
            dataIndex: 'userName',
            render : (text, record)=> <>
            {record.user.name}
            </>
        },
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
    const getData = async (tempFilters) => {
        try {
            dispatch(ShowSpinner())
            const response = await getAllResults(tempFilters)
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
        getData(filters)
    }, [])

    return (
        <div>
            <PageTitle title="Results" />
            <div className='divider'></div>
            <div className="flex m2 mbot1 gap2 w50 justify-center item-center">
                <input type ="text" placeholder='Test'
                value={filters.testName}
                onChange={(e)=> setFilters({...filters, testName : e.target.value})}
                />
                <input type ="text" placeholder='User'
                value={filters.userName}
                onChange={(e)=> setFilters({...filters, userName : e.target.value})}/>
                <div className=' flex gap1'>
                <button className='create-button'
                onClick={()=>getData(filters)}
                >
                    Search
                </button>
                <button className='create-button'
                onClick={()=> {
                    setFilters({
                        testName: "", 
                        userName: "",
                    })
                    getData({
                        testName: "", 
                        userName: "",
                    })
                }}
                >
                   Clear
                </button>
                </div>
            </div>
            <Table className="flex mt2 gap2"columns={columns} dataSource={resultsData} />
        </div>
    )
}

export default AdminResults