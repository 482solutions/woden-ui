import { String } from '../../components';

export const createDirectory = () => [
  {
    name: 'name',
    label: 'Directory Name',
    component: String,
    required: true,
    message: 'Directory name can not be empty'
  }
];
