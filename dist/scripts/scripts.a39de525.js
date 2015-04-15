"use strict";var MovieApp=MovieApp||{url:"https://bananas-movie-reviews.herokuapp.com"};MovieApp.getMovies=function(){$.ajax({url:MovieApp.url+"/movies",type:"GET",dataType:"JSON"}).done(function(a){MovieApp.indexMovies(a)}).fail(function(a,b,c){console.log(a,b,c)})},MovieApp.editReview=function(a,b){var c=a.currentTarget.id.replace("edit-review-b-","");$("#edit-review-b-form-"+c).toggle(),$("form#edit-review-b-form-"+c).on("submit",function(a){a.preventDefault(),console.log("The movie id is CURRENTLY: "+b),console.log("The review id is CURRENTLY: "+c);var d="'";$.ajax({url:MovieApp.url+"/movies/"+b+"/reviews/"+c+d,type:"PATCH",dataType:"JSON",data:{review:{comment:$("#review-comment-field-"+c).val()}}}).done(function(a){console.log(a),MovieApp.getMovies()}).fail()})},MovieApp.indexMovies=function(a){var b=$("#results_template").html(),c=Handlebars.compile(b);$(".posts").html(c(a)),$(".edit-review-b-form").hide();for(var d=0;d<a.length;d++)MovieApp.addToDropDown(a[d]);$(".edit-review").on("click",function(a){var b=$(this).parent().parent().attr("id").replace("movie-","");MovieApp.editReview(a,b)})},MovieApp.submitMovie=function(a){a.preventDefault&&a.preventDefault(),$.ajax({url:MovieApp.url+"/movies",type:"POST",dataType:"JSON",data:{movie:{title:$("input#movie-title").val(),gross:$("input#movie-gross").val(),release_date:$("input#movie-release-date").val(),mpaa_rating:$("input#movie-mpaa-rating").val(),description:$("textarea#movie-description").val()}}}).done(function(){MovieApp.getMovies(),$("input#movie-title").val(""),$("input#movie-gross").val(""),$("input#movie-release-date").val(""),$("input#movie-mpaa-rating").val(""),$("textarea#movie-description").val("")}).fail(function(){console.log("error")})},MovieApp.createReview=function(a){a.preventDefault(),App.setupAjaxRequests(),$.ajax({url:MovieApp.url+"/movies/"+$("#movie-dropdown").val()+"/reviews",type:"POST",dataType:"JSON",data:{review:{comment:$("#review-comment").val(),star_rating:Number($(".rating-input:checked")[0].value),reviewer_name:$("#review-reviewer-name").val()}}}).done(function(a){console.table(a)}).fail()},MovieApp.addToDropDown=function(a){var b="<option value="+a.id+">"+a.title+"</option>";$("#movie-dropdown").append(b)},$(document).ready(function(){MovieApp.getMovies(),$("form#new-movie-form").on("submit",function(a){MovieApp.submitMovie(a)}),$(".submit-btn").on("click",function(a){MovieApp.createReview(a)})});var App=function(){var a,b,c=function(){a=localStorage.getItem("authToken"),b="http://localhost:3000",g(),$("#loadPosts").on("click",h),$("#loginForm").on("submit",f),$("#registrationForm").on("submit",d)},d=function(a){return a.preventDefault(),$("#password").val().length>7?$.ajax({url:b+"/users",type:"POST",data:{user:{email:$("#email").val(),password:$("#password").val()}}}).done(e).fail(function(a){console.log(a)}):alert("don't be dumb"),!1},e=function(a){localStorage.setItem("authToken",a.token),console.log(a),window.location.href="/"},f=function(a){var c;return a.preventDefault(),c=$(this),$.ajax({url:b+"/users/sign_in",type:"POST",data:c.serialize()}).done(e).fail(function(a){console.log(a)}),!1},g=function(){$.ajaxPrefilter(function(b){b.headers={},b.headers.AUTHORIZATION="Token token="+a})},h=function(){$.ajax({url:b+"/posts",type:"GET",dataType:"json"}).done(i).fail(j)},i=function(a){console.table(a)},j=function(a){401===a.status&&(console.log("SEND TO LOGIN SCREEN"),window.location.href="/sign_in.html")};return{run:c,setupAjaxRequests:g}}();$(document).ready(function(){App.run()});