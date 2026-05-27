import {motion} from 'framer-motion'
import {Link} from 'react-router-dom'
import {useState} from 'react'
import {ShoppingBag} from 'lucide-react'
import SizeModal from './SizeModal'

export default function ProductCard({
product,
cart,
setCart
}){

const [open,setOpen] = useState(false)

return(

<>

<motion.div
className='premium-card'
transition={{duration:.25}}
>

<Link
to={`/product/${product.id}`}
className='card-link'
>

<div className='premium-image-wrap'>

<img
src={product.image}
className='premium-image'
loading='lazy'
decoding='async'
/>

<div className='premium-overlay'></div>

<div className='premium-hover'>

<span>
VIEW PRODUCT
</span>

</div>

</div>

</Link>

<div className='premium-content'>

<div>

<h3>
{product.name}
</h3>

<p>
{product.price} BYN
</p>

</div>

<button
className='card-btn'
onClick={(e)=>{
e.preventDefault()
e.stopPropagation()
setOpen(true)
}}
>

<ShoppingBag size={22}/>

</button>

</div>

</motion.div>

{/* MODAL OUTSIDE CARD */}

<SizeModal
open={open}
onClose={()=>setOpen(false)}
product={product}
cart={cart}
setCart={setCart}
/>

</>

)

}