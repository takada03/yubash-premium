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

const {password} =
await req.json()

const ADMIN_PASSWORD =
Deno.env.get(
'ADMIN_PASSWORD'
)

if(password === ADMIN_PASSWORD){

return new Response(

JSON.stringify({

success:true,

token:
Deno.env.get(
'ADMIN_TOKEN'
)

}),

{
headers:{
...corsHeaders,
'Content-Type':'application/json'
}
}

)

}

return new Response(

JSON.stringify({
success:false
}),

{
status:401,

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