import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../models/User";
import connectDB from "../../../config/dbConnect";

export default nextAuth({
  session: {
    strategy: "jwt",

  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        connectDB();
        const { email, password } = credentials;

        // Check if email and password is provided
        if (!email || !password) {
          throw new Error("Please provide an email and password");
        }

        // Check if user exists in the database
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
          throw new Error("Invalid credentials");
        }

        // Check if password is correct
        const isPasswordMatched = await user.comparePassword(password);

        if (!isPasswordMatched) {
          throw new Error("Invalid credentials");
        }

        return Promise.resolve(user);
      },
    }),
  ],
    callbacks: {
        jwt: async ({token, user}) => {
            user && (token.user = user);
            return Promise.resolve(token);
        },
        session: async ({session, token}) => {
            session.user = token.user;
            return Promise.resolve(session);
        }
    }
});
