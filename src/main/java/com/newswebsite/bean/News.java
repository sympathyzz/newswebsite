package com.newswebsite.bean;

import java.util.Date;
import java.util.List;



public class News {
    private Integer newsId;

    private String title;

    private String from;

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

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from == null ? null : from.trim();
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
    
    private Atype aType;
    private Btype bType;
    private List<NewsType> listaType;
    private List<NewsType> listbType;

	public List<NewsType> getType() {
		return type;
	}

	public void setType(List<NewsType> type) {
		this.type = type;
	}

	public Atype getaType() {
		return aType;
	}

	public void setaType(Atype aType) {
		this.aType = aType;
	}

	public Btype getbType() {
		return bType;
	}

	public void setbType(Btype bType) {
		this.bType = bType;
	}

	public List<NewsType> getListaType() {
		return listaType;
	}

	public void setListaType(List<NewsType> listaType) {
		this.listaType = listaType;
	}

	public List<NewsType> getListbType() {
		return listbType;
	}

	public void setListbType(List<NewsType> listbType) {
		this.listbType = listbType;
	}

	@Override
	public String toString() {
		return "News [newsId=" + newsId + ", title=" + title + ", from=" + from + ", date=" + date + ", editor="
				+ editor + ", author=" + author + ", content=" + content + ", type=" + type + ", aType=" + aType
				+ ", bType=" + bType + ", listaType=" + listaType + ", listbType=" + listbType + "]";
	}
    
    
    
}