package com.newswebsite.control;



import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.newswebsite.bean.Btype;
import com.newswebsite.bean.News;
import com.newswebsite.bean.NewsExample;
import com.newswebsite.bean.NewsType;
import com.newswebsite.dao.NewsMapper;
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
	/**
	 * 首页
	 */
	@RequestMapping(value = { "/", "index" })
	public String index(Model m) {
		
		return "pages/HomePage";
	}
	/**
	 * 新闻页面
	 */
	@RequestMapping(value = { "/newsPage" })
	public String domesticNews(Model m,@RequestParam(required = true) String atype,@RequestParam(defaultValue="") String btype) {			
		int atypeId=atypeService.getAtypeId(atype);
		List<Btype> btypeList=btypeService.getBtypeListByAtypeId(atypeId);
		System.out.println(btypeList.size());
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
	
}
