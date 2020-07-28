package com.deloitte.sfdc.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.deloitte.sfdc.dto.TemplateSkeleton;

public interface TemplateRepository extends MongoRepository <TemplateSkeleton, String> {
	
	public Optional<TemplateSkeleton> findBydocId(String id);
}
