import React, {useState, useEffect} from "react";


const Home = () => {
    const [input, setInput] = useState("");
    const [todos, setTodos] = useState([]);
    const [todosEnServer, setTodosEnServer] = useState([])

    function handleInput(e) {
        setInput(e.target.value);
    }

    const handleClick = () => {
        if (input.length === 0) {
            alert("Debe ingresar un valor")
        } else {
            setTodos([...todos, {"label":input, "done":false}]);
			setInput("")
        }
         
        }



    const clickBorrar = () => {
        setTodos([])

    }


    useEffect(() => {
        userPush()     
    }, [])

  useEffect(() => {
    getTodos()
  uptdateTodos()
  },[todos])


  function userPush(){
    fetch(`https://assets.breatheco.de/apis/fake/todos/user/locomotion`,
    {method: 'POST', 
    headers: {
        'Content-Type': 'application/json'},
    body: JSON.stringify([])
  })
    .then((response)=>response.json())
    .then((data)=>console.log(data))
}

    function getTodos(){
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/locomotion`,
		{method: 'GET', 
		headers: {
			'Content-Type': 'application/json'}
	  })
		.then((response)=>response.json())
		.then((data)=>setTodosEnServer(data))
	}


    function uptdateTodos(){
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/locomotion`,
		{method: 'PUT', 
		headers: {
			'Content-Type': 'application/json'},
		body: JSON.stringify(todos)
	  })
		.then((response)=>response.json())
		.then((data)=>console.log(todosEnServer))
	}

    function killTodos(){
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/locomotion`,
		{method: 'DELETE', 
		headers: {
			'Content-Type': 'application/json'}
	  })
		.then((response)=>response.json())
		.then((data)=>console.log(data))
	}


    return (
        <div className="contenedor">

            <div className="card toDo col-6">
				<h1 className="titulo text-center py-2 card-header">Tareas <i class="fas fa-tasks"></i></h1>

                    <div className="input-group mb-3">




                        <input onChange={handleInput}
                            type="text"
                            className="nuevaTarea w-100 mx-auto  py-3  input-group input-group-lg"
							placeholder="Escribe aqui tu nueva Tarea."
                            value={input}
                            aria-label="Example text with button addon"
                            aria-describedby="button-addon1"/>
                    </div>

					<button onClick={handleClick}
                            className="btn btn-success mx-5"
                            type="button"
                            
                            id="button-addon1">Agregar! <i class="fas fa-plus-circle"></i>
			</button>
                    <div id="contenedorTodos" className="text-dark lista card-body mt-2">

					<h1 className="m-3"> <i className="far icon fa-square"></i> Tareas pendientes:</h1>
					<hr />
                        {
                        
                        <ul>{todos.map((todo, i) => (
                            <li key={i}>
                              {todo.label}
                              <button className="btn" onClick={() => setTodos(todos.filter((elemento, currentIndex) => i != currentIndex))}>
                                <i className="fas fa-trash-alt align-items-end m-2 pt-1" />
                              </button>
                            </li>
                          ))}</ul>
                        
                    } </div>

                 

                    <div className="lista" id="contadorTodos ">
                        <p className="text-dark mt-3">Faltan por realizar {
                            todos.length
                        }
                            &nbsp;tareas</p>
                    </div>
                    <button onClick={clickBorrar}
                        className="btn btn-danger"
                        type="button"
                        id="button-addon1">Borrar Todo</button>
                </div>
            </div>
    );
};

export default Home;
