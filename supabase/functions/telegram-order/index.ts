import { serve }
from 'https://deno.land/std@0.168.0/http/server.ts'

serve(async (req) => {

const corsHeaders = {

'Access-Control-Allow-Origin': '*',

'Access-Control-Allow-Headers':
'authorization, x-client-info, apikey, content-type',

'Access-Control-Allow-Methods':
'POST, OPTIONS'

}

if(req.method === 'OPTIONS'){

return new Response(
'ok',
{
headers:corsHeaders
}
)

}

try{

const {
name,
phone,
telegram,
comment,
cart,
total
} = await req.json()

const safeName =
(name || '')
.replace(/</g,'')
.replace(/>/g,'')

const safeTelegram =
(telegram || '')
.replace(/</g,'')
.replace(/>/g,'')

const safeComment =
(comment || '')
.replace(/</g,'')
.replace(/>/g,'')

const BOT_TOKEN =
Deno.env.get('BOT_TOKEN')

const CHAT_ID =
Deno.env.get('CHAT_ID')

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
${safeName}

Телефон:
${phone}

Telegram:
${safeTelegram || 'Не указан'}

━━━━━━━━━━━━━━━

🛍 <b>ITEMS</b>

${items}

━━━━━━━━━━━━━━━

💬 <b>COMMENT</b>

${safeComment || 'Нет комментария'}

━━━━━━━━━━━━━━━

💰 <b>TOTAL</b>

${total} BYN

━━━━━━━━━━━━━━━

<b>STATUS:</b> NEW ORDER

`

const tg =
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

const tgData =
await tg.json()

console.log(tgData)

if(!tgData.ok){

return new Response(

JSON.stringify({
error:tgData
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

const messageId =
tgData.result.message_id

return new Response(

JSON.stringify({

success:true,

messageId,

telegramText:text

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