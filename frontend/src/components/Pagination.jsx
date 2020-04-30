import React from 'react'

export default function Pagination(props) {
    return (
        <div >
            {
                props.gotoPageBTN
                &&
                <button className='btn btn-outline-dark' onClick={props.gotoPageBTN}>{props.name}</button>
            }
        </div>
    )
}
