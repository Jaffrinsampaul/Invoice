import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "../styles/css/table.css"
import {styles} from"../styles/btnstyle/btnStyle.js"

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import currencyToSymbolMap from 'currency-symbol-map/map'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';


const BiilingTable =(props)=>{

    const [orderDetails, setOrderDetails] =useState([
        {
          id:1,  item:"one",quantity:"1", rate:100, amount: 100
        }
    ])

    const [total, setTotal] =useState({
        subTotal: 0,total:0, discount: 0, tax: 0,shipping: 0, amountPaid: 0, balanceDue: 0 
    })

    const tableContent = props.content

    const handleCreateElm =()=>{
        setOrderDetails([...orderDetails,
            {id: orderDetails.length +1, item:"", quantity:"", rate:0, amount: 0}
        ])
        console.log(orderDetails)

    }

    const handleChange=(e, index)=>{
        const keys = e.target.name
        const value = e.target.value

        const tempArr = orderDetails.map((obj)=>{
            if(obj.id === index){
                obj[keys]= value
            }

            return obj
        })

        setOrderDetails(tempArr)
    }

    const handlelabelChange =()=>{

    }

    const handleCancelRow=(e, index)=>{
        orderDetails.splice(index, 1)
        setOrderDetails([...orderDetails])
    }
    return(
        <section id="parentContaier">
            <table id="table">
                <thead>
                    <tr id="tableHeader">

                        <th >
                            <input type="text" 
                                value={tableContent.tableheadItem} 
                                id="itemheaderinput"
                                onChange={handlelabelChange}
                            />
                        </th>

                        <th >
                            <input type="text"
                                id="thOtherLabels"
                                value={tableContent.tableheadQuantity}
                                onChange={handlelabelChange}
                            />
                        </th>

                        <th >
                            <input type="text" 
                                value={tableContent.tableheadRate}
                                onChange={handlelabelChange}
                                id="thOtherLabels"
                            />
                        </th>

                        <th >
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
                                    <tr id="tbody" key={index}>
                                        <td>
                                            <input type="text" style={{}}
                                                name="item" value={obj.item} 
                                                onChange={(e)=>{handleChange(e,obj.id)}}
                                                id="tbodyinputfields"
                                            />
                                        </td>

                                        <td>
                                            <input type="text" 
                                                name="quantity" value={obj.quantity} 
                                                onChange={(e)=>{handleChange(e,obj.id)}}
                                                id="tbodyinputfields"
                                            />
                                        </td>

                                        <td>
                                            <input type="text"
                                                name="rate" value={obj.rate} 
                                                onChange={(e)=>{handleChange(e,obj.id)}}
                                                id="tbodyinputfields"
                                            />

                                        </td>

                                        <td>
                                            <input type="text" 
                                                name="rate" value={obj.rate} 
                                                onChange={(e)=>{handleChange(e,obj.id)}}
                                                id="tbodyinputfields"
                                            />
                                        </td>
                                            <CancelRoundedIcon style={styles.canceltableBtn} onClick={(e)=>{handleCancelRow(e, index)}}/>

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
            <section id="calculationPart">
                <section>

                <input type="text" name="" value={tableContent.subTotal} id="subTotal" />
                <input type="text" name="" value={total.subTotal} id="" />
                </section>
            </section>
        </section>
    )
}

export default BiilingTable