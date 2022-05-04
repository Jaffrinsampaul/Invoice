import { useState } from "react";
import React from "react";
import {createStore} from "redux"

// Selection
const currencySymbol = "currencySymbols"
const saveInvoive = "saveInvoice"
const saveButton = "saveInvoicebtn"
const deleteMyinvoice = "deleteHanding"
const editInvoice = "editInvoice"
const SAVEIMAGE  = "SAVEIMAGE"
const TABLEDATA  = "TABLEDATA"
 

// Action
export const currency =(symbol)=>({
    type : currencySymbol,
    payload :{
        symbol
    },
})

export const saveInvoiceData =(keys, values)=>({
    type: saveInvoive,
    payload :{
        keys, values
    },
})

export const saveInvoiceBtn =()=>({
    type: saveButton
})

export const saveImage =(keys, image, imageUploaded, 
    isBoolen)=>({
    type :SAVEIMAGE,
    payload: {
        keys,image, imageUploaded, isBoolen
    }
})

export const handleTableData =(tableDetails, tableDetailsArr)=>({
    type :TABLEDATA,
    payload: {
        keys: tableDetails,
        values: tableDetailsArr
    }
})

export const handleDelete =(id)=>({
    type: deleteMyinvoice,
    payload: {
        deleteItem :id
    }
})

export const handleEdit =(index)=>({
    type: editInvoice,
    payload: {
        index
    }
})

// export const handle

// State

export const invoiceData ={
    invoiceObj: {
        symbols: "",
        tableData: [],
    },
    
    invoiceDataArr: [

    ],
    editData: {
        invoice: "",
        symbols: "",
        billFrom:"",
        billTo: "",
        shipTo: "",
        tableData:[],
    },
}

export let saveInvoiceStore =[

]

// Reducer

const handleCurrencySymbols =(state =invoiceData, actions)=>{
    let stateKeys
    let isBoolenState

    switch (actions.type) {

        case currencySymbol:
            return({
                ...state,  
                invoiceObj: {
                    ...state.invoiceObj
                    ,symbols: actions.payload.symbol
                }
            })

        case saveInvoive:
            stateKeys = actions.payload.keys
            return({
                ...state,
                invoiceObj:{
                    ...state.invoiceObj,
                    [stateKeys]: actions.payload.values
                }
            })

        case saveButton:
            return(
                {
                    ...state,
                    invoiceDataArr:[
                        ...state.invoiceDataArr, 
                        state.invoiceObj
                    ]
                }
            )
        
        case SAVEIMAGE:
            stateKeys = actions.payload.keys
            isBoolenState = actions.payload.imageUploaded
                return({
                    ...state,
                    invoiceObj:{
                        ...state.invoiceObj,
                        [stateKeys]: actions.payload.image,
                        [isBoolenState]: actions.payload.isBoolen
                    }
                })
        
        case TABLEDATA:
            stateKeys = actions.payload.keys
            console.log(actions.payload.values)
                return({
                    ...state,
                    invoiceObj: {
                        ...state.invoiceObj,
                       tableData :[
                            ...state.invoiceObj.tableData,
                            actions.payload.values
                       ]                        
                    }
                    
                })

        case deleteMyinvoice:
            stateKeys = actions.payload.deleteItem
            console.log(stateKeys)
            return ({
                ...state,
                invoiceDataArr: state.invoiceDataArr.splice(stateKeys, 1)
            })
        
        case editInvoice:
            const editData = state.invoiceDataArr.map((obj, index)=>{
                if(index === actions.payload.index){
                    return obj
                }
            })
            return({
                ...state,
                editData: editData[actions.payload.index]
            })

        default:
            return state;
    }
}

// store

export let store = createStore(handleCurrencySymbols)
store.subscribe(()=>{console.log(store.getState())})