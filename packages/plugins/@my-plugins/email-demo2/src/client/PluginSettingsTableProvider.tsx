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
 * @Date: 2024-09-27 15:45:16
 * @LastEditors: mingyu.guo
 * @LastEditTime: 2024-09-27 16:25:32
 */
import React, { createContext, FC } from 'react';
import { useRequest, UseRequestResult } from '@nocobase/client';

const PluginSettingsTableContext = createContext<UseRequestResult<{ data?: any[] }>>(null as any);

export const PluginSettingsTableProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const request = useRequest<{ data?: any[] }>({
    url: 'emailConfiguration:list',
    params: {
      filter: {
        user: '{{$user.nickname}}',
      },
    },
  });

  console.log('PluginSettingsTableProvider', request.data?.data);

  return <PluginSettingsTableContext.Provider value={request}>{children}</PluginSettingsTableContext.Provider>;
};

export const usePluginSettingsTableRequest = () => {
  return React.useContext(PluginSettingsTableContext);
};
