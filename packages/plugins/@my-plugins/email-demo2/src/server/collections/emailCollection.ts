/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { defineCollection } from '@nocobase/database';

export default defineCollection({
  name: 'emailConfiguration',
  fields: [
    {
      type: 'string',
      name: 'user',
    },
    {
      type: 'email',
      name: 'email',
    },
    {
      type: 'string',
      name: 'imapUrl',
    },
    {
      type: 'string',
      name: 'imapAuthCode',
    },
    {
      type: 'string',
      name: 'imapPort',
    },
    {
      type: 'boolean',
      name: 'imapSsl',
    },
    {
      type: 'string',
      name: 'smtpUrl',
    },
    {
      type: 'string',
      name: 'smtpAuthCode',
    },
    {
      type: 'string',
      name: 'smtpPort',
    },
    {
      type: 'boolean',
      name: 'smtpSsl',
    },
    {
      type: 'string',
      name: 'accessToken',
    },
    {
      type: 'text',
      name: 'refreshToken',
    },
    {
      type: 'text',
      name: 'authType',
    },
    {
      type: 'time',
      name: 'lastSyncAt',
    },
  ],
});
