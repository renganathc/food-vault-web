import { useEffect } from 'react';
import { signInWithGoogle } from './Firebase';
import "./dash.css"

function Login() {

    const handleSignIn = async() => {
        await signInWithGoogle();
    }

    const [vis, setVis] = useState(false);

    useEffect(() => {
      setTimeout(() => {
        setVis(true);
      }, 1800);
    }, []);

  return (
    <div>
        <img src='food.png' style={{width:"45vw"}}/>
        <h2 style={{marginTop:"-5vw", fontSize:27}}>Food Vault</h2>
        <button className='login' onClick={handleSignIn} style={{display : vis ? "" : "none"}}>Log In with Student ID</button>
    </div>
  )
}

export default Login
