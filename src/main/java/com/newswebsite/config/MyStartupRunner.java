package com.newswebsite.config;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import com.newswebsite.service.RedisService;

import java.util.List;
 
import static java.util.concurrent.TimeUnit.SECONDS;
 
/**
 * @Auther: Jhon Li
 * @Date: 2018/12/8 09:57
 * @Description:
 */
@Component
public class MyStartupRunner implements CommandLineRunner {
 
	@Autowired
	RedisService redisServie;
    /**
     * redis初始化数据
     */
    @Override
    public void run(String... args) throws Exception {
    	redisServie.init();
    }
}
