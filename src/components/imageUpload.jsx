import React from "react";
import { useState } from "react";
import { styles } from "../styles/btnstyle/btnStyle";
import "../styles/css/imageUpload.css"

import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const ImageUpload =(props)=>{

    const [image, setImage]= useState(
        {profilePic: null, ImageUploaded: false}
    )
    
    
    const handleUploadImage =(ent)=>{
        const keys = ent.target.name
        let file = ent.target.files[0]
        let reader = new FileReader()
        let url = reader.readAsDataURL(file)

        reader.onloadend = function(e){
            setImage({...image, profilePic: [reader.result], ImageUploaded: true})
        }
        props.userData(keys, image)
    }

    const handleCancel =()=>{
        setImage({profilePic: null, ImageUploaded: false})
    }

    return(
        <section id="profile">
            {
                image.ImageUploaded?
                    <section id="istrueProfilePic">
                        <img src={image.profilePic} alt="" id="profilePic"/>
                        <CancelOutlinedIcon style={styles.cancelBtn} onClick={handleCancel}/>
                    </section>:
                        <Button variant="text" style={styles.addProfile}>
                            <AddIcon/>Add Logo
                            <input id="addProfilebtn" style={{opacity: 0}} name= "logo" type="file" 
                                accept="image/*" Button={"None"} onChange={handleUploadImage}
                            />
                        </Button>
            }
            {/* <img src={image.profilePic} alt="" /> */}
        </section>
    )
}

export default ImageUpload