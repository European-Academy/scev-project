import { Button } from "../common/button";
import { Input } from "../common/input";
import { SubmitContact } from "../modals/submit-contact";
import { useForm } from "react-hook-form"
import { useState } from "react"

export const ContactUs: React.FC<{

}> = () => {
    const { handleSubmit, control, formState } = useForm()
    const [contactmod, setContactmod] = useState(false)
    const [ errormsg, setErrormsg] = useState(false)

    const onSubmit = async (data: any) => {
        console.log(data)
        const response = await fetch('/api/contact-api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: data.uname,
                email: data.email,
                subject: data.subject,
                message: data.message
            })
        })
        const json = await response.json()
        if (!response.ok) {
            console.log('error sending contact us form')
            setErrormsg(true)
        }
        console.log(json)
        setContactmod(true)
    }

    return (
        <>
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
                                    textarea={false}
                                />
                            </div>
                            <div>
                                <Input
                                    name='email'
                                    control={control}
                                    type="email"
                                    placeholder='Email*'
                                    required={true}
                                    textarea={false}
                                />
                            </div>
                            <div>
                                <Input
                                    name='subject'
                                    control={control}
                                    type="text"
                                    placeholder='Subject*'
                                    required={true}
                                    textarea={false}
                                />
                            </div>
                            <div>
                                <Input
                                    name='message'
                                    control={control}
                                    type="text"
                                    placeholder='Message*'
                                    required={true}
                                    textarea={true}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <Button isSubmitting={formState.isSubmitting}>Submit</Button>
                    </div>
                </form>
            </div>
            {contactmod == true && (
                <SubmitContact
                heading="Your message has been successfully submitted."
                btn="OK"
            />
            )}
            {errormsg == true && (
                <SubmitContact
                heading="There seems to be a problem. Try again?"
                btn="OK"
            />
            )}
            
        </>
    )
}