import React from "react";
import "../styles/css/billing.css"
import BiilingTable from "./table";

const Billing =(props)=>{

    const labelContent = props.content

    const handleParentMethod = props.methods

    return(
        <section id="parentSection">
            <section id="shipingDetials">

                <section id="shipingDetialsBillTo">
                    <h1 >{labelContent.billTo}</h1>
                    <input type="text" id="shipingDetialsBilTxtfield"/>
                </section>

                <section id="shipingDetialsshipTo">
                    <h1>{labelContent.shipTo}</h1>
                    <input type="text" id="shipingDetialsBilTxtfield"/>
                </section>
            </section>
            <BiilingTable content={labelContent} methods={handleParentMethod}/>
        </section>
    )
}

export default Billing