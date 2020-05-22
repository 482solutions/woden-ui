import { KJUR } from 'jsrsasign';
import { expect } from 'chai';
import getCSR from './csr';

describe('Test function', () => {
  it('Returns true if the string is a palindrome', () => {
    const userName = 'testUserName';
    const csrName = `/CN=${userName}/C=UA/ST=Odessa/O=Hyperledger/OU=Fabric/L=Odessa`;
    const csr = getCSR({ username: userName });
    const csrParse = KJUR.asn1.csr.CSRUtil.getInfo(csr.csrPem);
    expect(csrParse.subject.name).equal(csrName);
  });
});
