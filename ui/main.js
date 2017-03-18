console.log('Loaded!');
var submit = document.getElementById('submit_btn');
submit.onclick = function(){
    
     var request = new XMLHttpRequest();
     
     request.onreadystatechange = function(){
         if(request.readystate == XMLHttpRequest.DONE){
         
         if(request.status == 200){
             alert("logged in");
             
         }
         else if(request.status == 403){
             alert("wrong password");
         }
         
         else if(request.status == 500)
         {
             alert("something went wrong");
         
         }
     }
         
     };
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value; 
  console.log(username);
  console.log(password);
request.open('POST', 'http://bhanu836.imad.hasura-app.io/login',true);
request.setRequestHeader('Content-Type','application/json');
request.send(JSON.stringify({username:username , password:password}));
password = " ";    
    
};
var sub = document.getElementById('register_btn');
var regdiv = document.getElementById('message');
sub.onclick = function(){
    var username = document.getElementById('username').value;
     var request = new XMLHttpRequest();
     console.log(username);
     request.onreadystatechange = function(){
         if(request.readystate === XMLHttpRequest.DONE){
         
         if(request.status === 200){
             alert("registered");
             
             
             regdiv.innerHTML = "you are registered  as" + "  " + username;
         }
         
         
         else if(request.status === 500)
         {
             alert("something went wrong");
         
         }
     }
         
     };
  
  var password = document.getElementById('password').value; 
  console.log(username);
request.open('POST', 'http://bhanu836.imad.hasura-app.io/create-user',true);
request.setRequestHeader('Content-Type','application/json');
request.send(JSON.stringify({username:username , password:password}));
    
    
};