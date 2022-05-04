import React from "react";
import { useState } from "react";
import { styles } from "../styles/btnstyle/btnStyle";
import "../styles/css/imageUpload.css";

import Button from "@mui/material/Button";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { saveInvoiceData } from "./redux/reduxHandling";
import { saveImage } from "./redux/reduxHandling";

const ImageUpload = (props) => {
  const [image, setImage] = useState({
    profilePic: null,
    ImageUploaded: false,
  });

  const location = useLocation();
  const isEdit = location.state.isEdit;
  useEffect(() => {
    setImage({
      profilePic: invoiceImage.invoiceImage,
      ImageUploaded: invoiceImage.imageUploaded,
    });
  }, [isEdit === true]);

  const invoiceImage = useSelector((state) => state.invoiceObj);
  const dispatcher = useDispatch();

  const handleUploadImage = (ent) => {
    const keys = ent.target.name;
    let file = ent.target.files[0];
    let reader = new FileReader();
    let url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setImage({ ...image, profilePic: [reader.result], ImageUploaded: true });
      dispatcher(
        saveImage("invoiceImage", [reader.result], "imageUploaded", true)
      );
    };
    props.userData(keys, image);
  };

  const handleCancel = () => {
    setImage({ profilePic: null, ImageUploaded: false });
  };

  return (
    <section id="profile">
      {image.ImageUploaded ? (
        <section id="istrueProfilePic">
          <img src={image.profilePic} alt="" id="profilePic" />
          <CancelOutlinedIcon style={styles.cancelBtn} onClick={handleCancel} />
        </section>
      ) : (
        <Button variant="text" style={styles.addProfile}>
          add your logo
          <input
            id="addProfilebtn"
            style={{ opacity: 0 }}
            name="logo"
            type="file"
            accept="image/*"
            Button={"None"}
            onChange={handleUploadImage}
          />
        </Button>
      )}
    </section>
  );
};

export default ImageUpload;
