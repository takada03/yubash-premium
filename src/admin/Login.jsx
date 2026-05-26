import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

export default function Login(){
const [password,setPassword]=useState('')
const navigate=useNavigate()

const submit=(e)=>{
e.preventDefault()
if(password==='yubashadmin'){
localStorage.setItem('yubash_admin','true')
navigate('/admin-panel-yubash')
}else{
alert('Неверный пароль')
}
}

return(
<div className="login-page">
<form className="login-box" onSubmit={submit}>
<h1>Admin Login</h1>
<input
type="password"
placeholder="Пароль"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>
<button type="submit">Войти</button>
</form>
</div>
)
}
