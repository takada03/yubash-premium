import {Link} from 'react-router-dom'
import {ShoppingBag,House,Grid2x2} from 'lucide-react'

export default function Navbar({cart}){

return(

<header className='navbar'>

<Link className='logo' to='/'>
YU<span>BASH</span>
</Link>

<div className='navbar-actions'>

<Link
to='/'
className='nav-icon-btn'
>
<House size={18}/>
</Link>

<Link
to='/catalog'
className='nav-icon-btn'
>
<Grid2x2 size={18}/>
</Link>

<Link
to='/cart'
className='cart-link'
>

<ShoppingBag size={20}/>

{cart?.length > 0 && (

<span className='cart-count'>
{cart.length}
</span>

)}

</Link>

</div>

</header>

)

}