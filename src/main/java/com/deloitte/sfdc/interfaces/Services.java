package com.deloitte.sfdc.interfaces;

import com.deloitte.sfdc.dto.UserDTO;

public interface Services {

     boolean createUser(UserDTO userData);

    boolean validateUser(UserDTO userData);
}
