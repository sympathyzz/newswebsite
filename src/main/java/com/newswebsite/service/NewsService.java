package com.newswebsite.service;

import java.util.Date;

import com.github.pagehelper.PageInfo;
import com.newswebsite.bean.News;


public interface NewsService {
	PageInfo<News> findAllNews(int pageNum,String sname,Date sTime);
	
	int findTotal(String name,Date date);

	int add(News movie);

	int getMovieId(News movie);
	
}
