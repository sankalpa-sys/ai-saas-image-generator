import Header from "@/components/shared/Header";
import {transformationTypes} from "@/constants";
import TransformationForm from "@/components/shared/TransformationForm";
import {auth} from "@clerk/nextjs/server";
import {getUserById} from "@/lib/actions/user.actions";
import {TransformationTypeKey} from "@/types";
import {redirect} from "next/navigation";

type TSearchParams = | "restore"
    | "fill"
    | "remove"
    | "recolor"
    | "removeBackground";

async function AddTransformationTypePage({params}: { params: Promise<{ type: TSearchParams }> }) {
    const {userId} = await auth()
    if (!userId) {
        redirect("/")
    }
    const user = await getUserById(userId)
    const parameters = await params
    const type = parameters.type
    const transformation = transformationTypes[type]
    return (
        <>
            <Header title={transformation?.title} subtitle={transformation?.subTitle}/>
            <section className='mt-10'>
                <TransformationForm
                    creditBalance={user?.creditBalance}
                    type={transformation.type as TransformationTypeKey}
                    action="Add"
                    userId={user._id}/>
            </section>
        </>
    );
}

export default AddTransformationTypePage;