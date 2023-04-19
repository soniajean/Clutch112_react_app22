import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import '../css/nav.css';
import { DataContext } from "../context/DataProvider";
import { useAuth, useUser, useSigninCheck, useDatabase } from "reactfire";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { get, child, ref } from "firebase/database";


const Nav = props => {

    const { cart, setCart } = useContext(DataContext);

    const auth = useAuth();
    

    const { data: user } = useUser();  // this gets our user object
    const { signinStatus } = useSigninCheck();  // is there a user signed in or not?

    const db = useDatabase();

    const signin = async () => {
        let provider = new GoogleAuthProvider();
        let u = await signInWithPopup(auth, provider);
        console.log(u);
        return u
    }
    const signout = async () => {
        await signOut(auth);
        setCart({size:0, total:0, products: {}})
    }

    // Whenever there's a render of nav (or re-render) we're going to check for a change in user status.
    // if there was a change, we'll check the DB and update the cart
    // useEffect(() => {}, [user]);  -----> bare example with dependency
    useEffect(() => {
        if (user){
            get(child(ref(db), `carts/${user.uid}`)).then((snapshot) => {
                if (snapshot.exists()) {
                  console.log(snapshot.val());
                  setCart(snapshot.val());
                } else {
                  console.log("No data available");
                }
              }).catch((error) => {
                console.error(error);
              });
        }
    }, [user]);

    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-light bg-secondary">
                <div className="container-fluid">
                    <Link className="nav-item nav-link active" to='/'>Home</Link>
                    <Link className="nav-item nav-link active" to='/shop'>Shop</Link>
                    <Link className="nav-item nav-link active" to='/cart'>Cart</Link>
                    {
                        signinStatus === 'loading' ?
                            <button className="btn btn-primary" disabled>Waiting. . .  to. . . .  log . . .  in</button> :
                            user ?
                                <>
                                    <span>{user.displayName}</span>
                                    <button className="btn btn-primary w-25" onClick={signout}>Logout</button>
                                </> :
                                <button className="btn btn-primary w-25" onClick={signin}>Login</button>
                    }
                    {cart.size === 0 ?
                        <span id="r-span"><Link className="nav-item nav-link active" to='/shop'><i className="fa-solid fa-cart-shopping"></i></Link></span> :
                        <span id="r-span"><Link className="nav-item nav-link active" to='/cart'>{cart.size} - ${cart.total.toFixed(2)} <i className="fa-solid fa-cart-shopping"></i></Link></span>
                    }
                </div>
            </nav>
        </div>
    );
}


export default Nav;