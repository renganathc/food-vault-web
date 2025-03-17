import { signInWithGoogle } from './Firebase';
import "./dash.css"

function Login() {

    const handleSignIn = async() => {
        await signInWithGoogle();
    }

  return (
    <div>
        <img src='food.png' style={{width:"45vw"}}/>
        <h2 style={{marginTop:"-5vw", fontSize:27}}>Food Vault</h2>
        <button className='login' onClick={handleSignIn}>Log In with Student ID</button>
    </div>
  )
}

export default Login
