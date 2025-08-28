import clsx from 'clsx'
import Link from 'next/link'
import { Grid } from './grid'
import { Title } from './title'
import { Button } from './button'

export const Card: React.FC<{
    title?: string
    buttonText?: string
    buttonHref?: string
    onButtonClick?(): void
    children: React.ReactNode
}> = ({ title, buttonText, buttonHref, onButtonClick, children }) => {
    return (
        <div>
            {title && <div className="mb-6"><Title title={title} /></div>}
            <Grid four>
                {children}
            </Grid>
            {(buttonText && (buttonHref || onButtonClick)) && (
                <div className="mt-8">
                    {buttonHref ? (
                        <Link href={buttonHref}>
                            <Button type="button">{buttonText}</Button>
                        </Link>
                    ) : (
                        <Button type="button" onClick={onButtonClick}>{buttonText}</Button>
                    )}
                </div>
            )}
        </div>
    )
}

export const CardItem: React.FC<{
    children: React.ReactNode
    className?: string
    href?: string
}> = ({ children, className, href }) => {
    const baseClasses = clsx(
        'bg-white rounded-lg border border-gray-200 shadow-sm p-6 transition-shadow',
        'hover:shadow-md',
        'group',
        className
    )

    if (href) {
        return (
            <Link href={href} className={clsx('block', baseClasses)}>
                {children}
            </Link>
        )
    }

    return (
        <div className={baseClasses}>
            {children}
        </div>
    )
}


