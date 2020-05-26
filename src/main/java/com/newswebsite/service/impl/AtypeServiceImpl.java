package com.newswebsite.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.newswebsite.bean.Atype;
import com.newswebsite.bean.AtypeExample;
import com.newswebsite.bean.AtypeExample.Criteria;
import com.newswebsite.dao.AtypeMapper;
import com.newswebsite.service.AtypeService;

@Service
public class AtypeServiceImpl implements AtypeService{
	
	@Autowired
	AtypeMapper atypeMapper;
	
	@Override
	public int getAtypeId(String newsName) {
		AtypeExample ae=new AtypeExample();
		ae.createCriteria().andAtypeEqualTo(newsName);
		List<Atype> atypeList=atypeMapper.selectByExample(ae);
		return atypeList.get(0).getAtypeId();
	}

}
