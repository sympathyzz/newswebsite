/************
新版通行证js入口文件
2014.10.30
***************/
(function(_w) {
	// var _mainurl = "http://i.huanqiu.com/Public/Assets/";
	var _mainurl = "https://himg2.huanqiu.cn/i/";
	var c = function(e, t){var n,_n=[];t&&(n = t);if(typeof e=="string"){var r=e.split(" ");for(var i=0;i<r.length;i++)if(r[i].indexOf(".")==0){n?n=n.getElementsByTagName("*"):n=document.getElementsByTagName("*");var s=r[i].split(".")[1],__n=[],___n=n;for(var o=0;o<___n.length;o++)s==___n[o].className&&(__n.push(___n[o]));n=__n[0],_n=__n;}else if(r[i].indexOf("#")==0){n?n=n.getElementById(r[i].split("#")[1]):n=document.getElementById(r[i].split("#")[1]);_n=n;}else{n?n=n.getElementsByTagName(r[i]):n=document.getElementsByTagName(r[i]);_n=n;}return _n.length>1?_n:n;}return e;}
	var el = function(Doms){var domArray = new Array();var oFrag=document.createDocumentFragment();if(typeof Doms != "string"){domArray.push(Doms);}else{var dd = document.createElement("div");dd.innerHTML = Doms;for(var ds=0;ds<dd.childNodes.length;ds++){domArray.push(dd.childNodes[ds]);}}for(var d=0;d<domArray.length;d++){oFrag.appendChild(domArray[d]);}return oFrag;}
	document.onreadystatechange = function(){			
		if(document.readyState == "complete"){
			var otherLogin = c(".otherLogin");
			if(otherLogin){
				for(var i=0,bl=c("li",otherLogin);i<bl.length;i++){
					otherLoginClick(bl[i].getElementsByTagName("a")[0]);
				}
			}
			var verifyImg = c(".verifyImg"),verifyRefresh = c(".refresh",verifyImg);
			if(verifyImg&&verifyRefresh){
				var isImg = c("img",verifyImg)[0]
				var imgbaseurl = isImg.src
				verifyRefresh.onclick = function(){
					var times = (new Date()).valueOf()
					if(imgbaseurl.indexOf("?")>0){
						isImg.src = imgbaseurl+"&nowtime="+times
					}else{
						isImg.src = imgbaseurl+"?nowtime="+times
					}
				}
			}
			var inputUserEmail = c(".usermail")?c(".usermail"):document.getElementById("usermail");

			if(inputUserEmail){
				inputUserEmail.style.imeMode='disabled';
				var emailPrompt = c(".emailPrompt",inputUserEmail.parentNode);
				var fromDom = inputUserEmail.parentNode.parentNode.parentNode;
				inputUserEmail.onblur = function(){
					var tag = this,datainfo = tag.getAttribute("data-info"),type="email";
					if(datainfo=="bind"){
						type = "bind_email"
					}
					if(emailPrompt){
						setTimeout(function(){
							fromDom.onsubmit = function(){return true;}
							hiddenList();
							emverify();
						},200);
					}else{
						emverify();
					}
					
					function emverify(){
						verify.init(tag,type,function(d){
							var prompt = c(".prompt",tag.parentNode),infoClass="";
							if(d.code==0){
								infoClass = 'class="error"';
							}else{
								infoClass = 'class="correct"';
							}
							prompt.innerHTML = '<b '+infoClass+'>'+d.msg+'</b>';
						});
					}
					
				}
				
				if(emailPrompt){
					var cn = 0;
					inputUserEmail.onkeyup = function(e){
						var _t = this , _e = e||window.event , keycodes = _e.keyCode;
						fromDom.onsubmit = function(){return false;}
						if(keycodes==38){
							cn-=1;
						}else if(keycodes==40){
							cn+=1;
						}else if(keycodes==13){
							var domI = c("i",emailPrompt)[cn];
							inputUserEmail.value = domI.innerHTML;
							hiddenList();
						}else{
							cn = 0;
							changesCon();
						}
						if(emailPrompt.style.display=="block"){
							addIClass(cn);
						}

					}
					function addIClass(n){
						var domI = c("i",emailPrompt);
						var __n = n;
						if(n>=domI.length){__n=domI.length-1}else if(n<0){__n=0}
						for(var i=0;i<domI.length;i++){
							if(i==__n){
								domI[i].className = "on";
							}else{
								domI[i].removeAttribute("class");
							}
						}
						cn=__n;
					}
					function changesCon(){
						var _t = inputUserEmail;
						var isValue = _t.value;						
						if(isValue!=""){
							addEmailList(isValue);
						}else{
							hiddenList();
						}
					}
					function addEmailList(textvalue){
						var text = textvalue.split("@"),
						_t = text[0],_suffix = text[1],
						suffixString = '||qq.com||163.com||126.com||sina.com||vip.sina.com||hotmail.com||gmail.com',
						searchsuffix = suffixString.indexOf(_suffix),
						isHtml="";
						if(_suffix){
							if(searchsuffix>1){
								var isArray = suffixString.split("||");
								for(var i=1;i<isArray.length;i++){
									if(isArray[i].indexOf(_suffix)!=-1){
										isHtml += '<i>'+_t+'@'+isArray[i]+'</i>';
									}
								}
							}
						}else{
							isHtml = '<i>'+_t+'@qq.com</i><i>'+_t+'@163.com</i><i>'+_t+'@sina.com</i><i>'+_t+'@hotmail.com</i><i>'+_t+'@gmail.com</i><i>'+_t+'@vip.sina.com</i>';
						}
						if(isHtml==""){
							hiddenList();
						}else{
							emailPrompt.innerHTML = isHtml;
							var domI = c("i",emailPrompt);
							for(var i=0;i<domI.length;i++){
								addIClick(domI[i]);
							}
							showList();
						}
						
					}
					function addIClick(dom){
						dom.onclick = function(){
							inputUserEmail.value = this.innerHTML;
							hiddenList();
						}
					}
					function hiddenList(){
						inputUserEmail.style.borderColor = '#ccc';
						emailPrompt.style.display = "none";
					}
					function showList(){
						inputUserEmail.style.borderColor = '#007ed7';
						emailPrompt.style.display = "block";
					}
				}
				
			}
			var inputPassword = c(".password")?c(".password"):document.getElementById("password");
			if(inputPassword){
				inputPassword.onblur = function(){
					var tag = this;
					verify.init(this,"password",function(d){
						var prompt = c(".prompt",tag.parentNode);
						if(d.code==0){
							prompt.innerHTML = '<b class="error">'+d.msg+'</b>';
						}else{
							var ph = '';
							if(d.msg==1){
								ph = '<b class="passwordWeak">密码强度：弱</b>';
							}else if(d.msg==2){
								ph = '<b class="passwordMedium">密码强度：中</b>';
							}else if(d.msg==3){
								ph = '<b class="passwordStrong">密码强度：强</b>';
							}
							prompt.innerHTML = ph;
						}	
					});
				}
			}
			var newPassword = c(".newPassword"),confirmPassword=c(".confirmPassword");
			if(newPassword&&confirmPassword){
				var registerError = c(".registerError",newPassword.parentNode.parentNode.parentNode.parentNode.parentNode);
				newPassword.onblur = function(){
					var tag = this;
					verify.init(this,"password",function(d){
						var prompt = c(".prompt",tag.parentNode.parentNode);
						if(d.code==0){
							prompt.innerHTML = '<b class="error">'+d.msg+'</b>';
						}else{
							var ph = '';
							if(d.msg==1){
								ph = '<b class="passwordWeak">密码强度：弱</b>';
							}else if(d.msg==2){
								ph = '<b class="passwordMedium">密码强度：中</b>';
							}else if(d.msg==3){
								ph = '<b class="passwordStrong">密码强度：强</b>';
							}
							prompt.innerHTML = ph;
						}
						var errorString = '密码太短了，至少要6位哦||密码太长了，最多16位哦||密码不能为空，请输入密码',
						eiof = errorString.indexOf(registerError.innerHTML);
						if(registerError&&eiof!=-1){registerError.innerHTML="";}
					});
				}
				confirmPassword.onblur = function(){
					var np = newPassword.value,cp = this.value,
					prompt = c(".prompt",this.parentNode.parentNode);;
					if(np!=cp){
						prompt.innerHTML = '<b class="error">两次输入的密码不一直</b>';
						this.value = "";
						//this.focus();
					}else{
						prompt.innerHTML = '<b class="correct"></b>';
					}
					if(registerError&&registerError.innerHTML=="确认密码不能为空"){registerError.innerHTML="";}
				}
			}
			var inputVerify = c(".verify");
			if(inputVerify){
				inputVerify.onblur = function(){
					var tag = this;
					verify.init(this,"verify",function(d){
						var prompt = c(".prompt",tag.parentNode),infoClass="";
						if(d.code==0){
							infoClass = 'class="error"';
						}else{
							infoClass = 'class="correct"';
						}
						prompt.innerHTML = '<b '+infoClass+'>'+d.msg+'</b>';	
					});
				}
			}
			var protocol = c(".protocol");
			if(protocol){
				var checkbox = c("input",protocol),
				parentWarp = protocol.parentNode,
				btnWarp = c(".btn",parentWarp),
				btnValue = btnWarp.getElementsByTagName("input")[0].value;
				btn_link = btnWarp.getElementsByTagName("a");
				function subimtBtnVerify(){
					var checkeds = checkbox[0].checked , _html = "";
					if(checkeds){		
						_html = '<input type="submit" value="'+btnValue+'" class="submitBtn">';
					}else{	
						_html = '<a href="javascript:;" class="noSubmitBtn">'+btnValue+'</a>';
					}
					btnWarp.innerHTML = _html;
				}
				if(checkbox.length==1&&btnWarp){
					subimtBtnVerify();
					checkbox[0].onclick = subimtBtnVerify;
				}
			}
			var userSetting = c(".centerHeader")
			if(userSetting){
				var userWarp = c(".loginBar",userSetting),
				avatar = c(".avatar",userWarp);
				userWarp.onmouseover = function(){
					this.style.height = "158px";
					avatar.style.backgroundColor = "#eee";					
				}
				userWarp.onmouseout = function(){
					this.style.height = "70px";
					avatar.style.backgroundColor = "#fff";
				}
			}
			var userHeader = c(".userHeader");
			if(userHeader){
				var signature = c(".signature",userHeader);
				if(signature){
					var isi = c("i",signature)[0];
					var sH = isi.offsetHeight;
					if(sH>32){
						isi.style.cssText = 'border-radius:'+(sH/2)+'px;';
					}
				}
			}
			var centerInside = c(".center_inside_infowarp");
			if(centerInside){
				var centerInsideBaseInfo = c(".baseInfo",centerInside);
				if(centerInsideBaseInfo){
					_loadScript(_mainurl+"Js/citydata",function(){
						addSelect();
					});
				}
			}
			var dateAndWeather = c(".dateAndWeather");
			if(dateAndWeather){
				var dateWarp = c(".date",dateAndWeather),
				weekArray = new Array('日','一','二','三','四','五','六');
				if(dateWarp){
					_loadScript(_mainurl+"Js/calendar",function(){
						var todayDate = new Date(),
						toyear = todayDate.getFullYear(),
						tomonth = todayDate.getMonth()+1,
						today = todayDate.getDate(),
						toWeek = "星期"+weekArray[todayDate.getDay()],
						lunar = GetLunarDay(toyear,tomonth,today),
						dateHtml = '<b>'+today+'</b>\
									<span class="dateList_1">'+toyear+'.'+tomonth+'&nbsp;&nbsp;&nbsp;&nbsp;'+toWeek+'</span>\
									<span class="dateList_2">'+lunar.lyear+'( '+lunar.sx+' )年&nbsp;&nbsp;&nbsp;&nbsp;'+lunar.day+'</span>';
						dateWarp.innerHTML = dateHtml;
					})
				}
				var weatherWarp = c(".weather",dateAndWeather);
				if(weatherWarp){
					var weatherHtml = '<i class="dot"></i><iframe allowtransparency="true" frameborder="0" width="198" height="96" scrolling="no" src="http://tianqi.2345.com/plugin/widget/index.htm?s=2&z=1&t=0&v=0&d=1&bd=0&k=&f=808080&q=1&e=1&a=1&c=54511&w=195&h=96&align=right"></iframe>';
					weatherWarp.innerHTML = weatherHtml;
				}
			}
			var nickname = c(".nickname");
			if(nickname){
				nickname.onblur = function(){
					var tag = this,
					registerError = c(".registerError",nickname.parentNode.parentNode.parentNode.parentNode.parentNode),
					prompt = c(".prompt",nickname.parentNode.parentNode);
					verify.init(this,"username",function(d){
						if(d.code==0){
							registerError.style.display = "none";
							prompt.innerHTML = '<b class="error">'+d.msg+'</b>';
						}else{
							prompt.innerHTML = '<b class="correct"></b>';
						}
					});
				}
			}
			
			if(document.getElementById("wo-pay-pannel") && !document.getElementById("mg-pay-pannel"))
			{
				var oDomPay=[
					'<div class="boxList" id="joinvip">\
						<div class="vip_pay">\
							<input type="hidden">\
						</div>\
					</div>',
					'<div class="boxList" id="joinvip">\
	                    <div class="boxTit"><b>环球体育沃音乐联合会员包月</b></div>\
	                    <div class="vip_pay">\
	                        <div class="times"><span class="title">选择环球体育沃音乐联合会员包月时长：</span>\
	                            <ul>\
	                                <li><span class="pay_time_current"><i data-val="1">环球体育沃音乐<br>联合会员</i><b>￥15/月</b><b class="icons"></b></span></li>\
	                            </ul>\
	                        </div>\
	                        <div class="payment_method">\
	                            <span class="title">选择支付方式：</span>\
	                            <ul>\
	                                <li><span class="pay_spw pay_sp_hf_current"><i></i>话费<b></b></span></li>\
	                            </ul>\
	                        </div>\
	                        <div class="payment_amount_btn">\
	                            <span class="ampunt">应付金额：<i>15</i>元</span>\
	                            <span class="pay_btn"><a href="javascript:;">立即支付</a></span>\
	                        </div>\
	                        <input type="hidden">\
	                    </div>\
	                </div>'
				];
			}
			else if(document.getElementById("mg-pay-pannel") && !document.getElementById("wo-pay-pannel"))
			{
				var oDomPay=[
					'<div class="boxList" id="joinvip">\
	                    <div class="boxTit"><b>咪咕会员包月</b></div>\
	                    <div class="vip_pay">\
	                        <div class="times"><span class="title">选择咪咕会员包月时长：</span>\
	                            <ul>\
	                                <li><span class="pay_time_current"><i data-val="1">咪咕环球体育<br>初级会员</i><b>￥10/月</b><b class="icons"></b></span></li>\
	                                <li><span class="pay_time"><i data-val="2">咪咕环球体育<br>中级会员</i><b>￥15/月</b><b class="icons"></b></span></li>\
	                                <li class="list_end"><span class="pay_time"><i data-val="3">咪咕环球体育<br>高级会员</i><b>￥20/月</b><b class="icons"></b></span></li>\
	                            </ul>\
	                        </div>\
	                        <div class="payment_method">\
	                            <span class="title">选择支付方式：</span>\
	                            <ul>\
	                                <li><span class="pay_sp_wx_current"><i></i>微信<b></b></span></li>\
	                                <li><span class="pay_sp_ali"><i></i>支付宝<b></b></span></li><!--<li><span class="pay_sp_yd"><i></i>话付宝<b></b></span></li>-->\
	                                <li><span class="pay_sp_hf"><i></i>话费<b></b></span></li>\
	                            </ul>\
	                        </div>\
	                        <div class="payment_amount_btn">\
	                            <span class="ampunt">应付金额：<i>10</i>元</span>\
	                            <span class="pay_btn"><a href="javascript:;">立即支付</a></span>\
	                        </div>\
	                        <input type="hidden">\
	                    </div>\
	                </div>',
					'<div class="boxList" id="joinvip">\
						<div class="vip_pay">\
							<input type="hidden">\
						</div>\
	                </div>'
				];
			}
			else if(document.getElementById("mg-pay-pannel") && document.getElementById("wo-pay-pannel"))
			{
                var oDomPay=[
                    '<div class="boxList" id="joinvip">\
                        <div class="boxTit"><b>咪咕会员包月</b></div>\
                        <div class="vip_pay">\
                            <div class="times"><span class="title">选择咪咕会员包月时长：</span>\
                                <ul>\
                                    <li><span class="pay_time_current"><i data-val="1">咪咕环球体育<br>初级会员</i><b>￥10/月</b><b class="icons"></b></span></li>\
                                    <li><span class="pay_time"><i data-val="2">咪咕环球体育<br>中级会员</i><b>￥15/月</b><b class="icons"></b></span></li>\
                                    <li class="list_end"><span class="pay_time"><i data-val="3">咪咕环球体育<br>高级会员</i><b>￥20/月</b><b class="icons"></b></span></li>\
                                </ul>\
                            </div>\
                            <div class="payment_method">\
                                <span class="title">选择支付方式：</span>\
                                <ul>\
                                    <li><span class="pay_sp_wx_current"><i></i>微信<b></b></span></li>\
                                    <li><span class="pay_sp_ali"><i></i>支付宝<b></b></span></li><!--<li><span class="pay_sp_yd"><i></i>话付宝<b></b></span></li>-->\
                                    <li><span class="pay_sp_hf"><i></i>话费<b></b></span></li>\
                                </ul>\
                            </div>\
                            <div class="payment_amount_btn">\
                                <span class="ampunt">应付金额：<i>10</i>元</span>\
                                <span class="pay_btn"><a href="javascript:;">立即支付</a></span>\
                            </div>\
                            <input type="hidden">\
                        </div>\
                    </div>',
                    '<div class="boxList" id="joinvip">\
                        <div class="boxTit"><b>环球体育沃音乐联合会员包月</b></div>\
                        <div class="vip_pay">\
                            <div class="times"><span class="title">选择环球体育沃音乐联合会员包月时长：</span>\
                                <ul>\
                                    <li><span class="pay_time_current"><i data-val="1">环球体育沃音乐<br>联合会员</i><b>￥15/月</b><b class="icons"></b></span></li>\
                                </ul>\
                            </div>\
                            <div class="payment_method">\
                                <span class="title">选择支付方式：</span>\
                                <ul>\
                                    <li><span class="pay_spw pay_sp_hf_current"><i></i>话费<b></b></span></li>\
                                </ul>\
                            </div>\
                            <div class="payment_amount_btn">\
                                <span class="ampunt">应付金额：<i>15</i>元</span>\
                                <span class="pay_btn"><a href="javascript:;">立即支付</a></span>\
                            </div>\
                            <input type="hidden">\
                        </div>\
                    </div>'
                ];
			}
			else
			{
                var oDomPay=[
                    '<div class="boxList" id="joinvip">\
                        <div class="vip_pay">\
                            <input type="hidden">\
                        </div>\
                    </div>',
                    '<div class="boxList" id="joinvip">\
                        <div class="vip_pay">\
                            <input type="hidden">\
                        </div>\
                    </div>'
                ];
			}

			var oMIndex=0;

			function tab(btn, boxlist, mBoxlist) {
		        for (var i = 0; i < btn.length; i++) {
		            btn[i].index = i;
		            btn[i].onclick = function () {  
		                for (var j = 0; j < btn.length; j++) {
		 
							btn[j].style.cssText="background:#419BD9; border:1px solid #419BD9; color:#fff;";
		                	boxlist[j].style.display="none";
		                                        
		                }

	                	btn[this.index].style.cssText="background:#fff; border-top:#1px solid #3F97D3; border-bottom:none; color:#4098D5;";
	                    boxlist[this.index].style.display="block";

	                   	mBoxlist.innerHTML='';
	                    mBoxlist.innerHTML=oDomPay[this.index];
	                    oJoinvip(this.index,0);
	                    oMIndex=this.index; 
		            }
		        }
		    }

            if(document.getElementById("member-sm")) {
                var _membersmDiv = document.getElementById("member-sm").getElementsByTagName("li");
                var _membersmdDiv = document.getElementById("member-smd").getElementsByTagName("dd");
                var _membersmp = document.getElementById("member-smp");
                tab(_membersmDiv, _membersmdDiv,_membersmp);
            }

            var oDataType;
			function oJoinvip(oType,oDataType){
				var _joinvip = document.getElementById("joinvip");
				if(_joinvip){
					if(oType==0)
					{
						var _ajaxdata={pay_type:'wx',month_count:1,vip_type:1,order_sn:0,code_img_url:null};
					}
					else if(oType==1)
					{
						var _ajaxdata={pay_type:'hf',month_count:1,vip_type:1,order_sn:0,code_img_url:null};
					}
					
					if(oDataType==1)
					{
						_ajaxdata.pay_type='hf';
					}

						var _vip_pay = c(".vip_pay",_joinvip),
						val_input = _vip_pay.getElementsByTagName('input')[0],
						pay_time = c(".times ul",_vip_pay)[0].getElementsByTagName("span"),
						pay_type = c(".payment_method ul")[0].getElementsByTagName("span"),
						payment_amount = c(".payment_amount_btn .ampunt i",_vip_pay)[0],
						payment_btn = c(".payment_amount_btn .pay_btn a",_vip_pay)[0];
					for(var i=0,len=pay_time.length;i<len;i++){
						pay_time_click(pay_time[i]);
					}
					function pay_time_click(dom){
						dom.onclick = function(){
							for(var j=0,len=pay_time.length;j<len;j++){
								var _classname = pay_time[j].className.split('_current')[0];
								pay_time[j].className = _classname;
							}
							this.className = this.className.split('_current')[0]+'_current';
							var isb = this.getElementsByTagName("b")[0].innerHTML;
							// _ajaxdata.month_count = get_pay_time_val(this.getElementsByTagName("i")[0].innerHTML);
							_ajaxdata.vip_type = parseInt(this.getElementsByTagName("i")[0].getAttribute('data-val'));
							payment_amount.innerHTML = parseInt(isb.substr(1,isb.length));
						}
					}
					for(var n=0,len=pay_type.length;n<len;n++){
						pay_type_click(pay_type[n]);
					}
					function pay_type_click(dom){
						dom.onclick = function(){
							for(var j=0,len=pay_type.length;j<len;j++){
								var _classname = pay_type[j].className.split('_current')[0];
								pay_type[j].className = _classname;
							}
							this.className = this.className.split('_current')[0]+'_current';
							_ajaxdata.pay_type = this.className.split("sp_")[1].split("_curr")[0];
							_ajaxdata.pay_type=='yd'&&(_ajaxdata.pay_type = 'hfb');
						}
					}
					var payment_btn_status = 0;
					payment_btn.onclick = function(){
						var ali_url = '';
						if(payment_btn_status==0){payment_btn_status=1;}else{return false;}
						if(_ajaxdata.pay_type=="hfb"){
							openPopPayHfb();
						}else if(_ajaxdata.pay_type=="hf"){
							openPopPayHf(oType);
						}else{
							if(_ajaxdata.pay_type == 'ali'){
								var aliHandler = window.open("","_blank")
							}
							_loadScript(_mainurl+"Js/ajax",function(){
								_h.isAjax({
									url:'/center_pay',
									data:"pay_type="+_ajaxdata.pay_type+"&month_count="+_ajaxdata.month_count+"&vip_type="+_ajaxdata.vip_type,
									sfun:function(d){
										if(d.status==22000){
											_ajaxdata.order_sn = d.result.order_sn;
											_ajaxdata.code_img_url = d.result.code_img_url;
											ali_url = d.result.code_url;
											openPopPay(1);
											if(_ajaxdata.pay_type == 'ali'){
												aliHandler.location.href = d.result.code_url;
											}
										}else{
											alert(d.msg);
											payment_btn_status = 0;
										}
									},
									efun:function(d){
										payment_btn_status = 0;
									}
								});
							});
						}
						
					}
					function openPopPay(type){
						var popObj={_size:{W:360,H:360},conhtml:get_pay_pop_html(type,_ajaxdata),cancelback:function(){}};
						if(type==1){
							if(_ajaxdata.pay_type == 'ali'){
								popObj._size.H=225;
							}else{
								popObj._size.H=400;
							}
						}else if(type==3){
							popObj._size.W=450;
						}
						_h.lj(_h._domain+"Js/popWin",function(){
							_h.popWin._open(popObj);
							bind_pay_popWin();
						});
					}
					function bind_pay_popWin(){
						var _con = c(".popwarp .pay_pop_con_box"),
							_btn = _con.getElementsByTagName("span")[2],ccn=0,fcn=0;
						if(_btn.className=="btn_box"){
							var _btn_b = _btn.getElementsByTagName('b');
							_btn_b[0].onclick = pay_complete;
							_btn_b[1].onclick = pay_fails;
						}else{
							_btn.onclick = function(){
								var _hash = _w.location.hash,murl=_w.location.href;
								(_hash&&_hash!="")&&(murl=murl.split(_hash)[0]);
								_w.location.href = murl;
							}
						}
						function pay_complete(){
							if(ccn==1){return false;}else{ccn = 1;}
							_h.isAjax({
								url:'/check_state',
								data:"order_sn="+_ajaxdata.order_sn,
								sfun:function(d){
									if(d.status==22000){
										// _ajaxdata.order_sn = d.result.order_sn;
										// _ajaxdata.code_img_url = d.result.code_img_url;
										// ali_url = d.result.code_url;
										openPopPay(1);
										if(_ajaxdata.pay_type == 'ali'){
											window.location.reload();
											//aliHandler.location.href = 'https://i.huanqiu.com/vip';
										}
									}else{
										_h.popWin._close(function(){openPopPay(3)});
									}
								}
							});
						}
						function pay_fails(){
							if(fcn==1){return false;}else{fcn = 1;}
							_h.popWin._close(function(){openPopPay(3)});
						}
					}
					function openPopPayHfb(){
						var popObj={_size:{W:439,H:239},conhtml:get_pay_hfb_pop_html(),cancelback:function(){}};
						_h.lj(_h._domain+"Js/popWin",function(){
							_h.popWin._open(popObj);
							bind_pay_hfb_popWin();
						});
					}

					function oClosePay()
					{
						document.getElementById("close-pay").onclick=function(){
							_h.popWin._close();
							if(oMIndex==0)
							{
								oJoinvip(oMIndex,1);
							}
							else
							{
								oJoinvip(oMIndex,0);
							}
						};
					}

					function openPopPayHf(oType){
						// console.log('话费支付');
						if(oType==0)
						{
							_loadScript(_mainurl+"Js/ajax",function(){
								_h.isAjax({
									url:'/migu_pay',
									data:"pay_type="+_ajaxdata.pay_type+"&month_count="+_ajaxdata.month_count+"&vip_type="+_ajaxdata.vip_type,
									sfun:function(d){
										if(d.status==22000){
											var popObj={_size:{W:439,H:199},conhtml:get_pay_hf_pop_html(d.result.url,0),cancelback:function(){}};
											_h.lj(_h._domain+"Js/popWin",function(){
												_h.popWin._open(popObj);
												oClosePay();
											});
										}else{
											alert(d.msg);
											payment_btn_status = 0;
										}			
									}
								});
							});
						}
						else if(oType==1)
						{
							var popObj={_size:{W:439,H:199},conhtml:get_pay_hf_pop_html('11',1),cancelback:function(){}};
							_h.lj(_h._domain+"Js/popWin",function(){
								_h.popWin._open(popObj);
								get_pay_hf_w();
								oClosePay();
							});
						}
				

					}
					function bind_pay_hfb_popWin(){
						var _con = c(".popwarp .hfb_pay_box"),
							send_code_btn = c(".send_code",_con),
							pay_btn = c(".pay_btn",_con),
							cancel_pay_btn = c(".cancel_pay_btn",_con),
							_pay_input = _con.getElementsByTagName('input'),
							code_send_state = false;
						send_code_btn.onclick = getPayHfbVerCode;
						pay_btn.onclick = submitPayCode;
						cancel_pay_btn.onclick = function(){_h.popWin._close();}
						

						function getPayHfbVerCode(){
							if(this.className!="send_code"){return false;}
							var _phoneNum = parseInt(_pay_input[0].value),
								_phoneReg = /^(((13[0-9]{1})|(14[5,7]{1})|(15[^4]{1})|(17[0,6,7,8]{1})|(18[0-9]{1}))+\d{8})$/,
								_testPhone = _phoneReg.test(_pay_input[0].value),
								_t = this;
							if(isNaN(_phoneNum)||!_testPhone){
								alert('请输入正确的手机号!');
							}else{
								this.className!="send_code_wait";
								_loadScript(_mainurl+"Js/ajax",function(){
									_h.isAjax({
										url:'/get_verify_code ',
										data:"mobile="+_phoneNum+'&vip_type='+_ajaxdata.vip_type,
										sfun:function(d){
											if(d.status==22000){
												waitCodeFun(_t);
												code_send_state = true;
											}else{
												alert(d.msg);
												this.className!="send_code";
											}
										}
									});
								});
							}
						}
						function submitPayCode(){
							if(code_send_state===false||_pay_input[1].value==""){}
							else{
								code_send_state = false;
								_h.isAjax({
									url:'/post_verify_code',
									data:"verifycode="+_pay_input[1].value,
									sfun:function(d){
										if(d.status==22000){
											var _infoDom = c('.text_text_info',_con);
											_infoDom.innerHTML = '确认订单中，请稍后...';
											setTimeout(function(){
												alert('订单已确认，刷新页面');
												window.location.href = window.location.href;
											},5000);
										}else{
											alert(d.msg);
											code_send_state = true;
										}
									}
								});
							}
						}
					}
				}				
			}

			oJoinvip(0,0);

			// 显示实名认证提示信息条
            try{certification_bar();}catch(e){}

			

			/*************************
				自定义标签 click 绑定
				2015.7.30
			**************************/
			_loadScript("Js/bindClick");
			/*加载修改头像flash*/
			try{
				var str = '<a style="display:block;text-align:center;margin-top:20px;" href="http://www.adobe.com/go/getflashplayer"><img src="https://t1.huanqiucdn.cn/27cbe2f2289b07967fc708999180d170.png" alt="Get Adobe Flash player"></a>';
				document.getElementById("setContainer").innerHTML = str;
				swfobject.embedSWF("Public/FaustCplus.swf", "setContainer", "650", "450", "9.0.0", "expressInstall.swf", flashvars, params, attributes);
			}catch(e){}
			

		}
	}
	// 显示实名认证提示信息条
	function certification_bar(){
		var _cookieObj = document.cookie;
		_cookieObj = eval('({"'+document.cookie.replace(/\s/g,"").replace(/=/g,'":"').replace(/;/g,'","')+'"})');
		if(_cookieObj['user[status]']&&_cookieObj['user[status]']=='1'){return false;}
		var _certification = '<div class="certification_bar">应《中华人民共和国网络安全法》要求，2017年6月1日起，使用互联网服务需要进行帐号实名认证。为保障环球通行证“评论”等功能的正常使用，请您尽快完成手机号验证，感谢您的理解和支持。<b></b></div>';
		document.body.appendChild(el(_certification));
		var _publicHeader = c('.publicHeader'),_certification_top=151,certification_bar = c('.certification_bar'),
			certification_bar_close = c('b',certification_bar)[0];
		if(_publicHeader){_certification_top=80;}
		setTimeout(function(){
			certification_bar.style.top = _certification_top+'px';
			certification_bar.style.opacity = '1';
		},100);
		certification_bar_close.onclick = function(){
			certification_bar.style.top = (_certification_top+60)+'px';
			certification_bar.style.opacity = '0';
			setTimeout(function(){
				document.body.removeChild(certification_bar);
			},400);
		}
	}
	function get_pay_time_val(val){
		var _value = 0;
		switch(val){
			case "十二个月":
				_value = 12;
				break;
			case "六个月":
				_value = 6;
				break;
			case "三个月":
				_value = 3;
				break;
			case "一个月":
				_value = 1;
				break;
		}
		return _value;
	}
	function get_pay_pop_html(type,data){
		var popTitText = data.pay_type=="wx"?"微信":(data.pay_type=="ali"?"支付宝":""),
			_html='<div class="pay_pop_con_box">',title='',con='',btn='';
		if(type==1){
			if(popTitText== "支付宝"){
				title = '<span class="istitle">支付完成前请不要关闭此窗口</span>';
				con = '<span class="img_qr" style="width:0;height:0;"><img src="'+data.code_img_url+'" alt="" style="width:0;height:0;"  /></span>\
						<b class="pay_text_info" style="font-size:0;padding:0;">支付完成前请不要关闭此窗口</b>\
						<b class="pay_text_info" style="padding-top:0;font-weight:normal;">完成支付后根据您的情况点击下面按钮</b>';
				btn = '<span class="btn_box"><b>已完成支付</b><b>支付遇到问题</b></span>';
			}else{
				title = '<span class="istitle">请打开'+popTitText+'扫码支付</span>';
				con = '<span class="img_qr"><img src="'+data.code_img_url+'" alt="" /></span>\
					<b class="pay_text_info" style="color:red;">支付完成前请不要关闭此窗口</b>\
					<b class="pay_text_info" style="padding-top:0;font-weight:normal;">完成支付后根据您的情况点击下面按钮</b>';
				btn = '<span class="btn_box"><b>已完成支付</b><b>支付遇到问题</b></span>';
			}
		}else if(type==2){
			title='<span class="istitle">恭喜您，您的支付已完成</span>';
			con = '<span class="img_pay_success"></span>';
			btn = '<span class="confirmBtn">确定</span>';
		}else if(type==3){
			title='<span class="istitle">对不起，您的支付失败</span>';
			con = '<span class="img_pay_error">\
					<i>请刷新页面查看最新支付结果或拨打客服电话了解详情</i>\
					<i>订单号：'+data.order_sn+'</i>\
					<i>客服电话：4000803881</i>\
					</span>';
			btn = '<span class="confirmBtn">刷新页面</span>';
		}
		return _html+title+con+btn+"</div>";
	}
	function get_pay_hfb_pop_html(){
		var _html='<div class="hfb_pay_box"><ul>\
						<li><span class="tit">手机号:</span><span class="input_box"><input type="text" /></span><a href="javascript:;" class="send_code">发送验证码</a></li>\
						<li><span class="tit">验证码:</span><span class="input_box"><input type="text" /></span></li>\
						<li><span class="text_text_info"></span></li>\
						<li><a href="javascript:;" class="pay_btn">确认支付</a><a href="javascript:;" class="cancel_pay_btn">取消</a></li>\
					</ul></div>';
		return _html;
	}
	function get_pay_hf_pop_html(url,oType){
		var _url = url||'';
		if(oType==0)
		{
			var _html='<a href="javascript:void(0)" id="close-pay">x</a>\
				<div class="huafei_pay_box">\
				<div>\
					<span class="istitle">请点击按钮打开话费支付</span>\
					<span class="pay_URL"><a onclick="(function(t){\
						var cfb = t.parentNode.parentNode.parentNode.getElementsByTagName(\'div\');\
						cfb[0].style.display = \'none\';\
						cfb[1].style.display = \'block\';\
					})(this)" href="'+_url+'" target="_blank">去支付</a></span>\
				</div>\
				<div style="display:none;">\
					<b class="pay_text_info_line1" style="color:red;">支付完成前请不要关闭此窗口</b>\
					<b class="pay_text_info" style="padding-top:0;font-weight:normal;">完成支付后,点击下方按钮刷新页面,查看会员信息</b>\
					<span class="confirmBtn" onclick="(function(){location.href=\'https://i.huanqiu.com/vip\'})()">刷新页面</span>\
				</div>\
			</div>';
		}
		else if(oType==1)
		{
			var _html='<a href="javascript:void(0)" id="close-pay">x</a>\
				<div id="wo-confirm" class="huafei_pay_box">\
				<div>\
					<span class="istitle">请点击按钮打开话费支付</span>\
						<input type="text" value="" id="hfw-num" class="hfw-num" placeholder="请输入联通手机号" />\
						<span class="pay_URL"><a id="paywo" href="javascript:void(0)" target="_blank">去支付</a></span>\
				</div>\
				<div style="display:none;">\
					<b class="pay_text_info_line1" style="color:red;">支付完成前请不要关闭此窗口</b>\
					<b class="pay_text_info" style="padding-top:0;font-weight:normal;">完成支付后,点击下方按钮刷新页面,查看会员信息</b>\
					<span class="confirmBtn" onclick="(function(){location.href=\'https://i.huanqiu.com/vip\'})()">刷新页面</span>\
				</div>\
			</div>';
		}

		return _html;
	}

	function get_pay_hf_w()
	{
		document.getElementById("paywo").onclick=function(){
			var _phoneNumw = parseInt(document.getElementById('hfw-num').value);
			var _phoneRegw = /^(((13[0-9]{1})|(14[5,7]{1})|(15[^4]{1})|(17[0,6,7,8]{1})|(18[0-9]{1}))+\d{8})$/;
			var _testPhonew = _phoneRegw.test(_phoneNumw);
			if(isNaN(_phoneNumw)||!_testPhonew)
			{
				alert('请输入正确的手机号!');
			}
			else{
				var oNewPage=window.open("","_blank");
				_loadScript(_mainurl+"Js/ajax",function(){
					_h.isAjax({
                        url:'/wo_pay',
                        data:"mobile="+_phoneNumw,
						sfun:function(d){
							if(d.status==22000){
								//console.log(d);
								
								oNewPage.location.href=d.result.url;
								var cfb = document.getElementById('wo-confirm').getElementsByTagName('div');
								cfb[0].style.display = 'none';							
								cfb[1].style.display = 'block';
							}else{
								alert(d.msg);
								payment_btn_status = 0;
							};		
						}
					});
				});
			}
		};
	}

	function waitCodeFun(dom){
		dom.className = 'send_code_wait';
		var num = 60;
		function timeFun(){
			num-=1;
			if(num==0){
				dom.innerHTML = '发送验证码';
				dom.className = 'send_code';
			}else{
				dom.innerHTML = num+'s后再次发送';
				setTimeout(timeFun,1000);
			}
		}
		setTimeout(timeFun,1000);
	}
	function otherLoginClick(dom){
		if(dom.className!="weixin"){
			dom.onclick = function(){
				var w=800,h=400;
				if(dom.className=="cmcc"){w=989;h=500;}
				var l = (screen.width - w) / 2,t = (screen.height - h) / 2,
				s = 'width=' + w + ', height=' + h + ', top=' + t + ', left=' + l,
				type = dom.className=="weibo"?"sina":dom.className,
				url ="index.php?m=auth&a=login&type="+type;
				s += ', toolbar=no, scrollbars=no, menubar=no, location=no, resizable=no';
	            window.open(url,'auth_window',s);
			}
		}else if(dom.className=="weixin"){
			var weixinScanCode = c(".weixinScanCode");
			if(weixinScanCode){
				var weixingoback = c(".goBack",weixinScanCode);
				dom.onclick = function(){
					weixinScanCode.style.left = "0px";
				}
				weixingoback.onclick = function(){
					weixinScanCode.style.left = "398px";				
				}
			}
		}
	}
	function getNewDate(){
		var myDate = new Date(),
		_year = myDate.getFullYear(),
		_month = ismonth(),
		_day = isDay();

		function ismonth(){
			var m = myDate.getMonth()+1;
			if(m<10){
				m='0'+m;
			}
			return m;
		}
		function isDay(){
			var d = myDate.getDate();
			if(d<10){
				d='0'+d;
			}
			return d;
		}
		return _year+'-'+_month+'-'+_day+' 00:00:00';
	}

	function addSelect(){
		var select_province = c(".select_province"),
		select_city = c(".select_city");
		if(select_province){
			var provinceHtml = '<a href="javascript:;" data-item="-1">请选择</a>',
			province = c("b",select_province)[0],
			provinceNum = -1;
			for(i=0;i<GP.length;i++){
				provinceHtml += '<a href="javascript:;"  data-item="'+i+'">'+GP[i]+'</a>';
				if(province.innerHTML==GP[i]){
					provinceNum = i;
				}
			}
			var listWarp = c(".selectList",select_province),
			cityListWarp = c(".selectList",select_city),
			cityHtml='';
			listWarp.innerHTML = provinceHtml;
			if(provinceNum>=0){
				for(i=0,d=GT[provinceNum];i<d.length;i++){
					cityHtml += '<a href="javascript:;"  data-item="'+i+'">'+d[i]+'</a>';
				}
			}else{
				cityHtml='<a href="javascript:;" data-item="-1">请选择</a>';
			}
			cityListWarp.innerHTML = cityHtml;
			select_province.onclick = function(e){
				if(listWarp.style.display == "block"){
					listWarp.style.display = "none";
					var e = e ? e.target : window.event.srcElement;
					changeprovince(this,e,select_city);
				}else{
					listWarp.style.display = "block";
				}
				bodyClick(select_province);
			}
			select_city.onclick = function(e){
				var isListWarp = c(".selectList",this);
				if(isListWarp.style.display == "block"){
					isListWarp.style.display = "none";
					var e = e ? e.target : window.event.srcElement;
					changeprovince(this,e);
				}else{
					isListWarp.style.display = "block";
				}
				bodyClick(select_city);
			}
		}
	}
	function changeprovince(warp,tag,nextDom){
		var textwarp = c("b",warp)[0],
		item = parseInt(tag.getAttribute("data-item")),
		warpClass=warp.className,
		isInput = warp.parentNode.getElementsByTagName("input");
		if(textwarp.innerHTML != tag.innerHTML){
			textwarp.innerHTML = tag.innerHTML;
			if(nextDom){
				var cityHtml = '',isListWarp = c(".selectList",nextDom),tagText = '请选择',nextDomB = c("b",nextDom)[0];
				if(item>=0){
					var cityData = GT[item];
					for(i=0;i<cityData.length;i++){
						cityHtml += '<a href="javascript:;"  data-item="'+i+'">'+cityData[i]+'</a>';
					}
					tagText = cityData[0];
				}else{
					cityHtml = '<a href="javascript:;" data-item="-1">请选择</a>';
				}
				isListWarp.innerHTML = cityHtml;
				isInput[0].value = tag.innerHTML;
				isInput[1].value = tagText;
				nextDomB.innerHTML = tagText;
			}else{
				isInput[1].value = tag.innerHTML;
			}
		}
		
	}
	function bodyClick(dom){
		var select_province = c(".select_province"),
		select_city = c(".select_city"),
		isListWarp_1 = c(".selectList",select_province),
		isListWarp_2 = c(".selectList",select_city);
		document.body.onclick = function(e){
			var e = e ? e.target : window.event.srcElement,
			isDom_1 = isParent(e,select_province),
			isDom_2 = isParent(e,select_city);
			if(!isDom_1){
				if(isListWarp_1.style.display == "block"){
					isListWarp_1.style.display = "none";
				}
			}
			if(!isDom_2){
				if(isListWarp_2.style.display == "block"){
					isListWarp_2.style.display = "none";
				}
			}
		}
	}
	function isParent(obj,parentObj){
		while (obj != undefined && obj != null && obj.tagName.toUpperCase() != 'BODY'){ 
			if (obj == parentObj){ return true;} 
			obj = obj.parentNode; 
		} 
		return false; 
	}
	var verify = {
		ajaxModule:_mainurl+"Js/ajax",
		url:"index.php?g=auth&m=members&a=check_",
		init:function(tag,type,callback){
			var val = tag.value , t=this , isdata="";
			if(val){
				isdata= '&'+type+'='+val;
			}else{
				typeArr = type.split("{data}");
				type = typeArr[0];
				isdata= '&'+type+'='+(typeArr[1]?typeArr[1]:'');
			}
			_loadScript(t.ajaxModule,function(){
				_h.isAjax({
					url:t.url+type,
					data:isdata,
					sfun:function(d){
						callback(d);				
					}
				});
			});	
		}
	}
	var getSuccessHtml = function(d){
		var _html = '<div class="publicSuccessBox"><span class="title">'+d.title+'</span>';
			_html += d.subtitle?('<span class="subtitle">'+d.subtitle+'</span>'):'';
			_html += d.type=="e"?('<p>您的登录邮箱是：'+d.val+'</p><p>(激活邮箱的有效期为48小时，请在48小时内前往邮箱激活)</p>'):('<p>您的登录手机是：'+d.val+'</p><p>(如果忘记密码或丢失账户可以通过此手机找回)</p>');  
			_html += d.btn?('<div class="btnBox">'+d.btn+'</div>'):'';
		return _html+'</div>';
	}

	/*
		远程读取加载js
	*/
	var _loadPath = {} ,
	_loadScript = function(url, callback,kds) {

		if (!callback) {
			callback = function() {}
		}
		var _ID = url.split("/"),
		_ID = _ID[_ID.length - 1];
		if (_loadPath[_ID]) {
			callback();
		} else {
			var _h = document.getElementsByTagName("head")[0],
				script = document.createElement("script");
			script.src = url + ".js";
			_h.appendChild(script);
			var ua = navigator.userAgent.toLowerCase(),
				thisnav = ua.match(/msie ([\d.]+)/);		
			function loadJs() {
				if (!this.readyState || this.readyState == 'loaded') {
					_loadPath[_ID] = script;
					script.onload = script.onreadystatechange = null;
					try {callback();} catch (e) {}
					_h.removeChild(script);
					return false;
				} else if (this.readyState == 'complete') {
					try {callback();} catch (e) {}
				}
				
			};							
			if (thisnav && thisnav[1] < 9) {				
				script.onreadystatechange = loadJs;
			} else {
				script.onload = loadJs;
			}

		}
	}
	/*load css*/
	var cssPath={},
	_loadcss = function(url,callback){
		!callback&&(callback=function(){})
		var _ID = url.split("/"),
		_ID = _ID[_ID.length - 1];
		if (!cssPath[_ID]){
			var _h = document.getElementsByTagName("head")[0],
				css = document.createElement("link");
			css.href = url + ".css";
			css.rel="stylesheet";
			try{css.addEventListener("load",function(){callback();cssPath[_ID]=css;}, false); }catch(e){
				css.attachEvent("onload",function(){callback();cssPath[_ID]=css;});
			}
			_h.appendChild(css);
		}
	}
	_loadcss(_mainurl+"Css/main");
	
	_w._h = {
		_domain:_mainurl,
		lj:_loadScript,
		lc:_loadcss,
		c:c,
		el:el,
		isp:isParent,
		olk:otherLoginClick,
		vf:verify,
		getS:getSuccessHtml
	}
})(window);

