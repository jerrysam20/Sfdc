package com.deloitte.sfdc.interfaces;

import com.deloitte.sfdc.dto.OrderDTO;
import com.deloitte.sfdc.dto.ServiceDTO;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ServiceRepository extends MongoRepository<ServiceDTO, String> {

    public List<ServiceDTO> findServiceOrdersById(String id);

    public List<ServiceDTO> findServiceOrdersByServiceStatus(String serviceStatus);




}