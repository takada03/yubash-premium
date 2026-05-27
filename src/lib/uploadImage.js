import {supabase} from './supabase'

import imageCompression
from 'browser-image-compression'

export async function uploadImage(file){

try{

const compressedFile =
await imageCompression(
file,
{
maxSizeMB:0.3,
maxWidthOrHeight:1600,
useWebWorker:true,

fileType:'image/webp'
}
)

const fileName =
`${Date.now()}.webp`

const {error} = await supabase
.storage
.from('products')
.upload(
fileName,
compressedFile
)

if(error){

console.log(error)

return null

}

const {data} = supabase
.storage
.from('products')
.getPublicUrl(fileName)

return data.publicUrl

}catch(err){

console.log(err)

return null

}

}