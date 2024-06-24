
document.getElementById('myForm').addEventListener('submit',async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const form = document.getElementById('myForm');
    let user_box= document.getElementById('username');
    let pass_box= document.getElementById('password');
    const formData = new FormData(form); // Create a FormData object from the form

    // console.log(formData['username']);
    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }
    console.log('request sent');
   
    try {
        let resp = await fetch('http://localhost:3000/signin', {
            method: 'post',
            body: formData
            })
            
            pass_box.value='';
            user_box.value='';
            console.log("reached resp");

            let data = await resp.json();
        
            console.log(data);
            if (data.token) {
                localStorage.setItem('authToken', data.token);}
            if(data.msg=="sign in Successfull"){
                document.getElementById('response2').innerHTML= '<a href="todo.html"><i class="fa-solid fa-arrow-right"  style="font-size:60px;"> </i></a>';
                document.getElementById('response1').classList.add("if_succ");
            }
            else{
                document.getElementById('response1').classList.add("if_failed");
            }
            
            document.getElementById('response1').innerText = data.msg;
            
                
            
        }
          
     
    catch (error) {
        console.error('Error:', error);
        document.getElementById('response').textContent = 'An error occurred';
    }
});