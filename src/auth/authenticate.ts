import * as jose from "jose";
import server$ from "solid-start/server";
import { Result } from "~/utils/result.type";

const secret = new TextEncoder().encode(
  "cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2",
);

const alg = "HS256";

// my totally (un)safe authenticator function :-)
export const authenticate = server$(
  async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<Result<string, string>> => {
    await new Promise((resolve, _) => setTimeout(resolve, 1000));

    if (username !== "francesco" || password !== "foffo") {
      return {
        type: "error",
        error: "Invalid credentials",
      };
    }

    const jwt = await new jose.SignJWT({ "urn:example:claim": true })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setIssuer("urn:example:issuer")
      .setAudience("urn:example:audience")
      .setExpirationTime("2h")
      .sign(secret);

    return {
      type: "ok",
      data: jwt,
    };
  },
);
