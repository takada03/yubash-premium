import logo from './assets/logo.png'
import {uploadImage} from './lib/uploadImage'
import React,{useState,useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter,Routes,Route,Link,useNavigate,Navigate,useLocation} from 'react-router-dom'
import {AnimatePresence,motion} from 'framer-motion'
import {
ShoppingBag,
House,
Grid2x2
} from 'lucide-react'
import './styles.css'
import {loadProducts} from './data/loadProducts'
import ProductPage from './pages/ProductPage'
import ProductCard from './components/ProductCard'
import toast,{Toaster} from 'react-hot-toast'
import {
createProduct,
deleteProduct,
updateProduct
} from './lib/productsApi'
import {
Plus,
Minus
} from 'lucide-react'
import {
createOrder,
loadOrders
} from './lib/ordersApi'


function Protected({children}){
return localStorage.getItem('yb_admin')==='true'
? children
: <Navigate to='/auth-access'/>
}

function Navbar({cart}){

return(

<header className='navbar'>

<div
className='logo'

onClick={()=>{

window.logoClicks =
(window.logoClicks || 0) + 1

if(window.logoClicks >= 5){

window.logoClicks = 0

window.location.href =
'/auth-access'

}

setTimeout(()=>{

window.logoClicks = 0

},2000)

}}

>
YU<span>BASH</span>
</div>

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

function Home(){
return(
<section className='hero'>

<div className='glow'></div>

<motion.div
className='hero-content'
initial={{opacity:0,y:30}}
animate={{opacity:1,y:0}}
transition={{duration:.6}}
>

<div className='badge'>
PREMIUM STREETWEAR
</div>

<h1>
YU<span>BASH</span>
</h1>

<p>
Твой доступ к лучшим
вещам из Китая.
</p>

<div className='hero-actions'>

<Link to='/catalog'>
<button>
Смотреть каталог
</button>
</Link>

<Link to='/cart'>
<button className='secondary'>
Корзина
</button>
</Link>

</div>
<div className='hero-cards'>

<div className='hero-card'>

<div className='hero-card-icon'>

<svg
xmlns="http://www.w3.org/2000/svg"
width="24"
height="24"
fill="none"
stroke="currentColor"
strokeWidth="2"
viewBox="0 0 24 24"
>

<path d="M3 7h18"/>
<path d="M5 7l1 12h12l1-12"/>
<path d="M9 7V5a3 3 0 0 1 6 0v2"/>

</svg>

</div>

<h3>
Проверенные товары
</h3>

<p>
Отбираем лучшие вещи
и проверенных продавцов
из Китая.
</p>

</div>

<div className='hero-card'>

<div className='hero-card-icon'>

<svg
xmlns="http://www.w3.org/2000/svg"
width="24"
height="24"
fill="none"
stroke="currentColor"
strokeWidth="2"
viewBox="0 0 24 24"
>

<path d="M3 12h18"/>
<path d="M3 6h18"/>
<path d="M3 18h18"/>

</svg>

</div>

<h3>
Редкие позиции
</h3>

<p>
Помогаем находить вещи,
которые сложно заказать
самостоятельно.
</p>
</div>

<div className='hero-card'>

<div className='hero-card-icon'>

<svg
xmlns="http://www.w3.org/2000/svg"
width="24"
height="24"
fill="none"
stroke="currentColor"
strokeWidth="2"
viewBox="0 0 24 24"
>

<path d="M12 2v20"/>
<path d="M2 12h20"/>
<circle cx="12" cy="12" r="9"/>

</svg>

</div>

<h3>
Доставка по СНГ
</h3>

<p>
Быстрая доставка по Беларуси,
России и другим странам СНГ.
</p>

</div>

</div>
<motion.img
src={logo}
className='hero-logo'
initial={{opacity:0,rotate:-12,scale:.8}}
animate={{opacity:1,rotate:-8,scale:1}}
transition={{duration:.8}}
/>

</motion.div>

</section>
)
}


function Catalog({cart,setCart}){
const [products,setProducts]=useState([])

useEffect(()=>{

let mounted = true

async function load(){

try{

const data = await loadProducts()

if(mounted){

setProducts(data)

}

}catch(err){

console.log(err)

}

}

load()

const interval = setInterval(load,30000)

return()=>{

mounted = false

clearInterval(interval)

}

},[])

return(
<section className='page'>
<div className='section-head'>
<h2>Premium Collection</h2>
<p>Luxury streetwear catalog</p>
</div>

<div className='grid'>
{products.map(product => (

<ProductCard
key={product.id}
product={product}
cart={cart}
setCart={setCart}
/>

))}
</div>
</section>
)
}

function Cart({cart,setCart}){

const [open,setOpen] = useState(false)
const [name,setName] = useState('')
const [phone,setPhone] = useState('')
const [telegram,setTelegram] = useState('')
const [comment,setComment] = useState('')

const total = cart.reduce((a,b)=>a+b.price,0)

const remove=(index)=>{
const copy=[...cart]
copy.splice(index,1)
setCart(copy)
}

const submit = async()=>{

try{

const order = {

name,
phone,
telegram,
comment,

cart,

total,

status:'new'

}

const created =
await createOrder(order)
await fetch(
'https://woqiuilaopddnmobkrtv.supabase.co/functions/v1/telegram-order',
{
method:'POST',

headers:{
'Content-Type':'application/json'
},

body:JSON.stringify(order)
}
)
if(created){

toast.success(
'Заказ успешно отправлен'
)

setCart([])

setOpen(false)

setName('')
setPhone('')
setTelegram('')
setComment('')

}else{

toast.error(
'Ошибка отправки заказа'
)

}

}catch(err){

toast.error(
'Ошибка отправки заказа'
)

}

}
return(

<section className='page'>

<div className='section-head'>
<h2>Корзина</h2>
<p>Оформление заказа</p>
</div>

<div className='box'>

{cart.length===0 && (
<div className='empty'>
Корзина пуста
</div>
)}

{cart.map((item,index)=>(

<div className='row' key={index}>

<div>

<h3>
{item.name}
</h3>

<p>
📏 Размер: {item.size || 'M'}
</p>

<p>
💰 {item.price} BYN
</p>

</div>

<button
className='danger'
onClick={()=>remove(index)}
>
Удалить
</button>

</div>

))}

{cart.length > 0 && (

<div className='checkout'>

<h3>
Итого: {total} BYN
</h3>

<button onClick={()=>setOpen(true)}>
Оформить заказ
</button>

</div>

)}

</div>

{open && (

<div className='modal-wrap'>

<div className='checkout-modal'>

<h2>Оформление заказа</h2>

<input
placeholder='Ваше имя'
value={name}
onChange={e=>setName(e.target.value)}
/>

<input
placeholder='Телефон'
value={phone}
onChange={e=>setPhone(e.target.value)}
/>

<input
placeholder='Telegram (@username)'
value={telegram}
onChange={e=>setTelegram(e.target.value)}
/>

<textarea
className='textarea'
placeholder='Комментарий к заказу'
value={comment}
onChange={e=>setComment(e.target.value)}
/>

<div className='checkout-actions'>

<button onClick={submit}>
Отправить заказ
</button>

<button
className='secondary full'
onClick={()=>setOpen(false)
    
}
>
Закрыть
</button>

</div>
</div>
</div>

)}

</section>

)

}

function Login(){
const nav = useNavigate()

function submit(e){
e.preventDefault()

if(e.target.password.value==='yubashadmin2025'){
localStorage.setItem('yb_admin','true')
nav('/system-control-panel')
}else{
alert('Неверный пароль')
}
}

return(
<section className='auth'>
<form className='auth-box' onSubmit={submit}>
<h1>Secure Access</h1>

<input
name='password'
type='password'
placeholder='Password'
/>

<button type='submit'>
Login
</button>
</form>
</section>
)
}

function Admin(){
const [editing,setEditing] = useState(null)
const [products,setProducts]=useState([])
useEffect(()=>{

async function load(){

const data = await loadProducts()

setProducts(data)

}

load()

},[])
const [open,setOpen]=useState(false)

const [name,setName]=useState('')
const [price,setPrice]=useState('')
const [image,setImage]=useState('')
const [sizes,setSizes] = useState([
{
size:'S',
stock:0
}
])

const revenue = 0
const orders = 0

const add = async()=>{

if(!name || !price || !image) return

const product = {

name,

price:Number(price),

image,

sizes:sizes,

active:true

}

const created =
await createProduct(product)

if(created){

toast.success('Товар добавлен')

const data = await loadProducts()

setProducts(data)

setOpen(false)

setName('')
setPrice('')
setImage('')
setSizes([
{
size:'S',
stock:0
}
])
}else{

toast.error('Ошибка добавления')

}

}

const remove = async(product)=>{

await deleteProduct(product)

toast.success('Товар удален')

const data = await loadProducts()

setProducts(data)

}

return(
<div className='admin'>

<aside className='sidebar'>

<h2>YUBASH ADMIN</h2>

<div className='menu'>Dashboard</div>
<div className='menu'>Products</div>
<div className='menu'>Orders</div>

<button onClick={()=>setOpen(true)}>
Добавить товар
</button>

<button
className='secondary full'
onClick={()=>{
localStorage.removeItem('yb_admin')
window.location.href='/'
}}
>
Logout
</button>

</aside>

<main className='admin-main'>

<div className='section-head'>
<h2>Dashboard</h2>
<p>Store analytics & products</p>
</div>

<div className='stats'>

<div className='stat'>
<h3>Orders</h3>
<p>{orders}</p>
</div>

<div className='stat'>
<h3>Revenue</h3>
<p>{revenue} BYN</p>
</div>

<div className='stat'>
<h3>Products</h3>
<p>{products.length}</p>
</div>

</div>

<div className='box'>

{products.map(product=>(

<div className='row' key={product.id}>

<div className='admin-product'>
<img src={product.image} className='admin-thumb'/>

<div>
<h3>{product.name}</h3>
<p>{product.price} BYN</p>
</div>
</div>

<div className='admin-actions'>

<button
className='edit-btn'
onClick={()=>setEditing(product)}
>
Edit
</button>

<button
className='danger'
onClick={()=>remove(product)}
>
Delete
</button>

</div>

</div>

))}

</div>

</main>
{editing && (

<div className='modal-wrap'>

<div className='modal'>

<h2>Редактировать товар</h2>

<input
value={editing.name}
onChange={e=>
setEditing({
...editing,
name:e.target.value
})
}
/>

<input
value={editing.price}
onChange={e=>
setEditing({
...editing,
price:e.target.value
})
}
/>
<div className='sizes-editor'>

{editing.sizes?.map((item,index)=>(

<div
className='size-stock-row'
key={index}
>

<input
className='size-input'
value={item.size}
onChange={e=>{

const updated = [...editing.sizes]

updated[index].size =
e.target.value

setEditing({
...editing,
sizes:updated
})

}}
/>

<div className='stock-box'>

<button

type='button'

onClick={()=>{

const updated=[...editing.sizes]

updated[index].stock =
Math.max(
0,
updated[index].stock - 1
)

setEditing({
...editing,
sizes:updated
})

}}

>


<Minus size={18}/>


</button>

<span>
{item.stock}
</span>

<button

type='button'

onClick={()=>{

const updated=[...editing.sizes]

updated[index].stock += 1

setEditing({
...editing,
sizes:updated
})

}}

>


<Plus size={18}/>


</button>

</div>

</div>

))}

<button

className='add-size-btn'

onClick={()=>{

setEditing({
...editing,
sizes:[
...editing.sizes,
{
size:'',
stock:0
}
]
})

}}

>

Добавить размер

</button>

</div>
<button

onClick={async()=>{

await updateProduct(
editing.id,
{
name:editing.name,
price:Number(editing.price),
sizes:editing.sizes
}
)

toast.success('Товар обновлен')

const data =
await loadProducts()

setProducts(data)

setEditing(null)

}}

>

Сохранить

</button>

<button
className='secondary full'
onClick={()=>setEditing(null)}
>

Закрыть

</button>

</div>

</div>

)}
{open && (

<div className='modal-wrap'>

<div className='modal'>

<h2>Добавить товар</h2>

<input
placeholder='Название'
value={name}
onChange={e=>setName(e.target.value)}
/>

<input
placeholder='Цена'
value={price}
onChange={e=>setPrice(e.target.value)}
/>

<label className='upload-box'>

<input
type='file'
accept='image/*'
hidden

onChange={async e=>{

const file = e.target.files[0]

if(!file) return

const url = await uploadImage(file)

if(url){

setImage(url)

toast.success('Фото загружено')

}

}}
/>

<div className='upload-content'>

📸 Загрузить фото

</div>

</label>
<div className='sizes-editor'>

<h3 className='sizes-title'>
Размеры и остатки
</h3>

{sizes.map((item,index)=>(

<div
className='size-stock-row'
key={index}
>

<input
className='size-input'
placeholder='Размер (S, M, L)'
value={item.size}

onChange={e=>{

const updated=[...sizes]

updated[index].size =
e.target.value

setSizes(updated)

}}
/>

<div className='stock-box'>

<button

type='button'

onClick={()=>{

const updated=[...sizes]

updated[index].stock =
Math.max(
0,
updated[index].stock - 1
)

setSizes(updated)

}}

>


<Minus size={18}/>

</button>

<span>
{item.stock}
</span>

<button

type='button'

onClick={()=>{

const updated=[...sizes]

updated[index].stock += 1

setSizes(updated)

}}

>


<Plus size={18}/>

</button>

</div>

</div>

))}

<button

className='add-size-btn'

type='button'

onClick={()=>{

setSizes([
...sizes,
{
size:'',
stock:0
}
])

}}

>

+ Добавить размер

</button>

</div>
<button onClick={add}>
Добавить
</button>

<button
className='secondary full'
onClick={()=>setOpen(false)}
>
Закрыть
</button>

</div>

</div>

)}

</div>
)
}

function AppRoutes(){

const location = useLocation()

const [cart,setCart]=useState([])

return(
<>
<Navbar cart={cart}/>

<div className='shell'>

<AnimatePresence mode='wait'>

<motion.div
key={location.pathname}
initial={{opacity:0,y:18,filter:'blur(8px)'}}
animate={{opacity:1,y:0,filter:'blur(0px)'}}
exit={{opacity:0,y:-10,filter:'blur(8px)'}}
transition={{duration:.35}}
>

<Routes location={location}>
    <Route
path='/product/:id'
element={
<ProductPage
cart={cart}
setCart={setCart}
/>
}
/>
<Route path='/' element={<Home/>}/>
<Route path='/catalog' element={<Catalog cart={cart} setCart={setCart}/>}/>
<Route path='/cart' element={<Cart cart={cart} setCart={setCart}/>}/>
<Route path='/auth-access' element={<Login/>}/>
<Route path='/system-control-panel' element={
<Protected>
<Admin/>
</Protected>
}/>
</Routes>

</motion.div>

</AnimatePresence>

</div>
</>
)
}

ReactDOM.createRoot(document.getElementById('root')).render(
<BrowserRouter>

<Toaster

position='top-right'

containerStyle={{
top:100
}}

toastOptions={{

style:{

zIndex:999999999,

background:'#111',

color:'#fff',

border:
'1px solid rgba(212,175,55,.15)',

borderRadius:'18px',

padding:'16px',

fontWeight:'600'

}

}}

/>

<AppRoutes/>

</BrowserRouter>
)
