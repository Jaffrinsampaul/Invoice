import { color } from "@mui/system";
import { colors } from "../colors";

export const styles ={
    addItem :{
        marginLeft: "20px",
        marginTop: "60px",
        float: "left",
        fontFamily: "trenda",
        fontSize:"medium",
        // width: "30px",
        color: colors.defaultBlue
    },
    calender: {
        position: "absolute",
        top: "0px",
        right: "13px",
    },
    addProfile:{
        width: "100px",
        height: "40px",
        color: colors.lightBlack, 
        backgroundColor: colors.lightBlue,
        position: "relative",
        top: "50px",
    },
    cancelBtn:{
        color: colors.darkBlue,
        position: "absolute",
        
    },
    canceltableBtn: {
        marginTop: "25px",
        marginLeft: "5px",
        color: colors.lightBlack
    },
    currencyBtn:{
        position: "absolute",
        top: "50%",
        right: "50px",

    },
    pdfGenerator: {
        borderColor: colors.lightGreen,
        position: "relative",
        float: "right",
        width: "200px",
        height: "40px",
        top: "10px",
        color: colors.white,
        borderRadius: "20px",
        fontSize :"12px",
        fontWeight: "bold",
        backgroundColor: colors.lightGreen,
        paddingLeft: "10px"
    },
    receipt: {
        fill: colors.white,
        width: "25px",
        marginRight: "10px",
    },
    saveInvoice: {
        position: "relative",
        top: "40px",
        color: colors.black,
        height: "40px",
        width: "200px",
        borderColor: colors.lightGreen,
        borderRadius: "20px",
    },
    bookMark: {
        color: colors.lightGreen,
        marginRight: "20px",
        width: "20px"
    },
    invoice:{
        position: "relative",
        top: "70px",
        float: "right",
        color: colors.black,
        height: "40px",
        width: "200px",
        borderColor: colors.lightGreen,
        borderRadius: "20px"
    },
    divider:{
        position: "relative",
        top: "50px",
        width:"90%",
        left: "40px",
        backgroundColor: colors.blue
    },
    closeBtn:{
        position: "relative",
        top: "5px",
        left: "10px"
    },
    deleteIcon: {
        width: "15%",
        float: "right",
        position: "relative",
        top: "10px",
        right: "10px"
    },
    export:{
       backgroundColor: colors.lightGreen,
       borderRadius: "30px",
       marginTop: "60px",
       float: "right",
       marginRight: "20px",
    },
    newInvoice:{
        border: "solid 2px",
        borderColor: colors.lightGreen,
        borderRadius: "30px",
        height: "50px",
        width: "150px",
        marginTop: "60px",
        marginRight: "20px",
        float: "right",
        color: colors.lightGreen,
        fontSize: "12px",
    },
    btnCaluclation: {
        color: colors.defaultBlue,
        fontFamily: "trenda",
        // fontSize:"large",
    },
    cancelBtnCalculation:{
        color: colors.black,
        width: "15px",
        marginLeft: "10px"
    }
}