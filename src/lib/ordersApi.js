import {supabase} from './supabase'

export async function createOrder(order){

const {data,error} = await supabase
.from('orders')
.insert([order])
.select()

if(error){

console.log(error)

return null

}

return data

}

export async function loadOrders(){

const {data,error} = await supabase
.from('orders')
.select('*')
.order('created_at',{
ascending:false
})

if(error){

console.log(error)

return []

}

return data

}