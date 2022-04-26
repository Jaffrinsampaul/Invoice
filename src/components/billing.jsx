import React from "react";
import "../styles/css/billing.css"
import BiilingTable from "./table";

const Billing =(props)=>{

    const labelContent = props.content

    const handlelabelChange =(ent)=>{
        const name = ent.target.name
        const value = ent.target.value

        props.methods(name, value)
    }

    const handleUserDetails =(ent)=>{
        const keys = ent.target.name
        const value = ent.target.value
        props.userData(keys, value)
    }

    return(
        <section id="parentSection">
            <section id="shipingDetials">

                <section id="shipingDetialsBillTo">
                    
                    <input type="text" name="billTo" value={labelContent.billTo} 
                       style={{width: "95%", borderRadius: "10px" ,height:"20px", fontWeight: "bold"}} onChange={handlelabelChange}
                    />
                    <input type="text" id="shipingDetialsBilTxtfield" name="billTo" onChange={handleUserDetails}/>
                </section>
                
                <section id="shipingDetialsshipTo">
                    <input type="text" name="shipTo" value={labelContent.shipTo} 
                        style={{width: "95%", borderRadius: "10px" ,height:"20px", fontWeight: "bold"}} onChange={handlelabelChange}
                    />
                    <input type="text" id="shipingDetialsBilTxtfield2" name="shipTo" onChange={handleUserDetails}/>
                </section>
            </section>
            
            <BiilingTable content={labelContent} methods={props.methods} userData={props.userData} userDetails = {props.userDetails}/>
        </section>
    )
}

export default Billing