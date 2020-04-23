import { String } from '../../components';

export const login = () => [
  {
    name: 'name',
    label: 'Username',
    component: String,
    required: true,
    message: 'Username can not be empty'
  },
  {
    name: 'password',
    label: 'Password',
    component: String,
    required: true,
    message: 'Password can not be empty',
    props: {
      type: 'password'
    }
  }
];
