package com.deloitte.sfdc.interfaces.impl;

import com.deloitte.sfdc.Helper.OrderPopulator;
import com.deloitte.sfdc.Helper.ServicePopulator;
import com.deloitte.sfdc.constants.OrderStatus;
import com.deloitte.sfdc.dto.OrderDTO;
import com.deloitte.sfdc.dto.ServiceDTO;
import com.deloitte.sfdc.dto.UserDTO;
import com.deloitte.sfdc.interfaces.*;
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

    @Autowired
    private SequenceDao sequenceDao;

    OrderPopulator orderPopulator=new OrderPopulator();
    ServicePopulator servicePopulator=new ServicePopulator();

    private static final String ORDER_SEQ_KEY = "Order";
    private static final String SERVICE_SEQ_KEY = "Service";


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
    public boolean createOrder(OrderDTO orderData) throws Exception {
        orderData.setId(sequenceDao.getNextSequenceId(ORDER_SEQ_KEY));
        try {
            orderRepository.save(orderPopulator.populate(orderData));
        } catch (Exception e) {
            return false;
        }
        return true;

    }

    @Override
    public List<OrderDTO> getOrders(String type) {
        List<OrderDTO> orderList = new ArrayList<OrderDTO>();
        if (type.equalsIgnoreCase("pending")) {
            orderList = orderRepository.findOrdersByOrderStatus(OrderStatus.PENDING.toString());
        }
        else if (type.equalsIgnoreCase("complete")) {
            orderList = orderRepository.findOrdersByOrderStatus(OrderStatus.COMPLETE.toString());
        }else {
            orderList = orderRepository.findAll();
        }


        return orderList;
    }

    @Override
    public boolean createServiceOrder(ServiceDTO service) throws Exception {
        service.setId(sequenceDao.getNextSequenceId(SERVICE_SEQ_KEY));
        try {
            serviceRepository.save(servicePopulator.populate(service));
        } catch (Exception e) {
            return false;
        }
        return true;
    }

    @Override
    public List<ServiceDTO> getServiceOrders(String type) {
        return  serviceRepository.findAll();

    }

    @Override
    public OrderDTO getOrder(long orderId) {
        return orderRepository.findOne(orderId);
    }

    @Override
    public boolean deleteOrders() {
        orderRepository.deleteAll();
        serviceRepository.deleteAll();
        return true;
    }

    public static void main(String as[]) throws JsonProcessingException {
        ServiceDTO order=new ServiceDTO();


        ObjectMapper obj=new ObjectMapper();
       System.out.println( obj.writeValueAsString(order));
    }
}
