import {Routes,Route,useLocation,Navigate} from 'react-router-dom'
import {AnimatePresence,motion} from 'framer-motion'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Login from './admin/Login'
import Dashboard from './admin/Dashboard'

const isAuth=()=>localStorage.getItem('yubash_admin')==='true'

function Protected({children}){
return isAuth()?children:<Navigate to="/secure-login"/>
}

export default function App(){
const location=useLocation()
return(
<>
<Navbar/>
<AnimatePresence mode="wait">
<motion.div
key={location.pathname}
initial={{opacity:0,y:30,filter:'blur(10px)'}}
animate={{opacity:1,y:0,filter:'blur(0px)'}}
exit={{opacity:0,y:-20,filter:'blur(10px)'}}
transition={{duration:.45}}
>
<Routes location={location}>
<Route path="/" element={<Home/>}/>
<Route path="/catalog" element={<Catalog/>}/>
<Route path="/secure-login" element={<Login/>}/>
<Route path="/admin-panel-yubash" element={<Protected><Dashboard/></Protected>}/>
</Routes>
</motion.div>
</AnimatePresence>
</>
)
}
