package com.deloitte.sfdc.dto;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "templateCollection")
public class TemplateSkeleton {

	String templateCode;
	String Objectname_id;
	String active_id;
	String triggerType_id,relatedAction_id;
	@Id
	String docId;
	
	public String getTemplateCode() {
		return templateCode;
	}
	public void setTemplateCode(String templateCode) {
		this.templateCode = templateCode;
	}
	public String getName_id() {
		return Objectname_id;
	}
	public void setName_id(String name_id) {
		this.Objectname_id = name_id;
	}
	public String getActive_id() {
		return active_id;
	}
	public void setActive_id(String active_id) {
		this.active_id = active_id;
	}
	public String getTriggerType_id() {
		return triggerType_id;
	}
	public void setTriggerType_id(String triggerType_id) {
		this.triggerType_id = triggerType_id;
	}
	public String getRelatedAction_id() {
		return relatedAction_id;
	}
	public void setRelatedAction_id(String relatedAction_id) {
		this.relatedAction_id = relatedAction_id;
	}
	public String getId() {
		return docId;
	}
	public void setId(String id) {
		this.docId = id;
	}
	
	@Override
	  public String toString() {
	    return String.format(
	        "Template [docId=%s, templateCode='%s', Objectname_id='%s']",
	        docId, templateCode, Objectname_id);
	  }
}
