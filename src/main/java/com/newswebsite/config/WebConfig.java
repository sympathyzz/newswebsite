package com.newswebsite.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

import com.newswebsite.interceptor.UserInterceptor;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    //将tokenInterceptor放入到spring容器中管理
    @Autowired
    public UserInterceptor userInterceptor;

    /*实现此方法添加拦截器
    * addPathPatterns  拦截路径
    * excludePathPatterns() (不拦截的路径数组) 
    * */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        //拦截路径，表示此路径下的所有地址都会先执行此拦截器，通过之后才能访问Controller
        String[] addPathPatterns = {
          "/addComment","/agree","/concelAgree","/wants","/xseat"
        };
        registry.addInterceptor(userInterceptor).addPathPatterns(addPathPatterns);
    }
    
    
//    @Value("${spring.mvc.view.prefix}")
//    private String prefix;
//    
//    
//    @Value("${spring.mvc.view.prefix}")
//    private String suffix;
//    
//    @Value("${spring.mvc.view.view-name}")
//    private String viewNames;
//    
//    @Value("${spring.mvc.view.order}")
//    private int order;
//    
//    @Bean
//    InternalResourceViewResolver JspViewResolver() {
//    	final InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
//    	viewResolver.setPrefix(prefix);
//    	viewResolver.setSuffix(suffix);
//    	viewResolver.setViewNames(viewNames);
//    	viewResolver.setOrder(order);
//    	return viewResolver;
//    }
    
    
}
