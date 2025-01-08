'use server'

import { TRegistrationValidatorErrors, userRegistrationValidator } from "@/validators/user-validator";
import UserRepository from "../db/repositories/user-repository";
import { EkinoError, SessionError, getError } from "../helpers/error-helper";
import bcrypt from 'bcryptjs'
import { ZodError } from "zod";
import { auth } from "../providers/auth";
import { revalidatePath } from "next/cache";

export async function registerUser(formData: FormData) {
    try {

        const { email, name, password } = userRegistrationValidator.parse(
            Object.fromEntries(formData)
        );

        const userExists = await UserRepository.isExist(email, name);

        if(userExists) {
            throw new EkinoError(
                'Użytkownik z danym adresem email lub nazwą istnieje w bazie danych'
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await UserRepository.insert(email, name, hashedPassword);

        return {
            success: true as const,
            message: 'Rejestracja przebiegła pomyślnie'
        }
        
    } catch(error) {
        console.log(error);
        return getError(error);
    }
}

export async function getProfile() {
    try {
        const session = await auth();
        console.log(session);
        if(!session?.user?.id) {
            throw new SessionError();
        }

        const user = await UserRepository.firstById(session.user.id);

        if(!user) {
            throw new EkinoError('Użytkownik nie istnieje w bazie');
        }

        return {
            success: true as const,
            data: user
        }

    } catch (error) {
        console.log(error);
        return getError(error);
    }
}

export async function updateProfile(formData: FormData) {
    try {
        const session = await auth();

        if(!session?.user?.id) {
            throw new SessionError();
        }

        const { email, name, password } = userRegistrationValidator.parse(
            Object.fromEntries(formData)
        );
        
        if(session.user.email !== email) {
            const user = await UserRepository.firstByEmail(email);
            if(user) {
                throw new EkinoError('Użytkownik z podanym adresem email już istnieje w bazie danych');
            }
        }
        if(session.user.name !== name) {
            const user = await UserRepository.firstByName(name);
            if(user) {
                throw new EkinoError('Użytkownik z podaną nazwą już istnieje w bazie danych');
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await UserRepository.update(session.user.id, {
            name,
            email,
            password: hashedPassword
        });

        revalidatePath('/moje-konto');

        return {
            success: true as const,
            message: 'Zmiany w profilu zostały zapisane',
            data: {
                name, email
            }
        }

    } catch (error) {
        console.log(error);
        return getError<TRegistrationValidatorErrors>(error);
    }
}
