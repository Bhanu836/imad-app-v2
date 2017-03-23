var currentArticleTitle = window.location.pathname.split('/')[2];

function loadCommentForm () {
    var commentFormHtml = `
        <h5>Submit a comment</h5>
        <textarea id="comment_text" rows="5" cols="100" placeholder="Enter your comment here..."></textarea>
        <br/>
        <input type="submit" id="submit" value="Submit" />
        <br/>
        `;
    document.getElementById('comment_form').innerHTML = commentFormHtml;
    
    // Submit username/password to login
    var submit2 = document.getElementById('submit');
    submit2.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
                // Take some action
                if (request.status === 200) {
                    // clear the form & reload all the comments
                    document.getElementById('comment_text').value = '';
                    loadComments();    
                } else {
                    alert('Error! Could not submit comment');
                }
                submit2.value = 'Submit';
          }
        };
        
        // Make the request
        var comment = document.getElementById('comment_text').value;
        request.open('POST', '/submit-comment/' + currentArticleTitle, true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({comment: comment}));  
        submit.value = 'Submitting...';
        
    };
}

function loadLogin () {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        
            if (request.status === 200) {
                loadCommentForm();
            }
        
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}

function escapeHTML (text)
{
    var $text = document.createTextNode(text);
    var $div = document.createElement('div');
    $div.appendChild($text);
    return $div.innerHTML;
}

function loadComments () {
        // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      
            var comments = document.getElementById('comments');
            if (request.status === 200) {
                var content = '';
                var commentsData = JSON.parse(this.responseText);
                for (var i=0; i< commentsData.length; i++) {
                    var time = new Date(commentsData[i].timestamp);
                    content += `<div class="comment">
                        <p>${escapeHTML(commentsData[i].comment)}</p>
                        <div class="commenter">
                            ${commentsData[i].username} - ${time.toLocaleTimeString()} on ${time.toLocaleDateString()} 
                        </div>
                    </div>`;
                }
                comments.innerHTML = content;
            } else {
                comments.innerHTML('Oops! Could not load comments!');
            }
        
    };
    
    request.open('GET', '/get-comments/' + currentArticleTitle, true);
    request.send(null);
}
var subarticle = document.getElementById('article_btn');


subarticle.onclick = function(){
   
     var request = new XMLHttpRequest();
     console.log(title);
    
    
     request.onreadystatechange = function(){
                 
         if(request.status === 200){
             alert("submitted");
             
             
             
         }
         
          else if(request.readystate === XMLHttpRequest.DONE && request.status === 500)
         {
             alert("something went wrong");
         
         }
     
        
         
     };
      var title = document.getElementById('title').value;
     var content = document.getElementById('content').value;
     var heading = document.getElementById('heading').value;
     
   request.open('POST', 'http://bhanu836.imad.hasura-app.io/articledata',true);
     request.setRequestHeader('Content-Type','application/json');
request.send(JSON.stringify({title:title , heading:heading ,content:content}));
  
  


    
};

// The first thing to do is to check if the user is logged in!
loadLogin();
