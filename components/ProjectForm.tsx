"use client"

import { SessionInterface } from "@/common.types"
import Image from "next/image"
import { ChangeEvent, useState } from "react"
import FormField from "./FormField"
import CustomMenu from "./CustomMenu"
import { categoryFilters } from "@/constants"
import Button from "./Button"
import { createNewProject, fetchToken } from "@/lib/actions"
import { useRouter } from "next/navigation"

type Props = {
    type: string,
    session: SessionInterface
}

const ProjectForm = ({ type, session }: Props) => {
    const router = useRouter();

    const handelFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        setIsSubmitting(true);

        const { token } = await fetchToken();
    

    try {
        if(type === 'create') {
            await createNewProject(form, session?.user?.id, token);

            router.push('/');
        }
    } catch (error) {
      console.log(error)  
    } finally {
        setIsSubmitting(false);
    }
    };

    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
         e.preventDefault();

          const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.includes('image')) {
            alert('Please upload an image!');

            return;
         }

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
            const result = reader.result as string;

            handleStateChange("image", result)
        };
    };

    const handleStateChange = (fieldName: string, value: string) => {
        setform((prevState) => ({ ...prevState, [fieldName]: value}))
    }

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setform] = useState({
        title: '',
        description: '',
        image:'',
        liveSiteUrl:'',
        githubUrl:'',
        category:'',
    })

  return (
    <form
        onSubmit={handelFormSubmit}
        className="flexStart form"
    >
        <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
        {!form.image && 'Choose a poster for your project'}
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
            <Button
                    title={isSubmitting ? `${type === "create" ? "Creating" : "Editing"}` : `${type === "create" ? "Create" : "Edit"}`}
                    type="submit"
                    leftIcon={isSubmitting ? "" : "/plus.svg"}
                    submitting={isSubmitting}
                />
            </div>
    </form>
   
  )
}

export default ProjectForm