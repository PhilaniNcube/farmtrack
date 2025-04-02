import React from 'react'

const loading = () => {
  return (
    <div className='p-6'>
        <div className="flex justify-between">
            <div className="flex flex-col">
                <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse mt-2"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse"></div>
        </div>
    </div>
  )
}

export default loading