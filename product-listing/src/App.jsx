import { useEffect, useState } from 'react'
import ProductCard from './ProductCard';
import './App.css'

function App() {
  const [products,setProducts]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");
  const fetchProducts=async ()=>{
    try{
      setLoading(true);
      setError("");
      const response=await fetch("https://dummyjson.com/products");
      if(!response.ok){
        throw new Error("failed to fetch products");
      }
      const data=await response.json();
      setProducts(data.products);
    } catch(error){
      setError(error.message);
    } finally{
      setLoading(false);
    }
  };
  useEffect(()=>{
    fetchProducts();
  },[]);
  if(loading){
    return <h2>Loading Products....</h2>
  }
  if(error){
    return (
      <div>
        <p>Error:{error}</p>
        <button onClick={fetchProducts}>Retry</button>
        </div>
    )
  }

  return (
    <>
     <div className='container'>
        <h1>Products</h1>
        <div className='product-grid'>
          {products.map((product)=>(
            <ProductCard key={product.id} product={product}/>
          ))}
        </div>
     </div>
    </>
  );
}

export default App;
