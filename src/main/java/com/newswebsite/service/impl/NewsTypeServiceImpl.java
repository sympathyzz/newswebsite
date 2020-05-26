package com.newswebsite.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.newswebsite.bean.NewsType;
import com.newswebsite.bean.NewsTypeExample;
import com.newswebsite.dao.NewsTypeMapper;
import com.newswebsite.service.NewsTypeService;

@Service
public class NewsTypeServiceImpl implements NewsTypeService{
	@Autowired
	NewsTypeMapper ntm;
	
	@Override
	public List<NewsType> findNewsTypeByNewsID(int newsID) {
		NewsTypeExample nte=new NewsTypeExample();
		nte.createCriteria().andNewsIdEqualTo(newsID);
		List<NewsType> list = ntm.selectByExample(nte);
		return list;
	}
	@Override
	public List<NewsType> findNewsIDByAtypeId(int atypeId) {
		NewsTypeExample nte=new NewsTypeExample();
		nte.createCriteria().andAtypeIdEqualTo(atypeId);
		List<NewsType> list = ntm.selectByExample(nte);
		System.out.println(list.size());
		return list;
	}
	@Override
	public List<NewsType> findNewsIDByBtypeId(int btypeId) {
		NewsTypeExample nte=new NewsTypeExample();
		nte.createCriteria().andBtypeIdEqualTo(btypeId);
		List<NewsType> list = ntm.selectByExample(nte);
		return list;
	}
	

}
