import { motion } from 'framer-motion'
import { useCart } from '../store/cartStore'

const products=[
{id:1,name:'Balenciaga Hoodie',price:'1050 BYN',image:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'},
{id:2,name:'Nike Air Force',price:'390 BYN',image:'https://images.unsplash.com/photo-1542291026-7eec264c27ff'},
{id:3,name:'Stone Island Jacket',price:'1490 BYN',image:'https://images.unsplash.com/photo-1523398002811-999ca8dec234'}
]

export default function ProductGrid(){
const addToCart = useCart((s)=>s.addToCart)
return(
<section className="products">
<h2>Premium Collection</h2>
<div className="grid">
{products.map((p)=>(
<motion.div className="card" whileHover={{y:-10}} key={p.id}>
<img src={p.image} alt={p.name}/>
<div className="content">
<h3>{p.name}</h3>
<p>{p.price}</p>
<button onClick={()=>addToCart(p)}>В корзину</button>
</div>
</motion.div>
))}
</div>
</section>
)
}
