import { expect } from 'chai';
import SHA256 from 'crypto-js/sha256';
import * as auth from './auth';

it('Test "encryptData"', () => {
  expect(auth.encryptData('Password')).to.equal(SHA256('Password').toString());
});
it('Test "getTokenForHeader"', async() => {
  localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidmxhZHYzIiwiaXNzdWVyIjoiNDgyc29sdXRpb25zIiwiaWF0IjoxNTkwMTQ5MzM5LCJleHAiOjE1OTAxNTI5Mzl9.3w3SZ8DhAFlh0TokFXbZkcY74qFx-dWuwOGU0XLmW7g');
  expect(await auth.getTokenForHeader()).to.equal(`Bearer ${localStorage.getItem('token')}`);
});
