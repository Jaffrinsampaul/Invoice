import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { saveInvoiceData } from "./redux/reduxHandling";
import { handleTableData } from "./redux/reduxHandling";

import "../styles/css/table.css";
import { styles } from "../styles/btnstyle/btnStyle.js";
import { colors } from "../styles/colors";

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Divider } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { IconsStyles } from "../styles/btnstyle/icons";

const BiilingTable = (props) => {

  const [orderDetails, setOrderDetails] = useState([
    {
      id: 1,
      item: "one",
      quantity: 1,
      rate: 0,
      amount: 0,
      symbols: " "
    },
  ]);

  const [total, setTotal] = useState({
    subTotal: 0,
    total: 0,
    discount: 0,
    tax: 0,
    shipping: 0,
    amountPaid: 0,
    balanceDue: 0,
  });

  const [demo, setDemo]=useState({shiping: 0, amountPaid: 0})
  const [fieldsDisable, setFieldsDisable]=useState({discountBtn: false, taxBtn: false, shippingBtn: false})
  
  let location = useLocation()
  const isEdit = location.state.isEdit
  let editData = useSelector(state => state.editData.tableData)
  console.log(editData)
  
  useEffect(() => {
    
    if(editData.length!= 0){

      setOrderDetails(editData)
    }

    const subCalculation = orderDetails
      .reduce((initalValue, obj) => initalValue + obj.rate * obj.quantity, 0);

    setTotal({ ...total, subTotal: subCalculation, total: parseInt(subCalculation), balanceDue: parseInt(subCalculation)});

    dispatchData(saveInvoiceData("balanceDue", parseInt(subCalculation)))
     
  }, [orderDetails, isEdit === true]);
  

  const dispatchData = useDispatch()
  let currencySelector = useSelector(state=> state.invoiceObj)



  const tableContent = props.content;
  
  //CreateNewField
  const handleCreateElm = () => {
    setOrderDetails([
      ...orderDetails,
      {
        id: orderDetails.length + 1,
        item: "",
        quantity: 1,
        rate: 0,
        amount: 0,
      },
    ]);
  };
  
  const handleChange = (e, index = 0, whichState = "") => {
      
        const keys = e.target.name;
        let value;
        switch (whichState) {
            
        case "order":
            value = e.target.value;
            const tempArr = orderDetails.map((obj) => {
              if (obj.id === index) {
                obj[keys] = value;
                
                if (keys === "quantity" || keys === "rate") {
                  const calculation = obj.quantity * obj.rate;
                  obj.amount = calculation;
                }
                dispatchData(handleTableData("tableDetails", obj))
              }
              console.log(obj)
              
              return obj;
              });
              setOrderDetails(tempArr);
            break;
            
        case "calculation":

            value = Number(e.target.value);
            
            setTotal({ ...total, [keys]: value, });
            break;

        case "shipping":

            value = Number(e.target.value);
            let calculation =  total.total - demo.shiping
            calculation = calculation + value
            setDemo({...demo, shiping: value})
            
            setTotal({ ...total, shipping: value,total: calculation, balanceDue: calculation})
            
            dispatchData(saveInvoiceData(total.balanceDue, calculation ))
            break
            
        case "amountPaid":

            value = Number(e.target.value);
            let calculations =  total.total - demo.amountPaid
            calculations = calculations - value

            setTotal({ ...total, amountPaid: value, balanceDue:  calculations});
            
            dispatchData(saveInvoiceData(total.balanceDue, calculations))
            break;
            
        default:
            break;
    }
  };

  const handlelabelChange = (e) => {
    const keys = e.target.name;
    const value = e.target.value;

    let spitValue = value.split(" ");
    let spitValueArr = spitValue[1];

    let percentage;
    let replaceText = "";
    let amount;
    let resultAmount;

    switch (keys) {

      case "discount":
        percentage = spitValueArr.replace(/[&\/\\#^+()$~%.'":*?<>{}!@]/g, "");
        replaceText = `Discount (${percentage}%)`;

        props.methods(keys, replaceText);

        amount = (total.subTotal * percentage) / 100;
        resultAmount = total.subTotal - amount;
        
        setTotal({ ...total, discount: resultAmount, total: parseInt(resultAmount), balanceDue: parseInt(resultAmount)});
        
        dispatchData(saveInvoiceData(total.balanceDue, resultAmount ))

        break;
      case "tax":

        percentage = spitValueArr.replace(/[&\/\\#^+()$~%.'":*?<>{}!@]/g, "");
        replaceText = `Tax (${percentage}%)`;

        props.methods(keys, replaceText);

        amount = (percentage / 100) * total.subTotal;

        if(total.discount!=0){
            resultAmount = amount + total.discount;
        }
        else{
            resultAmount = amount + parseInt(total.subTotal)
        }

        dispatchData(saveInvoiceData(total.balanceDue, resultAmount ))
        setTotal({ ...total, tax: resultAmount, total: parseInt(resultAmount), balanceDue: parseInt(resultAmount) });
        
        break;

      default:
        props.methods(keys, value);
        
        break;
    }
  };

  const cancelDiscountTax=(e, cancelString)=>{
    switch (cancelString){
      case "discount":
        setFieldsDisable({...fieldsDisable, discountBtn: false})
        const discount = total.discount
        let cals = total.total - discount 

        if(total.tax!=0){
          cal= total.tax + total.shipping
        }
        else{

          cals = total.subTotal + total.shipping
        }
        setTotal({...total, discount: 0, balanceDue: cals, total: cals})

        break

      case "tax":

        setFieldsDisable({...fieldsDisable, taxBtn: false})
        const tax = total.tax
        let cal = total.total - tax

        if(total.discount!=0){
          cal =total.discount + total.shipping
        }
        else{

          cal = total.subTotal + total.shipping
        }
        setTotal({...total, tax: 0, balanceDue: cal, total: cal})

        break
    }
  }

  const handleCancelRow = (e, index) => {
    orderDetails.splice(index, 1);
    setOrderDetails([...orderDetails]);
  };

  return (
    <section style={{ width: "100%" }}>
      <table cellpadding="2px" cellspacing="0" border="0">
        
        <thead id="tableHeader">
          <tr style={{borderRadius: "60px"}}> 
            <th style={{ backgroundColor: "#242424", width: "50%", height: "40px", borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px"}}>
              <input
                type="text"
                value={tableContent.tableheadItem}
                id="itemheaderinput"
                name="tableheadItem"
                onChange={handlelabelChange}
              />
            </th>

            <th style={{ backgroundColor: "#242424" }}>
              <input
                type="text"
                id="thOtherLabels"
                name="tableheadQuantity"
                value={tableContent.tableheadQuantity}
                onChange={handlelabelChange}
              />
            </th>

            <th style={{ backgroundColor: "#242424"  }}>
              <input
                type="text"
                name="tableheadRate"
                value={tableContent.tableheadRate}
                onChange={handlelabelChange}
                id="thOtherLabels"
              />
            </th>

            <th style={{ backgroundColor: "#242424", width: "20%",  borderTopRightRadius: "10px", borderBottomRightRadius: "10px"}} colSpan={1}>
              <input
                type="text"
                name="tableheadAmount"
                value={tableContent.tableheadAmount}
                onChange={handlelabelChange}
                id="amountHeader"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.map((obj, index) => {
            return (
              <tr key={index}>
                <td style={{ width: "55%", margin: 0 }}>
                  <input
                    type="text"
                    id="tbodyinputfields"
                    style={
                      index % 2 === 0
                        ? { backgroundColor: colors.lightBlue }
                        : { backgroundColor: colors.white }
                    }
                    name="item"
                    value={obj.item}
                    onChange={(e) => {
                      handleChange(e, obj.id, "order");
                    }}
                  />
                </td>

                <td>
                  <input
                    type="text"
                    style={
                      index % 2 === 0
                        ? { backgroundColor: colors.lightBlue }
                        : { backgroundColor: colors.white }
                    }
                    name="quantity"
                    value={obj.quantity}
                    onChange={(e) => {
                      handleChange(e, obj.id, "order");
                    }}
                    id="tbodyinputfields"
                  />
                </td>

                <td>
                  <input
                    type="text"
                    style={
                      index % 2 === 0
                        ? { backgroundColor: colors.lightBlue }
                        : { backgroundColor: colors.white }
                    }
                    name="rate"
                    value={obj.rate}
                    onChange={(e) => {
                      handleChange(e, obj.id, "order");
                    }}
                    id="tbodyinputfields"
                  />
                </td>

                <td>
                  <section style={{ display: "flex", marginLeft: "10px"}}>
                    <p id="currencyAmnount">
                      {currencySelector.symbols ===  undefined?"$":currencySelector.symbols}
                    </p>

                    <input
                      type="text"
                      name="rate"
                      value={obj.amount}
                      onChange={(e) => {
                        handleChange(e, obj.id, "order");
                      }}
                      id="amountLabel"
                    />
                    <CloseIcon
                     style={styles.canceltableBtn}
                     onClick={(e) => {
                        handleCancelRow(e, index);
                      }}
                    />
                  </section>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Divider style={styles.divider} />

      <Button variant="text" style={styles.addItem} onClick={handleCreateElm}>
        <AddIcon style={IconsStyles.addIcons}/>
        add Item
      </Button>
      
      <section style={{ display: "flex", width: "100%" }}>

        <section id="termCondition">
          <input
            type="text"
            value={tableContent.notes}
            name="notes"
            id="noteLabel"
            onChange={handlelabelChange}
          />
          <textarea
            type="text"
            value={tableContent.notesPara}
            id="noteInput"
            name="notesPara"
            onChange={handlelabelChange}
          />

          <input
            type="text"
            value={tableContent.terms}
            name="terms"
            id="noteLabel"
            onChange={handlelabelChange}
          />
          <textarea
            type="text"
            value={tableContent.termsPara}
            name="termsPara"
            id="noteInput"
            onChange={handlelabelChange}
          />
        </section>

        <section id="calculationPart">
          <section id="calculationLine">
            <input
              type="text"
              name="subTotal"
              value={tableContent.subTotal}
              id="subTotal"
              onChange={handlelabelChange}
            />
            :
            <section style={{display:"flex", width: "50%"}}>
              <p style={{margin: 0, marginLeft: "10px"}}>{currencySelector.symbols===""? "":currencySelector.symbols}</p>
              <input
                type="text"
                name=""
                value={total.subTotal}
                id="subTotalinput"
                onChange={(e) => {
                  handleChange(e, 0, "calculation");
                }}
              />
            </section>
          </section>


          <section  style={{float: "right", marginBottom:"10px"}}>
            <>
              {
                fieldsDisable.discountBtn?
                  <section id="calculationLine">
                    <input
                      type="text"
                      name="discount"
                      value={tableContent.discount}
                      id="discount"
                      onChange={handlelabelChange}
                    />
                    :
                    <section style={{width: "30%", display: "flex"}}>
                      <input
                        type="text"
                        name="discount"
                        value={total.discount}
                        id="disableCalculation"
                        onChange={(e) => {
                          handleChange(e, 0, "calculation");
                        }}
                      />
                      <CloseIcon onClick={(e)=>{cancelDiscountTax(e, "discount")}} style={styles.cancelBtnCalculation}/>
                    </section>
                  </section>
                  :
                  <Button variant="text"
                    style={styles.btnCaluclation}
                    onClick={()=>{setFieldsDisable({...fieldsDisable, discountBtn: true})}}>
                    <AddIcon style={IconsStyles.addIcons}/> 
                  discount</Button>
              }
            </>
            <>
              {
                fieldsDisable.taxBtn?
                  <section id="calculationLine">
                    <input
                      type="text"
                      name="tax"
                      value={tableContent.tax}
                      id="tax"
                      onChange={handlelabelChange}
                    />
                    :
                    <section style={{width: "30%", display: "flex"}}>
                      <input
                        type="text"
                        name="tax"
                        value={total.tax}
                        id="disableCalculation"
                        onChange={(e) => {
                          handleChange(e, 0, "calculation");
                        }}
                      />
                      <CloseIcon onClick={(e)=>{cancelDiscountTax(e, "tax")}} style={styles.cancelBtnCalculation}/>
                    </section>
                  </section>
                  :
                  <Button variant="text"
                    style={styles.btnCaluclation}
                    onClick={()=>{setFieldsDisable({...fieldsDisable, taxBtn: true})}}>
                  <AddIcon style={IconsStyles.addIcons}/> tax</Button>
              }
            </>
          </section>
          <section id="calculationLine">
            <input
              type="text"
              name="shiping"
              value={tableContent.shiping}
              id="subTotal"
              onChange={handlelabelChange}
            />
            :
            <section style={{display:"flex", width: "50%"}}>
            <p style={{margin: 0, marginLeft: "10px"}}>{currencySelector.symbols===""? "":currencySelector.symbols}</p>
              <input
                type="text"
                name="shipping"
                value={total.shipping}
                id="subTotalinput"
                onChange={(e) => {
                  handleChange(e, 0, "shipping");
                }}
              />
            </section>
          </section>

          <section  id="calculationLine">
            <input
              type="text"
              name="total"
              value={tableContent.total}
              id="total"
              onChange={handlelabelChange}
            />
            :
            <section style={{display:"flex", width: "50%"}}>
            <p style={{margin: 0, marginLeft: "10px"}}>{currencySelector.symbols===""? "":currencySelector.symbols}</p>
              <input
                type="text"
                name="total"
                value={total.total}
                id="subTotalinput"
                onChange={(e) => {
                  handleChange(e, 0, "calculation");
                }}
              />
            </section>
          </section>

          <section
            style={{
              marginTop: "20px",
            }}
          >
            <section id="calculationLine">
              <input
                type="text"
                name="amountPaid"
                value={tableContent.amountPaid}
                id="amountPaid"
                onChange={handlelabelChange}
              />
              :
              <section style={{display:"flex", width: "50%"}}>
                <p style={{margin: 0, marginLeft: "10px"}}>{currencySelector.symbols===""? "":currencySelector.symbols}</p>
                <input
                  type="text"
                  name="amountPaid"
                  value={total.amountPaid}
                  id="subTotalinput"
                  onChange={(e) => {
                    handleChange(e, 0, "amountPaid");
                  }}
                />
              </section>
            </section>

            <section id="calculationLine">
              <input
                type="text"
                name="balanceDue"
                value={tableContent.balanceDue}
                id="balanceDue"
                onChange={handlelabelChange}
              />
              :
              <section style={{display:"flex", width: "50%"}}>
                <p style={{margin: 0, marginLeft: "10px"}}>{currencySelector.symbols===""? "":currencySelector.symbols}</p>
                <input
                  type="text"
                  name="balanceDue"
                  value={total.balanceDue}
                  id="subTotalinput"
                  onChange={(e) => {
                    handleChange(e, 0, "calculation");
                  }}
                />
              </section>
            </section>
          </section>
        </section>
      </section>
    </section>
  );
};

export default BiilingTable;
