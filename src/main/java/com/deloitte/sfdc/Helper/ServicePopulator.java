package com.deloitte.sfdc.Helper;

import com.deloitte.sfdc.dto.OrderDTO;
import com.deloitte.sfdc.dto.ServiceDTO;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Configuration;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

@Configuration
@EnableAutoConfiguration
public  class ServicePopulator {

    private static final String ORDER_SEQ_KEY = "Order";


    public  ServiceDTO populate(ServiceDTO orderData) throws Exception {
        Date date = new Date();
        DateFormat dateFormat = new SimpleDateFormat("dd-MMM-yyyy");
        orderData.setDate(dateFormat.format(date));
        return orderData;
    }

}
