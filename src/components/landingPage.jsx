import React from "react";
import { useState } from "react";
import Billing from "./billing";
import NavBar from "./navBar";
import { colors } from "../styles/colors";
import CurrencyDialogBox from "./currencyDialog";
import ConfirmationDialog from "./currencyDialog";

import ReactToPdf from "react-to-pdf"

const LandingPage =()=>{
    const ref = React.createRef()

    const [label, setLabel] = useState({
        invoice: "InVoice",
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
        discount: "Discount",
        tax: "Tax",
        shiping: "Shiping",
        total: "Total",
        terms: "Terms",
        amountPaid: "Amount Paid",
        balanceDue: "Balance Due",
        tableheadItem :"Item",
        tableheadQuantity: "Quantity",
        tableheadRate: "Rate",
        tableheadAmount: "Amount",
        currency: "Currency"
    })


    const handleChange =(keys, value)=>{
        setLabel({...label, [keys]:value})
    }


    return(
        <section style={{display: "flex",
            flexDirection: "column", 
            backgroundColor: colors.lightBlue, 
            height: "100vh"}}
        >
            <ReactToPdf targetRef= {ref} filename={`${label.invoice}.pdf`}>
                {({toPdf})=><button onClick={toPdf}>Generate Pdf</button>}
            </ReactToPdf>
            <section ref={ref}>

                <NavBar content={label} methods={handleChange}/>
                <Billing content={label} methods={handleChange}/>
            </section>
        </section>
    )
}

export default LandingPage