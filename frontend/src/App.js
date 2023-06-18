import './App.css';
import {useEffect, useState} from "react"

function App() {
  const [name,setName] = useState("")
  const [review,setReview] = useState("")
  const [response,setResponse] = useState("");
  const [allreview,setAllreview] = useState([]);
  const [update,setUpdate] = useState("");

  const fetchMoview = async ()=>{
    await fetch("http://localhost:3001/api/data")
    .then((data)=>data.json())
    .then((data)=>{setAllreview(data)})
  } 
  useEffect(()=>{

     fetchMoview()
     

  },[])
  
   const postRequest = async () => {
  
    const info = await fetch("http://localhost:3001/api/insert/", {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        review: review,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    }).then((data)=>(data.json()));

    setResponse(info)
    fetchMoview()

  };

   const deleteMovie = async (id)=>{

    await fetch(`http://localhost:3001/api/vanish/${id}`, {
      method: 'DELETE',
    })

     fetchMoview()
   }

   const updateReview = async (id)=>{
      fetch(`http://localhost:3001/api/update/${id}`,{
        method:'PUT',
        body:JSON.stringify({
           review:update
        }),
        headers:{
          "Content-type":"application/json; charset=UTF-8"
        }
      })
   }

  return (
    <div className='App'>
      <h1>Review</h1>
      <div className='form'>
        <label>Name</label>
        <input type='text' name="name" onChange={(data)=>{setName(data.target.value)}}></input>
        <label>Review</label>
        <input text='text' name="review" onChange={(data)=>{setReview(data.target.value)}}></input>
        <button onClick={postRequest}>Submit</button>
      </div>
{response}
{allreview.map((item)=>{
  return( 
      <div id='card'> 
      
      <h1>{item.id}. Movie Name: {item.movie_name}</h1>
         <h2>Review: {item.review}</h2>
         <button onClick={()=>{updateReview(item.id)}}> Update</button>
         <input onChange={(data)=>{setUpdate(data.target.value)}} className='update' placeholder='Update'></input>
          <button onClick={()=>{deleteMovie(item.id)}}>Delete</button>  
         
      </div>
  );
})}
    </div>
  );
}

export default App;
