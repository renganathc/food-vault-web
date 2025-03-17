import { useState, useEffect } from 'react';
import { logout, db } from './Firebase';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import "./dash.css"

function Dash(props) {

    const [status, setStatus] = useState("Please scan the QR in your Mess to generate token");

    const [time,setTime] = useState("Invalid");
    const [token_vis, setToken_vis] = useState(false);
    const roll_no = props.roll

    const today = new Date();
    const date = today.toLocaleDateString("en-GB").replace(/\//g, "-");

    const generate_token = async() => {

        const userRef = doc(db, "users", roll_no.split('@')[0]);
        const userSnap = await getDoc(userRef);

        const t = new Date();
        setTime(t.toLocaleDateString("en-GB"));

        if (userSnap.exists()) {
            const latest = userSnap.data()["latest-token"];
            if (date == latest) {
                alert("Token Already Claimed")
            }
            else {
              await setDoc(doc(db, "users", roll_no.split('@')[0]), {
                "latest-token" : date
              });
              setToken_vis(true);
              setStatus("Claimed token at " + time + " " + date);
              setTimeout(() => {
                setToken_vis(false);
              }, 10000);
            }
          } else {
            await setDoc(doc(db, "users", roll_no.split('@')[0]), {
              "latest-token" : date
            });
            setToken_vis(true);
            setStatus("Claimed token at " + time  + " " + date);
            setTimeout(() => {
              setToken_vis(false);
            }, 10000);
          }

    }

  useEffect(() => {

    const qrCodeScanner = new Html5QrcodeScanner("qr-reader", {fps: 10, qrbox: 250, facingMode: "environment", showTorchButton: false, showScanButton: false }, false);

    qrCodeScanner.render(
      (result) => {
        console.log(result);
        if(result == "kamadhenu-1") {
            generate_token();
            qrCodeScanner.clear();
        }
      },
      (error) => {
        console.error(error);
      }
    );

    const handleOrientationChange = () => {
        if (window.innerWidth > window.innerHeight) {
            document.body.style.visibility = "hidden";
        } else {
            document.body.style.visibility = "visible";
        }
      };
  
      window.addEventListener('resize', handleOrientationChange);
  
      handleOrientationChange();

    return () => {
        qrCodeScanner.clear();
        window.removeEventListener('resize', handleOrientationChange);
    }

  }, []);

    const logout_of_app = async() => {
        await logout()
    }

    return(
        <>
        <div id="qr-reader" style={{ width: 'calc(100vw-10px)', height: 'fit-content'}}></div>
        <p>{status}</p>
        <p style={{color: "red"}}>Token will expire withing 15 seconds of scanning. So scan only when its your turn.</p>
        <button onClick={logout_of_app}>logout</button>
        <div className="token-body" style={{display:(token_vis ? "" : "none")}}>
        <div className="token-card">
            <div className="token-content">
            <div className="token-info">
            <img className="green-tick" src="https://i.giphy.com/PijzuUzUhm7hcWinGn.webp" alt="green-tick" />
                <p className="token-id-label">Roll No:</p>
                <p className="token-id-text" id="token_id">{roll_no.split('@')[0]}</p>
                <p className="expiry-text" id="time" style={{marginTop:25, marginBottom:25}}>Token expires in<br/> 15 seconds</p>
                <p className="generated-label">Token generated on:</p>
                <p className="generated-text" id="generated">{time} <br/> {date}</p>
            </div>
            </div>
        </div>
        </div>
        </>
    )
}

export default Dash