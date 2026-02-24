
export default class ECDHKeyExchange {
    public static generateKeyPair() {
        return crypto.subtle.generateKey(
            {
                name: "ECDH",
                namedCurve: "P-256",
            }, 
            true, 
            ["deriveKey"]
        );
    }

    public static exportPublicKey(key: CryptoKey) {
        return crypto.subtle.exportKey("raw", key);
    }

    public static importPublicKey(rawKey: ArrayBuffer) {
        return crypto.subtle.importKey(
            "raw",
            rawKey,
            {
                name: "ECDH",
                namedCurve: "P-256",
            },
            true,
            []
        );
    }

    public static deriveSharedKey(privateKey: CryptoKey, publicKey: CryptoKey) {
        return crypto.subtle.deriveKey(
          {
            name: "ECDH",
            public: publicKey,
          },
          privateKey,
          {
            name: "AES-GCM",
            length: 256,
          },
          false,
          ["encrypt", "decrypt"]
        );
    }

    public static encryptMessage(key: CryptoKey, message: string) {
        const encoder = new TextEncoder();
        const iv = crypto.getRandomValues(new Uint8Array(12));
      
        return crypto.subtle.encrypt(
          {
            name: "AES-GCM",
            iv,
          },
          key,
          encoder.encode(message)
        ).then((encrypted) => {
            return { encrypted, iv };
        });
    }
      
    public static decryptMessage(key: CryptoKey, encrypted: ArrayBuffer, iv: ArrayBuffer) {
        return crypto.subtle.decrypt(
          {
            name: "AES-GCM",
            iv,
          },
          key,
          encrypted
        ).then((decrypted) => {
            return new TextDecoder().decode(decrypted);
        });
    }
}