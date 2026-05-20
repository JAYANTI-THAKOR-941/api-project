import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ProductManagement = () => {

    const [products,setProducts] = useState([]);

    const [form,setForm] = useState({
        name:"",
        description:"",
        category:"",
        price:"",
        image:""
    });

    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const fetchProducts = async()=>{
        try{
            const res = await axios.get('http://localhost:3000/products')
            setProducts(res.data);
        }
        catch(err){
            console.log('Failed to fetch products.!!')
        }
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();

        try{
            await axios.post('http://localhost:3000/products',form);
            alert('Product Addedd successfully.!')
        }
        catch(err){
            console.log('Failed to add product.!!')
        }
    }

    useEffect(()=>{
        fetchProducts()
    },[products])


    const handleDelete = async(id)=>{
        await axios.delete(`http://localhost:3000/products/${id}`)
        alert('Product deleted successfully.!')
    }

  return (
    <div>
        <table>
            <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Category</th>
                <th>Price</th>
                <th>Action</th>
            </tr>
            {products.map((p,index)=>(
                <tr key={index}>
                    <td><img src={p.image} alt="" /></td>
                    <td>{p.name}</td>
                    <td>{p.description}</td>
                    <td>{p.category}</td>
                    <td>{p.price}</td>
                    <td><button>Edit</button> <button onClick={()=>handleDelete(p.id)}>Delete</button></td>
                </tr>
            ))}
        </table>

        <form onSubmit={handleSubmit}>
            <input type="text" onChange={handleChange} value={form.name} name='name' />
            <input type="text" onChange={handleChange} value={form.description} name='description' />
            <input type="text" onChange={handleChange} value={form.category} name='category' />
            <input type="text" onChange={handleChange} value={form.price} name='price' />
            <input type="text" onChange={handleChange} value={form.image} name='image' />
            <button>Add Product</button>
        </form>
    </div>
  )
}

export default ProductManagement