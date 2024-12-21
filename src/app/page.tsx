import { Feature } from "./Home/feature"
import { Hero } from "./Home/hero"
import { Footer } from "./components/Footer"
import { NavBar } from "./components/NavBar"
import { Fragment } from "react"

export default function HomePage() {
  return (
    <Fragment>
      <NavBar />
      <Hero />
      <Feature />
      <Footer />
    </Fragment>
  )
}
