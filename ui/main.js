console.log('Loaded!');
var regdiv2 = document.getElementById('mess2');
var submit = document.getElementById('submit_btn');
  
submit.onclick = function(){
    submit.innerHTML ="loggin in ....";
     var request = new XMLHttpRequest();
     
     request.onreadystatechange = function(){
        
         
         if(request.status == 200){
             alert("logged in");
              regdiv2.innerHTML = " you are loged in as" +" " + username;
              submit.innerHTML ="logged in";
              password = " ";
         }
         else if(request.status == 403){
             alert("wrong password ,note : username is case sensitive");
         }
         
         else if(request.status == 500)
         {
             alert("something went wrong");
         
         }
     
         
     };

  console.log(username);
  console.log(password);
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value; 
request.open('POST', 'http://bhanu836.imad.hasura-app.io/login',true);
request.setRequestHeader('Content-Type','application/json');
request.send(JSON.stringify({username:username , password:password}));
  
    
};
var sub = document.getElementById('register_btn');
var regdiv = document.getElementById('mess');

sub.onclick = function(){
    var username = document.getElementById('username').value;
    var usernamev = document.getElementById('username');
  
    sub.innerHTML ="please wait ....";
     var request = new XMLHttpRequest();
     console.log(username);
    
    
     request.onreadystatechange = function(){
                 
         if(request.status === 200){
             alert("registered");
             sub.innerHTML ="register";
             usernamev.value = " ";
             password ="";
             regdiv.innerHTML =" stu registered you";
             regdiv2.innerHTML = " you are registered as" +" " + username;
             
         }
         
          else if(request.status === 500)
         {
             alert("username must be unique, try another !");
         
         }
     
        
         
     };
     var password = document.getElementById('password').value; 
   request.open('POST', 'http://bhanu836.imad.hasura-app.io/create-user',true);
     request.setRequestHeader('Content-Type','application/json');
request.send(JSON.stringify({username:username , password:password}));
  
  console.log(username);


    
};