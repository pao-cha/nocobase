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
 * @LastEditTime: 2024-09-23 19:17:39
 */
/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React, { createContext, FC } from 'react';
import { useRequest, UseRequestResult } from '@nocobase/client';

interface EmailSettings {
  imapServerAccount: string;
  imapServerUrl: string;
  imapServerSecret: string;
  imapServerPort: string;
  imapServerSSL: string;
  smtpServerAccount: string;
  smtpServerUrl: string;
  smtpServerSecret: string;
  smtpServerPort: string;
  smtpServerSSL: string;
}

const EmailSettingsFormContext = createContext<UseRequestResult<{ data?: EmailSettings }> | null>(null as any);

export const EmailSettingsFormProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const request = useRequest<{ data?: EmailSettings }>({
    url: 'emailConfiguration:get',
  });

  console.log('usePluginSettingsFormProvider', request.data?.data);

  return <EmailSettingsFormContext.Provider value={request}>{children}</EmailSettingsFormContext.Provider>;
};

export const useEmailSettingsFormRequest = () => {
  return React.useContext(EmailSettingsFormContext);
};
