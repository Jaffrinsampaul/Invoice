import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import "../styles/css/billing.css"
import BiilingTable from "./table";

import { saveInvoiceData } from "./redux/reduxHandling";

const Billing =(props)=>{

    const[biilingState , setBillingState]=useState({

    })

    const labelContent = props.content
    const location = useLocation()
    const isEdit = location.state.isEdit
    const editData =useSelector(state=>state.editData)
    const dispatcher = useDispatch()

    useEffect(()=>{
        setBillingState({
            ...biilingState,
            billTo: editData.billTo, shipTo :editData.shipTo
        })
    },[isEdit === true])

    const handlelabelChange =(ent)=>{
        const name = ent.target.name
        const value = ent.target.value

        props.methods(name, value)
    }

    const handleChange =(ent)=>{
        const name = ent.target.name
        const value = ent.target.value
        setBillingState({ ...biilingState, [name]: value })

        dispatcher(saveInvoiceData(name, value))
    }

    return(
        <section id="parentSection">
            <section id="shipingDetials">

                <section id="shipingDetialsBillTo">
                    
                    <input type="text" name="billTo" value={labelContent.billTo} 
                       style={{width: "95%", 
                        borderRadius: "10px" ,
                        height:"20px", 
                        fontWeight: "bold",
                        fontFamily: "trenda",
                        fontSize: "medium"
                        
                    }} onChange={handlelabelChange}
                    />
                    <input type="text" id="shipingDetialsBilTxtfield" 
                        value={biilingState.billTo} name="billTo" onChange={handleChange}
                    />
                </section>
                
                <section id="shipingDetialsshipTo">
                    <input type="text" name="shipTo" value={labelContent.shipTo} 
                        style={{width: "95%", 
                         borderRadius: "10px" ,
                         height:"20px", 
                         fontWeight: "bold",
                         fontFamily: "trenda",
                        fontSize: "medium"
                        }} onChange={handlelabelChange}
                    />
                    <input type="text" value={biilingState.shipTo} 
                        id="shipingDetialsBilTxtfield2" name="shipTo"  onChange={handleChange}
                    />
                </section>
            </section>
            
            <BiilingTable content={labelContent} methods={props.methods}/>
        </section>
    )
}

export default Billing