import React from "react";
import { useState } from "react";

import Billing from "./billing";
import NavBar from "./navBar";
import Button from '@mui/material/Button';
import CurrencyDialogBox from "./currencyDialog";

import { styles } from "../styles/btnstyle/btnStyle";
import "../styles/css/landingPage.css"
import invoice from "../asset/invoice.svg"
import bookMark from "../asset/bookmark.svg"

import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';
import ReactToPdf from "react-to-pdf"
import { Navigate, useNavigate } from "react-router-dom";

import { saveAs } from "file-saver";

const LandingPage =()=>{
    const ref = React.createRef()

    const [label, setLabel] = useState({
        invoice: "Invoice",
        date: "Date",
        dueDate: "Due Date",
        paymentTerms: "Payment Terms",
        poNumber: "PO Number",
        billFrom:"Bill from",
        billTo: "Bill To",
        shipTo: "ShipTo",
        item: "Item",
        quantity: "Quantity",
        rate: "Rate",
        amount: "Amount",
        subTotal: "Subtotal",
        notes: "Notes",
        notesPara: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, I facilisis",
        discount: `Discount (${0}%)`,
        tax: `Tax (${0}%)`,
        shiping: "Shiping",
        total: "Total",
        terms: "Terms",
        termsPara: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, I facilisis",
        amountPaid: "Amount Paid",
        balanceDue: "Balance Due",
        tableheadItem :"Item",
        tableheadQuantity: "Quantity",
        tableheadRate: "Rate",
        tableheadAmount: "Amount",
        currency: "Currency",
    })

    const naviagation = useNavigate()
    const [userData, setUserData]= useState({
        currencySymbol: "₹"
    })
    const [symbol, setSymbols] =useState({
        currencySymbol: "₹"
    })


    const handleChange =(keys, value)=>{
        setLabel({...label, [keys]:value})
    }

    const handleUserData =(keys, value)=>{
        setUserData({...userData, [keys]: value})
        console.log(userData)
    }

    const options = {
        orientation: 'landscape',
        unit: 'in',
        format: [11, 10]
    };

    const handleNaviagtion =(navigateTO)=>{
        console.log(typeof(navigateTO))
        switch(navigateTO){
            case "SaveInvoice":
                break
            case "MyInvoice":
                naviagation("/MyInvoice")
                break
        }
    }

    return(
        <section id="parent">   
            
            <section id="leftsideDiv">

                <section ref={ref}>

                    <NavBar content={label} methods={handleChange} userData={handleUserData}/>
                    <Billing content={label} methods={handleChange} userData={handleUserData} userDetails ={symbol}/>

                </section>
            </section>

            <section id="rightSideDiv">
           
                <section id="currency">
                    <input type="text" value={`${label.currency} :`} style={{width: "100px"}}/>
                    <CurrencyDialogBox userData={handleUserData}/>               
                </section>

                <ReactToPdf targetRef= {ref} options={options} filename={userData.invoice!=="" ?`${userData.invoice}.pdf` :`${label.invoice}.pdf`}>
                    {({toPdf})=>
                    <Button variant="outlined" style={styles.pdfGenerator} onClick={toPdf}>
                        <DownloadForOfflineOutlinedIcon style={styles.receipt}></DownloadForOfflineOutlinedIcon>  
                    DOWNLOAD INVOICE</Button>}
                </ReactToPdf>

                <Button variant="outlined" style={styles.saveInvoice} onClick={()=>{handleNaviagtion("SaveInvoice")}}>
                    <img src={bookMark} style={styles.bookMark}/>
                Save Invoice</Button>

                <Button variant="outlined" style={styles.invoice}  onClick={()=>{handleNaviagtion("MyInvoice")}}>
                    <img src={invoice} style={styles.bookMark}/>
                My Invoice</Button>

            </section>
            
        </section>
    )
}

export default LandingPage