'use client'

import Link from "next/link";
import { usePathname } from "next/navigation"

export default function Breadcrumb() {

    const pathname = usePathname();

    const pathSegments = pathname.split('/');

    if(pathSegments.length < 2 || pathSegments[1] === '') return null;

    let pathLink = '';

    const pathSegmentObj = pathSegments.map(path => {

        pathLink += path + '/';

        return {
            label: decodeURI(path.replace(/-/g, ' ')),
            value: pathLink
        }
    });

    return (
        <div className="bg-dark py-3">
            <div className="container flex flex-wrap gap-2 text-white [&>a:last-child]:text-silver [&>a:last-child]:pointer-events-none">
                <Link href="/">Strona główna</Link>
                {
                    pathSegmentObj.map(segment => {
                        return segment.label !== '' ? (
                            <Link href={segment.value} className="capitalize" key={segment.value}>
                                <span className="text-primary">{'>'}</span>{' '}
                                {segment.label}
                            </Link>
                        ) : ''
                    })
                }
            </div>
        </div>
    )
}
