package com.deloitte.sfdc.dto;


public class SfdcUserInputObject {

	private String object;
	private String ruleName;
	private String description;
	private String workflowDescription;
	private String evalCriteria;
	private String ruleCriteria;
	private String criteria;
	private String specifyWorkflowAction;
	private String addWorkFlowAction;
	private String actionName;
	private String name;
	private String uniqueName;
	private String fieldToUpdate;
	private String reevaluateWorkflowOptions;
	private String newFieldValue;
	private String formulaEditor;

	public String getWorkflowDescription() {
		return workflowDescription;
	}

	public void setWorkflowDescription(String workflowDescription) {
		this.workflowDescription = workflowDescription;
	}

	public String getObject() {
		return object;
	}

	public void setObject(String object) {
		this.object = object;
	}

	public String getRuleName() {
		return ruleName;
	}

	public void setRuleName(String ruleName) {
		this.ruleName = ruleName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getEvalCriteria() {
		return evalCriteria;
	}

	public void setEvalCriteria(String evalCriteria) {
		this.evalCriteria = evalCriteria;
	}

	public String getRuleCriteria() {
		return ruleCriteria;
	}

	public void setRuleCriteria(String ruleCriteria) {
		this.ruleCriteria = ruleCriteria;
	}

	public String getCriteria() {
		return criteria;
	}

	public void setCriteria(String criteria) {
		this.criteria = criteria;
	}

	public String getSpecifyWorkflowAction() {
		return specifyWorkflowAction;
	}

	public void setSpecifyWorkflowAction(String specifyWorkflowAction) {
		this.specifyWorkflowAction = specifyWorkflowAction;
	}

	public String getAddWorkFlowAction() {
		return addWorkFlowAction;
	}

	public void setAddWorkFlowAction(String addWorkFlowAction) {
		this.addWorkFlowAction = addWorkFlowAction;
	}

	public String getActionName() {
		return actionName;
	}

	public void setActionName(String actionName) {
		this.actionName = actionName;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUniqueName() {
		return uniqueName;
	}

	public void setUniqueName(String uniqueName) {
		this.uniqueName = uniqueName;
	}

	public String getFieldToUpdate() {
		return fieldToUpdate;
	}

	public void setFieldToUpdate(String fieldToUpdate) {
		this.fieldToUpdate = fieldToUpdate;
	}

	public String getReevaluateWorkflowOptions() {
		return reevaluateWorkflowOptions;
	}

	public void setReevaluateWorkflowOptions(String reevaluateWorkflowOptions) {
		this.reevaluateWorkflowOptions = reevaluateWorkflowOptions;
	}

	public String getNewFieldValue() {
		return newFieldValue;
	}

	public void setNewFieldValue(String newFieldValue) {
		this.newFieldValue = newFieldValue;
	}

	public String getFormulaEditor() {
		return formulaEditor;
	}

	public void setFormulaEditor(String formulaEditor) {
		this.formulaEditor = formulaEditor;
	}

	@Override
	public String toString() {
		return "SfdcUserInputObject{" +
				"object='" + object + '\'' +
				", ruleName='" + ruleName + '\'' +
				", description='" + description + '\'' +
				", workflowDescription='" + workflowDescription + '\'' +
				", evalCriteria='" + evalCriteria + '\'' +
				", ruleCriteria='" + ruleCriteria + '\'' +
				", criteria='" + criteria + '\'' +
				", specifyWorkflowAction='" + specifyWorkflowAction + '\'' +
				", addWorkFlowAction='" + addWorkFlowAction + '\'' +
				", actionName='" + actionName + '\'' +
				", name='" + name + '\'' +
				", uniqueName='" + uniqueName + '\'' +
				", fieldToUpdate='" + fieldToUpdate + '\'' +
				", reevaluateWorkflowOptions='" + reevaluateWorkflowOptions + '\'' +
				", newFieldValue='" + newFieldValue + '\'' +
				", formulaEditor='" + formulaEditor + '\'' +
				'}';
	}
}
