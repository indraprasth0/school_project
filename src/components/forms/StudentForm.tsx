"use client"

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputField from "./InputField";
import Image from "next/image";


const schema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long!").max(20, "Username must be at most 20 characters long!"),
    email: z.string().email("Invalid email address!"),
    password: z.string().min(8, "Password must be at least 8 characters long!"),
    firstName: z.string().min(1, "First name is required!"),
    lastName: z.string().min(1, "Last name is required!"),
    phone: z.string().min(10, "Phone is required!"),
    address: z.string().min(1, "Address is required!"),
    bloodType: z.string().min(1, "Blood is required!"),
    birthday: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format!" }),
    sex: z.enum(["male", "female"], { message: "Sex is required!" }),
    img: z.any().refine((file) => file instanceof File, { message: "Image is required!" }),
});

type StudentFormData = z.infer<typeof schema>;

interface StudentFormProps {
    type: "create" | "update";
    data?: Partial<StudentFormData>;
}


const StudentForm = ({ type, data }: StudentFormProps) => {
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<StudentFormData>({
        resolver: zodResolver(schema),
        defaultValues: data ?? {}, // `update` मोडसाठी पूर्वीचा डेटा लोड करतो
    });
    

    return (
        <form onSubmit={handleSubmit((d) => console.log(d))} className="flex flex-col gap-5">
            {/* <h1 className="text-xl font-semibold text-p300">{type === "create" ? "Create a new Student" : "Update Student details"}</h1> */}

            {/* Authentication Information */}
            <span className="text-md text-p400 font-medium">Authentication Information</span>
            <div className="flex flex-col gap-4 md:flex-row w-full">
                <InputField label="Username" register={register} name="username" errors={errors.username} />
                <InputField label="Email" register={register} name="email" errors={errors.email} type="email" />
                <InputField label="Password" register={register} name="password" errors={errors.password} type="password" />
            </div>

            {/* Personal Information */}
            <span className="text-md text-p400 font-medium">Personal Information</span>
            <div className="flex flex-col gap-4 md:flex-row w-full">
                <InputField label="First Name" register={register} name="firstName" errors={errors.firstName} />
                <InputField label="Last Name" register={register} name="lastName" errors={errors.lastName} />
                <InputField label="Phone" register={register} name="phone" errors={errors.phone} type="tel" />
            </div>
            <div className="flex flex-col gap-4 md:flex-row w-full">
                <InputField label="Address" register={register} name="address" errors={errors.address} />
                <InputField label="Blood Type" register={register} name="bloodType" errors={errors.bloodType} />

                <div className="flex flex-col gap-2 w-full md:w-1/3">
                    <label className="text-xs text-p500">Birthday</label>
                    <input type="date" {...register("birthday")} className="ring-[1.5px] ring-p300 p-2 rounded-md text-sm w-full bg-p900 text-p50" />
                    {errors.birthday && <p className="text-xs text-red-500">{errors.birthday.message}</p>}
                </div>
            </div>
            {/* <div className="flex flex-col gap-2 w-full md:w-1/3">
                <label className="text-xs text-p500">Sex</label>
                <select {...register("sex")} className="ring-[1.5px] ring-p300 p-2 rounded-md text-sm w-full">
                    <option value="">Select...</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                {errors.sex && <p className="text-xs text-red-500">{errors.sex.message}</p>}
            </div> */}
            <div className="flex flex-col gap-4 md:flex-row w-full">
                <div className="flex flex-col gap-2 w-full md:w-1/3">
                    <label className="text-xs text-p500">Sex</label>
                    <div className="flex gap-4 text-sm text-p200">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                value="male"
                                {...register("sex")}
                                className="accent-p500 "
                            />
                            Male
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                value="female"
                                {...register("sex")}
                                className="accent-p500"
                            />
                            Female
                        </label>
                    </div>
                    {errors.sex && <p className="text-xs text-red-500">{errors.sex.message}</p>}
                </div>
                <div className="flex flex-col gap-2 w-full md:w-1/3 justify-center">
                    <label className="text-xs text-p500 flex items-center gap-2 cursor-pointer" htmlFor="img">                        
                        <Image src="/inew/upload.png" alt="upload" width={40} height={40} />
                        <span className="">Upload a photo</span>
                    </label>
                    <input type="file" id="img" {...register("img")} className="hidden" /> 
                    {errors.img && <p className="text-xs text-red-500">{errors.img.message}</p>}
                </div>                
            </div>

            <div className="flex flex-row w-full gap-4 items-center justify-center">
                <button type="submit" className="bg-p400 text-white py-2 px-4 rounded-md hover:bg-opacity-80 hover:text-opacity-50 shadow-md shadow-black">
                    {type === "create" ? "Create Student" : "Update Student"}
                </button>
                <button type="button" className="bg-p500 text-white py-2 px-4 rounded-md hover:bg-opacity-80 hover:text-opacity-50 shadow-md shadow-black" onClick={() => reset()} >Reset</button>
            </div>
        </form>
    );
};

export default StudentForm;


