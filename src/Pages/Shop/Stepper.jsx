import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import Typography from "@mui/material/Typography";
import "./setShop.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const steps = [
  "Enter Shop Details",
  "Enter Personal Information",
  "Enter Address Details",
  "Complete",
];

export default function HorizontalLinearStepper() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [file, setFile] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [CNIC, setCNIC] = useState();
  const [shopName, setShopName] = useState();
  const [shopPlace, setShopPlace] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();

  // const [location, setLocation] = useState();
  const [HouseNo, setHouseNo] = useState();
  const [streetAddress, setStreetAddress] = useState();
  const [country, setCountry] = useState();
  const [firstName, setFirst] = useState();
  const [lastName, setLast] = useState();
  const [FullName, setFullName] = useState();
  const [cnicPic, setCnicPic] = useState();
  const [cnUrl, setCn] = useState();
  const [cnId, setCnId] = useState();
  // const[bussinessAddress,setbussinessAddress]=useState()

  const postImg=async()=>{
    console.log(cnicPic)
    var data = new FormData();
    data.append('upload_preset', 'vqjcnili');
    data.append('file', cnicPic);
    data.append('cloud_name', 'dhmolukeg');

    
   const res = await fetch('https://api.cloudinary.com/v1_1/dhmolukeg/image/upload', {
  method: 'POST',
  body: data
});
const f = await res.json();
console.log("res",f);
// setpublicId()
   
  //       var publicId=f.public_id
  //       var imageUrl=f.url
  //  console.log(publicId)
    // setCn.imageUrl(f.url)
    
    setCn(f.url)
    setCnId(f.public_id)
    // setCn(image)
    console.log(cnUrl)
    console.log(cnId)

}
  const AddShop = async () => {
    const formData = new FormData();
    // formData.append("name", name);
    const image={
      publicId:cnId,
      imageUrl:cnUrl 
    }
    formData.append(" CNICphoto", JSON.stringify(image));
    formData.append("FullName", FullName);
    formData.append("CNIC", CNIC);
    formData.append("shopPlace", shopPlace);
    formData.append("shopName", shopName);
    formData.append("bussinessAddress[state]", state);
    formData.append("bussinessAddress[city]", city);
    formData.append("bussinessAddress[country]", country);
    formData.append("bussinessAddress[streetAddress]", streetAddress);
    formData.append("bussinessAddress[HouseNo]", HouseNo);
    formData.append("phoneNumber", phoneNumber);
    formData.append("file", file);
    // formData.append("role", "ShopOwner");

    const { data } = await axios.post(
      "http://localhost:5000/api/shop/addShop",
      formData
    );
    if (data.success == true) {
      localStorage.setItem("Shop", JSON.stringify(data.user.Shop));
      localStorage.setItem(
        "photo",
        JSON.stringify(data.user.profilePhoto.imageUrl)
      );
      localStorage.setItem("User",JSON.stringify(data.user))
      toast.success("Shop Owner Add Successfully");
    } else {
      toast.error(data.message);
    }
    // toast.success("Shop Owner Add Successfully");
    console.log("data", data);
  };

  const isStepOptional = (step) => {
    return step === 1;
  };
  //   const isStepFailed = (step) => {
  //     return skipped.has(step);
  //   };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    setFullName(firstName + " " + lastName);
    console.log(FullName);
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className="stepper">
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            //   if (isStepOptional(index)) {
            //     labelProps.optional = (
            //       <Typography variant="caption">Optional</Typography>
            //     );
            //   }
            // if (isStepFailed(index)) {
            //     labelProps.optional = (
            //       <Typography variant="caption" color="error">
            //         Alert message
            //       </Typography>
            //     );

            //     labelProps.error = true;
            //   }

            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - Shop SetUp Sucessfully
            </Typography>
            <button onClick={() => navigate("/ShopOwner")}>Dashboard</button>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {/* step 0 */}
            {activeStep === 0 && (
              <div class="ui form">
                <div class="required field">
                  <label>Shop Name</label>
                  <input
                    type="text"
                    placeholder="Enter shop name"
                    onChange={(e) => setShopName(e.target.value)}
                  />
                </div>
                <div class=" required field">
                  <label>Store Place In</label>
                  <select
                    class="ui fluid search dropdown"
                    name="card[expire-month]"
                    onChange={(e) => setShopPlace(e.target.value)}
                  >
                    <option value="" disabled selected>
                      Select The City
                    </option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="" disabled>
                      Punjab Cities
                    </option>
                    <option value="Ahmed Nager Chatha">
                      Ahmed Nager Chatha
                    </option>
                    <option value="Ahmadpur East">Ahmadpur East</option>
                    <option value="Ali Khan Abad">Ali Khan Abad</option>
                    <option value="Alipur">Alipur</option>
                    <option value="Arifwala">Arifwala</option>
                    <option value="Attock">Attock</option>
                    <option value="Bhera">Bhera</option>
                    <option value="Bhalwal">Bhalwal</option>
                    <option value="Bahawalnagar">Bahawalnagar</option>
                    <option value="Bahawalpur">Bahawalpur</option>
                    <option value="Bhakkar">Bhakkar</option>
                    <option value="Burewala">Burewala</option>
                    <option value="Chillianwala">Chillianwala</option>
                    <option value="Chakwal">Chakwal</option>
                    <option value="Chichawatni">Chichawatni</option>
                    <option value="Chiniot">Chiniot</option>
                    <option value="Chishtian">Chishtian</option>
                    <option value="Daska">Daska</option>
                    <option value="Darya Khan">Darya Khan</option>
                    <option value="Dera Ghazi Khan">Dera Ghazi Khan</option>
                    <option value="Dhaular">Dhaular</option>
                    <option value="Dina">Dina</option>
                    <option value="Dinga">Dinga</option>
                    <option value="Dipalpur">Dipalpur</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Ferozewala">Ferozewala</option>
                    <option value="Fateh Jhang">Fateh Jang</option>
                    <option value="Ghakhar Mandi">Ghakhar Mandi</option>
                    <option value="Gojra">Gojra</option>
                    <option value="Gujranwala">Gujranwala</option>
                    <option value="Gujrat">Gujrat</option>
                    <option value="Gujar Khan">Gujar Khan</option>
                    <option value="Hafizabad">Hafizabad</option>
                    <option value="Haroonabad">Haroonabad</option>
                    <option value="Hasilpur">Hasilpur</option>
                    <option value="Haveli Lakha">Haveli Lakha</option>
                    <option value="Jatoi">Jatoi</option>
                    <option value="Jalalpur">Jalalpur</option>
                    <option value="Jattan">Jattan</option>
                    <option value="Jampur">Jampur</option>
                    <option value="Jaranwala">Jaranwala</option>
                    <option value="Jhang">Jhang</option>
                    <option value="Jhelum">Jhelum</option>
                    <option value="Kalabagh">Kalabagh</option>
                    <option value="Karor Lal Esan">Karor Lal Esan</option>
                    <option value="Kasur">Kasur</option>
                    <option value="Kamalia">Kamalia</option>
                    <option value="Kamoke">Kamoke</option>
                    <option value="Khanewal">Khanewal</option>
                    <option value="Khanpur">Khanpur</option>
                    <option value="Kharian">Kharian</option>
                    <option value="Khushab">Khushab</option>
                    <option value="Kot Addu">Kot Addu</option>
                    <option value="Jauharabad">Jauharabad</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Lalamusa">Lalamusa</option>
                    <option value="Layyah">Layyah</option>
                    <option value="Liaquat Pur">Liaquat Pur</option>
                    <option value="Lodhran">Lodhran</option>
                    <option value="Malakwal">Malakwal</option>
                    <option value="Mamoori">Mamoori</option>
                    <option value="Mailsi">Mailsi</option>
                    <option value="Mandi Bahauddin">Mandi Bahauddin</option>
                    <option value="Mian Channu">Mian Channu</option>
                    <option value="Mianwali">Mianwali</option>
                    <option value="Multan">Multan</option>
                    <option value="Murree">Murree</option>
                    <option value="Muridke">Muridke</option>
                    <option value="Mianwali Bangla">Mianwali Bangla</option>
                    <option value="Muzaffargarh">Muzaffargarh</option>
                    <option value="Narowal">Narowal</option>
                    <option value="Nankana Sahib">Nankana Sahib</option>
                    <option value="Okara">Okara</option>
                    <option value="Renala Khurd">Renala Khurd</option>
                    <option value="Pakpattan">Pakpattan</option>
                    <option value="Pattoki">Pattoki</option>
                    <option value="Pir Mahal">Pir Mahal</option>
                    <option value="Qaimpur">Qaimpur</option>
                    <option value="Qila Didar Singh">Qila Didar Singh</option>
                    <option value="Rabwah">Rabwah</option>
                    <option value="Raiwind">Raiwind</option>
                    <option value="Rajanpur">Rajanpur</option>
                    <option value="Rahim Yar Khan">Rahim Yar Khan</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Sadiqabad">Sadiqabad</option>
                    <option value="Safdarabad">Safdarabad</option>
                    <option value="Sahiwal">Sahiwal</option>
                    <option value="Sangla Hill">Sangla Hill</option>
                    <option value="Sarai Alamgir">Sarai Alamgir</option>
                    <option value="Sargodha">Sargodha</option>
                    <option value="Shakargarh">Shakargarh</option>
                    <option value="Sheikhupura">Sheikhupura</option>
                    <option value="Sialkot">Sialkot</option>
                    <option value="Sohawa">Sohawa</option>
                    <option value="Soianwala">Soianwala</option>
                    <option value="Siranwali">Siranwali</option>
                    <option value="Talagang">Talagang</option>
                    <option value="Taxila">Taxila</option>
                    <option value="Toba Tek Singh">Toba Tek Singh</option>
                    <option value="Vehari">Vehari</option>
                    <option value="Wah Cantonment">Wah Cantonment</option>
                    <option value="Wazirabad">Wazirabad</option>
                    <option value="" disabled>
                      Sindh Cities
                    </option>
                    <option value="Badin">Badin</option>
                    <option value="Bhirkan">Bhirkan</option>
                    <option value="Rajo Khanani">Rajo Khanani</option>
                    <option value="Chak">Chak</option>
                    <option value="Dadu">Dadu</option>
                    <option value="Digri">Digri</option>
                    <option value="Diplo">Diplo</option>
                    <option value="Dokri">Dokri</option>
                    <option value="Ghotki">Ghotki</option>
                    <option value="Haala">Haala</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Islamkot">Islamkot</option>
                    <option value="Jacobabad">Jacobabad</option>
                    <option value="Jamshoro">Jamshoro</option>
                    <option value="Jungshahi">Jungshahi</option>
                    <option value="Kandhkot">Kandhkot</option>
                    <option value="Kandiaro">Kandiaro</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Kashmore">Kashmore</option>
                    <option value="Keti Bandar">Keti Bandar</option>
                    <option value="Khairpur">Khairpur</option>
                    <option value="Kotri">Kotri</option>
                    <option value="Larkana">Larkana</option>
                    <option value="Matiari">Matiari</option>
                    <option value="Mehar">Mehar</option>
                    <option value="Mirpur Khas">Mirpur Khas</option>
                    <option value="Mithani">Mithani</option>
                    <option value="Mithi">Mithi</option>
                    <option value="Mehrabpur">Mehrabpur</option>
                    <option value="Moro">Moro</option>
                    <option value="Nagarparkar">Nagarparkar</option>
                    <option value="Naudero">Naudero</option>
                    <option value="Naushahro Feroze">Naushahro Feroze</option>
                    <option value="Naushara">Naushara</option>
                    <option value="Nawabshah">Nawabshah</option>
                    <option value="Nazimabad">Nazimabad</option>
                    <option value="Qambar">Qambar</option>
                    <option value="Qasimabad">Qasimabad</option>
                    <option value="Ranipur">Ranipur</option>
                    <option value="Ratodero">Ratodero</option>
                    <option value="Rohri">Rohri</option>
                    <option value="Sakrand">Sakrand</option>
                    <option value="Sanghar">Sanghar</option>
                    <option value="Shahbandar">Shahbandar</option>
                    <option value="Shahdadkot">Shahdadkot</option>
                    <option value="Shahdadpur">Shahdadpur</option>
                    <option value="Shahpur Chakar">Shahpur Chakar</option>
                    <option value="Shikarpaur">Shikarpaur</option>
                    <option value="Sukkur">Sukkur</option>
                    <option value="Tangwani">Tangwani</option>
                    <option value="Tando Adam Khan">Tando Adam Khan</option>
                    <option value="Tando Allahyar">Tando Allahyar</option>
                    <option value="Tando Muhammad Khan">
                      Tando Muhammad Khan
                    </option>
                    <option value="Thatta">Thatta</option>
                    <option value="Umerkot">Umerkot</option>
                    <option value="Warah">Warah</option>
                    <option value="" disabled>
                      Khyber Cities
                    </option>
                    <option value="Abbottabad">Abbottabad</option>
                    <option value="Adezai">Adezai</option>
                    <option value="Alpuri">Alpuri</option>
                    <option value="Akora Khattak">Akora Khattak</option>
                    <option value="Ayubia">Ayubia</option>
                    <option value="Banda Daud Shah">Banda Daud Shah</option>
                    <option value="Bannu">Bannu</option>
                    <option value="Batkhela">Batkhela</option>
                    <option value="Battagram">Battagram</option>
                    <option value="Birote">Birote</option>
                    <option value="Chakdara">Chakdara</option>
                    <option value="Charsadda">Charsadda</option>
                    <option value="Chitral">Chitral</option>
                    <option value="Daggar">Daggar</option>
                    <option value="Dargai">Dargai</option>
                    <option value="Darya Khan">Darya Khan</option>
                    <option value="Dera Ismail Khan">Dera Ismail Khan</option>
                    <option value="Doaba">Doaba</option>
                    <option value="Dir">Dir</option>
                    <option value="Drosh">Drosh</option>
                    <option value="Hangu">Hangu</option>
                    <option value="Haripur">Haripur</option>
                    <option value="Karak">Karak</option>
                    <option value="Kohat">Kohat</option>
                    <option value="Kulachi">Kulachi</option>
                    <option value="Lakki Marwat">Lakki Marwat</option>
                    <option value="Latamber">Latamber</option>
                    <option value="Madyan">Madyan</option>
                    <option value="Mansehra">Mansehra</option>
                    <option value="Mardan">Mardan</option>
                    <option value="Mastuj">Mastuj</option>
                    <option value="Mingora">Mingora</option>
                    <option value="Nowshera">Nowshera</option>
                    <option value="Paharpur">Paharpur</option>
                    <option value="Pabbi">Pabbi</option>
                    <option value="Peshawar">Peshawar</option>
                    <option value="Saidu Sharif">Saidu Sharif</option>
                    <option value="Shorkot">Shorkot</option>
                    <option value="Shewa Adda">Shewa Adda</option>
                    <option value="Swabi">Swabi</option>
                    <option value="Swat">Swat</option>
                    <option value="Tangi">Tangi</option>
                    <option value="Tank">Tank</option>
                    <option value="Thall">Thall</option>
                    <option value="Timergara">Timergara</option>
                    <option value="Tordher">Tordher</option>
                    <option value="" disabled>
                      Balochistan Cities
                    </option>
                    <option value="Awaran">Awaran</option>
                    <option value="Barkhan">Barkhan</option>
                    <option value="Chagai">Chagai</option>
                    <option value="Dera Bugti">Dera Bugti</option>
                    <option value="Gwadar">Gwadar</option>
                    <option value="Harnai">Harnai</option>
                    <option value="Jafarabad">Jafarabad</option>
                    <option value="Jhal Magsi">Jhal Magsi</option>
                    <option value="Kacchi">Kacchi</option>
                    <option value="Kalat">Kalat</option>
                    <option value="Kech">Kech</option>
                    <option value="Kharan">Kharan</option>
                    <option value="Khuzdar">Khuzdar</option>
                    <option value="Killa Abdullah">Killa Abdullah</option>
                    <option value="Killa Saifullah">Killa Saifullah</option>
                    <option value="Kohlu">Kohlu</option>
                    <option value="Lasbela">Lasbela</option>
                    <option value="Lehri">Lehri</option>
                    <option value="Loralai">Loralai</option>
                    <option value="Mastung">Mastung</option>
                    <option value="Musakhel">Musakhel</option>
                    <option value="Nasirabad">Nasirabad</option>
                    <option value="Nushki">Nushki</option>
                    <option value="Panjgur">Panjgur</option>
                    <option value="Pishin Valley">Pishin Valley</option>
                    <option value="Quetta">Quetta</option>
                    <option value="Sherani">Sherani</option>
                    <option value="Sibi">Sibi</option>
                    <option value="Sohbatpur">Sohbatpur</option>
                    <option value="Washuk">Washuk</option>
                    <option value="Zhob">Zhob</option>
                    <option value="Ziarat">Ziarat</option>
                  </select>
                </div>
              </div>
            )}
            {/* step 1 */}

            {activeStep === 1 && (
              <>
                <div className="stepper-image">
                  <div className="stepper-image-left">
                    <img
                      src={
                        file
                          ? URL.createObjectURL(file)
                          : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                      }
                      alt=""
                    />
                  </div>
                  <div className="steeper-image-right">
                    <div className="formInput">
                      <label htmlFor="file">
                        Image: <DriveFolderUploadOutlinedIcon />
                      </label>
                      <input
                        type="file"
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="ui form">
                  <div class="required field">
                    <label>Name</label>
                    <div class="two fields">
                      <div class="field">
                        <input
                          type="text"
                          name="shipping[first-name]"
                          placeholder="First Name"
                          onChange={(e) => setFirst(e.target.value)}
                        />
                      </div>
                      <div class="field">
                        <input
                          type="text"
                          name="shipping[last-name]"
                          placeholder="Last Name"
                          onChange={(e) => setLast(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="required field">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      placeholder="0335-9638283"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div class="required field">
                    <label>CNIC</label>
                    <input
                      type="text"
                      placeholder="37405-6640078-5"
                      onChange={(e) => setCNIC(e.target.value)}
                    />
                  </div>
                  
                  {/* <div class="required field">
                    <label>CNIC Picture</label>
                    <input
                      type="file"
                      placeholder="37405-6640078-5"
                      onChange={(e) => setCnicPic(e.target.files[0])}
                    />
                  </div>
                  <div className="ui button" onClick={()=>postImg()}>Add CNIC</div> */}
                  
                  <div>

                  </div>
                  
                  
                </div>
              </>
            )}
            {/* step 2 */}
            {activeStep === 2 && (
              <div>
                <form class="ui form">
                  <h4 class="ui dividing header">Bussiness Address</h4>
                  <div class="required field">
                    <label>Street Address</label>
                    <div class="fields">
                      <div class="twelve wide field">
                        <input
                          type="text"
                          name="shipping[address]"
                          placeholder="Street Address"
                          onChange={(e) => setStreetAddress(e.target.value)}
                        />
                      </div>
                      <div class="four wide field">
                        <input
                          type="text"
                          name="shipping[address-2]"
                          placeholder="Apt #"
                          onChange={(e) => setHouseNo(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="two fields">
                    <div class="required field">
                      <label>Country</label>
                      <select
                        class="ui fluid dropdown"
                        onChange={(e) => setCountry(e.target.value)}
                      >
                        <option value="" disabled selected>
                          Country
                        </option>
                        <option value="PAK">Pakistan</option>
                      </select>
                    </div>
                    <div class="required field">
                      <label>State</label>
                      <select
                        class="ui fluid dropdown"
                        onChange={(e) => setState(e.target.value)}
                      >
                        <option value="" disabled selected>
                          State
                        </option>
                        <option value="IS">Islamabad</option>
                        <option value="PN">Punjab</option>
                        <option value="KPK">KPK</option>
                        <option value="SI">Sindh</option>
                        <option value="BA">Balochistan</option>
                      </select>
                    </div>
                  </div>
                  <div class="field">
                    <div class=" required field">
                      <label>City</label>
                      <select
                        class="ui fluid search dropdown"
                        name="card[expire-month]"
                        onChange={(e) => setCity(e.target.value)}
                      >
                        <option value="" disabled selected>
                          Select The City
                        </option>
                        <option value="Islamabad">Islamabad</option>
                        <option value="" disabled>
                          Punjab Cities
                        </option>
                        <option value="Ahmed Nager Chatha">
                          Ahmed Nager Chatha
                        </option>
                        <option value="Ahmadpur East">Ahmadpur East</option>
                        <option value="Ali Khan Abad">Ali Khan Abad</option>
                        <option value="Alipur">Alipur</option>
                        <option value="Arifwala">Arifwala</option>
                        <option value="Attock">Attock</option>
                        <option value="Bhera">Bhera</option>
                        <option value="Bhalwal">Bhalwal</option>
                        <option value="Bahawalnagar">Bahawalnagar</option>
                        <option value="Bahawalpur">Bahawalpur</option>
                        <option value="Bhakkar">Bhakkar</option>
                        <option value="Burewala">Burewala</option>
                        <option value="Chillianwala">Chillianwala</option>
                        <option value="Chakwal">Chakwal</option>
                        <option value="Chichawatni">Chichawatni</option>
                        <option value="Chiniot">Chiniot</option>
                        <option value="Chishtian">Chishtian</option>
                        <option value="Daska">Daska</option>
                        <option value="Darya Khan">Darya Khan</option>
                        <option value="Dera Ghazi Khan">Dera Ghazi Khan</option>
                        <option value="Dhaular">Dhaular</option>
                        <option value="Dina">Dina</option>
                        <option value="Dinga">Dinga</option>
                        <option value="Dipalpur">Dipalpur</option>
                        <option value="Faisalabad">Faisalabad</option>
                        <option value="Ferozewala">Ferozewala</option>
                        <option value="Fateh Jhang">Fateh Jang</option>
                        <option value="Ghakhar Mandi">Ghakhar Mandi</option>
                        <option value="Gojra">Gojra</option>
                        <option value="Gujranwala">Gujranwala</option>
                        <option value="Gujrat">Gujrat</option>
                        <option value="Gujar Khan">Gujar Khan</option>
                        <option value="Hafizabad">Hafizabad</option>
                        <option value="Haroonabad">Haroonabad</option>
                        <option value="Hasilpur">Hasilpur</option>
                        <option value="Haveli Lakha">Haveli Lakha</option>
                        <option value="Jatoi">Jatoi</option>
                        <option value="Jalalpur">Jalalpur</option>
                        <option value="Jattan">Jattan</option>
                        <option value="Jampur">Jampur</option>
                        <option value="Jaranwala">Jaranwala</option>
                        <option value="Jhang">Jhang</option>
                        <option value="Jhelum">Jhelum</option>
                        <option value="Kalabagh">Kalabagh</option>
                        <option value="Karor Lal Esan">Karor Lal Esan</option>
                        <option value="Kasur">Kasur</option>
                        <option value="Kamalia">Kamalia</option>
                        <option value="Kamoke">Kamoke</option>
                        <option value="Khanewal">Khanewal</option>
                        <option value="Khanpur">Khanpur</option>
                        <option value="Kharian">Kharian</option>
                        <option value="Khushab">Khushab</option>
                        <option value="Kot Addu">Kot Addu</option>
                        <option value="Jauharabad">Jauharabad</option>
                        <option value="Lahore">Lahore</option>
                        <option value="Lalamusa">Lalamusa</option>
                        <option value="Layyah">Layyah</option>
                        <option value="Liaquat Pur">Liaquat Pur</option>
                        <option value="Lodhran">Lodhran</option>
                        <option value="Malakwal">Malakwal</option>
                        <option value="Mamoori">Mamoori</option>
                        <option value="Mailsi">Mailsi</option>
                        <option value="Mandi Bahauddin">Mandi Bahauddin</option>
                        <option value="Mian Channu">Mian Channu</option>
                        <option value="Mianwali">Mianwali</option>
                        <option value="Multan">Multan</option>
                        <option value="Murree">Murree</option>
                        <option value="Muridke">Muridke</option>
                        <option value="Mianwali Bangla">Mianwali Bangla</option>
                        <option value="Muzaffargarh">Muzaffargarh</option>
                        <option value="Narowal">Narowal</option>
                        <option value="Nankana Sahib">Nankana Sahib</option>
                        <option value="Okara">Okara</option>
                        <option value="Renala Khurd">Renala Khurd</option>
                        <option value="Pakpattan">Pakpattan</option>
                        <option value="Pattoki">Pattoki</option>
                        <option value="Pir Mahal">Pir Mahal</option>
                        <option value="Qaimpur">Qaimpur</option>
                        <option value="Qila Didar Singh">
                          Qila Didar Singh
                        </option>
                        <option value="Rabwah">Rabwah</option>
                        <option value="Raiwind">Raiwind</option>
                        <option value="Rajanpur">Rajanpur</option>
                        <option value="Rahim Yar Khan">Rahim Yar Khan</option>
                        <option value="Rawalpindi">Rawalpindi</option>
                        <option value="Sadiqabad">Sadiqabad</option>
                        <option value="Safdarabad">Safdarabad</option>
                        <option value="Sahiwal">Sahiwal</option>
                        <option value="Sangla Hill">Sangla Hill</option>
                        <option value="Sarai Alamgir">Sarai Alamgir</option>
                        <option value="Sargodha">Sargodha</option>
                        <option value="Shakargarh">Shakargarh</option>
                        <option value="Sheikhupura">Sheikhupura</option>
                        <option value="Sialkot">Sialkot</option>
                        <option value="Sohawa">Sohawa</option>
                        <option value="Soianwala">Soianwala</option>
                        <option value="Siranwali">Siranwali</option>
                        <option value="Talagang">Talagang</option>
                        <option value="Taxila">Taxila</option>
                        <option value="Toba Tek Singh">Toba Tek Singh</option>
                        <option value="Vehari">Vehari</option>
                        <option value="Wah Cantonment">Wah Cantonment</option>
                        <option value="Wazirabad">Wazirabad</option>
                        <option value="" disabled>
                          Sindh Cities
                        </option>
                        <option value="Badin">Badin</option>
                        <option value="Bhirkan">Bhirkan</option>
                        <option value="Rajo Khanani">Rajo Khanani</option>
                        <option value="Chak">Chak</option>
                        <option value="Dadu">Dadu</option>
                        <option value="Digri">Digri</option>
                        <option value="Diplo">Diplo</option>
                        <option value="Dokri">Dokri</option>
                        <option value="Ghotki">Ghotki</option>
                        <option value="Haala">Haala</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Islamkot">Islamkot</option>
                        <option value="Jacobabad">Jacobabad</option>
                        <option value="Jamshoro">Jamshoro</option>
                        <option value="Jungshahi">Jungshahi</option>
                        <option value="Kandhkot">Kandhkot</option>
                        <option value="Kandiaro">Kandiaro</option>
                        <option value="Karachi">Karachi</option>
                        <option value="Kashmore">Kashmore</option>
                        <option value="Keti Bandar">Keti Bandar</option>
                        <option value="Khairpur">Khairpur</option>
                        <option value="Kotri">Kotri</option>
                        <option value="Larkana">Larkana</option>
                        <option value="Matiari">Matiari</option>
                        <option value="Mehar">Mehar</option>
                        <option value="Mirpur Khas">Mirpur Khas</option>
                        <option value="Mithani">Mithani</option>
                        <option value="Mithi">Mithi</option>
                        <option value="Mehrabpur">Mehrabpur</option>
                        <option value="Moro">Moro</option>
                        <option value="Nagarparkar">Nagarparkar</option>
                        <option value="Naudero">Naudero</option>
                        <option value="Naushahro Feroze">
                          Naushahro Feroze
                        </option>
                        <option value="Naushara">Naushara</option>
                        <option value="Nawabshah">Nawabshah</option>
                        <option value="Nazimabad">Nazimabad</option>
                        <option value="Qambar">Qambar</option>
                        <option value="Qasimabad">Qasimabad</option>
                        <option value="Ranipur">Ranipur</option>
                        <option value="Ratodero">Ratodero</option>
                        <option value="Rohri">Rohri</option>
                        <option value="Sakrand">Sakrand</option>
                        <option value="Sanghar">Sanghar</option>
                        <option value="Shahbandar">Shahbandar</option>
                        <option value="Shahdadkot">Shahdadkot</option>
                        <option value="Shahdadpur">Shahdadpur</option>
                        <option value="Shahpur Chakar">Shahpur Chakar</option>
                        <option value="Shikarpaur">Shikarpaur</option>
                        <option value="Sukkur">Sukkur</option>
                        <option value="Tangwani">Tangwani</option>
                        <option value="Tando Adam Khan">Tando Adam Khan</option>
                        <option value="Tando Allahyar">Tando Allahyar</option>
                        <option value="Tando Muhammad Khan">
                          Tando Muhammad Khan
                        </option>
                        <option value="Thatta">Thatta</option>
                        <option value="Umerkot">Umerkot</option>
                        <option value="Warah">Warah</option>
                        <option value="" disabled>
                          Khyber Cities
                        </option>
                        <option value="Abbottabad">Abbottabad</option>
                        <option value="Adezai">Adezai</option>
                        <option value="Alpuri">Alpuri</option>
                        <option value="Akora Khattak">Akora Khattak</option>
                        <option value="Ayubia">Ayubia</option>
                        <option value="Banda Daud Shah">Banda Daud Shah</option>
                        <option value="Bannu">Bannu</option>
                        <option value="Batkhela">Batkhela</option>
                        <option value="Battagram">Battagram</option>
                        <option value="Birote">Birote</option>
                        <option value="Chakdara">Chakdara</option>
                        <option value="Charsadda">Charsadda</option>
                        <option value="Chitral">Chitral</option>
                        <option value="Daggar">Daggar</option>
                        <option value="Dargai">Dargai</option>
                        <option value="Darya Khan">Darya Khan</option>
                        <option value="Dera Ismail Khan">
                          Dera Ismail Khan
                        </option>
                        <option value="Doaba">Doaba</option>
                        <option value="Dir">Dir</option>
                        <option value="Drosh">Drosh</option>
                        <option value="Hangu">Hangu</option>
                        <option value="Haripur">Haripur</option>
                        <option value="Karak">Karak</option>
                        <option value="Kohat">Kohat</option>
                        <option value="Kulachi">Kulachi</option>
                        <option value="Lakki Marwat">Lakki Marwat</option>
                        <option value="Latamber">Latamber</option>
                        <option value="Madyan">Madyan</option>
                        <option value="Mansehra">Mansehra</option>
                        <option value="Mardan">Mardan</option>
                        <option value="Mastuj">Mastuj</option>
                        <option value="Mingora">Mingora</option>
                        <option value="Nowshera">Nowshera</option>
                        <option value="Paharpur">Paharpur</option>
                        <option value="Pabbi">Pabbi</option>
                        <option value="Peshawar">Peshawar</option>
                        <option value="Saidu Sharif">Saidu Sharif</option>
                        <option value="Shorkot">Shorkot</option>
                        <option value="Shewa Adda">Shewa Adda</option>
                        <option value="Swabi">Swabi</option>
                        <option value="Swat">Swat</option>
                        <option value="Tangi">Tangi</option>
                        <option value="Tank">Tank</option>
                        <option value="Thall">Thall</option>
                        <option value="Timergara">Timergara</option>
                        <option value="Tordher">Tordher</option>
                        <option value="" disabled>
                          Balochistan Cities
                        </option>
                        <option value="Awaran">Awaran</option>
                        <option value="Barkhan">Barkhan</option>
                        <option value="Chagai">Chagai</option>
                        <option value="Dera Bugti">Dera Bugti</option>
                        <option value="Gwadar">Gwadar</option>
                        <option value="Harnai">Harnai</option>
                        <option value="Jafarabad">Jafarabad</option>
                        <option value="Jhal Magsi">Jhal Magsi</option>
                        <option value="Kacchi">Kacchi</option>
                        <option value="Kalat">Kalat</option>
                        <option value="Kech">Kech</option>
                        <option value="Kharan">Kharan</option>
                        <option value="Khuzdar">Khuzdar</option>
                        <option value="Killa Abdullah">Killa Abdullah</option>
                        <option value="Killa Saifullah">Killa Saifullah</option>
                        <option value="Kohlu">Kohlu</option>
                        <option value="Lasbela">Lasbela</option>
                        <option value="Lehri">Lehri</option>
                        <option value="Loralai">Loralai</option>
                        <option value="Mastung">Mastung</option>
                        <option value="Musakhel">Musakhel</option>
                        <option value="Nasirabad">Nasirabad</option>
                        <option value="Nushki">Nushki</option>
                        <option value="Panjgur">Panjgur</option>
                        <option value="Pishin Valley">Pishin Valley</option>
                        <option value="Quetta">Quetta</option>
                        <option value="Sherani">Sherani</option>
                        <option value="Sibi">Sibi</option>
                        <option value="Sohbatpur">Sohbatpur</option>
                        <option value="Washuk">Washuk</option>
                        <option value="Zhob">Zhob</option>
                        <option value="Ziarat">Ziarat</option>
                      </select>
                    </div>
                    {/* <div class="field">
                      <label>Location</label>
                      <select class="ui fluid dropdown">
                        <option value="">Country</option>
                        <option value="PAK">Pakistan</option>
                      </select>
                    </div> */}
                  </div>
                </form>
              </div>
            )}

            {activeStep === 3 && (
              <Box
                sx={{ bgcolor: "white" }}
                style={{ padding: "20px 20px 20px 20px" }}
              >
                <h3>Your Details</h3>
                <h4>Shop Name</h4>
                <h4>{FullName}</h4>
                <h4>Name</h4>
                <h4>Contact Info</h4>
                <div
                  className="ui button"
                  style={{ textAlign: "center" }}
                  onClick={() => AddShop()}
                >
                  Submit
                </div>
              </Box>
            )}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {/* {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )} */}

              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </div>
  );
}