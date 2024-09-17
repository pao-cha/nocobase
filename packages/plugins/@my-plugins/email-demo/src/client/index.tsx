/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Plugin } from '@nocobase/client';
// @ts-ignore
import { name } from '../../package.json';
import { EmailSettingsForm } from './EmailSettingsForm';
import { EmailSettingsFormPage } from './EmailSettingsFormPage';
import { EmailSettingsFormProvider } from './EmailSettingsFormProvider';

export class EmailSettingFormClient extends Plugin {
  async load() {
    this.app.pluginSettingsManager.add(name, {
      title: 'Plugin Settings Form',
      icon: 'FormOutlined',
      Component: EmailSettingsForm,
    });

    this.app.router.add(`admin.${name}-page`, {
      path: '/admin/plugin-settings-form-page',
      Component: EmailSettingsFormPage,
    });

    this.app.addProvider(EmailSettingsFormProvider);
  }
}

export default EmailSettingFormClient;
