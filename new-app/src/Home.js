import React from 'react'
import FadeInOutAnimation from "./Fade"
import Layout from './Layout'

function Home() {
  return (
  <div>
    <Layout />
    {/* Hero Section */}
    <div className='hero'>
      <div className='bold--title HashedBrowns'>
        <h1 className='big_text'>Explore different delicious Recipes</h1>
      </div>
      <FadeInOutAnimation />
    </div>
  </div>

  )
}

export default Home
