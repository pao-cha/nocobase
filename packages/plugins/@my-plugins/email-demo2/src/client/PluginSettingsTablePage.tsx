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
 * @Date: 2024-09-27 15:45:08
 * @LastEditors: mingyu.guo
 * @LastEditTime: 2024-09-27 16:25:14
 */
import { useRequest } from '@nocobase/client';
import React from 'react';

export const PluginSettingsTablePage = () => {
  const { data, loading } = useRequest<{ data?: any[] }>({
    url: 'emailConfiguration:list',
    params: {
      filter: {
        user: '{{$user.nickname}}',
      },
    },
  });

  if (loading) return null;

  return <pre>{JSON.stringify(data?.data, null, 2)}</pre>;
};
