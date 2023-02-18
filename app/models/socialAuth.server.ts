import { Authenticator } from "remix-auth";
import { SocialsProvider } from "remix-auth-socials";
import { GoogleStrategy } from "./googleStrategy";
import invariant from "tiny-invariant";
import { sessionStorage } from "~/services/session.server";

// Create an instance of the authenticator
export let authenticator = new Authenticator(sessionStorage, {
  sessionKey: "_session",
});
// You may specify a <User> type which the strategies will return (this will be stored in the session)
// export let authenticator = new Authenticator<User>(sessionStorage, { sessionKey: '_session' });

const getCallback = (provider: string) => {
  return `http://localhost:3000/socials/${provider}/callback`;
};

const { GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET } = process.env;

invariant(GOOGLE_OAUTH_CLIENT_ID, "GOOGLE_OAUTH_CLIENT_ID is required");
invariant(GOOGLE_OAUTH_CLIENT_SECRET, "GOOGLE_OAUTH_CLIENT_SECRET is required");

authenticator.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: GOOGLE_OAUTH_CLIENT_ID,
      callbackURL: getCallback(SocialsProvider.GOOGLE),
    },
    async (res) => {
      const { profile } = res;
      console.log("🤩-------->>", profile);
      // here you would find or create a user in your database
      return profile;
    }
  )
);

// authenticator.use(
//   new FacebookStrategy(
//     {
//       clientID: "YOUR_CLIENT_ID",
//       clientSecret: "YOUR_CLIENT_SECRET",
//       callbackURL: getCallback(SocialsProvider.FACEBOOK),
//     },
//     async ({ profile }) => {}
//   )
// );
