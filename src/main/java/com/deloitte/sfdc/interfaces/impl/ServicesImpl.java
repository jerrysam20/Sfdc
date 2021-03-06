package com.deloitte.sfdc.interfaces.impl;

import com.deloitte.sfdc.constants.OrderStatus;
import com.deloitte.sfdc.dto.OrderDTO;
import com.deloitte.sfdc.dto.ProductDTO;
import com.deloitte.sfdc.dto.ServiceDTO;
import com.deloitte.sfdc.dto.UserDTO;
import com.deloitte.sfdc.interfaces.MongoInterface;
import com.deloitte.sfdc.interfaces.OrderRepository;
import com.deloitte.sfdc.interfaces.ServiceRepository;
import com.deloitte.sfdc.interfaces.Services;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;


@Configuration
@EnableAutoConfiguration
public class ServicesImpl implements Services {
    @Autowired
    private MongoInterface repository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ServiceRepository serviceRepository;


    @Override
    public boolean createUser(UserDTO userData) {

        try {
            repository.save(userData);
        } catch (Exception e) {
            return false;
        }

        return true;


    }

    @Override
    public boolean validateUser(UserDTO userData) {
        UserDTO data = null;
        if (null != userData && StringUtils.isNotBlank(userData.getId()) && StringUtils.isNotBlank(userData.getPassword())) {
            data = repository.findUserById(userData.getId());
            if (null != data && StringUtils.equals(data.getPassword(), userData.getPassword())) {
                return true;
            }
        }
        return false;
    }

    @Override
    public boolean createOrder(OrderDTO orderData) {
        try {
            orderRepository.save(orderData);
        } catch (Exception e) {
            return false;
        }
        return true;

    }

    @Override
    public List<OrderDTO> getOrders(String type) {
        List<OrderDTO> orderList = new ArrayList<OrderDTO>();
        if (type.equalsIgnoreCase("pendingOrders")) {
            orderList = orderRepository.findUserByOrderStatus(OrderStatus.PENDING.toString());
        } else {
            orderList = orderRepository.findAll();
        }


        return orderList;
    }

    @Override
    public boolean createServiceOrder(ServiceDTO service) {
        try {
            serviceRepository.save(service);
        } catch (Exception e) {
            return false;
        }
        return true;
    }

    @Override
    public List<ServiceDTO> getServiceOrders(String type) {
        return  serviceRepository.findAll();

    }

    public static void main(String as[]) throws JsonProcessingException {
        ServiceDTO order=new ServiceDTO();


        ObjectMapper obj=new ObjectMapper();
       System.out.println( obj.writeValueAsString(order));
    }
}
