import { expect } from 'chai';
import * as filesystem from './filesystem';

it('Test "Validation Private Key"', () => {
  const privateKey = '-----BEGIN PRIVATE KEY-----MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgQfmHf62VifEvgngdxES8e1ijmx9BtJBBisSNaPM9hLuhRANCAAT07soERhGLxS2bOgKd1fIpUpmZqOPMa8JlejHfa25UpsBkJyKunCcXvZgX22ubRl7ukO7v5uD8yGEKDOFfRw/U-----END PRIVATE KEY-----';
  expect(filesystem.validationPrivateKey(privateKey)).to.equal(true);
});
it('Test "Validation Certificate"', () => {
  const certificate = '-----BEGIN CERTIFICATE-----\n'
    + 'MIIC/zCCAqWgAwIBAgIUcizQLrvCciWiJPP9sYLKpjjBXbcwCgYIKoZIzj0EAwIw\n'
    + 'gYUxCzAJBgNVBAYTAlVBMRYwFAYDVQQIEw1PZGVza2Egb2JsYXN0MQ8wDQYDVQQH\n'
    + 'EwZPZGVzc2ExFjAUBgNVBAoTDTQ4Mi5zb2x1dGlvbnMxEzARBgNVBAsTCnByai1m\n'
    + 'YWJyaWMxIDAeBgNVBAMTF2NhLmZhYnJpYy40ODIuc29sdXRpb25zMB4XDTIwMDUy\n'
    + 'MTA4MzQwMFoXDTIxMDUyMTA4MzkwMFowgY0xCzAJBgNVBAYTAlVBMQ8wDQYDVQQI\n'
    + 'EwZPZGVzc2ExDzANBgNVBAcTBk9kZXNzYTEUMBIGA1UEChMLSHlwZXJsZWRnZXIx\n'
    + 'NTALBgNVBAsTBHBlZXIwEwYDVQQLEww0ODJzb2x1dGlvbnMwEQYDVQQLEwpwcmot\n'
    + 'ZmFicmljMQ8wDQYDVQQDEwZ2bGFkYzkwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNC\n'
    + 'AARN6tthR7GE/MBBHvcAh7C8PcLFBADWw4iJ+70DlxxWZjpFwx1InUmXsDiQAuYQ\n'
    + 'geFVHaJ8vnSKxGz5JtLscoPMo4HoMIHlMA4GA1UdDwEB/wQEAwIHgDAMBgNVHRMB\n'
    + 'Af8EAjAAMB0GA1UdDgQWBBTYqsIHI1o70O4bMaVxpiaaQN/49zAfBgNVHSMEGDAW\n'
    + 'gBScGviureTz7bg2bSwu/QDj06k9hzAVBgNVHREEDjAMggpkb21haW4ubmV0MG4G\n'
    + 'CCoDBAUGBwgBBGJ7ImF0dHJzIjp7ImhmLkFmZmlsaWF0aW9uIjoiNDgyc29sdXRp\n'
    + 'b25zLnByai1mYWJyaWMiLCJoZi5FbnJvbGxtZW50SUQiOiJ2bGFkYzkiLCJoZi5U\n'
    + 'eXBlIjoicGVlciJ9fTAKBggqhkjOPQQDAgNIADBFAiEAm+SaPqHHm21c73fkfIXf\n'
    + 'qS6vYftwqdjvZD8W2ki4aD0CIHGgg86rHFP/2IQvawEALQtjfO8BJK8giFMKnlFx\n'
    + 'gJdM\n'
    + '-----END CERTIFICATE-----';
  expect(filesystem.validationCertificate(certificate)).to.equal(true);
});
