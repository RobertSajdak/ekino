'use client'

import { TUser } from "@/server/db/schemas"
import FormField from "../form-field";
import { TRegistrationValidatorErrors } from "@/validators/user-validator";
import { useToast } from "@/utils/hooks/use-toast";
import SubmitButton from "../ui/submit-button";
import Heading from "../ui/heading";
import { useState } from "react";
import { userActions } from "@/server/actions";
import { useSession } from "next-auth/react";

type TProps = {
    user: TUser;
}

export default function ProfileForm({user}: TProps) {
    const [formErrors, setFormErrors] = useState<TRegistrationValidatorErrors>({});
    const {toast} = useToast();
    const {update} = useSession();

    const handleUpdateProfile = async (formData: FormData) => {

        const res = await userActions.updateProfile(formData);

        if(!res.success && res.errors) {
            setFormErrors(res.errors);
        } else {
            setFormErrors({});
        }
        toast({
            title: res.message,
            variant: res.success ? 'success' : 'destructive'
        });

        if(res.success) {
            await update({
                name: res.data.name,
                email: res.data.email
            });
        }

    }

    return (
        <form action={handleUpdateProfile} className="mx-auto grid lg:w-[750px] gap-6">
            <Heading tag="h3" variant="h3" className="pb-0">Dane użytkownika:</Heading>
            <div className="space-y-2">
                <FormField
                    label="Nazwa użytkownika"
                    name="name"
                    placeholder="Jan Kowalski"
                    errors={formErrors.name}
                    defaultValue={user.name || ''}
                    variant="horizontal"
                />
                <FormField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="mail@gmail.com"
                    errors={formErrors.email}
                    defaultValue={user.email || ''}
                    variant="horizontal"
                />
                <FormField
                    label="Hasło"
                    name="password"
                    type="password"
                    placeholder="*********"
                    errors={formErrors.password}
                    variant="horizontal"
                    required
                />
                <FormField
                    label="Wpisz ponownie swoje hasło"
                    name="passwordConfirm"
                    type="password"
                    placeholder="*********"
                    errors={formErrors.passwordConfirm}
                    variant="horizontal"
                    required
                />
                <SubmitButton text="Zaktualizuj profil" />
            </div>
        </form>
    )
}
