import { String } from '../../components';

export const login = () => [
  {
    name: 'name',
    label: 'Username',
    placeholder: 'hello@482.solutions',
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
