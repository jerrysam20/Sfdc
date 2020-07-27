package com.deloitte.sfdc.connector;

import java.util.ArrayList;
import java.util.List;

import com.deloitte.sfdc.constants.AppConstants;
import com.sforce.soap.partner.DescribeGlobalResult;
import com.sforce.soap.partner.DescribeSObjectResult;
import com.sforce.soap.partner.Field;
import com.sforce.soap.partner.LoginResult;
import com.sforce.soap.partner.PartnerConnection;
import com.sforce.soap.tooling.Connector;
import com.sforce.soap.tooling.ToolingConnection;
import com.sforce.ws.ConnectionException;
import com.sforce.ws.ConnectorConfig;

/**
 * Used to establish connection to Salesforce Org and provides utility methods
 * to fetch metadata
 * 
 * @author prasbanerjee
 *
 */
public class SalesforceOrgConnector {

	private PartnerConnection partnerConnection;
	private ToolingConnection toolingConnection;
	DescribeGlobalResult partnerGlobalDescribe;
	private String username;
	private String password;
	private String url;
	private List<String> sObjectsList = new ArrayList<String>();

	/**
	 * Used to login to Salesforce Org
	 * @param username
	 * @param password
	 * @param url
	 * @throws Exception
	 */
	public void login(String username, String password, String url) throws Exception {
		this.username = username;
		this.password = password;
		// url needs to be test.salesforce.com or login.salesforce.com
		this.url = "https://" + url + "/services/Soap/u/49.0";
		// 1. Establish partner connection.
		ConnectorConfig partnerConfig = new ConnectorConfig();
		partnerConfig.setAuthEndpoint(url);
		partnerConfig.setServiceEndpoint(url);
		partnerConfig.setUsername(username);
		partnerConfig.setPassword(password);
		partnerConnection = new PartnerConnection(partnerConfig);
		LoginResult loginResult = partnerConnection.login(username, password);
		partnerGlobalDescribe = partnerConnection.describeGlobal();

		// 2. Establish tooling connection.
		ConnectorConfig toolingConfig = new ConnectorConfig();
		toolingConfig.setSessionId(loginResult.getSessionId());
		toolingConfig.setAuthEndpoint(partnerConfig.getAuthEndpoint().replace("Soap/u", "Soap/T"));
		toolingConfig.setServiceEndpoint(partnerConfig.getServiceEndpoint().replace("Soap/u", "Soap/T"));

		toolingConnection = Connector.newConnection(toolingConfig);
	}

	/**
	 * Logs out from Salesforce Org
	 * @throws ConnectionException
	 */
	public void logout() throws ConnectionException {
		partnerConnection.logout();
	}

	/**
	 * Fetches list of all avilable objects in Salesforce Org
	 * @return
	 */
	public List<String> getSObjectNames() {
		for (int i = 0; i < partnerGlobalDescribe.getSobjects().length; i++) {
			String objectName = partnerGlobalDescribe.getSobjects()[i].getName();
			if (objectName.toLowerCase().endsWith(AppConstants.ENDS_WITH_MDT)
					|| objectName.toLowerCase().endsWith(AppConstants.ENDS_WITH_SHARE)
					|| objectName.toLowerCase().endsWith(AppConstants.ENDS_WITH_CHANGE_EVENT)
					|| objectName.toLowerCase().endsWith(AppConstants.ENDS_WITH_HISTORY)
					|| objectName.toLowerCase().endsWith(AppConstants.ENDS_WITH_FEED)
					|| objectName.toLowerCase().endsWith(AppConstants.ENDS_WITH_E)) {
				continue;
			}
			sObjectsList.add(partnerGlobalDescribe.getSobjects()[i].getName());
		}
		sObjectsList.removeAll(AppConstants.IGNORE_OBJECTS_SET);
		System.out.println("SObjects: " + sObjectsList);
		return sObjectsList;
	}

	/**
	 * Fetchs list of all available fields for a SObject
	 * @param objectName
	 * @return
	 * @throws ConnectionException
	 */
	public List<String> getObjectFields(String objectName) throws ConnectionException {
		List<String> fieldsList = new ArrayList<String>();
		DescribeSObjectResult partnerGlobalDescribeForFields = partnerConnection.describeSObject(objectName);
		for (int j = 0; j < partnerGlobalDescribeForFields.getFields().length; j++) {
			Field field = partnerGlobalDescribeForFields.getFields()[j];
			if (!AppConstants.IGNORE_FIELDS_SET.contains(field.getName())) {
				fieldsList.add(field.getName());
			}
		}
		System.out.println("Fields: " + fieldsList);
		return fieldsList;
	}

}
