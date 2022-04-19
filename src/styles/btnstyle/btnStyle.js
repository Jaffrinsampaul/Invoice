import { colors } from "../colors";

export const styles ={
    addItem :{
        position: "absolute",
        left: 0,
        marginTop: "20px"
        // bottom: 0,
    },
    calender: {
        position: "absolute",
        top: "10px",
        right: "13px",
    },
    addProfile:{
        width: "150px",
        height: "40px",
        color: colors.black, 
        backgroundColor: colors.lightBlue,
        position: "relative",
        top: "50px",
    },
    cancelBtn:{
        color: colors.darkBlue,
        position: "absolute",
    },
    canceltableBtn: {
        marginTop: "10px"
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
        top: "200px",
        right: "14%",
        width: "200px",
        height: "40px",
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
        float: "right",
        top: "280px",
        marginRight: "10px",
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
        float: "right",
        top: "360px",
        left: "210px",
        marginRight: "10px",
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
}