package com.newswebsite.config;
import java.io.FileWriter;

import java.io.IOException;
 
public class AlipayConfig {
    // 应用ID,您的APPID，收款账号既是您的APPID对应支付宝账号
	public static String app_id = "2016100100641705";
 
 // 商户私钥，您的PKCS8格式RSA2私钥
    public static String merchant_private_key = "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCA9vFQ4tHrNYnE79nH6uiHdmJ5/FT3So0VpmgyKUQMvml2HZuH2HYYKXzXJeeaO57dcl2ZmmUSsw/txHYsAvIae90aqUM0YuLk1VmcMLE33ILPYGeDqMs4cnoVbuxCuKbXESq0AMLx06q6vnJNuaMJDEB9Sob4hPfHoEMqIODTrWMNu6pRG/XwqH/FjHBMm0FmFE29J5BNfJT5068aCQduvoQZDJSN6Egv7uck9csF21udRIFns8zfhFONKLSeYwf756gaYuDNrr/C4m82x0ALwImyuEa2w4M+JdynyLIixA4ELTCjo3BIbktQwp5ee/wUobEh6EKOnBv92bwHuSIrAgMBAAECggEAWbt47O7lYOM/mOfKgG/Sm26j1nzcIbSdthKzLTPJRZS3jJfNQBg9E1LKqmiVXZteTnbk6Zuj9/7fdnDcSINEMWk9zu8285xagx5v212F8XhdDC3n2JP50qzUhVVIzqPscnhfXh+phNniUU1x+uLPrdv4gzT39LOQNDYuhYGa7a0Ryk9CRWm5spu1vi0kbeIQKHVt+894viLUGUguu+Y4QSKRK5XtoRvqL9wMNpe0UisG+pzoxMotlVJR5QEXvJnURpInq+4x4oWVEUWJqkELmVNWzr1TaBRGSlR8eY2qJWxwfMtVsFX8sCe9temTm0TM0Ghcy5K1TRhmgs5q0teyAQKBgQDqVblvbVn90uuzlZMHR0gF84qD6PdaMrjezTCOCV9ut0xbOS3RbNiMSbGPeuAN8cUlOL1gQ7JfyL0py2IcM0g/u3gQh0UT2gm9O66+/4YImvgM+1uPoZjrdE4VyKkW/ti8l/MP2JMaOn0SY9naMMovYD+yUr7sZoIDZ+J3YzQxkwKBgQCM40xawEypz0pQcYetfrtCkwX6xrqa/a+rDtYawSPTD67HPt1c9YhlEBAXyMhtnj2YFxPGloPtinj5qOCprXnmyjDQiMDvK741PZN4QZ1A/lpFjWQRmHJfNPFtr9GeFlGYVRNmV3vfc5lLzUAFuSUWx9h9WZV6/F7KpR5a6X2MCQKBgQDTTP9L2YfXF9TPd2U/n+fy7dsN/QjlvWz0AoPw38S82e2xKEsHV6WgQmcooLzd9g819AbXgdObCTCBOlK6aQeR6GJoTQFd2DMF/oYg1dovckWPtyulxSpVzecHP4wxHxWiYUWcGUbz1J+o8H6lf28g7yIgkvpzwi8kEQ2lZ7/NnwKBgD+zhhKCYCdnUnKM4ovPgVvYnhuFP1pU2di+HJB8Q3Zq4Nu10OD3I3SOjrgyUG0/3xmlVYu1AnGk6o33jZ0qkrOHOAsRyipZ3Oa1sLfu8uswFiDcjSJni08A4Sh3FpAkB0CZNuxPIfMmkWl0pD3yOJLUSU5j8vJoqXN2tQLmD54BAoGAaq8VvDpv5hOD+LHp6dRq+K1rD2eq39JPzoTK+3LsE2QkxWRWTmxRY/ByRdPg6EmJK9crLCb3uygoP4Y1U6Wf5bRuVbK19Wn4RUnSIu8+71KVxOe+QLmqzLjvu04WTQ8YBemutIs8qNuDEQSys8sOVgzFqGzOQJI+7PfB7M6D1ds=";
	
	// 支付宝公钥,查看地址：https://openhome.alipay.com/platform/keyManage.htm 对应APPID下的支付宝公钥。
    public static String alipay_public_key = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgPbxUOLR6zWJxO/Zx+roh3ZiefxU90qNFaZoMilEDL5pdh2bh9h2GCl81yXnmjue3XJdmZplErMP7cR2LALyGnvdGqlDNGLi5NVZnDCxN9yCz2Bng6jLOHJ6FW7sQrim1xEqtADC8dOqur5yTbmjCQxAfUqG+IT3x6BDKiDg061jDbuqURv18Kh/xYxwTJtBZhRNvSeQTXyU+dOvGgkHbr6EGQyUjehIL+7nJPXLBdtbnUSBZ7PM34RTjSi0nmMH++eoGmLgza6/wuJvNsdAC8CJsrhGtsODPiXcp8iyIsQOBC0wo6NwSG5LUMKeXnv8FKGxIehCjpwb/dm8B7kiKwIDAQAB";

    // 服务器异步通知页面路径  需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
    public static String notify_url = "http://localhost/notify";
 
    // 页面跳转同步通知页面路径 需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
    public static String return_url = "http://localhost/returnUrl";
 
    // 签名方式
    public static String sign_type = "RSA2";
 
    // 字符编码格式
    public static String charset = "utf-8";
 
    // 支付宝网关
    public static String gatewayUrl = "https://openapi.alipaydev.com/gateway.do";
 
    // 支付宝网关
    public static String log_path = "D:\\";
 
 
//↑↑↑↑↑↑↑↑↑↑请在这里配置您的基本信息↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
 
    /**
     * 写日志，方便测试（看网站需求，也可以改成把记录存入数据库）
     * @param sWord 要写入日志里的文本内容
     */
    public static void logResult(String sWord) {
        FileWriter writer = null;
        try {
            writer = new FileWriter(log_path + "alipay_log_" + System.currentTimeMillis()+".txt");
            writer.write(sWord);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (writer != null) {
                try {
                    writer.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
