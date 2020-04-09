 $(function(){  
    	var countdown=60; 
    	var obj=document.getElementById("get")
    	var msg1=$("#msg1").val()
    	if(msg1=="1"){
    		 settime(obj) 
    	}
    	
    	
    	function settime(obj) {    
    	    if (countdown == 0) { 
    	        obj.removeAttribute("disabled");    
    	        obj.setAttribute("class","btn")
    	        obj.value="发送验证码"; 
    	        countdown = 60; 
    	        return;
    	    } else { 
    	        obj.setAttribute("disabled", true); 
    	        obj.setAttribute("class","btn_disable")
    	        obj.value="重新发送(" + countdown + ")"; 
    	        countdown--; 
    	    } 
    	setTimeout(function() { 
    	    settime(obj) }
    	    ,1000)     	
    	}
    	
    	
    	$("#mobile").blur(function(){
    		
    		var mobile=$("#mobile").val();
    		if(mobile!=""){  
    			$("#box1").attr("style","display:show")
    			if(!mobile.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)){    				
 		        	  $("#box11").attr("class","error")
  		         	$("#box11").html("请输入正确的手机号")
    			}else{
    				 $.ajax({
        		         url:"isPhoneExist?phone="+mobile,
        		         type: "POST"
        		     })
        		     .success(function(result) {
        		         if (result=="yes") {
       		        	  $("#box11").attr("class","error")
        		         	$("#box11").html("手机号已存在")
        		         }else{
        		        	 $("#box11").attr("class","normal")
        		        	 $("#box11").html("")
        		        	 $("#get").attr("class","btn").attr("disabled","false")
        		        	 
        		         } 
        		         	
        		     })
    				
    			}

    		}else{
    			$("#box1").attr("style","display:none")
    		}
    		});
$("#verify_code").blur(function(){
			var code2=$("#code2").val();
    		var verify_code=$("#verify_code").val();
    		if(verify_code!=""){  
    			$("#box2").attr("style","display:show")
    			if(verify_code!=code2){    				
 		        	  $("#box22").attr("class","error")
  		         	$("#box22").html("验证码错误")
    			}else{   				
        		        	 $("#box22").attr("class","normal")
        		        	 $("#box22").html("")
        		      
    				
    			}

    		}else{
    			$("#box2").attr("style","display:none")
    		}
    		});

$("#name").blur(function(){
	var name=$("#name").val();
	if(name!=""){  
		 $("#box3").attr("style","display:show")
		   				
		 $("#box33").attr("class","normal")
		 $("#box33").html("")

	}else{
		$("#box3").attr("style","display:none")
	}
	});


    	
$("#IDnum").blur(function(){
	
	var ID=$("#IDnum").val();
	if(ID!=""){  
		$("#box4").attr("style","display:show")
		if(!ID.match(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/)){    				
	        	  $("#box44").attr("class","error")
	         	$("#box44").html("请输入正确的身份证号")
		}else{
			 $.ajax({
		         url:"isIDExist?idnum="+ID,
		         type: "POST"
		     })
		     .success(function(result) {
		         if (result=="yes") {
		        	  $("#box44").attr("class","error")
		         	$("#box44").html("身份证号已存在")
		         }else{
		        	 $("#box44").attr("class","normal")
		        	 $("#box44").html("")
		        	 
		         } 
		         	
		     })
			
		}

	}else{
		$("#box4").attr("style","display:none")
	}
	});


$("#password").blur(function(){
	var password=$("#password").val();
	if(password!=""){  
		 $("#box5").attr("style","display:show")
		   				
		 $("#box55").attr("class","normal")
		 $("#box55").html("")

	}else{
		$("#box5").attr("style","display:none")
	}
	});

    });   
    	
    	
    	
    	
    	
    	/* function change(a){
    		if(a=="1"){
    			$("#get").attr("class","btn-normal btn-mini verify-btn J-verify-btn btn-disabled")
    			$("#get").removeAttr("onclick");
    			$("#get").attr("value","重新获取")
    		}
    	}
    	var a=$("#msg").val()
    	change(a); */
 
    function getCode(){
    	if($("#box11").hasClass('normal')){
    		$("#get").removeAttr("disabled");
    		alert(111)
    		var phonenum =$("#mobile").val();		
    		document.location.href='getCode?phonenum='+phonenum;
    		$("#get").attr("class","btn_disable")
    		$("#mobile").attr("disabled","disabled")
    	}
		
		
	}
