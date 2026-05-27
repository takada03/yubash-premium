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