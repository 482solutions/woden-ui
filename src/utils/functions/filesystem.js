export const validationPrivateKey = (string) => {
  string = string.toString().trim();
  return string.startsWith('-----BEGIN PRIVATE KEY-----') && string.endsWith(
    '-----END PRIVATE KEY-----',
  );
};
export const validationCertificate = (string) => {
  string = string.toString().trim();
  return string.startsWith('-----BEGIN CERTIFICATE-----') && string.endsWith(
    '-----END CERTIFICATE-----',
  );
};
export const getRootFolderHash = () => (
  localStorage.getItem('rootFolder')
);
