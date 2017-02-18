(function(){var app = angular.module("bookstore",[]);
 
 app.controller("formCtrl",function(){
 this.Aname= shabd;
 this.entryno = 1;
 this.place = function(){
 this.Aname = review.name;
 this.email= review.email;
 this.bookname= review.bookname;
 
 
 };
 
 });
 var shabd={
 name :"bhanu",
 class:"electrical"
 };
 app.controller("mycontroller",function(){
 
 this.cinema = sochfilmki;
 this.place =function(){
					
				     
					this.cinema.push({MOVIE_NAME:this.review.bookname,REVIEW:this.review.review_a,STARS:this.review.stars});
						
					
					};
					
 });
 		 
		  app.controller("tabController",function(){
				    this.numb = 1;
					this.setTab= function(newValue){
					this.numb= newValue;
					};
					this.isSet= function(valName){
					  return this.numb === valName;
					};
					});

 
 var sochfilmki =[{MOVIE_NAME:"HANGOVER - 1",REVIEW: "FAADU",STARS:"5"},{MOVIE_NAME: "HANGOVER - 2",REVIEW: "BAHUT FAADU",STARS:"5"},{MOVIE_NAME: "HANGOVER - 3",REVIEW:"MAATHA JHAJHKOR DIYA" ,STARS:"5"}];
})();