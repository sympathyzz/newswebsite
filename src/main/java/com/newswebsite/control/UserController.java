package com.newswebsite.control;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.websocket.Session;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.AutoConfigurationPackage;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.multipart.MultipartFile;

import com.aliyuncs.exceptions.ClientException;
import com.newswebsite.bean.User;
import com.newswebsite.service.UserService;
import com.newswebsite.util.PhoneUtil;


@Controller
public class UserController {
	@Value("${userheadPath}")
	private String userheadPath;
	
	@Autowired
	UserService userService;
	
	@RequestMapping("logout")
	public String  logout(HttpSession session,HttpServletRequest request,HttpServletResponse response) {
		User u = (User) request.getSession().getAttribute("user");
		if(u!=null) {
			request.getSession().removeAttribute("user");
		}
		Cookie[] cookies=request.getCookies();
		for(Cookie cookie:cookies){
			if("uname".equals(cookie.getName())){
				cookie.setMaxAge(0);			
				response.addCookie(cookie);
			}
		}
		return "redirect:index";
	}
	

	@RequestMapping("/doLogin")
	public String login(Model m,String phonenum,String password
			,HttpSession session,HttpServletResponse response
			) {
		User user=null;
		m.addAttribute("phonenum",phonenum);
		m.addAttribute("password",password);

			if(phonenum.trim().equals("") || password.trim().equals("")){
				m.addAttribute("msg","手机号或密码不能为空");
				return "pages/Login";
			}else{
				 user = userService.login(phonenum, password);
					if(user==null) {
						m.addAttribute("msg","手机号或密码错误");
						return "pages/Login";
					}else{
						Cookie cookie=new Cookie("uname",user.getUsername());
						cookie.setMaxAge(30*60);
						cookie.setPath("/");
						response.addCookie(cookie);
						session.setAttribute("user", user);
						return "redirect:index";
					}					
			}
	}
	
    @RequestMapping("/login")
    public String log(Model m,String type) {
    	m.addAttribute("type",type);
        return "pages/Login";
    }
	
    @RequestMapping("/reg")
    public String reg(Model m,String msg) {
    	m.addAttribute("msg",msg);
        return "pages/Register";
    }
    
    @RequestMapping("/doReg")
    public void doReg( Model m, String mobile,String password
    		,HttpServletResponse response ,HttpSession session
    		,String code,String code2,String msg
    		,String name,String idno) {
    	User user = null;
    	Boolean user1;
    	m.addAttribute("phone",mobile);
    	m.addAttribute("password",password);
    	
        		userService.addUser(mobile,password,name,idno);
        		user = userService.login(mobile, password);
        		Cookie cookie=new Cookie("uname",user.getUsername());
    			cookie.setMaxAge(30*60);
    			cookie.setPath("/");
    			response.addCookie(cookie);
    			session.setAttribute("user", user);
    			try {
					response.sendRedirect("index");
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
        	
    	
    	
    		
    	
    	
    }
	
    
    @RequestMapping("/getCode")
    public String getCode(Model m,String type,String phonenum) {
    	if((phonenum.trim().equals("") || phonenum==null)&&type.endsWith("2")){
    		m.addAttribute("msg","请输入手机号再获取动态码");
    		m.addAttribute("type",type);
    		 return "pages/Login1";
    	}
    	if((phonenum.trim().equals("") || phonenum==null)&&type.endsWith("3")){
    		m.addAttribute("msg","请输入手机号再获取动态码");
    		 return "pages/Register1";
    	}
    	PhoneUtil pu=new PhoneUtil();
    	int a=(int) ((Math.random()*9+1)*1000);
    	String code=String.valueOf(a);
    	System.out.println(code);
    			try {
					pu.sendPhoneCode(phonenum, code);
				} catch (ClientException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
    	m.addAttribute("code",code);
    	m.addAttribute("phonenum",phonenum);
    	m.addAttribute("phone",phonenum);
    	m.addAttribute("type",type);
    	m.addAttribute("msg1","1");
    	
        return "pages/Register";
    }
   
    
    @RequestMapping("getback")
	public String getback(String msg,Model m){
    	m.addAttribute("msg",msg);
		return "pages/GetBack";
	}
    
    @RequestMapping("getback2")
	public String getback2(String msg,Model m,String email){
    	m.addAttribute("msg",msg);
    	m.addAttribute("email",email);
		return "pages/GetBack2";
	}
    
    @RequestMapping("isReg")
	public void  isReg(String a,HttpServletResponse response){
    	String aa=userService.isReg2(a);
		if(aa=="false"){
			try {
				response.getWriter().write("no");
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}else{
			try {
				response.getWriter().write(aa);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
    
	
	
	@Autowired
	private JavaMailSender mailSender;
	
	@Value("${mail.fromMail.addr}") // SPEL表达式
	private String from;
	
	public void sendSimpleMail(String to,String subject,String content){
			SimpleMailMessage message=new SimpleMailMessage();
			message.setFrom(from);
			message.setTo(to);
			message.setSubject(subject);
			message.setText(content);
			mailSender.send(message);
	}
	
	@RequestMapping("/getCode2")
	public String send(Model m,String email){
		int a=(int) ((Math.random()*9+1)*1000);
    	String code=String.valueOf(a);
    	System.out.println(code);    			
    	m.addAttribute("code",code);
    	m.addAttribute("email",email);
		sendSimpleMail(email, "系统邮件", code);
		m.addAttribute("msg1","1");
		return "pages/GetBack2";
	}
	
	
	
	@RequestMapping("/getback3")
	public void  getback3(String code,String code2,String email,HttpServletResponse response){
		if(code.trim().equals(code2.trim())){
			try {
				response.getWriter().write("yes,"+email);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}else{
			try {
				response.getWriter().write("no,"+email);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
	}
	
	@RequestMapping("/getback4")
	public void  getback4(String email,String password,HttpServletResponse response){
		if(password.length()>=8){
			userService.updatepwd(email,password);
			try {
				response.getWriter().write("yes,1");
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}else{
			try {
				response.getWriter().write("no,"+email);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
	}
	
	@RequestMapping("/isNameExist")
	public void  isNameExist(String username,HttpServletResponse response){

			Boolean a=userService.isNameExist(username);
			if(a==true){
				try {
					response.getWriter().write("yes");
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}else{
				try {
					response.getWriter().write("no");
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}		
	}
	
	@RequestMapping("/isEmailExist")
	public void  isEmailExist(String email,HttpServletResponse response){

			Boolean a=userService.isEmailExist(email);
			if(a==true){
				try {
					response.getWriter().write("yes");
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}else{
				try {
					response.getWriter().write("no");
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}		
	}
	
	@RequestMapping("/isPhoneExist")
	public void  isPhoneExist(String phone,HttpServletResponse response){

			Boolean a=userService.isPhoneExist(phone);
			if(a==true){
				try {
					response.getWriter().write("yes");
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}else{
				try {
					response.getWriter().write("no");
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}		
	}
	
	@RequestMapping("/isIDExist")
	public void  isIDExist(String idnum,HttpServletResponse response){

			Boolean a=userService.isIDExist(idnum);
			if(a==true){
				try {
					response.getWriter().write("yes");
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}else{
				try {
					response.getWriter().write("no");
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}		
	}
	
	/*@RequestMapping("/userdetail")
	public String userdetail(Model m,@SessionAttribute User user){
		List<MovieOrder> os = userService.getOrders(user.getUserId());
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		for (MovieOrder o : os) {
			o.setShowOrderTime(sdf.format(o.getOrderTime()));
		}
		userService.setOrderImg(os);
		m.addAttribute("os", os);
		m.addAttribute("index", 0);
		return "pages/UserDetail";
	}*/
	
	

	@RequestMapping(value = "userImgUpload", method = RequestMethod.POST)
    public void  upload(@RequestParam("file") MultipartFile file,@RequestParam(name="userId") String userId
    		,HttpSession session,HttpServletResponse response) {
        String fileName = file.getOriginalFilename();
        
        userService.updateImg(fileName,userId);
        
        String filePath = userheadPath;
        File dest = new File(filePath + fileName);
        try {
            file.transferTo(dest);
           response.getWriter().write("yes");           
           User user= (User) session.getAttribute("user");
           //user.setHeadImg(fileName);
           Cookie cookie=new Cookie("uname",user.getUsername());
			cookie.setMaxAge(30*60);
			cookie.setPath("/");
			response.addCookie(cookie);
			session.setAttribute("user", user);
        } catch (IOException e) {
        	try {
				response.getWriter().write("no");
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
        }
    }
	
	@RequestMapping("updatedetail")
	public String updatedetail(Model m,String username,String phone,String email,String userId,HttpSession session,HttpServletResponse response){
		userService.updatedetail(username,phone,email,userId);
		 User user= (User) session.getAttribute("user");
         user.setUsername(username);
         user.setPhone(phone);
 		user.setEmail(email);
         
         Cookie cookie=new Cookie("uname",user.getUsername());
			cookie.setMaxAge(30*60);
			cookie.setPath("/");
			response.addCookie(cookie);
			session.setAttribute("user", user);
         m.addAttribute("index", 0);
         return "pages/UserDetail";
	}
	
	@RequestMapping("t")
	public String test1(){
		return "pages/test";
	}
	/*@RequestMapping("index.php")
	public void test2(){
		
	}*/
}

