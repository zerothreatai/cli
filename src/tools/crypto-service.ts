import crypto from "crypto";

export default class InstallerAppCryptoService {
    private readonly IV_LEN = 12;
    private readonly TAG_LEN = 16;
    private readonly KEY_LEN = 32;
    private readonly K1: Buffer;
    private readonly K2: Buffer;
    private readonly K3: Buffer;
    private readonly K4: Buffer;
    private readonly K5: Buffer;
    private readonly keys: Buffer[];

    constructor() {
        this.K1 = this.normalizeKey("3jv8_Ve3yTNwJjhSiMftBXpAkFtJLxSNaoJcBGztvUI");
        this.K2 = this.normalizeKey("ZEl9PKemmf4w6wYcK3uFiFYrya9FJMA9UI_B0k_217A");
        this.K3 = this.normalizeKey("ZDjIlSq44RcZHAdZFRpCRYtayxVkadiEEUZ6TmeP7jU");
        this.K4 = this.normalizeKey("ucnRjVn7WghWSXnn4XpDjIEyzJ9ChPUUojrx4g7giWM");
        this.K5 = this.normalizeKey("C0p4tWA7EJF6c2hdgiV3VDZbfRzXUWjPhesycqsA0aM");

        this.keys = [this.K1, this.K2, this.K3, this.K4, this.K5];
    }

    encrypt(plain: string): string {
        const key = this.keys[Math.floor(Math.random() * this.keys.length)];

        const iv = crypto.randomBytes(this.IV_LEN);
        const cipher = crypto.createCipheriv("aes-256-gcm", key, iv, { authTagLength: this.TAG_LEN });
        const ct = Buffer.concat([cipher.update(Buffer.from(plain, "utf8")), cipher.final()]);
        const tag = cipher.getAuthTag();

        return this.b64uEnc(Buffer.concat([iv, tag, ct]));
    }

    decrypt(token: string): string {
        let data: Buffer;
        try {
            data = this.b64uDec(token);
        } catch {
            throw new Error("Invalid token");
        }

        if (data.length <= this.IV_LEN + this.TAG_LEN) throw new Error("Corrupt token");

        const iv = data.slice(0, this.IV_LEN);
        const tag = data.slice(this.IV_LEN, this.IV_LEN + this.TAG_LEN);
        const ct = data.slice(this.IV_LEN + this.TAG_LEN);

        for (const key of this.keys) {
            try {
                const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv, { authTagLength: this.TAG_LEN });
                decipher.setAuthTag(tag);
                const pt = Buffer.concat([decipher.update(ct), decipher.final()]);
                return pt.toString("utf8");
            } catch {
                // try next key
            }
        }

        throw new Error("Unable to decrypt with any key");
    }

    generateKey(): string {
        return this.b64uEnc(crypto.randomBytes(this.KEY_LEN));
    }

    private b64uEnc(buf: Buffer): string {
        return buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    }

    private b64uDec(s: string): Buffer {
        s = s.replace(/-/g, "+").replace(/_/g, "/");
        const pad = 4 - (s.length % 4);
        if (pad !== 4) s += "=".repeat(pad);
        return Buffer.from(s, "base64");
    }

    private normalizeKey(k: string | Buffer): Buffer {
        const buf = Buffer.isBuffer(k) ? k : this.b64uDec(k);
        if (buf.length !== this.KEY_LEN) throw new Error("Key must be 32 bytes.");
        return buf;
    }
}