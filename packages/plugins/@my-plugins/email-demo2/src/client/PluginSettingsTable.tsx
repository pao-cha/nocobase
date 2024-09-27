/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React, { useMemo } from 'react';
import {
  ActionProps,
  ISchema,
  useActionContext,
  useCollection,
  useCollectionRecord,
  useCollectionRecordData,
  useDataBlockRequest,
  useDataBlockResource,
} from '@nocobase/client';
import { uid } from '@formily/shared';
import { ExtendCollectionsProvider, SchemaComponent } from '@nocobase/client';
import { App as AntdApp } from 'antd';
import { createForm } from '@formily/core';
import { useForm } from '@formily/react';
import { usePluginSettingsTableRequest } from './PluginSettingsTableProvider';

const samplesEmailTemplatesCollection = {
  name: 'emailConfiguration',
  filterTargetKey: 'id',
  fields: [
    {
      type: 'string',
      name: 'user',
      interface: 'input',
      uiSchema: {
        type: 'string',
        title: 'user',
        required: true,
        'x-component': 'Input',
      },
    },
    {
      type: 'email',
      name: 'email',
      interface: 'input',
      uiSchema: {
        type: 'email',
        title: 'email',
        required: true,
        'x-component': 'Input',
      },
    },
    {
      type: 'string',
      name: 'imapUrl',
      interface: 'input',
      uiSchema: {
        type: 'string',
        title: 'imapUrl',
        required: true,
        'x-component': 'Input',
      },
    },
    {
      type: 'string',
      name: 'imapAuthCode',
      interface: 'input',
      uiSchema: {
        type: 'string',
        title: 'imapAuthCode',
        required: true,
        'x-component': 'Input',
      },
    },
    {
      type: 'string',
      name: 'imapPort',
      interface: 'input',
      uiSchema: {
        type: 'string',
        title: 'imapPort',
        required: true,
        'x-component': 'Input',
      },
    },
    {
      type: 'boolean',
      name: 'imapSsl',
      interface: 'input',
      uiSchema: {
        type: 'string',
        title: 'imapSsl',
        required: true,
        'x-component': 'Input',
      },
    },
    {
      type: 'string',
      name: 'smtpUrl',
      interface: 'input',
      uiSchema: {
        type: 'string',
        title: 'smtpUrl',
        required: true,
        'x-component': 'Input',
      },
    },
    {
      type: 'string',
      name: 'smtpAuthCode',
      interface: 'input',
      uiSchema: {
        type: 'string',
        title: 'smtpAuthCode',
        required: true,
        'x-component': 'Input',
      },
    },
    {
      type: 'string',
      name: 'smtpPort',
      interface: 'input',
      uiSchema: {
        type: 'string',
        title: 'smtpPort',
        required: true,
        'x-component': 'Input',
      },
    },
    {
      type: 'boolean',
      name: 'smtpSsl',
      interface: 'input',
      uiSchema: {
        type: 'string',
        title: 'smtpSsl',
        required: true,
        'x-component': 'Input',
      },
    },
    {
      type: 'string',
      name: 'accessToken',
      interface: 'input',
      uiSchema: {
        type: 'string',
        title: 'accessToken',
        required: true,
        'x-component': 'Input',
      },
    },
    {
      type: 'text',
      name: 'refreshToken',
      interface: 'input',
      uiSchema: {
        type: 'string',
        title: 'refreshToken',
        required: true,
        'x-component': 'Input',
      },
    },
    {
      type: 'string',
      name: 'authType',
      interface: 'input',
      uiSchema: {
        type: 'string',
        title: 'authType',
        required: true,
        'x-component': 'Input',
      },
    },
    {
      type: 'time',
      name: 'lastSyncAt',
      interface: 'input',
      uiSchema: {
        type: 'time',
        title: 'lastSyncAt',
      },
    },
  ],
};

const useSubmitActionProps = () => {
  const { setVisible } = useActionContext();
  const { message } = AntdApp.useApp();
  const form = useForm();
  const resource = useDataBlockResource();
  const { runAsync } = useDataBlockRequest();
  const collection = useCollection();
  const globalSettingsTableRequest = usePluginSettingsTableRequest();
  return {
    type: 'primary',
    async onClick() {
      await form.submit();
      const values = form.values;
      if (values[collection.filterTargetKey]) {
        await resource.update({
          values,
          filterByTk: values[collection.filterTargetKey],
        });
      } else {
        await resource.create({
          values,
        });
      }
      await runAsync();
      await globalSettingsTableRequest.runAsync();
      message.success('Saved successfully!');
      setVisible(false);
    },
  };
};

const useEditFormProps = () => {
  const recordData = useCollectionRecordData();
  const form = useMemo(
    () =>
      createForm({
        initialValues: recordData,
      }),
    [],
  );

  return {
    form,
  };
};

function useDeleteActionProps(): ActionProps {
  const { message } = AntdApp.useApp();
  const record = useCollectionRecordData();
  const resource = useDataBlockResource();
  const { runAsync } = useDataBlockRequest();
  const globalSettingsTableRequest = usePluginSettingsTableRequest();
  const collection = useCollection();
  return {
    confirm: {
      title: 'Delete',
      content: 'Are you sure you want to delete it?',
    },
    async onClick() {
      await resource.destroy({
        filterByTk: record[collection.filterTargetKey],
      });
      await runAsync();
      await globalSettingsTableRequest.runAsync();
      message.success('Deleted!');
    },
  };
}

const schema: ISchema = {
  type: 'void',
  name: uid(),
  'x-component': 'CardItem',
  'x-decorator': 'TableBlockProvider',
  'x-decorator-props': {
    collection: samplesEmailTemplatesCollection.name,
    action: 'list',
    params: {
      pageSize: 20,
      filter: {
        $and: [
          {
            user: {
              $includes: '{{$user.nickname}}',
            },
          },
        ],
      },
    },
    showIndex: true,
    dragSort: false,
  },
  properties: {
    actions: {
      type: 'void',
      'x-component': 'ActionBar',
      'x-component-props': {
        style: {
          marginBottom: 20,
        },
      },
      properties: {
        add: {
          type: 'void',
          'x-component': 'Action',
          title: 'Add New',
          'x-align': 'right',
          'x-component-props': {
            type: 'primary',
          },
          properties: {
            drawer: {
              type: 'void',
              'x-component': 'Action.Drawer',
              title: 'Add new',
              properties: {
                form: {
                  type: 'void',
                  'x-component': 'FormV2',
                  properties: {
                    user: {
                      type: 'user',
                      'x-decorator': 'FormItem',
                      'x-component': 'CollectionField',
                      required: true,
                    },
                    email: {
                      type: 'email',
                      'x-decorator': 'FormItem',
                      'x-component': 'CollectionField',
                      required: true,
                    },
                    imapUrl: {
                      type: 'string',
                      'x-decorator': 'FormItem',
                      'x-component': 'CollectionField',
                      required: true,
                    },
                    imapAuthCode: {
                      type: 'string',
                      'x-decorator': 'FormItem',
                      'x-component': 'CollectionField',
                      required: true,
                    },
                    imapPort: {
                      type: 'string',
                      'x-decorator': 'FormItem',
                      'x-component': 'CollectionField',
                      required: true,
                    },
                    imapSsl: {
                      type: 'string',
                      'x-decorator': 'FormItem',
                      'x-component': 'CollectionField',
                      required: true,
                    },
                    smtpUrl: {
                      type: 'string',
                      'x-decorator': 'FormItem',
                      'x-component': 'CollectionField',
                      required: true,
                    },
                    smtpAuthCode: {
                      type: 'string',
                      'x-decorator': 'FormItem',
                      'x-component': 'CollectionField',
                      required: true,
                    },
                    smtpPort: {
                      type: 'string',
                      'x-decorator': 'FormItem',
                      'x-component': 'CollectionField',
                      required: true,
                    },
                    smtpSsl: {
                      type: 'string',
                      'x-decorator': 'FormItem',
                      'x-component': 'CollectionField',
                      required: true,
                    },
                    accessToken: {
                      type: 'string',
                      'x-decorator': 'FormItem',
                      'x-component': 'CollectionField',
                      required: true,
                    },
                    refreshToken: {
                      type: 'string',
                      'x-decorator': 'FormItem',
                      'x-component': 'CollectionField',
                      required: true,
                    },
                    authType: {
                      type: 'string',
                      'x-decorator': 'FormItem',
                      'x-component': 'CollectionField',
                      required: true,
                    },
                    lastSyncAt: {
                      type: 'time',
                      'x-decorator': 'FormItem',
                      'x-component': 'CollectionField',
                      required: false,
                    },
                    footer: {
                      type: 'void',
                      'x-component': 'Action.Drawer.Footer',
                      properties: {
                        submit: {
                          title: 'Submit',
                          'x-component': 'Action',
                          'x-use-component-props': 'useSubmitActionProps',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    table: {
      type: 'array',
      'x-component': 'TableV2',
      'x-use-component-props': 'useTableBlockProps',
      'x-component-props': {
        rowKey: 'id',
        rowSelection: {
          type: 'checkbox',
        },
      },
      properties: {
        email: {
          type: 'void',
          title: 'email',
          'x-component': 'TableV2.Column',
          properties: {
            email: {
              type: 'string',
              'x-component': 'CollectionField',
              'x-pattern': 'readPretty',
            },
          },
        },
        authType: {
          type: 'void',
          title: 'authType',
          'x-component': 'TableV2.Column',
          properties: {
            authType: {
              type: 'string',
              'x-component': 'CollectionField',
              'x-pattern': 'readPretty',
            },
          },
        },
        lastSyncAt: {
          type: 'void',
          title: 'lastSyncAt',
          'x-component': 'TableV2.Column',
          properties: {
            lastSyncAt: {
              type: 'time',
              'x-component': 'CollectionField',
              'x-pattern': 'readPretty',
            },
          },
        },
        actions: {
          type: 'void',
          title: 'Actions',
          'x-component': 'TableV2.Column',
          properties: {
            actions: {
              type: 'void',
              'x-component': 'Space',
              'x-component-props': {
                split: '|',
              },
              properties: {
                edit: {
                  type: 'void',
                  title: 'Edit',
                  'x-component': 'Action.Link',
                  'x-component-props': {
                    openMode: 'drawer',
                    icon: 'EditOutlined',
                  },
                  properties: {
                    drawer: {
                      type: 'void',
                      title: 'Edit',
                      'x-component': 'Action.Drawer',
                      properties: {
                        form: {
                          type: 'void',
                          'x-component': 'FormV2',
                          'x-use-component-props': 'useEditFormProps',
                          properties: {
                            user: {
                              type: 'user',
                              'x-decorator': 'FormItem',
                              'x-component': 'CollectionField',
                              required: true,
                            },
                            email: {
                              type: 'email',
                              'x-decorator': 'FormItem',
                              'x-component': 'CollectionField',
                              required: true,
                            },
                            imapUrl: {
                              type: 'string',
                              'x-decorator': 'FormItem',
                              'x-component': 'CollectionField',
                              required: true,
                            },
                            imapAuthCode: {
                              type: 'string',
                              'x-decorator': 'FormItem',
                              'x-component': 'CollectionField',
                              required: true,
                            },
                            imapPort: {
                              type: 'string',
                              'x-decorator': 'FormItem',
                              'x-component': 'CollectionField',
                              required: true,
                            },
                            imapSsl: {
                              type: 'string',
                              'x-decorator': 'FormItem',
                              'x-component': 'CollectionField',
                              required: true,
                            },
                            smtpUrl: {
                              type: 'string',
                              'x-decorator': 'FormItem',
                              'x-component': 'CollectionField',
                              required: true,
                            },
                            smtpAuthCode: {
                              type: 'string',
                              'x-decorator': 'FormItem',
                              'x-component': 'CollectionField',
                              required: true,
                            },
                            smtpPort: {
                              type: 'string',
                              'x-decorator': 'FormItem',
                              'x-component': 'CollectionField',
                              required: true,
                            },
                            smtpSsl: {
                              type: 'string',
                              'x-decorator': 'FormItem',
                              'x-component': 'CollectionField',
                              required: true,
                            },
                            accessToken: {
                              type: 'string',
                              'x-decorator': 'FormItem',
                              'x-component': 'CollectionField',
                              required: true,
                            },
                            refreshToken: {
                              type: 'string',
                              'x-decorator': 'FormItem',
                              'x-component': 'CollectionField',
                              required: true,
                            },
                            authType: {
                              type: 'string',
                              'x-decorator': 'FormItem',
                              'x-component': 'CollectionField',
                              required: true,
                            },
                            lastSyncAt: {
                              type: 'time',
                              'x-decorator': 'FormItem',
                              'x-component': 'CollectionField',
                              required: false,
                            },
                            footer: {
                              type: 'void',
                              'x-component': 'Action.Drawer.Footer',
                              properties: {
                                submit: {
                                  title: 'Submit',
                                  'x-component': 'Action',
                                  'x-use-component-props': 'useSubmitActionProps',
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
                delete: {
                  type: 'void',
                  title: 'Delete',
                  'x-component': 'Action.Link',
                  'x-use-component-props': 'useDeleteActionProps',
                },
              },
            },
          },
        },
      },
    },
  },
};

export const PluginSettingsTable = () => {
  return (
    <ExtendCollectionsProvider collections={[samplesEmailTemplatesCollection]}>
      <SchemaComponent schema={schema} scope={{ useSubmitActionProps, useEditFormProps, useDeleteActionProps }} />
    </ExtendCollectionsProvider>
  );
};
