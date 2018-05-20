'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-openstack-ui-starter-project:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
      oauthClientId: 'testClientId',
      idpBaseUrl: 'https://openstackid-dev.openstack.org',
      apiBaseUrl: 'https://testresource-server.openstack.org',
      allowedScopes:
        'https://testresource-server.openstack.org/scopes1 https://testresource-server.openstack.org/scopes2'
    });
  });

  it('creates files', () => {
    assert.file(['.babelrc', '.env']);
    assert.fileContent('.env', 'OAUTH2_CLIENT_ID=testClientId');
    assert.fileContent('.env', 'IDP_BASE_URL=https://openstackid-dev.openstack.org');
    assert.fileContent('.env', 'API_BASE_URL=https://testresource-server.openstack.org');
    assert.fileContent(
      '.env',
      'SCOPES="https://testresource-server.openstack.org/scopes1 https://testresource-server.openstack.org/scopes2"'
    );
  });
});
