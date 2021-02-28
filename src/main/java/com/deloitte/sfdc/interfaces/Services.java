package com.deloitte.sfdc.interfaces;

import com.deloitte.sfdc.dto.OrderDTO;
import com.deloitte.sfdc.dto.UserDTO;

import java.util.List;

public interface Services {

     boolean createUser(UserDTO userData);

    boolean validateUser(UserDTO userData);

    boolean createOrder(OrderDTO orderData);

    List<OrderDTO> getOrders(String orderType, String serviceType);
}
