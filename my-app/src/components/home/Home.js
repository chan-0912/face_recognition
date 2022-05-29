import React from 'react'
import "./home.css"
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import Webcam from "react-webcam";

export default function Home() {
    
    const [isActive, setActive] = useState("false");
    const videoConstraints = {
        width: 200,
        height: 200,
        facingMode: "user",
    };
    const ToggleClass = () => {
        setActive(!isActive);
    };
    function main(){
        capture();
        handleSubmit();
    }
    function main2(){
        capture2();
        handleSubmit();
        
    }

    //change
    const [email, setEmail] = useState("");
    const [NAME, setNAME] = useState("");
    const [name, setName] = useState("");
    const webcamRef = React.useRef(null);
    function handleSubmit(e) {
        console.log("chl rha h kya")
        console.log(NAME,email);
        setNAME('');
        setEmail('');
      }
    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        console.log(`imageSrc = ${imageSrc}`);
        axios
            .post("http://127.0.0.1:5000/api", { data: imageSrc })
            .then((res) => {
                console.log(`response=${res}`);
                console.log(res.data); 

                if(res.data!=='Nobody')
                {
                    console.log("name="+name);
                    alert("Welcome "+res.data);
                    console.log(name);
                }
                else{
                    console.log("name="+name);
                    alert("NO USER FOUND. TRY AGAIN");
                }
            })
            .catch((error) => {
                console.log(`error=${error}`);
            });

    }, [webcamRef]);
    const capture2 = React.useCallback(() => {
        console.log("jhgjd");
        const imageSrc = webcamRef.current.getScreenshot();
        console.log(`imageSrc = ${imageSrc}`);
        console.log(NAME) //huh yahannnnnnnnnn same value aa rhi input change krne pr bhi
        axios
            .post("http://127.0.0.1:5000/store", { data: imageSrc , namex: NAME})
            .then((res) => {
                console.log(`response=${res}`);
            })
            .catch((error) => {
                console.log(`error=${error}`);
            });
    }, [webcamRef,NAME]);
    
    
    return (
        <div>
            <p className="tip">Welcome to Face Recognition </p>
            <div className={isActive ? "cont" : "cont s--signup"}>
                <div className="form sign-in">
                    <h2>Welcome back,</h2>
                    
                    <label>
                        <div className="webcam">
                            <Webcam
                                audio={false}
                                height={200}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                width={250}
                                videoConstraints={videoConstraints}
                            />
                            
                            <h2 id='ach2'></h2>
                            <button type='button' onClick={main} className='submit' id='ach'>
                                Sign in
                            </button>
                            
                        </div>
                    </label>

                </div>
                <div className="sub-cont">
                    <div className="img">
                        <div className="img__text m--up">
                            <h2>New here?</h2>
                            <p>Sign up and discover great amount of new opportunities!</p>
                        </div>
                        <div className="img__text m--in">
                            <h2>One of us?</h2>
                            <p>If you already has an account, just sign in. We've missed you!</p>
                        </div>
                        <div className="img__btn" onClick={ToggleClass}>
                            <span className="m--up">Sign Up</span>
                            <span className="m--in">Sign In</span>
                        </div>
                    </div>
                    <div className="form sign-up">
                        <h2>Time to feel like home,</h2>
                        <form onSubmit={handleSubmit} action="">
                        <label>
                        <span>Name</span>
                        <input type="text" value={NAME} onChange={(e)=>{
                            setNAME(e.target.value)
                        }}/>
                    </label>
                    <label>
                        <span>Email</span>
                        <input type="Email" value={email} onChange={(e)=>{
                            setEmail(e.target.value)
                        }} />
                    </label>

                            <label>
                                <div className="webcam">
                                    <Webcam
                                        audio={false}
                                        height={200}
                                        ref={webcamRef}
                                        screenshotFormat="image/jpeg"
                                        width={250}
                                        videoConstraints={videoConstraints}
                                    />
                                </div>
                            </label>
                            <button type="button" onClick={main2} className="submit">Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

