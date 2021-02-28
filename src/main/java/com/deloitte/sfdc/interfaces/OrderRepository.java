package com.deloitte.sfdc.interfaces;

import com.deloitte.sfdc.dto.OrderDTO;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderRepository extends MongoRepository<OrderDTO, String> {

    public OrderDTO findUserById(String emailId);


}