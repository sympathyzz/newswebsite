package com.newswebsite.service;

import java.util.List;

import javax.annotation.Resource;

import com.newswebsite.bean.Atype;
import com.newswebsite.bean.Btype;
import com.newswebsite.dao.AtypeMapper;
import com.newswebsite.dao.BtypeMapper;





public interface TypeService {
	Atype findAtypeByTypeID(int typeid);
	
	Btype findBtypeByTypeID(int typeid);
	
	List<Atype> findAllAtype();
	
	List<Btype> findAllBtype();
}
