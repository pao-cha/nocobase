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

const EmailSettingsFormContext = createContext<UseRequestResult<{ data?: { key: string; secret: string } }>>(
  null as any,
);

export const EmailSettingsFormProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const request = useRequest<{ data?: { key: string; secret: string } }>({
    url: 'samplesMapConfiguration:get',
  });

  console.log('usePluginSettingsFormProvider', request.data?.data);

  return <EmailSettingsFormContext.Provider value={request}>{children}</EmailSettingsFormContext.Provider>;
};

export const useEmailSettingsFormRequest = () => {
  return React.useContext(EmailSettingsFormContext);
};
