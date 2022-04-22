import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import "../styles/css/table.css"
import {styles} from"../styles/btnstyle/btnStyle.js"
import { colors } from "../styles/colors";

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { Divider } from "@mui/material";


const BiilingTable =(props)=>{

    const [orderDetails, setOrderDetails] =useState([
        {
          id:1,  item:"one",quantity: 1, rate:0, amount: 0 
        }
    ])

    const [total, setTotal] =useState({
        subTotal: 0, total:0, discount: 0, tax: 0, shipping: 0, amountPaid: 0, balanceDue: 0 
    })

    useEffect(()=>{

        const subCalculation = orderDetails.reduce((initalValue, obj)=>
            initalValue + obj.rate * obj.quantity,0).toFixed(2)
        setTotal({...total, subTotal: subCalculation})

        if (total.tax!==0 && total.discount!==0){

            const totalCalucation = total.tax+ total.shipping
            setTotal({...total, total: totalCalucation})
        }
        else if(total.tax !== 0){
            const totalCalucation = total.tax+ total.shipping
            setTotal({...total, total: totalCalucation})
        }
        else if(total.discount!==0 ){
            const totalCalucation = total.discount+ total.shipping
            setTotal({...total, total: totalCalucation})
        }

    }, [orderDetails, total])
    const tableContent = props.content
    const billingDetails = props.userDetails

    const handleCreateElm =()=>{
        setOrderDetails([...orderDetails,
            {id: orderDetails.length +1, item:"", quantity:1, rate:0, amount: 0}
        ])
    }

    const handleChange=(e, index=0, whichState="")=>{
        const keys = e.target.name
        let value 
        switch (whichState) {
            case "order":
                value = e.target.value
                const tempArr = orderDetails.map((obj)=>{
                    if(obj.id === index){
                        obj[keys]= value
                        if(keys === "quantity" || keys === "rate"){
                            const calculation =  obj.quantity * obj.rate
                            obj.amount = calculation
                        }
                    }   
                    return obj
                })
                setOrderDetails(tempArr)
                break;
            case "calculation":
                value = parseInt(e.target.value)
                setTotal({...total, [keys]: value})
                break
            case "amountPaid":
                setTotal({...total, [keys]: value})
                break
            default:
                let balance = total.total - value
                setTotal({...total, balanceDue: balance})
                break;
        }
    }

    const handlelabelChange =(e)=>{
        const keys = e.target.name
        const value = e.target.value

        let spitValue = value.split(" ")
        let spitValueArr = spitValue[1]
        
        let percentage
        let replaceText =""
        let amount
        let resultAmount

        switch (keys){
            case "discount":
                percentage = spitValueArr.replace(/[&\/\\#^+()$~%.'":*?<>{}!@]/g, '')
                replaceText = `Discount (${percentage}%)`
                props.methods(keys, replaceText)

                amount = total.subTotal*percentage/100
                resultAmount = total.subTotal - amount
                setTotal({...total, [keys]: resultAmount})
                console.log(total.subTotal)

                break
            case "tax":
                percentage = spitValueArr.replace(/[&\/\\#^+()$~%.'":*?<>{}!@]/g, '')
                replaceText = `Tax (${percentage}%)`
                props.methods(keys, replaceText)
                amount = percentage/100 * total.subTotal
                resultAmount = amount + total.discount
                setTotal({...total, [keys]: resultAmount})
                break
            
            default:
                props.methods(keys, value)

                break
        }

    }

    const handleUserDetails =(ent)=>{
        const keys = ent.target.name
        const value = ent.target.value
        props.useData(keys, value)
    }

    const handleCancelRow=(e, index)=>{
        orderDetails.splice(index, 1)
        setOrderDetails([...orderDetails])
    }
    return(
        <section style={{width: "100%"}}>
            <table>
                <thead id="tableHeader">
                    <tr >
                        <th style={{backgroundColor: "#242424", width: "50%"}}>
                            <input type="text" 
                                value={tableContent.tableheadItem} 
                                id="itemheaderinput"
                                name="tableheadItem"
                                onChange={handlelabelChange}
                            />
                        </th>

                        <th style={{backgroundColor: "#242424"}}>
                            <input type="text"
                                id="thOtherLabels"
                                name="tableheadQuantity"
                                value={tableContent.tableheadQuantity}
                                onChange={handlelabelChange}
                            />
                        </th>

                        <th style={{backgroundColor: "#242424"}}>
                            <input type="text"
                                name="tableheadRate" 
                                value={tableContent.tableheadRate}
                                onChange={handlelabelChange}
                                id="thOtherLabels"
                            />
                        </th>

                        <th style={{backgroundColor: "#242424"}} colSpan={2}>
                            <input type="text"
                                name="tableheadAmount"
                                value={tableContent.tableheadAmount}
                                onChange={handlelabelChange}
                                id="thOtherLabels"
                            />
                        </th>
                    </tr>
                </thead>
                <tbody >
                    {
                        orderDetails.map((obj, index)=>{
                            return(
                                <tr key={index}>
                                    <td style={{width: "50%", margin:0}}>
                                        <input type="text"
                                            id="tbodyinputfields" 
                                            style = {index%2===0?{backgroundColor:colors.lightBlue}:{backgroundColor:colors.white}}
                                            name="item" value={obj.item} 
                                            onChange={(e)=>{handleChange(e,obj.id, "order")}}
                                        />
                                    </td>

                                    <td>
                                        <input type="text" style = {index%2===0?{backgroundColor:colors.lightBlue}:{backgroundColor:colors.white}}
                                            name="quantity" value={obj.quantity} 
                                            onChange={(e)=>{handleChange(e,obj.id, "order")}}
                                            id="tbodyinputfields"
                                        />
                                    </td>

                                    <td>
                                        <input type="text" style ={index%2===0?{backgroundColor:colors.lightBlue}:{backgroundColor:colors.white}}
                                            name="rate" value={obj.rate} 
                                            onChange={(e)=>{handleChange(e,obj.id, "order")}}
                                            id="tbodyinputfields"
                                        />
                                        
                                    </td>

                                    <td>
                                        <section style={{display: "flex"}}>
                                            <input type="text"
                                                name="rate"  value={billingDetails.currencySymbol}
                                                id="currencySymbolFields"
                                            />

                                            <input type="text"
                                                name="rate" value={obj.amount} 
                                                onChange={(e)=>{handleChange(e,obj.id, "order")}}
                                                id="tbodyinputfields"
                                            />
                                            <CancelRoundedIcon style={styles.canceltableBtn} onClick={(e)=>{handleCancelRow(e, index)}}/>
                                        </section>
                                    </td>

                                </tr>
                            )
                        })
                    }
                </tbody>
                <tfoot>
                    <Button style={styles.addItem} onClick={handleCreateElm}>
                        <AddIcon/>Add Item
                    </Button>
                </tfoot>
            </table>
            <Divider style={styles.divider}/>
            <section style={{display: "flex", width:"100%"}}>

                <section id="termCondition">

                    <input type="text" value={tableContent.notes} 
                        name="notes" id="noteLabel" onChange={handlelabelChange}
                    />
                    <textarea type="text" value={tableContent.notesPara}
                         id ="noteInput" name="notes" onChange={handleUserDetails}
                    />
            
                    <input type="text" value={tableContent.terms} 
                       name="terms" id="noteLabel" onChange={handlelabelChange}
                    />
                    <textarea type="text" value={tableContent.notesPara} 
                        name="noteLabel" id ="noteInput" onChange={handleUserDetails}
                    />

                </section>
                <section id="calculationPart">
                    <section>
                        <input type="text" name="subTotal" value={tableContent.subTotal} 
                            id="subTotal"  onChange={handlelabelChange}
                        />:
                        <input type="text" name="" value={total.subTotal} 
                            id="subTotalinput" onChange={(e)=>{handleChange(e,0, "calculation")}}
                        />
                    </section>

                    <section>
                        <input type="text" name="discount" value={tableContent.discount} 
                            id="discount" onChange={handlelabelChange}
                        />:
                        <input type="text" name="discount" value={total.discount} 
                            id="subTotalinput"  onChange={(e)=>{handleChange(e,0, "calculation")}}
                        />
                    </section>

                    <section>
                        <input type="text" name="tax" value={tableContent.tax} 
                            id="tax"  onChange={handlelabelChange}
                        />:
                        <input type="text" name="tax" value={total.tax} 
                            id="subTotalinput"  onChange={(e)=>{handleChange(e,0, "calculation")}}
                        />
                    </section>

                    <section>
                        <input type="text" name="shiping" value={tableContent.shiping} 
                            id="subTotal" onChange={handlelabelChange}
                        />:
                        <input type="text" name="shipping" value={total.shipping} 
                            id="subTotalinput"  onChange={(e)=>{handleChange(e,0, "calculation")}}
                        />
                    </section>

                    <section>
                        <input type="text" name="total" value={tableContent.total} 
                            id="total" onChange={handlelabelChange}
                        />:
                        <input type="text" name="total" value={total.total} 
                            id="subTotalinput"  onChange={(e)=>{handleChange(e,0, "calculation")}}
                        />
                    </section>

                    <section style={{
                        
                        marginTop: "20px"
                    }}>
                        <section>
                            <input type="text" name="amountPaid" value={tableContent.amountPaid} 
                                id="amountPaid" onChange={handlelabelChange}
                            />:
                            <input type="text" name="amountPaid" value={total.amountPaid} 
                                id="subTotalinput"  onChange={(e)=>{handleChange(e,0, "amountPaid")}}
                            />
                        </section>
                        
                        <section>
                            <input type="text" name="balanceDue" value={tableContent.balanceDue} 
                                id="balanceDue" onChange={handlelabelChange}
                            />:
                            <input type="text" name="balanceDue" value={total.balanceDue} 
                                id="subTotalinput"  onChange={(e)=>{handleChange(e,0, "calculation")}}
                            />
                        </section>
                    </section>
                </section>
            </section>
        </section>
    )
}

export default BiilingTable