package org.slsale.service.user;

import org.slsale.pojo.User;
import org.springframework.stereotype.Service;
@Service("userService")
public interface UserService {
	public User getLoginUser(User user) throws Exception;
	public int loginCodeIsExit(User user) throws Exception;
	public int modifyUser(User user) throws Exception;
}
