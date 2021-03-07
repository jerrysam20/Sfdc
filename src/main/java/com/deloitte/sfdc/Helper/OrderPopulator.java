package com.deloitte.sfdc.Helper;

import com.deloitte.sfdc.dto.OrderDTO;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Configuration;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

@Configuration
@EnableAutoConfiguration
public  class OrderPopulator {

    private static final String ORDER_SEQ_KEY = "Order";


    public  OrderDTO populate(OrderDTO orderData) throws Exception {
        Date date = new Date();
        DateFormat dateFormat = new SimpleDateFormat("dd-MMM-yyyy");
        orderData.setOrderDate(dateFormat.format(date));
        orderData.setFormattedAmount(String.valueOf(orderData.getAmount()+"|"+String.valueOf(orderData.getAmountPaid())));
        orderData.setBalanceAmount(orderData.getAmount()-orderData.getAmountPaid());
        return orderData;
    }

}
