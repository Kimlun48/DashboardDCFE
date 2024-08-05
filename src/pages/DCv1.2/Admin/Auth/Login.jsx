// Import hook react
import React, { useState } from "react";

// Import BASE URL API
import Api from "../../../../api";

// Import toast
import toast, {Toaster}from "react-hot-toast";

// Import js cookie
import Cookies from "js-cookie";

// Import react router dom
import { useNavigate } from "react-router-dom";

import FooterDc from "../../../../components/footer";

function Login() {
    // Set title page
    document.title = "Login - Administrator";

    // Initialize navigate
    const navigate = useNavigate();

    // Initialize state for user credentials
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    // Initialize loading state
    const [isLoading, setLoading] = useState(false);

    // Initialize state for validation errors
    const [validation, setValidation] = useState({});

    // Function to handle login submission
    const loginHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const response = await Api.post("/api/login", {
                name: name,
                password: password,
            });
    
            // Log the entire response for debugging
            // console.log("API Response:", response);
    
            setLoading(false);
    
            toast.success("Login Successfully.", {
                duration: 4000,
                position: "top-right",
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
                icon: '✅',
            });
    
            // Extract tokens from response
            const accessToken = response.data.access_token;
            const refreshToken = response.data.refresh_token;
    
           
            if (accessToken && refreshToken) {
                Cookies.set("access_token", accessToken, { 
                  //  secure: process.env.NODE_ENV === 'production', //untuk produksi dengan HTTPS
                  //  sameSite: "None" //untuk produksi dengan HTTPS
                });
                Cookies.set("refresh_token", refreshToken, { 
                    // secure: process.env.NODE_ENV === 'production', // untuk produksi dengan HTTPS
                    //  sameSite: "None" // untuk produksi dengan HTTPS
                });
    
                // Verify cookies are set correctly
                // console.log("Access Token from Cookies:", Cookies.get("access_token"));
                // console.log("Refresh Token from Cookies:", Cookies.get("refresh_token"));
    
                navigate("/admin/dashboard");
            } else {
                console.error("Tokens are not defined in the response");
            }
        } catch (error) {
        //     setLoading(false);
        //     if (error.response && error.response.data) {
        //         setValidation(error.response.data);
        //     } else {
        //         console.error("Login Error:", error);
        //     }
        // }
        setLoading(false);
            if (error.response && error.response.data) {
                setValidation(error.response.data);

                
                if (error.response.data.message) {
                    toast.error(error.response.data.message, {
                        duration: 4000,
                        position: "top-right",
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                        icon: '❌',
                    });
                }
            }
        }
    };
    

    // Check if access token exists, redirect to dashboard if true
    if (Cookies.get("access_token")) {
        navigate("/admin/dashboard");
    }

    return (
        <div className="container-fluid container-login d-flex justify-content-center align-items-center min-vh-100">
            <Toaster />
            <div className="row justify-content-center w-100">
                <div className="col-lg-4 col-md-6 col-sm-8 col-10 mt-5">
                    <div className="text-center mb-4">
                        <h4><i className="fa fa-map-marked-alt"></i> <strong>Distribution Center</strong></h4>
                    </div>
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-body">
                            <div className="text-center">
                                <h6 className="fw-bold">LOGIN ADMIN</h6>
                                <hr />
                            </div>
                            <form onSubmit={loginHandler}>
                                <label className="mb-1">USERNAME</label>
                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fa fa-user"></i></span>
                                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Username" />
                                </div>

                                <label className="mb-1">PASSWORD</label>
                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fa fa-lock"></i></span>
                                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                                </div>

                                <button className="btn btn-primary shadow-sm rounded-sm px-4 w-100" type="submit" disabled={isLoading}> {isLoading ? "LOADING..." : "LOGIN"} </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
       
    );
}

export default Login;


// import React, { useEffect, useState } from "react";
// import Api from "../../../../api";
// import toast, { Toaster } from "react-hot-toast";
// import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";
// import FooterDc from "../../../../components/footer";

// function Login() {
//     document.title = "Login - Administrator";
//     const navigate = useNavigate();

//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [isLoading, setLoading] = useState(false);
//     const [validation, setValidation] = useState({});

//     // Function to handle login submission
//     const loginHandler = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             const response = await Api.post("/api/login", {
//                 email: email,
//                 password: password,
//             });

//             setLoading(false);
//             toast.success("Login Successfully.", {
//                 duration: 4000,
//                 position: "top-right",
//                 style: {
//                     borderRadius: '10px',
//                     background: '#333',
//                     color: '#fff',
//                     padding: '16px',
//                     fontSize: '14px',
//                 },
//                 icon: '✅',
//             });

//             const accessToken = response.data.access_token;
//             const refreshToken = response.data.refresh_token;

//             if (accessToken && refreshToken) {
//                 Cookies.set("access_token", accessToken, { 
//                     // secure: process.env.NODE_ENV === 'production',
//                     // sameSite: "None"
//                 });
//                 Cookies.set("refresh_token", refreshToken, { 
//                     // secure: process.env.NODE_ENV === 'production',
//                     // sameSite: "None"
//                 });

//                 navigate("/admin/dashboard");
//             } else {
//                 console.error("Tokens are not defined in the response");
//             }
//         } catch (error) {
//             setLoading(false);
//             if (error.response && error.response.data) {
//                 setValidation(error.response.data);

//                 if (error.response.data.message) {
//                     toast.error(error.response.data.message, {
//                         duration: 6000,
//                         position: "top-right",
//                         style: {
//                             borderRadius: '10px',
//                             background: '#ff4d4f',
//                             color: '#fff',
//                             padding: '16px',
//                             fontSize: '14px',
//                         },
//                         icon: '❌',
//                     });
//                 }
//                 if (error.response.data.errors) {
//                     Object.keys(error.response.data.errors).forEach((key) => {
//                         toast.error(error.response.data.errors[key][0], {
//                             duration: 6000,
//                             position: "top-right",
//                             style: {
//                                 borderRadius: '10px',
//                                 background: '#ff4d4f',
//                                 color: '#fff',
//                                 padding: '16px',
//                                 fontSize: '14px',
//                             },
//                             icon: '❌',
//                         });
//                     });
//                 }
//             } else {
//                 console.error("Login Error:", error);
//                 toast.error("An unexpected error occurred.", {
//                     duration: 6000,
//                     position: "top-right",
//                     style: {
//                         borderRadius: '10px',
//                         background: '#ff4d4f',
//                         color: '#fff',
//                         padding: '16px',
//                         fontSize: '14px',
//                     },
//                     icon: '❌',
//                 });
//             }
//         }
//     };

//     // Refresh token every hour
//     useEffect(() => {
//         const interval = setInterval(async () => {
//             const refreshToken = Cookies.get("refresh_token");
//             if (refreshToken) {
//                 try {
//                     const response = await Api.post("/api/refresh", { refreshToken });
//                     if (response.status === 200) {
//                         const { accessToken } = response.data;
//                         Cookies.set("access_token", accessToken, { 
//                             // secure: process.env.NODE_ENV === 'production',
//                             // sameSite: "None"
//                         });
//                         const { refreshToken } = response.data;
//                         Cookies.set("refresh_token", refreshToken, { 
//                             // secure: process.env.NODE_ENV === 'production',
//                             // sameSite: "None"
//                         });
//                     }
//                 } catch (error) {
//                     console.error("Error refreshing token:", error);
//                 }
//             }
//         }, 60000); // 3600000ms = 1 hour

//         return () => clearInterval(interval); // Clear interval on component unmount
//     }, []);

//     useEffect(() => {
//         if (Cookies.get("access_token")) {
//             navigate("/admin/dashboard");
//         }
//     }, [navigate]);

//     return (
//         <div className="container-fluid container-login d-flex justify-content-center align-items-center min-vh-100">
//             <Toaster />
//             <div className="row justify-content-center w-100">
//                 <div className="col-lg-4 col-md-6 col-sm-8 col-10 mt-5">
//                     <div className="text-center mb-4">
//                         <h4><i className="fa fa-map-marked-alt"></i> <strong>Distribution Center</strong></h4>
//                     </div>
//                     <div className="card border-0 rounded shadow-sm">
//                         <div className="card-body">
//                             <div className="text-center">
//                                 <h6 className="fw-bold">LOGIN ADMIN</h6>
//                                 <hr />
//                             </div>
//                             <form onSubmit={loginHandler}>
//                                 <label className="mb-1">EMAIL ADDRESS</label>
//                                 <div className="input-group mb-3">
//                                     <span className="input-group-text"><i className="fa fa-envelope"></i></span>
//                                     <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" />
//                                 </div>

//                                 <label className="mb-1">PASSWORD</label>
//                                 <div className="input-group mb-3">
//                                     <span className="input-group-text"><i className="fa fa-lock"></i></span>
//                                     <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
//                                 </div>

//                                 <button className="btn btn-primary shadow-sm rounded-sm px-4 w-100" type="submit" disabled={isLoading}> {isLoading ? "LOADING..." : "LOGIN"} </button>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {/* <FooterDc /> */}
//         </div>
//     );
// }

// export default Login;

