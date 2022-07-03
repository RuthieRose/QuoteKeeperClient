import Login from './Login'
import Register from './Register'
import {useState} from 'react'

export default function Parent() {

 let [toggle, setToggle] = useState('login')


 return (
<section>

 {toggle === 'login' ? <Login setToggle={setToggle} /> : <Register setToggle={setToggle} />}

</section>
 )
}