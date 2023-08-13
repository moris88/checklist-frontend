import { Footer as FooterFlowbite } from 'flowbite-react'

const Footer = () => {
  return (
    <FooterFlowbite container className="sticky bottom-0">
      <FooterFlowbite.Copyright by="Maurizio Tolomeo™" href="#" year={2023} />
      <FooterFlowbite.LinkGroup>
        <FooterFlowbite.Link href="/contact">Contact</FooterFlowbite.Link>
      </FooterFlowbite.LinkGroup>
    </FooterFlowbite>
  )
}

export default Footer
