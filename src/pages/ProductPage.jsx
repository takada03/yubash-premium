import {useParams} from 'react-router-dom'
import {motion} from 'framer-motion'
import {useState,useEffect} from 'react'



export default function ProductPage({cart,setCart}){

const {id} = useParams()

const [selectedSize,setSelectedSize] = useState('M')

const [product,setProduct] = useState(null)

useEffect(()=>{

async function loadProduct(){

try{

const response =
await fetch('http://localhost:5000/products')

const products =
await response.json()

const found =
products.find(
p => p.id === Number(id)
)

setProduct(found)

}catch(err){

console.log(err)

}

}

loadProduct()

},[id])

if(!product){

return(
<div className='page'>
<h2>Товар не найден</h2>
</div>
)

}

return(

<section className='product-page'>

<div className='product-layout'>

{/* LEFT */}

<motion.div
className='product-gallery'
initial={{opacity:0,x:-40}}
animate={{opacity:1,x:0}}
transition={{duration:.5}}
>

<div className='product-main-image-wrap'>

<img
src={product.image}
className='product-main-image'
/>

<div className='image-glow'></div>

</div>

</motion.div>

{/* RIGHT */}

<motion.div
className='product-info'
initial={{opacity:0,x:40}}
animate={{opacity:1,x:0}}
transition={{duration:.5}}
>

<div className='product-badge'>
PREMIUM PRODUCT
</div>

<h1>
{product.name}
</h1>

<p className='product-price'>
{product.price} BYN
</p>

<p className='product-description'>
Premium luxury streetwear item inspired by
modern fashion culture and high-end retailers.
Designed for clean everyday styling with
oversized luxury silhouette.
</p>

<div className='sizes-wrap'>

<h3>Размер</h3>

<div className='sizes'>

{product.sizes.map(size => (

<button
key={size.size}

disabled={size.stock === 0}

className={
size.stock === 0
? 'size-btn disabled-size'
: selectedSize === size.size
? 'size-btn active-size'
: 'size-btn'
}

onClick={()=>setSelectedSize(size.size)}

>
{size.size}
</button>

))}

</div>

</div>

<div className='product-actions'>

<button
className='buy-btn'
onClick={()=>
setCart([
...cart,
{
...product,
size:selectedSize
}
])
}
>
Добавить в корзину
</button>

</div>

</motion.div>

</div>

</section>

)

}