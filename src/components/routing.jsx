import React from "react";
import {BrowserRouter, Route, Routes } from "react-router-dom"
import LandingPage from "./landingPage";
import MyInvoice from "./myInvoice";

const Routing =()=>{
    return(
        <section>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path="/MyInvoice" element={<MyInvoice/>}/>
                </Routes>
            </BrowserRouter>
        </section>
    )
}
            
export default Routing