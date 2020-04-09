package com.newswebsite.service;




public interface RedisService {
	
	
	/**
	 * 初始化reids
	 */
	void init();
	
	void flushToMysql();
	
	/**
	 * 电影综合评分
	 * @param id
	 * @return
	 */
	double getAvgScore(int id);
	
	/**
	 * 评论点赞数量
	 * @param commentsId
	 * @return
	 */
	int getCommentAgreeCnt(int commentsId);
	
	/**
	 * 用户是否点赞过这个评论
	 * @param userId
	 * @param commentsId
	 * @return
	 */
	boolean  ifAgree(int userId,int commentsId);
}
