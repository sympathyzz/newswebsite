/*
	August 5, 2014
	ajax module
	
	author baggiod
	
*/
(function(_w) {
	var AlterMoblieArr = [],
	_inputTit={mobile:"手机号",resetmobile:"手机号",unmobile:"绑定手机号",moblieverify:"验证码",password:"密码",email:"邮箱",resetemail:"邮箱",verify:"验证码"};
	var oDi,oUnSubscribeAttr, unSubscribeAttr;
	function bind_respond(dom){
		if(!dom){dom = document;}
		var d=dom.getElementsByTagName("*");
		for(var i=0;i<d.length;i++){
			var clickAttr = d[i].getAttribute("data-bg-click"),
			onblurAttr = d[i].getAttribute("data-bg-onblur"),
			createDomAttr = d[i].getAttribute("data-bg-create"),
			unSubscribeAttr = d[i].getAttribute("data-un-subscribe-click");
			oUnSubscribeAttr = d[i].getAttribute("data-un-subscribe-click");
			
			if(clickAttr){
				/*dom点击事件*/
				if(clickAttr=="revise"){revise_profile(d[i]);}
				else if(clickAttr=="binding"){bindings(d[i]);}
				else if(clickAttr=="userAvatarSeting"){userAvatarSeting(d[i]);}
				else if(clickAttr=="tagchange"){tagChange(d[i]);}
				else if(clickAttr=="get_moblie_verify"){get_moblie_verify(d[i]);}
				else if(clickAttr=="bind_email"){bind_email(d[i]);}
				else if(clickAttr.indexOf("alter_moblie")==0){alter_moblie(d[i]);}
				else if(clickAttr=="reset_password"){reset_password(d[i]);}
			}
			
			if(onblurAttr){
				/*dom失去焦点事件*/
				if(onblurAttr=="input_verify"){
					// input ajax 验证
					inputVerify(d[i]);
				}
			}

			if(createDomAttr){
				if(createDomAttr.indexOf("alterMoblie")==0){
					AlterMoblieArr.push(d[i]);
				}
			}

			if(unSubscribeAttr&&unSubscribeAttr!=""){
				bind_un_subscribe(d[i],unSubscribeAttr);
				oDi=d[i];
				oUnSubscribeAttr=unSubscribeAttr;
			}
			
		}
	}

	function escapeHtml(unsafe) {
	    return unsafe
	         .replace(/&/g, "&amp;")
	         .replace(/</g, "&lt;")
	         .replace(/>/g, "&gt;")
	         .replace(/"/g, "&quot;")
	         .replace(/'/g, "&#039;");
	 }

	function unescapeHtml(unsafe) {
	    return unsafe
	         .replace(/&amp;/g, "&")
	         .replace(/&lt;/g, "<")
	         .replace(/&gt;/g, ">")
	         .replace(/&quot;/g, '"')
	         .replace(/&#039;/g, "'");
	}
	
	// 修改个人信息事件添加
	function revise_profile(dom){
		var _box = document.getElementById("profile_baseInfo_box");		
		dom.onclick = function(){
			if(this.className=="save_btn"){					
				var t = this;
				if(_box&&_h.profile_data){
					var boxInput = _box.getElementsByTagName("input"),data={},postData='';
					for(var i=0;i<boxInput.length;i++){
						var iname = boxInput[i].getAttribute("name");
						if(iname=="birthday"){
							data.birthday_year = boxInput[i].value.split("-")[0];
							data.birthday_month = boxInput[i].value.split("-")[1];
							data.birthday_day = boxInput[i].value.split("-")[2];
						}else{
							iname = iname=="nickname"?"username":iname;
							data[iname] = boxInput[i].value;
						}
					}
					for(i in data){
						_h.profile_data[i] = data[i].replace(/&/g, "&amp;")
				         .replace(/</g, "&lt;")
				         .replace(/>/g, "&gt;")
				         .replace(/"/g, "&quot;")
				         .replace(/'/g, "&#039;")
						postData+=i+'='+data[i]+'&';
					}
					postData = postData.substr(0,postData.length-1);
					// console.log(postData);
					_h.lj(_h._domain+'Js/ajax',function(){
						_h.isAjax({
							url:"index.php?g=auth&m=members&a=modify_information",
							data:postData,
							sfun:function(d){
								if(d.code==0){
									for(var i=0;i<boxInput.length;i++){
										var iname = boxInput[i].getAttribute("name");
										iname = iname=="nickname"?"username":iname;
										for(var j=0;j<d.msg.length;j++){
											var _prompt = _h.c(".prompt",boxInput[i].parentNode);											
											if(_prompt){_prompt.innerHTML = "";boxInput[i].removeAttribute("style");}
											if(iname==d.msg[j][0]){
												boxInput[i].style.borderColor = "#ffbdbe";												
												_prompt.innerHTML = getP_H(d.msg[j][1]);
											}
										}
									}
								}else{									
									t.className="btn";t.innerHTML = "修改信息";
									d_p_t();
									// setTimeout(function(){
									// 	document.getElementById("description_i").value=_h.profile_data.description;
									// },1000);
								}
							}
						});
					});								
				}
			}else{
				this.className="save_btn";this.innerHTML = "保存信息";
				if(_box&&_h.profile_data){
					_h.lj(_h._domain+'Js/simulate_input',function(){
						_h.lj(_h._domain+'Js/revise_profile_tmp',function(){
							_box.innerHTML = _h.revise_profile_tmp.fd();
							_h.simulate_input.init();
							//console.log('_h.profile_data.description:'+_h.profile_data.description);
							function unescapeHtml(unsafe) {
							    return unsafe
							         .replace(/&amp;/g, "&")
							         .replace(/&lt;/g, "<")
							         .replace(/&gt;/g, ">")
							         .replace(/&quot;/g, '"')
							         .replace(/&#039;/g, "'");
							}
							
							document.getElementById("description_i").value=unescapeHtml(_h.profile_data.description);
						});						
					});
				}
			}
		}
	}
	/*生成个人信息dom*/
	function d_p_t(){
		var _box = document.getElementById("profile_baseInfo_box");
		if(_box&&_h.profile_data){			
			_h.lj(_h._domain+'Js/revise_profile_tmp',function(){
				_box.innerHTML = _h.revise_profile_tmp.sd();				
			});
		}
	}
	/*第三方账号绑定*/
	function bindings(dom){
		dom.onclick = function(){
			var type = this.parentNode.getElementsByTagName("b")[0].className.split("co_")[1];
			if(this.className=="f"){
				var id = this.getAttribute("data-bg-id"), url = '/un_bind?type='+type+'&id='+id;
				// console.log("解除绑定 url="+url);
			}else{
				var url = 'https://i.huanqiu.com/auth/auth/login/type/'+type;
				auth_login(url);
			}
		}
				
	}
	function auth_login(url) {
        var w = 600, h = 400;
        var l = (screen.width - w) / 2;
        var t = (screen.height - h) / 2;
        var s = 'width=' + w + ', height=' + h + ', top=' + t + ', left=' + l;
        s += ', toolbar=no, scrollbars=no, menubar=no, location=no, resizable=no';
        window.open(url, 'auth_window', s);
    }
	/*头像修改*/
	function userAvatarSeting(dom){
		dom.onclick = function(){
			var h_a_s = document.getElementById("header_avatar_seting") , _html = h_a_s.innerHTML;
			_h.lj(_h._domain+"Js/popWin",function(){
				_h.popWin._open({
					_size:{W:708,H:538},
					conhtml:_html,
					_title:"修改头像"
				});
			})
		}
	}
	/*标签切换*/
	function tagChange(dom){
		var contag = dom.getAttribute("data-bg-tag").split("_")[0],
		othertag = dom.getAttribute("data-bg-tag").split("_")[1].split(","),
		_tagname = dom.getAttribute("data-bg-tag").split("_")[2],
		current_con = document.getElementById(contag);
		dom.onclick = function(){
			for(var i=0;i<othertag.length;i++){
				var ot = document.getElementById(othertag[i]);
				ot.style.display = "none";
			}
			current_con.style.display = "block";
			var _tag = dom.parentNode.getElementsByTagName(_tagname);
			for(var i=0;i<_tag.length;i++){_tag[i].removeAttribute("class");}
			this.className = "current";
		}
	}
	// 用户手机绑定
	_h.mobile_bind_check = function(t){
		var  fromBox,_noticevalue="";
		
		var firstUl = _h.c('ul',t)[0];
			fromBox = firstUl,
			_protocol = _h.c(".protocol",t),
			_noticeinput = _protocol?_h.c("input",_protocol):null;
			if(_noticeinput){_noticevalue = '&'+_noticeinput[0].getAttribute("name")+'='+_noticeinput[0].value;}


		var inputitem = fromBox.getElementsByTagName("input"),_data="",_errors=false;
		for(var i=0;i<inputitem.length;i++){
			var _type = inputitem[i].getAttribute("type");
			if(_type!="submit"&&_type!="button"){
				if(inputitem[i].value==""){
					var _prompt = getPrompt(inputitem[i].parentNode);
					 _prompt[0].innerHTML = getP_H(_inputTit[inputitem[i].getAttribute("name")]+"不能为空");
					 _errors = true;
				}
				else{_data+=inputitem[i].getAttribute("name")+'='+inputitem[i].value+'&';}
			}			
		}
		_data += 'type=bind'+_noticevalue;
		if(_errors==true){
			return false;
		}else{
			_h.lj(_h._domain+"Js/ajax",function(){
				_h.isAjax({
					url:'/bind_mobile',
					data:_data,
					sfun:function(d){
						if(d.code==1){
							window.location.href = '/personal_profile';
						}else if(d.code==-1){
							alert(d.msg)
						}
					}
				});
			});
		}
		return false;
	}
	/*注册,找回密码，账号绑定的提交按钮 验证后提交*/
	_h.register_check = function(t){
		var currentTag = _h.c(".tags .current",t.parentNode) , _submittype="",fromBox,_noticevalue="";
		if(currentTag){
			if(currentTag.innerHTML.match("手机")){
				_submittype = "mobile";
			}else if(currentTag.innerHTML.match("邮箱")){
				_submittype = "email";
			}
			fromBox = document.getElementById(currentTag.getAttribute("data-bg-tag").split("_")[0]);
			var _protocol = _h.c(".protocol",t),
			_noticeinput = _protocol?_h.c("input",_protocol):null;
			if(_noticeinput){_noticevalue = '&'+_noticeinput[0].getAttribute("name")+'='+_noticeinput[0].value;}
		}else{
			var firstUl = _h.c('ul',t)[0];
			if(firstUl.getAttribute('data-only-moblie')=='1'){
				fromBox = firstUl;
				_submittype = "mobile";
				var _protocol = _h.c(".protocol",t),
				_noticeinput = _protocol?_h.c("input",_protocol):null;
				if(_noticeinput){_noticevalue = '&'+_noticeinput[0].getAttribute("name")+'='+_noticeinput[0].value;}

			}else{
				fromBox = t;
			}
		}
		var inputitem = fromBox.getElementsByTagName("input"),_data="",_errors=false;
		for(var i=0;i<inputitem.length;i++){
			var _type = inputitem[i].getAttribute("type");
			if(_type!="submit"&&_type!="button"){
				if(inputitem[i].value==""){
					var _prompt = getPrompt(inputitem[i].parentNode);
					 _prompt[0].innerHTML = getP_H(_inputTit[inputitem[i].getAttribute("name")]+"不能为空");
					 _errors = true;
				}
				else{_data+=inputitem[i].getAttribute("name")+'='+inputitem[i].value+'&';}
			}			
		}
		if(_errors){return false;}
		_data += 'type='+_submittype+_noticevalue;
		var ajaxModule=_h._domain+"Js/ajax";		
		_h.lj(ajaxModule,function(){
			_h.isAjax({
				url:t.action,
				data:_data,
				sfun:function(d){
					if(d.code==0){
						var errorBox = _h.c(".ajaxErrorInfoBox",t.parentNode);
						if(errorBox){errorBox.innerHTML = d.msg}
					}else if(d.code==1){						
						var finishType = t.getAttribute("data-bg-finishType");
						if(finishType=="jump"){
							alert(d.msg);
							if(d.url){document.location.href = d.url;}else{document.location.reload(true);}
						}else{
							if(d.jssrc){
								for(var i=0;i<d.jssrc.length;i++){_h.lj(d.jssrc[i]);}								
							}
							submit_openWin(d,inputitem,_submittype);
						}
					}else if(d.code==-1&&d.msgarray){
						for(var i=0;i<d.msgarray.length;i++){
							var _errorinput = getInput(inputitem,d.msgarray[i][0]);
							try{
								var promptdom = getPrompt(_errorinput.parentNode);
								promptdom[0].innerHTML = getP_H(d.msgarray[i][1]);
							}catch(e){}
						}
					}
				}
			});
		});	
		return false;
	}
	/*提交页面完成后弹出窗口*/
	function submit_openWin(d,i,st){
		var _type = st=="email"?"e":"m",_input=getInput(i,st) ,
		subTitle = d.subtitle?d.subtitle:false , btnItem="";
		if(!_input.value){_input=getInput(i,'reset'+st);}
		if(d.url){
			if(_type=="e"){
				btnItem='<a href="'+d.url+'">去邮箱激活</a>';
			}else{
				btnItem='<a href="'+d.url[0]+'">返回之前页面</a><a href="'+d.url[1]+'">进入个人中心</a>';
			}
		}
		_h.lj(_h._domain+"Js/popWin",function(){
			_h.popWin._open({
				_size:{W:558,H:256},
				conhtml:_h.getS({
					type:_type,
					title:d.msg,
					val:_input.value,
					subtitle:subTitle,
					btn:btnItem
				}),
				createcomplete:function(){if(_type=="m"){timechange(8000,1000);}},
				closeFun:function(){_input.focus();}
			});
		})
		function timechange(times,interval){
			var _times = times;
			function change(){
				if(_times<=0){
					_h.popWin._close();document.location.href=d.url[0];
				}else{
					var _btn = _h.c(".popwarp .content .btnBox a");
					_btn[1].innerHTML = "进入个人中心 ( "+(_times/1000)+"s )";
					_times -= interval;
					setTimeout(change,interval);
				}
			}change();			
		}
	}


	/*点击发送手机验证码*/
	function get_moblie_verify(dom){
		var prompt = getPrompt(dom.parentNode);
		dom.onclick = function(){
			if(dom.getAttribute("class")=="btn"){
				var zcver='';
				if(this.getAttribute("name")=="zcfsyzm"){
					var _verify_moblie = _h.c('.verifyLi .verify_moblie',this.parentNode.parentNode);
					var	_verify_moblie_prompt = getPrompt(_verify_moblie.parentNode);
					_verify_moblie_val = parseInt(_verify_moblie.value);
					if(isNaN(_verify_moblie_val)){_verify_moblie_val="";}else{_verify_moblie_val = _verify_moblie.value;}
					if(_verify_moblie_val.length!=4||_verify_moblie_prompt[0].innerHTML!='<b class="normal"></b>'){
						_verify_moblie_prompt[0].innerHTML = '<b class="error">验证码不正确</b>';
						return false;
					}else{
						zcver='&verify='+_verify_moblie_val;
					}
				}
				
				var val = this.parentNode.getElementsByTagName("input")[0].value,
				type = this.getAttribute("name")+'{data}'+val+zcver;
				this.parentNode.getElementsByTagName("input")[0].setAttribute("disabled","disabled");
				_h.vf.init(this,type,function(d){
					if(d.code==1){
						dom.className = "btn_disable";
						var original_text = dom.innerHTML;
						countdown(60,"s 再次发送",dom,1000,function(){
							dom.className="btn";
							dom.innerHTML = original_text;
							dom.parentNode.getElementsByTagName("input")[0].removeAttribute("disabled");
						});
					}else{
						 dom.className = "btn_disable";
						 dom.parentNode.getElementsByTagName("input")[0].removeAttribute("disabled");
						 prompt[0].innerHTML = getP_H(d.msg);
					}
				});
			}
		}
	}
	/*获取错误提示信息dom*/
	function getPrompt(dom){
		var _prompt = [];
		for(var i=0,_dom=dom.getElementsByTagName("span");i<_dom.length;i++){
			if(_dom[i].className=="prompt"){
				_prompt.push(_dom[i]);
			}
		}
		return _prompt.length>0?_prompt:null;
	}
	/*生成错误或正确信息dom内容*/
	function getP_H(text,type){
		var _class = type?' class="normal"':' class="error"';
		return '<b '+_class+'>'+text+'</b>'
	}
	/*dom倒计时提示*/
	function countdown(_time,_textTemp,_dom,_itv,callback){
		_t(_time,_textTemp,_dom,_itv);
		function _t(time,textTemp,dom,itv){
			dom.innerHTML = (time<10?('&nbsp;&nbsp;'+time):time)+textTemp;
			dom.innerHTML = (time<10?('&nbsp;&nbsp;'+time):time)+textTemp;
			var _nextTime = time-1;
			if(_nextTime>=0){
				setTimeout(function(){_t(_nextTime,textTemp,dom,itv);},itv);
			}else{
				try{callback();}catch(e){}
			}
		}		
	}

	/*input 移出焦点验证*/
	function inputVerify(dom){
		var domType = dom.getAttribute("type");
		if(domType=="password"){
			var see_ico = document.createElement("i");see_ico.setAttribute("class","see_password_f");
			dom.parentNode.appendChild(see_ico);
			see_ico.onclick = function(){
				var _domType = dom.getAttribute("type");
				if(_domType=="password"){
					dom.setAttribute("type","text");this.className = "see_password_t";
				}else{
					dom.setAttribute("type","password");this.className = "see_password_f";
				}				
			}
		}
		dom.onblur = function(){
			var type = this.getAttribute("name");
			var promptdom = getPrompt(dom.parentNode);
			if(type=="original"){
				dom.value==""?(promptdom[0].innerHTML = getP_H("当前密码不能为空")):(promptdom[0].innerHTML = "");
				return false;
			}
			if(type=="repassword"){
				var _inputPrssword = getInput(dom.parentNode.parentNode.parentNode.getElementsByTagName("input"),"password");
				if(dom.value!=_inputPrssword.value){
					promptdom[0].innerHTML = getP_H("两次输入的密码不一直");dom.value="";
				}else{promptdom[0].innerHTML = "";}
				return false;
			}
			_h.vf.init(this,type,function(d){
				// console.log(d.msg);
				if(d.code==0){
					if(type=="mobile"||type=="resetmobile"||type=="unmobile"){
						dom.parentNode.getElementsByTagName("a")[0].className="btn_disable";
					}
					promptdom[0].innerHTML = getP_H(d.msg);
				}else{
					if(type=="mobile"||type=="resetmobile"||type=="unmobile"){
						dom.parentNode.getElementsByTagName("a")[0].className="btn";
					}
					if(type=="password"){
						switch (d.msg){
							case 1:
								d.msg = "密码强度：弱";
							break;
							case 2:
								d.msg = "密码强度：中";
							break;
							case 3:
								d.msg = "密码强度：强";
							break;
						}
					}
					promptdom[0].innerHTML = getP_H(d.msg,true);
				}
				
			});
		}
	}
	/*验证绑定邮箱*/
	function bind_email(dom){
		var _input = dom.parentNode.getElementsByTagName("input")[0] ,
		promptdom = getPrompt(dom.parentNode),
		_inputVal = _input.value;
		_input.onblur = function(){if(this.value!=_inputVal){promptdom[0].innerHTML="";}}
		dom.onclick = function(){
			if(_input.value==""){
				promptdom[0].innerHTML = getP_H("邮箱不能为空");return false;
			}else if(_input.value==_inputVal){
				return false;
			}else{
				_inputVal = _input.value;
				submitEmail();
			}	
		}
		function submitEmail(){
			_h.lj(_h._domain+'Js/ajax',function(){
				_h.isAjax({
					url:"index.php?g=auth&m=members&a=bind_email",
					data:'email='+_input.value,
					sfun:function(d){
						if(d.code==0){
							promptdom[0].innerHTML = getP_H(d.msg);
						}else{
							promptdom[0].innerHTML = "";
							_h.lj(_h._domain+"Js/popWin",function(){
								_h.popWin._open({
									_size:{W:558,H:256},
									conhtml:_h.getS({
										type:"e",
										title:d.msg,
										val:_input.value,
										btn:'<a href="'+d.url+'">去邮箱激活</a>'
									}),									
									closeFun:function(){promptdom[0].innerHTML = getP_H(d.msg,true);}
								});								
							});
						}
					}
				});
			});
		}
	}
	/*创建修改手机号DOM*/
	function c_a_m_d(){
		_h.lj(_h._domain+'Js/alter_moblie_tmp',function(){
			for(var i=0;i<AlterMoblieArr.length;i++){
				cfun(AlterMoblieArr[i]);
			}
		});
		function cfun(dom){
			var moblieNum = dom.getAttribute("data-bg-create").split("_")[1],
			clearmobile = dom.getAttribute("data-bg-clearmobile"),
			titlevisual = _h.c(".visual",dom.parentNode);
			if(moblieNum==""){
				dom.innerHTML = _h.alter_moblie_tmp.sd_n();
				titlevisual.innerHTML="";
			}else{
				var _cm = clearmobile=="0"?false:true;
				dom.innerHTML = _h.alter_moblie_tmp.fd(moblieNum,_cm);
				titlevisual.innerHTML="手机绑定成功";
			}
			bind_respond(dom);
		}
	}
	/*修改手机号*/
	function alter_moblie(dom){
		dom.onclick = function(){
			var type = this.getAttribute("data-bg-click").split("/")[1];
			if(type=="remove"){
				var domWarp = this.parentNode.parentNode.parentNode.parentNode,
				titlevisual = _h.c(".visual",domWarp.parentNode),
				moblieNum = domWarp.getAttribute("data-bg-create").split("_")[1];
				domWarp.innerHTML = _h.alter_moblie_tmp.sd_o(moblieNum);
				titlevisual.innerHTML = "验证已绑定的手机";
				bind_respond(domWarp);
			}else if(type=="unbind"||type=="bind"||type=="cancel"){
				var domWarp = this.parentNode.parentNode,titlevisual = _h.c(".visual",domWarp.parentNode),
				moblieNum = domWarp.getAttribute("data-bg-create").split("_")[1];
				if(type=="cancel"){
					domWarp.innerHTML = _h.alter_moblie_tmp.fd(moblieNum,true);
					titlevisual.innerHTML = "手机绑定成功";bind_respond(domWarp);
				}else{bind_un(domWarp,type);}				
			}
		}
		var oldNumb = "",oldYZM="";
		function bind_un(dom,type){
			var titlevisual = _h.c(".visual",dom.parentNode),_visual,_html="",_input=dom.getElementsByTagName("input"),
			moblieNum = getInput(_input,"mobile").value,_errors=false;
			if(type=="bind"){				
				_visual = "手机绑定成功";_html = _h.alter_moblie_tmp.fd(getMoblieNum(moblieNum),true);
			}else{
				_visual = "请绑定新的手机号";_html = _h.alter_moblie_tmp.sd_n();
			}
			for(var i=0;i<_input.length;i++){
				if(_input[i].value==""){
					var _prompt = getPrompt(_input[i].parentNode);_errors = true;
					 _prompt[0].innerHTML = getP_H("请输入"+_inputTit[_input[i].getAttribute("name")]);					 
				}
			}
			if(_errors){return false;}
			_data = getInput(_input);
			var _ajaxURL = '/bind_mobile';
			if(oldNumb==""&&oldYZM==""&&type=="bind"){
				_data += '&type='+type;
			}else if(type=="bind"){
				_data += '&mobile_old='+oldNumb+'&type=change';
			}else if(type=="unbind"){
				_data += '&mobile_old='+getInput(_input,"unmobile").value+'&type=change';
			}
			_h.lj(_h._domain+"Js/ajax",function(){
				_h.isAjax({
					url:_ajaxURL,
					data:_data,
					sfun:function(d){
						if(d.code==1){
							if(type=="unbind"){
								oldNumb = getInput(_input,"unmobile").value;
								oldYZM = getInput(_input,"fsyzm").value;
							}
							dom.innerHTML = _html;titlevisual.innerHTML = _visual;bind_respond(dom);
						}else if(d.code==-1){
							titlevisual.innerHTML = getP_H(d.msg);
						}
					}
				});
			});
		}
		function getMoblieNum(num){return num.substr(0,3)+'****'+num.substr(7);}
	}
	/*重置密码按钮ajax提交*/
	function reset_password(dom){
		var titlevisual = _h.c(".visual",dom.parentNode.parentNode);
		dom.onclick=function(){
			var _inputData = getInput(dom.parentNode.parentNode.getElementsByTagName("input"),"inputitemData");
			if(_inputData.original.value==""){
				_inputData.original_p.innerHTML=getP_H("当前密码不能为空");
				_inputData.original.focus();
			}else if(_inputData.password.value==""){
				_inputData.password_p.innerHTML=getP_H("密码不能为空，请输入密码");
				_inputData.password.focus();
			}else if(_inputData.repassword.value!=_inputData.password.value){
				_inputData.repassword_p.innerHTML=getP_H("两次输入的密码不一直");
				_inputData.repassword.focus();
			}else{
				_h.lj(_h._domain+"Js/ajax",function(){
					_h.isAjax({
						url:"/edit_pwd",
						data:getInput(dom.parentNode.parentNode.getElementsByTagName("input")),
						sfun:function(d){
							if(d.code==0){
								_inputData.original_p.innerHTML=getP_H(d.msg);
							}else if(d.code==-1){
								titlevisual.innerHTML = getP_H(d.msg);
							}else{
								var _number = 5;
								timeGotoPage(d.url,5000,1000,function(){
									titlevisual.innerHTML = '密码修改成功,<a href="'+d.url+'">重新登录</a> '+_number+'s';
									_number -= 1;
								});
								
							}
						}
					});
				});	
			}
		}
	}

	function oClosePay()
	{
		document.getElementById("close-pay").onclick=function(){
			//document.getElementById("popwarpShow").style.display="none";
			_h.popWin._close();
			if(oUnSubscribeAttr!=null ||oUnSubscribeAttr !=undefined)
			{
				bind_un_subscribe(oDi,oUnSubscribeAttr);
			}
			
		};
	}

	/*取消订阅事件*/
	function bind_un_subscribe(dom,level){
		dom.onclick = function(){
			if(level<4)
			{
				var _cf = confirm("确认进行退订操作？");
				if(_cf){
					// console.log(level);
					_h.lj(_h._domain+"Js/ajax",function(){
						_h.isAjax({
							url:"/quit_vip",
							data:"",
							sfun:function(d){
								if(d.status==22000){
									alert('退订成功');
									//_w.location.href = _w.location.href;
									window.location.reload();
								}else{
									alert(d.msg);
								}
							}
						});
					});	
				}
			}
			else
			{
				var popObj={_size:{W:439,H:199},conhtml:t_pay_hf_pop_html(),cancelback:function(){}};
				_h.lj(_h._domain+"Js/ajax",function(){
					if(countdown<=0)
                    {
						_h.isAjax({
							url:"/quit_vip",
							data:"",
							sfun:function(d){
								if(d.status==22000){
									
								}else{
									alert(d.msg);
								}
							}
						});
						countdown =60;                 	
                    }
                    _h.lj(_h._domain+"Js/popWin",function(){

                        _h.popWin._open(popObj);
                        oMarkTime(this);
                        oClosePay();
                    });
                    

				});
			}
		}
	}

	function t_pay_hf_pop_html(){
		var _html='<a href="javascript:void(0)" id="close-pay">x</a>\
			<div class="huafei_pay_box">\
			<div>\
				<span class="istitle">请填写验证码进行退订</span>\
				<div class="t_pay_code">\
					<input type="text" value="" id="t_pay_num" class="hfw-num" placeholder="请输入验证码" />\
					<em id="t_pay_code">获取验证码</em>\
				</div>\
				<span class="pay_URL"><a id="t_pay" href="javascript:void(0)" target="_blank">去退订</a></span>\
			</div>\
			<div style="display:none;">\
				<b class="pay_text_info_line1" style="color:red;">退订完成前请不要关闭此窗口</b>\
				<b class="pay_text_info" style="padding-top:0;font-weight:normal;">完成退订后,点击下方按钮刷新页面,查看会员信息</b>\
				<span class="confirmBtn" onclick="(function(){location.href=location.href})()">刷新页面</span>\
			</div>\
		</div>';
		return _html;
	}

	var countdown=0; 
	function oMarkTime(val)
	{
		var oMarkTObj=document.getElementById("t_pay_code");
		if (countdown == 0) {  
	        oMarkTObj.setAttribute("class","");
	        oMarkTObj.innerHTML="获取验证码";  
	        countdown = 60; 
	        oResetGetCode();  
	    } else {  
	    	if(oMarkTObj!=null || oMarkTObj!=undefined)
	    	{
		        oMarkTObj.setAttribute("class","hasTC"); 
		        oMarkTObj.innerHTML="重新发送(" + countdown + ")";  
		        countdown--;  
		        setTimeout(function() {  
			        oMarkTime(val);  
			    },1000); 
			    oSubCode();	    		
	    	}
	    }  
	}

	function oResetGetCode()
	{
		document.getElementById("t_pay_code").onclick=function(){
			_h.isAjax({
				url:"/quit_vip",
				sfun:function(d){
					if(d.status==22000){
                        oMarkTime(this);
                    }else{
						alert(d.msg);
					}
				}
			});
		};
	}

	function oSubCode()
	{
		document.getElementById("t_pay").onclick=function(){
            var code = document.getElementById("t_pay_num").value;
            if (!code){
            	alert('请填写手机验证码');
			}else{
                _h.isAjax({
                    url:"/quit_vip",
                    data:"smsCode="+code,
                    sfun:function(d){
                        if(d.status==22000){
                            alert('退订成功');
                            _w.location.href = _w.location.href;
                        }else{
                            alert(d.msg);
                        }
                    }
                });
            }
		};
	}

	function t_pay_code()
	{
		document.getElementById("t_pay-num").onclick=function(){
			var _tphoneNumw = parseInt(document.getElementById('t_pay_num').value);
			if(isNaN(_tphoneNumw))
			{
				alert('请输入验证码!');
			}
			else
			{
				_h.lj(_h._domain+"Js/ajax",function(){
					_h.isAjax({
						url:"/quit_vip",
						data:"",
						sfun:function(d){
							if(d.code==22000){
								alert('退订成功');
								_w.location.href = _w.location.href;
								var cfb = t.parentNode.parentNode.parentNode.getElementsByTagName('div');
								cfb[0].style.display = 'none';							
								cfb[1].style.display = 'block';	
							}else{
								alert(d.msg);
							}
						}
					});
				});	
			}
		};
	}

	/*n 秒后跳转*/
	function timeGotoPage(url,times,interval,ifun){var _times = times , _ifun = ifun?ifun:(function(){});function gtp(){if(_times==0){document.location.href=url;}else{_times = _times-interval;_ifun();setTimeout(function(){gtp()},interval)}}gtp();}


	/*根据name获取input 没有name返回 name=value 的data字符串*/
	function getInput(input,name){
		var data="",inputData={};
		for(var i=0;i<input.length;i++){
			var iname = input[i].getAttribute("name");
			if(iname=="password"||iname=="repassword"||iname=="original"){
				data += iname+'='+encodeURIComponent(input[i].value)+'&';
			}else{
				data += iname+'='+input[i].value+'&';
			}
						
			if(name=="inputitemData"){
				inputData[iname] = input[i];
				inputData[iname+'_p'] = getPrompt(input[i].parentNode)[0];
			}else{
				if(iname==name){return input[i];break;}
			}
		}

		return name=="inputitemData"?inputData:(data.substr(0,data.length-1));
	}

	function changeDate(d){
		var dArr = d.split(" ");
		return dArr[0]+'-'+dArr[2]+'-'+dArr[4];
	}
	_h.bind_respond = bind_respond();
	d_p_t();
	c_a_m_d();
})(window);