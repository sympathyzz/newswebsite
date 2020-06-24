package com.newswebsite.service;

import java.util.List;

import com.newswebsite.bean.NewsType;



public interface NewsTypeService {
	List<NewsType> findNewsTypeByNewsID(int newsID);
	List<NewsType> findNewsIDByAtypeId(int atypeId);
	List<NewsType> findNewsIDByBtypeId(int btypeId);
	void insert(NewsType newsType);
}
