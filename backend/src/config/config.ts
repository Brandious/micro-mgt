export const config = {
  consumerKey: process.env.JIRA_CONSUMER_KEY || 'micro-mgt',
  consumerPrivateKeyFile: '/src/keys/jira_privatekey.pem',
  jiraUrl: process.env.JIRA_URL || 'https://micro-mgt.atlassian.net',
};
