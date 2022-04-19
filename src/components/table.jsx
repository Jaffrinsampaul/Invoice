import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "../styles/css/table.css"
import {styles} from"../styles/btnstyle/btnStyle.js"

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import currencyToSymbolMap from 'currency-symbol-map/map'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { set } from "date-fns/esm";
import { colors } from "../styles/colors";
import { Divider } from "@mui/material";


const BiilingTable =(props)=>{

    const [orderDetails, setOrderDetails] =useState([
        {
          id:1,  item:"one",quantity: 1, rate:100, amount: 0 
        }
    ])

    const [total, setTotal] =useState({
        subTotal: 0,total:0, discount: 0, tax: 0,shipping: 0, amountPaid: 0, balanceDue: 0 
    })

    useEffect(()=>{
        const tempArr = orderDetails.map((obj)=>{
            if(obj.amount === 0){
                const calculation = obj.quantity * obj.rate
                obj.amount = calculation     
                setTotal({...total, subTotal: total.subTotal+ calculation})
            }
            return obj
        })
        setOrderDetails(tempArr)
    }, [orderDetails!==1])
    
    const tableContent = props.content

    const handleCreateElm =()=>{
        setOrderDetails([...orderDetails,
            {id: orderDetails.length +1, item:"", quantity:1, rate:0, amount: 0}
        ])
    }

    const handleChange=(e, index=0, whichState="")=>{
        const keys = e.target.name
        const value = parseInt(e.target.value)

        switch (whichState) {
            case "order":
                const tempArr = orderDetails.map((obj)=>{
                    if(obj.id === index){
                        obj[keys]= value
                        if(keys === "quantity" || keys === "rate"){
                            const calculation =  obj.quantity * obj.rate
                            obj.amount = calculation
                            setTotal({...total, subTotal:total.subTotal + calculation})
                        }
                    }   
                    return obj
                })
                setOrderDetails(tempArr)
                break;
            case "calculation":
                break
            default:
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

    const handleCancelRow=(e, index)=>{
        orderDetails.splice(index, 1)
        setOrderDetails([...orderDetails])
    }
    return(
        <section style={{minHeight: "40vh", maxHeight:"auto"}}>
            <table>
                <thead id="tableHeader">
                    <tr >

                        <th style={{backgroundColor: "#242424"}}>
                            <input type="text" 
                                value={tableContent.tableheadItem} 
                                id="itemheaderinput"
                                onChange={handlelabelChange}
                            />
                        </th>

                        <th style={{backgroundColor: "#242424"}}>
                            <input type="text"
                                id="thOtherLabels"
                                value={tableContent.tableheadQuantity}
                                onChange={handlelabelChange}
                            />
                        </th>

                        <th style={{backgroundColor: "#242424"}}>
                            <input type="text" 
                                value={tableContent.tableheadRate}
                                onChange={handlelabelChange}
                                id="thOtherLabels"
                            />
                        </th>

                        <th style={{backgroundColor: "#242424"}} colSpan={2}>
                            <input type="text" 
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
                                    <td>
                                        <input type="text"
                                            id="tbodyinputfields" style = {index%2===0?{backgroundColor:colors.blue}:{backgroundColor:colors.white}}
                                            name="item" value={obj.item} 
                                            onChange={(e)=>{handleChange(e,obj.id, "order")}}
                                        />
                                    </td>

                                    <td>
                                        <input type="text" style = {index%2===0?{backgroundColor:colors.blue}:{backgroundColor:colors.white}}
                                            name="quantity" value={obj.quantity} 
                                            onChange={(e)=>{handleChange(e,obj.id, "order")}}
                                            id="tbodyinputfields"
                                        />
                                    </td>

                                    <td>
                                        <input type="text" style = {index%2===0?{backgroundColor:colors.blue}:{backgroundColor:colors.white}}
                                            name="rate" value={obj.rate} 
                                            onChange={(e)=>{handleChange(e,obj.id, "order")}}
                                            id="tbodyinputfields"
                                        />

                                    </td>

                                    <td>
                                        <section style={{display: "flex"}}>

                                        <input type="text" style = {index%2===0?{backgroundColor:colors.blue}:{backgroundColor:colors.white}}
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
                    position: "relative",
                    top: "20px"
                }}>
                    <section>
                        <input type="text" name="amountPaid" value={tableContent.amountPaid} 
                            id="amountPaid" onChange={handlelabelChange}
                        />:
                        <input type="text" name="amountPaid" value={total.amountPaid} 
                            id="subTotalinput"  onChange={(e)=>{handleChange(e,0, "calculation")}}
                        />
                    </section>
                    <br />
                    <section>
                        <input type="text" name="balanceDue" value={tableContent.balanceDue} 
                            id="balanceDue" 
                        />:
                        <input type="text" name="balanceDue" value={total.balanceDue} 
                            id="subTotalinput"  onChange={(e)=>{handleChange(e,0, "calculation")}}
                        />
                    </section>
                </section>
            </section>
            <section id="termCondition">

                <input type="text" value={tableContent.notes} id="noteLabel"/>
                <textarea type="text" placeholder={tableContent.notesPara} id ="noteInput"/>
        
                <input type="text" value={tableContent.terms} id="noteLabel"/>
                <textarea type="text" placeholder={tableContent.notesPara} id ="noteInput" />


            </section>
        </section>
    )
}

export default BiilingTable