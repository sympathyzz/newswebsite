package com.newswebsite.dao;

import com.newswebsite.bean.Btype;
import com.newswebsite.bean.BtypeExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface BtypeMapper {
    long countByExample(BtypeExample example);

    int deleteByExample(BtypeExample example);

    int deleteByPrimaryKey(Integer btypeId);

    int insert(Btype record);

    int insertSelective(Btype record);

    List<Btype> selectByExample(BtypeExample example);

    Btype selectByPrimaryKey(Integer btypeId);

    int updateByExampleSelective(@Param("record") Btype record, @Param("example") BtypeExample example);

    int updateByExample(@Param("record") Btype record, @Param("example") BtypeExample example);

    int updateByPrimaryKeySelective(Btype record);

    int updateByPrimaryKey(Btype record);
}