// import { client } from '../../lib/sanity.client'
// import clsx from "clsx";


export const TableComponent: React.FC<{
    children: React.ReactNode
}> = ({ children }) => {

    return (
        <>
            <table className='table-fixed'>
                {children}
                {/* <thead>
                    <tr>
                        <th>{tbhead}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{cell}</td>
                    </tr>
                </tbody> */}
            </table>
        </>
    )
}