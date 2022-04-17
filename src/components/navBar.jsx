import React from "react";
import "../styles/css/navBar.css"


import Calender from "./calender";
import ImageUpload from "./imageUpload";


const NavBar =(props)=>{

    const content = props.content

    const handlelabelChange =(ent)=>{
        const name = ent.target.name
        const value = ent.target.value

        props.methods(name, value)
    }

    return(
        <section id="parentDiv">
            <section id="rightSection">

                <form action="" id="rightSectionForm">
                    <input type="text" value={content.invoice} id="rightSectionLableField" name="invoice" onChange={handlelabelChange}/>
                    <h1 style={{margin: 0, marginTop: "4px"}}>:</h1>
                    <input type="text"  id="inputField"/>
                </form>
                <br />

                <form action="" id="rightSectionForm">         
                    <input type="text" name="date" value={content.date} id="rightSectionLableField" onChange={handlelabelChange}/>
                    <h1 style={{margin: 0, marginTop: "4px"}}>:</h1>
                    <Calender/>
                </form>

                <br />
                <form action="" id="rightSectionForm">         
                    <input type="text" name="dueDate" value={content.dueDate} id="rightSectionLableField" onChange={handlelabelChange}/>
                    <h1 style={{margin: 0, marginTop: "4px"}}>:</h1>
                    <Calender/>
                </form>
                <br />

                <form action="" id="rightSectionForm">
                    <input type="text" name="paymentTerms" value={content.paymentTerms} id="rightSectionLableField" onChange={handlelabelChange}/>
                    <h1 style={{margin: 0, marginTop: "4px"}}>:</h1>
                    <input type="text" id="inputField"/>
                </form>
                <br />

                <form action="" id="rightSectionForm">
                    <input type="text" name="poNumber" value={content.poNumber} id="rightSectionLableField" onChange={handlelabelChange}/>
                    <h1 style={{margin: 0, marginTop: "4px"}}>:</h1>
                    <input type="text" value={""} id="inputField"/>
                </form>
                <br />
                
            </section>

           <section id="leftSection">
               <ImageUpload/>
               <section id="leftSectionBillingSide">
                        <input type="text" name="billFrom" id="header" value={content.billFrom} onChange={handlelabelChange}/>
                   <form action="">
                        <input type="text" placeholder="" id="leftSectionBillingSideInputfield"/>
                   </form>
               </section>

           </section>
        </section>
    )
}

export default NavBar