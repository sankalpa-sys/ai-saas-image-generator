'use client'
import React from 'react';
import {CldUploadWidget} from 'next-cloudinary';
import {useToast} from "@/hooks/use-toast";
import Image from "next/image";
import {CldImage} from 'next-cloudinary';
import {dataUrl, getImageSize} from "@/lib/utils";
import {PlaceholderValue} from "next/dist/shared/lib/get-img-props";

type MediaUploaderProps = {
    onValueChange: (value: string) => void;
    setImage: React.Dispatch<any>;
    image: any;
    type: string;
    publicId: string;
}

function MediaUploader({
                           onValueChange, setImage, image, type, publicId
                       }: MediaUploaderProps) {
    const {toast} = useToast()
    const onUploadErrorHandler = (error) => {
        toast({
            title: "Something went wrong while uploading!",
            description: error,
            duration: 5000,
            className: 'error-toast'
        })
    }

    const onUploadSuccessHandler = (results: any) => {
        setImage((prevState: any) => (
            {
                ...prevState,
                publicId: results?.info?.public_id,
                width: results?.info?.width,
                height: results?.info?.height,
                secure_url: results?.info?.secure_url
            }
        ))

        onValueChange(results?.info?.public_id)
        toast({
            title: "Image uploaded successfully!",
            description: "1 credit was deducted from your account",
            duration: 5000,
            className: 'success-toast'
        })
    }
    return (
        <CldUploadWidget uploadPreset="imaginify"
                         options={{
                             multiple: false,
                             resourceType: 'image',
                         }}
                         onError={onUploadErrorHandler}
                         onSuccess={onUploadSuccessHandler}
        >
            {({open}) => {
                return (
                    <div className='flex flex-col gap-4'>
                        <h3 className='h3-bold text-dark-600'>Original</h3>

                        {publicId ? (
                            <>
                                <div className='cursor-pointer rounded-[10px] overflow-hidden'>
                                    <CldImage
                                        width={getImageSize(type, image, "width")}
                                        height={getImageSize(type, image, "height")}
                                        src={publicId}
                                        sizes={"(max-width: 767px) 100vw, 50vw"}
                                        alt="image"
                                        placeholder={dataUrl as PlaceholderValue}
                                        className='media-uploader_cldImage'
                                    />


                                </div>
                            </>
                        ) : (
                            <div className='media-uploader_cta' onClick={() => open()}>
                                <div className='media-uploader_cta-image'>
                                    <Image
                                        src='/assets/icons/add.svg'
                                        alt="Add Image"
                                        width={24}
                                        height={24}
                                    />
                                </div>
                                <p className='p-14-medium'>Click here to upload image</p>
                            </div>
                        )}

                    </div>
                );
            }}
        </CldUploadWidget>
    );
}

export default MediaUploader;