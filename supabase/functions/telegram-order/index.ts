import { serve } from
'https://deno.land/std@0.168.0/http/server.ts'

serve(async (req) => {

const corsHeaders = {

'Access-Control-Allow-Origin': '*',

'Access-Control-Allow-Headers':
'authorization, x-client-info, apikey, content-type',

'Access-Control-Allow-Methods':
'POST, OPTIONS'

}

if (req.method === 'OPTIONS') {

return new Response(
'ok',
{
headers: corsHeaders
}
)

}

try {

const {
name,
phone,
telegram,
comment,
cart,
total
} = await req.json()

const BOT_TOKEN =
'8937562802:AAFfNMcJTDmtbSPCvxyTgxS9FdqpKFzNJjk'

const CHAT_ID =
'-5090014083'

const orderId =
Math.floor(
100000 + Math.random() * 900000
)

const date =
new Date().toLocaleString('ru-RU')

const items = cart.map(item => `

<b>${item.name}</b>

┌ Размер: ${item.size}
└ Цена: ${item.price} BYN

`).join('')

const text = `

<b>YUBASH NEW ORDER</b>

━━━━━━━━━━━━━━━

🧾 <b>ORDER ID</b>
#${orderId}

📅 <b>DATE</b>
${date}

━━━━━━━━━━━━━━━

👤 <b>CUSTOMER</b>

Имя:
${name}

Телефон:
${phone}

Telegram:
${telegram || 'Не указан'}

━━━━━━━━━━━━━━━

🛍 <b>ITEMS</b>

${items}

━━━━━━━━━━━━━━━

💬 <b>COMMENT</b>

${comment || 'Нет комментария'}

━━━━━━━━━━━━━━━

💰 <b>TOTAL</b>

${total} BYN

━━━━━━━━━━━━━━━

<b>STATUS:</b> NEW ORDER

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

text,

parse_mode:'HTML'

})

}

)

return new Response(

JSON.stringify({
success:true
}),

{
status:200,

headers:{
...corsHeaders,
'Content-Type':'application/json'
}
}

)

}catch(err){

return new Response(

JSON.stringify({
error:String(err)
}),

{
status:500,

headers:{
...corsHeaders,
'Content-Type':'application/json'
}
}

)

}

})