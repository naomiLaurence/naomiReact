import { Outlet } from "react-router-dom"
import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import { dark } from "@mui/material/styles/createPalette"

const Root = () => {
  
  return (
    <div>
      <Header />
      <main className="flex justify-center bg-slate-300">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Root;