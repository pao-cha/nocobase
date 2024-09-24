/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

/*
 * @name:
 * @Author: mingyu.guo
 * @Date: 2024-09-20 15:11:04
 * @LastEditors: mingyu.guo
 * @LastEditTime: 2024-09-23 19:07:41
 */
/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { useRequest } from '@nocobase/client';
import React from 'react';

interface EmailSettings {
  imapServerAccount: string;
  imapServerUrl: string;
  imapServerSecret: string;
  imapServerPort: string;
  imapServerSSL: string;
  stmpServerAccount: string;
  stmpServerUrl: string;
  stmpServerSecret: string;
  stmpServerPort: string;
  stmpServerSSL: string;
}
export const EmailSettingsFormPage = () => {
  const { data, loading } = useRequest<{ data?: EmailSettings }>({
    url: 'emailConfiguration:get',
  });

  if (loading) return null;

  return <pre>{JSON.stringify(data?.data, null, 2)}</pre>;
};
