import React from "react"
import Navbar from "./components/Navbar"
import Main from "./components/Main"
import Circle from "./components/Circle"

export default function App() {
    return (
        <div className="container">
            <Navbar />
            <Main />
            <Circle />
        </div>
    )
}