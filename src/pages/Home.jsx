import {Link} from 'react-router-dom'

export default function Home(){
return(
<section className='hero'>

<div className='glow'></div>

<motion.div
className='hero-content'
initial={{opacity:0,y:30}}
animate={{opacity:1,y:0}}
transition={{duration:.6}}
>

<div className='badge'>
PREMIUM STREETWEAR
</div>

<h1>
LOO<span>NG</span>
</h1>

<p>
Curated luxury streetwear platform combining
exclusive fashion, premium sneakers and modern
ecommerce experience inspired by the world’s
top fashion retailers.
</p>

<div className='hero-actions'>

<Link to='/catalog'>
<button>
Смотреть каталог
</button>
</Link>

<Link to='/cart'>
<button className='secondary'>
Корзина
</button>
</Link>

</div>

</motion.div>

</section>
)
}
