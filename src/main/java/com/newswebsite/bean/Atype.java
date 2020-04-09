package com.newswebsite.bean;

public class Atype {
    private Integer atypeId;

    private String atype;

    public Integer getAtypeId() {
        return atypeId;
    }

    public void setAtypeId(Integer atypeId) {
        this.atypeId = atypeId;
    }

    public String getAtype() {
        return atype;
    }

    public void setAtype(String atype) {
        this.atype = atype == null ? null : atype.trim();
    }
}