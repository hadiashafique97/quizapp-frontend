import React from 'react'
import { useNavigate } from 'react-router-dom'
import PageTitle from '../../../Components/PageTitle'
function Test() {
    const navigate = useNavigate()
    return (
        <div>
            <div className='flex justify-between mtop2'>
                <PageTitle title="Tests"/>
                <button className='create-button flex item-center' onClick={()=> navigate("/admin/tests/add")}>
                    <i className='ri-add-line'></i>
                    Create Test
                </button>
            </div>
        </div>
    )
}

export default Test