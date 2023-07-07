"use client"

import { SessionInterface } from "@/common.types"
import Image from "next/image"
import { ChangeEvent } from "react"
import FormField from "./FormField"
import CustomMenu from "./CustomMenu"
import { categoryFilters } from "@/constants"

type Props = {
    type: string,
    session: SessionInterface
}

const ProjectForm = ({ type, session }: Props) => {

    const handelFormSubmit = (e: React.FormEvent) => {};
    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {};
    const handleStateChange = (fieldName: string, value: string) => {

    }

    const form = {
        image:'',
        title: '',
    };
  return (
    <form
        onSubmit={handelFormSubmit}
        className="flexStart form"
    >
        <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
        {!form && 'Choose a poster for your project'}
        </label>
        
        <input
                    id="image"
                    type="file"
                    accept='image/*'
                    required={type === "create"}
                    className="form_image-input"
                    onChange={(e) => handleChangeImage(e)}
                />
               {form.image && (
                    <Image 
                    src={form?.image}
                    className="sm:p-10 object-contain z-20" alt="image"
                    fill
                    />
               )} 
         </div>

         <FormField
                title="Title"
                state={form.title}
                placeholder="Flexibble"
                setState={(value) => handleStateChange('title', value)}
            />

<FormField
                title='Description'
                state={form.description}
                placeholder="Showcase and discover remarkable developer projects."
                isTextArea
                setState={(value) => handleStateChange('description', value)}
            />

            <FormField
                type="url"
                title="Website URL"
                state={form.liveSiteUrl}
                placeholder="https://julienmuke.com"
                setState={(value) => handleStateChange('liveSiteUrl', value)}
            />

            <FormField
                type="url"
                title="GitHub URL"
                state={form.githubUrl}
                placeholder="https://github.com/julien-muke"
                setState={(value) => handleStateChange('githubUrl', value)}
            />

            <CustomMenu
                title="Category"
                state={form.category}
                filters={categoryFilters}
                setState={(value) => handleStateChange('category', value)}
            />

            <div className="flexStart w-full">
             <button>Create</button>
            </div>
    </form>
   
  )
}

export default ProjectForm