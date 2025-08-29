import clsx from 'clsx'
import Image from 'next/image'

export const Button: React.FC<{
    type?: 'button' | 'submit'
    onClick?(): void
    isSubmitting?: boolean
    fullwidth?: boolean
    disabled?: boolean
    children: React.ReactNode
}> = ({ type, onClick, isSubmitting, fullwidth, disabled, children }) => {
    return (
        <button className={clsx(
            'inline-flex justify-center py-2 px-16 font-semibold border border-transparent shadow-sm text-white bg-blue hover:bg-white hover:text-blue hover:border-blue',
            fullwidth ? 'w-full' : ''
        )}
            type={type ?? 'submit'}
            onClick={onClick}
            disabled={isSubmitting || disabled}
        >
            {!isSubmitting ? (
                children
            ) : (
                <>
                    <div className='fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden'>
                        <div className='fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-40' />
                        <div className='fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden grid grid-cols-1 gap-4 content-center justify-items-center'>
                            <Image
                                src="/images/loading.gif"
                                // layout="fixed"
                                width="150"
                                height="150"
                                alt="loading"
                                unoptimized
                            />
                        </div>
                    </div>
                    {children}
                </>
            )}
        </button>
    )
}