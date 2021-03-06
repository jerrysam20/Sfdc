package com.deloitte.sfdc.interfaces;

import com.deloitte.sfdc.dto.OrderDTO;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OrderRepository extends MongoRepository<OrderDTO, String> {

    public List<OrderDTO> findUserByEmailId(String emailId);

    public List<OrderDTO> findUserByOrderStatus(String orderStatus);





}