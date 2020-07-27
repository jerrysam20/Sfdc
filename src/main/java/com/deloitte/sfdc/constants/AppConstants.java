package com.deloitte.sfdc.constants;

import java.util.Arrays;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.regex.Pattern;

public class AppConstants {
	
	public static final String TEMPLATE_FOLDER_NAME = "template";
	public static final Pattern PLACEHOLDER = Pattern.compile("(<([a-z]|[A-Z])+>)+");
	
	//Scenario names
	public static final String VALIDATE_NEW_RECORD_VALUES = "Validate new record values";
	public static final String VALIDATE_NEW_RECORD_VALUES_USING_PARENT = "Validate new record values using parent record";
	
	//Metadata related
	public static final Set<String> IGNORE_OBJECTS_SET = new LinkedHashSet<String>(Arrays.asList("ApexClass",
			"ApexComponent", "ApexEmailNotification", "ApexLog", "ApexPage", "ApexPageInfo", "ApexTestQueueItem",
			"ApexTestResult", "ApexTestResultLimits", "ApexTestRunResult", "ApexTestSuite", "ApexTrigger",
			"AsyncApexJob", "BatchApexErrorEvent", "Audience", "AuraDefinition", "AuraDefinitionBundle",
			"AuraDefinitionBundleInfo", "AuraDefinitionInfo", "AuthConfig", "AuthConfigProviders", "AuthProvider",
			"AuthSession", "BackgroundOperation", "BrandTemplate", "BrandingSet", "BrandingSetProperty",
			"BusinessHours", "BusinessProcess", "Calendar", "CallCenter", "CampaignInfluenceModel", "CaseTeamTemplate",
			"CaseTeamTemplateMember", "CaseTeamTemplateRecord", "CategoryData", "CategoryNode",
			"CategoryNodeLocalization", "ChatterActivity", "ChatterExtension", "ChatterExtensionConfig",
			"ChatterExtensionLocalization", "ClientBrowser", "CorsWhitelistEntry", "CronJobDetail", "CronTrigger",
			"CspTrustedSite", "CurrencyType", "CustomObjectUserLicenseMetrics", "CustomPermission",
			"CustomPermissionDependency", "Dashboard", "DashboardComponent", "FlexQueueItem", "FlowDefinitionView",
			"FlowInterview", "FlowRecordRelation", "FlowStageRelation", "FlowVariableView", "FlowVersionView",
			"GrantedByLicense", "Group", "GroupMember", "Holiday", "Network", "NetworkActivityAudit", "NetworkAffinity",
			"NetworkDiscoverableLogin", "NetworkMember", "NetworkMemberGroup", "NetworkModeration",
			"NetworkPageOverride", "NetworkSelfRegistration", "PermissionSet", "PermissionSetAssignment",
			"PermissionSetLicense", "PermissionSetLicenseAssign", "PermissionSetTabSetting", "PlatformCachePartition",
			"PlatformCachePartitionType", "RecentlyViewed", "Report", "ReputationLevel", "ReputationLevelLocalization",
			"ReputationPointsRule", "SamlSsoConfig", "Scontrol", "ScontrolLocalization", "SearchActivity",
			"SearchLayout", "SearchPromotionRule", "SecureAgentsCluster", "SecurityCustomBaseline",
			"SessionPermSetActivation", "SetupAuditTrail", "SetupEntityAccess", "SlaProcess", "StaticResource",
			"TabDefinition", "WebLink", "VisualforceAccessMetrics", "UserPermissionAccess", "Site", "SiteDetail",
			"SiteIframeWhiteListUrl", "AccountContactRole", "AccountPartner", "AccountTeamMember",
			"ActionLinkGroupTemplate", "ActionLinkTemplate", "AdditionalNumber", "Announcement",
			"AppAnalyticsQueryRequest", "AppDefinition", "AppMenuItem", "AppTabMember", "Approval", "AssetTokenEvent",
			"AssignmentRule", "AsyncOperationEvent", "AsyncOperationStatus", "AttachedContentDocument",
			"AttachedContentNote", "Attachment", "CallCenter", "CampaignInfluence", "CampaignMemberStatus",
			"CaseArticle", "CaseComment", "CaseContactRole", "CaseExternalDocument", "CaseMilestone", "CaseSolution",
			"CaseStatus", "CaseSubjectParticle", "CaseTeamMember", "CaseTeamRole", "CollaborationGroup",
			"CollaborationGroupMember", "CollaborationGroupMemberRequest", "CollaborationGroupRecord",
			"CollaborationInvitation", "ColorDefinition", "CombinedAttachment", "Community", "ConnectedApplication",
			"ContentAsset", "ContentDistribution", "ContentDistributionView", "ContentDocument", "ContentDocumentLink",
			"ContentDocumentSubscription", "ContentFolder", "ContentFolderItem", "ContentFolderLink",
			"ContentFolderMember", "ContentHubItem", "ContentHubRepository", "ContentNote", "ContentNotification",
			"ContentTagSubscription", "ContentUserSubscription", "ContentVersionComment", "ContentVersionRating",
			"ContentWorkspace", "ContentWorkspaceDoc", "ContentWorkspaceMember", "ContentWorkspacePermission",
			"ContentWorkspaceSubscription", "ContractContactRole", "ContractStatus", "CustomBrand", "CustomBrandAsset",
			"CustomHelpMenuItem", "CustomHelpMenuSection", "CustomHttpHeader", "DataAssessmentFieldMetric",
			"DataAssessmentMetric", "DataAssessmentValueMetric", "DataIntegrationRecordPurchasePermission",
			"DataStatistics", "DataType", "DatacloudAddress", "DatedConversionRate", "DeclinedEventRelation",
			"Document", "DocumentAttachmentMap", "Domain", "DomainSite", "DuplicateRule", "EmailCapture",
			"EmailDomainFilter", "EmailDomainKey", "EmailMessageRelation", "EmailRelay", "EmailServicesAddress",
			"EmailServicesFunction", "EmailStatus", "EmailTemplate", "EmbeddedServiceDetail", "EmbeddedServiceLabel",
			"EnhancedLetterhead", "EntitlementContact", "EntitlementTemplate", "EntityDefinition", "EntityMilestone",
			"EntityParticle", "EntitySubscription", "EventBusSubscriber", "EventLogFile", "EventRelation",
			"EventWhoRelation", "ExpressionFilter", "ExpressionFilterCriteria", "ExternalDataSource",
			"ExternalDataUserAuth", "ExternalSocialAccount", "FieldDefinition", "FieldPermissions",
			"FieldSecurityClassification", "FileSearchActivity", "FiscalYearSettings", "Folder",
			"FolderedContentDocument", "IconDefinition", "Idea", "IdeaComment", "IdpEventLog", "IframeWhiteListUrl",
			"InstalledMobileApp", "KnowledgeArticle", "KnowledgeArticleVersion", "KnowledgeArticleViewStat",
			"KnowledgeArticleVoteStat", "Knowledge__DataCategorySelection", "Knowledge__ViewStat",
			"Knowledge__VoteStat", "Knowledge__ka", "KnowledgeableUser", "LeadStatus", "LightningExperienceTheme",
			"LinkedArticle", "ListEmail", "ListEmailIndividualRecipient", "ListEmailRecipientSource", "ListView",
			"ListViewChart", "ListViewChartInstance", "LoginGeo", "LoginIp", "LogoutEventStream",
			"LookedUpFromActivity", "MacroInstruction", "MailmergeTemplate", "MatchingRule", "MatchingRuleItem",
			"MilestoneType", "MyDomainDiscoverableLogin", "Name", "NamedCredential", "NavigationLinkSet",
			"NavigationMenuItem", "NavigationMenuItemLocalization", "Note", "NoteAndAttachment", "OauthCustomScope",
			"OauthToken", "ObjectPermissions", "OnboardingMetrics", "OpenActivity", "OpportunityCompetitor",
			"OpportunityContactRole", "OpportunityPartner", "OpportunityStage", "OrderStatus",
			"OrgLifecycleNotification", "OrgWideEmailAddress", "Organization", "OutgoingEmail", "OutgoingEmailRelation",
			"OwnedContentDocument", "OwnerChangeOptionInfo", "PackageLicense", "Partner", "PartnerRole", "Period",
			"PicklistValueInfo", "PlatformAction", "PlatformStatusAlertEvent", "ProcessDefinition", "ProcessInstance",
			"ProcessInstanceNode", "ProcessInstanceStep", "ProcessInstanceWorkitem", "ProcessNode",
			"ProductEntitlementTemplate", "Profile", "ProfileSkill", "ProfileSkillEndorsement", "ProfileSkillUser",
			"Prompt", "PromptAction", "PromptVersion", "Publisher", "PushTopic", "QueueSobject", "QuickText",
			"QuoteDocument", "QuoteTemplateRichTextData", "RecordAction", "RecordType", "RecordTypeLocalization",
			"RelationshipDomain", "RelationshipInfo", "SocialPersona", "SocialPost", "SolutionStatus",
			"SourceChangeNotification", "Stamp", "StampAssignment", "StampLocalization", "StreamingChannel",
			"SurveyEmailBranding", "SurveyPage", "SurveyQuestion", "SurveyQuestionChoice", "SurveyQuestionResponse",
			"SurveyQuestionScore", "SurveyVersion", "TaskPriority", "TaskRelation", "TaskStatus", "TaskWhoRelation",
			"TenantUsageEntitlement", "TestSuiteMembership", "ThirdPartyAccountLink", "TodayGoal", "Topic",
			"TopicAssignment", "TopicLocalization", "TopicUserEvent", "UndecidedEventRelation", "UserAccountTeamMember",
			"UserAppInfo", "UserAppMenuCustomization", "UserAppMenuItem", "UserCustomBadge",
			"UserCustomBadgeLocalization", "UserEmailPreferredPerson", "UserEntityAccess", "UserFieldAccess",
			"UserLicense", "UserListView", "UserListViewCriterion", "UserLogin", "UserPackageLicense", "UserPreference",
			"UserProvAccount", "UserProvAccountStaging", "UserProvMockTarget", "UserProvisioningConfig",
			"UserProvisioningLog", "UserRecordAccess", "UserRole", "UserTeamMember", "VisibilityChangeNotification",
			"WaveAutoInstallRequest", "WaveCompatibilityCheckItem", "WebLinkLocalization", "WorkAccess",
			"WorkBadgeDefinition", "WorkOrder", "WorkOrderLineItem", "WorkOrderLineItemStatus", "WorkOrderStatus"));

	public static final String ENDS_WITH_MDT = "__mdt";
	public static final String ENDS_WITH_SHARE = "share";
	public static final String ENDS_WITH_HISTORY = "history";
	public static final String ENDS_WITH_FEED = "feed";
	public static final String ENDS_WITH_CHANGE_EVENT = "changeevent";
	public static final String ENDS_WITH_E = "__e";
	
	public static final Set<String> IGNORE_FIELDS_SET = new LinkedHashSet<String>(
			Arrays.asList("MasterRecordId"));

}
