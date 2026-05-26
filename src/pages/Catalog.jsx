const items=[
{name:'Balenciaga Hoodie',price:'1050 BYN',img:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200'},
{name:'Nike Air Force',price:'390 BYN',img:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200'},
{name:'Stone Island Jacket',price:'1490 BYN',img:'https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=1200'}
]

export default function Catalog(){
return(
<section className="catalog">
<h2>Premium Collection</h2>

<div className="grid">
{items.map((i,index)=>(
<div className="card" key={index}>
<img src={i.img}/>
<div className="content">
<h3>{i.name}</h3>
<p>{i.price}</p>
<button>В корзину</button>
</div>
</div>
))}
</div>
</section>
)
}
