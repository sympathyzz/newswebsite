package com.newswebsite.service.impl;

import java.io.File;
import java.util.List;

import javax.annotation.Resource;

import com.newswebsite.bean.Atype;
import com.newswebsite.bean.AtypeExample;
import com.newswebsite.bean.Btype;
import com.newswebsite.bean.BtypeExample;
import com.newswebsite.dao.AtypeMapper;
import com.newswebsite.dao.BtypeMapper;
import com.newswebsite.service.TypeService;





public class TypeServiceImpl implements TypeService{
	@Resource
	AtypeMapper am;
	@Resource
	BtypeMapper bm;
	@Override
	public Atype findAtypeByTypeID(int typeid) {
		AtypeExample te = new AtypeExample();
		te.createCriteria().andAtypeIdEqualTo(typeid);
		Atype type = am.selectByPrimaryKey(typeid);
		return type;
	}
	@Override
	public Btype findBtypeByTypeID(int typeid) {
		BtypeExample te = new BtypeExample();
		te.createCriteria().andBtypeIdEqualTo(typeid);
		Btype type = bm.selectByPrimaryKey(typeid);
		return type;
	}
	@Override
	public List<Atype> findAllAtype() {
		List<Atype> list = am.selectByExample(null);
		return list;
	}
	@Override
	public List<Btype> findAllBtype() {
		List<Btype> list = bm.selectByExample(null);
		return list;
	}


}
