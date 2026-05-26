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

await fetch('http://localhost:5000/order',{

method:'POST',

headers:{
'Content-Type':'application/json'
},

body:JSON.stringify({
name,
phone,
telegram,
comment,
cart,
total
})

})

setOpen(false)

alert('Заказ отправлен')

}catch(err){

alert('Ошибка отправки')

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
<h3>{item.name}</h3>
<p>{item.price} BYN</p>
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

<div className='modal'>

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

<button onClick={submit}>
Отправить заказ
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

</section>

)

}