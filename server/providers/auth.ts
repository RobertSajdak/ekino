import NextAuth from "next-auth"
import bcrypt from "bcryptjs"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import {DrizzleAdapter} from '@auth/drizzle-adapter'
import { db } from "./db";
import {accountsTable, usersTable, sessionsTable, verificationTokensTable} from '../db/schemas'
import { userLoginValidator } from "@/validators/user-validator"
import UserRepository from "../db/repositories/user-repository"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: DrizzleAdapter(db, {
		accountsTable,
		usersTable,
		sessionsTable,
		verificationTokensTable,
	}),
  	providers: [
		Google({
			allowDangerousEmailAccountLinking: true
		}),
		Credentials({
			credentials: {
				email: {},
				password: {}
			},
			authorize: async (credentials) => {
				try {

					const {email, password} = userLoginValidator.parse({
						email: credentials.email,
						password: credentials.password,
					});

					const user = await UserRepository.firstByEmail(email);

					if(!user || !user.password) {
						throw new Error('Złe dane logowania');
					}

					const passwordMatch = await bcrypt.compare(
						password,
						user.password
					);

					if(!passwordMatch) {
						throw new Error('Złe dane logowania');
					}

					return user;
				} catch (error) {
					console.log(error);
					return null;
				}
			}
		}),
	],
	events: {
		signIn(msg) {
			console.log(msg);
		},
	},
	callbacks: {
		async jwt({token, trigger, session, user}) {

			if(trigger === 'update' && session.email) {
				token.email = session.email;
				token.name = session.name;
			}

			if(user && user.id) {
				token.id = user.id;
			}

			return token;
		},
		async session({session, token}) {
			if(session.user) {
				session.user.id = token.id;
			}

			return session;
		}
	},
	pages: {
		signIn: '/logowanie',
		signOut: '/logowanie',
		error: '/logowanie',
	},
	session: {
		strategy: 'jwt'
	}
})
