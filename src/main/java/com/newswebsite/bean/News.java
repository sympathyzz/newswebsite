package com.newswebsite.bean;

import java.util.Date;
import java.util.List;

public class News {
    private Integer newsId;

    private String title;

    private String source;

    private Date date;

    private String editor;

    private String author;

    private String content;

    public Integer getNewsId() {
        return newsId;
    }

    public void setNewsId(Integer newsId) {
        this.newsId = newsId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source == null ? null : source.trim();
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getEditor() {
        return editor;
    }

    public void setEditor(String editor) {
        this.editor = editor == null ? null : editor.trim();
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author == null ? null : author.trim();
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content == null ? null : content.trim();
    }
    private List<NewsType> type;
    
    private Atype atype;
    
    private Btype btype;
    
    private List<Atype> listAtype;
    
    private List<Btype> listBtype;

	public List<NewsType> getType() {
		return type;
	}

	public void setType(List<NewsType> type) {
		this.type = type;
	}

	public Atype getAtype() {
		return atype;
	}

	public void setAtype(Atype atype) {
		this.atype = atype;
	}

	public Btype getBtype() {
		return btype;
	}

	public void setBtype(Btype btype) {
		this.btype = btype;
	}

	public List<Atype> getListAtype() {
		return listAtype;
	}

	public void setListAtype(List<Atype> listAtype) {
		this.listAtype = listAtype;
	}

	public List<Btype> getListBtype() {
		return listBtype;
	}

	public void setListBtype(List<Btype> listBtype) {
		this.listBtype = listBtype;
	}
}