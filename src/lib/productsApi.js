import {supabase} from './supabase'
import toast from 'react-hot-toast'
export async function createProduct(product){

const {data,error} = await supabase
.from('products')
.insert([product])
.select()

if(error){

console.error(error)
toast.error(error.message)

return null

}

return data

}

export async function deleteProduct(product){

try{

if(product.image){

const imageUrl = product.image

const fileName =
decodeURIComponent(
imageUrl.split('/products/')[1]
)

const {error:storageError} =
await supabase
.storage
.from('products')
.remove([
fileName.trim()
])

if(storageError){

console.log(storageError)

}

}

const {error} =
await supabase
.from('products')
.delete()
.eq('id',product.id)

if(error){

console.log(error)

}

}catch(err){

console.log(err)

}

}
export async function updateProduct(id,updates){

const {data,error} = await supabase
.from('products')
.update(updates)
.eq('id',id)
.select()

if(error){

console.log(error)

return null

}

return data

}