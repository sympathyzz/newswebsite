package com.newswebsite.service;

import java.util.List;

import com.newswebsite.bean.Btype;

public interface BtypeService {
	List<Btype> getBtypeListByAtypeId(int atypeId);

	int getBtypeId(String btype);
}
