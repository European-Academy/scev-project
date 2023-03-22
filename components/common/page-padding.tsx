import clsx from 'clsx'

export const PagePadding: React.FC<{
    removePadding?: boolean
    children: React.ReactNode
}> = ({ removePadding, children }) => {
    return (
        <div
            className={clsx(
                'md:mx-auto max-w-7xl',
                removePadding ? '' : 'space-y-2 px-4 py-6 sm:px-6 lg:px-8'
            )}
        >
            {children}
        </div>
    )
}