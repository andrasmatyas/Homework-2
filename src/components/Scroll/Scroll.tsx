import { ReactNode } from "react"

interface Props {
  children: React.ReactNode
}

const Scroll = ({children}: Props) => {
  return (
    <div style={{overflowY:'scroll', height: '94vh' }}>{children}</div>
  )
}

export default Scroll