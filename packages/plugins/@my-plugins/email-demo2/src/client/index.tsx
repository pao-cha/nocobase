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

import { PluginSettingsTable } from './PluginSettingsTable';
import { PluginSettingsTablePage } from './PluginSettingsTablePage';
import { PluginSettingsTableProvider } from './PluginSettingsTableProvider';

export class EmailDemo2Client extends Plugin {
  async afterAdd() {
    // await this.app.pm.add()
  }

  async beforeLoad() {}

  // You can get and modify the app instance here
  async load() {
    this.app.pluginSettingsManager.add(name, {
      title: 'Plugin Settings Table',
      icon: 'TableOutlined',
      Component: PluginSettingsTable,
    });

    this.app.router.add(`admin.${name}-page`, {
      path: '/admin/plugin-settings-table-page',
      Component: PluginSettingsTablePage,
    });

    this.app.addProvider(PluginSettingsTableProvider);
  }
}

export default EmailDemo2Client;
