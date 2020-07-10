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

export const detectUserPermission = (username, hash, infoArray, type) => {
  let info = {};
  for (let i = 0; i < infoArray.length; i++) {
    if (infoArray[i][`${type}Hash`] === hash) {
      info = infoArray[i];
      break;
    }
  }
  if (info.ownerId === username) {
    console.log('owner');
    return 'owner';
  }
  if (info.writeUsers.includes(username) && info.readUsers.includes(username)) {
    console.log('write');
    return 'write';
  }
  if (info.readUsers.includes(username)) {
    console.log('read');
    return 'read';
  }
  return false;
};
