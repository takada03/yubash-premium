import {Link} from 'react-router-dom'

export default function Navbar(){
return(
<header className="navbar">
<Link className="logo" to="/">YU<span>BASH</span></Link>

<nav>
<Link to="/">Главная</Link>
<Link to="/catalog">Каталог</Link>
</nav>
</header>
)
}
