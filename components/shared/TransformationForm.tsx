"use client"

import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Input} from "@/components/ui/input"
import {aspectRatioOptions, defaultValues, transformationTypes} from "@/constants";
import {TransformationFormProps, Transformations} from "@/types";
import {CustomField} from "@/components/shared/CustomField";
import {useState, useTransition} from "react";
import {AspectRatioKey, debounce, deepMergeObjects} from "@/lib/utils";

export const formSchema = z.object({
    title: z.string(),
    aspectRatio: z.string().optional(),
    color: z.string().optional(),
    prompt: z.string().optional(),
    publicId: z.string()

})


function TransformationForm({
                                data = null,
                                action,
                                userId,
                                type,
                                creditBalance,
                                config = null
                            }: TransformationFormProps) {
    const [image, setImage] = useState(data)
    const [newTransformation, setNewTransformation] = useState<Transformations | null>(null)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [isTransforming, setIsTransforming] = useState<boolean>(false)
    const [transformationConfig, setTransformationConfig] = useState(config)
    const [isPending, startTransition] = useTransition()


    const onSelectFieldHandler = (value: string, onChangeField: ((value: string) => void)) => {
        const imageSize = aspectRatioOptions[value as AspectRatioKey]
        setImage((prevState: any) => (
            {
                ...prevState,
                aspectRatio: imageSize.aspectRatio,
                width: imageSize.width,
                height: imageSize.height
            }

        ))

        setNewTransformation(transformationType.config)

        return onChangeField(value)

    }

    const transformationType = transformationTypes[type]
    const initialValues = data && action === "Update" ? {
        title: data?.title,
        aspectRatio: data?.aspectRatio,
        color: data?.color,
        prompt: data?.prompt,
        publicId: data?.publicId
    } : defaultValues
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    const onInputChangeHandler = (fieldName: string, value: string, type: string, onChangeField: (value: string) => void) => {
        debounce(() => {
            setNewTransformation((prevState: any) => ({
                    ...prevState,
                    [type]: {
                        ...prevState?.[type],
                        [fieldName === "prompt" ? "prompt" : "to"]: value
                    }
                }
            ))
            return onChangeField(value)
        }, 1000)
    }

    const onTransformHandler = () => {
        setIsTransforming(true)
        setTransformationConfig(
            deepMergeObjects(newTransformation, transformationConfig)
        )
        setNewTransformation(null)
        startTransition(async () => {
            // await updateCredits(userId, creditFee)
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <CustomField control={form.control} name='title'
                             formLabel='Image Label'
                             className='w-full'
                             render={({field}) => <Input {...field} className='input-field'/>}

                />
                {type === "fill" && (
                    <CustomField control={form.control} name='aspectRatio'
                                 formLabel='Aspect Ratio'
                                 className='w-full'
                                 render={({field}) => <Select
                                     onValueChange={(value) => onSelectFieldHandler(value, field.onChange)}>
                                     <SelectTrigger className="select-field">
                                         <SelectValue placeholder="Select size"/>
                                     </SelectTrigger>
                                     <SelectContent>
                                         {Object.keys(aspectRatioOptions).map((key) => (
                                             <SelectItem className='select-item' key={key} value={key}>
                                                 {aspectRatioOptions[key as AspectRatioKey].label}
                                             </SelectItem>

                                         ))}
                                     </SelectContent>
                                 </Select>
                                 }
                    />
                )}

                {(type === "remove" || type === "recolor") && (
                    <div className='prompt-field'>
                        <CustomField control={form.control} name='prompt'
                                     formLabel={type === "remove" ? "Object to remove" : "Object to recolor"}
                                     className='w-full'
                                     render={({field}) => <Input
                                         value={field.value}
                                         className="input-field"
                                         onChange={(e) => {
                                             onInputChangeHandler("prompt", e.target.value, type, field.onChange)
                                         }}
                                         {...field} />}
                        />

                    </div>
                )}
                {(type === "recolor") && (
                    <div className='prompt-field'>
                        <CustomField control={form.control} name='color'
                                     formLabel='Replacement Color'
                                     className='w-full'
                                     render={({field}) => <Input
                                         value={field.value}
                                         className="input-field"
                                         onChange={(e) => {
                                             onInputChangeHandler("color", e.target.value, "recolor", field.onChange)
                                         }}
                                         {...field} />}
                        />

                    </div>
                )}
                <div className="flex flex-col gap-4">
                    <Button onClick={onTransformHandler} disabled={isTransforming || newTransformation === null}
                            type='button'
                            className='submit-button capitalize '>
                        {isTransforming ? "Transforming.." : "Apply Transformation"}
                    </Button>
                    <Button disabled={isSubmitting} type='submit' className='submit-button capitalize '>
                        {isSubmitting ? "Submitting.." : "Save Image"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default TransformationForm;