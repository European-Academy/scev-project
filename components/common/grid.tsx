import clsx from 'clsx'

export const Grid: React.FC<{
    two?: boolean
    three?: boolean
    four?: boolean
    five?: boolean
    six?: boolean
    children: React.ReactNode
}> = ({ two, three, four, five, six, children }) => {
    return (
        <div>
            <div className={clsx(
                'grid grid-cols-1 gap-6',
                two ? 'lg:grid-cols-2' : '',
                three ? 'lg:grid-cols-3' : '',
                four ? 'md:grid-cols-3 lg:grid-cols-4' : '',
                five ? 'md:grid-cols-3 lg:grid-cols-5' : '',
                six ? 'md:grid-cols-3 lg:grid-cols-6' : '',
            )}>
                {children}
            </div>
        </div>
    )
}