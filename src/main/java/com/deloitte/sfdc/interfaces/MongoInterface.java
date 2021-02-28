package com.deloitte.sfdc.interfaces;

import com.deloitte.sfdc.dto.UserDTO;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MongoInterface extends MongoRepository<UserDTO, String> {

    public UserDTO findUserById(String emailId);


}