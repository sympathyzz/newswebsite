package com.newswebsite.dao;

import com.newswebsite.bean.Comments;
import com.newswebsite.bean.CommentsExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface CommentsMapper {
    long countByExample(CommentsExample example);

    int deleteByExample(CommentsExample example);

    int deleteByPrimaryKey(Integer commentId);

    int insert(Comments record);

    int insertSelective(Comments record);

    List<Comments> selectByExample(CommentsExample example);

    Comments selectByPrimaryKey(Integer commentId);

    int updateByExampleSelective(@Param("record") Comments record, @Param("example") CommentsExample example);

    int updateByExample(@Param("record") Comments record, @Param("example") CommentsExample example);

    int updateByPrimaryKeySelective(Comments record);

    int updateByPrimaryKey(Comments record);
}