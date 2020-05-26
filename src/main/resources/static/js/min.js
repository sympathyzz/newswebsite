$(function() {
    function Column0() {
    	$.post("getScheduleNumberData",{},function(t){
        	var myChart = echarts.init(document.getElementById('min10'));
            // 指定图表的配置项和数据
            var option = {
            	title : {
    		        text: '排片数量',
                    subtext: '',
                    y: '10',
                    x:'center'
    		    },
    		    tooltip: {
    		        trigger: 'item',
    		        formatter: "{a} <br/>{b}: {c} ({d}%)"
    		    },
    		    legend: {
    		        orient: 'vertical',
    		        x: '10',
    		        y: '10',
    		        data:t.nameList
    		    },
    		    series: [
    		        {
    		            name:'排片量',
    		            type:'pie',
    		            radius: ['0%','50%'],
    		            avoidLabelOverlap: false,
    		            label: {
    		                normal: {
    		                    show: false,
    		                    position: 'center'
    		                },
    		                emphasis: {
    		                    show: true,
    		                    textStyle: {
    		                        fontSize: '30',
    		                        fontWeight: 'bold'
    		                    }
    		                }
    		            },
    		            labelLine: {
    		                normal: {
    		                    show: false
    		                }
    		            },
    		            data:[
    		               t.valueList
    		            ]
    		        }
    		    ]
    		};
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
    	})

    }
	function Column1() {
		$.post("getScheduleNumberData",{},function(t){
			alert(t.nameList);
			alert(t.valueList);
        	var myChart = echarts.init(document.getElementById('min10'));
            // 指定图表的配置项和数据
            var option = {
            	title : {
    		        text: '排片数量',
                    subtext: '',
                    y: '10',
                    x:'center'
    		    },
    		    tooltip: {
    		        trigger: 'item',
    		        formatter: "{a} <br/>{b}: {c} ({d}%)"
    		    },
    		    legend: {
    		        orient: 'vertical',
    		        x: '10',
    		        y: '10',
    		        data:t.nameList
    		    },
    		    series: [
    		        {
    		            name:'排片量',
    		            type:'pie',
    		            radius: ['0%','50%'],
    		            avoidLabelOverlap: false,
    		            label: {
    		                normal: {
    		                    show: false,
    		                    position: 'center'
    		                },
    		                emphasis: {
    		                    show: true,
    		                    textStyle: {
    		                        fontSize: '30',
    		                        fontWeight: 'bold'
    		                    }
    		                }
    		            },
    		            labelLine: {
    		                normal: {
    		                    show: false
    		                }
    		            },
    		            data:
    		               t.valueList
    		        }
    		    ]
    		};
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
    	})

    }
    function Column2() {
    	var myChart = echarts.init(document.getElementById('min2'));
        // 指定图表的配置项和数据
        var option = {
		    title: {
		        text: '发表时间分布',
                subtext: '',
                y: '10',
                x:'center'
		    },
		    grid:{
                x:60,
                y:50,
                x2:40,
                y2:50,
            },
		    tooltip: {
		        trigger: 'axis'
		    },
		    xAxis:  {
		        type: 'category',
		        boundaryGap: false,
		        axisLabel:{
				     interval:1,
				     rotate:-30,
				     showMaxLabel: true,
				},
		        data: ["1996","1997","1998","1999","2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018"]
		    },
		    yAxis: {
		        type: 'value',
		    },
		    series: [
		        {
		            type:'line',
		            data:[124,167,189,320,307,351,414,464,567,742,928,1139,1339,1761,1885,1881,1889,1907,2144,2048,2001,1696,1180],
		        }
		    ]
		};
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
    function Column3() {
    	var myChart = echarts.init(document.getElementById('min3'));
        // 指定图表的配置项和数据
        var option = {
		    title : {
                text: '学科统计',
                subtext: '',
                y: '10',
                x:'center'
            },
		    tooltip: {
		        trigger: 'axis'
		    },
		    grid:{
                x:60,
                y:50,
                x2:40,
                y2:50,
            },
		    xAxis:  {
		        type: 'category',
		        axisLabel:{
				     interval:0,
				     rotate:-30,
				},
		        data: ['法学','文学','管理学','工学','经济学','理学','教育学','哲学']
		    },
		    yAxis: {
		        type: 'value',
		    },
		    series: [
		        { 
		        	name:'',
		            type:'bar',
		            itemStyle: {   
		                normal:{  
		                    color: function (params){
		                        var colorList = ['#ff7f50','#6495ed','#ff7f50','#6495ed','#ff7f50','#6495ed','#ff7f50','#6495ed'];
		                        return colorList[params.dataIndex];
		                    }
		                },
		            },
		            data:[907,759,3899, 627, 6474 ,622,120, 30],
		        }
		    ]
		};
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
    function Column4() {
    	var myChart = echarts.init(document.getElementById('min4'));
        // 指定图表的配置项和数据
        var option = {
        	title : {
		        text: '重点学科对比',
		        subtext: '',
		        y: '10',
		        x:'center'
		    },
		    grid:{
                x:40,
                y:50,
                x2:100,
                y2:50,
            },
            legend: {
		        orient: 'vertical',
		        x: 'right',
		        y: '40',
		        data:['劳动经济学','应用经济学','统计学','企业管理','会计学','政治经济学','社会保障','行政管理','经济法学','西方经济学']
		    },
		    tooltip : {
            trigger: 'axis',
            	axisPointer: {
                    type: 'cross',
                    label: {
                    backgroundColor: '#337ab7'
                    }
                }
            },
		    xAxis : {
                type : 'category',
                boundaryGap : false,
                axisLabel:{
				     interval:0,
				     rotate:-50,
				},
                data: ["2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018"]
			},
		    yAxis: {
		        type: 'value'
		    },
		    series: [{
		    	name:'劳动经济学',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
		        data: [29,29,36,68,80,161,148,160,136,117,129,138,152,142,122,92],
		    },{
		    	name:'应用经济学',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
		        data: [6,9,14,24,19,19,38,28,41,37,41,36,29,37,36,23],
		    },{
		    	name:'统计学',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
		        data: [5,1,2,3,6,2,6,6,12,11,13,2,6,7,8,4],
		    },{
		    	name:'企业管理',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
		        data: [113,106,118,127,189,233,261,243,241,241,180,206,201,236,184,134],
		    },{
		    	name:'会计学',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
		        data: [2,0,3,2,5,10,9,4,5,2,3,2,3,6,4,4],
		    },{
		    	name:'政治经济学',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
		        data: [0,1,1,2,0,0,2,3,1,1,3,4,1,1,12,3],
		    },{
		    	name:'社会保障',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
		        data: [1,12,26,34,46,64,64,83,67,102,85,77,67,88,53,50],
		    },{
		    	name:'行政管理',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
		        data: [3,7,12,7,16,21,21,24,34,31,30,28,25,20,24,16],
		    },{
		    	name:'经济法学',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
		        data: [18,18,23,12,80,43,65,81,59,84,89,109,78,88,27,66],
		    },{
		    	name:'西方经济学',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
		        data: [2,8,9,4,11,4,8,17,12,14,13,14,18,14,17,8],
		    }]
		};
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
    function Column5() {
    	var myChart = echarts.init(document.getElementById('min5'));
        // 指定图表的配置项和数据
        var option = {
		    title : {
                text: '访问趋势',
                subtext: '',
                y: '10',
                x:'center'
            },
            grid:{
                x:60,
                y:50,
                x2:40,
                y2:50,
            },
		    tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器,坐标轴触发有效
                    type : 'shadow'        // 默认为直线,可选为：'line' | 'shadow'
                }
            },
            xAxis:  {
		        type: 'category',
		        boundaryGap: false,
		        data: ['2018年5月','2018年6月','2018年7月 ','2018年8月','2018年9月','2018年10月','2018年11月']
            },
		    yAxis: {
		        type: 'value',
		    },
		    series: [
		        {
		            type:'line',
		            data:[56,80,150, 100, 130,233, 258],
		        }
		    ]
		};
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
    Column0();
    Column1();
    Column2();
    Column3();
    Column4();
    Column5();
});