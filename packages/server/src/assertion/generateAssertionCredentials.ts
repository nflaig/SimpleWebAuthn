import base64url from 'base64url';

import { AssertionCredentials } from '@libTypes';

/**
 * Prepare credentials for user registration via navigator.credentials.get(...)
 *
 * @param challenge Random string the authenticator needs to sign and pass back
 * @param base64CredentialIDs Array of base64-encoded authenticator IDs registered by the user for
 * assertion
 * @param timeout How long (in ms) the user can take to complete attestation
 */
export default function generateAssertionCredentials(
  challenge: string,
  base64CredentialIDs: string[],
  timeout: number = 60000,
): AssertionCredentials {
  return {
    publicKey: {
      challenge: Uint8Array.from(challenge, c => c.charCodeAt(0)),
      allowCredentials: base64CredentialIDs.map(id => ({
        id: base64url.toBuffer(id),
        type: 'public-key',
        transports: ['usb', 'ble', 'nfc'],
      })),
      timeout,
    },
  };
}