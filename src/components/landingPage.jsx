import React from "react";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { saveInvoiceBtn } from "./redux/reduxHandling";

import Billing from "./billing";
import NavBar from "./navBar";
import Button from '@mui/material/Button';
import CurrencyDialogBox from "./currencyDialog";

import { styles } from "../styles/btnstyle/btnStyle";
import "../styles/css/landingPage.css"
import invoice from "../asset/invoice.svg"
import bookMark from "../asset/bookmark.svg"

import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined';
import ReactToPdf from "react-to-pdf"
import { Navigate, useNavigate } from "react-router-dom";

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
    const invoiceName = useSelector(state=>state.invoiceObj.invoice)

    const [userData, setUserData]= useState({
        currencySymbol: "₹"
    })
    
    const handleChange =(keys, value)=>{
        setLabel({...label, [keys]:value})
    }

    const options = {
        orientation: 'landscape',
        unit: 'in',
        format: [11, 10]
    };

    const saveDispatcher = useDispatch()

    const handleNaviagtion =(navigateTO)=>{
        switch(navigateTO){

            case "SaveInvoice":
               saveDispatcher(saveInvoiceBtn())
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

                    <NavBar content={label} methods={handleChange}/>
                    <Billing content={label} methods={handleChange}/>

                </section>
            </section>

            <section id="rightSideDiv">
           
                <section id="currency">
                    <input type="text" value={`${label.currency} :`} style={{width: "100px"}}/>
                    <CurrencyDialogBox/>               
                </section>

                <ReactToPdf targetRef= {ref} options={options} filename={invoiceName!=="" ?`${invoiceName}.pdf` :`${label.invoice}.pdf`}>
                    {({toPdf})=>
                    <Button variant="outlined" style={styles.pdfGenerator} onClick={toPdf}>
                        <ArrowCircleDownOutlinedIcon style={styles.receipt}></ArrowCircleDownOutlinedIcon>  
                    dowload invoice</Button>}
                </ReactToPdf>

                <Button variant="outlined" style={styles.saveInvoice} onClick={()=>{handleNaviagtion("SaveInvoice")}}>
                    <img src={bookMark} style={styles.bookMark}/>
                save invoice</Button>

                <Button variant="outlined" style={styles.invoice}  onClick={()=>{handleNaviagtion("MyInvoice")}}>
                    <img src={invoice} style={styles.bookMark}/>
               my invoice</Button>

            </section>
            
        </section>
    )
}

export default LandingPage