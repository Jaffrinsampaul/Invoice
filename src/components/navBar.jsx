import React from "react";
import { useEffect } from "react";

import "../styles/css/navBar.css"

import { saveInvoiceData } from "./redux/reduxHandling";
import { useDispatch } from "react-redux";
import {useSelector} from "react-redux"

import Calender from "./calender";
import ImageUpload from "./imageUpload";
import { useState } from "react";
import { useLocation } from "react-router-dom";


const NavBar =(props)=>{

    const content = props.content

    const location = useLocation()
    const editData = useSelector(state => state.editData)
    let isEdit = location.state.isEdit

    const billingDetailsDispatcher = useDispatch()
    const [navBar , setNavBar] =useState({
    })
    useEffect(()=>{
        setNavBar(editData)
        
    },[isEdit === true])

    const handlelabelChange =(ent)=>{
        const name = ent.target.name
        const value = ent.target.value

        props.methods(name, value)
    }

    const handleUserDetails =(ent)=>{
        const keys = ent.target.name
        const value = ent.target.value
        setNavBar({...navBar, [keys]: value})
        
        billingDetailsDispatcher(saveInvoiceData(keys, value))
    }

    return(
        <section id="parentDiv">

        <section id="leftSection">
               <ImageUpload userData={props.userData}/>
               <section id="leftSectionBillingSide">
                    <input type="text" name="billFrom" id="header" value={content.billFrom} 
                        onChange={handlelabelChange}
                    />
                    <input type="text" placeholder="" value = {navBar.billFrom}  name="billFrom" id="leftSectionBillingSideInputfield"
                        onChange={handleUserDetails}
                    />
               </section>
           </section>
            
            <section id="rightSection">

                <form action="" id="rightSectionForm">
                    <input type="text" value={content.invoice} id="rightSectionLableField" name="invoice" onChange={handlelabelChange}/>
                    <h1 style={{margin: 0, marginTop: "0px"}}>:</h1>
                    <section style={{display: "flex", width: "60%"}}>
                        <input type="text" name="invoice"  id="placeholderHashTag" value={"  #"}  onChange={handleUserDetails}/>
                        <input type="text" name="invoice" value = {navBar.invoice}  id="invoiceField"  onChange={handleUserDetails}/>
                    </section>
                </form>

                <form action="" id="rightSectionForm">
                    <section style={{
                        display: "flex",width: "100%", marginRight: "50px"
                    }}>                   
                        <input type="text" name="date" value={content.date} id="rightSectionLableField" onChange={handlelabelChange}/>
                        <h1 style={{margin: 0, marginTop: "0px"}}>:</h1>
                    </section>       
                    <Calender dueDate="currentDate"/>
                </form>

                <form action="" id="rightSectionForm">  
                    <section style={{
                        display: "flex",width: "100%", marginRight: "50px"
                    }}>        
                        <input type="text" name="dueDate" value={content.dueDate} id="rightSectionLableField" onChange={handlelabelChange}/>
                        <h1 style={{margin: 0, marginTop: "0px"}}>:</h1>
                    </section>       
                    <Calender dueDate="lateDate"/>
                </form>
                
                <form action="" id="rightSectionForm">
                    <input type="text" name="paymentTerms" value={content.paymentTerms} id="rightSectionLableField" onChange={handlelabelChange}/>
                    <h1 style={{margin: 0, marginTop: "0px"}}>:</h1>
                    <input type="text" id="inputField" value = {navBar.paymentTerms}  name="paymentTerms"  onChange={handleUserDetails}/>
                </form>

                <form action="" id="rightSectionForm">
                    <input type="text" name="poNumber" value={content.poNumber} id="rightSectionLableField" onChange={handlelabelChange}/>
                    <h1 style={{margin: 0, marginTop: "0px"}}>:</h1>
                    <input type="text" id="inputField" value = {navBar.poNumber} name="poNumber" onChange={handleUserDetails}/>
                </form>
                
            </section>

           
        </section>
    )
}

export default NavBar