import React from "react";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { saveInvoiceStore } from "./redux/reduxHandling";
import { Navigate, useNavigate } from "react-router-dom";
import { handleDelete } from "./redux/reduxHandling";
import { useDispatch } from "react-redux";
import { handleEdit } from "./redux/reduxHandling";

import "../styles/css/myInvoice.css"
import search from "../asset/search.svg"
import trash from "../asset/trash.svg"
import { styles } from "../styles/btnstyle/btnStyle";
import exportSvg from "../asset/export.svg"

import { IconsStyles } from "../styles/btnstyle/icons";
import { colors } from "../styles/colors";
import { Button } from "@mui/material";

const MyInvoice =()=>{
    const [myInvoice, setMyInvoice] =useState({currency : "₹", rate: "40,000"})
    const [reload, setReload]= useState(false)

    useEffect(()=>{
        setReload(false)
    },[reload === true] )

    const naviagation = useNavigate()
    const dispatchData = useDispatch()

    const MyInvoiceData = useSelector(state => state.invoiceDataArr)


    // let MyInvoiceData = saveInvoiceStore

    const handleBack=()=>{
        naviagation("/", {state:{isEdit:false}})
    }

    const handleDel =(index)=>{
        dispatchData(handleDelete(index))
        setReload(true)
    }

    const handleEdi =(index)=>{
        naviagation("/", {state:{isEdit:true}})
        console.log(index   )
        dispatchData(handleEdit(index))
    }

    return(
        <section id="MyInvoiceparent">
            <section id="card">
                <h1 id="headerInvoice">My Invoice</h1>
                <h4 id="subHeading">
                    We automatically save any invoice that 
                    you draft to your dervice
                </h4>
                <section id="searchbox">
                    <section>
                        <img src={search} alt="searchIcon" 
                            style={IconsStyles.search}/>
                    </section>
                    <input type="text"  />
                </section>

                <section style={{marginTop: "20px"}}>
                    <section style={{width: "100%", 
                        display: "flex", justifyContent: "space-evenly"}}
                    >
                        {
                            MyInvoiceData.map((obj, index)=>{
                                return(
                                    <section key={index} id="invoiceCard" >
                                        <section>
                                            <img src={trash} 
                                                alt= "delete"
                                                style={styles.deleteIcon}
                                                onClick={()=>{handleDel(index)}}
                                            />
                                        </section>
                                        
                                        <section id="invoiceCardContent" onClick={()=>{handleEdi(index)}}>
                                            <p>{obj.symbols === " "? " ":obj.symbols}</p>
                                            <p style={{marginLeft: "10px"}}>
                                                {obj.balanceDue === 0? "No data found": obj.balanceDue}
                                            </p>
                                        </section>

                                        <p style={{color: colors.shadeGreen, fontSize: "12px"}}>
                                            {obj.currentDate === ""? " " :obj.currentDate}
                                        </p>
                                    </section>
                                )
                            })
                        }
                  
                    </section>
                </section>

                <section style={{display: "flex", justifyContent: "end", marginBottom: "10px"}}>
                    
                    <Button variant="contained" style={styles.export}>
                        <img src={exportSvg} alt="" style={IconsStyles.exportSvg}/>
                        Export invoice
                    </Button>
                    
                    <Button variant="outlined" style={styles.newInvoice} onClick={handleBack}>
                        New invoice
                    </Button>

                </section>
            </section>
        </section>
    )
}

export default MyInvoice