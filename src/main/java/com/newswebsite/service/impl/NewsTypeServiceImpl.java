package com.newswebsite.service.impl;

import java.util.List;

import javax.annotation.Resource;

import com.newswebsite.bean.NewsType;
import com.newswebsite.bean.NewsTypeExample;
import com.newswebsite.dao.NewsTypeMapper;
import com.newswebsite.service.NewsTypeService;


public class NewsTypeServiceImpl implements NewsTypeService{
	@Resource
	NewsTypeMapper ntm;
	@Override
	public List<NewsType> findNewsTypeByNewsID(int newsID) {
		NewsTypeExample nte=new NewsTypeExample();
		nte.createCriteria().andNewsIdEqualTo(newsID);
		List<NewsType> list = ntm.selectByExample(nte);
		return list;
	}

}
