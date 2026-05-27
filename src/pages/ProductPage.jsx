import {useEffect,useState}
from 'react'

import {useParams}
from 'react-router-dom'

import {loadProduct}
from '../data/loadProducts'

export default function ProductPage({
cart,
setCart
}){

const {id} = useParams()

const [product,setProduct] =
useState(null)

const [selectedSize,setSelectedSize] =
useState(null)

useEffect(()=>{

async function load(){

const data =
await loadProduct(id)

setProduct(data)

}

load()

},[id])

if(!product){

return(
<div className='page'>
<h2>
Товар не найден
</h2>
</div>
)

}

const addToCart = ()=>{

if(!selectedSize){

return

}

setCart([
...cart,
{
...product,
size:selectedSize
}
])

}

return(

<section className='product-page'>

<div className='product-layout'>

<div className='product-gallery'>

<div className='product-main-image-wrap'>

<img
src={product.image}
className='product-main-image'
alt={product.name}
/>

<div className='image-glow'></div>

</div>

</div>

<div className='product-info'>

<div className='product-badge'>
YUBASH PREMIUM
</div>

<h1>
{product.name}
</h1>

<div className='product-price'>
{product.price} BYN
</div>

<p className='product-description'>

Premium streetwear piece
from the YUBASH collection.

</p>

<div className='sizes-wrap'>

<h3>
Выберите размер
</h3>

<div className='sizes'>

{product.sizes?.map(size=>(

<button

key={size.size}

className={`size-btn ${
selectedSize === size.size
? 'active-size'
: ''
}`}

disabled={size.stock === 0}

onClick={()=>
setSelectedSize(size.size)
}

>

{size.size}

</button>

))}

</div>

</div>

<button
className='buy-btn'
onClick={addToCart}
>

Добавить в корзину

</button>

</div>

</div>

</section>

)

}