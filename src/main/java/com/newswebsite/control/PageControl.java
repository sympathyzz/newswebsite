package com.newswebsite.control;



import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.newswebsite.bean.Atype;
import com.newswebsite.bean.AtypeExample;
import com.newswebsite.bean.Btype;
import com.newswebsite.bean.BtypeExample;
import com.newswebsite.bean.Comments;
import com.newswebsite.bean.CommentsExample;
import com.newswebsite.bean.News;
import com.newswebsite.bean.NewsExample;
import com.newswebsite.bean.NewsType;
import com.newswebsite.bean.NewsTypeExample;
import com.newswebsite.bean.User;
import com.newswebsite.bean.UserExample;
import com.newswebsite.dao.AtypeMapper;
import com.newswebsite.dao.BtypeMapper;
import com.newswebsite.dao.CommentsMapper;
import com.newswebsite.dao.NewsMapper;
import com.newswebsite.dao.NewsTypeMapper;
import com.newswebsite.dao.UserMapper;
import com.newswebsite.service.AtypeService;
import com.newswebsite.service.BtypeService;
import com.newswebsite.service.NewsService;
import com.newswebsite.service.NewsTypeService;



@Controller
public class PageControl {
	List<News> newsList =null;
	@Autowired
	NewsService newsService;
	
	@Autowired
	NewsTypeService newsTypeService;
	
	@Autowired
	AtypeService atypeService;
	
	@Autowired
	BtypeService btypeService;
	
	@Autowired
	NewsMapper newsMapper;
	
	@Autowired
	UserMapper userMapper;
	
	@Autowired
	CommentsMapper commentsMapper;
	
	@Autowired
	NewsTypeMapper newsTypeMapper;
	
	@Autowired
	AtypeMapper aTypeMapper;
	
	@Autowired
	BtypeMapper bTypeMapper;
	
	/**
	 * 首页
	 */
	@RequestMapping(value = { "/", "index" })
	public String index(Model m) {
		NewsExample ne=new NewsExample();
		List<News> allNewsList=newsMapper.selectByExample(ne);
		for(News news:allNewsList){
			NewsTypeExample nte=new NewsTypeExample();
			AtypeExample ae=new AtypeExample();
			BtypeExample be=new BtypeExample();
			nte.createCriteria().andNewsIdEqualTo(news.getNewsId());
			NewsType newsType=newsTypeMapper.selectByExample(nte).get(0);
			ae.createCriteria().andAtypeIdEqualTo(newsType.getAtypeId());
			Atype aType=aTypeMapper.selectByExample(ae).get(0);
			be.createCriteria().andBtypeIdEqualTo(newsType.getBtypeId());
			Btype bType=bTypeMapper.selectByExample(be).get(0);
			news.setAtype(aType);
			news.setBtype(bType);			
		}
		m.addAttribute("allNewsList", allNewsList);
		return "pages/HomePage";
	}
	/**
	 * 评论页面
	 */
	@RequestMapping(value = { "comment" })
	public String comment(Model m,@RequestParam(required = true) Integer newsId,
			@RequestParam(required = true) String title) {
		CommentsExample ce=new CommentsExample();		
		ce.createCriteria().andNewsIdEqualTo(newsId);
		ce.setOrderByClause("agree_num DESC");
		List<Comments>commentsList=commentsMapper.selectByExample(ce);
		UserExample ue=new UserExample();
		ue.createCriteria().andUserIdEqualTo(commentsList.get(0).getUserId());
		List<User> userList=userMapper.selectByExample(ue);
		commentsList.get(0).setUsername(userList.get(0).getUsername());
		CommentsExample ce2=new CommentsExample();	
		ce2.createCriteria().andNewsIdEqualTo(newsId);
		ce2.setOrderByClause("comment_time DESC");
		List<Comments>commentsList2=commentsMapper.selectByExample(ce2);
		for( Comments c:commentsList2){
			UserExample ue2=new UserExample();
			ue2.createCriteria().andUserIdEqualTo(c.getUserId());
			List<User> userList2=userMapper.selectByExample(ue2);
			c.setUsername(userList2.get(0).getUsername());
		}
		m.addAttribute("hottest",commentsList.get(0));
		m.addAttribute("commentsList",commentsList2);
		m.addAttribute("commentsNum",commentsList2.size());
		m.addAttribute("newsId",newsId);
		m.addAttribute("title",title);
		return "pages/comment";
	}
	/**
	 * 发表评论
	 */
	@RequestMapping(value = { "makeComments" })
	public String makeComments(Model m, Integer userId,
			@RequestParam(required = true) Integer newsId,@RequestParam(required = true) Integer commentsNum,
			@RequestParam(required = true) String comment,
			@RequestParam(required = true) String title) {
		if(userId==null){
			return "pages/login";
		}
		Comments c=new Comments();
		c.setAgreeNum(0);
		c.setComment(comment);
		c.setCommentTime(new Date());
		c.setNewsId(newsId);
		c.setUserId(userId);
		commentsMapper.insert(c);
		CommentsExample ce=new CommentsExample();		
		ce.createCriteria().andNewsIdEqualTo(newsId);
		ce.setOrderByClause("agree_num DESC");
		List<Comments>commentsList=commentsMapper.selectByExample(ce);
		UserExample ue=new UserExample();
		ue.createCriteria().andUserIdEqualTo(commentsList.get(0).getUserId());
		List<User> userList=userMapper.selectByExample(ue);
		commentsList.get(0).setUsername(userList.get(0).getUsername());
		CommentsExample ce2=new CommentsExample();	
		ce2.createCriteria().andNewsIdEqualTo(newsId);
		ce2.setOrderByClause("comment_time DESC");
		List<Comments>commentsList2=commentsMapper.selectByExample(ce2);
		for( Comments c1:commentsList2){
			UserExample ue2=new UserExample();
			ue2.createCriteria().andUserIdEqualTo(c1.getUserId());
			List<User> userList2=userMapper.selectByExample(ue2);
			c1.setUsername(userList2.get(0).getUsername());
		}
		m.addAttribute("hottest",commentsList.get(0));
		m.addAttribute("commentsList",commentsList2);
		m.addAttribute("commentsNum",commentsList2.size());
		m.addAttribute("newsId",newsId);
		m.addAttribute("title",title);
		return "pages/comment";
	}
	/**
	 * 新闻页面
	 */
	@RequestMapping(value = { "/newsPage" })
	public String domesticNews(Model m,@RequestParam(required = true) String atype,@RequestParam(defaultValue="") String btype) {			
		int atypeId=atypeService.getAtypeId(atype);
		List<Btype> btypeList=btypeService.getBtypeListByAtypeId(atypeId);
		List<NewsType> newsTypeList=null;
		if(btype.equals("")){			
			newsTypeList=newsTypeService.findNewsIDByAtypeId(atypeId);
			newsList =new ArrayList<>();
			for(NewsType newsType:newsTypeList){
				NewsExample ne=new NewsExample();
				ne.createCriteria().andNewsIdEqualTo(newsType.getNewsId());
				newsList.addAll(newsMapper.selectByExample(ne));								
			}			
		}else{
			int btypeId=btypeService.getBtypeId(btype);
			List<NewsType> newsTypeList2=newsTypeService.findNewsIDByBtypeId(btypeId);	
			newsList =new ArrayList<>();
			for(NewsType newsType:newsTypeList2){
				NewsExample ne=new NewsExample();
				ne.createCriteria().andNewsIdEqualTo(newsType.getNewsId());
				newsList.addAll(newsMapper.selectByExample(ne));	
			}	
		}
		m.addAttribute("newsList", newsList);
		m.addAttribute("atype", atype);
		m.addAttribute("btype", btype);
		m.addAttribute("btypeList", btypeList);
		return "pages/WorldNews";
	}
	
	
	/**
	 * 新闻详细内容页面
	 */
	@RequestMapping(value = { "/detailPage" })
	public String detailPage(Model m,@RequestParam(required = true) String atype,@RequestParam(required = true) String btype,@RequestParam(required = true) Integer newsId) {					
		NewsExample ne=new NewsExample();
		ne.createCriteria().andNewsIdEqualTo(newsId);
		List<News> showNews=newsMapper.selectByExampleWithBLOBs(ne);		
		CommentsExample ce=new CommentsExample();
		ce.createCriteria().andNewsIdEqualTo(newsId);
		int commentsNum=commentsMapper.selectByExample(ce).size();
		m.addAttribute("commentsNum",commentsNum);
		m.addAttribute("showNews", showNews);
		m.addAttribute("atype", atype);
		m.addAttribute("btype", btype);
		return "pages/DetailPage";
	}
}
