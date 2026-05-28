import {supabase}
from './supabase'

export async function createOrder(order){

const {data,error} =
await supabase
.from('orders')
.insert({
...order,

telegram_message_id:
order.telegram_message_id,

telegram_text:
order.telegram_text
})
.select()
.single()

if(error){

console.log(error)

return null

}

return data

}

export async function loadOrders(){

const {data,error} =
await supabase
.from('orders')
.select('*')
.order('created_at',{
ascending:false
})

if(error){

console.log(error)

return []

}

return data || []

}

export async function updateOrderStatus(
id,
status
){

const {data,error} =
await supabase
.from('orders')
.update({
status
})
.eq('id',id)
.select()
.single()

if(error){

console.log(error)

return null

}

return data

}

export async function deleteOrder(id){

const {error} =
await supabase
.from('orders')
.delete()
.eq('id',id)

if(error){

console.log(error)

return false

}

return true

}