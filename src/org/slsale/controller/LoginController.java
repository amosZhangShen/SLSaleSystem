package org.slsale.controller;

import java.util.Date;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.slsale.common.Constants;
import org.slsale.pojo.User;
import org.slsale.service.user.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author amoszhangshen
 *	登录验证
 */
@Controller
public class LoginController {
	private Logger logger = Logger.getLogger(LoginController.class);
	private UserService userService;
	@Resource(name = "userService")
	public void setUserService(UserService userService) {
		this.userService = userService;
	}
	
	/**
	 * 验证登录
	 * @param user 
	 * @param session
	 * @return
	 */
	@RequestMapping("/login.do")
	@ResponseBody
	public String login(User user, HttpSession session){
		// 参数为空
		if(null != user) {
			return "nodata";
		}else {
			try{
				if(userService.loginCodeIsExit(user) == 0) {
					// 账号不存在
					return "nologincode";
				} else {
					User _user = userService.getLoginUser(user);
					if(null != _user) {
						// 成功
						session.setAttribute(Constants.SESSION_USER, _user);
						// 更新当前用户登录的lastLoginTime
						_user.setLastLoginTime(new Date());
						userService.modifyUser(_user);
						return "success";
					} else {
						// 密码错误
						return "pwderror";
					}
				}
			} catch(Exception e) {
				return "failed";
			}
		}
	}
	/**
	 * 跳转门户页面
	 * @param session 获取登录对象
	 * @return
	 */
	@RequestMapping("/main.do")
	public String main(HttpSession session) {
		User currentUser = (User)session.getAttribute(Constants.SESSION_USER);
		logger.debug("main====================");
		return "";
	}
	
}
