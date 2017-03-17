console.log('Loaded!');
var submit = document.getElementById('submit_btn');
submit.onclick = function(){
    console.log(username);
     var request = new XMLHttpRequest();
     
     request.onreadystatechange = function(){
         if(request.readystate == XMLHttpRequest.DONE){
         
         if(request.status == 200){
             alert('logged in');
             
         }
         else if(request.status == 403){
             alert('wrong password');
         }
         
         else if(request.status == 500)
         {
             alert('something went wrong');
         
         }
     }
         
     };
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value; 
  console.log(username);
request.open('POST', 'http://bhanu836.imad.hasura-app.io/login',true);
request.setRequestHeader('Content-Type','application/json');
request.send(JSON.stringify({username:username , password:password}));
    
    
};
var sub = document.getElementById('register_btn');

sub.onclick = function(){
    var username = document.getElementById('username').value;
     var request = new XMLHttpRequest();
     console.log(username);
     request.onreadystatechange = function(){
         if(request.readystate === XMLHttpRequest.DONE){
         
         if(request.status === 200){
             alert('registered');
             
         }
         
         
         else if(request.status === 500)
         {
             alert('something went wrong');
         
         }
     }
         
     };
  
  var password = document.getElementById('password').value; 
  console.log(username);
request.open('POST', 'http://bhanu836.imad.hasura-app.io/create-user',true);
request.setRequestHeader('Content-Type','application/json');
request.send(JSON.stringify({username:username , password:password}));
    
    
};