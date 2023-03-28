import { Modal } from "../common/modal";
import { useState } from "react"

export const SubmitContact: React.FC<{
    heading?: string
    // subtitle?: string
    btn?: string
}> = ({ heading, btn }) => {
    const [open, setOpen] = useState(true)

    return (
        <Modal
            open={open}
            setOpen={setOpen}
            onClick={() => setOpen(false)}
            heading={heading}
            btn={btn}
        />
    )
}