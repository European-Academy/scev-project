import { ChangeEvent } from 'react'
import clsx from 'clsx'
import { Control, Controller } from 'react-hook-form'

export const Input: React.FC<{
    name: string
    control: Control
    type?: 'text' | 'email' | 'password' | 'number' | 'date' | 'tel' | 'hidden'
    placeholder?: string
    label?: string
    required?: boolean
    autoFocus?: boolean
    defaultValue?: string | number
    pattern?: any
    disabled?: boolean
    textarea?:boolean
    
    onChange?(e: ChangeEvent<HTMLInputElement>): void
}> = (params) => {
    return (
        <Controller
            name={params.name}
            control={params.control}
            rules={{ required: params.required ?? false }}
            defaultValue={params.defaultValue ?? ''}
            render={({ field, formState }) => (
                <>
                    <div className="flex shadow-sm pt-2">
                        {params.label && (
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                {params.label}
                            </span>
                        )}

                        {params.textarea == true && (
                            <textarea
                            {...field}
                            // type={params.type ?? 'text'}
                            id={params.name}
                            name={params.name}
                            value={field.value}
                            required={params.required ?? false}
                            autoFocus={params.autoFocus}
                            // pattern={params.pattern}
                            disabled={params.disabled ?? formState.isSubmitting}
                            placeholder={params.placeholder}
                            // onChange={(e) => {
                            //     field.onChange(e)
                            //     params.onChange && params.onChange(e)
                            // }}
                            className={clsx(
                                "shadow-sm focus:ring-blue focus:border-blue block w-full sm:text-sm border-gray-300",
                                params.label == null ? "" : "rounded-r-md"
                            )}
                            cols={20} rows={9}
                        />
                        )}
                        {params.textarea == false && (
                            <input
                            {...field}
                            type={params.type ?? 'text'}
                            id={params.name}
                            name={params.name}
                            value={field.value}
                            required={params.required ?? false}
                            autoFocus={params.autoFocus}
                            pattern={params.pattern}
                            disabled={params.disabled ?? formState.isSubmitting}
                            placeholder={params.placeholder}
                            onChange={(e) => {
                                field.onChange(e)
                                params.onChange && params.onChange(e)
                            }}
                            className={clsx(
                                "shadow-sm focus:ring-blue focus:border-blue block w-full sm:text-sm border-gray-300",
                                params.label == null ? "" : "rounded-r-md"
                            )}
                        />
                        )}
                    </div>
                </>
            )}
        />
    )
}