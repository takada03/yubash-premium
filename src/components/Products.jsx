
import { motion } from "framer-motion";

const products = [
  {
    name: "Balenciaga Hoodie",
    brand: "BALENCIAGA",
    price: "1050 BYN",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
  },
  {
    name: "Nike Air Force",
    brand: "NIKE",
    price: "390 BYN",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
  },
  {
    name: "Stone Island Jacket",
    brand: "STONE ISLAND",
    price: "1490 BYN",
    image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234"
  }
];

export default function Products() {
  return (
    <section className="products">
      <div className="section-title">
        PREMIUM COLLECTION
      </div>

      <div className="grid">
        {products.map((item, index) => (
          <motion.div
            className="card"
            key={index}
            whileHover={{ y: -10 }}
          >
            <img src={item.image} alt={item.name} />

            <div className="card-content">
              <span>{item.brand}</span>
              <h3>{item.name}</h3>
              <p>{item.price}</p>

              <button className="gold-btn small">
                В корзину
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
