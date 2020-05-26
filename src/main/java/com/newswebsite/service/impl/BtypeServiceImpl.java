package com.newswebsite.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.newswebsite.bean.Atype;
import com.newswebsite.bean.AtypeExample;
import com.newswebsite.bean.Btype;
import com.newswebsite.bean.BtypeExample;
import com.newswebsite.dao.BtypeMapper;
import com.newswebsite.service.BtypeService;
@Service
public class BtypeServiceImpl implements BtypeService{
	
	
	@Autowired
	BtypeMapper btypeMapper;
	
	@Override
	public List<Btype> getBtypeListByAtypeId(int atypeId) {
		BtypeExample be=new BtypeExample();
		be.createCriteria().andAtypeIdEqualTo(atypeId);
		List<Btype> btypeList=btypeMapper.selectByExample(be);
		return btypeList;
	}

	@Override
	public int getBtypeId(String btype) {
		BtypeExample be=new BtypeExample();
		be.createCriteria().andBtypeEqualTo(btype);
		List<Btype> btypeList=btypeMapper.selectByExample(be);
		return btypeList.get(0).getBtypeId();
	}

}
