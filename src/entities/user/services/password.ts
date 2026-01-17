import { pbkdf2, randomBytes } from "node:crypto";

async function hashPassword(
  password: string,
  salt = randomBytes(16).toString("hex")
) {
  const hash = await new Promise<NonSharedBuffer>((res, rej) =>
    pbkdf2(password, salt, 1000, 64, "sha512", (err, key) => {
      if (err) rej(err);

      res(key);
    })
  );

  return {
    hash: hash.toString("hex"),
    salt,
  };
}

async function comparePasswords({
  password,
  hash,
  salt,
}: {
  password: string;
  hash: string;
  salt: string;
}) {
  return hash === (await hashPassword(password, salt)).hash;
}

export const passwordService = { hashPassword, comparePasswords };
