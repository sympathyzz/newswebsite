package com.newswebsite.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.newswebsite.bean.News;
import com.newswebsite.bean.NewsExample;
import com.newswebsite.bean.NewsExample.Criteria;
import com.newswebsite.bean.NewsType;
import com.newswebsite.dao.NewsMapper;
import com.newswebsite.dao.NewsTypeMapper;
import com.newswebsite.service.NewsService;
import com.newswebsite.service.NewsTypeService;



@Service
public class NewsServiceImpl implements NewsService{
	@Autowired
	NewsMapper newsMapper;
	
	@Autowired
	NewsTypeMapper newsTypeMapper;
	
	@Resource
	NewsTypeService newsTypeService;
	public PageInfo<News> findAllNews(int pageNum,String sname,Date sTime){
		PageHelper.startPage(pageNum, 5);
		NewsExample me = new NewsExample();
		List<News> lm = new ArrayList<>();
		if ((sname != null && sname.trim().length() > 0) || sTime != null) {
			Criteria createCriteria = me.createCriteria();
			if (sname != null && sname.trim().length() > 0) {
				createCriteria.andTitleLike("%" + sname + "%");
			}
			if (sTime != null) {
				createCriteria.andDateEqualTo(sTime);
			}
			lm = newsMapper.selectByExampleWithBLOBs(me);

			for (News news : lm) {
				List<NewsType> findMovieTypeByMovieID = newsTypeService.findNewsTypeByNewsID(news.getNewsId());
				news.setType(findMovieTypeByMovieID);
			}
		} else {
			lm = newsMapper.selectByExampleWithBLOBs(null);
		}
		for (News news : lm) {
			List<NewsType> findMovieTypeByMovieID = newsTypeService.findNewsTypeByNewsID(news.getNewsId());
			news.setType(findMovieTypeByMovieID);
		}
		PageInfo<News> list = new PageInfo<>(lm);
		return list;
	}
	@Override
	public int findTotal(String sname, Date date) {
		List<News> lm = new ArrayList<>();
		if ((sname == null || sname.trim().length() == 0) && date == null) {
			lm = newsMapper.selectByExample(null);
		} else {
			NewsExample me = new NewsExample();
			Criteria createCriteria = me.createCriteria();
			if (sname != null && sname.trim().length() > 0) {
				createCriteria.andTitleLike("%" + sname + "%");
			}
			if (date != null) {
				createCriteria.andDateEqualTo(date);
			}
			lm = newsMapper.selectByExample(me);
		}

		return lm.size();
	}
	
	@Override
	public int add(News movie) {
		int insert = newsMapper.insert(movie);
		return insert;
	}
	
	@Override
	public int getMovieId(News movie) {
		NewsExample me = new NewsExample();
		me.createCriteria().andTitleEqualTo(movie.getTitle());
		List<News> selectByExample = newsMapper.selectByExample(me);
		if (selectByExample.size() > 0) {
			return selectByExample.get(0).getNewsId();
		} else {
			return 0;
		}
	}
}
