import React from 'react'
import ContentLoader from 'react-content-loader'

const RecentlyAndFavoriteLoader = () => (
  <ContentLoader
    speed={2}
    width={1000}
    height={60}
    viewBox="0 0 1000 60"
    backgroundColor="#222222"
    foregroundColor="#333333"
  >
    <rect x="0" y="0" rx="3" ry="3" width="980" height="60" />
  </ContentLoader>
)

export default RecentlyAndFavoriteLoader
