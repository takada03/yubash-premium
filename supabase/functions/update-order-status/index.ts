import {serve}
from 'https://deno.land/std@0.168.0/http/server.ts'

serve(async(req)=>{

const corsHeaders = {

'Access-Control-Allow-Origin':'*',

'Access-Control-Allow-Headers':
'authorization, x-client-info, apikey, content-type'

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
message_id,
status,
text
} = await req.json()

const BOT_TOKEN =
Deno.env.get('BOT_TOKEN')

const CHAT_ID =
Deno.env.get('CHAT_ID')

const updatedText = `

${text.split('<b>STATUS:</b>')[0]}

<b>STATUS:</b> ${status.toUpperCase()}

`

await fetch(

`https://api.telegram.org/bot${BOT_TOKEN}/editMessageText`,

{

method:'POST',

headers:{
'Content-Type':'application/json'
},

body:JSON.stringify({

chat_id:CHAT_ID,

message_id,

text:updatedText,

parse_mode:'HTML'

})

}

)

return new Response(

JSON.stringify({
success:true
}),

{
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