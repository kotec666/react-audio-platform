import React from 'react'
import ContentLoader from 'react-content-loader'

const Loader = () => (
  <ContentLoader
    speed={2}
    width={200}
    height={200}
    viewBox='0 0 200 200'
    backgroundColor='#1e1e1e'
    foregroundColor='#333333'
  >
    <rect x='0' y='0' rx='3' ry='3' width='192' height='192' />
  </ContentLoader>
)

export default Loader
