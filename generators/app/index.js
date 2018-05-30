'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: 'input',
        message: 'Your project name',
        name: 'name',
        default: this.appname // Default to current folder name
      },
      {
        type: 'input',
        message: 'Your project Description',
        name: 'desc',
        default: ''
      },
      {
        type: 'input',
        message: 'Version',
        name: 'version',
        default: '1.0.0'
      },
      {
        type: 'input',
        message: 'Default Allowed User Group',
        name: 'defaultAllowedUserGroup',
        default: 'administrators'
      },
      {
        type: 'input',
        message: 'Should Use Burger Menu?',
        name: 'shouldUseMenu',
        default: true
      },
      {
        type: 'input',
        message: 'Your project OAuth2 Client ID',
        name: 'oauthClientId',
        default: ''
      },
      {
        type: 'input',
        message: 'IDP Base URL',
        name: 'idpBaseUrl',
        default: 'https://openstackid-dev.openstack.org'
      },
      {
        type: 'input',
        message: 'API Base URL',
        name: 'apiBaseUrl',
        default: 'https://testresource-server.openstack.org'
      },
      {
        type: 'input',
        message: 'OAuth2 Allowed Scopes',
        name: 'allowedScopes',
        default: 'profile openid'
      },
      {
        type: 'input',
        message: 'Default App URL',
        name: 'defaultAppAuthzUrl',
        default: '/app/index'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(this.templatePath('babelrc'), this.destinationPath('.babelrc'));
    this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
    // Localization files
    this.fs.copy(
      this.templatePath('i18n/_en.json'),
      this.destinationPath('src/i18n/en.json')
    );
    this.fs.copy(
      this.templatePath('i18n/_es.json'),
      this.destinationPath('src/i18n/es.json')
    );
    this.fs.copyTpl(
      this.templatePath('_index.ejs'),
      this.destinationPath('src/index.ejs'),
      {
        name: this.props.name
      }
    );
    this.fs.copy(
      this.templatePath('_webpack.config.js'),
      this.destinationPath('webpack.config.js')
    );
    this.fs.copyTpl(this.templatePath('env'), this.destinationPath('.env'), {
      oauthClientId: this.props.oauthClientId,
      idpBaseUrl: this.props.idpBaseUrl,
      apiBaseUrl: this.props.apiBaseUrl,
      allowedScopes: this.props.allowedScopes
    });

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        name: this.props.name,
        version: this.props.version,
        desc: this.props.desc
      }
    );

    // Boilerplate code
    this.fs.copyTpl(
      this.templatePath('actions/_auth-actions.js'),
      this.destinationPath('src/actions/auth-actions.js'),
      { defaultAllowedUserGroup: this.props.defaultAllowedUserGroup }
    );
    this.fs.copy(
      this.templatePath('actions/_base-actions.js'),
      this.destinationPath('src/actions/base-actions.js')
    );
    this.fs.copy(
      this.templatePath('i18n/_en.json'),
      this.destinationPath('src/i18n/en.json')
    );
    this.fs.copy(
      this.templatePath('i18n/_es.json'),
      this.destinationPath('src/i18n/es.json')
    );
    this.fs.copy(
      this.templatePath('reducers/_auth-reducer.js'),
      this.destinationPath('src/reducers/auth-reducer.js')
    );
    this.fs.copy(
      this.templatePath('reducers/_base-reducer.js'),
      this.destinationPath('src/reducers/base-reducer.js')
    );
    this.fs.copy(
      this.templatePath('utils/_fragment-parser.js'),
      this.destinationPath('src/utils/fragment-parser.js')
    );
    this.fs.copy(
      this.templatePath('utils/_methods.js'),
      this.destinationPath('src/utils/methods.js')
    );
    // Components
    this.fs.copy(
      this.templatePath('components/_auth-button.js'),
      this.destinationPath('src/components/auth-button.js')
    );
    this.fs.copy(
      this.templatePath('components/raw-html/_index.js'),
      this.destinationPath('src/components/raw-html/index.js')
    );
    this.fs.copy(
      this.templatePath('components/nav-menu/_index.js'),
      this.destinationPath('src/components/nav-menu/index.js')
    );
    this.fs.copy(
      this.templatePath('components/nav-menu/_menu-items-definition.js'),
      this.destinationPath('src/components/nav-menu/menu-items-definition.js')
    );
    this.fs.copy(
      this.templatePath('components/nav-menu/_menu-item.js'),
      this.destinationPath('src/components/nav-menu/menu-item.js')
    );
    this.fs.copy(
      this.templatePath('components/nav-menu/_sub-menu-item.js'),
      this.destinationPath('src/components/nav-menu/sub-menu-item.js')
    );

    this.fs.copyTpl(
      this.templatePath('_store.js'),
      this.destinationPath('src/store.js'),
      { name: this.props.name }
    );
    this.fs.copyTpl(this.templatePath('_app.js'), this.destinationPath('src/app.js'), {
      name: this.props.name
    });
    this.fs.copy(this.templatePath('_index.js'), this.destinationPath('src/index.js'));
    this.fs.copy(
      this.templatePath('styles/_app-variables.less'),
      this.destinationPath('src/styles/app-variables.less')
    );
    this.fs.copy(
      this.templatePath('styles/_general.less'),
      this.destinationPath('src/styles/general.less')
    );
    this.fs.copy(
      this.templatePath('styles/_menu.less'),
      this.destinationPath('src/styles/menu.less')
    );
    this.fs.copy(
      this.templatePath('routes/_authorization-callback-route.js'),
      this.destinationPath('src/routes/authorization-callback-route.js')
    );
    this.fs.copy(
      this.templatePath('routes/_authorized-route.js'),
      this.destinationPath('src/routes/authorized-route.js')
    );
    this.fs.copyTpl(
      this.templatePath('routes/_default-route.js'),
      this.destinationPath('src/routes/default-route.js'),
      { defaultAppAuthzUrl: this.props.defaultAppAuthzUrl }
    );
    this.fs.copyTpl(
      this.templatePath('layouts/_primary-layout.js'),
      this.destinationPath('src/layouts/primary-layout.js'),
      { shouldUseMenu: this.props.shouldUseMenu }
    );
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false
    });
  }
};
