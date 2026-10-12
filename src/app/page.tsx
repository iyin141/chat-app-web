import React from 'react'
import Home from './Home/page'
import Redirect from './Home/components/Redirect'

const Page = () => {
  return (
    <div>
      <Redirect />
      <Home />
    </div>
  )
}

export default Page
