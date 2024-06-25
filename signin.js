
let add_user= document.getElementById("add-user");
add_user.classList.add("hid_display");
console.log(document.getElementsByClassName('myForm'));


document.getElementsByClassName('myForm')[0].addEventListener('submit',async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const form = document.getElementsByClassName('myForm');
    let user_box= document.getElementsByClassName('username');
    let pass_box= document.getElementsByClassName('password');
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
                if(document.getElementById('response2').classList.contains("if_failed")){
                    document.getElementById('response2').classList.remove("if_failed");
                }
                document.getElementById('response1').classList.add("if_succ");
                document.getElementById('response1').innerText = data.msg;
            }
            else if(data.msg== "password is invalid"){
                if(document.getElementById('response2').classList.contains("if_succ")){
                    document.getElementById('response2').classList.remove("if_succ");
                }
                document.getElementById('response1').classList.add("if_failed");
                document.getElementById('response1').innerText = data.msg;
                document.getElementById('response1').innerText = "RETRY PLZ";
            }
            // create a new user
            else{
                var elements = document.getElementsByClassName("signin");
                elements.classList.add("hid_display");
                add_user.classList.remove("hid_display");

                document.getElementsByClassName('myForm')[1].addEventListener('submit',async function(event) {
                    event.preventDefault(); // Prevent the default form submission
                
                    const form = document.getElementsByClassName('myForm');
                    let user_box= document.getElementsByClassName('username');
                    let pass_box= document.getElementsByClassName('password');
                    const formData = new FormData(form); // Create a FormData object from the form
                
                    // console.log(formData['username']);
                    for (let [key, value] of formData.entries()) {
                        console.log(`${key}: ${value}`);
                    }
                    console.log('request sent to add an user');
                   
                    try {
                        let resp = await fetch('http://localhost:3000/signin/add', {
                            method: 'post',
                            body: formData
                            })
                            
                            pass_box.value='';
                            user_box.value='';
                            console.log("reached resp");
                
                            let data = await resp.json();
                            document.getElementById('response1').classList.add("if_succ");
                            document.getElementById('response1').innerText = data.msg;
                            // document.getElementById('response2').innerHTML= '<a href="signin.html"><i class="fa-solid fa-arrow-left"></i></a>';


                         }
                         catch{
                            

                         }
                    }
)}
            }
          
     
    catch(error) {
        console.error('Error:', error);
        document.getElementById('response').textContent = 'An error occurred';
       
    }
});