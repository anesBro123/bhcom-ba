import { defineForm } from '../../features/shared/form';

import type { LoginFormModel } from './login.model';

export const LoginForm = defineForm<LoginFormModel>()({
  mode: 'single',
  steps: [
    {
      id: 'credentials',
      kind: 'fields',
      sections: [
        {
          id: 'fields',
          fields: [
            {
              key: 'username',
              type: 'text',
              labelKey: 'login.username',
              autocomplete: 'username',
              colSpan: 'full',
            },
            {
              key: 'password',
              type: 'password',
              labelKey: 'login.password',
              autocomplete: 'current-password',
              colSpan: 'full',
            },
          ],
        },
      ],
    },
  ],
  actions: {
    submit: { labelKey: 'login.submit' },
  },
});
