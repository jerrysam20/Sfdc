package com.deloitte.sfdc.interfaces;

import com.deloitte.sfdc.dto.OrderDTO;
import com.deloitte.sfdc.dto.ServiceDTO;
import com.deloitte.sfdc.dto.UserDTO;

import java.util.List;

public interface Services {

    boolean createUser(UserDTO userData);

    boolean validateUser(UserDTO userData);

    boolean createOrder(OrderDTO orderData);

    List<OrderDTO> getOrders(String type);

    boolean createServiceOrder(ServiceDTO service);

    List<ServiceDTO> getServiceOrders(String type);
}
