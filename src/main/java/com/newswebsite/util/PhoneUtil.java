package com.newswebsite.util;

import com.aliyuncs.CommonRequest;
import com.aliyuncs.CommonResponse;
import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.IAcsClient;
import com.aliyuncs.exceptions.ServerException;
import com.aliyuncs.http.MethodType;
import com.aliyuncs.profile.DefaultProfile;

public class PhoneUtil {

	public static String sendPhoneCode(String phoneNumber, String c) throws com.aliyuncs.exceptions.ClientException {
		DefaultProfile profile = DefaultProfile.getProfile("cn-hangzhou", "LTAIN8rgz7YaooVv",
				"5RRHHDkU5qsjTS3c14Pps26nR0pLco");
		IAcsClient client = new DefaultAcsClient(profile);

		CommonRequest request = new CommonRequest();
		// request.setProtocol(ProtocolType.HTTPS);
		request.setMethod(MethodType.POST);
		request.setDomain("dysmsapi.aliyuncs.com");
		request.setVersion("2017-05-25");
		request.setAction("SendSms");
		request.putQueryParameter("RegionId", "cn-hangzhou");
		request.putQueryParameter("PhoneNumbers", phoneNumber);
		request.putQueryParameter("SignName", "bbs科技论坛");
		request.putQueryParameter("TemplateCode", "SMS_160577893");
		String code = "code";
		request.putQueryParameter("TemplateParam", "{" + code + ":" + c + "}");
		try {
			CommonResponse response = client.getCommonResponse(request);
			System.out.println(response.getData());
		} catch (ServerException e) {
			c = "-1";
		} catch (Exception e) {
			c = "-1";
		}
		return c;
	}
}
