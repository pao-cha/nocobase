/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React from 'react';
import { useMemo } from 'react';
import { App as AntdApp } from 'antd';
import { createForm } from '@formily/core';
import { useForm } from '@formily/react';
import { uid } from '@formily/shared';
import {
  ActionProps,
  ISchema,
  useCollection,
  useCollectionRecordData,
  useDataBlockResource,
  ExtendCollectionsProvider,
  SchemaComponent,
} from '@nocobase/client';
import { css } from '@nocobase/client';

import { useEmailSettingsFormRequest } from './EmailSettingsFormProvider';

const emailConfigurationCollection = {
  name: 'emailConfiguration',
  filterTargetKey: 'id',
  fields: [
    {
      type: 'string',
      name: 'imapServerAccount',
      interface: 'input',
      uiSchema: {
        type: 'string',
        title: 'Title',
        required: true,
        'x-component': 'Input',
      },
    },
    {
      type: 'string',
      name: 'imapServerUrl',
      interface: 'input',
      uiSchema: {
        type: 'string',
        title: 'Secret',
        required: true,
        'x-component': 'Input',
      },
    },
    {
      type: 'string',
      name: 'imapServerSecret',
      interface: 'input',
      uiSchema: {
        type: 'string',
        title: 'Secret',
        required: true,
        'x-component': 'Input',
      },
    },
    {
      type: 'string',
      name: 'imapServerPort',
      interface: 'input',
      uiSchema: {
        type: 'string',
        title: 'Secret',
        required: true,
        'x-component': 'Input',
      },
    },
    {
      type: 'string',
      name: 'imapServerSSL',
      interface: 'select',
      uiSchema: {
        type: 'string',
        title: 'imapServerSSL',
        default: '1',
        enum: [
          { value: '1', label: '启用' },
          { value: '2', label: '禁用' },
        ],
        'x-component': 'Select',
      },
    },
    {
      type: 'string',
      name: 'smtpServerAccount',
      interface: 'input',
      uiSchema: {
        type: 'string',
        title: 'Secret',
        required: true,
        'x-component': 'Input',
      },
    },
    {
      type: 'string',
      name: 'smtpServerUrl',
      interface: 'input',
      uiSchema: {
        type: 'string',
        title: 'Secret',
        required: true,
        'x-component': 'Input',
      },
    },
    {
      type: 'string',
      name: 'smtpServerSecret',
      interface: 'input',
      uiSchema: {
        type: 'string',
        title: 'Secret',
        required: true,
        'x-component': 'Input',
      },
    },
    {
      type: 'string',
      name: 'smtpServerPort',
      interface: 'input',
      uiSchema: {
        type: 'string',
        title: 'Secret',
        required: true,
        'x-component': 'Input',
      },
    },
    {
      type: 'string',
      name: 'smtpServerSSL',
      interface: 'input',
      uiSchema: {
        type: 'string',
        title: 'Secret',
        required: true,
        'x-component': 'Select',
      },
    },
  ],
};

const schema: ISchema = {
  type: 'void',
  name: uid(),
  'x-component': 'CardItem',
  'x-decorator': 'DataBlockProvider',
  'x-decorator-props': {
    collection: emailConfigurationCollection.name,
    action: 'get',
    filterByTk: 1, // 获取 id 为 1 的数据
  },
  properties: {
    DndContext: {
      type: 'void',
      'x-component': 'DndContext',
      properties: {
        form: {
          type: 'void',
          'x-component': 'FormV2',
          'x-use-component-props': 'useFormBlockProps',
          properties: {
            block1: {
              type: 'void',
              'x-component': 'CardItem',
              'x-toolbar-props': {
                draggable: false,
                showBorder: false,
              },
              'x-component-props': {
                title: 'imap配置',
              },
              'x-settings': 'simpleSettings',
              properties: {
                imapServerAccount: {
                  title: 'imapServerAccount',
                  'x-decorator': 'FormItem',
                  'x-component': 'CollectionField',
                },
                imapServerUrl: {
                  title: 'imapServerUrl',
                  'x-decorator': 'FormItem',
                  'x-component': 'CollectionField',
                },
                imapServerSecret: {
                  title: 'imapServerSecret',
                  'x-decorator': 'FormItem',
                  'x-component': 'CollectionField',
                },
                imapServerPort: {
                  title: 'imapServerPort',
                  'x-decorator': 'FormItem',
                  'x-component': 'CollectionField',
                },
                imapServerSSL: {
                  title: 'imapServerSSL',
                  'x-decorator': 'FormItem',
                  'x-component': 'CollectionField',
                },
              },
            },
            block2: {
              type: 'void',
              'x-component': 'CardItem',
              'x-component-props': {
                title: 'smtp配置',
              },
              'x-toolbar-props': {
                draggable: false,
                showBorder: false,
              },
              'x-settings': 'simpleSettings',
              properties: {
                smtpServerAccount: {
                  title: 'smtpServerAccount',
                  'x-decorator': 'FormItem',
                  'x-component': 'CollectionField',
                },
                smtpServerUrl: {
                  title: 'smtpServerUrl',
                  'x-decorator': 'FormItem',
                  'x-component': 'CollectionField',
                },
                smtpServerSecret: {
                  title: 'smtpServerSecret',
                  'x-decorator': 'FormItem',
                  'x-component': 'CollectionField',
                },
                smtpServerPort: {
                  title: 'smtpServerPort',
                  'x-decorator': 'FormItem',
                  'x-component': 'CollectionField',
                },
                smtpServerSSL: {
                  title: 'smtpServerSSL',
                  'x-decorator': 'FormItem',
                  'x-component': 'CollectionField',
                },
              },
            },
            footer: {
              type: 'void',
              'x-component': 'Action',
              title: 'Submit',
              'x-use-component-props': 'useSubmitActionProps',
            },
          },
        },
      },
    },
  },
};

const useFormBlockProps = () => {
  const recordData = useCollectionRecordData();
  const form = useMemo(
    () =>
      createForm({
        initialValues: recordData,
      }),
    [recordData],
  );
  return {
    form,
  };
};

const useSubmitActionProps = (): ActionProps => {
  const form = useForm();
  const { message } = AntdApp.useApp();
  const collection = useCollection();
  const resource = useDataBlockResource();
  const globalSettingsFormRequest = useEmailSettingsFormRequest();
  return {
    type: 'primary',
    htmlType: 'submit',
    async onClick() {
      await form.submit();
      const values = form.values;
      await resource.updateOrCreate({
        values,
        filterKeys: [collection.filterTargetKey],
      });
      await globalSettingsFormRequest.runAsync();
      message.success('Saved successfully!');
    },
  };
};

export const EmailSettingsForm = () => {
  return (
    <ExtendCollectionsProvider collections={[emailConfigurationCollection]}>
      <SchemaComponent schema={schema} scope={{ useFormBlockProps, useSubmitActionProps }} />
    </ExtendCollectionsProvider>
  );
};
