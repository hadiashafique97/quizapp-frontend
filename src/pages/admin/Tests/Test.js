import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PageTitle from '../../../Components/PageTitle'
import { message, Table } from "antd"
import { useDispatch } from 'react-redux'
import { HideSpinner, ShowSpinner } from '../../../reducers/spinnerSlice'
import { deleteTestById, getAllTests } from '../../../services/Test-api'

function Test() {
    const navigate = useNavigate()
    const [tests, setTests] = React.useState([])
    const dispatch = useDispatch()

    const getTestsData = async () => {
        try {
            dispatch(ShowSpinner())
            const response = await getAllTests()
            dispatch(HideSpinner())
            if (response.success) {
                setTests(response.data)
            } else {
                message.error(response.message)
            }
        } catch (error) {
            dispatch(HideSpinner())
            message.error(error.message)
        }
    }
    const deleteTest = async (testId) => {
        try {
            dispatch(ShowSpinner())
            const response = await deleteTestById({
                testId,
            })
            dispatch(HideSpinner())
            if (response.success) {
                message.success(response.message)
                getTestsData()
            } else {
                message.error(response.message)
            }
        } catch (error) {
            dispatch(HideSpinner())
            message.error(error.message)
        }
    }
    const columns = [
        {
            title: "Test Name",
            dataIndex: "name",
        },
        {
            title: "Duration",
            dataIndex: "duration",
        },
        {
            title: "Category",
            dataIndex: "category",
        },
        {
            title: "Total Score",
            dataIndex: "totalScore",
        },
        {
            title: "Passing Score",
            dataIndex: "passingScore",
        },
        {
            title: "Edit/Delete",
            dataIndex: "edit/delete",
            render: (text, record) => (
                <div className='flex gap2'>
                    <i className="ri-pencil-fill" onClick={() => navigate(`/admin/tests/edit/${record._id}`)}></i>
                    <i className="ri-delete-bin-3-fill" onClick={()=> deleteTest(record._id)}></i>
                </div>
            )
        },

    ]


    useEffect(() => {
        getTestsData()
    }, [])
    return (
        <div>
            <div className='flex justify-between mtop1  item-end '>
                <PageTitle title="Tests" />
                <div className='p-bottom1'>
                <button className='create-button flex item-center' onClick={() => navigate("/admin/tests/add")}>
                    <i className='ri-add-line'></i>
                    Create Test
                </button>
                </div>
            </div>
            <div className="divider2"> </div>
            <div className='flex m1'>
                 <Table columns={columns} dataSource={tests} />
            </div>
           

        </div>
    )
}

export default Test