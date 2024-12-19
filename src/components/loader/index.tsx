import React from 'react'

const Loader = ({ lg, white }: { lg?: boolean, white?: boolean }) => {
    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: lg ? '80vh' : 'auto'}}>
        <div className={`spinner-border ${white ? "text-white" : 'text-success'} m-2`} style={lg ? { width: "4rem", height: "4rem" } : {}} role="status">
            {/* <span className="sr-only">Loading...</span> */}
        </div>
        </div>
    )
}

export default Loader