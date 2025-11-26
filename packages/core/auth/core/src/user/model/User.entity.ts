import { Entity, EntityProps } from "@spysec/shared";
import { Id, Email, UserName, Result } from "@spysec/shared";
import { IdUnique } from "@spysec/utils";

export enum ProfileType {
    PERSONAL = 'personal',
    CORPORATE = 'corporate',
}

export enum ProviderType {
    EMAIL = 'email',
    GOOGLE = 'google',
}

export interface UserProps extends EntityProps {
    id?: string;
    firebaseUid: string;
    name: string;
    email: string;
    provider: ProviderType;
    profileType: ProfileType;
    isEmailVerified: boolean;
    imageURL?: string | null;
    lastLoginAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export class User extends Entity<User, UserProps> {
    constructor(
        readonly id: Id,
        readonly firebaseUid: string,
        readonly name: UserName,
        readonly email: Email,
        readonly provider: ProviderType,
        readonly profileType: ProfileType,
        readonly imageURL: string | null,
        readonly isEmailVerified: boolean,
        readonly lastLoginAt: Date | null,
        readonly createdAt: Date,
        readonly updatedAt: Date,
        readonly props: UserProps
    ) {
        super(id);
    }

    static create(props: UserProps): Result<User> {
        const id = Id.create(props.id ?? IdUnique.generate());
        const email = Email.create(props.email);
        const name = UserName.create(props.name);

        const createAttributes = Result.combine([id, email, name]);
        if (createAttributes.failed) return Result.fail<User>(createAttributes.errors);

        const createdAt = props.createdAt ?? new Date();
        const updatedAt = props.updatedAt ?? createdAt;
        return Result.ok(
            new User(
                id.value!,
                props.firebaseUid,
                name.value!,
                email.value!,
                props.provider,
                props.profileType,
                props.imageURL ?? null,
                props.isEmailVerified,
                props.lastLoginAt ?? null,
                createdAt,
                updatedAt,
                {
                    id: id.value!.value,
                    firebaseUid: props.firebaseUid,
                    name: props.name,
                    email: props.email,
                    provider: props.provider,
                    profileType: props.profileType,
                    imageURL: props.imageURL,
                    isEmailVerified: props.isEmailVerified,
                    lastLoginAt: props.lastLoginAt,
                    createdAt: props.createdAt,
                    updatedAt: props.updatedAt
                }
            )
        );
    }

    clone(
        changes: Partial<UserProps>,
        voChanges?: {
            id?: Id
            name?: UserName
            email?: Email
        }
    ): User {
        const newProps = {
            ...this.props,
            ...changes,
            updatedAt: new Date(), 
        };

        const id = voChanges?.id ?? this.id;
        const name = voChanges?.name ?? this.name;
        const email = voChanges?.email ?? this.email;

        return new User(
            id,
            newProps.firebaseUid,
            name,
            email,
            newProps.provider,
            newProps.profileType,
            newProps.imageURL ?? null,
            newProps.isEmailVerified,
            newProps.lastLoginAt ?? null,
            this.createdAt, 
            newProps.updatedAt,
            newProps
        );
    }

    static fromPersistence(props: UserProps): Result<User> {
        return User.create(props);
    }

    isCorporate(): boolean {
        return this.profileType === ProfileType.CORPORATE;
    }

    isPersonal(): boolean {
        return this.profileType === ProfileType.PERSONAL;
    }

    isOAuthUser(): boolean {
        return this.provider === ProviderType.GOOGLE;
    }

   recordLogin(): User {
        return this.clone({
            lastLoginAt: new Date(),
        });
    }

    verifyEmail(): User {
        if (this.isEmailVerified) return this;

        return this.clone({
            isEmailVerified: true,
        });
    }

    updatePhoto(imageURL: string): User {
        return this.clone({
            imageURL: imageURL
        })
    }

    changeProfileType(newType: ProfileType): User {
        if(this.profileType === newType) return this;
        
       return this.clone(
            { profileType: newType },            
        );
    }

    updateName(newName: string): Result<User> {
        const nameResult = UserName.create(newName);
        if (nameResult.failed) return Result.fail<User>(nameResult.errors);
        
        const updatedUser = this.clone(
            { name: newName },
            { name: nameResult.value! }
        )
        return Result.ok(updatedUser);
    }
    
}