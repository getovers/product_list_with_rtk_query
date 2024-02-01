import './App.css'
import { useState } from 'react'
import { useGetGoodsQuery, useAddProductMutation, useDeleteProductMutation } from "./redux"

function App() {
const [count, setCount] = useState('')
const [newProduct, setNewProduct] = useState('')
const {data = [], error, isLoading} = useGetGoodsQuery(count)
const [addProduct, {}] = useAddProductMutation()
const [deleteProduct] = useDeleteProductMutation()

const handleAddProduct = async () => {
  if (newProduct) {
    await addProduct({name: newProduct}).unwrap()
    setNewProduct('')
  }
}

const handleDeleteProduct = async (id: string) => {
  await deleteProduct(id).unwrap()
}

if (isLoading) return <h1>Loading...</h1>
if (error) {
  console.log(error)
  if ('status' in error) {
    const errMsg = 'error' in error ? error.error : JSON.stringify(error.data)
    return (
      <div>
        <div >An error has occured:</div>
        <div style={{color: 'red'}}>{errMsg}</div>
      </div>
    )
  } else {
    return <div style={{color: 'red'}}>{error.message}</div>
  }
}


  return (
    <div className="App">
      <div>
        <input type="text" value={newProduct} onChange={(e) => setNewProduct(e.target.value)}/>
        <button onClick={handleAddProduct}>Add product</button>
      </div>
      <div>
        <select value={count} onChange={(e) => setCount(e.target.value)}>
          <option value="''">all</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      <ul>
        {data.map(item => (
          <li key={item.id} onClick={() => handleDeleteProduct(item.id)}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
