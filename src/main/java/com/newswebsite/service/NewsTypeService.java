package com.newswebsite.service;

import java.util.List;

import com.newswebsite.bean.NewsType;



public interface NewsTypeService {
	List<NewsType> findNewsTypeByNewsID(int newsID);
}
