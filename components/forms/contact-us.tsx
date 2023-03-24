import { Button } from "../common/button";
import { Input } from "../common/input";
import { useForm } from "react-hook-form"

export const ContactUs: React.FC<{
    
}> = () => {
    const { handleSubmit, control, formState } = useForm()

    const onSubmit = (data: any) => console.log(data)

    return (
        <div className="md:w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="pt-2">
                    <div>
                        <div>
                            <Input
                                name='uname'
                                control={control}
                                type="text"
                                placeholder='Name*'
                                required={true}

                            />
                        </div>
                        <div>
                            <Input
                                name='email'
                                control={control}
                                type="email"
                                placeholder='Email*'
                                required={true}
                            />
                        </div>
                        <div>
                            <Input
                                name='subject'
                                control={control}
                                type="text"
                                placeholder='Subject*'
                                required={true}

                            />
                        </div>
                        <div>
                            <Input
                                name='message'
                                control={control}
                                type="text"
                                placeholder='Message*'
                                required={true}

                            />
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <Button isSubmitting={formState.isSubmitting}>Submit</Button>
                </div>
            </form>
        </div>
    )
}