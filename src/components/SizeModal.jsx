import {motion,AnimatePresence} from 'framer-motion'
import {X,ShoppingBag} from 'lucide-react'
import {useState} from 'react'

export default function SizeModal({
open,
onClose,
product,
cart,
setCart
}){

const [selectedSize,setSelectedSize] = useState(null)

if(!product) return null

function addToCart(){

if(!selectedSize) return

setCart([
...cart,
{
...product,
size:selectedSize
}
])

onClose()

}

return(

<AnimatePresence mode='wait'>

{open && (

<motion.div
className='size-modal-wrap'
onClick={onClose}
initial={{opacity:0}}
animate={{opacity:1}}
exit={{opacity:0}}
>

<motion.div
className='size-modal'
onClick={(e)=>e.stopPropagation()}
initial={{opacity:0,y:40,scale:.95}}
animate={{opacity:1,y:0,scale:1}}
exit={{opacity:0,y:20,scale:.95}}
transition={{duration:.25}}
>

<button
className='close-modal'
onClick={onClose}
>
<X size={20}/>
</button>

{/* LEFT SIDE */}

<div className='size-modal-left'>

<img
src={product.image}
className='size-modal-image'
loading='lazy'
decoding='async'
/>

<div className='modal-image-overlay'></div>

</div>

{/* RIGHT SIDE */}

<div className='size-modal-right'>

<p className='size-modal-badge'>
SELECT SIZE
</p>

<h2>
{product.name}
</h2>

<p className='size-modal-price'>
{product.price} BYN
</p>

<div className='modal-sizes'>

{product.sizes.map(size => (

<button
key={size.size}
disabled={size.stock === 0}
className={
size.stock === 0
? 'modal-size disabled-size'
: selectedSize === size.size
? 'modal-size active-size'
: 'modal-size'
}
onClick={()=>
setSelectedSize(size.size)
}
>

{size.size}
{size.stock === 0 && (
<span className='sold-out-text'>
SOLD OUT
</span>
)}



</button>

))}

</div>

<button
className='modal-cart-btn'
onClick={addToCart}
>

<ShoppingBag size={18}/>

Добавить в корзину

</button>

</div>

</motion.div>

</motion.div>

)}

</AnimatePresence>

)

}