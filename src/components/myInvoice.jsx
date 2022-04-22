import React from "react";
import "../styles/css/myInvoice.css"

import search from "../asset/search.svg"
import { IconsStyles } from "../styles/btnstyle/icons";

const MyInvoice =()=>{
    return(
        <section id="MyInvoiceparent">
            <section id="card">
                <h1 id="headerInvoice">My Invoice</h1>
                <h4 id="subHeading">We automatically save any invoice that you draft to your dervice</h4>
                <section id="searchbox">
                    <section>
                        <img src={search} alt="searchIcon" style={IconsStyles.search}/>
                    </section>
                    <input type="text"  />
                </section>
            </section>
        </section>
    )
}

export default MyInvoice