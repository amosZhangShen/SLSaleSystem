package org.slsale.dao.user;

import org.slsale.pojo.User;
import org.springframework.stereotype.Repository;

@Repository(value = "userMapper")
public interface UserMapper {
	User getLoginUser(User user) throws Exception;
	int loginCodeIsExit(User user) throws Exception;
	int modifyUser(User user) throws Exception;
}
