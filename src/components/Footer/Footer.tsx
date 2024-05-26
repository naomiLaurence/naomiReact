import { useContext } from "react"
import { ThemeContext } from "../../context/ThemeContext"
import "./Footer.scss"
const Footer = () => {

  const { toggle } = useContext(ThemeContext)

  return (
    <footer className="footer">
      <div className="name-footer">
       Naomi Laurence
      </div>

    </footer>
  )
}

export default Footer;