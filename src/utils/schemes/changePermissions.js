import { models } from '../index';
import { String, Select } from '../../components';

export const changePermissions = () => [
  {
    name: 'name',
    label: 'Username',
    component: String,
    required: true,
    message: 'Username can not be empty'
  },
  {
    name: 'type',
    label: 'Permission Type',
    component: Select,
    required: true,
    message: 'Permission type cannot be empty',
    initialValue: models.Permissions.View,
    props: {
      options: [
        {
          type: models.Permissions.View,
          view: 'View Only',
        },
        {
          type: models.Permissions.Edit,
          view: 'View and Update',
        },
        // {
        //   type: models.Permissions.Owner,
        //   view: 'Transfer Ownership',
        // },
      ]
    },
  }
];
