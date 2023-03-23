import clsx from 'clsx'

export const Title: React.FC<{
    title?: string
    subtitle?: string
    big?: boolean
}> = ({ title, subtitle, big }) => {
    return (
        <div>
            <div className={clsx(
                'md:text-3xl text-xl pb-6 pt-6 font-bold',
                big ? 'md:text-7xl text-5xl': '',
            )}>
                {title}
            </div>
            {subtitle && <div className='text-lg'>{subtitle}</div>}
        </div>
    )
}