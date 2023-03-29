export const Footer: React.FC<{}> = () => {
    const current_year = new Date().getFullYear()
    return (
        <>
        <footer className="bg-blue-1 text-center">
            <div className="p-4 text-center text-white font-poppinsSemi">
            Scientific Events © {current_year}. All Rights Reserved.
            </div>
        </footer>
        </>
    )
}