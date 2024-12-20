import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus, FaUser, FaHome } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { IoIosContact } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import trapezium from "../assets/trapezium.png";
import button from "../assets/button.png";
// import triangle from "../assets/triangle.svg";
import bgg from "../assets/form.png";
import logo from "../assets/name.png";
import ramp from "../assets/ramp.png";
import Loading from "./Loading";

const Registration = () => {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [student_no, setStudentNumber] = useState("");
  let [mobile, setContact] = useState("");
  let [gender, setGender] = useState("");
  let [branch, setBranch] = useState("");
  let [unstop, setUnstop] = useState("");
  let [residence, setResidence] = useState("");

  let [Name2, setName2] = useState("");
  let [Email2, setEmail2] = useState("");
  let [StudentNumber2, setStudentNumber2] = useState("");
  let [Contact2, setContact2] = useState("");
  let [gender2, setgender2] = useState("");
  let [Branch2, setBranch2] = useState("");
  let [unstop2, setunstop2] = useState("");
  let [Residence2, setResidence2] = useState("");
  let [team_name, setteamName] = useState("");
  let [domain_name, setDomain] = useState("");
  let [error, setError] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  let [recaptchaToken, setRecaptchaToken] = useState("");
  let [next, setNext] = useState(false);

  let handleRecaptchaChange = (token) => {
    let trimmedToken = token.trim();
    console.log(trimmedToken);
    setRecaptchaToken(trimmedToken);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (valid2()) {
      setIsLoading(true);
      const formData = {
        team_name,
        domain_name,
        participants: [
          {
            name,
            email,
            student_no,
            mobile,
            gender,
            branch,
            unstop,
            residence,
          },
          {
            name: Name2,
            email: Email2,
            student_no: StudentNumber2,
            mobile: Contact2,
            gender: gender2,
            branch: Branch2,
            unstop: unstop2,
            residence: Residence2,
          },
        ],
        recaptcha_response: recaptchaToken,
      };
      //console.log(formData)
      console.log(JSON.stringify(formData, null, 2));

      try {
        const response = await axios.post(
          "https://form-event.onrender.com/register",
          formData
        );
        console.log("response", response);
        console.log(response.data);
        console.log(response.message);
        toast.success("Registration Successful");
        clearField();
      }
       catch (error) {
          console.log("error" ,error);
         console.log(error.message);
         console.log(error.response.data.detail);
        //  console.log("arr" , error.response.data.detail[0].msg);
           toast.error()
          toast.error(error.response.data.detail);
          setError(error.message);
        // if (
        //   error.response.data.detail == "Invalid reCAPTCHA. Please try again."
        // ) {
        //   toast.error("Invalid Captcha. Try Again!");
        // }
        // if (error.response && error.response.data) {
        //   const errorMsg = error.response.data.detail[0].msg;
        //   toast.error(errorMsg);
        //   toast;
        // } else {
        //   toast.error("An unexpected error occurred");
        // }
      } finally {
        setIsLoading(false);
      }
    }
  };

  let handleNext = () => {
    if (valid()) {
      setNext(true);
    }
  };

  let valid = () => {
    if (
      team_name === "" ||
      domain_name === "" ||
      name === "" ||
      email === "" ||
      student_no === "" ||
      gender === "" ||
      branch === "" ||
      // unstop === "" ||
      residence === "" ||
      mobile === ""
    ) {
      toast.error("All Fields are required");
      return false;
    }
    if (!email.endsWith("@akgec.ac.in")) {
      toast.error("Email should end with @akgec.ac.in");
      return false;
    }
    if (!(student_no.startsWith("23") || student_no.startsWith("24"))) {
      toast.error("Invalid student number");
      return false;
    }

    if (mobile.length !== 10) {
      toast.error("Mobile number should be 10 digits");
      return false;
    }

    return true;
  };
  let valid2 = () => {
    if (
      team_name === "" ||
      Name2 === "" ||
      Email2 === "" ||
      StudentNumber2 === "" ||
      gender2 === "" ||
      Branch2 === "" ||
      // unstop2 === "" ||
      Residence2 === "" ||
      Contact2 === "" ||
      recaptchaToken === ""
    ) {
      toast.error("All Fields are required");
      return false;
    }
    if (!Email2.endsWith("@akgec.ac.in")) {
      toast.error("Email should end with @akgec.ac.in");
      return false;
    }
    if (!(StudentNumber2.startsWith("23") || StudentNumber2.startsWith("24"))) {
      toast.error("Invalid student number");
      return false;
    }
    
    

    if (Contact2.length !== 10) {
      toast.error("Mobile number should be 10 digits");
      return false;
    }

    return true;
  };

  let clearField = () => {
    (name = ""),
      (domain_name = ""),
      (email = ""),
      (student_no = ""),
      (gender = ""),
      (branch = ""),
      (unstop = ""),
      (residence = ""),
      (mobile = ""),
      (recaptchaToken = ""),
      (Name2 = ""),
      (Email2 = ""),
      (StudentNumber2 = ""),
      (gender2 = ""),
      (Branch2 = ""),
      (unstop2 = ""),
      (Residence2 = ""),
      (team_name = ""),
      (Contact2 = "");
    setNext(false);
  };

  return (
    <div
      className="h-screen w-screen py-auto relative bg-cover overflow-y-auto"
      style={{ backgroundImage: `url(${bgg})`, backgroundRepeat: "no-repeat" }}
    >
      <ToastContainer />
      <div className="blocks flex w-full justify-between absolute h-full py-52">
        <img src={trapezium} className="rotate-180 mx:w-[7vw]" alt="" />
        <img src={trapezium} className="mx:w-[7vw]" alt="" />
      </div>

      {/* <Link to='/' className='cursor-pointer z-50'> <img src={logo} className="absolute  mx:w-[12vw] h-14 mt-16 md:h-44 md:w-44 left-5 top-5 z-50" alt="" /> </Link>
      <img src={ramp} className="absolute w-1/3 right-0 bottom-0 z-0" alt="" /> */}

      <div className="relative h-full md:py-5 mx:pt-11 mx:pb-2">
        <div className="flex flex-col mx:mt-10 w-fit px-2 py-1 rounded-lg mx-auto [text-shadow:0_0_10px_black] bg-black bg-opacity-70 mb-4 text-center">
          <span className="text-3xl">
            Excited for{" "}
            <span className="text-[rgb(150,198,245)]">DEVCLASH</span> !!
          </span>
          <span>CODE THE FRAME TO WIN EXCITING REWARDS</span>
        </div>

        <div className="backdrop-blur-xl bg-[rgb(7,12,35)]  max-[800px]:top-0 max-w-sm sm:max-w-xl mx-auto my-auto px-4 sm:px-20 pt-6 h-auto rounded-2xl m-10">
          <div className="text-center">
            <h1 className="text-3xl sm:text-3xl font-poppins font-semibold text-[rgb(149,197,244)]">
              REGISTER HERE
            </h1>
            {next == false ? (
              <p
                className={`text-sm sm:text-base text-white mt-1 mb-3 font-semibold`}
              >
                MEMBER 1
              </p>
            ) : (
              <p
                className={`text-sm sm:text-base text-white mt-1 mb-3 font-semibold`}
              >
                MEMBER 2
              </p>
            )}
          </div>

          <div className="">
            <input
              type="text"
              value={team_name}
              onChange={(e) => setteamName(e.target.value)}
              className="text-sm z-50  sm:text-xl text-white w-full pl-3 sm:pl-4 pr-10 sm:pr-12 py-4 sm:py-3 bg-[rgb(51,118,188)] placeholder:bg-transparent rounded-lg "
              placeholder="Enter Team name"
            />
          </div>
          <div className="mt-2">
            <select
              value={domain_name}
              onChange={(e) => setDomain(e.target.value)}
              className="text-sm sm:text-xl text-white w-full pl-3 sm:pl-4 pr-10 sm:pr-12 py-4 sm:py-3 bg-[rgb(51,118,188)] placeholder:bg-transparent rounded-lg"
            >
              <option value="">Select Domain</option>
              <option value="Web Development">Web Development</option>
              <option value="App Developmen">App Development</option>
            </select>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 ">
            {/* member 1 */}
            <div className={`${next == false ? "block" : "hidden"}`}>
              <div className="flex items-center rounded-lg mt-2 relative h-full">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-sm sm:text-xl text-white w-full pl-3 sm:pl-4 pr-10 sm:pr-12 py-4 sm:py-3 bg-[rgb(51,118,188)] placeholder:bg-transparent rounded-lg"
                  placeholder="Enter name"
                />
                <div className="icon absolute right-3 text-lg sm:text-2xl flex items-center text-white">
                  <FaUser />
                </div>
              </div>
              {/* <span className="text-red-700 mt-0 bg-blue-600 h-1">*</span> */}
              <div className="flex items-center rounded-lg mt-2 relative h-full">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-sm sm:text-xl text-white w-full pl-3 sm:pl-4 pr-10 sm:pr-12 py-4 sm:py-3 rounded-lg bg-[rgb(51,118,188)] placeholder:bg-transparent"
                  placeholder={`Enter Email`}
                />
                <div className="icon absolute right-3 text-lg sm:text-2xl flex items-center text-white">
                  {/* <span className="text-red-700 text-3xl">*</span> */}
                  <MdEmail />
                </div>
              </div>

              <div className="md:flex block gap-2 ">
                <div className="flex items-center rounded-lg mt-2 relative h-full">
                  <input
                    type="text"
                    value={student_no}
                    onChange={(e) => setStudentNumber(e.target.value)}
                    className="text-sm sm:text-xl text-white w-full pl-3 sm:pl-4 pr-10 sm:pr-12 py-4 sm:py-3 rounded-lg bg-[rgb(51,118,188)] placeholder:bg-transparent"
                    placeholder="Student no."
                  />
                  <div className="icon absolute right-3 text-lg sm:text-2xl flex items-center text-white">
                    <PiStudentBold />
                  </div>
                </div>
                <div className="flex items-center rounded-lg relative h-full mt-2">
                  <input
                    type="text"
                    value={mobile}
                    onChange={(e) => setContact(e.target.value)}
                    className="text-sm sm:text-xl text-white w-full pl-3 sm:pl-4 pr-10 sm:pr-12 py-4 sm:py-3 rounded-lg bg-[rgb(51,118,188)] placeholder:bg-transparent"
                    placeholder="Contact no."
                  />
                  <div className="icon absolute right-3 text-lg sm:text-2xl flex items-center text-white">
                    <IoIosContact />
                  </div>
                </div>
              </div>

              <div className="flex  gap-2">
                <div className="flex items-center rounded-lg mt-2 relative h-full w-6/12">
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="text-sm sm:text-xl text-white w-full pl-3 sm:pl-4 pr-10 sm:pr-12 py-4 sm:py-3 bg-[rgb(51,118,188)] placeholder:bg-transparent rounded-lg"
                  >
                    <option value=""> Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div className="flex items-center rounded-lg mt-2 relative h-full w-6/12">
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="text-sm sm:text-xl text-white w-full pl-3 sm:pl-4 pr-10 sm:pr-12 py-4  sm:py-3  bg-[rgb(51,118,188)] placeholder:bg-transparent rounded-lg"
                  >
                    <option value="">Branch</option>
                    <option value="CSE(core)">CSE</option>
                    <option value="CSE(AIML)">CSE(AIML)</option>
                    <option value="CSE(DS)">CSE(DS)</option>
                    <option value="CSE">CSE(Hindi)</option>
                    <option value="CS">CS</option>
                    <option value="IT">IT</option>
                    <option value="CSIT">CSIT</option>
                    <option value="AIML">AIML</option>
                    <option value="ECE/EN">ECE/EN</option>
                    <option value="ME">ME</option>
                    <option value="CE">CE</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center rounded-lg mt-2 relative h-full">
                <input
                  type="text"
                  value={unstop}
                  onChange={(e) => setUnstop(e.target.value)}
                  className="text-sm sm:text-xl text-white w-full pl-3 sm:pl-4 pr-10 sm:pr-12 py-4 sm:py-3 rounded-lg bg-[rgb(51,118,188)] placeholder:bg-transparent"
                  placeholder="Unstop Id (or NA)"
                />
                <div className="icon absolute right-3 text-lg sm:text-2xl flex items-center text-white">
                  {/* <span className="text-red-700 text-3xl">*</span> */}
                  <FaUserPlus />
                </div>
              </div>
              <div className="flex items-center rounded-lg mt-2 relative h-full">
                <select
                  value={residence}
                  onChange={(e) => setResidence(e.target.value)}
                  className="text-sm sm:text-xl text-white w-full pl-3 sm:pl-4 pr-10 sm:pr-12 py-4 sm:py-3 bg-[rgb(51,118,188)] placeholder:bg-transparent rounded-lg appearance-none"
                >
                  <option value="">Select Residence</option>
                  <option value="Hosteller">Hosteller</option>
                  <option value="DayScholar">DayScholar</option>
                </select>
                <div className="icon absolute right-3 text-lg sm:text-2xl flex items-center text-white">
                  <FaHome />
                </div>
              </div>

              <div
                onClick={handleNext}
                className="relative mx-auto mt-4 mb-2  z-2 text-center font-albert font-semibold text-xl md:text-2xl shadow-sm text-black py-5 px-8 bg-no-repeat bg-center bg-contain w-fit transform hover:scale-105 transition-all ease-in-out delay-0 duration-3000 cursor-pointer z-50"
                style={{
                  backgroundImage: `url(${button})`,
                }}
              >
                <p className="p-2 z-50">Add Member</p>
              </div>
            </div>

            {/* meneber2 */}
            <div className={`${next ? "block" : "hidden"} `}>
              <div className="flex items-center rounded-lg  relative h-full">
                {/* <div className="flex items-center rounded-lg relative h-full"> */}
                <input
                  type="text"
                  value={Name2}
                  onChange={(e) => setName2(e.target.value)}
                  className="text-sm sm:text-xl text-white w-full pl-3 sm:pl-4 pr-10 sm:pr-12 py-3 sm:py-3 bg-[rgb(51,118,188)] placeholder:bg-transparent rounded-lg"
                  placeholder="Enter Name"
                />
                <div className="icon absolute right-3 text-lg sm:text-2xl flex items-center text-white">
                  {/* <span className="text-red-700 text-3xl">*</span> */}
                  <FaUser />
                </div>
              </div>
              <div className="flex items-center rounded-lg relative h-full mt-2">
                <input
                  id="email"
                  type="email"
                  value={Email2}
                  onChange={(e) => setEmail2(e.target.value)}
                  className="text-sm sm:text-xl text-white w-full pl-3 sm:pl-4 pr-10 sm:pr-12 py-3 sm:py-3 rounded-lg bg-[rgb(51,118,188)] placeholder:bg-transparent"
                  placeholder={`Enter Email`}
                />
                <div className="icon absolute right-3 text-lg sm:text-2xl flex items-center text-white">
                  {/* <span className="text-red-700 text-3xl">*</span> */}
                  <MdEmail />
                </div>
              </div>

              <div className="md:flex block gap-2">
                <div className="flex items-center rounded-lg relative h-full md:w-6/12 w-full mt-2">
                  <input
                    type="text"
                    value={StudentNumber2}
                    onChange={(e) => setStudentNumber2(e.target.value)}
                    className="text-sm sm:text-xl text-white w-full pl-3 sm:pl-4 pr-10 sm:pr-12 py-3 sm:py-3 rounded-lg bg-[rgb(51,118,188)] placeholder:bg-transparent"
                    placeholder=" Student No."
                  />
                  <div className="icon absolute right-3 text-lg sm:text-2xl flex items-center text-white">
                    <PiStudentBold />
                  </div>
                </div>
                <div className="flex items-center rounded-lg relative h-full mt-2 md:w-6/12  w-full">
                  <input
                    type="text"
                    value={Contact2}
                    onChange={(e) => setContact2(e.target.value)}
                    className="text-sm sm:text-xl text-white w-full pl-3 sm:pl-4 pr-10 sm:pr-12 py-3 sm:py-3 rounded-lg bg-[rgb(51,118,188)] placeholder:bg-transparent"
                    placeholder="Contact No."
                  />
                  <div className="icon absolute right-3 text-lg sm:text-2xl flex items-center text-white">
                    <IoIosContact />
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="flex items-center rounded-lg relative h-full mt-2  w-6/12">
                  <select
                    value={gender2}
                    onChange={(e) => setgender2(e.target.value)}
                    className="text-sm sm:text-xl text-white w-full pl-3 sm:pl-4 pr-10 sm:pr-12 py-3 sm:py-3 bg-[rgb(51,118,188)] placeholder:bg-transparent rounded-lg"
                  >
                    <option value="" disabled>
                      Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="flex items-center rounded-lg relative h-full mt-2  w-6/12">
                  <select
                    value={Branch2}
                    onChange={(e) => setBranch2(e.target.value)}
                    className="text-sm sm:text-xl text-white w-full pl-3 sm:pl-4 pr-10 sm:pr-12 py-3 sm:py-3 bg-[rgb(51,118,188)] placeholder:bg-transparent rounded-lg"
                  >
                    <option value="">Branch</option>
                    <option value="CSE(core)">CSE</option>
                    <option value="CSE(AIML)">CSE(AIML)</option>
                    <option value="CSE(DS)">CSE(DS)</option>
                    <option value="CSE">CSE(Hindi)</option>
                    <option value="CS">CS</option>
                    <option value="IT">IT</option>
                    <option value="CSIT">CSIT</option>
                    <option value="AIML">AIML</option>
                    <option value="ECE/EN">ECE/EN</option>
                    <option value="ME">ME</option>
                    <option value="CE">CE</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center rounded-lg relative h-full mt-2">
                <input
                  type="text"
                  value={unstop2}
                  onChange={(e) => setunstop2(e.target.value)}
                  className="text-sm sm:text-xl text-white w-full pl-3 sm:pl-4 pr-10 sm:pr-12 py-3 sm:py-3 rounded-lg bg-[rgb(51,118,188)] placeholder:bg-transparent"
                  placeholder="Unstop Id (or NA)"
                />
                <div className="icon absolute right-3 text-lg sm:text-2xl flex items-center text-white">
                  {/* <span className="text-red-700 text-3xl">*</span> */}
                  <FaUserPlus />
                </div>
              </div>
              <div className="flex items-center rounded-lg relative h-full mt-2">
                <select
                  value={Residence2}
                  onChange={(e) => setResidence2(e.target.value)}
                  className="text-sm sm:text-xl text-white w-full pl-3 sm:pl-4 pr-10 sm:pr-12 py-4 sm:py-3 bg-[rgb(51,118,188)] placeholder:bg-transparent rounded-lg appearance-none"
                >
                  <option value="">Select Residence</option>
                  <option value="Hosteller">Hosteller</option>
                  <option value="DayScholar">DayScholar</option>
                </select>
                <div className="icon absolute right-3 text-lg sm:text-2xl flex items-center text-white">
                  <FaHome />
                </div>
              </div>

              <div className="sm:flex block gap-2">
                <div className="flex justify-center items-center mt-3 z-50">
                  <ReCAPTCHA
                    sitekey="6Lcd2CMpAAAAAKLqwdxjTgnWwzSgAGEgtl0BVOng"
          
                    onChange={handleRecaptchaChange}
                  />
                </div>
                {isLoading ? (
                  <div className="text-center">
                    <Loading />
                  </div>
                ) : (
                  <div
                    className="relative mx-auto  z-2 text-center font-albert font-semibold text-[1vw] flex justify-center items-center shadow-sm text-black py-4   px-4  bg-no-repeat bg-center bg-contain w-fit transform hover:scale-105 transition-all ease-in-out delay-0 duration-3000 cursor-pointer"
                    style={{
                      backgroundImage: `url(${button})`,
                    }}
                  >
                    <button type="submit" className="p-3 text-2xl font-bolder">
                      Submit
                    </button>
                  </div>
                )}
              </div>
              {error && (
                <p className="text-sm sm:text-lg text-red-600 text-center mt-0">
                  {error}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
      {/* <div className="z-0 bg-red-600">
        <img
          src={triangle}
          alt="img"
          className="w-full absolute bottom-0 -z-10 "
        />
      </div> */}
    </div>
  );
};

export default Registration;
