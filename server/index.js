import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const productsPath =
path.join(__dirname,'data','products.json')

function getProducts(){

const data =
fs.readFileSync(productsPath,'utf8')

return JSON.parse(data)

}
app.use(cors())
app.use(express.json())
/* =========================
   PRODUCTS API
========================= */

app.get('/products',(req,res)=>{

try{

const products = getProducts()

res.json(products)

}catch(err){

console.log(err)

res.status(500).json({
success:false
})

}

})

const BOT_TOKEN = '8937562802:AAFfNMcJTDmtbSPCvxyTgxS9FdqpKFzNJjk'
const CHAT_ID = '-5090014083'

app.post('/order', async(req,res)=>{

try{

const {
name,
phone,
telegram,
comment,
cart,
total
} = req.body
/* =========================
   STOCK CHECK
========================= */

const inventory = getProducts()

for(const cartItem of cart){

const inventoryProduct =
inventory.find(p => p.id === cartItem.id)

if(!inventoryProduct){

return res.status(400).json({
success:false,
message:'Товар не найден'
})

}

const inventorySize =
inventoryProduct.sizes.find(
s => s.size === cartItem.size
)

if(!inventorySize){

return res.status(400).json({
success:false,
message:'Размер не найден'
})

}

if(inventorySize.stock <= 0){

return res.status(400).json({
success:false,
message:`Размер ${cartItem.size} отсутствует`
})

}

}
const products = cart.map(item =>

`• ${item.name}
📏 Размер: ${item.size || 'Не выбран'}
💰 ${item.price} BYN`

).join('\\n\\n')

const text = `
🛒 NEW ORDER

👤 Имя: ${name}

📞 Телефон: ${phone}

💬 Telegram: ${telegram}

📝 Комментарий:
${comment || 'Нет'}

━━━━━━━━━━━━━━

📦 Товары:
${products}

━━━━━━━━━━━━━━

💰 Итого: ${total} BYN
`

await fetch(
`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
{
method:'POST',
headers:{
'Content-Type':'application/json'
},
body:JSON.stringify({
chat_id:CHAT_ID,
text
})
}
)

res.json({success:true})

}catch(err){

console.log(err)

res.status(500).json({success:false})

}

})

app.listen(5000,()=>{
console.log('SERVER STARTED')
})