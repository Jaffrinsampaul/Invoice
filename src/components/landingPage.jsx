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
        discount: `Discount (${1}%)`,
        tax: `Tax (${1}%)`,
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


    const handleChange =(keys, value)=>{
        setLabel({...label, [keys]:value})
    }


    return(
        <section id="parent">   
            <section id="rightSideDiv">

                <section id="currency">
                    <input type="text" value={`${label.currency} :`} style={{width: "100px"}}/>
                    <CurrencyDialogBox/>
                </section>
                
                <ReactToPdf targetRef= {ref} filename={`${label.invoice}.pdf`}>
                    {({toPdf})=>
                    <Button variant="outlined" style={styles.pdfGenerator} onClick={toPdf}>
                        <DownloadForOfflineOutlinedIcon style={styles.receipt}></DownloadForOfflineOutlinedIcon>  
                    DOWNLOAD INVOICE</Button>}
                </ReactToPdf>

                <Button variant="outlined" style={styles.saveInvoice}>
                    <img src={bookMark} style={styles.bookMark}/> 
                Save Invoice</Button>
          
                <Button variant="outlined" style={styles.invoice}>
                    <img src={invoice} style={styles.bookMark}/>
                My Invoice</Button>
            </section>
            <section ref={ref}>

                <NavBar content={label} methods={handleChange}/>
                <Billing content={label} methods={handleChange}/>

            </section>
        </section>
    )
}

export default LandingPage