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