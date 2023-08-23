import { useState } from "react";
import "./setShop.scss";
import HorizontalLinearStepper from "./Stepper";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

function setUpShop() {
  return (
    <>
      <div className="headers">
        <div className="logo">Bare Beauty</div>
        <div>
          <Link to='/ShopOwner'>
          <div className="ui button" >Go Back</div>
          </Link>
          
        </div>
      </div>
      <Container style={{ padding: "30px" }}>
        <h3>Set Up Your Shop</h3>
        <Box
          sx={{ bgcolor: "#dfdddd" }}
          style={{ padding: "30px 30px 30px 30px" }}
        >
          {" "}
          <HorizontalLinearStepper />
        </Box>
        {/* <div className="footer">
    <div className="ui button">Cancel</div>
    <div className="ui button">Submit</div>
  </div> */}
      </Container>
    </>
  );
}

export default setUpShop;
