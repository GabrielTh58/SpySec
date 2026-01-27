'use client'
import { useForm } from "react-hook-form";
import { InputGroup } from "./InputGroup"
import { SaveButton } from "./SaveButton"
import { Camera, User } from "lucide-react"
import { z } from 'zod'
import { useGamification } from "@/data/hooks/useGamification";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useSession } from "@/data/hooks/useSession";

export const nickNameSchema = z.object({
    nickName: z.string()
      .min(3, "O codinome deve ter pelo menos 3 caracteres")
      .max(20, "O codinome deve ter no máximo 20 caracteres")
      .regex(/^[a-zA-Z0-9_ ]+$/, "O codinome não pode conter caracteres especiais")
  });

type ProfileFormData = z.infer<typeof nickNameSchema>;

export function ProfileSettings() {
    const { profile, submitSettingsUpdate, isLoading } = useGamification();
    const { user } = useSession();

    const { 
        register, 
        handleSubmit, 
        setValue, 
        formState: { errors } 
    } = useForm<ProfileFormData>({
        resolver: zodResolver(nickNameSchema),
    });

    useEffect(() => {
        if (profile?.nickname) {
            setValue("nickName", profile.nickname);
        }
    }, [profile, setValue]);

    
    const onSubmit = async (data: ProfileFormData) => {
        await submitSettingsUpdate(data);
    };      

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-6">
                <div className="relative group cursor-pointer">
                    <div className="w-24 h-24 rounded-full bg-gray-800 border-2 border-dashed border-gray-600 flex items-center justify-center overflow-hidden group-hover:border-cyan-500 transition-colors">
                        <User size={40} className="text-gray-500 group-hover:text-cyan-400" />
                    </div>
                    <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera size={24} className="text-white" />
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white">Avatar</h3>
                    <p className="text-xs text-gray-500 mb-2">Recomendado: 400x400px (PNG, JPG)</p>
                    <button className="text-xs bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded border border-gray-700 text-white transition-colors">
                        Upload Imagem
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1">
                        <InputGroup
                            label="Codinome (Nome Público)"
                            placeholder="Ex: CyberWolf"
                            error={errors.nickName?.message}
                            {...register('nickName')}
                        />
                    </div>

                    <InputGroup label="E-mail de Acesso" defaultValue={user?.email || ''} disabled />
                    <InputGroup label="Cargo / Função" placeholder="Ex: Desenvolvedor" />
                    <InputGroup label="Empresa" placeholder="Ex: Corp Sec" disabled />
                </div>

                <div className="pt-4 border-t border-gray-800 flex justify-end">
                    <SaveButton type="submit" isLoading={isLoading} />
                </div>
            </form>
        </div>
    )
}
