import { LayoutDashboard, Package, Users, ShoppingCart } from 'lucide-react'

export default function Admin(){
return(
<div className="admin-layout">
<aside className="sidebar">
<h2>ADMIN</h2>

<div className="menu-item"><LayoutDashboard size={18}/> Dashboard</div>
<div className="menu-item"><Package size={18}/> Products</div>
<div className="menu-item"><ShoppingCart size={18}/> Orders</div>
<div className="menu-item"><Users size={18}/> Users</div>
</aside>

<main className="admin-content">
<h1>Loong Admin Panel</h1>

<div className="stats-grid">
<div className="stat-card">
<h3>Orders</h3>
<p>124</p>
</div>

<div className="stat-card">
<h3>Revenue</h3>
<p>12 540 BYN</p>
</div>

<div className="stat-card">
<h3>Products</h3>
<p>58</p>
</div>
</div>

<div className="orders">
<h2>Последние заказы</h2>

<div className="order-row">
<span>#1024</span>
<span>Nike Air Force</span>
<span>390 BYN</span>
</div>

<div className="order-row">
<span>#1025</span>
<span>Balenciaga Hoodie</span>
<span>1050 BYN</span>
</div>
</div>
</main>
</div>
)
}
