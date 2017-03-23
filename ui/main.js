console.log('Loaded!');
var regdiv2 = document.getElementById('mess2');
var submit = document.getElementById('submit_btn');
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value; 
submit.onclick = function(){
    
     var request = new XMLHttpRequest();
     
     request.onreadystatechange = function(){
        
         
         if(request.status == 200){
             alert("logged in");
              regdiv2.innerHTML = " you are loged in as" +" " + username;
             
         }
         else if(request.status == 403){
             alert("wrong password");
         }
         
         else if(request.status == 500)
         {
             alert("something went wrong");
         
         }
     
         
     };

  console.log(username);
  console.log(password);
request.open('POST', 'http://bhanu836.imad.hasura-app.io/login',true);
request.setRequestHeader('Content-Type','application/json');
request.send(JSON.stringify({username:username , password:password}));
  
    
};
var sub = document.getElementById('register_btn');
var regdiv = document.getElementById('mess');

sub.onclick = function(){
    var username = document.getElementById('username').value;
     var request = new XMLHttpRequest();
     console.log(username);
    
    
     request.onreadystatechange = function(){
                 
         if(request.status === 200){
             alert("registered");
             
             regdiv.innerHTML =" stu registered you";
             regdiv2.innerHTML = " you are registered as" +" " + username;
             
         }
         
          else if(request.readystate === XMLHttpRequest.DONE && request.status === 500)
         {
             alert("something went wrong");
         
         }
     
        
         
     };
     var password = document.getElementById('password').value; 
   request.open('POST', 'http://bhanu836.imad.hasura-app.io/create-user',true);
     request.setRequestHeader('Content-Type','application/json');
request.send(JSON.stringify({username:username , password:password}));
  
  console.log(username);


    
};