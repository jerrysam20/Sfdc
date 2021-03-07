package com.deloitte.sfdc.interfaces;

import com.deloitte.sfdc.dto.OrderDTO;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OrderRepository extends MongoRepository<OrderDTO, Long> {


    public List<OrderDTO> findOrdersByOrderStatus(String orderStatus);

    public OrderDTO findOrderById(String id);






}