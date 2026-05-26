export default function Dashboard(){

const logout=()=>{
localStorage.removeItem('yubash_admin')
window.location.href='/'
}

return(
<div className="dashboard">
<div className="sidebar">
<h2>YUBASH ADMIN</h2>

<div className="menu">Dashboard</div>
<div className="menu">Products</div>
<div className="menu">Orders</div>
<div className="menu">Users</div>

<button onClick={logout}>Logout</button>
</div>

<div className="main">
<h1>Dashboard</h1>

<div className="stats">
<div className="stat">
<h3>Orders</h3>
<p>124</p>
</div>

<div className="stat">
<h3>Revenue</h3>
<p>12 540 BYN</p>
</div>

<div className="stat">
<h3>Products</h3>
<p>58</p>
</div>
</div>
</div>
</div>
)
}
