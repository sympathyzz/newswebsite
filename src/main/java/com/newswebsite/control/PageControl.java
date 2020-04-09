package com.newswebsite.control;



import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;



@Controller
public class PageControl {
	/**
	 * 首页
	 */
	@RequestMapping(value = { "/", "index" })
	public String index(Model m) {
		
		return "pages/HomePage";
	}
	/**
	 * 首页
	 */
	@RequestMapping(value = { "/domesticNews" })
	public String news(Model m) {
		
		return "pages/DomesticNews";
	}
	
}
