import React from 'react'
import { Footer as FooterFlowbite } from 'flowbite-react'

interface FooterProps {}

const Footer = (props: FooterProps) => {
  React.useEffect(() => {
    console.log(props)
  }, [props])
  return (
    <FooterFlowbite container className="sticky bottom-0">
      <FooterFlowbite.Copyright by="Maurizio Tolomeo™" href="#" year={2023} />
      <FooterFlowbite.LinkGroup>
        <FooterFlowbite.Link href="#">Contact</FooterFlowbite.Link>
      </FooterFlowbite.LinkGroup>
    </FooterFlowbite>
  )
}

export default Footer
