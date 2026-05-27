import {supabase} from '../lib/supabase'

export async function loadProducts(){

const {data,error} = await supabase
.from('products')
.select('*')
.eq('active',true)
.order('created_at',{ascending:false})

if(error){

console.log(error)

return []

}

return data

}
export async function loadProduct(id){

const {data,error} = await supabase
.from('products')
.select('*')
.eq('id',id)
.single()

if(error){

console.log(error)

return null

}

return data

}