import React from 'react'
import { Header } from '../Header'

export const PageLayout: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <>
    <Header/>
    {children}
    </>
  )
}
