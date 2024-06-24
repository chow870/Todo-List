
try{
    window.onload = async function (){
    
    const token = localStorage.getItem('authToken'); // for verification
    console.log(token);
    
    try {
        let resp = await fetch('http://localhost:3000/todos', {
            method: 'GET', // HTTP method should be in uppercase
            headers: {
                'Authorization': `${token}`, // Use 'Authorization' or the appropriate header name
        
            }
        });
            
            console.log("reached resp");

            let data = await resp.json();
            console.log(data);
            let data2=data.todo;

            data2.forEach((element)=> {
                let todo_body=document.getElementById('mid');
                let outerDiv1= document.createElement('div');
                todo_body.appendChild(outerDiv1);


                let innerDiv1= document.createElement('div');
                innerDiv1.innerText=element.todo;
                outerDiv1.appendChild(innerDiv1);

                let innerDiv2= document.createElement('div');
                innerDiv2.innerText=element.due;
                outerDiv1.appendChild(innerDiv2);

                // delete bhi simuntaneously kr do : 

                let button1= document.createElement('button');
                button1.innerText='delete';

                button1.addEventListener('click',async ()=>{
                    let body_data={
                        id:element['_id'],
                        username:element.username
                    }

                    let response= await fetch('http://localhost:3000/todos', {
                        method: 'delete',
                        headers: {
                            'Content-Type': 'application/json' // Tell the server that the request body is in JSON format
                        },
                        body: JSON.stringify(body_data)
                        }).then(()=>{
                            console.log("deleted the todo");
                            outerDiv1.remove(outerDiv1);
                        })
                        .catch((error)=>{
                            console.log(error);
                        })
                    
                }) 
                outerDiv1.appendChild(button1);
            });   
            
        }
        catch(error){
            console.log("couldnt send the request");
            console.log(error);
        }
}}
catch(error){
    console.log("windows onload")
    console.log(error)
}