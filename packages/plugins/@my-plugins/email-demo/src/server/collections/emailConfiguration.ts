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
      name: 'imapServerAccount',
    },
    {
      type: 'string',
      name: 'imapServerUrl',
    },
    {
      type: 'string',
      name: 'imapServerSecret',
    },
    {
      type: 'string',
      name: 'imapServerPort',
    },
    {
      type: 'boolean',
      name: 'imapServerSSL',
    },
    {
      type: 'string',
      name: 'smtpServerAccount',
    },
    {
      type: 'string',
      name: 'smtpServerUrl',
    },
    {
      type: 'string',
      name: 'smtpServerSecret',
    },
    {
      type: 'string',
      name: 'smtpServerPort',
    },
    {
      type: 'boolean',
      name: 'smtpServerSSL',
    },
  ],
});
