var currentArticleTitle = window.location.pathname.split('/')[2];

function loadCommentForm () {
    var commentFormHtml = `
        <h6>Submit a comment</h6>
        <textarea id="comment_text" rows="8" cols="100" placeholder="Enter your comment here..." style="background-color:#F0F8FF; border-radius: 8px;
        margin-left:5% ;font-size:120%;font-family: Tahoma, Geneva, sans-serif"></textarea>
        <br/>
        <input type="submit" id="submit2" value="Submit" style=" margin-left: 10%"/>
        <br/>
        `;
    document.getElementById('comment_form').innerHTML = commentFormHtml;
    
    // Submit username/password to login
    var submit2 = document.getElementById('submit2');
    submit2.onclick = function () {
        // Create a request object
        submit2.innerHTML="submitting ,wait...";
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
                // Take some action
                
                    // clear the form & reload all the comments
                    console.log("hello");
                   
                    loadComments();
                    submit2.innerHTML="submit more comments";
                } else if (request.status === 500 && request.readyState === XMLHttpRequest.DONE ){
                    alert('Error! Could not submit comment');
                }
                submit2.value = 'Submit';
          
        };
        
        // Make the request
        var comment = document.getElementById('comment_text').value;
        request.open('POST', '/submit-comment/' + currentArticleTitle, true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({comment:comment}));  
       
        
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
        var textareacom = document.getElementById('comment_text');
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      
            var comments = document.getElementById('comments');
            if (request.status === 200) {
                var content = '';
                var commentsData = JSON.parse(this.responseText);
                for (var i=0; i< commentsData.length; i++) {
                    var time = new Date(commentsData[i].timestamp);
                    if(i%2 === 0){content += `<div class="commenteven">
                        <dl>
                       <dt> <span class="commentereven">
                           <strong> ${commentsData[i].username}</strong> - <i>${time.toLocaleTimeString()} on ${time.toLocaleDateString()}</i> 
                        </span></dt>
                        <dd><p class="commentereven">${escapeHTML(commentsData[i].comment)}</p></dd>
                        </dl>
                    </div>`;
                    }
                    else if(i%2 !== 0){content += `<div class="commentodd">
                        <dl>
                       <dt> <span class="commenterodd">
                           <strong> ${commentsData[i].username}</strong> - <i>${time.toLocaleTimeString()} on ${time.toLocaleDateString()}</i> 
                        </span></dt>
                        <dd><p class="commenterodd">${escapeHTML(commentsData[i].comment)}</p></dd>
                        </dl>
                    </div>`;
                    }
                }
                comments.innerHTML = content;
                textareacom.value =" ";
            } else if (request.status !== 200 && request.readyState === XMLHttpRequest.DONE) {
                comments.innerHTML = 'Oops! Could not load comments!';
            }
        
    };
    
    request.open('GET', '/get-comments/' + currentArticleTitle, true);
    request.send(null);
}

// The first thing to do is to check if the user is logged in!
loadLogin();
loadComments();