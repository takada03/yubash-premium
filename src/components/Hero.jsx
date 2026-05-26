import { motion } from 'framer-motion'
export default function Hero(){
return(
<section className="hero">
<motion.div className="hero-content" initial={{opacity:0,y:60}} animate={{opacity:1,y:0}}>
<div className="tag">PREMIUM STREETWEAR</div>
<h1>YU<span>BASH</span> STORE</h1>
<p>Luxury ecommerce inspired by Farfetch & Poizon</p>
<button>Смотреть каталог</button>
</motion.div>
</section>
)
}
