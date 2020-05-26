package com.newswebsite.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.newswebsite.bean.User;
import com.newswebsite.bean.UserExample;
import com.newswebsite.dao.UserMapper;
import com.newswebsite.service.UserService;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	UserMapper userMapper;
	

	
	@Override
	public User login(String username, String password) {
		UserExample example = new UserExample();
		example.createCriteria().andPhoneEqualTo(username).andPasswordEqualTo(password);
		List<User> list = userMapper.selectByExample(example);
		if(list.size()>0)
			return list.get(0);
		return null;
	}

	@Override
	public int reg(User u) {
		return 0;
	}

	@Override
	public User get(int userId) {
		User selectByPrimaryKey = userMapper.selectByPrimaryKey(userId);		
		return selectByPrimaryKey;
	}

	@Override
	public User loginByEamil(String username, String email) {
		UserExample example = new UserExample();
		example.createCriteria().andUsernameEqualTo(username).andEmailEqualTo(email);
		List<User> list = userMapper.selectByExample(example);
		if(list.size()>0)
			return list.get(0);
		return null;
	}

	@Override
	public Boolean isReg(String phone) {
		UserExample example = new UserExample();
		example.createCriteria().andPhoneEqualTo(phone);
		List<User> list = userMapper.selectByExample(example);
		if(list.size()>0)
			return true;
		return false;
	}

	@Override
	public void addUser(String phone, String password,String username,String idnum) {
		User record =new User();
		record.setPhone(phone);
		record.setPassword(password);
		//record.setHeadImg("reg_default.png");
		record.setUsername(username);
		record.setIdnum(idnum);
		record.setStatus(0);
		userMapper.insert(record);
	}

	@Override
	public User login(String phonenum) {
		UserExample example = new UserExample();
		example.createCriteria().andPhoneEqualTo(phonenum);
		List<User> list = userMapper.selectByExample(example);
		if(list.size()>0)
			return list.get(0);
		return null;
	}

	@Override
	public String isReg2(String a) {
		UserExample example1 = new UserExample();
		example1.createCriteria().andPhoneEqualTo(a);
		UserExample example2 = new UserExample();
		example2.createCriteria().andUsernameEqualTo(a);
		UserExample example3 = new UserExample();
		example3.createCriteria().andEmailEqualTo(a);
		List<User> list1 = userMapper.selectByExample(example1);
		List<User> list2 = userMapper.selectByExample(example2);
		List<User> list3 = userMapper.selectByExample(example3);
		if(list1.size()!=0){
			return list1.get(0).getEmail();
		}else if(list2.size()!=0){
			return list2.get(0).getEmail();
		}else if(list3.size()!=0){
			return list3.get(0).getEmail();
		}
		return "false";
	}

	@Override
	public void updatepwd(String email, String password) {
		User user=new User();		
		UserExample example = new UserExample();
		example.createCriteria().andEmailEqualTo(email);
		List<User> list = userMapper.selectByExample(example);
		user=list.get(0);
		user.setPassword(password);
		userMapper.updateByExample(user, example);
	}

	@Override
	public Boolean isNameExist(String username) {
		UserExample example = new UserExample();
		example.createCriteria().andUsernameEqualTo(username);
		List<User> list = userMapper.selectByExample(example);
		if(list.size()>0){
			return true;
		}
		return false;
	}

	@Override
	public Boolean isEmailExist(String email) {
		UserExample example = new UserExample();
		example.createCriteria().andEmailEqualTo(email);
		List<User> list = userMapper.selectByExample(example);
		if(list.size()>0){
			return true;
		}
		return false;
	}

	@Override
	public PageInfo<User> getAllUser(int pageNum, String name) {
		PageHelper.startPage(pageNum, 5);
		List<User> user;
		if(name == null ||name.equals("")) {
			user = userMapper.selectByExample(null);
		}else {
			UserExample ue = new UserExample();
			ue.createCriteria().andUsernameLike("%"+name+"%");
			user = userMapper.selectByExample(ue);
		}
		PageInfo page = new PageInfo(user);
		return page;
	}
	
	
	@Override
	public Boolean isPhoneExist(String phone) {
		UserExample example = new UserExample();
		example.createCriteria().andPhoneEqualTo(phone);
		List<User> list = userMapper.selectByExample(example);
		if(list.size()>0){
			return true;
		}
		return false;
	}
	
	@Override
	public Boolean isIDExist(String idnum) {
		UserExample example = new UserExample();
		example.createCriteria().andIdnumEqualTo(idnum);
		List<User> list = userMapper.selectByExample(example);
		if(list.size()>0){
			return true;
		}
		return false;
	}
	
	@Override
	public void updateImg(String fileName, String userId) {
		User user=new User();       
		UserExample example = new UserExample();
		example.createCriteria().andUserIdEqualTo(Integer.parseInt(userId));
		List<User> list = userMapper.selectByExample(example);
		user=list.get(0);
		 //user.setHeadImg(fileName);
		userMapper.updateByExample(user, example);
		
	}

	@Override
	public void updatedetail(String username, String phone, String email,String userId) {
		User user=new User();		
		UserExample example = new UserExample();
		example.createCriteria().andUserIdEqualTo(Integer.parseInt(userId));
		List<User> list = userMapper.selectByExample(example);
		user=list.get(0);
		user.setUsername(username);
		user.setPhone(phone);
		user.setEmail(email);
		userMapper.updateByExample(user, example);
		
	}

	/*@Override
	public List<MovieOrder> getOrders(int userId) {
		MovieOrderExample example = new MovieOrderExample();
		example.createCriteria().andUserIdEqualTo(userId);
		List<MovieOrder> list = movieOrderMapper.selectByExample(example);
		if(list.size()>0)
			return list;
		return null;
	}

	@Override
	public void setOrderImg(List<MovieOrder> os) {
		for (MovieOrder movieOrder : os) {
			setOrderImg(movieOrder);
		}
	}

	@Override
	public void setOrderImg(MovieOrder os) {
		Movie movie = movieMapper.getImageByName(os.getMovieName());
		String image = movie.getMovieImage().getImage();
		os.setPic(image);
	}*/
	
	@Override
	public int updata(User user) {
		return userMapper.updateByPrimaryKeySelective(user);
	}
}
