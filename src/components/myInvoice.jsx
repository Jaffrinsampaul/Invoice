import React from "react";
import "../styles/css/myInvoice.css"
import search from "../asset/search.svg"
import trash from "../asset/trash.svg"
import { styles } from "../styles/btnstyle/btnStyle";
import exportSvg from "../asset/export.svg"


import { IconsStyles } from "../styles/btnstyle/icons";
import { useState } from "react";
import { useEffect } from "react";
import { colors } from "../styles/colors";
import { Button } from "@mui/material";
// import { colors } from "@material-ui/core";

const MyInvoice =()=>{
    const [myInvoice, setMyInvoice] =useState({currency : "₹", rate: "40,000"})

    useEffect(()=>{
        let  date = new Date(Date.now());
        date = date.toLocaleString('en-US', {month: 'short', day: '2-digit', year: 'numeric',});
        console.log(date)
        setMyInvoice({...myInvoice, currentDate: date})
    },[] )

    return(
        <section id="MyInvoiceparent">
            <section id="card">
                <h1 id="headerInvoice">My Invoice</h1>
                <h4 id="subHeading">
                    We automatically save any invoice that you draft to your dervice
                </h4>
                <section id="searchbox">
                    <section>
                        <img src={search} alt="searchIcon" style={IconsStyles.search}/>
                    </section>
                    <input type="text"  />
                </section>

                <section style={{marginTop: "20px"}}>
                    <section style={{width: "100%", display: "flex", justifyContent: "space-evenly"}}>

                        <section id="invoiceCard">
                            <img src={trash} 
                                alt= "delete"
                                style={styles.deleteIcon}
                            />
                            <section id="invoiceCardContent">
                                <p>{myInvoice.currency}</p>
                                <p >{myInvoice.rate}</p>
                            </section>

                            <p style={{color: colors.shadeGreen, fontSize: "12px"}}>{myInvoice.currentDate}</p>
                        </section>

                        <section id="invoiceCard">
                            <img src={trash} 
                                    alt= "delete"
                                    style={styles.deleteIcon}
                            />
                            <section id="invoiceCardContent">
                                <p>{myInvoice.currency}</p>
                                <p>{myInvoice.rate}</p>
                            </section>
                            <p style={{color: colors.shadeGreen, fontSize: "12px"}}>{myInvoice.currentDate}</p>
                        </section>

                        <section id="invoiceCard">
                            <img src={trash} 
                                    alt= "delete"
                                    style={styles.deleteIcon}
                            />
                            <section id="invoiceCardContent">
                                <p>{myInvoice.currency}</p>
                                <p>{myInvoice.rate}</p>
                            </section>
                            <p style={{color: colors.shadeGreen, fontSize: "12px"}}>{myInvoice.currentDate}</p>
                        </section>

                        <section id="invoiceCard">
                            <img src={trash} 
                                    alt= "delete"
                                    style={styles.deleteIcon}
                            />
                            <section id="invoiceCardContent">
                                <p>{myInvoice.currency}</p>
                                <p>{myInvoice.rate}</p>
                            </section>
                            <p style={{color: colors.shadeGreen, fontSize: "12px"}}>{myInvoice.currentDate}</p>
                        </section>

                  
                    </section>
                </section>
                <section style={{display: "flex", justifyContent: "end", marginBottom: "10px"}}>
                    
                    <Button variant="contained" style={styles.export}>
                        <img src={exportSvg} alt="" style={IconsStyles.exportSvg}/>
                        Export invoice
                    </Button>
                    
                    <Button variant="outlined" style={styles.newInvoice}>
                        New invoice
                    </Button>

                </section>
            </section>
        </section>
    )
}

export default MyInvoice