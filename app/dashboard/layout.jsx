import React from 'react'
import Header from './_components/Header'

const layout = ({children}) => {
  return (
    <div>
    <Header />
    <div className='px-7 py-9'>
      {children}
    </div>
      
    </div>
  )
}

export default layout
