package com.newswebsite.dao;

import com.newswebsite.bean.Atype;
import com.newswebsite.bean.AtypeExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface AtypeMapper {
    long countByExample(AtypeExample example);

    int deleteByExample(AtypeExample example);

    int deleteByPrimaryKey(Integer atypeId);

    int insert(Atype record);

    int insertSelective(Atype record);

    List<Atype> selectByExample(AtypeExample example);

    Atype selectByPrimaryKey(Integer atypeId);

    int updateByExampleSelective(@Param("record") Atype record, @Param("example") AtypeExample example);

    int updateByExample(@Param("record") Atype record, @Param("example") AtypeExample example);

    int updateByPrimaryKeySelective(Atype record);

    int updateByPrimaryKey(Atype record);
}