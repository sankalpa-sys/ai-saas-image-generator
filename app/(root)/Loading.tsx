import React from 'react';
import LoadingSpinner from "@/components/shared/LoadingSpinner";

function Loading() {
    return (
        <div className='h-screen w-full flex items-center justify-center'>
            <LoadingSpinner/>
        </div>
    );
}

export default Loading;