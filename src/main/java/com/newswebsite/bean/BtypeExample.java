package com.newswebsite.bean;

import java.util.ArrayList;
import java.util.List;

public class BtypeExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public BtypeExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    public String getOrderByClause() {
        return orderByClause;
    }

    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    public boolean isDistinct() {
        return distinct;
    }

    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<Criterion>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andBtypeIdIsNull() {
            addCriterion("btype_id is null");
            return (Criteria) this;
        }

        public Criteria andBtypeIdIsNotNull() {
            addCriterion("btype_id is not null");
            return (Criteria) this;
        }

        public Criteria andBtypeIdEqualTo(Integer value) {
            addCriterion("btype_id =", value, "btypeId");
            return (Criteria) this;
        }

        public Criteria andBtypeIdNotEqualTo(Integer value) {
            addCriterion("btype_id <>", value, "btypeId");
            return (Criteria) this;
        }

        public Criteria andBtypeIdGreaterThan(Integer value) {
            addCriterion("btype_id >", value, "btypeId");
            return (Criteria) this;
        }

        public Criteria andBtypeIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("btype_id >=", value, "btypeId");
            return (Criteria) this;
        }

        public Criteria andBtypeIdLessThan(Integer value) {
            addCriterion("btype_id <", value, "btypeId");
            return (Criteria) this;
        }

        public Criteria andBtypeIdLessThanOrEqualTo(Integer value) {
            addCriterion("btype_id <=", value, "btypeId");
            return (Criteria) this;
        }

        public Criteria andBtypeIdIn(List<Integer> values) {
            addCriterion("btype_id in", values, "btypeId");
            return (Criteria) this;
        }

        public Criteria andBtypeIdNotIn(List<Integer> values) {
            addCriterion("btype_id not in", values, "btypeId");
            return (Criteria) this;
        }

        public Criteria andBtypeIdBetween(Integer value1, Integer value2) {
            addCriterion("btype_id between", value1, value2, "btypeId");
            return (Criteria) this;
        }

        public Criteria andBtypeIdNotBetween(Integer value1, Integer value2) {
            addCriterion("btype_id not between", value1, value2, "btypeId");
            return (Criteria) this;
        }

        public Criteria andBtypeIsNull() {
            addCriterion("btype is null");
            return (Criteria) this;
        }

        public Criteria andBtypeIsNotNull() {
            addCriterion("btype is not null");
            return (Criteria) this;
        }

        public Criteria andBtypeEqualTo(String value) {
            addCriterion("btype =", value, "btype");
            return (Criteria) this;
        }

        public Criteria andBtypeNotEqualTo(String value) {
            addCriterion("btype <>", value, "btype");
            return (Criteria) this;
        }

        public Criteria andBtypeGreaterThan(String value) {
            addCriterion("btype >", value, "btype");
            return (Criteria) this;
        }

        public Criteria andBtypeGreaterThanOrEqualTo(String value) {
            addCriterion("btype >=", value, "btype");
            return (Criteria) this;
        }

        public Criteria andBtypeLessThan(String value) {
            addCriterion("btype <", value, "btype");
            return (Criteria) this;
        }

        public Criteria andBtypeLessThanOrEqualTo(String value) {
            addCriterion("btype <=", value, "btype");
            return (Criteria) this;
        }

        public Criteria andBtypeLike(String value) {
            addCriterion("btype like", value, "btype");
            return (Criteria) this;
        }

        public Criteria andBtypeNotLike(String value) {
            addCriterion("btype not like", value, "btype");
            return (Criteria) this;
        }

        public Criteria andBtypeIn(List<String> values) {
            addCriterion("btype in", values, "btype");
            return (Criteria) this;
        }

        public Criteria andBtypeNotIn(List<String> values) {
            addCriterion("btype not in", values, "btype");
            return (Criteria) this;
        }

        public Criteria andBtypeBetween(String value1, String value2) {
            addCriterion("btype between", value1, value2, "btype");
            return (Criteria) this;
        }

        public Criteria andBtypeNotBetween(String value1, String value2) {
            addCriterion("btype not between", value1, value2, "btype");
            return (Criteria) this;
        }

        public Criteria andAtypeIdIsNull() {
            addCriterion("atype_id is null");
            return (Criteria) this;
        }

        public Criteria andAtypeIdIsNotNull() {
            addCriterion("atype_id is not null");
            return (Criteria) this;
        }

        public Criteria andAtypeIdEqualTo(Integer value) {
            addCriterion("atype_id =", value, "atypeId");
            return (Criteria) this;
        }

        public Criteria andAtypeIdNotEqualTo(Integer value) {
            addCriterion("atype_id <>", value, "atypeId");
            return (Criteria) this;
        }

        public Criteria andAtypeIdGreaterThan(Integer value) {
            addCriterion("atype_id >", value, "atypeId");
            return (Criteria) this;
        }

        public Criteria andAtypeIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("atype_id >=", value, "atypeId");
            return (Criteria) this;
        }

        public Criteria andAtypeIdLessThan(Integer value) {
            addCriterion("atype_id <", value, "atypeId");
            return (Criteria) this;
        }

        public Criteria andAtypeIdLessThanOrEqualTo(Integer value) {
            addCriterion("atype_id <=", value, "atypeId");
            return (Criteria) this;
        }

        public Criteria andAtypeIdIn(List<Integer> values) {
            addCriterion("atype_id in", values, "atypeId");
            return (Criteria) this;
        }

        public Criteria andAtypeIdNotIn(List<Integer> values) {
            addCriterion("atype_id not in", values, "atypeId");
            return (Criteria) this;
        }

        public Criteria andAtypeIdBetween(Integer value1, Integer value2) {
            addCriterion("atype_id between", value1, value2, "atypeId");
            return (Criteria) this;
        }

        public Criteria andAtypeIdNotBetween(Integer value1, Integer value2) {
            addCriterion("atype_id not between", value1, value2, "atypeId");
            return (Criteria) this;
        }
    }

    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}