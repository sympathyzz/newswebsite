package com.newswebsite.bean;

public class Btype {
    private Integer btypeId;

    private String btype;

    private Integer atypeId;

    public Integer getBtypeId() {
        return btypeId;
    }

    public void setBtypeId(Integer btypeId) {
        this.btypeId = btypeId;
    }

    public String getBtype() {
        return btype;
    }

    public void setBtype(String btype) {
        this.btype = btype == null ? null : btype.trim();
    }

    public Integer getAtypeId() {
        return atypeId;
    }

    public void setAtypeId(Integer atypeId) {
        this.atypeId = atypeId;
    }
}